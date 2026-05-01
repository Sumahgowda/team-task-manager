const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashed });
  res.json(user);
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("User not found");

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.send("Wrong password");

  const token = jwt.sign({ id: user._id, role: user.role }, "secret");
  res.json({ token });
});

module.exports = router;