import React from "react";
import dress from "../Images/dress.jpg";

export default function ProductItem() {
  const sizes = ["S", "M", "L", "XL"];
  return (
    <>
      <div
        className="w-full m-4 p-4 h-full bg-transparent rounded-xl"
        style={{ boxShadow: " 0 0 20px 10px rgba(128, 128, 128, 0.1)" }}
      >
        <div
          align="center bg-transparent"
          style={{ border: "2px solid grey", borderRadius: "4px" }}
        >
          <img
            className="bg-transparent w-full "
            style={{ height: "400px" }}
            src={dress}
            alt=""
          />
        </div>
        <div className="bg-transparent text-center text-xl text-white font-bold">
          Product Name
        </div>
        <div className="bg-transparent text-center  text-white ">
          Product Description ..............
        </div>
        <div className="bg-transparent text-center text-xl text-white font-bold">
          {" "}
          ₹ 999 /-
        </div>
        <div className="flex bg-transparent justify-center items-center">
          {sizes.map((size) => (
            <div
              className="bg-transparent p-2 m-2 text-white"
              style={{ borderRadius: "50%", border: "1px solid white" }}
            >
              {size}
            </div>
          ))}
        </div>

        <svg
          className="h-6 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 18.5s-3.434-2.828-6.36-5.638C2.148 10.636 1 8.682 1 6.75 1 4.186 3.186 2 5.75 2c1.664 0 3.255.774 4.25 1.597C11.995 2.774 13.586 2 15.25 2 17.814 2 20 4.186 20 6.75c0 1.932-1.148 3.886-2.64 6.112C13.434 15.672 10 18.5 10 18.5z" />
        </svg>
        <svg className="h-6 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red">
          <path d="M10 18.5s-3.434-2.828-6.36-5.638C2.148 10.636 1 8.682 1 6.75 1 4.186 3.186 2 5.75 2c1.664 0 3.255.774 4.25 1.597C11.995 2.774 13.586 2 15.25 2 17.814 2 20 4.186 20 6.75c0 1.932-1.148 3.886-2.64 6.112C13.434 15.672 10 18.5 10 18.5z" />
        </svg>

        <button className="px-2 py-2 w-full rounded-xl mt-4 bg-gradient-to-br  from-purple-400 to-pink-600  text-white">
          Add to Cart
        </button>
        <button className="px-2 py-2 w-full rounded-xl mt-4 bg-gradient-to-br  from-purple-400 to-pink-600  text-white">
          Remove from Cart
        </button>
      </div>
    </>
  );
}
