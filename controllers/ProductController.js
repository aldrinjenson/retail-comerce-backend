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
