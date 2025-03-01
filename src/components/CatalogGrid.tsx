import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';


interface Product {
    productID: string;
    productCode: string;
    manufacturerID: string;
    productName: string;
    description: string;
    category: string;
    wholesalePrice: number;
    retailPrice: number;
    retailCurrency: string;
    wholeSaleCurrency: string;
    shippingCost: number;
    quantity: number;
    createdOn: string;
    updatedOn: string;
    isActive: boolean;
    imageUrl: string;
}

const categories = [
    "All Categories",
    "Furniture",
    "Fashion",
    "Home & Garden",
    "Computer & Office",
];

const priceRanges = [
    "All Price",
    "$0 - $50",
    "$51 - $100",
    "$101 - $200",
    "$201 - $500",
    "$501 and above",
];

const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Rating: High to Low",
];

const ProductCard: React.FC<Product> = ({ ...product }) => {

    const navigate = useNavigate();

    const handleCardClick = () => {

        navigate(`/productdetail/${product.productID}`);
    };

    return (
        <div onClick={handleCardClick} className="group relative overflow-hidden rounded-lg shadow-lg product-card cursor-pointer">
            <img src="/img/headphone.jpg" alt={product.productName} className="product-image w-full h-78 object-cover" style={{ height: '300px' }} />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-sm mt-2">{product.description}</p>
                <div className="mt-4">
                    <span className="block text-lg font-bold">{product.wholesalePrice.toFixed(2)} {product.wholeSaleCurrency}</span>
                    <span className="line-through">{product.retailPrice.toFixed(2)} {product.retailCurrency}</span>
                </div>
                <div className="mt-2">{product.quantity}</div>
            </div>
        </div>
    );
};

const CatalogGrid: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
    const [selectedPrice, setSelectedPrice] = useState<string>("All Price");
    const [selectedSort, setSelectedSort] = useState<string>("Price: Low to High");


    useEffect(() => {
        fetch('http://localhost:3016/api/productManagement')
            .then(response => response.json())

            .then(data => {
                console.log('Fetched products:', data.product);
                setProducts(data.product);
            })

            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const filteredProducts = products.filter(product => {


        if (selectedCategory !== "All Categories" && product.category !== selectedCategory) {
            return false;
        }

        const priceMap = {
            "All Price": [0, Infinity],
            "$0 - $50": [0, 50],
            "$51 - $100": [51, 100],
            "$101 - $200": [101, 200],
            "$201 - $500": [201, 500],
            "$501 and above": [501, Infinity],
        };
        const [minPrice, maxPrice] = priceMap[selectedPrice];
        if (product.retailPrice < minPrice || product.retailPrice > maxPrice) {
            return false;
        }
        return true;
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
        switch (selectedSort) {
            case "Price: Low to High":
                return a.retailPrice - b.retailPrice;
            case "Price: High to Low":
                return b.retailPrice - a.retailPrice;
            default:
                return 0;
        }
    });

    return (
        <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="mb-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <select
                        className="px-4 py-2 border rounded"
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <select
                        className="px-4 py-2 border rounded"
                        value={selectedPrice}
                        onChange={e => setSelectedPrice(e.target.value)}
                    >
                        {priceRanges.map(price => (
                            <option key={price} value={price}>{price}</option>
                        ))}
                    </select>
                    <select
                        className="px-4 py-2 border rounded"
                        value={selectedSort}
                        onChange={e => setSelectedSort(e.target.value)}
                    >
                        {sortOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>


            </div>
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {sortedProducts.map(product => (
                    <ProductCard key={product.productID} {...product} />
                ))}
            </div>
        </div>
    );
};

export default CatalogGrid;
