const express = require("express");
const { ProductController } = require("../controllers");
const router = express.Router();

router.get("/", async (req, res) => {
  const { query } = req;
  res.send(await ProductController.getProducts(query));
});
router.get("/search", async (req, res) => {
  const { query } = req;
  res.send(await ProductController.searchProducts(query));
});

router.post("/", async (req, res) => {
  const { products } = req.body;
  res.send(await ProductController.addProducts(products));
});

module.exports.productRouter = router;
