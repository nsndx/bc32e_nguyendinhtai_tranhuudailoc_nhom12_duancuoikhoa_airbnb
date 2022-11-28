import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../stores/configStore'
import { getPhongThueTheoViTri } from '../../stores/phongThue/getPhongThueTheoViTriReducer'
import { getViTriAll } from '../../stores/viTri/getViTriAllReuducer'

const DanhSachPhong: React.FC = () => {
   const param = useParams()
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const { contentGetPhongThueTheoViTri } = useSelector((state: RootState) => state.getPhongThueTheoViTriReducer)
   const { contentGetViTriAll } = useSelector((state: RootState) => state.getViTriAllReducer)

   useEffect(() => {
      window.scrollTo(0, 0)
      dispatch(getPhongThueTheoViTri(`${param.id}`))
      dispatch(getViTriAll())
   }, [])

   return (
      <div className='DanhSachPhong pt-16 lg:pt-[95px] pb-5'>
         <div className='container'>
            <div className='grid grid-cols-12 gap-5'>
               <div className='col-span-12 lg:col-span-7 lg:h-[600px] flex flex-col'>
                  <div className='py-5 border-b'>
                     <p className='m-0 text-gray-500 font-semibold'>Có {contentGetPhongThueTheoViTri?.length} chỗ ở . {moment(new Date()).format('DD/MM')} - {moment((new Date()).getTime() + (30 * 24 * 3600 * 1000)).format('DD/MM')}</p>
                     <h3 className='m-0 text-2xl font-bold text-amber-800'>Chỗ ở tại khu vực {(() => {
                        const viTri = contentGetViTriAll?.find(viTri => viTri.id === Number(param.id))
                        return <span><span>{viTri?.tenViTri}</span> - <span>{viTri?.tinhThanh}</span> - <span>{viTri?.quocGia}</span></span>
                     })()}</h3>
                     <div className='space-y-3'>
                        <button className='border px-5 py-1 mr-3 border-gray-500 rounded-full'>Loại nơi ở</button>
                        <button className='border px-5 py-1 mr-3 border-gray-500 rounded-full'>Giá</button>
                        <button className='border px-5 py-1 mr-3 border-gray-500 rounded-full'>Đặt ngay</button>
                        <button className='border px-5 py-1 mr-3 border-gray-500 rounded-full'>Phòng và phòng ngủ</button>
                        <button className='border px-5 py-1 border-gray-500 rounded-full'>Bộ lọc khác</button>
                     </div>
                  </div>
                  <div className='flex-1 overflow-auto'>
                     {contentGetPhongThueTheoViTri?.map((phongThue, i) => (
                        <div key={i} className='py-3 border-b sm:flex'>
                           <div className='sm:w-1/3'>
                              <img onClick={() => navigate(`/chitietphong/${phongThue.id}`)} src={phongThue.hinhAnh} alt="" className='cursor-pointer' />
                           </div>
                           <div className='flex-1 flex flex-col justify-between sm:px-3'>
                              <div>
                                 <p className='m-0 sm:leading-none text-gray-500'>Toàn bộ căn hộ dịch vụ tại {(() => {
                                    const viTri = contentGetViTriAll?.find(viTri => viTri.id === phongThue.maViTri)
                                    return <span><span>{viTri?.tenViTri}</span> - <span>{viTri?.tinhThanh}</span> - <span>{viTri?.quocGia}</span></span>
                                 })()}</p>
                                 <p onClick={() => navigate(`/chitietphong/${phongThue.id}`)} className='text-xl font-bold m-0 text-amber-800 hover:underline hover:cursor-pointer'>{phongThue.tenPhong}</p>
                                 <p className='m-0 text-green-800'><span>{phongThue.khach} Khách</span> - <span>{phongThue.phongNgu} Phòng ngủ</span> - <span>{phongThue.giuong} Giường</span> - <span>{phongThue.phongTam} Phòng tắm</span></p>
                                 <p className='m-0 text-blue-800'>
                                    <span>{phongThue.wifi ? 'Wifi.' : ''}</span><span> </span>
                                    <span>{phongThue.dieuHoa ? 'Điều hoà.' : ''}</span><span> </span>
                                    <span>{phongThue.tivi ? 'Tivi.' : ''}</span><span> </span>
                                    <span>{phongThue.mayGiat ? 'Máy giặt.' : ''}</span><span> </span>
                                    <span>{phongThue.banLa ? 'Bàn là.' : ''}</span><span> </span>
                                    <span>{phongThue.bep ? 'Bếp.' : ''}</span><span> </span>
                                    <span>{phongThue.doXe ? 'Chỗ đỗ xe.' : ''}</span><span> </span>
                                    <span>{phongThue.hoBoi ? 'Hồ bơi.' : ''}</span><span> </span>
                                    <span>{phongThue.banUi ? 'Bàn ủi.' : ''}</span><span> </span>
                                 </p>
                              </div>
                              <div>
                                 <p className='m-0 text-right text-base text-amber-800'><span className='font-bold'>{phongThue.giaTien}$</span><span>/ngày</span></p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className='col-span-12 h-80 lg:col-span-5 lg:h-[600px]'>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12060.329406967789!2d105.84370256946708!3d21.02939774682037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1669045175882!5m2!1svi!2s" style={{ border: 0, width: '100%', height: '100%' }} />
               </div>
            </div>
         </div>
      </div>
   )
}

export default DanhSachPhong