const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    img: String,
    quantity: Number,
    status: { type: String, default: 'In Stock' },
  }, { timestamps: true }); // ✅ Auto adds createdAt & updatedAt fields

module.exports = mongoose.model('Product', productSchema);
