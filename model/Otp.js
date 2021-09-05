const mongoose = require("mongoose");
const { Schema } = mongoose;

const OtpSchema = new Schema({
  reason: {
    type: String,
    required: true,
    enum: ["login", "changePhone", "changePassword"],
  },
  otp: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }
  }, {
    timestamps: true
  }
);

const Otp = mongoose.model("Otp", OtpSchema);
module.exports = { Otp };
