const mongoose = require("mongoose");
const { GeoSchema } = require("./Misc");
const { Schema } = mongoose;

const TgUserSchema = new Schema(
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
    pinCode: {
      type: Number,
      required: false,
    },
    location: {
      type: GeoSchema,
      required: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    parentCompany: {
      // for seller only
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Company",
    },
    industry: [{ type: String, default: "fruit" }],
  },
  { timestamps: true }
);

const TgUser = mongoose.model("TgUser", TgUserSchema);
module.exports = { TgUser };
