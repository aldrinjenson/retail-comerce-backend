const express = require("express");
const router = express.Router();
const { CompanyController } = require("../controllers");

router.get("/", async (req, res) => {
  const { query } = req;
  res.send(await CompanyController.getCompany(query));
});

router.post("/", async (req, res) => {
  const { company } = req.body;
  res.send(await CompanyController.addCompany(company));
});

router.patch("/", async (req, res) => {
  const { company } = req.body;
  res.send(await CompanyController.updateCompany(company));
});

module.exports.companyRouter = router;
