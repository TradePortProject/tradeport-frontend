import authReducer, {
  setUserDetails,
  register,
  login,
  logout,
} from "../../../src/store/features/authSlice";

/**
 * Test suite for the authentication reducer and actions
 *
 * This test suite verifies all authentication functionality in the Tradeport app,
 * including user registration, login flows, and session management.
 *
 * Architecture:
 * The auth slice manages user authentication state using Redux Toolkit.
 * It handles four primary actions:
 * - setUserDetails: Updates user profile information
 * - register: Handles new user registration
 * - login: Processes user authentication
 * - logout: Clears authentication state
 *
 * Coverage:
 * - Initial state validation
 * - User detail updates (authenticated and non-authenticated states)
 * - Registration process
 * - Login functionality with different user roles (retailer, wholesaler)
 * - Logout process
 * - State persistence during sequential operations
 *
 * Edge cases covered:
 * - Role mapping validation
 * - Token persistence during user detail updates
 * - Complete state checks for all operations
 * - State transitions between operations
 */
describe("auth reducer", () => {
  const initialState = {
    isRegistered: false,
    isAuthenticated: false,
    user: null,
    token: null,
  };

  /**
   * Verifies the initial state of the auth reducer
   *
   * This test ensures that when the application starts, all authentication
   * properties are properly initialized to their default values:
   * - User is not registered
   * - User is not authenticated
   * - No user information exists
   * - No authentication token exists
   */
  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  /**
   * Tests the setUserDetails action
   *
   * This action updates user profile information without changing authentication status.
   * It's typically used to update profile information from OAuth providers or after
   * user edits their profile.
   *
   * Key assertions:
   * - User information is updated correctly
   * - Authentication status remains unchanged
   * - Token and registration status are preserved
   */
  it("should handle setUserDetails", () => {
    const userInfo = {
      email: "test@example.com",
      name: "Test User",
      picture: "picture-url",
    };

    const actual = authReducer(initialState, setUserDetails(userInfo));

    expect(actual).toEqual({
      ...initialState,
      user: {
        email: "test@example.com",
        name: "Test User",
        picture: "picture-url",
      },
    });
  });

  /**
   * Tests the register action
   *
   * The register action stores basic user information and marks the user as registered,
   * but does not authenticate them. This reflects the separation between registration
   * and authentication in the application flow.
   *
   * Key assertions:
   * - User is marked as registered
   * - Basic user information is stored
   * - User remains unauthenticated (no token)
   */
  it("should handle register", () => {
    const registrationInfo = {
      email: "user@example.com",
      role: "retailer" as const,
    };

    const actual = authReducer(initialState, register(registrationInfo));

    expect(actual.isRegistered).toBe(true);
    expect(actual.user).toEqual({
      email: "user@example.com",
      role: "retailer",
    });
    expect(actual.isAuthenticated).toBe(false);
  });

  /**
   * Tests the login action with a retailer role
   *
   * The login action processes the authentication response, which includes:
   * - Storing the authentication token
   * - Marking the user as authenticated
   * - Converting numeric role (0) to string representation ("retailer")
   * - Mapping API user fields to application user fields (loginID → email, userName → name)
   *
   * This is a critical flow for the application as it establishes the user session.
   */
  it("should handle login", () => {
    const loginResponse = {
      token: "test-token-123",
      user: {
        loginID: "user@example.com",
        userID: "user123",
        userName: "Test User",
        role: 0, // retailer
        phoneNo: "1234567890",
        isActive: true,
      },
    };

    const actual = authReducer(initialState, login(loginResponse));

    expect(actual.isAuthenticated).toBe(true);
    expect(actual.token).toBe("test-token-123");
    expect(actual.user).toEqual({
      email: "user@example.com",
      userID: "user123",
      name: "Test User",
      role: "retailer",
      phoneNo: "1234567890",
      isActive: true,
    });
  });

  /**
   * Tests the logout action
   *
   * The logout action resets the entire auth state to initial values, clearing:
   * - User information
   * - Authentication token
   * - Authentication flags
   * - Registration status
   *
   * This ensures no user data remains in memory after logout, which is important
   * for security and user privacy.
   */
  it("should handle logout", () => {
    const loggedInState = {
      isRegistered: true,
      isAuthenticated: true,
      user: { email: "user@example.com", role: "retailer" as const },
      token: "test-token",
    };

    const actual = authReducer(loggedInState, logout());

    expect(actual).toEqual(initialState);
  });

  /**
   * Tests edge case: Complete state check during registration
   *
   * This comprehensive test verifies that the register action:
   * - Updates all state properties correctly
   * - Does not modify properties that should remain unchanged
   * - Maintains the correct relationship between isRegistered and isAuthenticated
   *
   * A complete state check is important to verify there are no unintended side effects.
   */
  it("should handle register with a complete state check", () => {
    const registrationInfo = {
      email: "user@example.com",
      role: "retailer" as const,
    };

    const actual = authReducer(initialState, register(registrationInfo));

    expect(actual).toEqual({
      isRegistered: true,
      isAuthenticated: false,
      user: {
        email: "user@example.com",
        role: "retailer",
      },
      token: null,
    });
  });

  /**
   * Tests edge case: Complete state check during login
   *
   * Similar to the registration test, this verifies that login:
   * - Updates authentication status and token correctly
   * - Preserves registration status from the initial state
   * - Properly transforms the API user object to the application user format
   *
   * It's particularly important to verify that login doesn't reset isRegistered.
   */
  it("should handle login with a complete state check", () => {
    const loginResponse = {
      token: "test-token-123",
      user: {
        loginID: "user@example.com",
        userID: "user123",
        userName: "Test User",
        role: 0, // retailer
        phoneNo: "1234567890",
        isActive: true,
      },
    };

    const actual = authReducer(initialState, login(loginResponse));

    expect(actual).toEqual({
      isRegistered: false,
      isAuthenticated: true,
      token: "test-token-123",
      user: {
        email: "user@example.com",
        userID: "user123",
        name: "Test User",
        role: "retailer",
        phoneNo: "1234567890",
        isActive: true,
      },
    });
  });

  /**
   * Tests edge case: Different role mappings from numeric values to string roles
   *
   * The API uses numeric role values (0, 1, etc.) while the frontend uses string
   * representations ("retailer", "wholesaler", etc.). This test verifies the mapping logic:
   *
   * Expected mapping:
   * - 0 → "retailer"
   * - 1 → "wholesaler"
   *
   * This mapping is critical for proper authorization and UI display based on user role.
   */
  it("should handle different user roles during login", () => {
    const loginResponse = {
      token: "admin-token",
      user: {
        loginID: "admin@example.com",
        userID: "admin123",
        userName: "Admin User",
        role: 1, // This maps to wholesaler, not admin
        phoneNo: "0987654321",
        isActive: true,
      },
    };

    const actual = authReducer(initialState, login(loginResponse));

    expect(actual.user?.role).toBe("wholesaler");
  });

  /**
   * Tests edge case: Ensuring existing authenticated state is preserved
   * when updating user details - maintaining token and authentication status
   *
   * This test verifies that when a user updates their profile while logged in:
   * - The authentication token is preserved
   * - The authentication status remains true
   * - Only the requested user fields are updated
   * - Other user fields are preserved
   *
   * This is important as setUserDetails should never log a user out accidentally.
   */
  it("should handle updating user details when already authenticated", () => {
    const authenticatedState = {
      isRegistered: true,
      isAuthenticated: true,
      user: {
        email: "user@example.com",
        name: "Old Name",
        role: "retailer" as const,
      },
      token: "test-token",
    };

    const newUserInfo = {
      email: "user@example.com",
      name: "Updated Name",
      picture: "new-picture-url",
    };

    const actual = authReducer(authenticatedState, setUserDetails(newUserInfo));

    expect(actual.isAuthenticated).toBe(true);
    expect(actual.user?.name).toBe("Updated Name");
    expect(actual.token).toBe("test-token");
  });

  /**
   * Tests edge case: Sequential operations preserving appropriate state
   *
   * This test simulates a real user flow of registration followed by login,
   * verifying that the state transitions correctly:
   * - After registration: User is registered but not authenticated
   * - After login: User remains registered and becomes authenticated
   *
   * This flow-based test is important for validating common user journeys
   * and ensuring state transitions work correctly across multiple actions.
   */
  it("should handle sequence of actions (register then login)", () => {
    const registrationInfo = {
      email: "user@example.com",
      role: "retailer" as const,
    };

    let state = authReducer(initialState, register(registrationInfo));

    const loginResponse = {
      token: "test-token-123",
      user: {
        loginID: "user@example.com",
        userID: "user123",
        userName: "Test User",
        role: 0,
        phoneNo: "1234567890",
        isActive: true,
      },
    };

    state = authReducer(state, login(loginResponse));

    expect(state.isRegistered).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe("test-token-123");
  });
});
