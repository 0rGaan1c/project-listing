const Product = require("../models/Product");
const Upvote = require("../models/Upvote");

const getUpvotes = async (req, res) => {
  const { productId } = req.params;
  try {
    const upvote = await Upvote.findOne({ productId });

    res.send({ status: "ok", data: upvote });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: "Error upvoting" });
  }
};

const updateUpvote = async (req, res) => {
  const { productId } = req.body;
  try {
    const upvote = await Upvote.findOne({ productId });
    if (!upvote) {
      const result = await Upvote.create({ productId, count: 1 });
      await Product.updateOne(
        { _id: productId },
        {
          upvotes: result._id,
        }
      );
      res.json({ status: "ok", data: result });
    } else {
      upvote.count++;
      await upvote.save();
      res.json({ status: "ok", data: upvote });
    }
  } catch (err) {
    console.error(err);
    res.send({ status: "error", error: "Error upvoting" });
  }
};

module.exports = {
  getUpvotes,
  updateUpvote,
};
