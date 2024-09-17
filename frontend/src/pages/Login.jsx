import { Loader, UserPlus,ArrowRightFromLine } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    const loading = false;

    const submitHandler = (e) => {
        e.preventDefault();
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
                        <input type="text" placeholder={`  you@gmail.com `}  className='w-[100%] py-1 px-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm '/>
                    </div>
                    {/* password  */}
                    <div className='flex items-start justify-start gap-2 mt-4 flex-col w-[100%]'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder={`  *********** `}  className='w-[100%] py-1 px-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm '/>
                    </div>
                    

                    {/* button  */}
                    <button type='submit' disabled={loading} className='flex items-center justify-normal bg-green-600 mx-auto mt-5 px-4 py-2 rounded-md disabled:bg-green-800 disabled:cursor-not-allowed'>
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
									Sign up
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