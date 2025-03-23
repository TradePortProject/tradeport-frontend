import React from "react"; // ✅ Explicitly import React to avoid UMD global error
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom"; //  Ensures `toBeInTheDocument()` is available
import Error from "../../src/pages/Error";

describe("Error page", () => {
  // Renders 404 Heading
  it("renders the 404 heading", () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>,
    );

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  // Renders 404 Message
  it("displays the 404 message", () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Oops! The page you're looking for doesn't exist."),
    ).toBeInTheDocument();
  });

  // Checks the "Go Back Home" link
  it("should have a link to go back home", () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: "Go Back Home" });
    expect(link).toHaveAttribute("href", "/");
  });
});
