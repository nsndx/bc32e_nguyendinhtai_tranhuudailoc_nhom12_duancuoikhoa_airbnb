import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../stores/configStore'
import { getViTriPhanTrang } from '../../../stores/viTri/getViTriPhanTrangReducer'

const DiemDenGanDay: React.FC = () => {
   const dispatch = useDispatch<any>()
   const { contentGetViTri } = useSelector((state: RootState) => state.getViTriPhanTrangReducer)
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(getViTriPhanTrang(`pageIndex=${Math.floor(Math.random() * 2) + 1}&pageSize=8`))
   }, [])

   return (
      <div className='DiemDenGanDay py-5'>
         <div className='container'>
            <h3 className='text-xl font-bold text-amber-800'>Khám phá những điểm đến gần đây</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
               {contentGetViTri?.data.map((viTri, i) => (
                  <div key={i} className='flex'>
                     <div className='w-24 h-24 rounded-xl overflow-hidden hover:shadow-md hover:shadow-black/50 transition duration-500'>
                        <img onClick={() => navigate(`/danhsachphong/${viTri.id}`)} src={viTri.hinhAnh} alt="" className='w-full h-full hover:scale-110 cursor-pointer transition duration-500' />
                     </div>
                     <div className='flex-1 flex flex-col justify-center pl-3'>
                        <p onClick={() => navigate(`/danhsachphong/${viTri.id}`)} className='m-0 text-base text-amber-800 font-bold tracking-[1px] hover:underline hover:cursor-pointer'>{viTri.tenViTri}</p>
                        <p className='m-0 font-semibold'>{viTri.tinhThanh}</p>
                        <p className='m-0 font-semibold'>{viTri.quocGia}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default DiemDenGanDay