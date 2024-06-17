import React from 'react'
import GiftBox from "../Images/GiftBox.png"

export default function Rewards() {
  return (
    <>
     <div
        className="max-w-[1200px] mx-auto sm:py-20 p-5"
        style={{ marginTop: "80px" ,marginBottom: "80px"}}
      >
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
       <img src={GiftBox} style={{  animation:"float 5s ease-in-out infinite"}} alt="" />

       <p className="text-center text-4xl text-white font-bold p-6">Your Reward Points: 0 <br /><span className="text-xl font-semibold">You can Redeem your points to on Orders to gain discount on your orders! <br />50 rewards: Discount of Rs.200 <br />100 rewards : Discount of Rs. 500 <br />200 rewards:Discount of Rs.1200</span></p>
       </div>
        
      </div>
    </>
  )
}
