const express = require("express");
const router = express.Router();
const { CustomerController } = require("../controllers");

router.get("/", async (req, res) => {
  const { query } = req;
  res.send(await CustomerController.getCustomer(query));
});

router.post("/", async (req, res) => {
  const { query } = req;
  console.log(query);
  res.send(await CustomerController.addCustomer(query));
});

module.exports.customerRouter = router;
