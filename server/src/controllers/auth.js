require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signup = async (req, res) => {
  const { name, email, mobile, password: plainTextPassword } = req.body;

  if (plainTextPassword.length < 6) {
    return res.json({
      status: "error",
      error: "Password should be atleast 6 characters long.",
    });
  }

  const password = await bcrypt.hashSync(plainTextPassword, 5);

  try {
    const result = await User.create({
      name,
      email,
      mobile,
      password,
    });
    res.send({ status: "ok", data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      status: "error",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: "error", error: `email/password is invalid.` });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_KEY
    );
    return res.json({ status: "ok", data: { token, userId: user._id } });
  }

  return res.json({ status: "error", error: `email/password is invalid.` });
};

const validateToken = async (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        res.json({ status: "error", error: "Invalid Token" });
      } else {
        res.json({ status: "ok", error: "Valid Token" });
      }
    });
  } else {
    res.json({ status: "error", error: "Unauthorized User" });
  }
};

module.exports = {
  signup,
  login,
  validateToken,
};
