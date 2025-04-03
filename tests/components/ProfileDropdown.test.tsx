import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProfileDropdown from "../../src/components/Navbar/ProfileDropdown";
import { logout } from "../../src/store/features/authSlice";

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

describe("ProfileDropdown Component", () => {
  test("renders login link when user is not authenticated", () => {
    const store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileDropdown />
        </BrowserRouter>
      </Provider>
    );

    // Should render a login link
    const loginLink = screen.getByText("Login");
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
    expect(loginLink).toHaveClass("bg-blue-500");
  });

  test("renders profile avatar with initial when user has no picture", () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
        user: {
          name: "Test User",
          picture: null,
        },
      },
    });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileDropdown />
        </BrowserRouter>
      </Provider>
    );

    // Should render an avatar with the first letter of the user's name
    const avatar = container.querySelector(".bg-gray-400");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveTextContent("T");
  });

  test("renders fallback avatar when user has no name and no picture", () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
        user: {
          name: null,
          picture: null,
        },
      },
    });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileDropdown />
        </BrowserRouter>
      </Provider>
    );

    // Should render an avatar with a fallback letter 'U'
    const avatar = container.querySelector(".bg-gray-400");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveTextContent("U");
  });

  test("clicking sign out dispatches logout action", async () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
        user: {
          name: "Test User",
          picture: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileDropdown />
        </BrowserRouter>
      </Provider>
    );

    // Click on the avatar to open the dropdown
    const avatar = screen.getByText("T");
    fireEvent.click(avatar);

    // Wait for the dropdown to appear and then click sign out
    await waitFor(() => {
      expect(screen.getByText("Sign out")).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText("Sign out"));
    
    // Check if logout action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith(logout());
  });

  test("dropdown menu contains expected links", async () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
        user: {
          name: "Test User",
          picture: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileDropdown />
        </BrowserRouter>
      </Provider>
    );

    // Click on the avatar to open the dropdown
    const avatar = screen.getByText("T");
    fireEvent.click(avatar);

    // Wait for the dropdown to appear
    await waitFor(() => {
      // Check for profile link
      const profileLink = screen.getByText("Your Profile");
      expect(profileLink).toBeInTheDocument();
      expect(profileLink).toHaveAttribute("href", "/profile");
      
      // Check for sign out button
      expect(screen.getByText("Sign out")).toBeInTheDocument();
    });
  });
});