const mongoose = require("mongoose");
const { requiredErrorMessage } = require("../utils");

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, requiredErrorMessage("Category")],
    unique: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
