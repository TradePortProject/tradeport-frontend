import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Navbar from "../../src/components/Navbar/Navbar";
import { describe, expect } from "vitest";
import "@testing-library/jest-dom";

// Create mock store
const mockStore = configureStore([]);
const initialState = {
  auth: {
    isAuthenticated: false,
    user: null,
  },
  cart: {
    items: [],
  },
  // Add other state slices as needed
};

describe("Navbar Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("renders correctly when user is not authenticated", () => {
    // Initialize with non-authenticated state
    const store = mockStore({
      auth: {
        isAuthenticated: false,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    // Check if logo is present
    expect(screen.getByText("TradePort")).toBeInTheDocument();

    // Check if login link is present for non-authenticated users
    expect(screen.getByText("Log in →")).toBeInTheDocument();

    // NavLinks and CartIcon should be rendered regardless of auth state
    // We're not testing their internal implementation, just that they're included
  });

  test("renders correctly when user is authenticated", () => {
    // Initialize with authenticated state
    const store = mockStore({
      auth: {
        isAuthenticated: true,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    // Check if logo is present
    expect(screen.getByText("TradePort")).toBeInTheDocument();

    // Login link should not be present for authenticated users
    expect(screen.queryByText("Log in →")).not.toBeInTheDocument();

    // ProfileDropdown should be rendered instead (we're not testing its internal implementation)
  });

  test("has correct responsive classes", () => {
    const store = mockStore({
      auth: {
        isAuthenticated: false,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    // Check if nav has the correct classes
    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("sticky");
    expect(nav).toHaveClass("top-0");
    expect(nav).toHaveClass("z-50");

    // Check if desktop navigation is hidden on small screens
    const desktopNav = container.querySelector(".hidden.sm\\:flex");
    expect(desktopNav).toBeInTheDocument();

    // Check if mobile menu is only visible on small screens
    const mobileMenu = container.querySelector(".sm\\:hidden");
    expect(mobileMenu).toBeInTheDocument();
  });
});
