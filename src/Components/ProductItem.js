import React , {useState,useEffect} from "react";
import { useAuth } from "../Context/AuthContext";
import { useProduct } from "../Context/ProductContext";
import upload from "./Upload.js"
import deleteFile from "./delete.js"

export default function ProductItem({ productId , productName , productDesc , price ,productImageURL, productOwnerName ,sizes,productOwner }) {

  const {deleteProduct,editProduct,addToWishlist, removeFromWishlist , addToCart , removeFromCart} = useProduct() ;

  const {currentUser,fetchUser} = useAuth() ;

  const [isWishlisted, setIsWishlisted] = useState(false);

  const [saving , setSaving] = useState(false);

  const addInWishList = async() => {
    const id = currentUser._id  ;
    const body = productId ;
    await addToWishlist(id ,body);
    const email = currentUser.email ;
    await fetchUser(email);
  }

  const removeInWishList = async() => {
    const id = currentUser._id  ;
    const body = productId ;
    await removeFromWishlist(id ,body);
    const email = currentUser.email ;
    await fetchUser(email);
  }

  const [selectedSize, setSelectedSize] = useState(null);
  const [isAddedToCart , setIsAddedToCart] = useState(false);

  const addInCart= async() => {
    if(selectedSize===null){
      alert("Select size please!");
      return;
    }
    const id = currentUser._id  ;
    const body = {productId : productId , size:selectedSize };
    await addToCart(id ,body);
    const email = currentUser.email ;
    await fetchUser(email);
  }

  const removeInCart = async() => {
    const id = currentUser._id  ;
    const body = productId ;
    await removeFromCart(id ,body);
    const email = currentUser.email ;
    await fetchUser(email);
  }

  useEffect(() => {
    if (currentUser && currentUser.wishlist ) {
      setIsWishlisted(currentUser.wishlist.includes(productId));
    }
  }, [currentUser, productId,currentUser.wishlist]);

  useEffect(() => {
    if (currentUser && currentUser.cart ) {
      setIsAddedToCart(currentUser.cart.some(item => item.productId.toString() === productId));
    }
  }, [currentUser, productId,currentUser.cart]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [data, setData] = useState({
    productName: productName,
    productDesc: productDesc,
    price: price,
    sizes: sizes,
    productImageURL : productImageURL
  });

  const [productImage , setProductImage] = useState(null);
  const [productImageFileName , setProductImageFileName] = useState(productImageURL);

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

  const openImg = (url)=>{
    window.open(url)
  }


  const  handleEdit =async(e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imgUrl = productImageURL

      if(productImage){
        imgUrl = await upload(productImage);
        await deleteFile(productImageURL)
      }

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
      await editProduct(productId, input);
      setData({
        productName: productName,
        productDesc: productDesc,
        price: price,
        sizes: sizes,
        productImageURL : productImageURL
      })
      setProductImage(null);
      setProductImageFileName(productImageURL);

      setTimeout(() => {
        setIsEditOpen(false);
      }, 2000);
      
    } catch (error) {
      console.log(error.message);
    }
    finally{
      setSaving(false);
    }
  };


  const handleDelete = async()=>{
    try {
      await deleteFile(productImageURL);
      deleteProduct(productId);
    } catch (error) {
      console.log(error.message);
    }
  }

 
  return (
    <>

     {isEditOpen===true && <div
          className="max-w-[800px] mx-auto rounded h-full"
          style={{ border: "2px solid grey" }}
        >

            <svg
              onClick={()=>{setIsEditOpen(false)}} 
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
              <form >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  <div>
                    <div className="mt-2.5">
                      <input
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
                        name="productDesc"
                        id="productDesc"
                        type="text"
                        placeholder="Enter Product Description"
                        value={data.productDesc.slice(0,25)}
                        onChange={change}
                        className="bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-2.5">
                      <input
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
                        {productImage?productImageFileName:"Image"}
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
                      onClick={handleEdit}
                      disabled={saving}
                      className="text-xl w-full p-4 mt-2 font-semibold text-white bg-primary-color rounded-md"
                    >
                      {saving?"Saving.." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>}



      {isEditOpen===false && <div
        className="w-full m-2 p-2 h-full bg-transparent rounded-xl"
      >
        <div
          align="center bg-transparent"
        >

          <img
            className="bg-transparent w-full "
            style={{ height: "250px" }}
            src={productImageURL}
            alt=""
            onClick={()=>openImg(productImageURL)}
          />
        </div>

        <div className="bg-transparent text-center text-sm text-slate-400 font-bold">
           ProductId : {productId}
        </div>

        { (currentUser._id === productOwner) && <div className="flex justify-end space-x-4">
        <svg onClick={()=>setIsEditOpen(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 21h3.75l11.11-11.11-3.75-3.75L3 17.25V21zM21.41 6.34c.39-.39.39-1.02 0-1.41L19.07 2.59c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
        {/* <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleDelete}
        >
          <path
            d="M3 6h18v2H3V6zm2 2h14v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8zm3 0v10h2V8H8zm4 0v10h2V8h-2zm4 0v10h2V8h-2zM10 4h4v2h-4V4z"
            fill="white"
          />
        </svg> */}
      </div>}

        <div className="bg-transparent text-center text-sm text-white font-bold">
           {productName}
        </div>
        <div className="bg-transparent text-center  text-slate-500 ">
          {productDesc}
        </div>
        <div className="bg-transparent text-center  text-pink-200 ">
          {productOwnerName}
        </div>
        <div className="bg-transparent text-center text-sm text-yellow-200 font-bold">
          {" "}
          ₹ {price } /-
        </div>
        <div className="flex bg-transparent justify-center items-center">
        {sizes.map((size) => (
          <div
            key={size}
            className={`bg-transparent p-1 m-1  rounded-full border text-xs cursor-pointer ${
              selectedSize === size || (isAddedToCart && currentUser.cart.some(item => item.productId === productId && item.size === size))
                ? 'text-pink-600 border-pink-600'
                : 'text-white border-white'
            }`}
            onClick={() => {console.log("changed") ;setSelectedSize(size)}}
          >
            {size}
          </div>
        ))}
        </div>

        {isWishlisted===false && <svg
          className="h-6 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={()=>{
            addInWishList();
          }}
        >
          <path d="M10 18.5s-3.434-2.828-6.36-5.638C2.148 10.636 1 8.682 1 6.75 1 4.186 3.186 2 5.75 2c1.664 0 3.255.774 4.25 1.597C11.995 2.774 13.586 2 15.25 2 17.814 2 20 4.186 20 6.75c0 1.932-1.148 3.886-2.64 6.112C13.434 15.672 10 18.5 10 18.5z" />
        </svg>}
        {isWishlisted===true && <svg className="h-6 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red"
          onClick={()=>{
            removeInWishList();
          }}
        >
          <path d="M10 18.5s-3.434-2.828-6.36-5.638C2.148 10.636 1 8.682 1 6.75 1 4.186 3.186 2 5.75 2c1.664 0 3.255.774 4.25 1.597C11.995 2.774 13.586 2 15.25 2 17.814 2 20 4.186 20 6.75c0 1.932-1.148 3.886-2.64 6.112C13.434 15.672 10 18.5 10 18.5z" />
        </svg>}

        {isAddedToCart===false && <button className="px-2 py-2 w-full rounded-xl mt-4 bg-gradient-to-br  from-pink-500 to-pink-600 text-white"
           onClick={()=>{
            addInCart();
          }}
        >
          Add to Cart
        </button>}
        {isAddedToCart===true && <button className="px-2 py-2 w-full rounded-xl mt-4 bg-gradient-to-br   from-pink-500 to-pink-600 text-white" 
          onClick={()=>{
            removeInCart();
          }}
        >
          Remove from Cart
        </button>}
      </div>}

    </>
  );
}
