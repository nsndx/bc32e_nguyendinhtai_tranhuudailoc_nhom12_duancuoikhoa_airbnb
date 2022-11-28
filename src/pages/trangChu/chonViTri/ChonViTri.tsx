import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../stores/configStore';
import { getViTriPhanTrangTimKiem } from '../../../stores/viTri/getViTriPhanTrangTimKiemReducer';

const ChonViTri: React.FC = () => {
   const { register, handleSubmit, reset, setValue } = useForm()
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const { contentGetViTriTimKiem } = useSelector((state: RootState) => state.getViTriPhanTrangTimKiemReducer)
   const [display, setDisplay] = useState('hidden')

   return (
      <div className='container'>
         <div className='ChonViTri border bg-white lg:w-[720px] relative lg:fixed top-3 lg:top-16 lg:z-30 lg:left-1/2 lg:-translate-x-1/2 rounded-full shadow'>
            <form onSubmit={handleSubmit(data => {
               if (data.viTri) {
                  navigate(`/danhsachphong/${data.viTri}`)
               }
            })} className='grid grid-cols-12 pl-8 pr-3 py-2'>
               <div className='col-span-10 md:col-span-5 flex items-start justify-between md:pr-5'>
                  <div className='flex-1'>
                     <p className='m-0 font-bold'>Địa điểm</p>
                     <input {...register('viTriSearch')} autoComplete='off' type="text" placeholder='Bạn sắp đi đâu ?' className='text-base w-full outline-none' onInput={(e) => {
                        if (e.currentTarget.value === '') {
                           setDisplay('hidden')
                           dispatch(getViTriPhanTrangTimKiem(`pageIndex=1&pageSize=100&keyword=''`))
                           setValue('viTri', '')
                        } else {
                           setDisplay('')
                           dispatch(getViTriPhanTrangTimKiem(`pageIndex=1&pageSize=100&keyword=${e.currentTarget.value}`))
                        }
                     }} />
                  </div>
                  <button type='button' className={`${display} bg-gray-300 px-2 font-bold rounded-full hover:bg-gray-500`} onClick={() => {
                     setDisplay('hidden')
                     dispatch(getViTriPhanTrangTimKiem(`pageIndex=1&pageSize=100&keyword=''`))
                     setValue('viTri', '')
                     reset({ viTriSearch: '' })
                  }}>X</button>
               </div>
               <div className='md:col-span-2 border-l border-gray-300 px-3 md:block hidden'>
                  <p className='m-0 font-bold'>Nhận phòng</p>
                  <input disabled type="text" placeholder='Thêm ngày' className='text-base w-full bg-white' />
               </div>
               <div className='md:col-span-2 border-l border-gray-300 px-3 md:block hidden'>
                  <p className='m-0 font-bold'>Trả phòng</p>
                  <input disabled type="text" placeholder='Thêm ngày' className='text-base w-full bg-white' />
               </div>
               <div className='md:col-span-2 border-l border-gray-300 px-3 md:block hidden'>
                  <p className='m-0 font-bold'>Khách</p>
                  <input disabled type="text" placeholder='Thêm khách' className='text-base w-full bg-white' />
               </div>
               <div className='col-span-2 md:col-span-1 flex items-center justify-end'>
                  <button className=' bg-amber-800 rounded-full w-10 h-10 hover:bg-amber-500 transition duration-500'><AiOutlineSearch className='inline-block text-white text-xl' /></button>
               </div>
            </form>
            <div className='absolute bg-white shadow shadow-black/50 w-80 left-1 top-16 rounded-xl overflow-hidden'>
               {contentGetViTriTimKiem?.data.map((vitri, i) => (
                  <button onClick={() => {
                     setValue('viTriSearch', vitri.tenViTri + ', ' + vitri.tinhThanh + ', ' + vitri.quocGia)
                     setValue('viTri', vitri.id)
                     dispatch(getViTriPhanTrangTimKiem(`pageIndex=1&pageSize=100&keyword=''`))
                  }} key={i} className='text-left w-full hover:bg-gray-300 hover:text-amber-800 p-1 text-base transition duration-300'><MdLocationOn className='inline-block text-amber-800 text-xl mb-1' /> {vitri.tenViTri}, {vitri.tinhThanh}, {vitri.quocGia}</button>
               ))}
            </div>
         </div>
      </div>
   )
}

export default ChonViTri