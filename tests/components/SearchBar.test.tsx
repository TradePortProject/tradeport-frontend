import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../src/components/SearchBar";

describe("SearchBar Component", () => {
  test("renders with provided searchText", () => {
    const mockSearchText = "test query";
    const mockOnSearchChange = vi.fn();

    render(
      <SearchBar 
        searchText={mockSearchText} 
        onSearchChange={mockOnSearchChange} 
      />
    );

    const inputElement = screen.getByPlaceholderText("Search ...");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(mockSearchText);
  });

  test("calls onSearchChange when input value changes", () => {
    const mockSearchText = "";
    const mockOnSearchChange = vi.fn();

    render(
      <SearchBar 
        searchText={mockSearchText} 
        onSearchChange={mockOnSearchChange} 
      />
    );

    const inputElement = screen.getByPlaceholderText("Search ...");
    fireEvent.change(inputElement, { target: { value: "new search" } });
    
    expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
    expect(mockOnSearchChange).toHaveBeenCalledWith("new search");
  });

  test("has the correct styling", () => {
    const { container } = render(
      <SearchBar 
        searchText="" 
        onSearchChange={() => {}} 
      />
    );

    const searchBar = container.querySelector(".search-bar");
    expect(searchBar).toBeInTheDocument();
    
    const inputElement = screen.getByPlaceholderText("Search ...");
    expect(inputElement).toHaveClass("px-4");
    expect(inputElement).toHaveClass("py-2");
    expect(inputElement).toHaveClass("border");
    expect(inputElement).toHaveClass("rounded");
    expect(inputElement).toHaveAttribute("style", expect.stringContaining("width: 500px"));
  });

  test("updates value when props change", () => {
    const mockOnSearchChange = vi.fn();
    
    const { rerender } = render(
      <SearchBar 
        searchText="initial" 
        onSearchChange={mockOnSearchChange} 
      />
    );
    
    // Check initial value
    let inputElement = screen.getByPlaceholderText("Search ...");
    expect(inputElement).toHaveValue("initial");
    
    // Rerender with new searchText prop
    rerender(
      <SearchBar 
        searchText="updated" 
        onSearchChange={mockOnSearchChange} 
      />
    );
    
    // Check that value was updated
    inputElement = screen.getByPlaceholderText("Search ...");
    expect(inputElement).toHaveValue("updated");
  });
});