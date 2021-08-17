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

router.patch("/", async (req, res) => {
  // for updating feedback
  const { body } = req;
  res.send(await OrderController.updateOrder(body));
});

router.patch("/status", async (req, res) => {
  const { body } = req;
  res.send(await OrderController.updateStatus(body));
});

module.exports.orderRouter = router;
