const express = require("express");
const User = require("../models/user");
const profile = require("../profile")

const router = express.Router();

router.post("/register", profile.single("img"), async (req, res) => {
    try {
        let imgPath = req.body.img;

        if (req.file) {
            imgPath = `/profiles/${req.file.filename}`;
        }

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            img: imgPath,
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) { // ✅ Ensures both fields exist
      return res.status(400).json({ success: false, msg: "Email and password are required!" });
    }
  
    const user = await User.findOne({ email });
  
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }
  
    res.json({ success: true, email: user.email });
  });

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // ✅ Directly deletes the user
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;