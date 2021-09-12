const axios = require("axios");
const { TgUser } = require("../model");

const notifysellerOnOrder = async (order, type) => {
  try {
    const sellers = await TgUser.find({
      isSeller: true,
      parentCompany: order.company._id,
    })
      .select("tgUserId")
      .lean()
      .exec();
    const sellerBotNotifyUrl = `${process.env.SELLER_BOT_BASE_URL}/notify`;
    axios
      .post(sellerBotNotifyUrl, {
        payload: { order, sellers },
        type,
      })
      .then(() => console.log("Notified sellers"))
      .catch((err) => console.log("no response from seller bot: " + err));
  } catch (err) {
    console.log("Error in notifying seller" + err);
  }
};

module.exports.SellerService = { notifysellerOnOrder };
