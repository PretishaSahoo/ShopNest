import React from 'react';

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen mx-auto text-center" style={{marginTop:"100px" , marginBottom:"50px"}}>
      <div className="container mx-auto py-12 px-4 bg-gray-800" style={{ boxShadow: "0 0 20px 10px rgba(128, 128, 128, 0.1)" }}>
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h1 className="text-4xl font-bold text-center mb-4 primary-color">Welcome to ShopNest</h1>
            <p className="text-lg text-gray-400 text-center">
            ShopNest leverages advanced technology and innovative engagement strategies to create a unique and appealing experience for both Users and Brands .
            </p>
          </section>

          <section className="flex flex-col md:flex-row items-center md:space-x-12">
            <div className="md:w-full bg-gray-800">
              <h2 className="text-3xl font-bold mb-4 primary-color">Why ShopNest</h2>
              <p className="text-lg text-gray-400">
              Our solution leverages advanced technology and innovative engagement strategies to create a unique and appealing experience for users .
              </p>
            </div>
          </section>

          <section className="mt-12 bg-gray-800">
            <h2 className="text-3xl font-bold mb-4 primary-color">Our Features</h2>
            <ul className="list-disc list-inside text-lg text-gray-400">
            <li>AI-Powered Style Bot - Maya</li>
            <li>User authentication for both brands and users</li>
            <li>Seamless product management for brands, with notifications sent to both users and brands whenever an order is placed</li>
            <li>Wishlist functionality</li>
            <li>Efficient cart management</li>
            <li>Profile editing options</li>

            </ul>
          </section>

          <section className="mt-12 bg-gray-800">
            <h2 className="text-3xl font-bold mb-4 primary-color">Join Us</h2>
            <p className="text-lg text-gray-400">
            Ready to elevate your fashion experience? Discover the possibilities with ShopNest's AI Style Bot. Connect with us today and embrace the future of personalized fashion recommendations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
