// script to add new fields to each Product Item
// not run in production
require("dotenv").config();
const mongoose = require("mongoose");
const { ProductItem } = require("../../model");

const main = async () => {
  try {
    // let res = await Company.find({}).exec();
    const res = await ProductItem.updateMany(
      { isOutOfStock: null },
      { isOutOfStock: false },
      {
        new: true,
        useFindAndModify: false,
        multi: true,
      }
    ).exec();
    console.log(res);

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
