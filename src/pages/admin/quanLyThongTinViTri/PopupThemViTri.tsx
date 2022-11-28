import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../../stores/configStore'
import { postViTri, postViTriActions } from '../../../stores/viTri/postViTriReducer'

type Props = {
   setDisplay: (display: string) => void
}

const PopupThemViTri: React.FC<Props> = (props) => {
   const { register, handleSubmit, setValue, reset } = useForm()
   const dispatch = useDispatch<any>()
   const [urlHinhAnh, setUrlHinhAnh] = useState('')
   const { contentPostViTri, errContentPostViTri } = useSelector((state: RootState) => state.postViTriReducer)

   return (
      <Container className='PopupThemViTri w-1/3 py-2 px-5 bg-white mx-auto mt-10 shadow '>
         <div className='text-right'>
            <button onClick={() => {
               props.setDisplay('hidden')
               dispatch(postViTriActions.removeContentPostViTri(''))
               reset({
                  tenViTri: '',
                  tinhThanh: '',
                  quocGia: '',
                  hinhAnh: '',
                  image:''
               })
               setUrlHinhAnh('')
            }} className=' px-3 bg-amber-800 text-white hover:bg-amber-500'>X</button>
         </div>
         <div className='h-14'>
            <p className='text-xl text-center font-bold m-0'>Thêm vị trí mới</p>
            {contentPostViTri ? <p className='text-center text-lg text-green-500 m-0'>Thêm vị trí thành công!</p> : <p className='text-center text-red-500 m-0'>{errContentPostViTri}</p>}
         </div>
         <form onSubmit={handleSubmit(data => {
            delete data.image
            dispatch(postViTri(data))
         })}>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Tên vị trí</p>
               <input required {...register('tenViTri')} type="text" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Tỉnh thành</p>
               <input required {...register('tinhThanh')} type="text" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Quốc gia</p>
               <input required {...register('quocGia')} type="text" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Hinh ảnh</p>
               <input required {...register('image')} type="file" accept="image/jpg, image/jpeg, image/png, image/gif" className="w-full focus:outline-none py-[2px] focus:border-blue-600" onChange={(e) => {
                  // lấy file đã chọn
                  const file = e.target.files
                  // tạo đối tượng đọc file 
                  if (file) {
                     const reader = new FileReader()
                     reader.readAsDataURL(file[0])
                     reader.onload = (e) => {
                        setValue('hinhAnh', e.target?.result)
                        if (typeof e.target?.result === 'string') {
                           setUrlHinhAnh(e.target?.result)
                        }
                     }
                  }
               }} />
            </div>
            <div className='mb-2'>
               <img src={urlHinhAnh} alt="..." className='w-40 bg-gray-200' />
            </div>
            
            {contentPostViTri ? '' : <div className='text-center'>
               <button className="px-7 py-3 bg-amber-800 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-amber-500 transition duration-300">Thêm</button>
            </div>}
         </form>
      </Container>
   )
}

export default PopupThemViTri

const Container = styled.div`
   &.PopupThemViTri{
      animation: aniPopupThemViTri 1s ;
      @keyframes aniPopupThemViTri {
         from{
            transform:translateY(-100%)
         }
         to{ }
      }
   }
`