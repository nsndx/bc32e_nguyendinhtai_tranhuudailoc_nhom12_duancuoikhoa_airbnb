import moment from 'moment'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../../stores/configStore'
import { postDatPhong, postDatPhongActions } from '../../../stores/datPhong/postDatPhongReducer'
import { getPhongThueID, getPhongThueIDActions } from '../../../stores/phongThue/getPhongThueIDReducer'
import { getPhongThueTheoViTri, getPhongThueTheoViTriActions } from '../../../stores/phongThue/getPhongThueTheoViTriReducer'
import { ViTri } from '../../../types/viTriTypes'

type Props = {
   setDisplay: (display: string) => void,
   maNguoiDung: string | undefined,
   contentGetViTriAll: ViTri[] | undefined
}

const PopupDatPhong: React.FC<Props> = (props) => {
   const { register, handleSubmit, reset } = useForm()
   const dispatch = useDispatch<any>()
   const { contentGetPhongThueTheoViTri } = useSelector((state: RootState) => state.getPhongThueTheoViTriReducer)
   const { contentGetPhongThueID } = useSelector((state: RootState) => state.getPhongThueIDReducer)
   const { contentPostDatPhong, errContentPostDatPhong } = useSelector((state: RootState) => state.postDatPhongReducer)
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
      <Container className='PopupDatPhong w-1/3 py-2 px-5 bg-white mx-auto mt-10 shadow '>
         <div className='text-right'>
            <button onClick={() => {
               props.setDisplay('hidden')
               dispatch(postDatPhongActions.removeContentPostDatPhong(''))
               dispatch(getPhongThueTheoViTriActions.removecontentGetPhongThueTheoViTri(''))
               dispatch(getPhongThueIDActions.removeContentGetPhongThueID(''))
               reset({
                  viTri: '',
                  maPhong: '',
                  ngayDen: '',
                  ngayDi: '',
                  soLuongKhach: ''
               })
               setNgayDen(0)
               setNgayDi(0)
            }} className=' px-3 bg-amber-800 text-white hover:bg-amber-500'>X</button>
         </div>
         <div className='h-14'>
            <p className='text-xl text-center font-bold m-0'>Đặt phòng</p>
            {contentPostDatPhong ? <p className='text-center text-lg text-green-500 m-0'>Đặt phòng thành công!</p> : <p className='text-center text-red-500 m-0'>{errContentPostDatPhong}</p>}
         </div>
         <form onSubmit={handleSubmit(data => {
            delete data.viTri
            data.maPhong = Number(data.maPhong)
            data.ngayDen = moment(data.ngayDen).format('YYYY-MM-DD hh:mm:ss')
            data.ngayDi = moment(data.ngayDi).format('YYYY-MM-DD hh:mm:ss')
            data.soLuongKhach = Number(data.soLuongKhach)
            data.maNguoiDung = Number(props.maNguoiDung)
            if (data.ngayDen > data.ngayDi) {
               alert('Ngày đi không được trước ngày đến')
            } else {
               dispatch(postDatPhong(data))
            }
         })}>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Chọn vị trí</p>
               <select required {...register('viTri')} className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 cursor-pointer" onChange={(e) => dispatch(getPhongThueTheoViTri(e.target.value))} onClick={() => {
                  dispatch(getPhongThueTheoViTriActions.removecontentGetPhongThueTheoViTri(''))
                  dispatch(getPhongThueIDActions.removeContentGetPhongThueID(''))
               }}>
                  <option className='hidden'></option>
                  {props.contentGetViTriAll?.map((viTri, i) => (
                     <option key={i} value={viTri.id}>{viTri.tenViTri}, {viTri.tinhThanh}, {viTri.quocGia}</option>
                  ))}
               </select>
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Chọn tên phòng:</p>
               <select required {...register('maPhong')} className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 cursor-pointer" onChange={(e) => dispatch(getPhongThueID(e.target.value))}>
                  <option className='hidden'></option>
                  {contentGetPhongThueTheoViTri?.map((phongThue, i) => (
                     <option key={i} value={phongThue.id}>{phongThue.tenPhong}</option>
                  ))}
               </select>
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Ngày đến:</p>
               <input required {...register('ngayDen')} type="date" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " onChange={(e) => {
                  let ngayDen = (new Date(e.target.value)).getTime()
                  setNgayDen(ngayDen)
               }} />
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Ngày đi:</p>
               <input required {...register('ngayDi')} type="date" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " onChange={(e) => {
                  let ngayDi = (new Date(e.target.value)).getTime()
                  setNgayDi(ngayDi)
               }} />
            </div>
            <div className='mb-3'>
               <p className='m-0 font-semibold'>Số lượng khách:</p>
               <select required {...register('soLuongKhach')} className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 cursor-pointer">
                  {contentGetPhongThueID?.khach ? soKhach(contentGetPhongThueID?.khach) : ''}
               </select>
            </div>
            
            {ngayDi >= ngayDen && ngayDen !== 0 ?
               <div className='flex justify-between mb-3 text-base font-semibold bg-gray-300 p-2'>
                  <p className='m-0'>Tổng tiền: {contentGetPhongThueID?.giaTien}$/ngày <AiOutlineClose className='inline-block mb-1' /> {(ngayDi - ngayDen) / (24 * 3600 * 1000) + 1} ngày</p>
                  <p className='m-0'>{contentGetPhongThueID?.giaTien ? contentGetPhongThueID?.giaTien * ((ngayDi - ngayDen) / (24 * 3600 * 1000) + 1) : ''}$</p>
               </div> : ''}

            {contentPostDatPhong ? '' : <div className='text-center'>
               <button className="px-7 py-3 bg-amber-800 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-amber-500 transition duration-300">Đặt phòng</button>
            </div>}
         </form>
      </Container>
   )
}

export default PopupDatPhong

const Container = styled.div`
   &.PopupDatPhong{
      animation: aniPopupDatPhong 1s ;
      @keyframes aniPopupDatPhong {
         from{
            transform:translateY(-100%)
         }
         to{ }
      }
   }
`