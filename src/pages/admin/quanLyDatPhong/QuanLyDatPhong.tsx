import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../stores/configStore'
import { deleteDatPhong, deleteDatPhongActions } from '../../../stores/datPhong/deleteDatPhongReducer'
import { getDatPhongTheoMaNguoiDung } from '../../../stores/datPhong/getDatPhongTheoMaNguoiDungReducer'
import { getUsersID } from '../../../stores/nguoiDung/getUsersIDReducer'
import { getPhongThueAll } from '../../../stores/phongThue/getPhongThueAllReducer'
import { getViTriAll } from '../../../stores/viTri/getViTriAllReuducer'
import PopupDatPhong from './PopupDatPhong'
import PopupCapNhatDatPhong from './PopupCapNhatDatPhong'
import { getDatPhongID } from '../../../stores/datPhong/getDatPhongIDReducer'

const QuanLyDatPhong: React.FC = () => {
   const param = useParams()
   const dispatch = useDispatch<any>()
   const { contentGetViTriAll } = useSelector((state: RootState) => state.getViTriAllReducer)
   const { contentGetPhongThueAll } = useSelector((state: RootState) => state.getPhongThueAllReducer)
   const { contentGetDatPhongTheoMaNguoiDung } = useSelector((state: RootState) => state.getDatPhongTheoMaNguoiDungReducer)
   const { contentGetUsersID } = useSelector((state: RootState) => state.getUsersIDReducer)
   const { messageDeleteDatPhong, errMessageDeleteDatPhong } = useSelector((state: RootState) => state.deleteDatPhongReducer)
   const { contentPostDatPhong } = useSelector((state: RootState) => state.postDatPhongReducer)
   const { contentPutDatPhong } = useSelector((state: RootState) => state.putDatPhongIDReducer)
   const [display, setDisplay] = useState('hidden')
   const [displayUpdate, setDisplayUpdate] = useState('hidden')

   useEffect(() => {
      dispatch(getUsersID(param.id))
      dispatch(getViTriAll())
      dispatch(getPhongThueAll())
   }, [])
   useEffect(() => {
      dispatch(getDatPhongTheoMaNguoiDung(param.id))
   }, [messageDeleteDatPhong, contentPostDatPhong, contentPutDatPhong])

   return (
      <div className='bg-white m-3 p-3'>
         <p className='font-bold text-xl mb-3'>Quản lý đặt phòng người dùng {contentGetUsersID?.id}</p>
         <div className='flex mb-3'>
            <div>
               <img src={contentGetUsersID?.avatar} alt="..." className='w-24 h-24 bg-gray-300' />
            </div>
            <div className='pl-10 flex flex-col justify-between'>
               <p className='m-0'>Họ tên: {contentGetUsersID?.name}</p>
               <p className='m-0'>Ngày sinh: {contentGetUsersID?.birthday}</p>
               <p className='m-0'>Giới tính: {contentGetUsersID?.gender === true ? 'Nam' : 'Nữ'}</p>
            </div>
            <div className='pl-10 flex flex-col justify-between'>
               <p className='m-0'>Loại người dùng: {contentGetUsersID?.role}</p>
               <p className='m-0'>Số điện thoại: {contentGetUsersID?.phone}</p>
               <p className='m-0'>Email: {contentGetUsersID?.email}</p>
            </div>
         </div>
         <button onClick={() => setDisplay('')} className='mb-3 py-1 px-3 font-semibold border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white'>Đặt phòng</button>
         <table className='w-full mb-3'>
            <thead className='block'>
               <tr className='text-left border-b bg-gray-300 pr-5 pl-3 flex py-1'>
                  <th className='w-10'>ID</th>
                  <th className='w-20'>Mã phòng</th>
                  <th className='w-56'>Phòng đặt</th>
                  <th className='w-24'>Vị trí</th>
                  <th className='w-24'>Ngày đến</th>
                  <th className='w-24'>Ngày đi</th>
                  <th className='w-28'>Số khách đặt</th>
                  <th className='w-20'>Mã User</th>
                  <th className='w-20'>Tổng tiền</th>
                  <th className='flex-1'>Hành động</th>
               </tr>
            </thead>
            <tbody className='block h-[420px] overflow-auto'>
               {contentGetDatPhongTheoMaNguoiDung?.map((datPhong, i) => (
                  <tr key={i} className='border-b text-left flex items-center pl-3 py-2'>
                     <td className='w-10'>{datPhong.id}</td>
                     <td className='w-20 break-words'>{datPhong.maPhong}</td>
                     <td className='w-56 break-words'>{(() => {
                        const phongThue = contentGetPhongThueAll?.find(phongThue => phongThue.id === datPhong.maPhong)
                        return <div>
                           <p className='m-0'>Tên phòng: {phongThue?.tenPhong}</p>
                           <p className='m-0'>Số khách: {phongThue?.khach}</p>
                           <p className='m-0'>Giá tiền: {phongThue?.giaTien}$/ngày</p>
                        </div>
                     })()}</td>
                     <td className='w-24 break-words'>{(() => {
                        const phongThue = contentGetPhongThueAll?.find(phongThue => phongThue.id === datPhong.maPhong)
                        const viTri = contentGetViTriAll?.find(viTri => viTri.id === phongThue?.maViTri)
                        return <div>
                           <p className='m-0'>{viTri?.tenViTri}</p>
                           <p className='m-0'>{viTri?.tinhThanh}</p>
                           <p className='m-0'>{viTri?.quocGia}</p>
                        </div>
                     })()}</td>
                     <td className='w-24 break-words'>{moment(datPhong.ngayDen).format('DD/MM/YYYY')}</td>
                     <td className='w-24 break-words'>{moment(datPhong.ngayDi).format('DD/MM/YYYY')}</td>
                     <td className='w-28 break-words'>{datPhong.soLuongKhach}</td>
                     <td className='w-20 break-words'>{datPhong.maNguoiDung}</td>
                     <td className='w-20 break-words'>{(() => {
                        const phongThue = contentGetPhongThueAll?.find(phongThue => phongThue.id === datPhong.maPhong)
                        let ngayDen = (new Date(datPhong.ngayDen)).getTime()
                        let ngayDi = (new Date(datPhong.ngayDi)).getTime()
                        return phongThue?.giaTien ? ((ngayDi - ngayDen) / (24 * 3600 * 1000) + 1) * phongThue?.giaTien : ''
                     })()}$</td>
                     <td className='flex-1 space-x-1'>
                        <button onClick={() => {
                           dispatch(getDatPhongID(datPhong.id.toString()))
                           setDisplayUpdate('')
                        }} className='bg-green-800 p-1 rounded-md shadow text-white hover:bg-green-500'>sửa</button>
                        <button onClick={() => dispatch(deleteDatPhong(datPhong.id.toString()))} className='bg-red-800 p-1 rounded-md shadow text-white hover:bg-red-500'>Xoá</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         {messageDeleteDatPhong || errMessageDeleteDatPhong ?
            <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/40'>
               <div className='w-80 h-40 bg-white mx-auto mt-40 shadow flex flex-col justify-center items-center'>
                  <p className='text-xl text-center text-green-500'>{messageDeleteDatPhong || errMessageDeleteDatPhong}</p>
                  <button onClick={() => dispatch(deleteDatPhongActions.removeMessageDeleteDatPhong(''))} className=' py-3 px-7 rounded-lg bg-amber-800 text-white hover:bg-amber-500'>OK</button>
               </div>
            </div> : ''
         }

         <div className={`${display} fixed top-0 bottom-0 left-0 right-0 bg-black/50`}>
            <PopupDatPhong setDisplay={setDisplay} maNguoiDung={param.id} contentGetViTriAll={contentGetViTriAll} />
         </div>
         
         <div className={`${displayUpdate} fixed top-0 bottom-0 left-0 right-0 bg-black/50`}>
            <PopupCapNhatDatPhong setDisplayUpdate={setDisplayUpdate} maNguoiDung={param.id} contentGetViTriAll={contentGetViTriAll} contentGetPhongThueAll={contentGetPhongThueAll} />
         </div>
      </div>
   )
}

export default QuanLyDatPhong