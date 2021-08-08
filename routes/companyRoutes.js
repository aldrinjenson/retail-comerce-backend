const express = require("express");
const router = express.Router();
const { CompanyController } = require("../controllers");

router.get("/", async (req, res) => {
  const { query } = req.body;
  res.send(await CompanyController.getCompany(query));
});

router.post("/add", async (req, res) => {
  const { company } = req.body;
  res.send(await CompanyController.addCompany(company));
});

module.exports.companyRouter = router;
