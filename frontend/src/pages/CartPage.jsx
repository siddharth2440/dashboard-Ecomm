import React from 'react'
import { useCartstore } from '../stores/useCartstore.js'
import Emptycart from '../components/Emptycart.jsx';
import CartItem from '../components/CartItem.jsx';
import PeopleAlsobought from '../components/PeopleAlsobought.jsx';

const CartPage = () => {
    const cart = useCartstore((state) => state.cart );
    console.log("Cart Details");
    
    console.log(cart);
    
  return (
    <div className='py-4 px-3 flex items-center justify-normal gap-3 w-[100%]'>

        <div className='px-3 flex items-center justify-start w-[50%] gap-4 flex-col'>
            {
                cart.length === 0 ? (
                    <Emptycart/>
                ) :  cart.map((item,idx) => {
                    return (
                        <CartItem key={idx+1} item={item}/>
                    )
                } )
            }
            {
                cart.length > 0 && (
                    <PeopleAlsobought/>
                )
            }
        </div>

    </div>
  )
}

export default CartPage