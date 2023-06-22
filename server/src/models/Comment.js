const mongoose = require("mongoose");
const { requiredErrorMessage } = require("../utils");

const CommentSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, requiredErrorMessage("Product Id")],
  },
  commentText: {
    type: String,
    required: [true, requiredErrorMessage("Comment")],
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
