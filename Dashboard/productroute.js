const express = require('express');
const router = express.Router();
const Product = require('./product');
const upload = require('./upload'); // ✅ IMPORT multer setup here

// Get all products
router.get('/', async (req, res) => {
  try {
      const products = await Product.find();
      res.json(products);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// ✅ Add a product WITH image upload
router.post('/upload', upload.single('img'), async (req, res) => {
  try {
      let imgPath = req.body.img; // Default to image URL
      
      // If a file is uploaded, use its path instead
      if (req.file) {
          imgPath = `/uploads/${req.file.filename}`;
      }

      const newProduct = new Product({
          name: req.body.name,
          price: req.body.price,
          category: req.body.category,
          quantity: req.body.quantity,
          status: req.body.status || "In Stock",
          img: imgPath // Store either uploaded file path or direct image URL
      });

      await newProduct.save();
      res.status(201).json(newProduct);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
}); 

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (req.body.name !== undefined) product.name = req.body.name;
    if (req.body.price !== undefined) product.price = req.body.price;
    if (req.body.category !== undefined) product.category = req.body.category;
    if (req.body.img !== undefined) product.img = req.body.img;
    if (req.body.quantity !== undefined) product.quantity = req.body.quantity;
    if (req.body.status !== undefined) product.status = req.body.status;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
