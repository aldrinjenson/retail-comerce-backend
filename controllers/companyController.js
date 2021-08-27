const { Company } = require("../model");
const { sendSmsMsg } = require("../utils/misc");

const addCompany = async (company) => {
  const { email } = company;
  const savedCompany = await Company.findOne({ email }).exec();
  if (savedCompany) {
    console.log("User already saved and present in db");
    return savedCompany;
  }
  const newCompany = new Company(company);
  try {
    const savedCompany = await newCompany.save();
    if (savedCompany) {
      console.log("Company saved");
      sendSmsMsg(
        company.phoneNo,
        `You have been successfully registered in ${process.env.PORTAL_NAME}.\n For getting updates for your orders, you can always visit ${process.env.PORTAL_URL}`
      );
      return savedCompany;
    }
  } catch (err) {
    console.log("error in saving:  " + err);
    return { msg: "error: " + err, err: 1 };
  }
};

const updateCompany = async (company) => {
  try {
    const { username } = company;
    const res = await Company.findOneAndUpdate({ username }, company, {
      new: true,
      useFindAndModify: false,
    }).exec();
    return res;
  } catch (e) {
    console.log("error in updating:  " + e);
    return { msg: "error in updating " + e, err: e };
  }
};

const getCompany = async (query) => {
  try {
    const companies = await Company.find(query || {})
      .lean()
      .exec();
    return { data: companies, err: null };
  } catch (error) {
    return { msg: "error in getting company", err: error };
  }
};

module.exports.CompanyController = { addCompany, getCompany, updateCompany };
