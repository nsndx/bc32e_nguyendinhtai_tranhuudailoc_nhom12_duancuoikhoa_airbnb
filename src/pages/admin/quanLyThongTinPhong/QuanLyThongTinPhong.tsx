import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { RootState } from '../../../stores/configStore'
import { getPhongThuePhanTrang } from '../../../stores/phongThue/getPhongThuePhanTrangReducer'
import { deletePhongThue, deletePhongThueActions } from '../../../stores/phongThue/deletePhongThueReducer'
import PopupThemPhongThue from './PopupThemPhongThue'
import PopupCapNhatPhongThue from './PopupCapNhatPhongThue'
import { getViTriAll } from '../../../stores/viTri/getViTriAllReuducer'
import { getPhongThueID } from '../../../stores/phongThue/getPhongThueIDReducer'

const QuanLyThongTinPhong: React.FC = () => {
   const { register, handleSubmit, reset } = useForm()
   const dispatch = useDispatch<any>()
   const { contentGetViTriAll } = useSelector((state: RootState) => state.getViTriAllReducer)
   const { contentGetPhongThue } = useSelector((state: RootState) => state.getPhongThuePhanTrangReducer)
   const { messageDeletePhongThue, errMessageDeletePhongThue } = useSelector((state: RootState) => state.deletePhongThueReducer)
   const { contentPostPhongThue } = useSelector((state: RootState) => state.postPhongThueReducer)
   const { contentPutPhongThue } = useSelector((state: RootState) => state.putPhongThueIDReducer)
   const [search, setSearch] = useSearchParams({ keyword: '', pageIndex: '1' })
   const [keyword, setKeyword] = useState('')
   const [display, setDisplay] = useState('hidden')
   const [displayUpdate, setDisplayUpdate] = useState('hidden')

   useEffect(() => {
      dispatch(getViTriAll())
   }, [])
   useEffect(() => {
      dispatch(getPhongThuePhanTrang(`pageIndex=${search.get('pageIndex')}&pageSize=5&keyword=${search.get('keyword')}`))
      if (search.get('keyword') === '') {
         setKeyword('')
         reset({ keyword: '' })
      }
   }, [search, messageDeletePhongThue, contentPostPhongThue, contentPutPhongThue])

   return (
      <Container className='bg-white m-3 p-3 QuanLyThongTinPhong'>
         <p className='font-bold text-xl mb-3'>Quản lý thông tin phòng</p>
         <button onClick={() => setDisplay('')} className='mb-3 py-1 px-3 font-semibold border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white'>Thêm phòng thuê</button>
         <form onSubmit={handleSubmit(data => {
            setSearch({ keyword: data.keyword, pageIndex: '1' }); setKeyword(data.keyword)
         })} className='flex mb-3'>
            <input {...register('keyword')} onInput={(e) => {
               if (e.currentTarget.value === '') {
                  setSearch({ keyword: '', pageIndex: '1', })
               }
            }} type="text" placeholder='Nhập tên phòng thuê' className='border w-full p-1 outline-none' />
            <button className=' bg-amber-800 text-white px-3 hover:bg-amber-500'>search</button>
         </form>
         <table className='w-full mb-3'>
            <thead className='block'>
               <tr className='text-left border-b bg-gray-300 pr-5 pl-3 flex py-1'>
                  <th className='w-10'>ID</th>
                  <th className='w-24'>Hình ảnh</th>
                  <th className='w-24'>Tên phòng</th>
                  <th className='w-[520px]'>Chi tiết</th>
                  <th className='w-20'>Giá tiền</th>
                  <th className='w-20'>Vị trí</th>
                  <th className='flex-1'>Hành động</th>
               </tr>
            </thead>
            <tbody className='block h-[450px] overflow-auto'>
               {contentGetPhongThue?.data.map((phongThue, i) => (
                  <tr key={i} className='border-b text-left flex items-center pl-3 py-2'>
                     <td className='w-10'>{phongThue.id}</td>
                     <td className='w-24'><img src={phongThue.hinhAnh} alt="" className='w-11/12' /></td>
                     <td className='w-24 break-work'>{phongThue.tenPhong}</td>
                     <td className='w-[520px] break-work'>
                        <div>
                           <span>Số khách: {phongThue.khach}</span> - <span>Phòng ngủ: {phongThue.phongNgu}</span> - <span>Số giường: {phongThue.giuong}</span> - <span>Phòng tắm: {phongThue.phongTam}</span>
                        </div>
                        <div>
                           <span>Mô tả: {phongThue.moTa}</span>
                        </div>
                        <div>
                           <span>Tiện nghi: </span>
                           <span>{phongThue.mayGiat ? 'Máy giặt, ' : ''}</span>
                           <span>{phongThue.banLa ? 'Bàn là, ' : ''}</span>
                           <span>{phongThue.tivi ? 'Tivi, ' : ''}</span>
                           <span>{phongThue.dieuHoa ? 'Điều hoà, ' : ''}</span>
                           <span>{phongThue.wifi ? 'Wifi, ' : ''}</span>
                           <span>{phongThue.bep ? 'Bếp, ' : ''}</span>
                           <span>{phongThue.doXe ? 'Đỗ xe, ' : ''}</span>
                           <span>{phongThue.hoBoi ? 'Hồ bơi, ' : ''}</span>
                           <span>{phongThue.banUi ? 'Bàn ủi, ' : ''}</span>
                        </div>
                     </td>
                     <td className='w-20 break-work'>{phongThue.giaTien}$</td>
                     <td className='w-20 break-work'>{(() => {
                        const viTri = contentGetViTriAll?.find(viTri => viTri.id === phongThue.maViTri)
                        return <div>
                           <p className='m-0'>{viTri?.tenViTri}</p>
                           <p className='m-0'>{viTri?.tinhThanh}</p>
                           <p className='m-0'>{viTri?.quocGia}</p>
                        </div>
                     })()}</td>
                     <td className='flex-1 space-x-2'>
                        <button onClick={() => {
                           dispatch(getPhongThueID(phongThue.id.toString()))
                           setDisplayUpdate('')
                        }} className='bg-green-800 p-1 rounded-md shadow text-white hover:bg-green-500'>sửa</button>
                        <button onClick={() => dispatch(deletePhongThue(phongThue.id.toString()))} className='bg-red-800 p-1 rounded-md shadow text-white hover:bg-red-500'>Xoá</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <div>
            <Pagination defaultPageSize={5} total={contentGetPhongThue?.totalRow} current={Number(search.get('pageIndex'))} onChange={(page, pageSize) => {
               setSearch({ keyword: keyword, pageIndex: page.toString() })
            }} />
         </div>

         {messageDeletePhongThue || errMessageDeletePhongThue ?
            <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/40'>
               <div className='w-80 h-40 bg-white mx-auto mt-40 shadow flex flex-col justify-center items-center'>
                  <p className='text-xl text-center text-green-500'>{messageDeletePhongThue || errMessageDeletePhongThue}</p>
                  <button onClick={() => dispatch(deletePhongThueActions.removeMessageDeletePhongThue(''))} className=' py-3 px-7 rounded-lg bg-amber-800 text-white hover:bg-amber-500'>OK</button>
               </div>
            </div> : ''
         }

         <div className={`${display} fixed top-0 bottom-0 left-0 right-0 bg-black/50`}>
            <PopupThemPhongThue setDisplay={setDisplay} contentGetViTriAll={contentGetViTriAll} />
         </div>

         <div className={`${displayUpdate} fixed top-0 bottom-0 left-0 right-0 bg-black/50`}>
            <PopupCapNhatPhongThue setDisplayUpdate={setDisplayUpdate} contentGetViTriAll={contentGetViTriAll} />
         </div>
      </Container>
   )
}

export default QuanLyThongTinPhong

const Container = styled.div`
   &.QuanLyThongTinPhong{
      .anticon{
         vertical-align:0;
      }
      .ant-pagination-item-active{
         border-color:#92400e;
      }
      .ant-pagination-item-active a{
         color:#92400e;
      }
      .ant-pagination-item:hover{
         border-color:#92400e;
      }
      .ant-pagination-item:hover a{
         color:#92400e;
      }
      .ant-pagination-next:hover .ant-pagination-item-link, .ant-pagination-prev:hover .ant-pagination-item-link{
         border-color:#92400e;
         color:#92400e;
      }
   }
`