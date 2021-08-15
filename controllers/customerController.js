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
    return { data: savedCustomer, err: 0 };
  } catch (err) {
    console.log("error in adding customer: " + err);
    return { msg: "error: " + err, err: 1 };
  }
};

const getCustomer = async (query) => {
  try {
    const customers = await Customer.find(query || {})
      .lean()
      .exec();
    return { data: customers, err: null };
  } catch (error) {
    console.log("error in getting products" + error);
    return { data: null, err: error };
  }
};

module.exports.CustomerController = { addCustomer, getCustomer };
