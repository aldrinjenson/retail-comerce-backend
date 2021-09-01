const mongoose = require("mongoose");
const { Schema } = mongoose;

const GeoSchema = new Schema({
  type: { type: String, default: "Point" },
  coordinates: {
    type: [Number],
    index: "2dsphere",
    required: false,
  },
});

module.exports = { GeoSchema };
