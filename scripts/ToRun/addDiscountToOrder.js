// script to add new fields to each Product Item
// not run in production
require("dotenv").config();
const mongoose = require("mongoose");
const { Order } = require("../../model");

const main = async () => {
  try {
    let orders = await Order.find({}).exec();
    console.log(orders.length);
    orders.forEach(async (order) => {
      try {
        const updatedOrder = await Order.findByIdAndUpdate(order._id, {
          subTotalPrice: order.totalPrice,
          discountAvailable: 0,
          deliveryCharge: 0,
        });
        console.log(updatedOrder);
      } catch (error) {
        console.log("error : " + error);
      }
    });

    // console.log("Total = " + res.n, "Modified = " + res.nM);
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
