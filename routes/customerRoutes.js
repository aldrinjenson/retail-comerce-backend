const express = require("express");
const router = express.Router();
const { CustomerController } = require("../controllers");

router.get("/", async (req, res) => {
  const { query } = req;
  res.send(await CustomerController.getCustomer(query));
});

router.post("/", async (req, res) => {
  const { body: customer } = req;
  res.send(await CustomerController.addCustomer(customer));
});

module.exports.customerRouter = router;
