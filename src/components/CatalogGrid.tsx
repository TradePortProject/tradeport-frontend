import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import CategorySelect from "./CategorySelect";
import PriceRangeSelect from "./PriceRangeSelect";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

interface Product {
  productID: string;
  productCode: string;
  manufacturerID: string;
  productName: string;
  description: string;
  category: string; // Updated to match JSON: category as a string
  wholesalePrice: number;
  retailPrice: number;
  retailCurrency: string;
  wholeSaleCurrency: string;
  shippingCost: number;
  quantity: number;
  createdOn: string;
  updatedOn: string;
  isActive: boolean;
  productImage: { productImageURL: string }[]; // Updated to handle array of image URLs
}

const categories = [
  { id: 0, name: "All Categories" },
  { id: 1, name: "Furniture" },
  { id: 2, name: "Fashion" },
  { id: 3, name: "Home & Garden" },
  { id: 4, name: "Computer & Office" },
];

const quantities = [
  { id: 0, name: "All Quantities" },
  { id: 25, name: "Min 25" },
  { id: 50, name: "Min 50" },
  { id: 100, name: "Min 100" },
  { id: 500, name: "Min 500" },
  { id: 1000, name: "Min 1000" },
];

const priceRanges = [
  { label: "All Wholesale Price", min: 0, max: 1000000 },
  { label: "$0 - $50", min: 0, max: 50 },
  { label: "$51 - $100", min: 51, max: 100 },
  { label: "$101 - $200", min: 101, max: 200 },
  { label: "$201 - $500", min: 201, max: 500 },
  { label: "$501 and above", min: 501, max: 1000000 },
];

const retailPriceRanges = [
  { label: "All Retail Price", min: 0, max: 1000000 },
  { label: "$0 - $50", min: 0, max: 50 },
  { label: "$51 - $100", min: 51, max: 100 },
  { label: "$101 - $200", min: 101, max: 200 },
  { label: "$201 - $500", min: 201, max: 500 },
  { label: "$501 and above", min: 501, max: 1000000 },
];

const CatalogGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0); // Fixed camelCase
  const [selectedPrice, setSelectedPriceRange] = useState<string>(
    "All Wholesale Price",
  );
  const [selectedRetailPrice, setSelectedRetailPriceRange] =
    useState<string>("All Retail Price");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getWholesalePriceRange = useCallback((label: string) => {
    return (
      priceRanges.find((price) => price.label === label) || {
        min: 0,
        max: 1000000,
      }
    );
  }, []);

  const getRetailPriceRange = useCallback((label: string) => {
    return (
      retailPriceRanges.find((price) => price.label === label) || {
        min: 0,
        max: 1000000,
      }
    );
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const wholesaleRange = getWholesalePriceRange(selectedPrice);
      const retailRange = getRetailPriceRange(selectedRetailPrice);
      const categoryQuery =
        selectedCategory !== 0 ? `&category=${selectedCategory}` : "";
      const response = await fetch(
        `http://localhost:3016/api/productManagement/GetFilteredProducts?pageNumber=${pageNumber}&searchText=${searchText}${categoryQuery}&quantity=${selectedQuantity}&minWholesalePrice=${wholesaleRange.min}&maxWholesalePrice=${wholesaleRange.max}&minRetailPrice=${retailRange.min}&maxRetailPrice=${retailRange.max}`,
      );
      const data = await response.json();
      console.log("Fetched products:", data.product);
      setProducts(data.product || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Clear products on error
    } finally {
      setLoading(false);
    }
  }, [
    pageNumber,
    searchText,
    selectedCategory,
    selectedQuantity,
    selectedPrice,
    selectedRetailPrice,
    getWholesalePriceRange,
    getRetailPriceRange,
  ]);

  useEffect(() => {
    // Only fetch if searchText is empty or at least 3 characters
    if (searchText.length >= 3 || searchText.length === 0) {
      fetchProducts();
    }
  }, [
    fetchProducts,
    pageNumber,
    selectedCategory,
    selectedQuantity,
    selectedPrice,
    selectedRetailPrice,
    searchText,
  ]);

  const handleSearchChange = (newSearchText: string) => {
    setSearchText(newSearchText);
    setPageNumber(1); // Reset to first page on new search
  };

  const handleCategoryChange = (selectedId: number) => {
    setSelectedCategory(selectedId);
    setPageNumber(1); // Reset to first page on category change
  };

  const handleQuantityChange = (selectedId: number) => {
    setSelectedQuantity(selectedId);
    setPageNumber(1); // Reset to first page on quantity change
  };

  const handleWholesalePriceRangeChange = (selectedLabel: string) => {
    setSelectedPriceRange(selectedLabel);
    setPageNumber(1); // Reset to first page on price change
  };

  const handleRetailPriceRangeChange = (selectedLabel: string) => {
    setSelectedRetailPriceRange(selectedLabel);
    setPageNumber(1); // Reset to first page on price change
  };

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-4 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <SearchBar
          searchText={searchText}
          onSearchChange={handleSearchChange}
        />
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <CategorySelect
            categories={categories}
            selectedCategory={selectedCategory}
            onChange={handleCategoryChange}
          />
          <CategorySelect
            categories={quantities}
            selectedCategory={selectedQuantity}
            onChange={handleQuantityChange}
          />
          <PriceRangeSelect
            priceRanges={priceRanges}
            selectedPriceRange={selectedPrice}
            onChange={handleWholesalePriceRangeChange}
          />
          <PriceRangeSelect
            priceRanges={retailPriceRanges}
            selectedPriceRange={selectedRetailPrice}
            onChange={handleRetailPriceRangeChange}
          />
        </div>
      </div>

      {loading ? (
        <div className="py-4 text-center">Loading products...</div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.productID} {...product} />
          ))}
        </div>
      ) : (
        <div>No products found. Adjust your filters.</div>
      )}

      <div className="mt-4 flex justify-center">
        <Pagination
          pageNumber={pageNumber}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CatalogGrid;
