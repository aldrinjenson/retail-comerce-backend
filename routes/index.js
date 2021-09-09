const express = require("express");
const router = express.Router();
const { companyRouter } = require("./companyRoutes");
const { productRouter } = require("./productRoutes");
const { registerRouter } = require("./registerRoutes");
const { loginRouter } = require("./loginRoutes");
const { dashboard } = require("./dashboard");
const { customerRouter } = require("./customerRoutes");
const { orderRouter } = require("./orderRoutes");
const { categoryRouter } = require("./categoryRoutes");
const { otpRouter } = require("./otpRoutes");
const { adminRouter } = require("./adminRoutes");

// todo: add req body validation using 'joi' library
router.get("/", (req, res) => {
  res.send("Server active\nCurrent Time: " + new Date());
});

router.use("/company", companyRouter);
router.use("/product", productRouter);
router.use("/customer", customerRouter);
router.use("/order", orderRouter);
router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/dashboard", dashboard);
router.use("/category", categoryRouter);
router.use("/otp", otpRouter);
router.use("/admin", adminRouter);

module.exports.indexRouter = router;
