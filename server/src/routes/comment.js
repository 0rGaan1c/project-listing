const express = require("express");
const { getComments, createComment } = require("../controllers/comment");
const { doesProductExist } = require("../middlewares/doesProductExist");
const router = express.Router();

router.get("/:productId", getComments);
router.post("/", doesProductExist, createComment);

module.exports = router;
