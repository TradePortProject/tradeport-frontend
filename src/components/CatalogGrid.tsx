import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import CategorySelect from "./CategorySelect";
import PriceRangeSelect from "./PriceRangeSelect";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ENDPOINTS from "../config/apiConfig";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

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
  { id: 1, name: "Fashion" },
  { id: 2, name: "Furniture" },
  { id: 3, name: "Home & Garden" },
  { id: 4, name: "Health & Beauty" },
  { id: 5, name: "Computer & Office" },
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
  const [selectedQuantity, setselectedQuantity] = useState<number>(0);
  const [selectedPrice, setSelectedPriceRange] = useState<string>(
    "All Wholesale Price",
  );
  const [selectedRetailPrice, setSelectedRetailPriceRange] =
    useState<string>("All Retail Price");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (searchText.length >= 3 || searchText.length === 0) {
      fetchProducts(); // Call API only if the searchText condition is satisfied
    }
  }, [searchText]);

  useEffect(() => {
    fetchProducts();
  }, [
    pageNumber,
    selectedCategory,
    selectedQuantity,
    selectedPrice,
    selectedRetailPrice,
  ]);

  const fetchProducts = async () => {
    try {
      const wholesaleRange = getWholesalePriceRange(selectedPrice);
      const retailRange = getRetailPriceRange(selectedRetailPrice);
      const categoryQuery =
        selectedCategory !== 0 ? `&category=${selectedCategory}` : " ";
      
      const queryParams = `?pageNumber=${pageNumber}&searchText=${searchText}${categoryQuery}&quantity=${selectedQuantity}&minWholesalePrice=${wholesaleRange.min}&maxWholesalePrice=${wholesaleRange.max}&minRetailPrice=${retailRange.min}&maxRetailPrice=${retailRange.max}`;
      
      const response = await fetch(
        ENDPOINTS.PRODUCT.FILTERED(queryParams),
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Pass token as AuthBearer
          },
        }
      );
      const data = await response.json();
      console.log("Fetched products:", data.product);
      setProducts(data.product || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Clear products on error
    }
  };

  const getWholesalePriceRange = (label: string) => {
    return (
      priceRanges.find((price) => price.label === label) || {
        min: 0,
        max: 1000000,
      }
    );
  };

  const getRetailPriceRange = (label: string) => {
    return (
      retailPriceRanges.find((price) => price.label === label) || {
        min: 0,
        max: 1000000,
      }
    );
  };

  const handleSearchChange = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  const handleCategoryChange = (selectedId: number) => {
    setSelectedCategory(selectedId);
  };

  const handleQuantityChange = (selectedId: number) => {
    setselectedQuantity(selectedId);
  };

  const handleWholesalePriceRangeChange = (selectedLabel: string) => {
    setSelectedPriceRange(selectedLabel);
  };

  const handleRetailPriceRangeChange = (selectedLabel: string) => {
    setSelectedRetailPriceRange(selectedLabel);
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
            selectedPrice={selectedPrice}
            onChange={handleWholesalePriceRangeChange}
          />
          <PriceRangeSelect
            priceRanges={retailPriceRanges}
            selectedPrice={selectedRetailPrice}
            onChange={handleRetailPriceRangeChange}
          />
        </div>
      </div>
      {products.length > 0 ? (
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