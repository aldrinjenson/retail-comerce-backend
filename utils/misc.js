const fast2sms = require("fast-two-sms");
const axios = require("axios");

const sendSmsMsg = async (number, msgText) => {
  const options = {
    authorization: process.env.FAST2SMS_API_KEY,
    message: msgText,
    numbers: [number],
    sender_id: "SAI_REHAB",
  };
  try {
    const resp = await fast2sms.sendMessage(options);
    if (!resp) {
      console.log("error in sending SMS");
    } else {
      console.log("SMS sent", resp.message);
    }
  } catch (error) {
    console.log("Error in sending SMS: " + error);
  }
};

const getCoordinatesFromPin = async (pinCode) => {
  const [geoData] = (
    await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?&address=${pinCode}&key=${process.env.G_MAPS_API_KEY}`
    )
  ).data.results;
  const { lat, lng } = geoData.geometry.location;
  return [lng, lat];
};

module.exports = { sendSmsMsg, getCoordinatesFromPin };
