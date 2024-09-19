import { Loader, UploadIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useProductStore } from '../stores/useProductStore.js';

const CreateProduct = () => {
    const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];
    const [product,setProduct] = useState({
        name:"",description:"",price:"",category:"",image:""
    })

    const loading = useProductStore((state)=>state.loading)

    const createProduct = useProductStore((state)=>state.createProduct);
    const changeProductHandler = (e) => {
        const {value,name} = e.target;
        setProduct(prev=>{
            return (
                {
                    ...prev,[name]:value
                }
            )
        })
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = () => {
                setProduct(prev=>{
                    return (
                        {
                           ...prev,image:reader.result
                        }
                    )
                })
            }
            reader.readAsDataURL(file);
        }
    }
    const submit_form_create_procducts =async (e) => {
        e.preventDefault();
        // call your api here
        await createProduct(product)
        console.log(product);
        setProduct({name:"",description:"",price:"",category:"",image:""})        
        toast.success('Product Created Successfully');
    }

  return (
    <div className='flex items-center text-black justify-center gap-3 bg-gray-800 py-4 w-[40vw] px-8 rounded-md'>
        <form onSubmit={submit_form_create_procducts} className='flex items-start justify-start w-[100%] gap-5 flex-col'>

            {/* product name  */}
            <div className='productname w-[100%] px-3 flex flex-col items-start justify-normal gap-1 py-1'>
                <label htmlFor="name" className='text-[0.9rem] text-white font-[600]'>Product Name</label>
                <input type="text" name="name" value={product.name} onChange={changeProductHandler} id="product-name" className='w-[100%] py-1 px-3 bg-gray-700 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'/>
            </div>
            {/* description  */}
            <div className='productdesc w-[100%] px-3 flex flex-col items-start justify-normal gap-1 py-1'>
                <label htmlFor="name" className='text-[0.9rem] text-white font-[600]'>Product Desription</label>
                <textarea name="description" value={product.description} onChange={changeProductHandler} id="product-description" className='w-[100%] bg-gray-700 py-1 px-3 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'></textarea>
            </div>
            {/* price  */}
            <div className='productprice w-[100%] px-3 flex flex-col items-start justify-normal gap-1 py-1'>
                <label htmlFor="name" className='text-[0.9rem] text-white font-[600]'>Product Price</label>
                <input type="number" name="price" value={product.price} onChange={changeProductHandler} id="product-price" className='w-[100%] py-1 bg-gray-600 border-gray-600 px-3 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'/>
            </div>
            {/* categories  */}
            <div className='w-[100%] px-3 flex flex-col items-start justify-normal gap-1 py-1'>
                <label htmlFor="category" className='text-white'>Category</label>
                <select name="category" id="category" value={product.category} onChange={changeProductHandler} className='mt-1 w-[100%] bg-gray-700 border border-gray-600 rounded-md
                            shadow-sm py-2 px-3 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category._id} className='cursor-pointer capitalize' >{category}</option>
                        ))
                    }
                </select>
            </div>
            {/* upload image  */}
            <div className='productimage rounded-lg px-3 flex items-start justify-normal gap-1 py-1 border border-gray-600 bg-gray-600'>
                <label htmlFor="file" className='text-white cursor-pointer'> <UploadIcon size={15} className='inline-block'/> Product Image</label>
                <input type="file" onChange={handleImageChange} hidden name="file" multiple={false} id="file" />
            </div>
            <button 
            type='submit'

            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
            disabled={loading}>
                {
                    loading?
                    (
                        <Loader size={20}/>
                    ) :
                    (
                        'Submit'
                    )
                }
            </button>
        </form>
    </div>
  )
}

export default CreateProduct