import React, { useEffect } from 'react'
import { useProductStore } from '../stores/useProductStore.js'
import { useLocation, useParams } from 'react-router-dom';
import { LucideChartNoAxesColumnIncreasing } from 'lucide-react';
import Productpage from '../components/Productpage.jsx';

const Categorypage = () => {
    const {category} = useParams();
    const location = useLocation();
    console.log(category);
    const {products} = useProductStore();
    const fetchProductsByCategory = useProductStore((state)=>state.fetchProductsByCategory);
    useEffect(()=>{
        fetchProductsByCategory(category);
    },[fetchProductsByCategory,category])
  return (
    <div className='w-screen p-5 py-3 flex items-start justify-normal gap-3 flex-wrap'>
      {
        products.length === 0 && (
          <h1>
            {category} is out of stock
          </h1>
        )
      }
      {
        (products.length > 0 ) && products.map((product,idx) => {
          return (
            <Productpage product={product}/>
          )
        } )
      }
    </div>
  )
}

export default Categorypage