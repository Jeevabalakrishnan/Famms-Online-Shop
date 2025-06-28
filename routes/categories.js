const express = require("express");
const Category = require("../models/category");
const router = express.Router();

// Get all
router.get("/", async (req, res) => {
  const data = await Category.find();
  res.json(data);
});

// Add
// POST
router.post("/", async (req, res) => {
  const { name, status } = req.body;
  try {
    const newCat = new Category({ name, status });
    await newCat.save();
    res.status(201).json(newCat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  const { name, status } = req.body;
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name, status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update


// Delete
router.delete("/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
