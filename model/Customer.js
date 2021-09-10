const mongoose = require("mongoose");
const { CartItemSchema } = require("./Misc");
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
      unique: true,
    },
    tgFullName: {
      type: String,
      required: false,
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
    email: {
      type: String,
      required: false,
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: {
        type: [Number],
        index: "2dsphere",
        required: false,
      },
    },
    cartItems: [CartItemSchema],
    pinCode: {
      type: Number,
      required: false,
    },
    tgDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TgUser",
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = { Customer };
