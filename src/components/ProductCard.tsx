import React from "react";
import { useNavigate } from "react-router-dom";
import ENDPOINTS from "../config/apiConfig";

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

const ProductCard: React.FC<Product> = ({
  productID,
  // productCode,
  // manufacturerID,
  productName,
  description,
  // category,
  wholesalePrice,
  retailPrice,
  retailCurrency,
  wholeSaleCurrency,
  // shippingCost,
  quantity,
  // createdOn,
  // updatedOn,
  // isActive,
  productImage,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/productdetail/${productID}`);
  };

  // Corrected imageUrl assignment using config
  const imageUrl =
    productImage.length > 0
      ? ENDPOINTS.PRODUCT.IMAGE(productImage[0].productImageURL)
      : ENDPOINTS.IMAGES.FALLBACK;

  return (
    <div
      onClick={handleCardClick}
      className="product-card group relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
    >
      <img
        src={imageUrl}
        alt={productName}
        className="product-image h-78 w-full object-cover"
        style={{ height: "300px" }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{productName}</h3>
        <p className="mt-2 text-sm">{description}</p>
        <div className="mt-4">
          <span className="block text-lg font-bold">
            WholeSale Price: {wholesalePrice} {wholeSaleCurrency}
          </span>
          <span className="line-through">
            Retail Price: {retailPrice} {retailCurrency}
          </span>
        </div>
        <div className="mt-2">Quantity: {quantity}</div>
      </div>
    </div>
  );
};

export default ProductCard;