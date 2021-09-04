// const express = require("express");
// const router = express.Router();
const { ProductItem } = require("../model");
const { Category } = require("../model/Category");
const { Company } = require("../model/Company");
const { getCoordinatesFromPin } = require("../utils/misc");

const addProducts = async (req) => {
  try {
    const compId = req.body.companyId;
    const comp = await Company.findOne({ _id: compId });
    const product = new ProductItem({
      name: req.body.model,
      brand: req.body.brand,
      price: +req.body.price,
      discountedPrice: +req.body.discountedPrice,
      type: req.body.type,
      description: req.body.description,
      imgUrls: req.body.images,
      companyName: comp.name,
      companyLocation: comp.locality,
      addedCompany: compId,
      isOutOfStock: false,
      baseQuantity: req.body.baseQuantity,
      unit: req.body.unit,
    });
    const p = await product.save();
    await Category.findOneAndUpdate(
      { company: compId, name: req.body.type },
      { $push: { products: p._id } }
    );

    // update hasProduct Field to be True in companies collection when a product is added
    const newvalue = { $set: { hasProducts: true } };
    Company.updateOne({ _id: compId }, newvalue, function (err) {
      if (err) throw err;
    });
    return { msg: "product saved", err: 0 };
  } catch (err) {
    return { err: err };
  }
};

const getProducts = async (query) => {
  try {
    const products = await ProductItem.find({ ...query } || {})
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
    const { searchTerm, pinCode } = query;
    let productQuery = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { type: { $regex: searchTerm, $options: "i" } },
        { brand: { $regex: searchTerm, $options: "i" } },
      ],
      // isOutOfStock: false,
    };
    if (pinCode) {
      const companyQuery = {
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: await getCoordinatesFromPin(pinCode),
            },
            $maxDistance: 25000, // specified in meters
          },
        },
      };
      const companies = await Company.find(companyQuery, "_id").lean().exec();
      const companyIds = companies.map((company) => company._id);
      productQuery.addedCompany = { $in: companyIds };
    }
    const products = await ProductItem.find(productQuery).lean().exec();
    return { data: products, err: null };
  } catch (err) {
    console.log("error in searching products" + err);
    return { err: err };
  }
};

const updateProduct = async (req) => {
  try {
    const compId = req.body.companyId;
    const comp = await Company.findOne({ _id: compId });
    const compName = comp["name"];
    const urls = req.body.images;

    const res = await ProductItem.findOneAndUpdate(
      { _id: req.body.id },
      {
        name: req.body.model,
        brand: req.body.brand,
        price: +req.body.price,
        discountedPrice: +req.body.discountedPrice,
        type: req.body.type,
        description: req.body.description,
        imgUrls: urls,
        companyName: compName,
        addedCompany: compId,
        isOutOfStock: req.body.isOutOfStock,
        baseQuantity: req.body.baseQuantity,
        unit: req.body.unit,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    if (!res) {
      return { success: false, err: "cannot update" };
    }
    return { success: true, message: "product saved", res: res };
  } catch (err) {
    return { success: false, error: err };
  }
};

const deleteProduct = async (req) => {
  try {
    const res = await ProductItem.findOneAndDelete({ _id: req.body.id });
    if (!res) {
      return { success: false, err: "cannot delete" };
    }
    const cat = await Category.findOne({
      company: req.body.company,
      name: req.body.type,
    });
    cat.products = cat.products.filter((el) => {
      return el._id != req.body.id;
    });
    await cat.save();
    return { success: true, msg: "product deleted", err: 0, res: res };
  } catch (err) {
    console.log(err);
    return { success: false, err: err };
  }
};

module.exports.ProductController = {
  addProducts,
  getProducts,
  searchProducts,
  updateProduct,
  deleteProduct,
};
