const express = require("express");
const { ProductController } = require("../controllers");
const router = express.Router();

router.get("/", async (req, res) => {
  const { query } = req.body;
  res.send(await ProductController.getProducts(query));
});

router.post("/add", async (req, res) => {
  const { products } = req.body;
  res.send(await ProductController.addProducts(products));
});

module.exports.productRouter = router;
