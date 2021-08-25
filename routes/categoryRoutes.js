var express = require("express");
const { ProductItem } = require("../model");
const { Category } = require("../model/Category");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find(req.query).populate("products");
    res.send({ success: true, categories: categories });
  } catch (e) {
    console.log(e);
    res.send({ success: false, error: e });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.companyId) {
    res.sendStatus(404);
  }
  try {
    const catExists = await Category.findOne({
      name: req.body.name,
      company: req.body.companyId,
    });
    if (catExists) {
      console.log("Cat already Exists!");
      res.send({ success: false, error: "Category already exists!" });
    } else {
      const newCat = new Category({
        name: req.body.name,
        company: req.body.companyId,
        products: [],
      });
      await newCat.save();
      res.send({ success: true, cat: newCat });
    }
  } catch (e) {
    console.log(e);
    res.send({ success: false, error: e });
  }
});

router.get("/products", async (req, res) => {
  try {
    if (!req.query.cat || !req.query.company) {
      res.sendStatus(404);
      return;
    }
    const cat = await Category.findOne({
      company: req.query.company,
      name: req.query.cat,
    }).populate("products");
    if (cat) res.send({ success: true, products: cat.products });
    else res.send({ success: false, error: "no such category!" });
  } catch (e) {
    console.log(e);
    res.send({ success: false, error: e });
  }
});

router.post("/products/:name", async (req, res) => {
  if (!req.body.companyId) {
    res.sendStatus(404);
  }
  try {
    const cat = await Category.findOne({
      company: req.body.companyId,
      name: req.params.name,
    });
    if (!cat) {
      res.sendStatus(404);
    }
    req.body.products.forEach((p) => {
      cat.products.push(p);
    });
    await cat.save();
    res.send({ success: true, category: cat });
  } catch (e) {
    console.log(e);
    res.send({ success: false, error: e });
  }
});

router.patch("/:name", async (req, res) => {
  if (!req.body.companyId) {
    res.sendStatus(404);
  }
  try {
    let cat = await Category.findOneAndUpdate(
      { company: req.body.companyId, name: req.params.name },
      { $set: { name: req.body.newName } },
      { new: true, useFindAndModify: false }
    );
    if (cat) {
      await ProductItem.updateMany(
            { addedCompany: req.body.companyId, type: req.params.name },
            { $set: { type: req.body.newName } },
            {
            new: true,
            useFindAndModify: false,
            multi: true,
            }
        );
        cat = await Category.findById(cat._id).populate('products')
        res.send({ success: true, cat: cat });
    } else res.send({ success: false, error: cat });
  } catch (e) {
    console.log(e);
    res.send({ success: false, error: e });
  }
});

router.delete("/:name", async (req, res) => {
  if (!req.body.companyId) {
    res.sendStatus(404);
  }
  try {
    const cat = await Category.findOne({
      company: req.body.companyId,
      name: req.params.name,
    });
    for (let i = 0; i < cat.products.length; i += 1) {
      await ProductItem.findOneAndDelete({ _id: cat.products[i] });
    }
    res.send({ success: true });
  } catch (e) {
    console.log(e);
    res.send({ success: false, error: e });
  }
});

module.exports.categoryRouter = router;
