// src/store/features/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingCart } from "../../posts/types";


interface CartState {
  items: ShoppingCart[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ShoppingCart>) => {
      const existingItem = state.items.find(
        (item) => item.cartID === action.payload.cartID,
      );
      console.log("existingItem:", existingItem);
      console.log("action.payload:", action.payload);
      console.log("state.items:", state.items);
      if (existingItem) {
        //existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, cartQuantity: 1 });
        console.log("state.items after push:", state.items);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.cartID !== action.payload,
      );
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.cartID === action.payload,
      );
      if (existingItem) {
        existingItem.cartQuantity += 1;
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const existingItem = state.items.find(
        (item) => item.cartID === action.payload.productId,
      );
      if (existingItem) {
        existingItem.cartQuantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  increaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
