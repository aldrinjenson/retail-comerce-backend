const { Company } = require("../model");
const {
  getCoordinatesFromPin,
  distanceInKmBetweenEarthCoordinates,
} = require("../utils/misc");

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

const getCompany = async (query = {}) => {
  try {
    const companies = await Company.find(query).lean().exec();
    return { data: companies, err: null };
  } catch (error) {
    return { msg: "error in getting company", err: error };
  }
};

const getCompaniesFromPinCode = async (query) => {
  const { pinCode, ...rest } = query;
  try {
    const pinCoordinates = await getCoordinatesFromPin(pinCode);
    const modifiedQuery = {
      ...rest,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: pinCoordinates,
          },
          $maxDistance: 25000, // specified in meters
        },
      },
    };

    const companies = await Company.find(modifiedQuery).lean().exec();
    const filteredCompanies = companies.filter((company) => {
      if (!company.location?.coordinates || !company.maxRadius) {
        return true;
      }
      const [cLong, cLat] = company.location.coordinates;
      const [uLong, uLat] = pinCoordinates;
      let diff = distanceInKmBetweenEarthCoordinates(cLat, cLong, uLat, uLong);
      return diff < company.maxRadius;
    });
    return { data: filteredCompanies, err: null };
  } catch (error) {
    return { msg: "error in getting company from pinCode", err: error };
  }
};

module.exports.CompanyController = {
  getCompany,
  updateCompany,
  getCompaniesFromPinCode,
};
