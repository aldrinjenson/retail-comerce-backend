const { Order } = require("../model");

const addOrder = async (order) => {
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
    const orders = await Order.find(query || {})
      .lean()
      .exec();
    const opts = ["product", "customer", "company"];
    const mainOrders = await Order.populate(orders, opts);
    return { data: mainOrders, err: null };
  } catch (error) {
    console.log("error in getting orders" + error);
    return { err: error };
  }
};

module.exports.OrderController = { addOrder, getOrders };
