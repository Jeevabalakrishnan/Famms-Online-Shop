const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const SECRET_KEY = "your_secret_key"; // 🔒 Store securely in .env file

// 🔹 Admin Login Route (Must match frontend request)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin*2025") {
    const token = jwt.sign({ email, isAdmin: true }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ token, message: "Login Successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;