import { Loader, UserPlus,ArrowRightFromLine } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore.js';
import toast from 'react-hot-toast';

const Login = () => {
    const loading = useUserStore((state) => state.loading );

    const [loginData,setLoginData] = useState({ email :"", password :""});
    const login = useUserStore((state) => state.login )
    

    const changeLoginHandler = (e) => {
        const {name,value} = e.target;
        setLoginData((prev) => ({
            ...prev,[name]:value
        }) );
    }

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(loginData);
        const _login = login(loginData);
        if(!_login){
            return toast.error("error in Login")
        }
        navigate("/")
        setLoginData({ email :"", password :""})
        return;
    }
  return (
    <div className='w-full m-auto overflow-hidden'>

        <div className='py-1 px-3 rounded-md h-[60%] w-[40%] m-auto'>
            <h1 className='text-green-600 text-[2.4rem] font-[700] text-center'>Create Your Account</h1>

            <div className='w-[100%] h-[100%] m-auto'>

                <form onSubmit={submitHandler} className='w-[90%] mt-4 bg-gray-800 rounded-md px-5 py-2'>

                    {/* email  */}
                    <div className='flex items-start justify-start gap-2 mt-4 flex-col w-[100%]'>
                        <label htmlFor="email">Email Address</label>
                        <input type="text" name='email' value={loginData.email} onChange={changeLoginHandler} placeholder={`  you@gmail.com `}  className='w-[100%] py-1 px-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm '/>
                    </div>
                    {/* password  */}
                    <div className='flex items-start justify-start gap-2 mt-4 flex-col w-[100%]'>
                        <label htmlFor="password">Password</label>
                        <input type="password" value={loginData.password} name='password' onChange={changeLoginHandler} placeholder={`  *********** `}  className='w-[100%] py-1 px-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm '/>
                    </div>
                    

                    {/* button  */}
                    <button type='submit' disabled={loading} className='flex items-center justify-normal bg-green-600 mx-auto mt-5 px-4 py-2 rounded-md disabled:bg-green-900 disabled:cursor-not-allowed'>
                        {
                            loading ?
                            (
                                <>
                                    <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Loading...
                                </>
                            ) : (
                                <>
									<UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
									Login
								</>
                            )
                        }
                    </button>
                    
                    <div className='w-[100%] my-4'>
                        <h4 className='text-center w-[100%]'>
                            Not a  member? <Link className='ml-2 text-green-700 font-[600]' to={"/signup"}>Sign up now <ArrowRightFromLine className='inline-block' size={15}/> </Link>
                        </h4>
                    </div>
                </form>

            </div>
        </div>

    </div>
  )
}

export default Login