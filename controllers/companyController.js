const { Company } = require("../model");

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

module.exports.CompanyController = { getCompany, updateCompany };
