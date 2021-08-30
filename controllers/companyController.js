const { Company } = require("../model");
const { getCoordinatesFromPin } = require("../utils/misc");

const updateCompany = async (company) => {
  try {
    const { username, pinCode } = company;
    if (pinCode) {
      company.location = {
        type: "Point",
        coordinates: await getCoordinatesFromPin(pinCode),
      };
    }
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
    let modifiedQuery = query || {};
    const { pinCode } = query;
    if (pinCode) {
      const coordinates = await getCoordinatesFromPin(pinCode);
      modifiedQuery = {
        ...query,
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates,
            },
            $maxDistance: 10000, // specified in meters
          },
        },
      };
    }
    const companies = await Company.find(modifiedQuery).lean().exec();
    return { data: companies, err: null };
  } catch (error) {
    return { msg: "error in getting company", err: error };
  }
};

module.exports.CompanyController = { getCompany, updateCompany };
