require("dotenv").config();
var mongoose = require("mongoose");
const { Order, ProductItem } = require("../model");

async function prodToOrder() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("connected to db");

    const orders = await Order.find().lean().exec();

    for (let i = 0; i < orders.length; i++) {
      if(!orders[i].product.addedCompany) {
        const product = await ProductItem.findById(orders[i].product).exec()
        orders[i].product = product;
        await Order.findByIdAndUpdate(orders[i]._id, {$set: {'product':product} }, { useFindAndModify:false, new: true })
        console.log(`saved product ${product._id} to order ${orders[i]._id}`)
      }
        
    } 

    console.log("done");
    process.exit();
  } catch (e) {
    console.log(e);
  }
}

prodToOrder();