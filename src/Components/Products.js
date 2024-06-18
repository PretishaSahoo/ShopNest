import React, { useEffect } from 'react'
import ProductItem from './ProductItem'
import { useProduct } from '../Context/ProductContext'

export default function Product() {

  const {fetchProducts , Products } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  return (
    <>
      <div className="grid gap-4 p-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4" style={{ paddingTop: "150px" }}>
        {Products.map(product => (
          <div key={product._id} className="p-3 m-3"  >
            <ProductItem productName={product.productName}  productDesc={product.productDesc} price = {product.price} productImageURL={product.productImageURL} productOwnerName={product.productOwnerName} sizes={product.sizes}/>
          </div>
        ))}
      </div>
    </>
  )
}
