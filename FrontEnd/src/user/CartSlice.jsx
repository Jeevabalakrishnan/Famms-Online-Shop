import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Function to Load Cart from Local Storage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(),
  },
  reducers: {
    // ✅ Add item to cart or increase quantity
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        toast.success(`${item.name} quantity updated to ${item.quantity}!`, { position: "top-center" });
      } else {
        state.items.unshift({ ...action.payload, quantity: 1 });
        toast.success(`${action.payload.name} successfully added to cart!`, { position: "top-center" });
      }
      localStorage.setItem("cart", JSON.stringify(state.items)); // ✅ Storage update
    },

    // ✅ Increase item quantity
    increment: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    // ✅ Decrease item quantity or remove if quantity becomes 0
    decrement: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      }
      localStorage.setItem("cart", JSON.stringify(state.items)); // ✅ Correct storage update
    },

    // ✅ Delete item from cart
    deleteFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(state.items)); 
      window.alert('Are you want to delete!')// ✅ Ensure storage updates
    },
    
    resetCart: (state) => {
      state.items = []; 
      localStorage.removeItem("cart"); 
      toast.info("Your cart has been emptied.", { position: "top-center" }); // ✅ Only empties when called
    },

    // ✅ Fix for restoring cart after login
    setCartItems: (state, action) => {
      state.items = action.payload || [];
      localStorage.setItem("cart", JSON.stringify(state.items));
      if (state.items.length === 0) {
        toast.info("Your cart is empty!", { position: "top-center" }); // ✅ Notify user when restoring an empty cart
      }
    },
  },
});

// ✅ Export actions & reducer
export const { addToCart, increment, decrement, deleteFromCart, resetCart, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;


// CartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const existingItem = state.items.find(item => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     increment(state, action) {
//       const item = state.items.find(item => item.id === action.payload.id);
//       if (item) {
//         item.quantity += 1;
//       }
//     },
//     decrement(state, action) {
//       const item = state.items.find(item => item.id === action.payload.id);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//       }
//     },
//     deleteFromCart(state, action) {
//       state.items = state.items.filter(item => item.id !== action.payload.id);
//     },
//     resetCart(state) {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, increment, decrement, deleteFromCart, resetCart } = cartSlice.actions;
// export default cartSlice.reducer;
