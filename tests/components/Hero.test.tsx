import { render, screen } from "@testing-library/react";
import Hero from "../../src/components/Hero";

describe("Hero Component", () => {
  test("renders correctly", () => {
    const { container } = render(<Hero />);

    // Check if main headings are present
    expect(screen.getByText("Simply Unique")).toBeInTheDocument();
    expect(screen.getByText("Simply Better")).toBeInTheDocument();

    // Check if description is present
    expect(screen.getByText(/TradePort/)).toBeInTheDocument();
    expect(
      screen.getByText(/is a B2B store based in Singapore. Est since 2025./),
    ).toBeInTheDocument();

    // Check if the section has the expected classes - using container.querySelector instead of getByRole
    const section = container.querySelector("section");
    expect(section).toHaveClass("mx-auto");
    expect(section).toHaveClass("flex");
    expect(section).toHaveClass("w-full");

    // Verify the structure
    const headingDiv = screen.getByText("Simply Unique").closest("div");
    expect(headingDiv).toHaveClass("text-4xl");
    expect(headingDiv).toHaveClass("font-bold");

    const descriptionDiv = screen.getByText(/TradePort/).closest("div");
    expect(descriptionDiv).toHaveClass("text-lg");
  });

  test("renders with correct responsive design classes", () => {
    const { container } = render(<Hero />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("flex-col");
    expect(section).toHaveClass("md:flex-row");

    const headingDiv = screen.getByText("Simply Unique").closest("div");
    expect(headingDiv).toHaveClass("text-4xl");
    expect(headingDiv).toHaveClass("md:text-7xl");

    const descriptionDiv = screen.getByText(/TradePort/).closest("div");
    expect(descriptionDiv).toHaveClass("mt-10");
    expect(descriptionDiv).toHaveClass("md:mt-0");
    expect(descriptionDiv).toHaveClass("text-center");
    expect(descriptionDiv).toHaveClass("md:text-right");
  });

  test("has correct element structure and nesting", () => {
    const { container } = render(<Hero />);

    // Check that section is the root element
    const section = container.querySelector("section");

    // Check that section has exactly two direct child divs
    expect(section?.children.length).toBe(2);

    // Check the divider slash is present and styled correctly
    const divider = screen.getByText("/");
    expect(divider).toHaveClass("px-8");
    expect(divider).toHaveClass("italic");
    expect(divider).toHaveClass("text-gray-500");

    // Check for the period at the end of "Simply Better"
    const period = screen.getByText(".");
    expect(period).toHaveClass("text-gray-500");
  });
});
