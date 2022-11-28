import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../stores/configStore'
import { getPhongThueID } from '../../stores/phongThue/getPhongThueIDReducer'
import { getViTriAll } from '../../stores/viTri/getViTriAllReuducer'
import { AiFillStar, AiOutlineDesktop, AiOutlineHeart, AiOutlineHome, AiOutlineWifi } from "react-icons/ai";
import { TbToolsKitchen2, TbParking, TbCalendarOff } from "react-icons/tb";
import { IoDiamondSharp, IoShareSharp, IoSnowOutline } from "react-icons/io5";
import { GiWashingMachine } from "react-icons/gi";
import { MdIron, MdOutlineCleanHands, MdOutlineIron, MdPool } from "react-icons/md";
import { useParams } from 'react-router-dom'
import DatPhong from './DatPhong'
import BinhLuan from './BinhLuanPhong'

const ChiTietPhong: React.FC = () => {
   const param = useParams()
   const dispatch = useDispatch<any>()
   const { contentGetPhongThueID } = useSelector((state: RootState) => state.getPhongThueIDReducer)
   const { contentGetViTriAll } = useSelector((state: RootState) => state.getViTriAllReducer)

   useEffect(() => {
      window.scrollTo(0, 0)
      dispatch(getPhongThueID(`${param.id}`))
      dispatch(getViTriAll())
   }, [])

   return (
      <div className='ChiTietPhong pt-16 lg:pt-[95px] pb-3'>
         <div className='container'>
            <div className='py-5'>
               <h3 className='text-2xl font-bold text-amber-800'>Căn hộ ở {(() => {
                  const viTri = contentGetViTriAll?.find(viTri => viTri.id === contentGetPhongThueID?.maViTri)
                  return <span><span>{viTri?.tenViTri}</span> - <span>{viTri?.tinhThanh}</span> - <span>{viTri?.quocGia}</span></span>
               })()}</h3>
               <div className='flex justify-between flex-wrap'>
                  <div>
                     <span><AiFillStar className='inline-block mb-[3px] text-red-500' /> <span className='font-bold'>4,5</span> <span className='underline'>(18 đánh giá)</span></span> . <IoDiamondSharp className=' text-red-500 inline-block' /> <span className='m-0'>Chủ nhà siêu cấp</span>
                  </div>
                  <div>
                     <IoShareSharp className='inline-block text-base mb-1' /> <span className='underline mr-3'>Chia sẻ</span> <AiOutlineHeart className='inline-block text-base mb-1' /> <span className='underline'>Lưu</span>
                  </div>
               </div>
            </div>
            <div>
               <img src={contentGetPhongThueID?.hinhAnh} alt="" className='w-full rounded-xl' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-12 py-5 gap-10 lg:gap-20'>
               <div className=' md:col-span-6 lg:col-span-7 xl:col-span-8'>
                  <div className='border-b pb-3 flex justify-between'>
                     <div className='pr-5 flex-1'>
                        <p className='m-0 text-amber-800 text-lg font-bold'>Toàn bộ căn hộ {contentGetPhongThueID?.tenPhong}, Chủ nhà Tài</p>
                        <p className='m-0 font-semibold'><span>{contentGetPhongThueID?.khach} Khách</span> - <span>{contentGetPhongThueID?.phongNgu} Phòng ngủ</span> - <span>{contentGetPhongThueID?.giuong} Giường</span> - <span>{contentGetPhongThueID?.phongTam} Phòng tắm</span></p>
                     </div>
                     <div>
                        <img src="https://thuthuatnhanh.com/wp-content/uploads/2022/07/anh-avatar-fb-nam-cute-390x390.jpg" alt="" className='w-14 h-14 rounded-full' />
                     </div>
                  </div>
                  <div className='py-3 border-b'>
                     <div className='flex pb-3'>
                        <AiOutlineHome className='text-xl text-amber-800' />
                        <div className='flex-1 pl-2'>
                           <p className='m-0 leading-none text-base font-semibold text-amber-800'>Toàn bộ nhà</p>
                           <p className='m-0'>Bạn sẽ có chung cư cao cấp cho riêng mình.</p>
                        </div>
                     </div>
                     <div className='flex pb-3'>
                        <MdOutlineCleanHands className='text-xl text-amber-800' />
                        <div className='flex-1 pl-2'>
                           <p className='m-0 leading-none text-base font-semibold text-amber-800'>Vệ sinh tăng cường</p>
                           <p className='m-0'>Chủ nhà này đã cam kết thực hiện quy trình vệ sinh năm bước của Airbnb.</p>
                        </div>
                     </div>
                     <div className='flex pb-3'>
                        <IoDiamondSharp className='text-xl text-amber-800' />
                        <div className='flex-1 pl-2'>
                           <p className='m-0 leading-none text-base font-semibold text-amber-800'>Tài là chủ nhà siêu cấp</p>
                           <p className='m-0'>Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.</p>
                        </div>
                     </div>
                     <div className='flex'>
                        <TbCalendarOff className='text-xl text-amber-800' />
                        <div className='flex-1 pl-2'>
                           <p className='m-0 leading-none text-base font-semibold text-amber-800'>Miễn phí huỷ trong 48h</p>
                        </div>
                     </div>
                  </div>
                  <div className='py-3 border-b'>
                     <p className='m-0 text-amber-800 font-bold text-lg'>Mô tả</p>
                     <p className='m-0 text-base'>{contentGetPhongThueID?.moTa}</p>
                  </div>
                  <div className='py-3 border-b'>
                     <p className='m-0 text-amber-800 font-bold text-lg'>Tiện nghi</p>
                     <div className='grid grid-cols-4'>
                        <div className='col-span-4 md:col-span-3 grid grid-cols-2'>
                           {contentGetPhongThueID?.wifi ? <p className='m-0 text-base'><AiOutlineWifi className='inline-block mb-1 text-amber-800' /> <span>Wifi</span> </p> : ''}
                           {contentGetPhongThueID?.dieuHoa ? <p className='m-0 text-base'><IoSnowOutline className='inline-block mb-1 text-amber-800' /> <span>Điều hoà</span> </p> : ''}
                           {contentGetPhongThueID?.tivi ? <p className='m-0 text-base'><AiOutlineDesktop className='inline-block mb-1 text-amber-800' /> <span>Tivi</span> </p> : ''}
                           {contentGetPhongThueID?.mayGiat ? <p className='m-0 text-base'><GiWashingMachine className='inline-block mb-1 text-amber-800' /> <span>Máy giặt</span> </p> : ''}
                           {contentGetPhongThueID?.banLa ? <p className='m-0 text-base'><MdOutlineIron className='inline-block text-amber-800' /> <span>Bàn là</span> </p> : ''}
                           {contentGetPhongThueID?.bep ? <p className='m-0 text-base'><TbToolsKitchen2 className='inline-block mb-1 text-amber-800' /> <span>Bếp nấu</span> </p> : ''}
                           {contentGetPhongThueID?.doXe ? <p className='m-0 text-base'><TbParking className='inline-block mb-1 text-amber-800' /> <span>Chỗ đỗ xe</span> </p> : ''}
                           {contentGetPhongThueID?.hoBoi ? <p className='m-0 text-base'><MdPool className='inline-block mb-1 text-amber-800' /> <span>Hồ bơi</span> </p> : ''}
                           {contentGetPhongThueID?.banUi ? <p className='m-0 text-base'><MdIron className='inline-block text-amber-800' /> <span>Bàn ủi</span> </p> : ''}
                        </div>
                     </div>
                  </div>
               </div>

               <div className=' md:col-span-6 lg:col-span-5 xl:col-span-4'>
                  <div className='p-5 shadow-md border rounded-xl'>
                     <DatPhong contentGetPhongThueID={contentGetPhongThueID} />
                  </div>
               </div>
            </div>
            
            <div>
               <BinhLuan contentGetPhongThueID={contentGetPhongThueID} />
            </div>
         </div>
      </div>
   )
}

export default ChiTietPhong