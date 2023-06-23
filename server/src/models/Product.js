const mongoose = require("mongoose");
const { requiredErrorMessage, maxLengthErrorMessage } = require("../utils");

const ProductSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, requiredErrorMessage("Company Name")],
    maxlength: [50, maxLengthErrorMessage(50, "Company Name")],
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, requiredErrorMessage("Category")],
    },
  ],
  logoUrl: {
    type: String,
    required: [true, requiredErrorMessage("Logo Url")],
  },
  productLink: {
    type: String,
    required: [true, requiredErrorMessage("Product Link")],
  },
  description: {
    type: String,
    required: [true, requiredErrorMessage("Description")],
  },
  upvotes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Upvote",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Product", ProductSchema);
