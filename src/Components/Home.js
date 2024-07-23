import React from "react";
import banner from "../Images/Home.png";
import pic1 from "../Images/1.png";
import pic2 from "../Images/2.png";
import pic3 from "../Images/3.png";
import pic4 from "../Images/4.png";
import pic5 from "../Images/5.png";
import pic6 from "../Images/6.png";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import Contact from "./Contact.js"

export default function Home() {
  return (
    <>
      <div
        className="max-w-full mx-auto relative bg-transparent"
        style={{ paddingTop: "85px", paddingBottom: "80px" }}
      >
        <img className="w-full h-85 mx-auto " src={banner} alt="Banner" />
        <div className="mx-auto text-center">
          <Link to="/Products" className="bg-primary-color text-white font-bold py-2 px-2 rounded-lg hover:bg-pink-600 transition duration-200 ">
            Start Shopping Now!
          </Link>
        </div>
        <div className="bg-transparent w-full p-8 mt-10 font-bold text-sm lg:text-xl md:text-l sm:text-sm">
          <TypeAnimation
            sequence={[
              "Welcome to ShopNest!",
              5000,
              "Pick your style now with ShopNest!",
              2000,
              "Start your fashion Journey Today",
              2000,
            ]}
            wrapper="span"
            speed={50}
            style={{
              fontSize: "2.5rem",
              display: "inline-block",
              color: "pink",
              fontFamily: "'Merriweather', serif",
            }}
            repeat={Infinity}
            className = "leading-[2rem] "
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 p-8">
          <div className="h-80 md:h-64 lg:h-96 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <img src={pic2} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="h-72 md:h-64 lg:h-96 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <img src={pic4} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="h-80 md:h-72 lg:h-64 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <img src={pic5} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="h-64 md:h-70 lg:h-86 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <img src={pic3} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex justify-left">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-10 p-8 mx-auto justify-items-center">
            <div className="h-64 md:h-70 lg:h-86 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
              <img src={pic6} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="h-64 md:h-70 lg:h-86 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
              <img src={pic1} alt="" className="w-full h-full object-cover" />
            </div>
            
          </div>
        </div>

        <div className="text-center mx-auto bg-transparent w-full p-6 mt-10 font-bold text-yellow-100 opacity-40 text-4xl sm:text-5xl md:text-6xl lg:text-8xl" style={{ animation: "float 10s ease-in-out infinite" }}>
          Fashion at your fingertips ...
        </div>
        <div className="bg-transparent text-center mx-auto w-full p-8 font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Only at ShopNest
        </div>
        <Contact/>
      </div>
    </>
  );
}
