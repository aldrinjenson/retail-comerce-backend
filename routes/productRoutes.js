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
  res.send(await ProductController.addProducts(req));
});
router.patch("/", async (req, res) => {
  res.send(await ProductController.updateProduct(req));
});

module.exports.productRouter = router;
