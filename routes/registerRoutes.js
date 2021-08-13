const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { Company } = require("../model/Company");

router.post("/", async (req, res) => {
  // check if username already exist in db
  const iscompany = await Company.findOne({ username: req.body.username });
  if (iscompany) {
    return res.status(400).send("username already exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const company = new Company({
    username: req.body.username,
    name: req.body.name,
    hasProducts: false,
    phoneNo: req.body.phoneNo,
    locality: req.body.locality,
    pinCode: req.body.pinCode,
    district: req.body.district,
    state: req.body.state,
    email: "",
    upi: "",
    password: hashedPassword,
  });

  try {
    const savedCompany = await company.save();
    res.send(savedCompany);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports.registerRouter = router;
