import React from 'react'
import { useCartstore } from '../stores/useCartstore.js'
import {  ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Ordersummary = () => {
    const { total,subTotal,coupon,isCouponApplied } = useCartstore();

    const savings = subTotal - total;
    const formattedSubtotal = subTotal.toFixed(2);
    const formattedTotal = total.toFixed(2);
    const formattedsavings = savings.toFixed(2);

  return (
    <div className='flex items-start justify-start gap-3 w-[100%] mx-auto'>
        
        <div className='px-3 bg-[#1F2937] border border-gray-500 rounded-md w-[90%] py-2'>
        <h1 className='text-white text-center m-auto text-[1.7rem] font-[600]'>Order-Summary</h1>

        <div className='flex items-center text-[1.1rem] mt-4 justify-between px-3'>
            <h3>Original Price</h3>
            <p className='text-green-400'>{"$"+formattedSubtotal}</p>
        </div>

        {
            savings > 0 && (
                <div className='flex items-center text-[1.1rem] mt-4 justify-between px-3'>
                    <h3>Savings</h3>
                    <p className='text-red-400'>-{"$"+formattedsavings}</p>
                </div>  
            )
        }
        {
            coupon && isCouponApplied && (
                <div className='flex items-center text-[1.1rem] mt-4 justify-between px-3'>
                    <h3>Coupon { coupon.code }</h3>
                    <p className='text-red-400'>-{coupon.discountPercentage}%</p>
                </div>
            )
        }
        <div className='flex items-center text-[1.1rem] mt-4 justify-between px-3'>
            <h3>total</h3>
            <p className='text-green-100 border px-2 border-gray-500 rounded'>{"$"+formattedTotal}</p>
        </div>
        
        <button className='flex m-auto mt-4 items-center justify-start gap-2 bg-green-600 px-4 py-1 rounded-lg' >
            <ShoppingCart size={15}/>
            <span>{"Proceed to checkout"}</span>
        </button>
        <p className='text-center my-2'>Or</p>
        <Link to={"/"} className='text-green-500 font-[700]'>
            <h1 className='underline m-auto text-center'>Continue Shopping</h1>
        </Link>

        </div>
        
    </div>
  )
}

export default Ordersummary