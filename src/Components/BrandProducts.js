import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext"
import { useProduct } from "../Context/ProductContext";
import upload from "./Upload.js"
import ProductItem from "./ProductItem.js"

export default function BrandProducts() {

  const {fetchBrandProducts , myProducts } = useProduct();

  const {currentUser} = useAuth();
  const {addProduct} = useProduct();

  const [data, setData] = useState({
    productName: "",
    productDesc: "",
    price: "",
    sizes: [],
    productImageURL : ""
  });

  const [isOpen, setIsOpen] = useState(false);
  const [productImage , setProductImage] = useState(null);
  const [productImageFileName , setProductImageFileName] = useState("");
  const [isAdding, setIsAdding] = useState(false); 

  const change = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setData((prevData) => {
        const sizes = checked
          ? [...prevData.sizes, value]
          : prevData.sizes.filter((size) => size !== value);
        return { ...prevData, sizes };
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleImageChange =(e) =>{
    e.preventDefault();
    const {files} = e.target;
    if(files[0].name.includes('.jpg') || files[0].name.includes(".png") || files[0].name.includes(".jpeg")){
      setProductImageFileName(files[0].name);
      setProductImage(files[0]); 
    }
    else{
      alert("The Image should pe jpg/png/jpeg");
    }
  }


  const handleAddProduct =async(e) => {
    e.preventDefault();
    setIsAdding(true); 
    try {
      const imgUrl = await upload(productImage);
      const input = 
      {
        "productName": data.productName ,
        "productDesc": data.productDesc ,
        "price": data.price,
        "productImageURL": imgUrl,
        "productOwner": currentUser._id,
        "productOwnerName": currentUser.name,
        "orders":currentUser.orders,
        "sizes": data.sizes,
      }
      await addProduct(input);
      setData({
        productName: "",
        productDesc: "",
        price: "",
        sizes: [],
        productImageURL : ""
      })
      setProductImage(null);
      setProductImageFileName("");
      fetchBrandProducts(currentUser._id)
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
      
    } catch (error) {
      console.log(error.message);
    }
    finally {
      setIsAdding(false); 
    }
  };

  return (
    <>
      <div
        className="max-w-[1200px] mx-auto sm:py-20 p-5 "
        style={{ marginTop: "70px" }}
      >
       {!isOpen && (
        <div className="flex flex-row mt-8 items-center space-x-4">
          <svg
            width="50"
            height="50"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsOpen(true)}
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="grey"
              strokeWidth="5"
            />
            <rect x="45" y="20" width="10" height="60" fill="grey" />
            <rect x="20" y="45" width="60" height="10" fill="grey" />
          </svg>
          <p className="text-slate-400 font-bold text-xl">
            Click to add a new Product to your store
          </p>
        </div>
      )}


        { isOpen===true && <div
          className="max-w-[800px] mx-auto rounded mt-8"
          style={{ border: "2px solid grey" }}
        >

            <svg
              onClick={()=>{setIsOpen(false)}} 
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="grey"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>

        <div className="mt-6 rounded-xl">
            <div className="p-10">
              <form onSubmit={handleAddProduct}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  <div>
                    <div className="mt-2.5">
                      <input
                        required = "true"
                        name="productName"
                        id="productName"
                        type="text"
                        placeholder="Enter Product Name"
                        value={data.productName}
                        onChange={change}
                        className="bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-2.5">
                      <input
                        required = "true"
                        name="productDesc"
                        id="productDesc"
                        type="text"
                        placeholder="Enter Product Description"
                        value={data.productDesc}
                        onChange={change}
                        className="bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-2.5">
                      <input
                        required = "true"
                        name="price"
                        id="price"
                        type="text"
                        placeholder="Enter Price"
                        value={data.price}
                        onChange={change}
                        className="bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <div className="mt-2.5">
                    <input
                        required
                        name="productImage"
                        id="productImage"
                        type="file"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => document.getElementById('productImage').click()}
                        className="bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                    >
                        {productImage?productImageFileName:"Upload Product Image"}
                    </button>
                    </div>


                  <div>
                    <div className="mt-2.5">
                      <div className="flex space-x-4">
                        {["S", "M", "L", "XL"].map((size) => (
                          <label
                            key={size}
                            className="flex items-center space-x-2"
                          >
                            <input
                              name="sizes"
                              id={`size${size}`}
                              type="checkbox"
                              value={size}
                              checked={data.sizes.includes(size)}
                              onChange={change}
                              className="bg-[#161616] text-pink-600 border-gray-700 focus:outline-none focus:border-pink-600"
                            />
                            <span className="text-gray-400">{size}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={isAdding} 
                      className="text-xl w-full p-4 mt-2 font-semibold text-white bg-primary-color rounded-md"
                    >
                       {isAdding ? "Adding Product..." : "Add Product"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>}
      </div>


      <div className="max-w-[1200px] mx-auto rounded mt-2 grid gap-2 p-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-4 ">
        {myProducts?.map(product => (
          <div key={product._id} className="rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-gray-800 p-2"  style={{ boxShadow: "0 0 20px 10px rgba(128, 128, 128, 0.1)" }}>
            <ProductItem  productId={product._id} productName={product.productName}  productDesc={product.productDesc} price = {product.price} productImageURL={product.productImageURL} productOwnerName={product.productOwnerName} productOwner={product.productOwner} sizes={product.sizes}/>
          </div>
        ))}
      </div>


    </>
  );
}
