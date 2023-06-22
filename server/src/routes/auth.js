const express = require("express");
const { signup, login, validateToken } = require("../controllers/auth");
const router = express.Router();

router.post("/validatetoken", validateToken);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
