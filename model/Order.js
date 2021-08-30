const mongoose = require("mongoose");
const { GeoSchema } = require("./Misc");
const { ProductItemSchema } = require("./ProductItem");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    paymentMethod: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    product: {
      type: ProductItemSchema,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
    status: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: false,
    },
    orderedBy: {
      type: String,
      required: true,
    },
    orderedPhoneNo: {
      type: String,
      required: true,
    },
    orderedAddress: {
      type: String,
      required: true,
    },
    orderedEmail: {
      type: String,
      required: false,
    },
    location: GeoSchema,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = { Order };
