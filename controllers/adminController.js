const axios = require("axios");
const { Admin, TgUser } = require("../model");

const addAdmin = async (admin) => {
  try {
    const newAdmin = new Admin(admin);
    const savedAdmin = await newAdmin.save();
    console.log("New admin saved");
    return { data: savedAdmin, err: 0 };
  } catch (error) {
    console.log("Error in saving admin: " + error);
    return { data: "error", err: 1 };
  }
};

const broadcastToTgUsers = async (payload) => {
  const { msg, query = {} } = payload;
  try {
    const tgUsers = await TgUser.find(query).select("tgUserId").lean().exec();
    const botBroadcastUrl = `${process.env.BOT_BASE_URL}/broadcast`;
    const res = await axios.post(botBroadcastUrl, {
      payload: { msg, tgUsers },
      type: "BROADCAST",
    });
    return { data: res.data, err: 0 };
  } catch (error) {
    console.log("Error in broadcasting msg: " + error);
    return { data: "error", err: 1 };
  }
};

module.exports.AdminController = { addAdmin, broadcastToTgUsers };
