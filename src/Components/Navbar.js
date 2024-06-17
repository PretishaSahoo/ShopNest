import React from "react";
import "./Styles.css";
import { Link } from "react-router-dom";
import user from "../Images/user.png";
import { useAuth } from "../Context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"

export default function Navbar() {

  const navigate= useNavigate();

  const {isLoggedIn , logout} = useAuth();

  const handleLogout = ()=>{
    logout() ;
    //toast.success("Logged Out Sccessfully")
    navigate("/");
  }

  return (
    <>
    
      <header className="text-gray-50 fixed top-0 left-0 right-0 w-full z-10 bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg  mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center bg-transparent ">
        <Link
          to="/"
          className="flex items-center whitespace-nowrap text-2xl  bg-transparent  "
        >
          <p className="primary-color p-2 m-2 bg-transparent font-bold">
            ShopNest
          </p>
        </Link>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-5 cursor-pointer lg:hidden"
          htmlFor="navbar-open"
        >
          <svg
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className="p-2 peer-checked:pt-8 peer-checked:max-h-full flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row bg-transparent"
        >
          <ul className=" mt-1 flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0 lg:space-x-12 bg-transparent">
            <li className="lg:mr-12 bg-transparent">
              <Link
                className="rounded-xl bg-transparent p-2 text-gray-50 transition hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-offset-2"
                to="/Products"
              >
                Products
              </Link>
            </li>
            <li className="lg:mr-12 bg-transparent">
              <Link
                className="rounded-xl bg-transparent p-2 text-gray-50 transition hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-offset-2"
                to="/"
              >
                Contests
              </Link>
            </li>
            <li className="lg:mr-12 bg-transparent">
              <Link
                className="rounded-xl bg-transparent p-2 text-gray-50 transition hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-offset-2"
                to="/Rewards"
              >
                Rewards
              </Link>
            </li>
           
            <li className="lg:mr-12 bg-transparent">
              <Link
                className="rounded-xl bg-transparent p-2 text-gray-50 transition hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-offset-2"
                to="/Orders"
              >
                Orders
              </Link>
            </li>
            
            
            <li className="lg:mr-12 bg-transparent ">
              <Link
                className="rounded-xl bg-transparent p-2  focus:outline-none "
                to="/Cart"
              >
                <svg
                  className="bg-transparent"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  width="24px"
                  height="24px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7 16h14l-1.25-7.54L17.25 6H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C5.08 16.37 5 16.68 5 17c0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25L7 16zm-2.23-4l.3-.55L9.21 8H17l.75 4H4.77z" />
                </svg>
              </Link>
            </li>
            <li className="lg:mr-12 bg-transparent ">
              <Link
                className="rounded-xl bg-transparent p-2 text-gray-50  "
                to="/Wishlist"
              >
                <svg
                  className="bg-transparent "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  width="24px"
                  height="24px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </Link>
            </li>
            <div className=" flex bg-transparent">
             {isLoggedIn===false && <><li className="lg:mr-2 bg-transparent mt-6">
                <Link
                  className="px-2 py-2 w-full rounded-xl bg-gradient-to-br from-purple-400 to-pink-600  text-white"
                  to="/Signup"
                >
                  Signup
                </Link>
              </li>
              <li className="lg:mr-2 mt-6 bg-transparent">
                <Link
                  className="px-2 py-2  w-full rounded-xl bg-gradient-to-br from-purple-400 to-pink-600  text-white"
                  to="/Login"
                >
                  Login
                </Link>
              </li></> }
              {isLoggedIn===true && <><li className="lg:mr-2 bg-transparent">
                <button className="px-2 py-2 w-full rounded-xl mt-4 bg-gradient-to-br  from-purple-400 to-pink-600  text-white" 
                onClick={handleLogout}>
                  Logout
                </button>
              </li>
              <li className="lg:mr-2 bg-transparent ">
                <Link
                  className="rounded-xl bg-transparent p-2 "
                  to="/Profile"
                >
                  <img className="bg-transparent" src={user} alt="user" />
                </Link>
              </li></>}
            </div>
          </ul>
          <hr className="mt-4 w-full lg:hidden" />
        </nav>
      </header>
      <ToastContainer className="bg-transparent"  toastStyle={{ background: 'black', color: 'white' }} />
    </>
  );
}
