const Product = require("../models/Product");

const doesProductExist = async (req, res, next) => {
  const { productId } = req.body;

  try {
    const result = await Product.find({ _id: productId });
    if (result.length > 0) {
      next();
      return;
    }
    res.send({ status: "error", error: "Product doesn't exists." });
  } catch (err) {
    console.log(err);
    res.send({ status: "error", error: "Product doesn't exists." });
  }
};

module.exports = { doesProductExist };
