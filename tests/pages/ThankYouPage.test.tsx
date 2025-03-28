import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThankYouPage } from "../../src/pages/ThankYouPage";

describe("ThankYouPage", () => {
  it("renders without errors", () => {
    render(<ThankYouPage />);

    // Check if the thank you message is displayed
    expect(
      screen.getByText(/thanks we will be in touch shortly/i),
    ).toBeInTheDocument();
  });

  it("has the correct styling", () => {
    const { container } = render(<ThankYouPage />);

    // Check for the main container with background color
    const mainContainer = container.querySelector(".bg-blue-400");
    expect(mainContainer).toBeInTheDocument();

    // Check for the white card
    const card = container.querySelector(".bg-white");
    expect(card).toBeInTheDocument();
  });
});
