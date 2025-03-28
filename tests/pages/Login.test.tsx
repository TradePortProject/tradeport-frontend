import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../../src/pages/Login";
import { useDispatch } from "react-redux";
import { register } from "../../src/store/features/authSlice";
import { MemoryRouter } from "react-router-dom";

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock dependencies
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

vi.mock("../../src/store/features/authSlice", () => ({
  register: vi.fn(),
}));

vi.mock("../../src/components/GoogleAuthButton", () => ({
  default: () => (
    <button data-testid="google-auth-button">Sign in with Google</button>
  ),
}));

// Helper function to render with Router context
const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("Login Component", () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = vi.fn();
    (useDispatch as any).mockReturnValue(mockDispatch);
    vi.clearAllMocks();
  });

  it("renders the login page with title", () => {
    renderWithRouter(<Login />);
    expect(screen.getByText("Sign in to TradePort")).toBeInTheDocument();
    expect(screen.getByText("Choose Your Role")).toBeInTheDocument();
  });

  it("displays role selection buttons", () => {
    renderWithRouter(<Login />);
    expect(screen.getByText("Retailer")).toBeInTheDocument();
    expect(screen.getByText("Wholesaler")).toBeInTheDocument();
  });

  it("does not show Google button initially", () => {
    renderWithRouter(<Login />);
    expect(screen.queryByTestId("google-auth-button")).not.toBeInTheDocument();
  });

  it("selects retailer role and dispatches action", () => {
    renderWithRouter(<Login />);
    fireEvent.click(screen.getByText("Retailer"));

    expect(register).toHaveBeenCalledWith({ email: "", role: "retailer" });
    expect(mockDispatch).toHaveBeenCalled();
    expect(screen.getByTestId("google-auth-button")).toBeInTheDocument();
  });

  it("selects wholesaler role and dispatches action", () => {
    renderWithRouter(<Login />);
    fireEvent.click(screen.getByText("Wholesaler"));

    expect(register).toHaveBeenCalledWith({ email: "", role: "wholesaler" });
    expect(mockDispatch).toHaveBeenCalled();
    expect(screen.getByTestId("google-auth-button")).toBeInTheDocument();
  });

  it("changes button styling based on selected role", () => {
    renderWithRouter(<Login />);

    // Initially no button should have the blue background
    const retailerButton = screen.getByText("Retailer").closest("button");
    const wholesalerButton = screen.getByText("Wholesaler").closest("button");

    expect(retailerButton).not.toHaveClass("bg-blue-600");
    expect(wholesalerButton).not.toHaveClass("bg-green-600");

    // Click retailer
    fireEvent.click(retailerButton!);
    expect(retailerButton).toHaveClass("bg-blue-600");
    expect(wholesalerButton).not.toHaveClass("bg-green-600");

    // Click wholesaler
    fireEvent.click(wholesalerButton!);
    expect(retailerButton).not.toHaveClass("bg-blue-600");
    expect(wholesalerButton).toHaveClass("bg-green-600");
  });
});
