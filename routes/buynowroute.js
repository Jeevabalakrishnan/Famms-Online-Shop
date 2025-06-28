const express = require("express");
const BuyNowOrder = require("../models/buynoworder");

const router = express.Router();

// 📌 Place Buy Now Order
router.post("/", async (req, res) => {
  try {
    const { email, address, paymentMethod, product } = req.body;

    console.log("🔍 Buy Now Order Data:", req.body); // Debug incoming request

    // ✅ Validate required fields
    if (!email || !address || !paymentMethod || !product) {
      console.log("❌ Validation Failed:", { email, address, paymentMethod, product });
      return res.status(400).json({ error: "Missing required fields! Please provide valid order data." });
    }

    // ✅ Create and save order in DB
    const newOrder = new BuyNowOrder({
      email,
      address,
      paymentMethod,
      product,
      totalAmount: product.price,
      status: "Pending",
    });

    await newOrder.save();
    console.log("✅ Buy Now Order saved in DB:", newOrder);

    res.json({ success: true, message: "Buy Now Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("❌ Error saving Buy Now order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

module.exports = router;