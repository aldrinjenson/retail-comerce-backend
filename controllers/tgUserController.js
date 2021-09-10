const { TgUser } = require("../model");
const { getCoordinatesFromPin } = require("../utils/misc");

const getTgUser = async (query = {}) => {
  try {
    const tgUsers = await TgUser.find(query).lean().exec();
    return { data: tgUsers, err: 0 };
  } catch (error) {
    console.log("Error in getting tgUser: " + error);
    return { data: "error", err: 1 };
  }
};

const addTgUser = async (tgUser) => {
  const { tgUserId, pinCode } = tgUser;
  if (pinCode) {
    tgUser.location = {
      type: "Point",
      coordinates: await getCoordinatesFromPin(pinCode),
    };
  }

  try {
    const existingTgUser = await TgUser.findOneAndUpdate({ tgUserId }, tgUser, {
      new: true,
      useFindAndModify: false,
    }).exec();

    if (existingTgUser) {
      console.log("TgUser already exists");
      return {
        data: await TgUser.populate(existingTgUser, "cartItems.product"),
        err: 0,
      };
    }
    // if tgUser doesn't exist in db
    const newTgUser = new TgUser(tgUser);
    const savedTgUser = await newTgUser.save();
    console.log("TgUser saved");
    return { data: savedTgUser, err: 0 };
  } catch (err) {
    console.log("error in adding tgUser: " + err);
    return { msg: "error: " + err, err: 1 };
  }
};

module.exports.TgUserContorller = { getTgUser, addTgUser };
