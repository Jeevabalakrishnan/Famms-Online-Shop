const mongoose = require("mongoose");

const buyNowOrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  product: { type: Object, required: true }, // Stores only one Buy Now product
  totalAmount: { type: Number, required: true }, // Price of the Buy Now product
  status: { type: String, default: "Pending" }, // Initial order status
}, { timestamps: true });

module.exports = mongoose.model("BuyNowOrder", buyNowOrderSchema);