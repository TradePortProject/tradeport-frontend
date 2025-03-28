import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Home from "../../src/pages/Home";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

// Mock the child components
vi.mock("../../src/components/Hero", () => ({
  default: () => <div data-testid="hero-component">Hero Component</div>,
}));

vi.mock("../../src/components/ImageSlider", () => ({
  default: ({ images }: { images: string[] }) => (
    <div data-testid="image-slider-component">
      {images.map((img, i) => (
        <div key={i} data-testid="slider-image" data-src={img}>
          Image {i}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../src/components/CategoryGrid", () => ({
  default: () => (
    <div data-testid="category-grid-component">CategoryGrid Component</div>
  ),
}));

vi.mock("../../src/components/FeaturesSection", () => ({
  default: () => (
    <div data-testid="features-section-component">Features Component</div>
  ),
}));

vi.mock("../../src/components/Newsletter", () => ({
  default: () => (
    <div data-testid="newsletter-component">Newsletter Component</div>
  ),
}));

describe("Home Page", () => {
  it("renders all components in correct order", () => {
    const { container } = render(<Home />);

    // Check if main container has the correct classes
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass("mx-auto");
    expect(mainContainer).toHaveClass("min-h-screen");
    expect(mainContainer).toHaveClass("max-w-7xl");

    // Check if all components are rendered
    expect(screen.getByTestId("image-slider-component")).toBeInTheDocument();
    expect(screen.getByTestId("hero-component")).toBeInTheDocument();
    expect(screen.getByTestId("category-grid-component")).toBeInTheDocument();
    expect(
      screen.getByTestId("features-section-component"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("newsletter-component")).toBeInTheDocument();

    // Check if components are in correct order
    const children = Array.from(mainContainer?.childNodes || []);
    expect(children[0]).toBe(screen.getByTestId("image-slider-component"));
    expect(children[1]).toBe(screen.getByTestId("hero-component"));
    expect(children[2]).toBe(screen.getByTestId("category-grid-component"));
    expect(children[3]).toBe(screen.getByTestId("features-section-component"));
    expect(children[4]).toBe(screen.getByTestId("newsletter-component"));
  });

  test("passes correct props to ImageSlider", () => {
    render(<Home />);

    // Check if all images are passed to the slider
    const imageElements = screen.getAllByTestId("slider-image");
    expect(imageElements.length).toBe(6);

    // Verify the image paths
    const expectedImages = [
      "/img/sofa.jpg",
      "/img/bedroom.jpg",
      "/img/office.jpg",
      "/img/kitchen.jpg",
      "/img/bathroom.jpg",
      "/img/outdoor.jpg",
    ];

    imageElements.forEach((img, index) => {
      expect(img.getAttribute("data-src")).toBe(expectedImages[index]);
    });
  });
});
