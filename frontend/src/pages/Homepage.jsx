import React from 'react'
import { useUserStore } from '../stores/useUserStore.js'
import Categoryitem from '../components/Categoryitem.jsx';

const Homepage = () => {
  const checkingAuth = useUserStore((state) => state.checkingAuth );
  const user = useUserStore((state) => state.user);
  // console.log(user);

  const categories = [
    {href:"/jeans",name:"Jeans",imageUrl:"/jeans.jpg"},
    {href:"/bags",name:"Jeans",imageUrl:"/bags.jpg"},
    {href:"/glasses",name:"Jeans",imageUrl:"/glasses.png"},
    {href:"/jackets",name:"Jeans",imageUrl:"/jackets.jpg"},
    {href:"/shoes",name:"Jeans",imageUrl:"/shoes.jpg"},
    {href:"/suits",name:"Jeans",imageUrl:"/suits.jpg"},
    {href:"/tshirts",name:"Jeans",imageUrl:"/tshirts.jpg"},
    // {href:"/jeans",name:"Jeans",imageUrl:"/jeans.jpg"},
  ]
  
  return (
    <div className='min-w-screen overflow-x-hidden px-5 py-3'> 
      <h1 className='text-[#3FD09E] m-auto text-center font-[700] text-[2.6rem]'>Explore our categories</h1>
      <p className='text-[#c1e9db] m-auto text-center font-[400] text-[1.1rem] my-2'>Discover the latest trends in eco-friendly fashion</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {
          categories.map((category,idx) => {
            return (
              <Categoryitem category={category} key={idx+1}/>
            )
          } )
        }
      </div>

    </div>
  )
}

export default Homepage