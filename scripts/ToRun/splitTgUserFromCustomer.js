// script to generate tgUser table from customers
require("dotenv").config();
const mongoose = require("mongoose");
const { Customer, TgUser } = require("../../model");

const main = async () => {
  const customers = await Customer.find({}).exec();
  customers.forEach(async (customer) => {
    try {
      const { tgUserName, tgUserId, tgFullName, pinCode, location } = customer;
      const tgUser = new TgUser({
        tgUserName,
        tgUserId,
        tgFullName,
        location,
        pinCode,
      });
      const savedTgUser = await tgUser.save();
      console.log(savedTgUser);
    } catch (error) {
      console.log(error);
    }
  });
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
