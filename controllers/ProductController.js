const { ProductItem } = require("../model");
const { escapeRegex } = require("../utils/misc");

const addProducts = async (products = []) => {
  try {
    await ProductItem.insertMany(products);
    console.log("Products saved");
    return { msg: "products saved", err: 0 };
  } catch (error) {
    console.log("error in saving products: " + error);
    return { err: error };
  }
};

// todo: Replace regex method with a lil' more faster method
const getProducts = async (searchTerm) => {
  let query = {};
  if (searchTerm) {
    query = { name: new RegExp(escapeRegex(searchTerm), "gi") };
  }
  try {
    const products = await ProductItem.find(query).lean().exec();
    return { data: products, err: null };
  } catch (error) {
    console.log("error in saving products: " + error);
    return { err: error };
  }
};

module.exports.ProductController = { addProducts, getProducts };
