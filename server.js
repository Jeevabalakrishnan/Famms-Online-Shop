const express = require("express");
const mongoose = require("mongoose");  
const cors = require("cors");

const contactRoutes = require("./routes/contactroute");
const userRoutes = require("./routes/userroute");
const addressRoutes = require("./routes/addressroute");
const orderRoutes = require("./routes/orderroute");
const productRoutes = require("./routes/productsroute");
const buynowRoute = require("./routes/buynowroute");
const categoryRoutes = require("./routes/categories");
const adminRoutes = require("./routes/adminroute"); 
const carouselRoute = require("./routes/carouselroute");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Famms-Database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.error("Connection error:", err);
    });

// Use Routes
app.use('/profiles', express.static('profiles'));
app.use('/uploads', express.static('uploads')); 
app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);
app.use("/api/addresses",addressRoutes)
app.use("/api/order", orderRoutes);
app.use("/api/products", productRoutes); 
app.use('/api/buy-now',buynowRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/carousel",carouselRoute);


const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));