const express = require("express");
const router = express.Router();
const { companyRouter } = require("./companyRoutes");
const { productRouter } = require("./productRoutes");
const { registerRouter } = require("./registerRoutes");
const { loginRouter } = require("./loginRoutes");
const { dashboard } = require("./dashboard");

// todo: add req body validation using 'joi' library
router.get("/", (req, res) => {
  res.send("Server active\nCurrent Time: " + new Date());
});

router.use("/company", companyRouter);
router.use("/products", productRouter);
router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/dashboard", dashboard);

module.exports.indexRouter = router;
