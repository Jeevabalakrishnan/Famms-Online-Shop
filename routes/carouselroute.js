const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Carousel = require("../models/Carousel");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Create new carousel item
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image upload failed." });
    const { title, subtitle, description, enabled } = req.body;
    if (!title || !description) return res.status(400).json({ message: "Missing required fields." });

    const isEnabled = enabled === "true" || enabled === true;
    if (isEnabled) {
      const count = await Carousel.countDocuments({ enabled: true });
      if (count >= 3) return res.status(400).json({ message: "Only 3 carousel items can be enabled." });
    }

    const newItem = new Carousel({
      image: `/uploads/${req.file.filename}`,
      title,
      subtitle,
      description,
      enabled: isEnabled,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Carousel.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
});

// Delete multiple
router.post("/delete-multiple", async (req, res) => {
  try {
    await Carousel.deleteMany({ _id: { $in: req.body.ids } });
    res.status(200).json({ message: "Items deleted." });
  } catch (error) {
    res.status(500).json({ message: "Bulk delete error", error });
  }
});

// Delete single item + remove image
router.delete("/:id", async (req, res) => {
  try {
    const item = await Carousel.findByIdAndDelete(req.params.id);
    if (item?.image) {
      const imagePath = path.join(__dirname, "..", item.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    res.status(200).json({ message: "Item deleted." });
  } catch (error) {
    res.status(500).json({ message: "Delete error", error });
  }
});

// Update item
router.patch("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, subtitle, description, enabled, existingImage } = req.body;
    const isEnabled = enabled === "true" || enabled === true;

    const currentItem = await Carousel.findById(req.params.id);
    if (!currentItem) return res.status(404).json({ message: "Item not found" });
    if (!currentItem.enabled && isEnabled) {
      const count = await Carousel.countDocuments({ enabled: true });
      if (count >= 3) return res.status(400).json({ message: "Max 3 items can be enabled." });
    }

    const update = { title, subtitle, description, enabled: isEnabled };
    if (req.file) {
      update.image = `/uploads/${req.file.filename}`;
    } else if (existingImage) {
      update.image = existingImage;
    }

    const updated = await Carousel.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update error", error });
  }
});

module.exports = router;
