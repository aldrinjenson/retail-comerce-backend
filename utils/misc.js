const fast2sms = require("fast-two-sms");

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

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
      console.log("SMS sent", resp);
    }
  } catch (error) {
    console.log("Error in sending SMS: " + error);
  }
};

module.exports = { escapeRegex, sendSmsMsg };
