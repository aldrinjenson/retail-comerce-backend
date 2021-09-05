// script to add new fields to each Product Item
// not run in production
require("dotenv").config();
const mongoose = require("mongoose");
const { Order } = require("../model");

const main = async () => {
  try {
    const updatedOrders = await Order.updateMany(
      {},
      { $unset: { product: "" } }
    );
    console.log(updatedOrders);
  } catch (error) {
    console.log(error);
  }
};
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    main();
  });
