import moment from 'moment'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../../stores/configStore'
import { postUser, postUserActions } from '../../../stores/nguoiDung/postUserReducer'

type Props = {
   setDisplay: (display: string) => void
}

const PopupThemNguoiDung: React.FC<Props> = (props) => {
   const { register, handleSubmit, reset } = useForm()
   const dispatch = useDispatch<any>()
   const { contentPostUser, errContentPostUser } = useSelector((state: RootState) => state.postUserReducer)

   return (
      <Container className='PopupThemNguoiDung w-1/3 py-2 px-5 bg-white mx-auto mt-10 shadow '>
         <div className='text-right'>
            <button onClick={() => {
               props.setDisplay('hidden')
               dispatch(postUserActions.removeContentPostUser(''))
               reset({
                  name: '',
                  email: '',
                  password: '',
                  phone: '',
                  birthday: '',
                  gender: 'true',
                  role: 'ADMIN',
               })
            }} className=' px-3 bg-amber-800 text-white hover:bg-amber-500'>X</button>
         </div>
         <div className='h-14'>
            <p className='text-xl text-center font-bold m-0'>Thêm người dùng</p>
            {contentPostUser ? <p className='text-center text-lg text-green-500 m-0'>Thêm người dùng thành công!</p> : <p className='text-center text-red-500 m-0'>{errContentPostUser}</p>}
         </div>
         <form onSubmit={handleSubmit(data => {
            data.gender === 'true' ? data.gender = true : data.gender = false
            data.birthday = moment(data.birthday).format('DD/MM/YYYY')
            dispatch(postUser(data))
         })}>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Họ tên:</p>
               <input required {...register('name')} type="text" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Mật khẩu:</p>
               <input required {...register('password')} type="password" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Ngày tháng năm sinh:</p>
               <input required {...register('birthday')} type="date" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Email:</p>
               <input required {...register('email')} type="email" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Điện thoại:</p>
               <input required {...register('phone')} type="number" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Giới tính:</p>
               <select {...register('gender')} className="w-full cursor-pointer border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 ">
                  <option value='true'>Nam</option>
                  <option value="false">Nữ</option>
               </select>
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Loại người dùng:</p>
               <select {...register('role')} className="w-full cursor-pointer border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 ">
                  <option value='ADMIN'>ADMIN</option>
                  <option value='USER'>USER</option>
               </select>
            </div>
            
            {contentPostUser ? '' : <div className='text-center'>
               <button className="px-7 py-3 bg-amber-800 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-amber-500 transition duration-300">Thêm</button>
            </div>}
         </form>
      </Container>
   )
}

export default PopupThemNguoiDung

const Container = styled.div`
   &.PopupThemNguoiDung{
      input[type=number]::-webkit-inner-spin-button { 
         appearance: none;
      }
      animation: aniPopupThemNguoiDung 1s ;
      @keyframes aniPopupThemNguoiDung {
         from{
            transform:translateY(-100%)
         }
         to{ }
      }
   }
`