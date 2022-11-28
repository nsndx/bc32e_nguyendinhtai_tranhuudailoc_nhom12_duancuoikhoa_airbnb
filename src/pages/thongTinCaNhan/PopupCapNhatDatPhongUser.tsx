import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { RootState } from '../../stores/configStore'
import { putDatPhongID, putDatPhongIDActions } from '../../stores/datPhong/putDatPhongIDReducer'
import { getPhongThueID, getPhongThueIDActions } from '../../stores/phongThue/getPhongThueIDReducer'
import { getPhongThueTheoViTri, getPhongThueTheoViTriActions } from '../../stores/phongThue/getPhongThueTheoViTriReducer'
import { PhongThue } from '../../types/phongThueTypes'
import { ViTri } from '../../types/viTriTypes'

type Props = {
   setDisplayCapNhatDatPhong: (display: string) => void,
   contentGetViTriAll: ViTri[] | undefined,
   contentGetPhongThueAll: PhongThue[] | undefined,
}

const PopupCapNhatDatPhongUser: React.FC<Props> = (props) => {
   const { register, handleSubmit, reset } = useForm()
   const dispatch = useDispatch<any>()
   const param = useParams()
   const { contentGetPhongThueTheoViTri } = useSelector((state: RootState) => state.getPhongThueTheoViTriReducer)
   const { contentGetPhongThueID } = useSelector((state: RootState) => state.getPhongThueIDReducer)
   const { contentGetDatPhongID } = useSelector((state: RootState) => state.getDatPhongIDReducer)
   const { contentPutDatPhong, errContentPutDatPhong } = useSelector((state: RootState) => state.putDatPhongIDReducer)
   const phongThue = props.contentGetPhongThueAll?.find(phongThue => phongThue.id === contentGetDatPhongID?.maPhong)
   const viTriID = phongThue?.maViTri.toString()
   const dSPhongThueTheoViTri = props.contentGetPhongThueAll?.reduce<PhongThue[]>((dSPhongThueTheoViTri, phongThue) => {
      if (phongThue.maViTri.toString() === viTriID) {
         dSPhongThueTheoViTri.push(phongThue)
      }
      return dSPhongThueTheoViTri
   }, [])
   const [ngayDen, setNgayDen] = useState(0)
   const [ngayDi, setNgayDi] = useState(0)
   const soKhach = (soKhach: number) => {
      let x = []
      for (let i = 0; i < soKhach; i++) {
         x.push(<option key={i} value={i + 1}>{i + 1} Khách</option>)
      }
      return x
   }

   useEffect(() => {
      reset({
         viTri: viTriID,
         maPhong: contentGetDatPhongID?.maPhong,
         ngayDen: moment(contentGetDatPhongID?.ngayDen).format('YYYY-MM-DD'),
         ngayDi: moment(contentGetDatPhongID?.ngayDi).format('YYYY-MM-DD'),
         soLuongKhach: contentGetDatPhongID?.soLuongKhach
      })
      if (contentGetDatPhongID) {
         setNgayDen((new Date(moment(contentGetDatPhongID.ngayDen).format('YYYY-MM-DD'))).getTime())
         setNgayDi((new Date(moment(contentGetDatPhongID.ngayDi).format('YYYY-MM-DD'))).getTime())
      }
   }, [contentGetDatPhongID])

   return (
      <Container className='PopupCapNhatDatPhongUser w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 py-2 px-5 bg-white mx-auto mt-28 shadow '>
         <div className='text-right'>
            <button onClick={() => {
               props.setDisplayCapNhatDatPhong('hidden')
               dispatch(putDatPhongIDActions.removeContentPutDatPhong(''))
               dispatch(getPhongThueTheoViTriActions.removecontentGetPhongThueTheoViTri(''))
               dispatch(getPhongThueIDActions.removeContentGetPhongThueID(''))
            }} className=' px-3 bg-amber-800 text-white hover:bg-amber-500'>X</button>
         </div>
         <div className='h-14'>
            <p className='text-xl text-center font-bold m-0'>Cập nhật đặt phòng</p>
            {contentPutDatPhong ? <p className='text-center text-lg text-green-500 m-0'>Cập nhật đặt phòng thành công!</p> : <p className='text-center text-red-500 m-0'>{errContentPutDatPhong}</p>}
         </div>
         <form onSubmit={handleSubmit(data => {
            delete data.viTri
            data.maPhong = Number(data.maPhong)
            data.ngayDen = moment(data.ngayDen).format('YYYY-MM-DD hh:mm:ss')
            data.ngayDi = moment(data.ngayDi).format('YYYY-MM-DD hh:mm:ss')
            data.soLuongKhach = Number(data.soLuongKhach)
            data.maNguoiDung = Number(param.id)
            if (data.ngayDen > data.ngayDi) {
               alert('Ngày đi không được trước ngày đến')
            } else {
               dispatch(putDatPhongID({ id: contentGetDatPhongID?.id.toString(), data: data }))
            }
         })}>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Vị trí</p>
               <select required {...register('viTri')} className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 cursor-pointer" onChange={(e) => dispatch(getPhongThueTheoViTri(e.target.value))} onClick={() => {
                  dispatch(getPhongThueTheoViTriActions.removecontentGetPhongThueTheoViTri(''))
                  dispatch(getPhongThueIDActions.removeContentGetPhongThueID(''))
               }}>
                  {props.contentGetViTriAll?.map((viTri, i) => (
                     <option key={i} value={viTri.id}>{viTri.tenViTri}, {viTri.tinhThanh}, {viTri.quocGia}</option>
                  ))}
               </select>
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Tên phòng:</p>
               <select required {...register('maPhong')} className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 cursor-pointer" onChange={(e) => dispatch(getPhongThueID(e.target.value))}>
                  {contentGetPhongThueTheoViTri ?
                     <>
                        <option className='hidden'></option>
                        {contentGetPhongThueTheoViTri?.map((phongThue, i) => (
                           <option key={i} value={phongThue.id}>{phongThue.tenPhong}</option>
                        ))}
                     </>
                     : dSPhongThueTheoViTri?.map((phongThue, i) => (
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
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Số lượng khách:</p>
               <select required {...register('soLuongKhach')} className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 cursor-pointer">
                  {contentGetPhongThueID ? soKhach(contentGetPhongThueID?.khach) : phongThue ? soKhach(phongThue?.khach) : ''}
               </select>
            </div>
            
            {ngayDi >= ngayDen && ngayDen !== 0 ?
               <div className='flex justify-between mb-3 text-base font-semibold bg-gray-300 p-2'>
                  <p className='m-0'>Tổng tiền: {contentGetPhongThueID?.giaTien || phongThue?.giaTien}$/ngày <AiOutlineClose className='inline-block mb-1' /> {(ngayDi - ngayDen) / (24 * 3600 * 1000) + 1} ngày</p>
                  <p className='m-0'>{contentGetPhongThueID?.giaTien ? contentGetPhongThueID?.giaTien * ((ngayDi - ngayDen) / (24 * 3600 * 1000) + 1) : phongThue?.giaTien ? phongThue?.giaTien * ((ngayDi - ngayDen) / (24 * 3600 * 1000) + 1) : ''}$</p>
               </div> : ''}

            {contentPutDatPhong ? '' : <div className='text-center'>
               <button className="px-7 py-3 bg-amber-800 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-amber-500 transition duration-300">Cập nhật</button>
            </div>}
         </form>
      </Container>
   )
}

export default PopupCapNhatDatPhongUser

const Container = styled.div`
   &.PopupCapNhatDatPhongUser{
      animation: aniPopupCapNhatDatPhongUser 1s;
      @keyframes aniPopupCapNhatDatPhongUser {
         from{
            transform:translateY(-100%)
         }
         to{ }
      }
   }
`