const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductByCategory,
} = require("../controllers/product");
const { tokenValidator } = require("../middlewares/tokenValidator");
const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(tokenValidator, createProduct)
  .patch(tokenValidator, updateProduct);

router.get("/:categoryId", getProductByCategory);

module.exports = router;
