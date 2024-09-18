import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react'
import React, { useState } from 'react'
import CreateProduct from '../components/CreateProduct.jsx';
import ProductsList from '../components/ProductsList.jsx';
import AnalyticsTab from '../components/AnalyticsTab.jsx';

const Adminpage = () => {
  const tabs = [
    {id:"create",label:"Create Product",icon:PlusCircle},
    {id:"products",label:"Products",icon:ShoppingBasket},
    {id:"analytics",label:"Analytics",icon:BarChart}
  ]

  const [activeTab,setActiveTab] = useState("create");
  return (
    <div className='m-auto w-screen flex flex-col items-center justify-center overflow-x-hidden px-4 py-3'>
      <h1 className='text-green-400 font-[600] text-[2.2rem]'>Admin Dashboard</h1>

      {/* tabs section  */}

      <div className='my-4'>

        <div className='flex items-center justify-center gap-4 my-2'>

        {
          tabs.map((tab,idx) => {
            return (
              <button key={idx+1} onClick={(e) => setActiveTab(tab.id)}  className={`${
                activeTab === tab.id? 'bg-green-600' : 'bg-gray-400'
                } px-4 py-2 rounded-lg`}>{<tab.icon className={`mr-2 inline-block items-center`}/>} {tab.label}</button>
            )
          } )
        }

        </div>

        <div>

        {
          activeTab === 'create' && (
            <CreateProduct/>
          )
        }
        {
          activeTab === 'products' && (
            <ProductsList/>
          )
        }
        {
          activeTab === 'analytics' && (
            <AnalyticsTab/>
          )
        }

        </div>


      </div>
    </div>

  )
}

export default Adminpage