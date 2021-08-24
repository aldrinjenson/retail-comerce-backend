const mongoose = require("mongoose");
const { Schema } = mongoose;
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    products: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductItem"
        }
    ]    
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = { Category };
