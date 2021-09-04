// script to add new fields to each Product Item
// not run in production
require("dotenv").config();
const mongoose = require("mongoose");
const { ProductItem } = require("../model");

const main = async () => {
  try {
    let res = await ProductItem.find({}).exec();
    res.forEach((product) => {
      if (product.type === "Fruit") {
        ProductItem.findOneAndUpdate(
          { _id: product._id },
          {
            isOutOfStock: false,
            baseQuantity: 1,
            unit: "kg",
            price: +product.price,
            discountedPrice: +product.discountedPrice,
          },
          {
            new: true,
            useFindAndModify: false,
          }
        ).then((res) => console.log(res));
      } else {
        ProductItem.findOneAndUpdate(
          { _id: product._id },
          {
            isOutOfStock: false,
            baseQuantity: 1,
            unit: "nos.",
            price: +product.price,
            discountedPrice: +product.discountedPrice,
          },
          {
            new: true,
            useFindAndModify: false,
          }
        ).then((res) => console.log(res));
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
