import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CartIcon from "../../src/components/Navbar/CartIcon";

// Create mock store
const mockStore = configureStore([]);

describe("CartIcon Component", () => {
  test("does not render when user is not authenticated", () => {
    const store = mockStore({
      auth: {
        isAuthenticated: false,
      },
      cart: {
        items: [],
      },
    });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CartIcon />
        </BrowserRouter>
      </Provider>,
    );

    // Component should not render anything when not authenticated
    expect(container.firstChild).toBeNull();
  });

  test("renders cart icon with no badge when cart is empty", () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
      },
      cart: {
        items: [],
      },
    });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CartIcon />
        </BrowserRouter>
      </Provider>,
    );

    // Should render the cart icon but no badge
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "/cart");
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector(".bg-red-500")).not.toBeInTheDocument();
  });

  test("renders cart icon with badge showing correct count", () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
      },
      cart: {
        items: [
          { product: { id: 1 }, quantity: 2 },
          { product: { id: 2 }, quantity: 3 },
        ],
      },
    });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CartIcon />
        </BrowserRouter>
      </Provider>,
    );

    // Should render the cart icon with badge showing total quantity (5)
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "/cart");
    expect(container.querySelector("svg")).toBeInTheDocument();

    const badge = container.querySelector(".bg-red-500");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("5");
  });

  test("has correct styling classes", () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
      },
      cart: {
        items: [{ product: { id: 1 }, quantity: 1 }],
      },
    });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CartIcon />
        </BrowserRouter>
      </Provider>,
    );

    // Check icon classes
    const icon = container.querySelector("svg");
    expect(icon).toHaveClass("h-6");
    expect(icon).toHaveClass("w-6");
    expect(icon).toHaveClass("text-gray-600");

    // Check badge classes
    const badge = container.querySelector(".bg-red-500");
    expect(badge).toHaveClass("absolute");
    expect(badge).toHaveClass("-right-2");
    expect(badge).toHaveClass("-top-2");
    expect(badge).toHaveClass("rounded-full");
    expect(badge).toHaveClass("text-white");
  });
});
