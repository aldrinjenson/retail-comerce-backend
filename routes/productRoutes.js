const express = require("express");
const { ProductController } = require("../controllers");
const router = express.Router();

router.get("/", async (req, res) => {
  const { query } = req;
  res.send(await ProductController.getProducts(query));
});

router.post("/", async (req, res) => {
  const { query } = req;
  res.send(await ProductController.addProducts(query));
});

module.exports.productRouter = router;
