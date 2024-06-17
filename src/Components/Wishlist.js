import React from 'react'
import ProductItem from './ProductItem'

const products = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: '$10' },
  { id: 2, name: 'Product 2', description: 'Description 2', price: '$20' },
  { id: 3, name: 'Product 3', description: 'Description 3', price: '$30' },
  { id: 4, name: 'Product 4', description: 'Description 4', price: '$40' },
  { id: 5, name: 'Product 5', description: 'Description 5', price: '$50' },
  { id: 6, name: 'Product 6', description: 'Description 6', price: '$60' }
];

export default function Wishlist() {
  return (
    <>
    <h3 className='text-white font-bold text-center text-2xl'style={{ paddingTop: "150px" }}>Your Wishilst:- </h3>
      <div className="grid gap-4 p-4 grid-cols-1 md:grid-cols-3" >
        {products.map(product => (
          <div key={product.id} className="p-3 m-3" >
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </>
  )
}
