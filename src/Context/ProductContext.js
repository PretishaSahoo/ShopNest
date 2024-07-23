import React, { createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [Products, setProducts] = useState([]);
    const [myProducts, setMyProducts] = useState([]);
    const [cart , setCart] = useState([]);
    const [wishlist,setWishlist] = useState([]);
    const [orders , setOrders] = useState ([]);
    const [receivedOrders, setReceivedOrders] = useState([]);
    const {currentUser} = useAuth();

    const baseURL = process.env.REACT_APP_MODE === "production" ? "https://shop-nest-b.vercel.app" : "http://localhost:5000"

    useEffect(() => {
        if (currentUser) {
          fetchWishlist(currentUser._id);
          fetchCart(currentUser._id);
          fetchOrders(currentUser._id);
        }
        if(currentUser && currentUser.role==='Brand'){
            const id = currentUser._id;
            fetchReceivedOrders(id);
            fetchBrandProducts(id);
        }
      }, [currentUser]);

    const fetchProducts = async() =>{
        try {
            const response = await axios.get(`${baseURL}/api/product/fetchProductsforAll`);
            setProducts(response.data.products);
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchBrandProducts = async(id) =>{
        try {
            const response = await axios.get(`${baseURL}/api/product/fetchProductsBrand/${id}`);
            setMyProducts(response.data.products);
        } catch (error) {
            console.log(error.message);
        }
    }

    const addProduct = async(body) =>{
        try {
            const response = await axios.post(`${baseURL}/api/product/addProduct` , body);
            const newProduct = response.doc
            setProducts({...Products ,newProduct });
            
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteProduct = async (myid) => {
        try {
            await axios.post(`${baseURL}/api/product/deleteProduct/${myid}`);
        } catch (error) {
            console.log(error.messsage);
        }
    }

    const editProduct = async (productId,input) => {
        try {
            await axios.post(`${baseURL}/api/product/editProduct/${productId}` , input);
            console.log("edited successfully")
        } catch (error) {
            console.log(error.messsage);
        }
    }

    const addToCart = async(id , body)=>{
        try {
            const response = await axios.post(`${baseURL}/api/product/addToCart/${id}` , body); 
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    const removeFromCart = async(id , productId)=>{
        try {
            const input = {productId:productId};
            const response = await axios.post(`${baseURL}/api/product/removeFromCart/${id}` , input); 
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    const fetchCart = async(userid)=>{
        try {
            const response = await axios.get(`${baseURL}/api/product/fetchCart/${userid}` );
            setCart(response.data.cart) 
        } catch (error) {
            console.log(error);
        }
    }

    const addToWishlist = async(id , productId)=>{
        const input = {productId:productId};
        try {
            const response = await axios.post(`${baseURL}/api/product/addToWishlist/${id}` , input); 
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const removeFromWishlist = async(id , productId) =>{
        const input = {productId:productId};
        try {
            const response = await axios.post(`${baseURL}/api/product/removeFromWishlist/${id}` , input); 
            console.log(response.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    const fetchWishlist = async(userid) =>{
        try {
            const response = await axios.get(`${baseURL}/api/product/fetchWishlist/${userid}` );
            setWishlist(response.data.wishlist) 
        } catch (error) {
            console.log(error);
        }
    }

    const addOrder =async(id , body)=>{
        try {
            const response = await axios.post(`${baseURL}/api/product/addToOrders/${id}` , body); 
            console.log(response.data);  
        } catch (error) {
            console.log(error);
        }
    }

    const fetchOrders = async (id) =>{
        try {
            const response = await axios.get(`${baseURL}/api/product/fetchOrders/${id}` );
            setOrders(response.data.orders)   
        } catch (error) {
            console.log(error);
        }
    }

    const fetchReceivedOrders = async (userid) => {
        try {
            const response = await axios.get(`${baseURL}/api/product/fetchReceivedOrders/${userid}`);
            setReceivedOrders(response.data); 
        } catch (error) {
            console.log(error.message);
        }
    }



const ProductContextValue = {
    fetchProducts ,
    Products , 
    addProduct,
    fetchBrandProducts,
    myProducts,
    setMyProducts,
    deleteProduct,
    editProduct,
    cart,
    wishlist,
    orders,
    addToCart,
    removeFromCart,
    fetchCart,
    addToWishlist,
    removeFromWishlist,
    fetchWishlist,
    addOrder,
    fetchOrders,
    fetchReceivedOrders,
    receivedOrders
    };

    return (
    <ProductContext.Provider value={ProductContextValue}>
        {children}
    </ProductContext.Provider>
    );
}