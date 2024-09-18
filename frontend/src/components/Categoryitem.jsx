import React from 'react'
import { Link } from 'react-router-dom'

const Categoryitem = ({category}) => {
  return (
    <div className='relative w-[100%] overflow-x-hidden flex items-start justify-center'>
        <Link to={`/category/${category.href.split('/')[1]}`}>
        <div className='h-[100%] w-[100%]'>
            <img src={category.imageUrl} alt="category-image" className='h-[15.3rem] lg:h-[30rem] w-full rounded-lg'/>
        </div>
        <div className='absolute bottom-2 left-3 m-auto'>
            <h2>{category.name}</h2>
            <h2>{"Explore"+category.name}</h2>
        </div>
        </Link>
    </div>
  )
}

export default Categoryitem