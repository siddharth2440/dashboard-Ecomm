import React from 'react'
import { ShoppingCart,UserPlus,LogIn,LogOut,Lock } from "lucide-react"
import { Link } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore.js';
import toast from 'react-hot-toast';
import { useCartstore } from '../stores/useCartstore.js';

const Navbar = () => {
    const user = useUserStore((state) => state.checkingAuth );
    const details = useUserStore((state) => state.user );
    const logout = useUserStore((state) => state.logout )    
    const admin = details?.role == "customer" ? false : true;
    const cart = useCartstore((state) => state.cart )

    const logoutHandler = (e) => {
        e.preventDefault();
        logout();
        return toast.success("Logged Out Successfully");
    }

  return (
    <header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
        
        <div className='container mx-auto px-4 py-3 flex items-center justify-between min-w-screen overflow-hidden'>

            {/* left  */}
            <div className=''>
                <Link to={"/"} className='text-green-600 text-[1.6rem] font-[500]'> Ecommerce </Link>
            </div>

            {/* right */}
            <div className='flex w-[100%] items-center justify-end gap-5 m-auto'>

                {/* 1 */}
                <Link to={"/"}>Home</Link>

                {/* 2 */}
                {user && (<div className='flex items-center justify-between gap-1'>
                    <div className='relative'>
                        { cart.length > 0 && (<span className='absolute -top-3 -left-2 text-[0.8rem] bg-fuchsia-400 rounded-[50%] px-2 text-black font-[700]'>{ cart.length ?? "0"}</span>)}
                        <ShoppingCart/>
                    </div>
                    <Link to={"/cart"}> Cart </Link>
                </div>)}
                {/* 3 */}
                {(admin && user ) && (<div className='flex items-center justify-start gap-1 px-3 py-1 bg-green-400 rounded-md'>
                    <Lock className='' size={20}/>
                    <Link to={"/dashboard"}>Dashboard</Link>
                </div>)}

                {/* 4 */}
                { user ? 
                    (
                    <div className='flex items-center justify-start gap-1 px-3 py-1 rounded-md'>
                        <button
								className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out'
								onClick={logoutHandler}
						>
                        <LogOut className='' size={20}/>
                        Logout</button>
                        {/* <button></button> */}
                    </div>
                    ) :  (
                        <>
                        <div className='flex items-center justify-start gap-1 px-3 py-1 bg-[#1E293B] rounded-md'>
                            <LogIn className='' size={20}/>
                            <Link to={"/login"}>Login</Link>
                        </div>
                        <div className='flex items-center justify-start gap-1 px-3 py-1 bg-[#1E293B] rounded-md'>
                            <UserPlus className='' size={20}/>
                            <Link to={"/signup"}>Signup</Link>
                        </div>
                        </>
                    )
                }

            </div>


        </div>

    </header>
  )
}

export default Navbar