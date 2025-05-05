// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // Import Routes
// const productRoutes = require('./productroute'); // Ensure this path is correct

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads')); 

// // Connect MongoDB
// mongoose.connect('mongodb://localhost:27017/Famms-Database')
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => {
//     console.error('Connection error:', err);
//   });

// // Routes
// app.use('/api/products', productRoutes);



// // Start Server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // Import Routes
// const productRoutes = require('./productroute'); // Ensure this path is correct

// const app = express();

// // Middlewares
// app.use(cors()); // Cross-Origin Resource Sharing for frontend communication
// app.use(express.json()); // To parse incoming JSON requests
// // app.use('/uploads', express.static('uploads')); // Serve images in uploads folder as static

// // Connect MongoDB
// mongoose.connect('mongodb://localhost:27017/Famms-Database', { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true 
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => {
//     console.error('Connection error:', err);
//   });

// // Routes
// app.use('/api/products', productRoutes); // Endpoint for products

// // Start Server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const productRoutes = require('./productroute');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // ✅ Serve images statically!

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/Famms-Database', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('Connection error:', err);
  });

// Routes
app.use('/api/products', productRoutes);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
