import React, { useEffect } from 'react'
import { useProductStore } from '../stores/useProductStore.js'
import { Trash, Star } from 'lucide-react';

const ProductsList = () => {
  const products = useProductStore((state) => state.products);
  const featuredProduct = useProductStore((state) => state.featuredProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  
  // alternamtive to update the toggle feature
  const toggleFeaturedHandler =async (productId) => {
    const update = featuredProduct(productId);
    if(update){
      console.log(products);
    }
  }

  // alternative of deleting the product
  const deleteHandler = (productId) => {
    console.log(productId);
  }

  return (
    <div>

        <table className='min-w-full divide-y divide-gray-700'>
            <thead className='bg-gray-700'>
              <tr className='bg-gray-700 rounded-lg'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Product</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Price</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Category</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Instock</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Featured</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>

            <tbody className='bg-gray-800'>

              {
                products.map((product) => (
                  <tr key={product._id} className='transition-all duration-75 delay-75 hover:bg-gray-900 cursor-pointer'>
                    <td className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                      <div className='flex items-center justify-start gap-2'>
                        <img src={product.image} alt="" className='h-[3.1rem] rounded-2xl'/>
                        {product.name}
                      </div>
                    </td>
                    <td className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>{product.price}</td>
                    <td className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>{product.category}</td>
                    <td className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>{product.inStock? 'Yes' : 'No'}</td>
                    <td className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                      <button onClick={()=>featuredProduct(product._id)} >
                        {/* <Star /> */}
                        <p>{product.isFeatured ? "true" : "false"}</p>
                      </button>
                    </td>
                    <td className='mx-auto'>
                        {/* <button>Edit</button> */}
                        <button onClick={()=>deleteProduct(product._id)}><Trash/></button>
                    </td>
                  </tr>
                ))
              }

            </tbody>
        </table>

    </div>
  )
}

export default ProductsList

// className={`${product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300" }`}