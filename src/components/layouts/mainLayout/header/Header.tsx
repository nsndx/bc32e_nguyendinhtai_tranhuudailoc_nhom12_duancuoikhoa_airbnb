import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { UserLogin } from '../../../../utils/constants/api';
import { dangNhapActions } from '../../../../stores/auth/dangNhapReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersID } from '../../../../stores/nguoiDung/getUsersIDReducer';
import { RootState } from '../../../../stores/configStore';
import { dangKiActions } from '../../../../stores/auth/dangKiReducer';
import styled from 'styled-components';

const Header: React.FC = () => {
   const active = ({ isActive }: { isActive: boolean }) => isActive ? { color: "#f59e0b" } : undefined;
   const navigate = useNavigate()
   const dispatch = useDispatch<any>()
   const [navbar, setNavbar] = useState(false);
   const nguoiDungJson = localStorage.getItem(UserLogin)
   const nguoiDung = typeof nguoiDungJson === 'string' ? JSON.parse(nguoiDungJson) : undefined
   const { contentGetUsersID } = useSelector((state: RootState) => state.getUsersIDReducer)

   useEffect(() => {
      if (nguoiDung) {
         dispatch(getUsersID(nguoiDung.id))
      }
   }, [])

   return (
      <Container className="Header pt-3 pb-3 lg:pb-10 bg-black fixed top-0 z-20 w-full">
         <div className="container">
            <div className="justify-between lg:items-center lg:flex">
               <div>
                  <div className="flex items-center justify-between lg:block">
                     <NavLink to="trangchu">
                        <img className="w-32" src="/logo/logo.png" alt="" />
                     </NavLink>
                     <div className="lg:hidden">
                        <button className="p-2 text-white rounded-md outline-none border" onClick={() => setNavbar(!navbar)}>
                           {navbar ? <AiOutlineClose /> : <AiOutlineMenu />}
                        </button>
                     </div>
                  </div>
               </div>
               <div>
                  <div className={`flex-1 justify-self-center py-3 lg:block lg:py-0 ${navbar ? "block" : "hidden"}`}>
                     <ul className="Menu items-center justify-center space-y-2 lg:flex lg:space-x-6 lg:space-y-0 mb-0 font-semibold text-lg">
                        <li>
                           <NavLink style={active} to='trangchu' className="text-white hover:text-amber-500 transition duration-500 relative">
                              Nơi ở
                           </NavLink>
                        </li>
                        <li>
                           <NavLink style={active} to='trainghiem' className="text-white hover:text-amber-500 transition duration-500 relative">
                              Trải Nghiệm
                           </NavLink>
                        </li>
                        <li>
                           <NavLink style={active} to='trainghiemtructuyen' className="text-white hover:text-amber-500 transition duration-500 relative">
                              Trải Nghiệm trực tuyến
                           </NavLink>
                        </li>
                     </ul>
                     <div className="mt-3 space-x-2 lg:hidden ">
                        {nguoiDung ? (
                           <div className="inline-block space-x-2">
                              <NavLink to={`/thongtincanhan/${nguoiDung.id}`}>
                                 <img src={contentGetUsersID?.avatar || 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'} alt="" className='w-10 h-10 rounded-full inline-block' />
                              </NavLink>
                              <button onClick={() => {
                                 dispatch(dangNhapActions.removeContentDangNhap(''))
                                 dispatch(dangKiActions.removeContentDangKi(''))
                                 navigate("/trangchu");
                              }} className="inline-block px-4 py-2 text-black bg-white rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                                 Đăng xuất
                              </button>
                              {nguoiDung.role === 'ADMIN' ? <NavLink to="/admin/quanlynguoidung" className="inline-block px-4 py-2 text-white bg-amber-800 rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                                 Page Admin
                              </NavLink> : ''}
                           </div>
                        ) : (
                           <div className="inline-block space-x-2">
                              <NavLink to="/user/dangnhap" className="inline-block px-4 py-2 text-center text-white bg-amber-800 rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                                 Đăng nhập
                              </NavLink>
                              <NavLink to="/user/dangki" className="inline-block px-4 py-2 text-black bg-white rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                                 Đăng kí
                              </NavLink>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <div className="hidden lg:block">
                  {nguoiDung ? (
                     <div className="inline-block space-x-2">
                        <span className='text-amber-500 text-base font-bold'>Chào {contentGetUsersID?.name}!</span>
                        <NavLink to={`/thongtincanhan/${nguoiDung.id}`}>
                           <img src={contentGetUsersID?.avatar || 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'} alt="" className='w-10 h-10 rounded-full inline-block' title='Trang cá nhân' />
                        </NavLink>
                        <button onClick={() => {
                           dispatch(dangNhapActions.removeContentDangNhap(''))
                           dispatch(dangKiActions.removeContentDangKi(''))
                           navigate("/trangchu");
                        }} className="inline-block px-4 py-2 text-black bg-white rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                           Đăng xuất
                        </button>
                        {nguoiDung.role === 'ADMIN' ? <NavLink to="/admin/quanlynguoidung" className="inline-block px-4 py-2 text-white bg-amber-800 rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                           Page Admin
                        </NavLink> : ''}
                     </div>
                  ) : (
                     <div className="inline-block space-x-2">
                        <NavLink to="/user/dangnhap" className="inline-block px-4 py-2 text-center text-white bg-amber-800 rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                           Đăng nhập
                        </NavLink>
                        <NavLink to="/user/dangki" className="inline-block px-4 py-2 text-black bg-white rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                           Đăng kí
                        </NavLink>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </Container>
   )
}

export default Header

const Container = styled.div`
   &.Header{
      .Menu .active{
         &:before{
            content:'';
            position: absolute;
            bottom:-10px;
            height:2px;
            width:50%;
            background-color:#f59e0b;
            left:50%;
            transform:translateX(-50%);
            @media screen and (max-width:1024px) {
               left:0;
               transform:translateX(0);
               bottom: -5px;
            }
         }
      }
   }
`