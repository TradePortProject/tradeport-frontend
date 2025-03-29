import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../../src/components/Pagination";

describe("Pagination Component", () => {
  test("renders with correct number of options based on totalPages", () => {
    const mockOnPageChange = vi.fn();
    
    render(
      <Pagination 
        pageNumber={1} 
        totalPages={5} 
        onPageChange={mockOnPageChange} 
      />
    );
    
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(5);
    expect(options[0]).toHaveTextContent("Page 1");
    expect(options[4]).toHaveTextContent("Page 5");
  });
  
  test("shows the correct selected page", () => {
    const mockOnPageChange = vi.fn();
    
    render(
      <Pagination 
        pageNumber={3} 
        totalPages={5} 
        onPageChange={mockOnPageChange} 
      />
    );
    
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("3");
  });
  
  test("calls onPageChange with correct page number when changed", () => {
    const mockOnPageChange = vi.fn();
    
    render(
      <Pagination 
        pageNumber={1} 
        totalPages={5} 
        onPageChange={mockOnPageChange} 
      />
    );
    
    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "4" } });
    
    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });
  
  test("handles single page scenario", () => {
    const mockOnPageChange = vi.fn();
    
    render(
      <Pagination 
        pageNumber={1} 
        totalPages={1} 
        onPageChange={mockOnPageChange} 
      />
    );
    
    const selectElement = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");
    
    expect(options.length).toBe(1);
    expect(options[0]).toHaveTextContent("Page 1");
    expect(selectElement).toHaveValue("1");
  });
  
  test("has the correct styling", () => {
    const { container } = render(
      <Pagination 
        pageNumber={1} 
        totalPages={3} 
        onPageChange={() => {}} 
      />
    );
    
    const paginationDiv = container.querySelector(".pagination");
    expect(paginationDiv).toBeInTheDocument();
    
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveClass("px-4");
    expect(selectElement).toHaveClass("py-2");
    expect(selectElement).toHaveClass("border");
    expect(selectElement).toHaveClass("rounded");
  });
});