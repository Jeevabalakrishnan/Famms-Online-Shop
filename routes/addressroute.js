const express = require("express");
const Address = require("../models/address");

const router = express.Router();

// 📌 Get Addresses by User Email
router.get("/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const addresses = await Address.find({ email });
  
      console.log("Fetched addresses:", addresses); // ✅ Debugging log
      res.json(addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      res.status(500).json({ error: "Error fetching addresses" });
    }
  });

// 📌 Add New Address
router.post("/", async (req, res) => {
    const { email, name, phone, address, city, pincode, state } = req.body;
  
    console.log("Received data:", req.body); // ✅ Debugging log
  
    if (!email || !name || !phone || !address || !city || !pincode || !state) {
      return res.status(400).json({ error: "Missing required fields!" });
    }
  
    const newAddress = new Address({ email, name, phone, address, city, pincode, state });
    await newAddress.save();
  
    res.json({ success: true, message: "Address saved successfully!", address: newAddress });
  });
  
module.exports = router;
