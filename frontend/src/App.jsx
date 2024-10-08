import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Navbar from './components/Navbar.jsx'
import CategoryPage from './pages/Categorypage.jsx'
import { useUserStore } from './stores/useUserStore.js'
import Adminpage from './pages/Adminpage.jsx'
import CartPage from './pages/CartPage.jsx'
import { useEffect } from 'react'
import { useCartstore } from './stores/useCartstore.js'

function App() {

  const user = useUserStore((state) => state.user )
  const getCartItems = useCartstore((state) => state.getCartItems );

  useEffect(()=>{
    getCartItems();
  },[]);

  return (

    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>

      {/* BG-Gradient */}
      <div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

      <div className='relative z-50 pt-20'>
          <Navbar/>
          <Routes>
            <Route path='/' element={ <Homepage/> } ></Route>
            <Route path='/login' element={ !user ? <Login/> : <Navigate to={"/"} /> } ></Route>
            <Route path='/signup' element={ !user ? <Signup/> : <Navigate to={"/"} /> } ></Route>
            <Route path='/dashboard' element={ (user && user.role) == "admin" ? <Adminpage/> : <Navigate to={"/login"}/> }></Route>
            <Route path='/category/:category' element={<CategoryPage/>}></Route>
            <Route path='/cart' element={ (user) && <CartPage/>}></Route>
          </Routes>
      </div>
    </div>
    
  )
}

export default App