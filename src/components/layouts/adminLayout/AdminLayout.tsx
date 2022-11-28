import React from 'react'
import { Outlet } from 'react-router-dom'
import MenuLeft from './menuLeft/MenuLeft'
import MenuTop from './menuTop/MenuTop'

const AdminLayout: React.FC = () => {
   return (
      <div className='container p-0 bg-gray-200 flex'>
         <div className='w-52'>
            <MenuLeft />
         </div>
         <div className='flex-1'>
            <MenuTop />
            <Outlet />
         </div>
      </div>
   )
}

export default AdminLayout