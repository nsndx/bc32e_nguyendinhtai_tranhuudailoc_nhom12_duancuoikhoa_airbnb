import React from 'react'
import { Outlet } from 'react-router-dom'
import { UserLogin } from '../../../utils/constants/api'
import MenuLeft from './menuLeft/MenuLeft'
import MenuTop from './menuTop/MenuTop'

const AdminLayout: React.FC = () => {
   const nguoiDungJson = localStorage.getItem(UserLogin)
   const nguoiDung = typeof nguoiDungJson === 'string' ? JSON.parse(nguoiDungJson) : undefined

   return (
      <div>
         {nguoiDung?.role !== 'ADMIN' ? '' :
            <div className='container p-0 bg-gray-200 flex'>
               <div className='w-52'>
                  <MenuLeft />
               </div>
               <div className='flex-1'>
                  <MenuTop />
                  <Outlet />
               </div>
            </div>}
      </div>
   )
}

export default AdminLayout