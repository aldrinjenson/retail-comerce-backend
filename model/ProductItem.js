const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    discountedPrice: {
      type: String,
      required: false,
    },
    imgUrls: {
      type: [String],
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyEmail: {
      type: String,
      required: false,
    },
    addedCompany: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    baseQuantity: {
      type: Number,
      default: 1,
    },
    unit: {
      type: String,
      default: "nos.",
    },
    isOutOfStock: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ProductItem = mongoose.model("ProductItem", ProductItemSchema);
module.exports = { ProductItem, ProductItemSchema };
