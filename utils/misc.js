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
  try {
    const [geoData] = (
      await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?&address=${pinCode}&key=${process.env.G_MAPS_API_KEY}`
      )
    ).data.results;
    const { lat, lng } = geoData.geometry.location;
    return [lng, lat];
  } catch (err) {
    console.log(`Error in getting coordinates from pinCode ${pinCode}: ` + err);
    return [];
  }
};

const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
  const earthRadiusKm = 6371;
  const degreesToRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
  };
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
};

module.exports = {
  sendSmsMsg,
  getCoordinatesFromPin,
  distanceInKmBetweenEarthCoordinates,
};
