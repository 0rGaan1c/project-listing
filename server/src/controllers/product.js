const Category = require("../models/Category");
const Product = require("../models/Product");
const Upvote = require("../models/Upvote");

const processCategories = async (categoryString) => {
  const categories = categoryString.split(",");

  const categoryDocuments = [];

  for (const category of categories) {
    const existingCategory = await Category.findOne({ category });

    if (existingCategory) {
      categoryDocuments.push(existingCategory._id);
    } else {
      const newCategory = await Category.create({ category });
      categoryDocuments.push(newCategory._id);
    }
  }

  return categoryDocuments;
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categories")
      .populate("upvotes")
      .populate("comments");

    res.json({ status: "ok", data: products });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Error getting products." });
  }
};

const getProductByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.find({
      categories: categoryId,
    })
      .populate("categories")
      .populate("upvotes")
      .populate("comments");

    res.json({
      status: "ok",
      data: products,
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Error getting products." });
  }
};

const createProduct = async (req, res) => {
  const { companyName, categories, logoUrl, productLink, description } =
    req.body;

  try {
    const categoryDocuments = await processCategories(categories);

    const result = await Product.create({
      companyName,
      categories: categoryDocuments,
      logoUrl,
      productLink,
      description,
    });
    const upvote = await Upvote.create({
      productId: result._id,
      count: 0,
    });
    result.upvotes = upvote._id;
    await result.save();
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Error creating product." });
  }
};

const updateProduct = async (req, res) => {
  const {
    companyName,
    categories,
    logoUrl,
    productLink,
    description,
    productId,
  } = req.body;

  try {
    const categoryDocuments = await processCategories(categories);

    const result = await Product.updateOne(
      { _id: productId },
      {
        companyName,
        categories: categoryDocuments,
        logoUrl,
        productLink,
        description,
      }
    );
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Error updating product." });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductByCategory,
};
