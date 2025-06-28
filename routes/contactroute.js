const express = require("express");
const Contact = require("../models/contacts"); // ✅ Correct model for contact submissions

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // ✅ Ensure required fields exist
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // ✅ Save to DB
        const contactEntry = new Contact({ name, email, subject, message });
        await contactEntry.save();

        res.json({ msg: "Contact data successfully saved" });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
});

module.exports = router;