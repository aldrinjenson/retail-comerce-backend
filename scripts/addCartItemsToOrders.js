// script to add new products array to each product Item
require("dotenv").config();
const mongoose = require("mongoose");
const { Order } = require("../model");

const main = async () => {
  const orders = await Order.find({}).lean().exec();
  console.log(orders);
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
