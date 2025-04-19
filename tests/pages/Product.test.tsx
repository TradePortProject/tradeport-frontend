import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Product } from "../../src/pages/Product"; // Fixed import from ProductMaster to Product
import { BrowserRouter } from "react-router-dom";

describe("Product Component", () => { // Updated description to match the component name
  it("renders the product page with title and product list", () => {
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
  

    render(
      <BrowserRouter>
        <Product products={mockProduct} />
      </BrowserRouter>
    );

    

    expect(screen.getByText("Test Product")).toBeInTheDocument();
 
  });

  it("renders a message when no products are available", () => {
    render(
      <BrowserRouter>
        <Product products={[]} />
      </BrowserRouter>
    );

    expect(screen.getByText("No products available")).toBeInTheDocument();
  });
});
