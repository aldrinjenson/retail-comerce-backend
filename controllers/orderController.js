const { default: axios } = require("axios");
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

const updateStatus = async (params) => {
  const { _id, status } = params;
  console.log(params);
  try {
    const order = await Order.findOne({ _id })
      .populate({ path: "customer" })
      .exec();
    // if (order.status === status) {
    //   console.log("same status");
    //   return { data: "Not updated ", err: null };
    // }
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

module.exports.OrderController = { addOrder, getOrders, updateStatus };
