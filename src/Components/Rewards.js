import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

export default function Rewards() {
  const { currentUser } = useAuth();

  const rewardsList = [
    { points: 50, discount: 200 },
    { points: 100, discount: 500 },
    { points: 200, discount: 1200 },
  ];

  return (
    <>
    <div className="max-w-[1200px] mx-auto sm:py-20 p-5" style={{ marginTop: "100px", marginBottom: "80px" }}>
      <div className="">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Your Reward Points: {currentUser.rewards}</h2>
          <p className="text-xl font-semibold mb-6">You can redeem your points on orders for discounts!</p>
          
          <div className="bg-gray-800 rounded-lg p-5">
            <h3 className="text-2xl font-bold mb-4">Reward Tiers:</h3>
            <ul className="list-disc list-inside">
              {rewardsList.map((reward) => (
                <li key={reward.points} className="mb-2">
                  <span className="font-semibold">{reward.points} points:</span> Discount of Rs.{reward.discount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Why Redeem Your Rewards?</h2>
        <p className="text-lg text-gray-300 mb-6">
          Enjoy exclusive discounts and offers by redeeming your rewards points. The more you shop, the more you save!
        </p>
        <Link to="/Products" className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-200">
          Start Shopping Now!
        </Link>
      </div>
    </div>
    </>
  );
}
