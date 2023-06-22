const Comment = require("../models/Comment");
const Product = require("../models/Product");

const getComments = async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await Comment.find({ productId });
    res.json({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", error: "Error creating comment." });
  }
};

const createComment = async (req, res) => {
  const { productId, commentText } = req.body;
  try {
    const result = await Comment.create({
      productId,
      commentText,
    });
    await Product.updateOne(
      {
        _id: productId,
      },
      { $push: { comments: result._id } }
    );
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", error: "Error creating comment." });
  }
};

module.exports = {
  getComments,
  createComment,
};
