const Category = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const result = await Category.find();
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Error updating product." });
  }
};

module.exports = {
  getCategories,
};
