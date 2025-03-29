import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductCard from "../../src/components/ProductCard";

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ProductCard Component", () => {
  const mockProduct = {
    productID: "1",
    productCode: "P001",
    manufacturerID: "M001",
    productName: "Test Product",
    description: "Test description",
    category: "Test Category",
    wholesalePrice: 50,
    retailPrice: 100,
    retailCurrency: "USD",
    wholeSaleCurrency: "USD",
    shippingCost: 10,
    quantity: 20,
    createdOn: "2023-01-01",
    updatedOn: "2023-01-02",
    isActive: true,
    productImage: [{ productImageURL: "/images/test.jpg" }],
  };

  test("renders product details correctly", () => {
    render(
      <BrowserRouter>
        <ProductCard {...mockProduct} />
      </BrowserRouter>
    );

    // Check if product name is rendered
    expect(screen.getByText("Test Product")).toBeInTheDocument();

    // Check if description is rendered
    expect(screen.getByText("Test description")).toBeInTheDocument();

    // Check if price information is rendered
    expect(screen.getByText("WholeSale Price: 50 USD")).toBeInTheDocument();
    expect(screen.getByText("Retail Price: 100 USD")).toBeInTheDocument();
    
    // Check if quantity is rendered
    expect(screen.getByText("Quantity: 20")).toBeInTheDocument();
  });

  test("renders default image when product has no images", () => {
    const productWithoutImage = {
      ...mockProduct,
      productImage: [],
    };

    render(
      <BrowserRouter>
        <ProductCard {...productWithoutImage} />
      </BrowserRouter>
    );

    const img = screen.getByAltText("Test Product");
    expect(img).toHaveAttribute("src", "http://localhost:3001/img/image-missing.jpg");
  });

  test("navigates to product detail page when clicked", () => {
    render(
      <BrowserRouter>
        <ProductCard {...mockProduct} />
      </BrowserRouter>
    );

    // Simulate click on the product card
    fireEvent.click(screen.getByText("Test Product"));

    // Check if navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/productdetail/1");
  });

  test("renders with correct styling classes", () => {
    const { container } = render(
      <BrowserRouter>
        <ProductCard {...mockProduct} />
      </BrowserRouter>
    );

    // Check if product card has the correct classes
    const productCard = container.querySelector(".product-card");
    expect(productCard).toHaveClass("cursor-pointer");
    expect(productCard).toHaveClass("rounded-lg");
    expect(productCard).toHaveClass("shadow-lg");

    // Check if image has correct styling
    const productImage = container.querySelector(".product-image");
    expect(productImage).toHaveAttribute("style", expect.stringContaining("height: 300px"));
  });
});