const express = require("express");
const { getUpvotes, updateUpvote } = require("../controllers/upvote");
const { doesProductExist } = require("../middlewares/doesProductExist");
const router = express.Router();

router.get("/:productId", getUpvotes);
router.patch("/", doesProductExist, updateUpvote);

module.exports = router;
