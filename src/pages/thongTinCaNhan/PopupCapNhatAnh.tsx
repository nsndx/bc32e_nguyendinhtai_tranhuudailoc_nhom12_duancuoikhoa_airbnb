import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../stores/configStore'
import { postUsersUploadAvatar, postUsersUploadAvatarActions } from '../../stores/nguoiDung/postUserUploadAvatarReducer'

type Props = {
   setDisplayCapNhatAnh: (display: string) => void
}

const PopupCapNhatAnh: React.FC<Props> = (props) => {
   const { register, handleSubmit, reset } = useForm()
   const [urlHinhAnh, setUrlHinhAnh] = useState('')
   const dispatch = useDispatch<any>()
   const { contentPostUserUpLoadAvatar, errContentPostUserUpLoadAvatar } = useSelector((state: RootState) => state.postUsersUploadAvatarReducer)

   return (
      <Container className='PopupCapNhatAnh w-11/12 sm:w-2/3 lg:w-1/3 py-2 px-5 bg-white mx-auto mt-32 shadow '>
         <div className='text-right'>
            <button onClick={() => {
               props.setDisplayCapNhatAnh('hidden')
               dispatch(postUsersUploadAvatarActions.removeContentPostUserUpLoadAvatar(''))
               reset({
                  avatar: ''
               })
               setUrlHinhAnh('')
            }} className=' px-3 bg-amber-800 text-white hover:bg-amber-500'>X</button>
         </div>
         <div className='h-20'>
            <p className='text-xl text-center font-bold m-0'>Cập nhật ảnh đại diện</p>
            {contentPostUserUpLoadAvatar ? <p className='text-center text-lg text-green-500 m-0'>Cập nhật ảnh thành công!</p> : <p className='text-center text-red-500 m-0'>{errContentPostUserUpLoadAvatar}</p>}
         </div>
         <form onSubmit={handleSubmit(data => {
            let formData = new FormData()
            formData.append('formFile', data.avatar[0], data.avatar[0].name)
            dispatch(postUsersUploadAvatar(formData))
         })}>
            <div className='mb-2'>
               <img src={urlHinhAnh} alt="..." className='w-40 h-40 bg-gray-200' />
            </div>
            <div className='mb-2'>
               <input required {...register('avatar')} type="file" accept="image/jpg, image/jpeg, image/png, image/gif" className="w-full focus:outline-none py-[2px] focus:border-blue-600" onChange={(e) => {
                  // lấy file đã chọn
                  const file = e.target.files
                  // tạo đối tượng đọc file 
                  if (file) {
                     const reader = new FileReader()
                     reader.readAsDataURL(file[0])
                     reader.onload = (e) => {
                        if (typeof e.target?.result === 'string') {
                           setUrlHinhAnh(e.target?.result)
                        }
                     }
                  }
               }} />
            </div>

            {contentPostUserUpLoadAvatar ? '' : <div className='text-center'>
               <button className="px-7 py-3 bg-amber-800 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-amber-500 transition duration-300">Cập nhật</button>
            </div>}
         </form>
      </Container>
   )
}

export default PopupCapNhatAnh

const Container = styled.div`
   &.PopupCapNhatAnh{
      animation: aniPopupCapNhatAnh 1s;
      @keyframes aniPopupCapNhatAnh {
         from{
            transform:translateY(-100%)
         }
         to{ }
      }
   }
`