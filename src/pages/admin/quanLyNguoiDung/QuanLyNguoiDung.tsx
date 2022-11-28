import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { RootState } from '../../../stores/configStore'
import PopupCapNhatNguoiDung from './PopupCapNhatNguoiDung'
import PopupThemNguoiDung from './PopupThemNguoiDung'
import { getUsersPhanTrang } from '../../../stores/nguoiDung/getUsersPhanTrangReducer'
import { getUsersID } from '../../../stores/nguoiDung/getUsersIDReducer'
import { deleteUser, deleteUserActions } from '../../../stores/nguoiDung/deleteUserReducer'

const QuanLyNguoiDung: React.FC = () => {
   const { register, handleSubmit, reset } = useForm()
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const { contentGetUsers } = useSelector((state: RootState) => state.getUsersPhanTrangReducer)
   const { messageDeleteUser, errMessageDeleteUser } = useSelector((state: RootState) => state.deleteUserReducer)
   const { contentPostUser } = useSelector((state: RootState) => state.postUserReducer)
   const { contentPutUser } = useSelector((state: RootState) => state.putUserIDReducer)
   const [search, setSearch] = useSearchParams({ keyword: '', pageIndex: '1' })
   const [keyword, setKeyword] = useState('')
   const [display, setDisplay] = useState('hidden')
   const [displayUpdate, setDisplayUpdate] = useState('hidden')
   const [pass, setPass] = useState('')

   useEffect(() => {
      dispatch(getUsersPhanTrang(`pageIndex=${search.get('pageIndex')}&pageSize=10&keyword=${search.get('keyword')}`))
      if (search.get('keyword') === '') {
         setKeyword('')
         reset({ keyword: '' })
      }
   }, [search, messageDeleteUser, contentPostUser, contentPutUser])

   return (
      <Container className='bg-white m-3 p-3 QuanLyNguoiDung'>
         <p className='font-bold text-xl mb-3'>Quản lý người dùng</p>
         <button onClick={() => setDisplay('')} className='mb-3 py-1 px-3 font-semibold border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white'>Thêm người dùng</button>
         <form onSubmit={handleSubmit(data => {
            setSearch({ keyword: data.keyword, pageIndex: '1' }); setKeyword(data.keyword)
         })} className='flex mb-3'>
            <input {...register('keyword')} onInput={(e) => {
               if (e.currentTarget.value === '') {
                  setSearch({ keyword: '', pageIndex: '1', })
               }
            }} type="text" placeholder='Nhập tên người dùng' className='border w-full p-1 outline-none' />
            <button className=' bg-amber-800 text-white px-3 hover:bg-amber-500'>search</button>
         </form>
         <table className='w-full mb-3'>
            <thead className='block'>
               <tr className='text-left border-b bg-gray-300 pr-5 pl-3 flex py-1'>
                  <th className='w-10'>ID</th>
                  <th className='w-14'>Avatar</th>
                  <th className='w-32'>Họ tên</th>
                  <th className='w-28'>Ngày sinh</th>
                  <th className='w-28'>Mật khẩu</th>
                  <th className='w-40'>Email</th>
                  <th className='w-28'>Điện thoại</th>
                  <th className='w-20'>Giới tính</th>
                  <th className='w-24'>Người dùng</th>
                  <th className='flex-1'>Hành động</th>
               </tr>
            </thead>
            <tbody className='block h-[450px] overflow-auto'>
               {contentGetUsers?.data.map((nguoiDung, i) => (
                  <tr key={i} className='border-b text-left flex items-center pl-3 py-2'>
                     <td className='w-10'>{nguoiDung.id}</td>
                     <td className='w-14 break-words'><img src={nguoiDung.avatar} alt="..." /></td>
                     <td className='w-32 break-words'>{nguoiDung.name}</td>
                     <td className='w-28 break-words'>{nguoiDung.birthday}</td>
                     <td className='w-28 break-words cursor-pointer' onClick={() => {
                        if (pass === nguoiDung.id.toString()) {
                           setPass('')
                        } else {
                           setPass(nguoiDung.id.toString())
                        }
                     }}>{pass === nguoiDung.id.toString() ? nguoiDung.password : '*****'}</td>
                     <td className='w-40 break-words'>{nguoiDung.email}</td>
                     <td className='w-28 break-words'>{nguoiDung.phone}</td>
                     <td className='w-20 break-words'>{nguoiDung.gender === true ? 'Nam' : 'Nữ'}</td>
                     <td className='w-24 break-words'>{nguoiDung.role}</td>
                     <td className='flex-1 space-x-1'>
                        <button onClick={() => navigate(`/admin/quanLyDatPhong/${nguoiDung.id}`)} className='bg-blue-800 p-1 rounded-md shadow text-white hover:bg-blue-500'>CT</button>
                        <button onClick={() => {
                           dispatch(getUsersID(nguoiDung.id.toString()))
                           setDisplayUpdate('')
                        }} className='bg-green-800 p-1 rounded-md shadow text-white hover:bg-green-500'>sửa</button>
                        <button onClick={() => dispatch(deleteUser(nguoiDung.id.toString()))} className='bg-red-800 p-1 rounded-md shadow text-white hover:bg-red-500'>Xoá</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <div>
            <Pagination showSizeChanger={false} current={Number(search.get('pageIndex'))} total={contentGetUsers?.totalRow} onChange={(page, pageSize) => {
               setSearch({ keyword: keyword, pageIndex: page.toString() })
            }} />
         </div>

         {messageDeleteUser || errMessageDeleteUser ?
            <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/40'>
               <div className='w-80 h-40 bg-white mx-auto mt-40 shadow flex flex-col justify-center items-center'>
                  <p className='text-xl text-center text-green-500'>{messageDeleteUser || errMessageDeleteUser}</p>
                  <button onClick={() => dispatch(deleteUserActions.removeMessageDeleteUser(''))} className=' py-3 px-7 rounded-lg bg-amber-800 text-white hover:bg-amber-500'>OK</button>
               </div>
            </div> : ''
         }

         <div className={`${display} fixed top-0 bottom-0 left-0 right-0 bg-black/50`}>
            <PopupThemNguoiDung setDisplay={setDisplay} />
         </div>

         <div className={`${displayUpdate} fixed top-0 bottom-0 left-0 right-0 bg-black/50`}>
            <PopupCapNhatNguoiDung setDisplayUpdate={setDisplayUpdate} />
         </div>
      </Container>
   )
}

export default QuanLyNguoiDung

const Container = styled.div`
   &.QuanLyNguoiDung{
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