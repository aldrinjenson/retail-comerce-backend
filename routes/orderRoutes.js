const express = require("express");
const router = express.Router();
const { CustomerController } = require("../controllers");

router.get("/", async (req, res) => {
  const { query } = req;
  res.send(await CustomerController.getCompany(query));
});

router.post("/", async (req, res) => {
  const { query } = req;
  res.send(await CustomerController.addCustomer(query));
});

module.exports.orderRouter = router;
