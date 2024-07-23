import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../Context/AuthContext";

export default function Login() {

  const { login } = useAuth();

  const navigate = useNavigate();

  const [data, setData] = useState({email:"" , password:""})

  const change=(e)=>{
    e.preventDefault();
    const {name,value} = e.target;
    setData({...data ,[name]:value});
  }

  const handleLogin =async(e) =>{
    e.preventDefault();
    try {
      const { email, password } = data; 
      const response = await login(email , password);
      setData({email:"" , password:""})
      setTimeout(() => {
        navigate("/")
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
            Login
          </h2>
        </div>

        <div
          className="max-w-[800px] mx-auto rounded mt-8"
          style={{ border: "2px solid grey" }}
        >
          <div className="mt-6  rounded-xl">
            <div className="p-10">
              <form action="submit">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  <div>
                    <div className="mt-2.5 ">
                      <input
                        required = "true"
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Enter Your Email"
                        value={data.email}
                        onChange={change}
                        className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-2.5 ">
                      <input
                        required = "true"
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Enter Your Password"
                        value={data.password}
                        onChange={change}
                        className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <button className="text-xl w-full p-4 mt-2 font-semibold text-white bg-primary-color rounded-md " onClick={handleLogin}>
                      Login
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
