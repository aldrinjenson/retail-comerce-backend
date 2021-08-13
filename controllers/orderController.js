const { ProductItem, Company } = require("../model");

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

const getCompany = async (query) => {
  try {
    const products = await ProductItem.find(query || {})
      .lean()
      .exec();
    return { data: products, err: null };
  } catch (error) {
    console.log("error in getting products" + error);
    return { err: error };
  }
};

module.exports.OrderController = { addCompany, getCompany };
