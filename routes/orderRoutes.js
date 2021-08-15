const express = require("express");
const router = express.Router();
const { OrderController } = require("../controllers");

router.get("/", async (req, res) => {
  const { query } = req;
  res.send(await OrderController.getOrders(query));
});

router.post("/", async (req, res) => {
  const { body: order } = req;
  res.send(await OrderController.addOrder(order));
});

module.exports.orderRouter = router;
