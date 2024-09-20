import { Minus, Plus, Trash } from 'lucide-react'
import React from 'react'
import { useCartstore } from '../stores/useCartstore.js'

const CartItem = ({item}) => {
    const removeFromCart = useCartstore((state) => state.removeFromCart );
  return (
    <div className='rounded-lg border p-4 w-[100%] shadow-sm border-gray-600 bg-gray-800'>

        <div className='grid grid-cols-[30%,40%,30%] px-4 py-2 w-[100%]'>
            {/* image  */}
            <img src={item.image} alt="cart-item-image" className='h-20 rounded-lg object-cover'/>

            <div className='flex items-start justify-start flex-col gap-2'>
                <h1 className='text-[1.2rem] font-[600]'>{item.name}</h1>
                <h3 className='text-[0.8rem]'>{item.description}</h3>
                <button onClick={()=>removeFromCart(item._id)}>
                    <Trash size={20} className='text-red-900'/>
                </button>
            </div>

            <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center justify-normal gap-3'>
                    <button className='p-1 border border-gray-500 rounded-md shadow-md'><Minus size={15}/></button>
                    <span className='text-[1.4rem]'>{item.quantity}</span>  {/* or item.count */}
                    <button className='p-1 border border-gray-500 rounded-md shadow-md'><Plus size={15}  /></button>
                </div>
                
                <h3>$ {item.price}</h3>
            </div>
        </div>
        
    </div>
  )
}

export default CartItem