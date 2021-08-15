const { Customer } = require("../model");

const addCustomer = async (customer) => {
  const { tgUserId } = customer;
  try {
    const existingCustomer = await Customer.findOneAndUpdate(
      { tgUserId },
      customer,
      { new: true }
    ).exec();
    if (existingCustomer) {
      console.log("Customer already exists");
      return { data: existingCustomer, err: 0 };
    }
    // if customer doesn't exist in db
    const newCustomer = new Customer(customer);
    const savedCustomer = await newCustomer.save();
    console.log("Customer saved");
    return savedCustomer;
  } catch (err) {
    console.log("error in adding customer: " + err);
    return { msg: "error: " + err, err: 1 };
  }
};

const getCustomer = async (query) => {
  console.log(query);
  // try {
  //   const products = await ProductItem.find(query || {})
  //     .lean()
  //     .exec();
  //   return { data: products, err: null };
  // } catch (error) {
  //   console.log("error in getting products" + error);
  //   return { err: error };
  // }
};

module.exports.CustomerController = { addCustomer, getCustomer };
