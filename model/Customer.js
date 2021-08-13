const mongoose = require("mongoose");
const { Schema } = mongoose;
const CustomerSchema = new Schema(
  {
    tgUserName: {
      type: String,
      required: true,
    },
    tgUserId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    addresss: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = { Customer };
