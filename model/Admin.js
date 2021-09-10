const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tgUserName: {
      type: String,
      required: false,
    },
    tgUserId: {
      type: Number,
      required: true,
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
