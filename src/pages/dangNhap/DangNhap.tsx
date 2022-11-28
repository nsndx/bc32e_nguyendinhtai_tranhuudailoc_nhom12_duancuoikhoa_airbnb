import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { dangNhap, dangNhapActions } from '../../stores/auth/dangNhapReducer';
import { RootState } from '../../stores/configStore';

const DangNhap: React.FC = () => {
   const { register, handleSubmit } = useForm();
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const { contentDangNhap, errContentDangNhap } = useSelector((state: RootState) => state.dangNhapReducer)
   const { contentDangKi } = useSelector((state: RootState) => state.dangKiReducer)

   useEffect(() => {
      if (contentDangNhap) {
         if (contentDangKi) {
            navigate('/trangchu')
         } else {
            navigate(-1)
         }
      }
   })
   useEffect(() => {
      dispatch(dangNhapActions.removeContentDangNhap(''))
   }, [])

   return (
      <section className="h-screen">
         <div className="px-6 h-full text-gray-800">
            <div className="flex xl:justify-center lg:justify-between justify-center flex-wrap h-full g-6">
               <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 mt-10">
                  <p className="text-xl mb-5 font-bold">Đăng nhập tài khoản</p>
                  <form onSubmit={handleSubmit((data) => {
                     dispatch(dangNhap(data))
                  })}>
                     <div className="mb-6">
                        <p className="m-0 font-bold">Email</p>
                        <input {...register("email")} type="text" className="text-lg border border-gray-500 w-full focus:outline-none p-2 rounded-lg focus:border-blue-600 " />
                     </div>
                     <div className="mb-6">
                        <p className="m-0 font-bold">Mật khẩu</p>
                        <input {...register("password")} type="password" className="text-lg border border-gray-500 w-full focus:outline-none p-2 rounded-lg focus:border-blue-600 " />
                     </div>

                     <div className="text-center lg:text-left">
                        <button className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-800 transition duration-300">
                           Đăng nhập
                        </button>
                        <span className="inline-block ml-3 text-red-500">{errContentDangNhap}</span>
                        <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                           <span> Nếu chưa có tài khoản bấm </span>
                           <NavLink to="/user/dangki" className="text-lg text-red-600 hover:text-red-800 focus:text-red-700 transition duration-300 ease-in-out">
                              Đăng ký!
                           </NavLink>
                        </p>
                     </div>
                  </form>
               </div>
               <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 md:mb-0">
                  <img
                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                     className="w-full"
                     alt="..."
                  />
               </div>
            </div>
         </div>
      </section>
   )
}

export default DangNhap