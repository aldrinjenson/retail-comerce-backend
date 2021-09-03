const express = require("express");
const router = express.Router();
const { OtpController } = require("../controllers");
const { Otp, Company } = require("../model");

//post to /login => login
//patch to /login => send / resend OTP
//patch to /:phone => change phone number send / resend OTP
//post to /:phone => change phone number

router.get("/", async (req, res) => {
  try {
    const x = await Otp.find({}).lean().exec();
    res.send(x);
  } catch (e) {
    res.send("error");
  }
});

router.post("/login", async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    res.sendStatus(404);
    return;
  }
  res.send(await OtpController.login(otp, phone));
});

router.patch("/login", async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    res.sendStatus(404);
    return;
  }
  res.send(await OtpController.generateOtp("login", phone));
});

router.post("/verify", async (req, res) => {
  const { phone, otp, reason } = req.body;
  if (!phone || !otp || !reason) {
    res.sendStatus(404);
    return;
  }
  res.send(await OtpController.verifyOtp(phone, otp, reason));
});

router.post("/forgot/:phone", async (req, res) => {
  const { otp, password } = req.body;
  if (!otp || !password) {
    res.sendStatus(404);
    return;
  }
  const phone = req.params.phone;
  res.send(await OtpController.changePassword(otp, phone, password));
});

router.patch("/forgot/:phone", async (req, res) => {
  const phoneNo = req.params.phone;

  const c = await Company.findOne({ phoneNo }).lean().exec();
  if (!c) {
    res.sendStatus(404);
    return;
  }
  res.send(await OtpController.generateOtp("changePassword", phoneNo));
});

router.post("/phone/:oldphone", async (req, res) => {
  const { otp, phone } = req.body;
  if (!otp || !phone) {
    res.sendStatus(404);
    return;
  }
  const oldPhone = req.params.oldphone;
  res.send(await OtpController.changePhoneNumber(otp, oldPhone, phone));
});

router.patch("/phone/:phone", async (req, res) => {
  const phone = req.params.phone;
  res.send(await OtpController.generateOtp("changePhone", phone));
});

module.exports.otpRouter = router;
