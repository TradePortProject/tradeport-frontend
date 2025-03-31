// src/store/features/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingCart } from "../../posts/types";



interface CartItem {
  product: ShoppingCart;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ShoppingCart[]>) => {
      const existingItem = state.items.find(
        (item) => item.product.cartID === action.payload.cartID,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.cartID !== action.payload,
      );
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.product.cartID === action.payload,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const existingItem = state.items.find(
        (item) => item.product.cartID === action.payload.productId,
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
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
