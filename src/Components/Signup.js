import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {

  const navigate = useNavigate() ;

  const [data, setData] = useState({name :"" , email :"" , phone: "" , password:"", address:"" , role:"User"});

  const change = (e) =>{
    e.preventDefault();
    const {name,value } = e.target;
    setData({...data ,[name]:value});
  }
  const toggleRole = () => {
    setData({ ...data, role: data.role === "User" ? "Brand" : "User" });
  };

  const handleSignup = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/user/signup" , data);
      console.log(response.data);
      setData({name :"" , email :"" , phone: "" , password:"", address:"" , role:"User"})
      toast.success("Signup Succesfull!");
      toast.info("Please Login once to get started!")
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    } catch (error) {
      console.log(error.message)
      toast.error("Oops an error occured! Please check your credentials");
    }
  }

  

  return (

    <>
      <div
        className="max-w-[1200px] mx-auto sm:py-20 p-5"
        style={{ marginTop: "80px" }}
      >
        <ToastContainer className="bg-transparent"  toastStyle={{ background: 'black', color: 'white' }} />
        <div className="text-center">
          <h2 className="text-4xl font-bold leading-tight primary-color">
            Signup and get Started!
          </h2>
        </div>

        <div
          className="max-w-[800px] mx-auto rounded mt-8"
          style={{ border: "2px solid grey" }}
        >
          <div className="mt-6  rounded-xl">
            <div className="p-10">
              <form action="submit" onSubmit={handleSignup}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  <div>
                    <div className="mt-2.5 ">
                      <input
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Enter Your Name"
                        className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                        onChange={change}
                        value={data.name}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-2.5 ">
                      <input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={change}
                        value={data.email}
                        className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-2.5 ">
                      <input
                        name="phone"
                        id="phone"
                        type="text"
                        placeholder="Enter Your Phone Number"
                        onChange={change}
                        value={data.phone}
                        className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-2.5 ">
                      <input
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Enter Your Password"
                        onChange={change}
                        value={data.password}
                        className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="mt-2.5">
                      <textarea
                        name="address"
                        id="address"
                        placeholder="Type your address here ..."
                        onChange={change}
                        value={data.address}
                        className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <label className="inline-flex items-center cursor-pointer">
                    <span className="ms-3 mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      User
                    </span>
                    <input type="checkbox" value="User" onChange={toggleRole} className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-400"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Brand
                    </span>
                  </label>

                  <div className="sm:col-span-2">
                    <button className="text-xl w-full p-4 mt-2 font-semibold text-white bg-primary-color rounded-md " >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
