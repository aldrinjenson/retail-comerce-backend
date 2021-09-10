const axios = require("axios");
const { Order } = require("../model");
const { SellerService } = require("../services");
const { AdminService } = require("../services/adminService");
const { sendSmsMsg } = require("../utils/misc");

const addOrder = async (order) => {
  try {
    const newOrder = new Order({
      ...order,
      status: "pending",
    });
    const savedOrder = await newOrder.save();
    const populatedOrder = await Order.populate(savedOrder, ["company"]);

    const [{ product }, ...others] = order.products;
    const othersLength = others.length;

    console.log("new Order saved");
    sendSmsMsg(
      populatedOrder.company.phoneNo,
      `New order for ${product.brand || ""} ${product.name} ${
        othersLength ? ` and ${othersLength} others` : ""
      } has been made by ${newOrder.orderedBy}.\n\nFor more details visit ${
        process.env.PORTAL_URL
      }.\n- ${process.env.BOT_NAME}`
    );
    AdminService.notifyAdminOnOrder(order, "ORDER_CREATED");
    SellerService.notifysellerOnOrder(order, "ORDER_CREATED");

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
    const opts = ["customer", "company"];
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

    const opts = ["customer", "company"];
    const mainOrder = await Order.populate(updatedOrder, opts);
    return { data: mainOrder, err: null };
  } catch (error) {
    console.log("error in getting orders" + error);
    return { err: error };
  }
};

const updateStatus = async (params) => {
  const { _id, status } = params;
  try {
    const order = await Order.findOne({ _id })
      .populate(["customer", "company"])
      .exec();
    if (order.status === status) {
      console.log("same status");
      return { data: "Same status for order. Not updating ", err: 0 };
    }
    if (order.status === "cancelled") {
      console.log(`Order is already cancelled: ${_id}`);
      return { data: "Order is already cancelled!. Not updating ", err: 0 };
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

    const [firstItem, ...others] = order.products;
    const firstProduct = firstItem.product;
    const othersLength = others.length;
    sendSmsMsg(
      order.orderedPhoneNo,
      `Your order for ${firstProduct.brand || ""} ${firstProduct.name} ${
        othersLength ? ` and ${othersLength} others` : ""
      } from ${order.company.name} has been ${order.status}.\n- ${
        process.env.BOT_NAME
      } (t.me/${process.env.BOT_TG_ID})`
    );

    if (status === "cancelled") {
      sendSmsMsg(
        order.company.phoneNo,
        `Order for ${firstProduct.brand || ""} ${firstProduct.name} ${
          othersLength ? ` and ${othersLength} others` : ""
        } by ${
          order.orderedBy
        } has been cancelled.\nTo know more details, visit ${
          process.env.PORTAL_URL
        }\n- ${process.env.BOT_NAME}`
      );
      AdminService.notifyAdminOnOrder(order, "ORDER_CANCELLED");
      SellerService.notifysellerOnOrder(order, "ORDER_CANCELLED");
    }

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
