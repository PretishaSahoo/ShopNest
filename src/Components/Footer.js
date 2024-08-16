import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">ShopNest</h1>
            <p>Your ultimate shopping destination for the latest trends and exclusive deals. Join us and start your fashion journey today!</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Customer Service</h2>
            <ul>
              <li className="mb-2"><Link to="/" className="text-white hover:text-pink-500">Help Center</Link></li>
              <li className="mb-2"><Link to="/about" className="text-white hover:text-pink-500">About Us</Link></li>
              <li className="mb-2"><Link to="/Orders" className="text-white hover:text-pink-500">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <Link to="https://www.facebook.com" className="text-white hover:text-pink-500">Facebook</Link>
              <Link to="https://www.twitter.com" className="text-white hover:text-pink-500">Twitter</Link>
              <Link to="https://www.instagram.com" className="text-white hover:text-pink-500">Instagram</Link>
              <Link to="https://www.linkedin.com" className="text-white hover:text-pink-500">LinkedIn</Link>
              <Link to="/chatWithMaya" className="text-white hover:text-pink-500">Maya - AI Style Bot</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-12">
          <p className="mb-6 md:mb-0">&copy; {new Date().getFullYear()} ShopNest. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link to="https://pretisha-sahoo.vercel.app" className="text-white hover:text-pink-500">@Created by Pretisha Sahoo</Link>
            <Link to="https://www.linkedin.com/in/debopriya-lahiri-615a37266" className="text-white hover:text-pink-500">@Contributed by Debopriya Lahiri</Link>
            <Link to="/" className="text-white hover:text-pink-500">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
