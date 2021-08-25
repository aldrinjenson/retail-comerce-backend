// eslint-disable-next-line no-unused-vars
const axios = require("axios");
const fast2sms = require("fast-two-sms");
const { Order } = require("../model");

const addOrder = async (order) => {
  try {
    const newOrder = new Order({ ...order, status: "pending" });
    const savedOrder = await newOrder.save();
    const populatedOrder = await Order.populate(savedOrder, [
      "company",
      "product",
    ]);
    console.log("new Order saved");
    const msgText = `New order for ${newOrder.product.name} has been made by ${newOrder.orderedBy} from ${newOrder.orderedAddress}.\nCheck out more details by visiting the portal!\nHave a nice day:)\n- Fruit Bot (t.me/OK_fruitbot)`;
    var options = {
      authorization: process.env.FAST2SMS_API_KEY,
      message: msgText,
      numbers: [populatedOrder.company.phoneNo],
      sender_id: "SAI_REHAB",
    };
    fast2sms
      .sendMessage(options)
      .then((resp) => console.log("SMS sent to seller", resp))
      .catch((err) => {
        console.log("error in sending SMS: " + err);
      });

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
      .sort({ createdAt: -1 })
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
      .populate(["customer", "product", "company"])
      .exec();
    if (order.status === status) {
      console.log("same status");
      return { data: "Same status for order. Not updating ", err: 0 };
    }
    order.status = status;
    const newOrder = await order.save();
    console.log("Status updated");
    const botUrl = `${process.env.BOT_BASE_URL}/notify`;
    axios
      .post(botUrl, {
        payload: newOrder,
        type: "STATUS_UPDATE",
      })
      .catch((err) => console.log("err: " + err));

    // send sms message
    const msgText = `Your order for ${order.product.brand || ""} ${
      order.product.name
    } from ${order.company.name} has been ${
      order.status
    }. \nHave a nice day:)\n- Fruit Bot (t.me/OK_fruitbot)`;

    var options = {
      authorization: process.env.FAST2SMS_API_KEY,
      message: msgText,
      numbers: [order.orderedPhoneNo],
      sender_id: "SAI_REHAB",
    };
    fast2sms
      .sendMessage(options)
      .then(() => console.log("SMS sent"))
      .catch((err) => {
        console.log("error in sending SMS: " + err);
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
