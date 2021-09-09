const { Admin } = require("../model");

const addAdmin = async (admin) => {
  try {
    const newAdmin = new Admin(admin);
    const savedAdmin = await newAdmin.save();
    console.log("New admin saved");
    return { data: savedAdmin, err: 0 };
  } catch (error) {
    console.log("Error in saving admin: " + error);
    return { data: "error", err: 1 };
  }
};

module.exports.AdminController = { addAdmin };
