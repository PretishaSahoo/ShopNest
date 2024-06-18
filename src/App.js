import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from './Components/Home';
import Products from './Components/Products';
import Cart from './Components/Cart';
import Orders from './Components/Orders';
import Wishlist from './Components/Wishlist';
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Rewards from './Components/Rewards';
import { AuthProvider } from './Context/AuthContext';
import { ProductProvider } from './Context/ProductContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <div className="App">
            <Navbar />
            <ToastContainer className="bg-transparent"  toastStyle={{ background: 'black', color: 'white' }} />
            <div className="w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Products" element={<Products />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/Orders" element={<Orders />} />
                <Route path="/Wishlist" element={<Wishlist />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Rewards" element={<Rewards />} />
              </Routes>
            </div>
          </div>
      </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
