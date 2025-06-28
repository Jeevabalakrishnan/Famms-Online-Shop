const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  image: String,
  status: { type: String, enum: ['Enable', 'Disable'], default: 'Disable' }
}, { timestamps: true });

module.exports = mongoose.model('Carousel', carouselSchema);
