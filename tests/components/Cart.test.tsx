import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cart from "../../src/components/Cart";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
} from "../../src/store/features/cartSlice";

// Create mock store and mock dispatch
const mockStore = configureStore([]);
const mockDispatch = vi.fn();

// Mock useDispatch hook
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

describe("Cart Component", () => {
  test("renders empty cart message when cart is empty", () => {
    const store = mockStore({
      cart: {
        items: [],
      },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Total Items: 0")).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  test("renders cart items when cart is not empty", () => {
    const store = mockStore({
      cart: {
        items: [
          {
            product: { id: 1, name: "Product 1", price: 10 },
            quantity: 2,
          },
          {
            product: { id: 2, name: "Product 2", price: 20 },
            quantity: 1,
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Total Items: 3")).toBeInTheDocument();
    expect(screen.getByText("Product 1 - Quantity: 2")).toBeInTheDocument();
    expect(screen.getByText("Product 2 - Quantity: 1")).toBeInTheDocument();
  });

  test("dispatches addToCart when Add Sample Product button is clicked", () => {
    const store = mockStore({
      cart: {
        items: [],
      },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    fireEvent.click(screen.getByText("Add Sample Product"));

    expect(mockDispatch).toHaveBeenCalledWith(
      addToCart({ id: 1, name: "Sample Product", price: 10 }),
    );
  });

  test("dispatches removeFromCart when Remove button is clicked", () => {
    const store = mockStore({
      cart: {
        items: [
          {
            product: { id: 1, name: "Product 1", price: 10 },
            quantity: 2,
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    fireEvent.click(screen.getByText("Remove"));

    expect(mockDispatch).toHaveBeenCalledWith(removeFromCart(1));
  });

  test("dispatches increaseQuantity when + button is clicked", () => {
    const store = mockStore({
      cart: {
        items: [
          {
            product: { id: 1, name: "Product 1", price: 10 },
            quantity: 2,
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    fireEvent.click(screen.getByText("+"));

    expect(mockDispatch).toHaveBeenCalledWith(increaseQuantity(1));
  });

  test("dispatches updateQuantity when quantity input is changed", () => {
    const store = mockStore({
      cart: {
        items: [
          {
            product: { id: 1, name: "Product 1", price: 10 },
            quantity: 2,
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    const input = screen.getByDisplayValue("2");
    fireEvent.change(input, { target: { value: "5" } });

    expect(mockDispatch).toHaveBeenCalledWith(
      updateQuantity({ productId: 1, quantity: 5 }),
    );
  });
});
