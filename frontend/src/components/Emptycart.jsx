import { ShoppingBasket } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Emptycart = () => {
    const navigate = useNavigate();
    const handleclick = (e) => {
        e.preventDefault()
        navigate(-1);
    }

  return (
    <div className='w-screen overflow-hidden h-full flex items-center justify-center flex-col gap-3'>
        <ShoppingBasket size={180}/>
        <h1 className='text-[3.1rem] font-[600] text-white'>Your cart is empty</h1>
        <p className='text-[1.2rem] font-[600] text-white'>Looks like you haven't added anything to your cart yet.</p>
        <button className='px-4 py-2 rounded-lg bg-green-600 mt-2' onClick={handleclick}>Start Shopping</button>
    </div>
  )
}

export default Emptycart