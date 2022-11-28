import React, { useState } from 'react'
import { PhongThue } from '../../types/phongThueTypes'
import { UserLogin } from '../../utils/constants/api'
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RootState } from '../../stores/configStore';
import moment from 'moment';
import { postDatPhong, postDatPhongActions } from '../../stores/datPhong/postDatPhongReducer';
import { useNavigate } from 'react-router-dom';

type Props = {
   contentGetPhongThueID: PhongThue | undefined
}

const DatPhong: React.FC<Props> = (props) => {
   const { register, handleSubmit, reset } = useForm()
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const nguoiDungJson = localStorage.getItem(UserLogin)
   const nguoiDung = typeof nguoiDungJson === 'string' ? JSON.parse(nguoiDungJson) : undefined
   const { contentPostDatPhong } = useSelector((state: RootState) => state.postDatPhongReducer)
   const [ngayDen, setNgayDen] = useState(0)
   const [ngayDi, setNgayDi] = useState(0)
   const soKhach = (soKhach: number) => {
      let x = []
      for (let i = 0; i < soKhach; i++) {
         x.push(<option key={i} value={i + 1}>{i + 1} Khách</option>)
      }
      return x
   }

   return (
      <div>
         <div className='flex justify-between items-end'>
            <p><span className='text-2xl font-semibold text-amber-800'>{props.contentGetPhongThueID?.giaTien}$</span> <span className='text-base'>/ ngày</span></p>
            <p><AiFillStar className='inline-block mb-[3px] text-red-500' /> <span className='font-bold'>4,5</span> <span className='underline'>(18 đánh giá)</span></p>
         </div>
         <form onSubmit={handleSubmit(data => {
            data.maPhong = props.contentGetPhongThueID?.id
            data.ngayDen = moment(data.ngayDen).format('YYYY-MM-DD hh:mm:ss')
            data.ngayDi = moment(data.ngayDi).format('YYYY-MM-DD hh:mm:ss')
            data.soLuongKhach = Number(data.soLuongKhach)
            data.maNguoiDung = nguoiDung.id
            if (data.ngayDen > data.ngayDi) {
               alert('Ngày trả phòng không được trước ngày nhận phòng')
            } else {
               dispatch(postDatPhong(data))
            }
         })} className='pb-5' >
            <div className='mb-5 border border-gray-300 rounded-xl'>
               <div className='flex'>
                  <div className='w-1/2 border-r border-gray-300 px-3 py-2'>
                     <p className='m-0 font-semibold pr-2 text-amber-800'>Nhận phòng</p>
                     <input required {...register('ngayDen')} onChange={(e) => {
                        let ngayDen = (new Date(e.target.value)).getTime()
                        setNgayDen(ngayDen)
                     }} type="date" className="w-full text-base flex-1 focus:outline-none py-[2px]" />
                  </div>
                  <div className='w-1/2 px-3 py-2'>
                     <p className='m-0 font-semibold text-amber-800'>Trả phòng</p>
                     <input required {...register('ngayDi')} onChange={(e) => {
                        let ngayDi = (new Date(e.target.value)).getTime()
                        setNgayDi(ngayDi)
                     }} type="date" className="w-full text-base flex-1 focus:outline-none py-[2px]" />
                  </div>
               </div>
               <div className='px-3 py-2 border-t border-gray-300'>
                  <p className='m-0 font-semibold text-amber-800'>Số lượng khách:</p>
                  <select required {...register('soLuongKhach')} className="w-full text-base focus:outline-none py-[2px] cursor-pointer">
                     <option value=""></option>
                     {props.contentGetPhongThueID?.khach ? soKhach(props.contentGetPhongThueID?.khach) : ''}
                  </select>
               </div>
            </div>
            <div>
               <button onClick={() => {
                  if (!nguoiDung) {
                     navigate('/user/dangnhap')
                  }
               }} className="w-full px-7 py-3 bg-amber-800 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-amber-500 transition duration-300">Đặt phòng</button>
            </div>
         </form>
         {ngayDi >= ngayDen && ngayDen !== 0 ?
            <div className='flex justify-between pb-3 text-base font-semibold'>
               <p className='m-0'>{props.contentGetPhongThueID?.giaTien}$ <AiOutlineClose className='inline-block mb-1' /> {(ngayDi - ngayDen) / (24 * 3600 * 1000) + 1} ngày</p>
               <p className='m-0 text-amber-800'>{props.contentGetPhongThueID?.giaTien ? props.contentGetPhongThueID?.giaTien * ((ngayDi - ngayDen) / (24 * 3600 * 1000) + 1) : ''}$</p>
            </div> : ''}
         <div className='flex justify-between pt-3 border-t text-xl'>
            <p className='font-bold m-0'>Tổng tiền</p>
            {ngayDi >= ngayDen && ngayDen !== 0? props.contentGetPhongThueID?.giaTien ? <p className='font-bold m-0 text-amber-800'>{props.contentGetPhongThueID?.giaTien * ((ngayDi - ngayDen) / (24 * 3600 * 1000) + 1)}$</p> : '' :''}            
         </div>
         {contentPostDatPhong ?
            <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/40'>
               <div className='w-80 h-40 bg-white mx-auto mt-40 shadow flex flex-col justify-center items-center'>
                  <p className='text-xl text-center text-green-500'>Đặt phòng thành công</p>
                  <button onClick={() => {
                     dispatch(postDatPhongActions.removeContentPostDatPhong(''))
                     reset({
                        ngayDen: '',
                        ngayDi: '',
                        soLuongKhach: ''
                     })
                     setNgayDen(0)
                     setNgayDi(0)
                  }} className=' py-3 px-7 rounded-lg bg-amber-800 text-white hover:bg-amber-500'>OK</button>
               </div>
            </div> : ''
         }
      </div>
   )
}

export default DatPhong