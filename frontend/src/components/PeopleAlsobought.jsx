import React, { useEffect, useState } from 'react'
import axiosInstance from '../helpers/axiosInstance.js';
import { useCartstore } from '../stores/useCartstore';
import { ShoppingCart } from 'lucide-react';

const PeopleAlsobought = () => {
  const addToCart =  useCartstore((state) => state.addToCart )
  const [recommendations,setRecommendations] = useState([]);

  const fetchRecommendationsProducts = async () => {
    const res =  await axiosInstance.get("/product/recommendations");
    if(res.data){
        console.log(res.data.products);
        setRecommendations(res.data.products);
    }
  }
  

  useEffect( () => {
    fetchRecommendationsProducts();
  },[] )

  const handlePoepleAlsoBought = async (product) => {
    // console.log(productId);
    await addToCart(product)
  }

  return (
    <div className='px-4 py-2 relative flex items-center justify-normal gap-3 flex-wrap'>
      {
        recommendations.length > 0 &&
        recommendations.map(product => (
          <div key={product._id} className='flex items-center justify-center gap-4 px-5 border border-gray-700 rounded-sm  bg-gray-900 py-4 flex-col'>
            <img src={product.image} alt={product.name} className='w-auto h-[12rem] object-cover' />
            <div>
              <h2 className='text-gray-300 font-[600] text-center text-[1.5rem]'>{product.name}</h2>
              <p className='text-gray-500 text-[0.8rem]'>{product.description.substring(0, 100)}...</p>
              <span className='text-green-600 font-[700] text-[1.2rem] text-center'>${product.price}</span>
            </div>
            <button onClick={()=>handlePoepleAlsoBought(product)} className='flex items-center justify-start gap-2 bg-green-600 px-4 py-1 rounded-lg' >
            <ShoppingCart size={15}/>
            <span>{"Add to cart"}</span>
            </button>
          </div>
        ))
      }
    </div>
  )
}

export default PeopleAlsobought