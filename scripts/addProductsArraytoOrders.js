// script to add new fields to each Product Item
// not run in production
require("dotenv").config();
const mongoose = require("mongoose");
const { Order } = require("../model");

const main = async () => {
  try {
    const res = await Order.find({
      // company: mongoose.Types.ObjectId("612cc25c8f7ea50016b8df38"),
    })
      .lean()
      .exec();
    console.log(res);
    console.log(res.length);
    res.forEach(async (order) => {
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: order._id },
        {
          products: [{ product: order.product, quantity: 1 }],
          totalPrice: +(order.product.discountedPrice || order.product.price),
        }
      );
      console.log(updatedOrder);
    });
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
