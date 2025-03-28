import { describe, it, expect } from "vitest";
import cartReducer, {
  addToCart,
  removeFromCart,
  increaseQuantity,
  updateQuantity,
  clearCart,
  CartState,
} from "../../../src/store/features/cartSlice";

/**
 * Test suite for the cart reducer and actions
 *
 * This test suite verifies all shopping cart functionality in the Tradeport app,
 * including adding products, updating quantities, and cart management.
 *
 * Architecture:
 * The cart slice manages shopping cart state using Redux Toolkit.
 * It handles five primary actions:
 * - addToCart: Adds a product to cart or increases quantity if already present
 * - removeFromCart: Removes a product completely from the cart
 * - increaseQuantity: Increments the quantity of a specific product
 * - updateQuantity: Sets the quantity of a product to a specific value
 * - clearCart: Removes all products from the cart
 *
 * Coverage:
 * - Initial state validation
 * - Adding products (new and existing)
 * - Removing products
 * - Updating quantities
 * - Clearing the entire cart
 * - Empty cart handling
 *
 * Edge cases covered:
 * - Adding duplicate products
 * - Updating non-existent products
 * - Quantity manipulation
 * - Sequential operations
 */
describe("cart reducer", () => {
  const initialState = {
    items: [],
  };

  /**
   * Test product data for use in multiple tests
   */
  const testProduct1 = {
    id: 1,
    name: "Test Product 1",
    price: 10.99,
  };

  const testProduct2 = {
    id: 2,
    name: "Test Product 2",
    price: 20.5,
  };

  /**
   * Verifies the initial state of the cart reducer
   *
   * This test ensures that when the application starts, the cart
   * is empty with no items.
   */
  it("should handle initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  /**
   * Tests adding a new product to the cart
   *
   * When adding a product for the first time, it should:
   * - Add the product to the items array
   * - Set the quantity to 1
   * - Preserve the complete product data
   */
  it("should handle adding a new product to cart", () => {
    const actual = cartReducer(initialState, addToCart(testProduct1));

    expect(actual.items.length).toBe(1);
    expect(actual.items[0].product).toEqual(testProduct1);
    expect(actual.items[0].quantity).toBe(1);
  });

  /**
   * Tests adding an existing product to the cart
   *
   * When adding a product that's already in the cart, it should:
   * - Increase the quantity by 1
   * - Not add a duplicate entry
   * - Preserve existing cart items
   */
  it("should handle adding an existing product to cart", () => {
    const stateWithProduct = {
      items: [{ product: testProduct1, quantity: 1 }],
    };

    const actual = cartReducer(stateWithProduct, addToCart(testProduct1));

    expect(actual.items.length).toBe(1);
    expect(actual.items[0].product).toEqual(testProduct1);
    expect(actual.items[0].quantity).toBe(2);
  });

  /**
   * Tests removing a product from the cart
   *
   * When removing a product, it should:
   * - Remove the entire product entry regardless of quantity
   * - Preserve other cart items
   */
  it("should handle removing a product from cart", () => {
    const stateWithTwoProducts = {
      items: [
        { product: testProduct1, quantity: 1 },
        { product: testProduct2, quantity: 3 },
      ],
    };

    const actual = cartReducer(
      stateWithTwoProducts,
      removeFromCart(testProduct1.id),
    );

    expect(actual.items.length).toBe(1);
    expect(actual.items[0].product).toEqual(testProduct2);
  });

  /**
   * Tests increasing the quantity of a product
   *
   * When increasing quantity, it should:
   * - Increment the quantity by 1
   * - Only affect the targeted product
   * - Do nothing if product doesn't exist in cart
   */
  it("should handle increasing quantity of a product", () => {
    const stateWithTwoProducts = {
      items: [
        { product: testProduct1, quantity: 1 },
        { product: testProduct2, quantity: 3 },
      ],
    };

    const actual = cartReducer(
      stateWithTwoProducts,
      increaseQuantity(testProduct2.id),
    );

    expect(actual.items[0].quantity).toBe(1); // Unchanged
    expect(actual.items[1].quantity).toBe(4); // Increased
  });

  /**
   * Tests updating the quantity of a product to a specific value
   *
   * When updating quantity, it should:
   * - Set the quantity to the exact specified value
   * - Only affect the targeted product
   */
  it("should handle updating quantity of a product", () => {
    const stateWithProduct = {
      items: [{ product: testProduct1, quantity: 2 }],
    };

    const actual = cartReducer(
      stateWithProduct,
      updateQuantity({ productId: testProduct1.id, quantity: 5 }),
    );

    expect(actual.items[0].quantity).toBe(5);
  });

  /**
   * Tests clearing the entire cart
   *
   * When clearing the cart, it should:
   * - Remove all items
   * - Reset to the initial state
   */
  it("should handle clearing the cart", () => {
    const stateWithProducts = {
      items: [
        { product: testProduct1, quantity: 1 },
        { product: testProduct2, quantity: 3 },
      ],
    };

    const actual = cartReducer(stateWithProducts, clearCart());

    expect(actual).toEqual(initialState);
  });

  /**
   * Tests edge case: Attempting to increase quantity of non-existent product
   *
   * When increasing quantity for a product not in cart, it should:
   * - Not modify the cart
   * - Not error
   */
  it("should handle increasing quantity of non-existent product", () => {
    const stateWithProduct = {
      items: [{ product: testProduct1, quantity: 1 }],
    };

    const actual = cartReducer(stateWithProduct, increaseQuantity(999));

    expect(actual).toEqual(stateWithProduct);
  });

  /**
   * Tests edge case: Attempting to update quantity of non-existent product
   *
   * When updating quantity for a product not in cart, it should:
   * - Not modify the cart
   * - Not error
   */
  it("should handle updating quantity of non-existent product", () => {
    const stateWithProduct = {
      items: [{ product: testProduct1, quantity: 1 }],
    };

    const actual = cartReducer(
      stateWithProduct,
      updateQuantity({ productId: 999, quantity: 5 }),
    );

    expect(actual).toEqual(stateWithProduct);
  });

  /**
   * Tests edge case: Removing a non-existent product
   *
   * When removing a product not in cart, it should:
   * - Not modify the cart
   * - Not error
   */
  it("should handle removing a non-existent product", () => {
    const stateWithProduct = {
      items: [{ product: testProduct1, quantity: 1 }],
    };

    const actual = cartReducer(stateWithProduct, removeFromCart(999));

    expect(actual).toEqual(stateWithProduct);
  });

  /**
   * Tests edge case: Sequential operations on the cart
   *
   * This test simulates a real user flow of adding multiple products,
   * updating quantities, and removing items.
   */
  it("should handle sequence of cart operations", () => {
    // Start with empty cart
    let state: CartState = initialState as CartState;

    // Add first product
    state = cartReducer(state, addToCart(testProduct1));

    // Add second product
    state = cartReducer(state, addToCart(testProduct2));

    // Increase quantity of first product
    state = cartReducer(state, increaseQuantity(testProduct1.id));

    // Update quantity of second product
    state = cartReducer(
      state,
      updateQuantity({ productId: testProduct2.id, quantity: 5 }),
    );

    // Remove first product
    state = cartReducer(state, removeFromCart(testProduct1.id));

    // Verify final state
    expect(state.items.length).toBe(1);
    expect(state.items[0].product).toEqual(testProduct2);
    expect(state.items[0].quantity).toBe(5);
  });
});
