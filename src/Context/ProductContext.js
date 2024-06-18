import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [Products, setProducts] = useState([]);

    const fetchProducts = async() =>{
        try {
            const response = await axios.get("http://localhost:5000/api/product/fetchProductsforAll");
            setProducts(response.data.products);
        } catch (error) {
            console.log(error.message);
        }
    }



const ProductContextValue = {
    fetchProducts ,
    Products , 
    };

    return (
    <ProductContext.Provider value={ProductContextValue}>
        {children}
    </ProductContext.Provider>
    );
}