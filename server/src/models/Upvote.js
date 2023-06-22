const mongoose = require("mongoose");
const { requiredErrorMessage } = require("../utils");

const UpvoteSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, requiredErrorMessage("Product Id")],
  },
  count: {
    type: Number,
    default: 0,
    required: [true, requiredErrorMessage("Upvote Count")],
  },
});

module.exports = mongoose.model("Upvote", UpvoteSchema);
