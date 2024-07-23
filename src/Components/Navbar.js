import React from "react";
import "./Styles.css";
import { Link } from "react-router-dom";
import user from "../Images/profile.webp";
import { useAuth } from "../Context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="text-gray-50 fixed top-0 left-0 right-0 w-full z-10 bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg mx-auto flex flex-col overflow-hidden px-4 py-2 lg:flex-row lg:items-center bg-transparent">
        <Link
          to="/"
          className="flex items-center whitespace-nowrap text-2xl bg-transparent"
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
          <ul className="mt-1 flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0 lg:space-x-12 bg-transparent">
            <li className={`lg:mr-12 bg-transparent ${isLoggedIn ? "" : "hidden-element"}`}>
              <Link
                className="rounded-xl bg-transparent p-2 text-gray-50 transition hover:bg-pink-400 focus:bg-pink-400 focus:outline-none focus:ring-offset-2"
                to="/Products"
              >
                Products
              </Link>
            </li>
            <li className={`lg:mr-12 bg-transparent ${isLoggedIn ? "" : "hidden-element"}`}>
              <Link
                className="rounded-xl bg-transparent p-2 text-gray-50 transition hover:bg-pink-400 focus:bg-pink-400 focus:outline-none focus:ring-offset-2"
                to="/About"
              >
                About
              </Link>
            </li>
            <li className={`lg:mr-12 bg-transparent ${isLoggedIn ? "" : "hidden-element"}`}>
              <Link
                className="rounded-xl bg-transparent p-2 text-gray-50 transition hover:bg-pink-400 focus:bg-pink-400 focus:outline-none focus:ring-offset-2"
                to="/ChatWithMaya"
              >
                Maya your AI Chat Assistant
              </Link>
            </li>
            <li className={`lg:mr-12 bg-transparent ${isLoggedIn ? "" : "hidden-element"}`}>
              <Link
                className="rounded-xl bg-transparent p-2 text-gray-50 transition hover:bg-pink-400 focus:bg-pink-400 focus:outline-none focus:ring-offset-2"
                to="/Orders"
              >
                Orders
              </Link>
            </li>
            <li className={`lg:mr-12 bg-transparent ${isLoggedIn ? "" : "hidden-element"}`}>
              <Link
                className="rounded-xl bg-transparent p-2 text-gray-50 transition hover:bg-pink-400 focus:bg-pink-400 focus:outline-none focus:ring-offset-2"
                to="/Cart"
              >
                Cart
              </Link>
            </li>
            <li className={`lg:mr-12 bg-transparent ${isLoggedIn ? "" : "hidden-element"}`}>
              <Link
                className="rounded-xl bg-transparent p-2 text-gray-50 transition hover:bg-pink-400 focus:bg-pink-400 focus:outline-none focus:ring-offset-2"
                to="/Wishlist"
              >
                Wishlist
              </Link>
            </li>
            <div className="flex bg-transparent">
              {isLoggedIn === false && (
                <>
                  <li className="lg:mr-2 bg-transparent mt-2">
                    <Link
                      className="px-2 py-2 w-full rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 text-white"
                      to="/Signup"
                    >
                      Signup
                    </Link>
                  </li>
                  <li className="lg:mr-2 mt-2 bg-transparent">
                    <Link
                      className="px-2 py-2 w-full rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 text-white"
                      to="/Login"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn === true && (
                <>
                  <li className="lg:mr-2 bg-transparent">
                    <button
                      className="px-2 py-2 w-full rounded-xl mt-2 bg-gradient-to-br from-purple-400 to-pink-600 text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                  <li className="lg:mr-2 bg-transparent mt-2">
                    <Link className="rounded-xl bg-transparent" to="/Profile">
                      <img className="bg-transparent w-10" src={user} alt="user" />
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
          <hr className="mt-4 w-full lg:hidden" />
        </nav>
      </header>
      <ToastContainer
        className="bg-transparent"
        toastStyle={{ background: 'black', color: 'white' }}
      />
    </>
  );
}
