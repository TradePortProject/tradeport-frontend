import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ProductMaster } from "../../src/pages/Product";
import { savePost } from "../../src/posts/savePost";
import store from "../../src/store/store";

// Mock dependencies
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));
vi.mock("../posts/savePost", () => ({
  savePost: vi.fn(),
}));
vi.mock("react-redux", () => ({
  useSelector: vi.fn(() => ({ user: { userID: "12345" } })),
}));

const mockedNavigate = vi.fn();

describe("ProductMaster Component", () => {
  beforeEach(() => {
    vi.mocked(mockedNavigate).mockClear();
    vi.mocked(savePost).mockClear();
  });

  it("renders the form correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductMaster />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText("Product Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByText("Create Product")).toBeInTheDocument();
  });

  it("shows validation errors on empty submission", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductMaster />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Create Product"));

    await waitFor(() => {
      expect(screen.getByText("You must enter Product Name")).toBeInTheDocument();
      expect(screen.getByText("You must enter Description")).toBeInTheDocument();
    });
  });

  it("handles image preview correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductMaster />
        </MemoryRouter>
      </Provider>
    );

    const fileInput = screen.getByLabelText(/image/i);
    const file = new File(["dummy content"], "example.png", { type: "image/png" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByAltText("Product Preview")).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    vi.mocked(savePost).mockResolvedValue({ id: "1" });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductMaster />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Product Name"), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByPlaceholderText("Retail Price"), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByText("Create Product"));

    await waitFor(() => {
      expect(savePost).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalledWith("/catalogGrid");
    });
  });
});
