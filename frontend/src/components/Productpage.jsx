import { ShoppingCart } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { useCartstore } from '../stores/useCartstore.js'

const Productpage = ({product}) => {
  const addToCart = useCartstore((state) => state.addToCart )
    const handleCart = async () => {
        toast.success("Added to cart")
        await addToCart(product);
    }
  return (
    <div className='px-4 py-6 border border-gray-300 flex flex-col items-start justify-start gap-2 rounded-lg'>
        <img src={product.image} alt="product-image" className='h-[12.5rem] w-auto rounded-lg' />
        <h2>{product?.name}</h2>
        <h2>{"$"+product?.price}</h2>

        <button onClick={handleCart} className='flex items-center justify-start gap-2 bg-green-600 px-4 py-1 rounded-lg'>
            <ShoppingCart size={15}/>
            <span>{"Add to cart"}</span>
        </button>

    </div>
  )
}

export default Productpage