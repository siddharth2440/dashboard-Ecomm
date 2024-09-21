import { ShoppingCart } from 'lucide-react'
import React from 'react'

const GiftCardCoupon = () => {
  return (
    <div className='w-[100%] mt-3 mx-auto'>
        <div className='flex flex-col items-start justify-start gap-3 bg-[#1F2937] py-3 px-4 w-[90%]'>

            <p className='text-[0.9rem]'>Do you have a voucher or gift card?</p>
            <input type="text" className='w-[100%] px-4 py-2 rounded-md bg-gray-500 focus:border focus:border-blue-300 outline-none'/>
            <button className='flex m-auto mt-4 items-center w-[100%] justify-center gap-2 bg-green-600 px-4 py-1 rounded-lg' >
                <ShoppingCart size={15}/>
                <span>{"Proceed to checkout"}</span>
            </button>

            {/* available coupon  */}
            <div className='flex items-start flex-col mt-2 justify-start gap-1'>
                <h1>Your available coupon</h1>
                <p className='text-green-400 font-[700]'>GIFTLKSND9#H - 10% Off </p>
            </div>

        </div>
    </div>
  )
}

export default GiftCardCoupon