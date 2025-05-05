const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
 img: String,
  quantity: Number,
  status: { type: String, default: 'In Stock' },
});

module.exports = mongoose.model('Product', productSchema);
