import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { RootState } from '../../../stores/configStore'
import PopupThemViTri from './PopupThemViTri'
import PopupCapNhatViTri from './PopupCapNhatViTri'
import { getViTriPhanTrang } from '../../../stores/viTri/getViTriPhanTrangReducer'
import { getViTriID } from '../../../stores/viTri/getViTriIDReducer'
import { deleteViTri, deleteViTriActions } from '../../../stores/viTri/deleteViTriReducer'

const QuanLyThongTinViTri: React.FC = () => {
   const { register, handleSubmit, reset } = useForm()
   const dispatch = useDispatch<any>()
   const { contentGetViTri } = useSelector((state: RootState) => state.getViTriPhanTrangReducer)
   const { messageDeleteViTri, errMessageDeleteViTri } = useSelector((state: RootState) => state.deleteViTriReducer)
   const { contentPostViTri } = useSelector((state: RootState) => state.postViTriReducer)
   const { contentPutViTri } = useSelector((state: RootState) => state.putViTriIDReducer)
   const [search, setSearch] = useSearchParams({ keyword: '', pageIndex: '1' })
   const [keyword, setKeyword] = useState('')
   const [display, setDisplay] = useState('hidden')
   const [displayUpdate, setDisplayUpdate] = useState('hidden')

   useEffect(() => {
      dispatch(getViTriPhanTrang(`pageIndex=${search.get('pageIndex')}&pageSize=5&keyword=${search.get('keyword')}`))
      if (search.get('keyword') === '') {
         setKeyword('')
         reset({ keyword: '' })
      }
   }, [search, messageDeleteViTri, contentPostViTri, contentPutViTri])

   return (
      <Container className='bg-white m-3 p-3 QuanLyThongTinViTri'>
         <p className='font-bold text-xl mb-3'>Quản lý thông tin vị trí</p>
         <button onClick={() => setDisplay('')} className='mb-3 py-1 px-3 font-semibold border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white'>Thêm vị trí</button>
         <form onSubmit={handleSubmit(data => {
            setSearch({ keyword: data.keyword, pageIndex: '1' }); setKeyword(data.keyword)
         })} className='flex mb-3'>
            <input {...register('keyword')} onInput={(e) => {
               if (e.currentTarget.value === '') {
                  setSearch({ keyword: '', pageIndex: '1', })
               }
            }} type="text" placeholder='Nhập tên vị trí' className='border w-full p-1 outline-none' />
            <button className=' bg-amber-800 text-white px-3 hover:bg-amber-500'>search</button>
         </form>
         <table className='w-full mb-3'>
            <thead className='block'>
               <tr className='text-left border-b bg-gray-300 pr-5 pl-3 flex py-1'>
                  <th className='w-20'>ID</th>
                  <th className='w-40'>Hình ảnh</th>
                  <th className='w-56'>Tên vị trí</th>
                  <th className='w-56'>Tỉnh thành</th>
                  <th className='w-56'>Quốc gia</th>
                  <th className='flex-1'>Hành động</th>
               </tr>
            </thead>
            <tbody className='block h-[450px] overflow-auto'>
               {contentGetViTri?.data.map((viTri, i) => (
                  <tr key={i} className='border-b text-left flex items-center pl-3 py-2'>
                     <td className='w-20'>{viTri.id}</td>
                     <td className='w-40 break-words'><img src={viTri.hinhAnh} alt="..." width={130} /></td>
                     <td className='w-56 break-words'>{viTri.tenViTri}</td>
                     <td className='w-56 break-words'>{viTri.tinhThanh}</td>
                     <td className='w-56 break-words'>{viTri.quocGia}</td>
                     <td className='flex-1 space-x-2'>
                        <button onClick={() => {
                           dispatch(getViTriID(viTri.id.toString()))
                           setDisplayUpdate('')
                        }} className='bg-green-800 p-1 rounded-md shadow text-white hover:bg-green-500'>sửa</button>
                        <button onClick={() => dispatch(deleteViTri(viTri.id.toString()))} className='bg-red-800 p-1 rounded-md shadow text-white hover:bg-red-500'>Xoá</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <div>
            <Pagination defaultPageSize={5} total={contentGetViTri?.totalRow} current={Number(search.get('pageIndex'))} onChange={(page, pageSize) => {
               setSearch({ keyword: keyword, pageIndex: page.toString() })
            }} />
         </div>

         {messageDeleteViTri || errMessageDeleteViTri ?
            <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/40'>
               <div className='w-80 h-40 bg-white mx-auto mt-40 shadow flex flex-col justify-center items-center'>
                  <p className='text-xl text-center text-green-500'>{messageDeleteViTri || errMessageDeleteViTri}</p>
                  <button onClick={() => dispatch(deleteViTriActions.removeMessageDeleteViTri(''))} className=' py-3 px-7 rounded-lg bg-amber-800 text-white hover:bg-amber-500'>OK</button>
               </div>
            </div> : ''
         }

         <div className={`${display} fixed top-0 bottom-0 left-0 right-0 bg-black/50`}>
            <PopupThemViTri setDisplay={setDisplay} />
         </div>
         
         <div className={`${displayUpdate} fixed top-0 bottom-0 left-0 right-0 bg-black/50`}>
            <PopupCapNhatViTri setDisplayUpdate={setDisplayUpdate} />
         </div>
      </Container>
   )
}

export default QuanLyThongTinViTri

const Container = styled.div`
   &.QuanLyThongTinViTri{
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