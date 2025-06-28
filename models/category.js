const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['Enable', 'Disable'], default: 'Enable' },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
