// const express = require("express");
// const Order = require("../models/order"); // ✅ Use the same Order model

// const router = express.Router();

// // 📌 Place Order API (Handles both Cart & Buy Now orders)
// router.post("/", async (req, res) => {
//     try {
//         const { email, address, paymentMethod, items, quantity, product } = req.body;

//         console.log("Incoming order request:", req.body); // ✅ Debug incoming request

//         // ✅ Validate required fields
//         if (!email || !address || !paymentMethod || (!items && !product)) {
//             return res.status(400).json({ error: "Missing required fields!" });
//         }

//         // ✅ Calculate total amount for Buy Now or Cart order
//         let totalAmount = 0;
//         if (product) {
//             totalAmount = product.price; // ✅ Buy Now order total
//         } else {
//             totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0); // ✅ Cart order total
//         }

//         // ✅ Save order in database (Merges Buy Now & Cart order structure)
//         const newOrder = new Order({
//             email,
//             address,
//             quantity: product ? 1 : quantity, // ✅ Buy Now order has quantity 1
//             paymentMethod,
//             items: product ? [product] : items, // ✅ Converts product to an item array
//             totalAmount,
//             status: "Pending",
//         });

//         await newOrder.save();
//         console.log("Order saved in DB:", newOrder); // ✅ Debug saved order

//         res.json({ success: true, message: "Order placed successfully!", order: newOrder });

//     } catch (error) {
//         console.error("Error saving order:", error);
//         res.status(500).json({ error: "Failed to save order" });
//     }
// });

// // ✅ Fetch all orders
// router.get("/", async (req, res) => {
//     try {
//         const orders = await Order.find().sort({ createdAt: -1 });
//         res.json(orders);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch orders" });
//     }
// });

// // ✅ Delete order
// router.delete("/:id", async (req, res) => {
//     try {
//         await Order.findByIdAndDelete(req.params.id);
//         res.json({ success: true });
//     } catch (err) {
//         res.status(500).json({ error: "Failed to delete order" });
//     }
// });

// module.exports = router;

const express = require("express");
const Order = require("../models/order");  // ✅ Import Order model
const Address = require("../models/address");  // ✅ Import Address model to fetch user's address

const router = express.Router();

// 📌 Place Order API (Handles both Cart & Buy Now Orders with full address)
router.post("/", async (req, res) => {
    try {
        const { email, paymentMethod, items, quantity, product } = req.body;

        console.log("Incoming order request:", req.body); // ✅ Debugging log

        // ✅ Fetch stored address
        const userAddress = await Address.findOne({ email });
        if (!userAddress) {
            return res.status(400).json({ error: "User address not found!" });
        }

        // ✅ Validate required fields
        if (!email || !userAddress.address || !paymentMethod || (!items && !product)) {
            return res.status(400).json({ error: "Missing required fields!" });
        }

        // ✅ Calculate total amount
        let totalAmount = product
            ? product.price  // ✅ Buy Now order total
            : items.reduce((sum, item) => sum + item.price * item.quantity, 0); // ✅ Cart order total

        // ✅ Save order in database (Now includes full address)
        const newOrder = new Order({
            email,
            address: userAddress,  // ✅ Store full address object
            quantity: product ? 1 : quantity,
            paymentMethod,
            items: product ? [product] : items,
            totalAmount,
            status: "Pending",
        });

        await newOrder.save();
        console.log("✅ Order saved in DB with full address:", newOrder);

        res.json({ success: true, message: "Order placed successfully!", order: newOrder });

    } catch (error) {
        console.error("❌ Error saving order:", error);
        res.status(500).json({ error: "Failed to save order" });
    }
});

// ✅ Fetch all orders (Includes full address details)
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        // ✅ Ensure the response includes full address details
        const formattedOrders = orders.map(order => ({
            id: order._id,
            email: order.email,
            address: order.address,  // ✅ Ensures full address is included
            paymentMethod: order.paymentMethod,
            items: order.items,
            totalAmount: order.totalAmount,
            status: order.status
        }));

        res.json({ success: true, orders: formattedOrders });

    } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});
// ✅ Delete order
router.delete("/:id", async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error("❌ Failed to delete order:", err);
        res.status(500).json({ error: "Failed to delete order" });
    }
});

module.exports = router;