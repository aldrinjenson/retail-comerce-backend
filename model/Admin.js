const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    tgUserName: {
      type: String,
      required: false,
    },
    tgUserId: {
      type: Number,
      required: true,
      unique: true,
    },
    industry: [
      {
        type: String,
        default: "fruit",
      },
    ],
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = { Admin };
