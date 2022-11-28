import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuLeft: React.FC = () => {
   const active = ({ isActive }: { isActive: boolean }) => isActive ? { backgroundColor: '#f59e0b' } : undefined
   return (
      <div className='h-screen bg-gray-800'>
         <div className='py-5 px-8'>
            <NavLink to='/trangchu'><img src="/logo/logo.png" alt="" className='w-full' /></NavLink>
         </div>
         <div className='pt-5 space-y-2'>
            <NavLink style={active} to='quanlynguoidung' className='block px-3 py-1 text-white text-base font-semibold hover:text-white hover:bg-amber-500'>Quản lý người dùng</NavLink>
            <NavLink style={active} to='quanlythongtinvitri' className='block px-3 py-1 text-white text-base font-semibold hover:text-white hover:bg-amber-500'>Quản lý thông tin vị trí</NavLink>
            <NavLink style={active} to='quanlythongtinphong' className='block px-3 py-1 text-white text-base font-semibold hover:text-white hover:bg-amber-500'>Quản lý thông tin phòng</NavLink>
            <NavLink style={active} onClick={(e) => e.preventDefault()} to='quanlydatphong' className='block px-3 py-1 text-white text-base font-semibold hover:text-white hover:bg-amber-500 cursor-no-drop' title='Chọn vào chi tiết người dùng'>Quản lý đặt phòng</NavLink>
         </div>
      </div>
   )
}

export default MenuLeft