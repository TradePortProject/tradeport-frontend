import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  addToCart,
} from "../store/features/cartSlice";
import { RootState, AppDispatch } from "../store/store";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId: number) => {
    dispatch(increaseQuantity(productId));
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleAddToCart = (product: {
    id: number;
    name: string;
    price: number;
  }) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>Total Items: {cartItemCount}</p>

      <button
        className="bg-red-300"
        onClick={() => {
          handleAddToCart({ id: 1, name: "Sample Product", price: 10 });
        }}
      >
        Add Sample Product
      </button>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.product.id}>
              {item.product.name} - Quantity: {item.quantity}
              <button
                className="mx-4 rounded-lg bg-red-600 p-2 text-white"
                onClick={() => handleRemoveFromCart(item.product.id)}
              >
                Remove
              </button>
              <button onClick={() => handleIncreaseQuantity(item.product.id)}>
                +
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(
                    item.product.id,
                    parseInt(e.target.value, 10),
                  )
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
