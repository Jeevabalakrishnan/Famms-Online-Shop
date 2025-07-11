const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true }
}, );
// { timestamps: true } ✅ Adds createdAt & updatedAt
module.exports = mongoose.model("Contact", contactSchema);