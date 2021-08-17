// const express = require("express");
// const router = express.Router();
const { ProductItem } = require("../model");

const { Company } = require("../model/Company");


const addProducts = async (req) => {
  
  try {
  const compId = req.body.companyId;
  const comp = await Company.findOne({ _id: compId });
  const compName = comp["name"]
  const urls = req.body.images;
  
  var newvalue = { $set: { hasProducts: true } };
  Company.updateOne({ _id:compId}, newvalue,function(err) {
    if (err) throw err;
    console.log("1 document updated");
  });

 // update hasProduct Field to be True in companies collection
  
  const product = new ProductItem({
    name: req.body.model,
    brand: req.body.brand,
    price: req.body.price,
    discountedPrice: req.body.discountedPrice,
    type: req.body.type,
    description: req.body.description,
    imgUrls: urls,
    companyName: compName,
    addedCompany: compId,
  });
    const savedItem = await product.save();
    console.log(savedItem);
    return {msg: "product saved", err: 0};
  } catch (err) {
    return {err: err};
  }
};





  

const getProducts = async (query) => {
  // query is optional
  try {
    const products = await ProductItem.find(query || {})
      .lean()
      .exec();
    return { data: products, err: null };
  } catch (error) {
    console.log("error in getting products" + error);
    return { err: error };
  }
};

const searchProducts = async (query) => {
  try {
    const { searchTerm } = query;
    const products = await ProductItem.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { type: { $regex: searchTerm, $options: "i" } },
        { brand: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .lean()
      .exec();
    return { data: products, err: null };
  } catch (err) {
    console.log("error in searching products" + err);
    return { err: err };
  }
};

module.exports.ProductController = { addProducts, getProducts, searchProducts };
