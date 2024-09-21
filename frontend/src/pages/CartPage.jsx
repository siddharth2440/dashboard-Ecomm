import React from 'react'
import { useCartstore } from '../stores/useCartstore.js'
import Emptycart from '../components/Emptycart.jsx';
import CartItem from '../components/CartItem.jsx';
import PeopleAlsobought from '../components/PeopleAlsobought.jsx';
import Ordersummary from "../components/Ordersummary.jsx";
import GiftCardCoupon from '../components/GiftCardCoupon.jsx';

const CartPage = () => {
    const cart = useCartstore((state) => state.cart );
    console.log("Cart Details");
    
    console.log(cart);
    
  return (
    <div className='py-4 px-3 flex items-start justify-normal gap-3 w-[100%]'>

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
                    <div className='flex items-start justify-start gap-3'>
                        <PeopleAlsobought/>
                    </div>
                )
            }
        </div>
        <div className='w-[40%] flex items-center justify-center flex-col gap-3'>
            <Ordersummary/>
            <GiftCardCoupon/>
        </div>

    </div>
  )
}

export default CartPage