const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { Company } = require("../model/Company");
const { sendSmsMsg, getCoordinatesFromPin } = require("../utils/misc");

router.post("/", async (req, res) => {
  // check if username already exist in db
  try {
    const iscompany = await Company.findOne({ username: req.body.username });
    if (iscompany) {
      return res.status(400).send("username already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const { pinCode } = req.body;
    console.log(req.body);
    const location = {
      type: "Point",
      coordinates: await getCoordinatesFromPin(pinCode),
    };

    const company = new Company({
      username: req.body.username,
      name: req.body.name,
      hasProducts: false,
      phoneNo: req.body.phoneNo,
      locality: req.body.locality,
      district: req.body.district,
      state: req.body.state,
      email: "",
      upi: "",
      password: hashedPassword,
      pinCode,
      location,
    });

    const savedCompany = await company.save();
    console.log("Company saved");
    sendSmsMsg(
      company.phoneNo,
      `You have been successfully registered in ${process.env.PORTAL_NAME}.\n For getting updates for your orders, you can always visit ${process.env.PORTAL_URL}`
    );
    res.send(savedCompany);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports.registerRouter = router;
