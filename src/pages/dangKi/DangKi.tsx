import React, { useEffect } from 'react'
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/configStore';
import { dangKi, dangKiActions } from '../../stores/auth/dangKiReducer';
import { useNavigate } from 'react-router-dom';

const DangKi: React.FC = () => {
   const { register, handleSubmit } = useForm();
   const dispatch = useDispatch<any>()
   const { contentDangKi, errContentDangKi } = useSelector((state: RootState) => state.dangKiReducer)
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(dangKiActions.removeContentDangKi(''))
   }, [])

   return (
      <section className="h-screen">
         <div className="px-6 h-full text-gray-800">
            <div className="flex xl:justify-center lg:justify-between justify-center flex-wrap h-full g-6">
               <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 mt-10">
                  <p className="text-xl mb-5 font-bold">Đăng kí tài khoản</p>
                  <form onSubmit={handleSubmit(data => {
                     data.gender === 'true' ? data.gender = true : data.gender = false
                     data.birthday = moment(data.birthday).format('DD/MM/YYYY')
                     data.role = 'USER'
                     dispatch(dangKi(data))
                  })}>
                     <div className='mb-2'>
                        <p className='m-0 font-bold'>Họ tên</p>
                        <input required disabled={contentDangKi ? true : false} {...register('name')} type="text" className="text-base border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
                     </div>
                     <div className='mb-2'>
                        <p className='m-0 font-bold'>Mật khẩu</p>
                        <input required disabled={contentDangKi ? true : false} {...register('password')} type="password" className="text-base border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
                     </div>
                     <div className='mb-2'>
                        <p className='m-0 font-bold'>Ngày tháng năm sinh:</p>
                        <input required disabled={contentDangKi ? true : false} {...register('birthday')} type="date" className="text-base border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
                     </div>
                     <div className='mb-2'>
                        <p className='m-0 font-bold'>Email:</p>
                        <input required disabled={contentDangKi ? true : false} {...register('email')} type="email" className="text-base border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
                     </div>
                     <div className='mb-2'>
                        <p className='m-0 font-bold'>Điện thoại:</p>
                        <input required disabled={contentDangKi ? true : false} {...register('phone')} type="number" className="text-base border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
                     </div>
                     <div className='mb-2'>
                        <p className='m-0 font-bold'>Giới tính:</p>
                        <select disabled={contentDangKi ? true : false} {...register('gender')} className="text-base border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " >
                           <option value='true'>Nam</option>
                           <option value="false">Nữ</option>
                        </select>
                     </div>

                     <div className="text-center lg:text-left mt-5">
                        {contentDangKi ?
                           <div>
                              <span className='mr-3 text-xl text-green-500'>Đăng kí thành công hãy đến trang:</span>
                              <button type='button' onClick={() => {
                                 navigate('/user/dangNhap')
                              }} className="text-xl font-bold text-blue-800 hover:text-blue-600">Đăng nhập!</button>
                           </div>
                           :
                           <div>
                              <button className="px-7 py-3 bg-blue-800 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-600 transition duration-300">Đăng kí</button>
                              <span className='ml-3 text-xl text-red-500'>{errContentDangKi}</span>
                           </div>
                        }
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

export default DangKi