const { ProductItem } = require("../model");

const addCustomer = async (customer) => {
  console.log(customer);
};

const getCustomer = async (query) => {
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

module.exports.CustomerController = { addCustomer, getCustomer };
