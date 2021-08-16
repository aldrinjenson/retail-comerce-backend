const express = require("express");
const router = express.Router();
const { ProductItem } = require("../model");
const verifyAuth = require("./verify/verifyauth");
const { Company } = require("../model/Company");


router.post("/", verifyAuth, async (req, res) => {
  compName = await Company.findOne({_id: req.user._id});
  companyName = compName["name"];
  urls = req.body.images;
  const product = new ProductItem({
    name: req.body.model,
    brand: req.body.brand,
    price: req.body.price,
    discountedPrice: req.body.discountedPrice,
    type: req.body.type,
    description: req.body.description,
    imgUrls: urls,
    companyName: companyName,
    addedCompany:req.user._id,
  });
  try {
    const savedItem = await product.save();
    res.send(savedItem);
  } catch (err) {
    res.status(400).send(err);
  }   
});



module.exports.uploadRoute = router;