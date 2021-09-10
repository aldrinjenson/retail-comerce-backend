const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Otp, Company } = require("../model");
const { sendSmsMsg } = require("../utils/misc");

const generateOtp = async (reason, phone, newPhone) => {
  try {
    const valid = await Company.findOne({ phoneNo: phone }).exec();
    if (!valid) return { success: false };

    if (reason == "changePhone") {
      const invalid = await Company.findOne({ phoneNo: newPhone }).exec();
      if (invalid) return { success: false };
      await Otp.deleteMany({ phone }).exec();
    }

    const otp = ("" + (Math.random() * 1000000 + 123456)).substr(0, 6);

    let smsReason;
    if (reason === "changePhone") {
      smsReason = "changing phone number";
      phone = newPhone;
    } else if (reason === "changePassword") smsReason = "changing password";
    else smsReason = reason; //login
    sendSmsMsg(
      phone,
      `Your otp for ${smsReason} at ${process.env.PORTAL_NAME} is ${otp}.`
    );
    await Otp.findOneAndUpdate(
      { reason, phone },
      { $set: { otp } },
      { useFindAndModify: false, upsert: true }
    ).exec();
    return { success: true };
  } catch (e) {
    console.log(e);
  }
  return { success: false };
};

const login = async (otp, phone) => {
  try {
    const valid = await Otp.findOneAndDelete({ otp, phone, reason: "login" })
      .lean()
      .exec();
    if (valid) {
      const companyUser = await Company.findOne({ phoneNo: phone })
        .lean()
        .exec();
      const token = jwt.sign(
        { username: companyUser.username },
        process.env.TOKEN_SECRET
      );
      return {
        success: true,
        username: companyUser.username,
        token: token,
        _id: companyUser._id,
      };
    }
  } catch (e) {
    console.log(e);
  }

  return { success: false };
};

const changePhoneNumber = async (otp, oldPhone, newPhone) => {
  try {
    const valid = await Otp.findOne({
      otp,
      phone: newPhone,
      reason: "changePhone",
    })
      .lean()
      .exec();
    if (valid) {
      await Otp.deleteMany({
        $or: [{ phone: oldPhone }, { phone: newPhone }],
      }).exec();

      const erase_this_later = await Company.findOne({ phoneNo: newPhone });
      if (erase_this_later) throw "already exists!";

      const company = await Company.findOneAndUpdate(
        { phoneNo: oldPhone },
        { $set: { phoneNo: newPhone } },
        {
          new: true,
          useFindAndModify: false,
        }
      ).exec();
      return { success: true, company: company };
    }
  } catch (e) {
    console.log(e);
  }
  return { success: false };
};

const verifyOtp = async (phone, otp, reason) => {
  try {
    const valid = await Otp.findOne({ otp, phone, reason }).lean().exec();

    if (valid) {
      return { success: true };
    }
  } catch (e) {
    console.log(e);
  }
  return { success: false };
};

const changePassword = async (otp, phone, password) => {
  try {
    const company = await Company.findOne({ phoneNo: phone })
      .select("+password")
      .exec();
    if (!company) return { success: false };

    const valid = await Otp.findOneAndDelete({
      otp,
      phone,
      reason: "changePassword",
    })
      .lean()
      .exec();
    if (valid) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      company.password = hashedPassword;
      await company.save();
      return { success: true };
    }
  } catch (e) {
    console.log(e);
  }
  return { success: false };
};

module.exports.OtpController = {
  generateOtp,
  login,
  changePhoneNumber,
  changePassword,
  verifyOtp,
};
