import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { useProduct } from '../Context/ProductContext';
import { useAuth } from '../Context/AuthContext';

export default function Cart() {
  const { cart, addOrder} = useProduct();
  const { currentUser, fetchUser } = useAuth();
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);
      setTotal(totalPrice);
    };

    calculateTotal();
  }, [cart]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const filteredCart = cart.filter((product) => {
    const matchesSearchTerm =
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productOwnerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      product.price >= minPrice && product.price <= maxPrice;
    return matchesSearchTerm && matchesPrice;
  });

  const Buy = async () => {
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }
    if(total===0){
      alert("Nothing to buy!");
      return ;
    }
    try {
      const totalCost = cart.reduce((sum, product) => sum + product.price, 0);
      const orderBody = {
        products: cart.map(product => ({
          productId: product._id,
          size: product.size ,
        })),
        totalCost,
        deliveryAddress:currentUser.address,
        deliveryDate: Date.now(),
        userName:currentUser.name, 
        userNumber:currentUser.phone
      };
      console.log(orderBody)
      await addOrder(currentUser._id, orderBody);
      const id = currentUser.email;
      await fetchUser(id);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <>
      <div className="p-8" style={{ paddingTop: "150px" }}>
        <form className="max-w-[1200px] mx-auto p-12 rounded-xl w-70 bg-gray-800" action="submit" style={{ boxShadow: "0 0 20px 10px rgba(128, 128, 128, 0.1)" }}>
          <p className="text-white text-center font-bold text-xl">Cart Balance: <span className="bg-transparent">₹ {total}/-</span></p>
          <button
            type="button"
            className="px-2 py-4 w-full rounded-xl mt-4 bg-gradient-to-br from-purple-400 to-pink-600 text-white"
            onClick={Buy}
          >
            Buy Now
          </button>
        </form>
      </div>

      <div className="p-4 mb-8 max-w-[1200px] mx-auto rounded-lg ">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 rounded p-2">
          <div className="flex items-center w-full md:w-3/5 bg-gray-900  rounded p-2 mb-4 md:mb-0" style={{ boxShadow: "0 0 20px 10px rgba(128, 128, 128, 0.1)" }}>
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
              placeholder="Search items..."
              className="bg-transparent border-none text-white w-full focus:outline-none"
            />
          </div>
          <div className="flex space-x-4 w-full md:w-auto" >
            <input
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
              placeholder="Min price"
              className="bg-transparent border border-gray-500 rounded p-2 text-white w-full md:w-auto"
              style={{ boxShadow: "0 0 20px 10px rgba(128, 128, 128, 0.1)" }}
            />
            <input
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              placeholder="Max price"
              className="bg-transparent border border-gray-500 rounded p-2 text-white w-full md:w-auto"
              style={{ boxShadow: "0 0 20px 10px rgba(128, 128, 128, 0.1)" }}
            />
          </div>
        </div>

        <h3 className="text-white font-bold text-center text-2xl mb-4">Your Cart Items:</h3>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {filteredCart.map(product => (
            <div key={product._id} className="rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-gray-800 p-2" style={{ boxShadow: "0 0 20px 10px rgba(128, 128, 128, 0.1)" }}>
              <ProductItem
                productId={product._id}
                productName={product.productName}
                productDesc={product.productDesc.slice(7)}
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
