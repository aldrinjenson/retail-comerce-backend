const { CompanyController } = require("./companyController");
const { CustomerController } = require("./customerController");
const { OrderController } = require("./orderController");
const { ProductController } = require("./productController");
const { OtpController } = require("./otpController");
const { AdminController } = require("./adminController");
const { TgUserContorller } = require("./tgUserController");

module.exports = {
  ProductController,
  CompanyController,
  CustomerController,
  OrderController,
  OtpController,
  AdminController,
  TgUserContorller,
};
