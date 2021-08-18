// eslint-disable-next-line no-unused-vars
const axios = require("axios");
const { Order } = require("../model");

const addOrder = async (order) => {
  try {
    const newOrder = new Order({ ...order, status: "pending" });
    const savedOrder = await newOrder.save();
    const populatedOrder = await Order.populate(savedOrder, "company");
    console.log("new Order saved");
    return { data: populatedOrder, err: 0 };
  } catch (error) {
    console.log("Error in saving new order: " + error);
    return { data: error, err: 1 };
  }
};

const getOrders = async (query) => {
  try {
    const orders = await Order.find(query || {})
      .lean()
      .sort({ createdAt: 1 })
      .exec();
    const opts = ["product", "customer", "company"];
    const mainOrders = await Order.populate(orders, opts);
    return { data: mainOrders, err: null };
  } catch (error) {
    console.log("error in getting orders" + error);
    return { err: error };
  }
};

const updateOrder = async (params) => {
  const { _id, ...rest } = params;
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id },
      { ...rest },
      {
        new: true,
        useFindAndModify: false,
      }
    ).exec();

    console.log("Order updated");
    return { data: updatedOrder, err: null };
  } catch (error) {
    console.log("error in getting orders" + error);
    return { err: error };
  }
};
const updateStatus = async (params) => {
  const { _id, status } = params;
  try {
    const order = await Order.findOne({ _id })
      .populate(["customer", "product"])
      .exec();
    if (order.status === status) {
      console.log("same status");
      return { data: "Same status for order. Not updating ", err: 0 };
    }
    order.status = status;
    const newOrder = await order.save();
    console.log("Status updated");
    const botUrl = `${process.env.BOT_BASE_URL}/notify`;
    console.log(botUrl);
    axios.post(botUrl, {
      payload: newOrder,
      type: "STATUS_UPDATE",
    });
    return { data: newOrder, err: null };
  } catch (error) {
    console.log("error in getting orders" + error);
    return { err: error };
  }
};

module.exports.OrderController = {
  addOrder,
  getOrders,
  updateStatus,
  updateOrder,
};
