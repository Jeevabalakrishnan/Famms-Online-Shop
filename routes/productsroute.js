const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const upload = require('../upload');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// ADD product with multer image upload
router.post('/upload', upload.single('img'), async (req, res) => {
  try {
    const imgPath = req.file ? `/uploads/${req.file.filename}` : req.body.img || '';
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      status: req.body.status,
      img: imgPath
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to upload product', error: err.message });
  }
});

// UPDATE product
router.put('/:id', upload.single('img'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.quantity = req.body.quantity || product.quantity;
    product.status = req.body.status || product.status;
    if (req.file) {
      product.img = `/uploads/${req.file.filename}`;
    }

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update product', error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;
