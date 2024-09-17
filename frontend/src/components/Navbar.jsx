import React from 'react'
import { ShoppingCart,UserPlus,LogIn,LogOut,Lock } from "lucide-react"
import { Link } from 'react-router-dom'

const Navbar = () => {
    const user = true;
    const admin = true;

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
                        <span className='absolute -top-3 -left-2 text-[0.8rem] bg-fuchsia-400 rounded-[50%] px-2 text-black font-[700]'>3</span>
                        <ShoppingCart/>
                    </div>
                    <Link to={"/cart"}> Cart </Link>
                </div>)}
                {/* 3 */}
                {admin && (<div className='flex items-center justify-start gap-1 px-3 py-1 bg-green-400 rounded-md'>
                    <Lock className='' size={20}/>
                    <Link to={"/dashboard"}>Dashboard</Link>
                </div>)}

                {/* 4 */}
                { user ? 
                    (
                    <div className='flex items-center justify-start gap-1 px-3 py-1 bg-[#1E293B] rounded-md'>
                        <LogOut className='' size={20}/>
                        <Link to={"/logout"}>Logout</Link>
                    </div>
                    ) :  (
                        <>
                        <div className='flex items-center justify-start gap-1 px-3 py-1 bg-[#1E293B] rounded-md'>
                            <LogIn className='' size={20}/>
                            <Link to={"/logout"}>Login</Link>
                        </div>
                        <div className='flex items-center justify-start gap-1 px-3 py-1 bg-[#1E293B] rounded-md'>
                            <UserPlus className='' size={20}/>
                            <Link to={"/logout"}>Signup</Link>
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