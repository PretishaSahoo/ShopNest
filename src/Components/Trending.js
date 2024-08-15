
import React, { useState } from "react";
import ProductItem from "./ProductItem";
import { useProduct } from "../Context/ProductContext";

export default function Trending() {
  const { fetchTrendingProducts, TrendingProducts = [] } = useProduct();
  const [searchTerm, setSearchTerm] = useState("Trending Fashion");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getTrends = async () => {
    await fetchTrendingProducts(searchTerm);
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto rounded mt-0 p-4">
        
        <div
          className="flex flex-col md:flex-row justify-between items-center mb-8 bg-transparent p-4 rounded-lg"
          style={{ marginTop: "100px" }}
        >
          <div
            className="flex items-center w-full md:w-full bg-gray-900 rounded p-2 mb-4 md:mb-0"
            style={{ boxShadow: "0 0 20px 10px rgba(128, 128, 128, 0.1)" }}
          >
            <svg
              className="w-6 h-6 text-gray-400 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 14a7 7 0 01-7-7 7 7 0 017-7 7 7 0 017 7 7 7 0 01-7 7zm9.07-2.93a1 1 0 00-1.414 0l-2.829 2.828a1 1 0 001.414 1.414l2.828-2.828a1 1 0 000-1.414z"
              />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="bg-transparent border-none text-white w-full focus:outline-none"
            />
            <button
              className="text-sm  p-2 mt-2 font-semibold text-white bg-primary-color rounded-md "
              onClick={getTrends}
            >
              See what's Trending in social media...
            </button>
          </div>
        </div>
        <div
          className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-4"
          style={{ marginTop: "20px" }}
        >
          {TrendingProducts?.map((product) => (
            <div
              key={product._id}
              className="rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-gray-800 p-2"
              style={{ boxShadow: "0 0 20px 10px rgba(128, 128, 128, 0.1)" }}
            >
              <ProductItem
                productId={product._id}
                productName={product.productName}
                productDesc={product.productDesc}
                price={product.price}
                productImageURL={product.productImageURL}
                productOwnerName={product.productOwnerName}
                sizes={product.sizes}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

