const { ProductItem, Order } = require("../model");

const addOrder = async (order) => {
  console.log(order);
  try {
    const newOrder = new Order({ ...order, status: "pending" });
    const savedOrder = await newOrder.save();
    console.log("new Order saved");
    return { data: savedOrder, err: 0 };
  } catch (error) {
    console.log("Error in saving new order: " + error);
    return { data: error, err: 1 };
  }
};

const getOrders = async (query) => {
  try {
    const products = await ProductItem.find(query || {})
      .lean()
      .exec();
    return { data: products, err: null };
  } catch (error) {
    console.log("error in getting products" + error);
    return { err: error };
  }
};

module.exports.OrderController = { addOrder, getOrders };
