require("dotenv").config();
var mongoose = require("mongoose");
const { Category, ProductItem } = require("../model");

async function prodToCat() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("connected to db");
    const products = await ProductItem.find().exec();

    for (let i = 0; i < products.length; i++) {
      const x = await Category.findOne({
        name: products[i].type,
        company: products[i].addedCompany,
      });
      if (!x) {
        const newCat = new Category({
          name: products[i].type,
          company: products[i].addedCompany,
        });
        await newCat.save();
        console.log(`new cat '${products[i].type}' created!`);
      }
    }

    const categories = await Category.find().exec();

    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < categories.length; j++) {
        if (
          products[i].addedCompany.equals(categories[j].company) &&
          products[i].type === categories[j].name
        ) {
          if (!categories[j].products.includes(products[i]._id)) {
            categories[j].products.push(products[i]._id);
            await categories[j].save();
            console.log(
              `added product ${products[i]._id} to ${categories[j].name} of company ${categories[j].company}`
            );
          }
          break;
        }
      }
    }
    console.log("done");
    process.exit();
  } catch (e) {
    console.log(e);
  }
}

prodToCat();
