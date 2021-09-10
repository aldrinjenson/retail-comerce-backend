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

const CartItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductItem",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const DeliveryDetailSchema = new Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const DiscountSchema = new Schema({
  minDistance: {
    type: Number,
    required: true,
  },
  Dtype: {
    type: String,
    required: true,
    enum: ["$", "%"],
  },
  value: {
    type: Number,
    required: true,
  },
});

module.exports = {
  GeoSchema,
  CartItemSchema,
  DeliveryDetailSchema,
  DiscountSchema,
};
