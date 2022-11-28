import moment from 'moment'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getBinhLuanAll } from '../../stores/binhLuan/getBinhLuanAllReducer'
import { postBinhLuan } from '../../stores/binhLuan/postBinhLuanReducer'
import { RootState } from '../../stores/configStore'
import { getUsersAll } from '../../stores/nguoiDung/getUsersAllReducer'
import { getUsersID } from '../../stores/nguoiDung/getUsersIDReducer'
import { getUsersPhanTrang } from '../../stores/nguoiDung/getUsersPhanTrangReducer'
import { BinhLuan } from '../../types/binhLuanTypes'
import { PhongThue } from '../../types/phongThueTypes'
import { UserLogin } from '../../utils/constants/api'

type Props = {
   contentGetPhongThueID: PhongThue | undefined
}

const BinhLuanPhong: React.FC<Props> = (props) => {
   const { register, handleSubmit, reset } = useForm()
   const dispatch = useDispatch<any>()
   const nguoiDungJson = localStorage.getItem(UserLogin)
   const nguoiDung = typeof nguoiDungJson === 'string' ? JSON.parse(nguoiDungJson) : undefined
   const { contentGetUsersID } = useSelector((state: RootState) => state.getUsersIDReducer)
   const { contentGetBinhLuanAll } = useSelector((state: RootState) => state.getBinhLuanAllReducer)
   const { contentGetUsers } = useSelector((state: RootState) => state.getUsersPhanTrangReducer)
   const dSBinhLuanTheoMaPhong = contentGetBinhLuanAll?.reduce<BinhLuan[]>((dSBinhLuanTheoMaPhong, binhLuan) => {
      const nguoiDung = contentGetUsers?.data?.find(nguoiDung => nguoiDung.id === binhLuan.maNguoiBinhLuan)
      if (binhLuan.maPhong === props.contentGetPhongThueID?.id && nguoiDung) {
         dSBinhLuanTheoMaPhong.push(binhLuan)
      }
      return dSBinhLuanTheoMaPhong
   }, [])
   const { contentPostBinhLuan } = useSelector((state: RootState) => state.postBinhLuanReducer)

   useEffect(() => {
      if (nguoiDung) {
         dispatch(getUsersID(nguoiDung.id))
      }
      dispatch(getUsersAll())
      dispatch(getUsersPhanTrang(`pageIndex=1&pageSize=100`))
   }, [])
   useEffect(() => {
      dispatch(getBinhLuanAll())
   }, [contentPostBinhLuan])

   return (
      <div>
         {dSBinhLuanTheoMaPhong?.length === 0 ? <p className='m-0 font-bold'>Chưa có bình luận</p> : <p className='m-0 font-bold'>Các bình luận</p>}
         <div className='py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {dSBinhLuanTheoMaPhong?.map((binhLuan, i) => (
               <div key={i}>
                  <div className='flex'>
                     {(() => {
                        const nguoiDung = contentGetUsers?.data?.find(nguoiDung => nguoiDung.id === binhLuan.maNguoiBinhLuan)
                        return <>
                           <div>
                              <img src={nguoiDung?.avatar || 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'} alt="" className='w-10 h-10 rounded-full' />
                           </div>
                           <div className='flex-1 pl-2'>
                              <p className='m-0 font-semibold'>{nguoiDung?.name}</p>
                              <p className='m-0 text-gray-500'>{binhLuan.ngayBinhLuan}</p>
                           </div>
                        </>
                     })()}
                  </div>
                  <p className='m-0 text-base'>{binhLuan.noiDung}</p>
               </div>
            ))}
         </div>
         {nguoiDung ?
            <div className='flex'>
               <div>
                  <img src={contentGetUsersID?.avatar || 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'} alt="" className='w-10 h-10 rounded-full' />
               </div>
               <form onSubmit={handleSubmit(data => {
                  data.maPhong = props.contentGetPhongThueID?.id
                  data.maNguoiBinhLuan = nguoiDung.id
                  data.ngayBinhLuan = moment(Date.now()).format('DD/MM/YYYY')
                  data.saoBinhLuan = 5
                  if (data.noiDung) {
                     dispatch(postBinhLuan(data))
                  }
                  reset({
                     noiDung: ''
                  })
               })} className='flex-1 pl-3'>
                  <textarea {...register('noiDung')} rows={3} className="w-full border border-gray-300 focus:outline-none px-2 py-[2px] focus:border-gray-500 resize-none text-base"></textarea>
                  <div className='text-right'>
                     <button className="px-7 py-3 bg-amber-800 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-amber-500 transition duration-300">Gửi bình luận</button>
                  </div>
               </form>
            </div> : ''}
      </div>
   )
}

export default BinhLuanPhong