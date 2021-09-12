const axios = require("axios");
const { Admin } = require("../model");

const notifyAdminOnOrder = async (order, type, query = {}) => {
  try {
    const admins = await Admin.find(query).select("tgUserId").lean().exec();
    const botBroadcastUrl = `${process.env.ADMIN_BOT_BASE_URL}/notify`;
    axios
      .post(botBroadcastUrl, {
        payload: { order, admins },
        type,
      })
      .then(() => console.log("Notified admins"))
      .catch((err) => console.log("no response from admin bot: " + err));
  } catch (err) {
    console.log("Error in notifying admin" + err);
  }
};

module.exports.AdminService = { notifyAdminOnOrder };
