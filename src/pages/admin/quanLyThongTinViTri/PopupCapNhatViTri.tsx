import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../../stores/configStore'
import { putViTriID, putViTriIDActions } from '../../../stores/viTri/putViTriIDReducer'

type Props = {
   setDisplayUpdate: (display: string) => void
}

const PopupCapNhatViTri: React.FC<Props> = (props) => {
   const { register, handleSubmit, reset, setValue } = useForm()
   const dispatch = useDispatch<any>()
   const { contentGetViTriID } = useSelector((state: RootState) => state.getViTriIDReducer)
   const { contentPutViTri, errContentPutViTri } = useSelector((state: RootState) => state.putViTriIDReducer)
   const [urlHinhAnh, setUrlHinhAnh] = useState('')

   useEffect(() => {
      reset({
         tenViTri: contentGetViTriID?.tenViTri,
         tinhThanh: contentGetViTriID?.tinhThanh,
         quocGia: contentGetViTriID?.quocGia,
         hinhAnh:contentGetViTriID?.hinhAnh,
         image:''
      })
      setUrlHinhAnh('')
   }, [contentGetViTriID])

   return (
      <Container className='PopupCapNhatViTri w-1/3 py-2 px-5 bg-white mx-auto mt-10 shadow'>
         <div className='text-right'>
            <button onClick={() => {
               props.setDisplayUpdate('hidden')
               dispatch(putViTriIDActions.removeContentPutViTri(''))
            }} className=' px-3 bg-amber-800 text-white hover:bg-amber-500'>X</button>
         </div>
         <div className='h-14'>
            <p className='text-xl text-center font-bold m-0'>Cập nhật vị trí {contentGetViTriID?.id}</p>
            {contentPutViTri ? <p className='text-center text-lg text-green-500 m-0'>Cập nhật vị trí thành công!</p> : <p className='text-center text-red-500 m-0'>{errContentPutViTri}</p>}
         </div>
         <form onSubmit={handleSubmit(data => {
            delete data.image
            dispatch(putViTriID({ id: contentGetViTriID?.id.toString(), data: data }))
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
               <input {...register('image')} type="file" accept="image/jpg, image/jpeg, image/png, image/gif" className="w-full focus:outline-none py-[2px] focus:border-blue-600" onChange={(e) => {
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
               <p className='m-0 font-semibold w-40 text-right pr-2'></p>
               <img src={urlHinhAnh || contentGetViTriID?.hinhAnh} alt="..." className='w-40 bg-gray-200' />
            </div>
            
            {contentPutViTri ? '' : <div className='text-center'>
               <button className="px-7 py-3 bg-amber-800 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-amber-500 transition duration-300">Cập nhật</button>
            </div>}
         </form>
      </Container>
   )
}

export default PopupCapNhatViTri

const Container = styled.div`
   &.PopupCapNhatViTri{
      animation: aniPopupCapNhatViTri 1s;
      @keyframes aniPopupCapNhatViTri {
         from{
            transform:translateX(-100%)
         }
         to{ }
      }
   }
`