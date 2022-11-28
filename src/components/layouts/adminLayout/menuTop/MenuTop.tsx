import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { dangNhapActions } from '../../../../stores/auth/dangNhapReducer'
import { UserLogin } from '../../../../utils/constants/api'

const MenuTop: React.FC = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch<any>()
   const nguoiDungJson = localStorage.getItem(UserLogin)
   const nguoiDung = typeof nguoiDungJson === 'string' ? JSON.parse(nguoiDungJson) : undefined

   return (
      <div className='bg-white py-3 text-right space-x-3'>
         <p className='m-0 mr-3 text-base font-bold inline-block text-amber-800'>Chào Admin! {nguoiDung.name} </p>
         <NavLink to={`/thongtincanhan/${nguoiDung.id}`} className="text-amber-800 text-lg font-bold"><img src={nguoiDung.avatar || 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'} alt="" className='w-10 h-10 rounded-full inline-block' /></NavLink>
         <button onClick={() => {
            dispatch(dangNhapActions.removeContentDangNhap(''))
            navigate("/trangchu");
         }} className="px-4 py-2 text-black bg-white rounded-md shadow hover:bg-amber-500 hover:text-black transition duration-300">Đăng xuất</button>
      </div>
   )
}

export default MenuTop