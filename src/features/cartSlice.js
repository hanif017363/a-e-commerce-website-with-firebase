import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const product = state.find((item) => item.id === action.payload.id);
      product
        ? product.quantity++
        : state.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    clearCart: () => {
      return [];
    },
    modifyQuantity: (state, action) => {
      const product = state.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
        if (product.quantity <= 0) {
          return state.filter((item) => item.id !== action.payload.id);
        }
      }
    },
  },
});
export const { addToCart, removeFromCart, clearCart, modifyQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
