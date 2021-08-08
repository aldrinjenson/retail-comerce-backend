const express = require("express");
const router = express.Router();
const { companyRouter } = require("./companyRoutes");
const { productRouter } = require("./productRoutes");

// todo: add req body validation using 'joi' library
router.get("/", (req, res) => {
  res.send("Server active\nCurrent Time: " + new Date());
});

router.use("/company", companyRouter);
router.use("/products", productRouter);

module.exports.indexRouter = router;
