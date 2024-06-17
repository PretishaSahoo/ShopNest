import React from "react";
import dress from "../Images/logo.png"

export default function Home() {
  return (
    <>
      <div
        className="max-w-[1200px] mx-auto sm:py-20 p-5"
        style={{ marginTop: "80px", marginBottom: "80px" }}
      >
        <div className="p-8" style={{ animation: "float 10s ease-in-out" }}>
          <p
            className="text-white text-center text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight"
          >
            Welcome to ShopNest!
          </p>
          <p
            className="bg-transparent text-purple-400  text-center text-2xl sm:text-2xl md:text-xl lg:text-5xl font-bold leading-normal mt-2"
          >
            Your Ultimate Fashion Destination!
          </p>
          <p
            className="bg-transparent text-white text-center text-xl leading-normal mt-2"
          >
            Begin your Fashion Journey now with ShopNest ........
          </p>
          <div className="flex justify-center items-center">
            <img className="p-6 bg-transparent" src={dress} alt="" />
          </div>

        </div>
      </div>
    </>
  );
}
