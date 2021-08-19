const mongoose = require("mongoose");
const { Schema } = mongoose;
const CompanySchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    hasProducts: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    upi: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    description: {
      type: String,
      required: false,
    },
    upiPhoneNumber: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);
module.exports = { Company };
