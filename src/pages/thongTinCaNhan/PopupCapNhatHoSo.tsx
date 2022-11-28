import moment from 'moment'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../stores/configStore'
import { putUserIDActions, putUsersID } from '../../stores/nguoiDung/putUserIDReducer'
import { NguoiDung } from '../../types/nguoiDungTypes'

type Props = {
   setDisplayCapNhatHoSo: (display: string) => void,
   contentGetUsersID: NguoiDung | undefined
}

const PopupCapNhatHoSo: React.FC<Props> = (props) => {
   const { register, handleSubmit, reset } = useForm()
   const dispatch = useDispatch<any>()
   const { contentPutUser, errContentPutUser } = useSelector((state: RootState) => state.putUserIDReducer)

   useEffect(() => {
      reset({
         name: props.contentGetUsersID?.name,
         birthday: moment(props.contentGetUsersID?.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'),
         email: props.contentGetUsersID?.email,
         phone: props.contentGetUsersID?.phone,
         gender: props.contentGetUsersID?.gender ? 'true' : 'false',
      })
   }, [props.contentGetUsersID])

   return (
      <Container className='PopupCapNhatNguoiDung w-11/12 sm:w-2/3 lg:w-1/3 py-2 px-5 bg-white mx-auto mt-28 shadow'>
         <div className='text-right'>
            <button onClick={() => {
               props.setDisplayCapNhatHoSo('hidden')
               dispatch(putUserIDActions.removeContentPutUser(''))
            }} className=' px-3 bg-amber-800 text-white hover:bg-amber-500'>X</button>
         </div>
         <div className='h-20'>
            <p className='text-xl text-center font-bold m-0'>Cập nhật hồ sơ người dùng {props.contentGetUsersID?.name}</p>
            {contentPutUser ? <p className='text-center text-lg text-green-500 m-0'>Cập nhật hồ sơ thành công!</p> : <p className='text-center text-red-500 m-0'>{errContentPutUser}</p>}
         </div>
         <form onSubmit={handleSubmit(data => {
            data.gender === 'true' ? data.gender = true : data.gender = false
            data.birthday = moment(data.birthday).format('DD/MM/YYYY')
            data.role = props.contentGetUsersID?.role
            dispatch(putUsersID({ id: props.contentGetUsersID?.id.toString(), data: data }))
         })}>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Họ tên:</p>
               <input required {...register('name')} type="text" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
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
            {contentPutUser ? '' : <div className='text-center'>
               <button className="px-7 py-3 bg-amber-800 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-amber-500 transition duration-300">Cập nhật</button>
            </div>}
         </form>
      </Container>
   )
}

export default PopupCapNhatHoSo

const Container = styled.div`
   &.PopupCapNhatNguoiDung{
      input[type=number]::-webkit-inner-spin-button { 
         appearance: none;
      }
      animation: aniPopupCapNhatHoSo 1s;
      @keyframes aniPopupCapNhatHoSo {
         from{
            transform:translateY(-100%)
         }
         to{ }
      }
   }
`