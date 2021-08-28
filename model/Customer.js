const mongoose = require("mongoose");
const { Schema } = mongoose;
const CustomerSchema = new Schema(
  {
    tgUserName: {
      type: String,
      required: false,
    },
    tgUserId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    tgFullName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    location: {
      lat: {
        type: Number,
        required: false,
      },
      long: {
        type: Number,
        required: false,
      },
      isAvailable: {
        type: Boolean,
        required: false,
      },
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = { Customer };
