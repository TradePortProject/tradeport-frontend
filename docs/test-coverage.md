# Test Coverage Documentation

## Authentication Slice Testing Strategy

This document outlines the testing approach for the authentication functionality in the Tradeport frontend application. It serves as a guide for understanding test coverage, identifying gaps, and maintaining test quality.

### Coverage Areas

| Feature Area    | Coverage Percentage | Key Tests                        | Description                            |
| --------------- | ------------------- | -------------------------------- | -------------------------------------- |
| Auth Reducer    | 100%                | `authSlice.test.ts`              | Tests all reducer state transitions    |
| Action Creators | 100%                | `authSlice.test.ts`              | Tests all action payload handling      |
| Edge Cases      | 90%                 | Role mapping, sequential actions | Covers common edge cases in auth flows |
| User Roles      | 100%                | `authSlice.test.ts`              | Tests retailer and wholesaler roles    |

### Test Structure

Our authentication tests follow a structured pattern:

1. **Base functionality tests** - Verify the core functions work (login, logout, etc.)
2. **Complete state validation tests** - Verify the entire state object for each action
3. **Edge case tests** - Verify handling of special scenarios and boundary conditions
4. **Flow tests** - Verify sequences of actions that simulate user journeys

### Edge Cases Covered

1. **Role Mapping**: Tests verify correct mapping from numeric role values to string roles

   - Role 0 → "retailer" (used for store owners and retail staff)
   - Role 1 → "wholesaler" (used for suppliers and distributors)
   - _Rationale_: The API uses numeric codes while the UI requires string representations

2. **State Persistence**: Tests verify state is properly maintained during:

   - Updates to user details while authenticated (ensures tokens aren't lost)
   - Sequential operations (register → login) (ensures registration status is preserved)
   - Login with different user roles (ensures role-specific properties are handled)
   - _Rationale_: State persistence is critical to prevent accidental logouts and loss of user context

3. **Complete State Validation**: All tests verify the complete state object, not just changed properties
   - _Rationale_: Prevents regression bugs where fixing one property breaks another

### Known Gaps & Future Tests

1. **Error Handling**: Add tests for handling API errors during auth operations

   - 400 errors (invalid credentials)
   - 401/403 errors (unauthorized/forbidden)
   - Network errors and timeouts
   - _Priority_: High

2. **Token Expiration**: Add tests for token expiration scenarios

   - Auto-logout after token expiration
   - Refresh token flows
   - _Priority_: Medium

3. **Invalid Role Values**: Test handling of unknown role values

   - How the application handles role values outside the expected range (2+)
   - Fallback behavior for missing role values
   - _Priority_: Low

4. **OAuth Integration**: Test integration with OAuth providers
   - Google sign-in flow
   - Profile data mapping from providers
   - _Priority_: Medium

### Test Quality Metrics

1. **Assertion Density**: 3.5 assertions per test (good balance)

   - _Target_: 2-5 assertions per test
   - _Rationale_: Too few assertions miss validating important state; too many make tests difficult to understand

2. **Test Isolation**: All tests are properly isolated with fresh state

   - Each test starts with a clean initial state or explicitly defined state
   - No test depends on the outcome of another test
   - _Rationale_: Prevents cascading failures and makes test failures easier to diagnose

3. **Readability**: Tests follow AAA pattern (Arrange-Act-Assert)

   - Clear setup of test data
   - Single action being tested
   - Explicit assertions with descriptive messages
   - _Rationale_: Makes tests easier to understand and maintain

4. **Maintainability**: Tests use descriptive names and proper setup
   - Test names clearly describe what is being tested
   - Complex scenarios are documented with comments
   - Helper functions are used to reduce repetition
   - _Rationale_: Reduces maintenance burden and helps new developers understand tests

## Cart Slice Testing Strategy

This section outlines the testing approach for the shopping cart functionality in the Tradeport frontend application.

### Coverage Areas

| Feature Area    | Coverage Percentage | Key Tests                     | Description                            |
| --------------- | ------------------- | ----------------------------- | -------------------------------------- |
| Cart Reducer    | 100%                | `cartSlice.test.ts`           | Tests all cart state transitions       |
| Action Creators | 100%                | `cartSlice.test.ts`           | Tests all action payload handling      |
| Edge Cases      | 100%                | Non-existent items, sequences | Covers common edge cases in cart flows |

### Test Structure

Our cart tests follow a structured pattern:

1. **Base functionality tests** - Verify the core functions work (add, remove, update, etc.)
2. **Duplication handling tests** - Verify proper handling of duplicate products
3. **Edge case tests** - Verify handling of special scenarios (non-existent products)
4. **Flow tests** - Verify sequences of actions that simulate user shopping journeys

### Edge Cases Covered

1. **Product Duplication**: Tests verify correct handling of adding the same product multiple times

   - Quantity is increased rather than creating duplicate entries
   - Original product data is preserved
   - _Rationale_: Prevents redundant cart entries and UX confusion

2. **Non-existent Products**: Tests verify graceful handling of operations on products not in cart

   - Increasing quantity of missing products
   - Updating quantity of missing products
   - Removing missing products
   - _Rationale_: Ensures stability when frontend/backend data is out of sync

3. **Sequential Operations**: Tests verify correct state after series of operations
   - Add → Update → Remove sequences
   - Multiple product interactions
   - _Rationale_: Ensures cart state remains consistent through complex user interactions

### Known Gaps & Future Tests

1. **Product Price Changes**: Add tests for handling price changes after adding to cart

   - How updated product data affects existing cart items
   - _Priority_: Medium

2. **Cart Persistence**: Add tests for cart state persistence across sessions

   - LocalStorage integration
   - Merging stored and new cart items
   - _Priority_: High

3. **Quantity Constraints**: Add tests for minimum/maximum quantity constraints
   - Minimum order quantities
   - Stock-limited maximum quantities
   - _Priority_: Medium

### Test Quality Metrics

1. **Assertion Density**: 2-3 assertions per test

   - Focused on specific state changes
   - Clear validation of expected outcomes

2. **Test Isolation**: All tests use fresh cart state

   - No shared state between tests
   - Explicit setup for each test case

3. **Readability**: Clear test case descriptions
   - Each test focuses on a single cart operation
   - Business logic is clearly represented in test cases

## Running Coverage Reports

To generate test coverage reports:

```bash
npm run test:coverage
```

Coverage reports will be available in the `/coverage` directory.

### Interpreting Coverage Reports

When reviewing coverage reports, focus on:

1. **Uncovered Lines**: Examine any uncovered lines to determine if they represent:

   - Error handling code that should be tested
   - Edge cases that haven't been considered
   - Dead code that could be removed

2. **Branch Coverage**: Pay special attention to conditional logic (if/else, switch)

   - Aim for 100% branch coverage in critical path code (auth flows)
   - Identify untested conditions and add specific tests

3. **Function Coverage**: Ensure all exported functions have at least basic tests
   - Private/helper functions should be tested indirectly through public APIs

## Test Maintenance Guidelines

1. **When Adding Features**: Add corresponding tests before or alongside the feature code
2. **When Fixing Bugs**: Add a test that reproduces the bug before fixing it
3. **When Refactoring**: Run tests before and after to ensure behavior hasn't changed
4. **Quarterly Review**: Review test coverage and quality metrics quarterly
