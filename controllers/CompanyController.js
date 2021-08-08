const { Company } = require("../model");
const { escapeRegex } = require("../utils/misc");

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
    console.log("Company saved");
    return savedCompany;
  } catch (err) {
    console.log("error in saving:  " + err);
    return { msg: "error: " + err, err: 1 };
  }
};

const getCompany = async (searchTerm) => {
  let query = {};
  if (searchTerm) {
    query = { name: new RegExp(escapeRegex(searchTerm), "gi") };
  }
  try {
    const companies = await Company.find(query).lean().exec();
    return { data: companies, err: null };
  } catch (error) {
    return { err: error };
  }
};

module.exports.CompanyController = { addCompany, getCompany };
