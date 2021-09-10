const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Company } = require("../model/Company");

router.post("/", async (req, res) => {
  // check if username already exist in db
  try {
    const company = await Company.findOne({ username: req.body.username })
      .select("+password")
      .exec();

    if (!company) {
      return res.status(400).send({ success: false });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      company.password
    );

    if (!validPassword) return res.status(400).send("invalid password"); // check the passfor the username

    const token = jwt.sign(
      { username: company.username },
      process.env.TOKEN_SECRET
    );
    res.send({
      success: true,
      username: company.username,
      token: token,
      _id: company._id,
      company,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports.loginRouter = router;
