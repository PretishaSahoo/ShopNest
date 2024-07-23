import React from 'react';
import { useProduct } from '../Context/ProductContext';
import { useAuth } from '../Context/AuthContext';

export default function Orders() { 
  const { orders = [], receivedOrders = [] } = useProduct();
  const { currentUser } = useAuth();

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log(receivedOrders);

  return (
    <>
      <h3 className='text-pink-400 font-bold text-center text-2xl' style={{ paddingTop: "150px" }}>
        Your Previous Orders:
      </h3>
      <div className="p-4" style={{ minHeight: "200px" }}>
        {/* Personal Orders */}
        <div className="mb-6">
          <h4 className='text-xl font-semibold text-pink-300 mb-4 text-center mx-auto'>My Orders:</h4>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="max-w-[1200px] mx-auto mb-6  rounded-lg p-4 bg-gray-800" style={{ boxShadow: "0 0 20px 10px rgba(128, 128, 128, 0.1)" }}>
                <h5 className='text-lg font-bold text-white'>Order Date: {formatDate(order.placedAt)}</h5>
                <h6 className='text-md font-semibold text-white'>Total Cost: ₹{order.totalCost}</h6>
                <div className="mt-4">
                  {order.products.map((product) => (
                    <div key={product.productId} className="border-b py-2">
                      <h6 className='text-white font-medium'>{product.productName}</h6>
                      <p className='text-gray-300'>Size: {product.size}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className='text-white text-center mx-auto'>You have no orders yet.</p>
          )}
        </div>

        {/* Received Orders (if Brand) */}
        {currentUser?.role === 'Brand' && (
          <div>
            <h4 className='text-xl font-semibold text-pink-300  mb-4 text-center mx-auto'>Received Orders:</h4>
            {receivedOrders.length > 0 ? (
              receivedOrders.map((order) => (
                <div key={order._id} className="max-w-[1200px] mx-auto mb-6 rounded-lg p-4 bg-gray-800" style={{ boxShadow: "0 0 20px 10px rgba(128, 128, 128, 0.1)" }}>
                  <h5 className='text-lg font-bold text-white'>Order Date: {formatDate(order.orderDate)}</h5>
                  <h6 className='text-md font-semibold text-white'>Delivery Address: {order.deliveryAddress}</h6>
                  <h6 className='text-md font-semibold text-white'>Customer Name : {order.userName}</h6>
                  <h6 className='text-md font-semibold text-white'>Customer Contact: {order.userNumber}</h6>
                  
                  <div className="mt-4">
                    {order.products?.map((product) => (
                      <div key={product.productId} className="border-b py-2">
                        <h6 className='text-white font-medium'>{product.productName}</h6>
                        <p className='text-gray-300'>Size: {product.size}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className='text-white text-center mx-auto'>You have no received orders yet.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
