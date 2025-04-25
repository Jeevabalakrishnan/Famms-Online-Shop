import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array to hold cart items
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        toast.success(`${item.name} quantity updated to ${item.quantity}!`, { position: "top-center" });
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        toast.success(`${action.payload.name} successfully added to cart!`, { position: "top-center" });
      }

    },
    increment: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1; // Increment quantity
      }
    },
    decrement: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1; // Decrement quantity
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload.id); // Remove item if quantity becomes 0
      }
    },
    deleteFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload.id); // Remove item entirely
    },
  },
});

export const { addToCart, increment, decrement, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;



