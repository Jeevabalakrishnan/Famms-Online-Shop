// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Simulated database for cart
// let cart = [];

// // Endpoint to add a product to the cart
// app.post('/api/add-to-cart', (req, res) => {
//   const { id, name, price, img } = req.body;
//   const existingItem = cart.find(item => item.id === id);
//   if (existingItem) {
//     existingItem.quantity += 1; // Increment quantity if the product exists
//   } else {
//     cart.push({ id, name, price, img, quantity: 1 });
//   }
//   res.status(200).json({ message: 'Product added to cart', cart });
// });

// // Endpoint to increment quantity
// app.post('/api/cart/increment', (req, res) => {
//   const { id } = req.body;
//   const item = cart.find(product => product.id === id);
//   if (item) {
//     item.quantity += 1;
//     res.status(200).json({ message: 'Quantity incremented', cart });
//   } else {
//     res.status(404).json({ message: 'Item not found' });
//   }
// });

// // Endpoint to decrement quantity
// app.post('/api/cart/decrement', (req, res) => {
//   const { id } = req.body;
//   const item = cart.find(product => product.id === id);
//   if (item && item.quantity > 1) {
//     item.quantity -= 1;
//     res.status(200).json({ message: 'Quantity decremented', cart });
//   } else if (item) {
//     res.status(400).json({ message: 'Cannot decrement below 1' });
//   } else {
//     res.status(404).json({ message: 'Item not found' });
//   }
// });

// // Endpoint to delete item
// app.delete('/api/cart/delete', (req, res) => {
//   const { id } = req.body;
//   cart = cart.filter(item => item.id !== id);
//   res.status(200).json({ message: 'Item deleted', cart });
// });

// // Endpoint to get the total amount
// app.get('/api/cart/total', (req, res) => {
//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   res.status(200).json({ total });
// });

// // Start the server
// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/checkoutDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the order schema
const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  address: { type: String, required: true },
  products: { type: Array, required: true }, // Example: [{ name: "Product 1", qty: 2 }]
  paymentMethod: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
});

// Order model
const Order = mongoose.model('Order', orderSchema);

// Routes
app.post('/api/orders', async (req, res) => {
  const { email, address, products, paymentMethod } = req.body;

  if (!email || !address || !products || !paymentMethod) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newOrder = new Order({ email, address, products, paymentMethod });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});