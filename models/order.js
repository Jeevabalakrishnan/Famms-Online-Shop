const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  address: { type: String, required: true },
    quantity: { type: Number, default: 1 },
  paymentMethod: { type: String, required: true },
  items: { type: Array, required: true },
  status: { type: String, default: "Pending" },
}, { timestamps: true });


module.exports = mongoose.model("Order", orderSchema);