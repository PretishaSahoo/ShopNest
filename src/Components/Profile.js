import React, { useState } from "react";
import user from "../Images/user.png";
import { useAuth } from "../Context/AuthContext";

export default function Profile() {

  const {currentUser ,edit} = useAuth() ;
  const [isOpen, setIsOpen] = useState(false);
  const [data, setdata] = useState({name:"" ,phone:"" ,currPassword:"" ,password:"" , address:""})

  const change = (e)=>{
    e.preventDefault();
    const {name,value} = e.target
    setdata({...data , [name] :value})
  }

  const handleEdit = async(e)=>{
    e.preventDefault();
    const editedData = {};

    if (data.name !== "") {
      editedData.name = data.name;
    }
    if (data.phone !== "") {
      editedData.phone = data.phone;
    }
    if (data.currPassword !== "") {
      editedData.currPassword = data.currPassword;
    }
    if (data.password !== "") {
      editedData.password = data.password;
    }
    if (data.address !== "") {
      editedData.address = data.address;
    }
    try {
      await edit(editedData);
      console.log("Edited")
      setIsOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {!isOpen ? <div
        className="max-w-[1200px] mx-auto sm:py-20 p-5"
        style={{ marginTop: "70px" }}>
        <div className="text-center ">
          <div
            className="max-w-[800px] mx-auto rounded mt-8 "
            style={{ border: "2px solid grey" }}
          >
            <div className="mt-6  rounded-xl mb-8">
              <div className="p-10">
                <div>
                  <div className="sm:col-span-2">
                    <div className="mt-2.5 mb-3.5">
                      <div className="bg-transparent">
                        <div className="bg-transparent flex">
                        <img
                          className="bg-transparent mx-auto w-20 "
                          align="center"
                          src={user}
                          alt="user"
                        />
                        <svg onClick={()=>{setIsOpen(true)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                          <path d="M0 0h24v24H0z" fill="none"/>
                          <path d="M3 21h3.75l11.11-11.11-3.75-3.75L3 17.25V21zM21.41 6.34c.39-.39.39-1.02 0-1.41L19.07 2.59c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                        </div>
                      </div>
                      <p className="text-xl font-bold leading-tight primary-color">
                      {currentUser ? currentUser.name : "Loading..."}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                    <div>
                      <div className="mt-2.5 ">
                        <p className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600">
                        {currentUser ? currentUser.name : "Loading..."}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="mt-2.5 ">
                        <p className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600">
                        {currentUser ? currentUser.phone : "Loading..."}
                        </p>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <div className="mt-2.5">
                        <div className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600">
                        {currentUser
                              ? currentUser.address
                              : "Loading..."}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      :

      
      <div
        className="max-w-[1200px] mx-auto sm:py-20 p-5"
        style={{ marginTop: "70px" }}>
        <div className="text-center ">
          <div
            className="max-w-[800px] mx-auto rounded mt-8 "
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

            <div className="mt-6  rounded-xl mb-8">
              <div className="p-10">

              <form action="submit">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  <div>
                    <div className="mt-2.5 ">
                      <input
                        name="name"
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={change}
                        placeholder="Enter Your Name (if any changes)"
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
                        value={data.phone}
                        onChange={change}
                        placeholder="Enter new Phone Number(if any changes)"
                        className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-2.5 ">
                      <input
                        name="currPassword"
                        id="currPassword"
                        value={data.currPassword}
                        onChange={change}
                        type="password"
                        placeholder="Enter Your Password"
                        className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-2.5 ">
                      <input
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={change}
                        type="password"
                        placeholder="Enter Your New Password (if any changes)"
                        className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="mt-2.5">
                      <textarea
                        name="address"
                        id="address"
                        value={data.address}
                        onChange={change}
                        placeholder="Type your adress here (if any changes)..."
                        className=" bg-[#161616] w-full px-4 py-4 text-gray-400 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-pink-600"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <button className="text-xl w-full p-4 mt-2 font-semibold text-white bg-primary-color rounded-md " onClick={handleEdit}>
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  );
}
