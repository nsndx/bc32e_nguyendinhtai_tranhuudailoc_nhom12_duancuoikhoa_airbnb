import React from 'react'
import { GrLanguage } from "react-icons/gr"
import { FaFacebookF, FaTwitter } from "react-icons/fa"
import { ImInstagram } from "react-icons/im"
import { TfiMoney } from "react-icons/tfi";
import styled from 'styled-components'

const Footer: React.FC = () => {
   return (
      <Container className='Footer bg-gray-100'>
         <div className='container'>
            <div className='py-5 grid grid-cols-4'>
               <div className='col-span-4 sm:col-span-2 lg:col-span-1'>
                  <h3 className='uppercase text-lg font-bold'>Giới thiệu</h3>
                  <p>Phương thức hoạt động của Airbnb</p>
                  <p>Trang tin tức</p>
                  <p>Nhà đầu tư</p>
                  <p>Airbnb Plus</p>
                  <p>Airbnb Luxe</p>
                  <p>HotelTonight</p>
                  <p>Airbnb for Work</p>
                  <p>Nhờ có Host, mọi điều đều có thể</p>
                  <p>Cơ hội nghề nghiệp</p>
                  <p>Thư của nhà sáng lập</p>
               </div>
               <div className='col-span-4 sm:col-span-2 lg:col-span-1'>
                  <h3 className='uppercase text-lg font-bold'>Cộng đồng</h3>
                  <p>Sự đa dạng và Cảm giác thân thuộc</p>
                  <p>Tiện nghi phù hợp cho người khuyết tật</p>
                  <p>Đối tác liên kết Airbnb</p>
                  <p>Chỗ ở cho tuyến đầu</p>
                  <p>Lượt giới thiệu của khách</p>
                  <p>Airbnb.org</p>
               </div>
               <div className='col-span-4 sm:col-span-2 lg:col-span-1'>
                  <h3 className='uppercase text-lg font-bold'>Đón tiếp khách</h3>
                  <p>Cho thuê nhà</p>
                  <p>Tổ chức Trải nghiệm trực tuyến</p>
                  <p>Tổ chức trải nghiệm</p>
                  <p>Đón tiếp khách có trách nhiệm</p>
                  <p>Trung tâm tài nguyên</p>
                  <p>Trung tâm cộng đồng</p>
               </div>
               <div className='col-span-4 sm:col-span-2 lg:col-span-1'>
                  <h3 className='uppercase text-lg font-bold'>Hỗ trợ</h3>
                  <p>Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</p>
                  <p>Trung tâm trợ giúp</p>
                  <p>Các tuỳ chọn huỷ</p>
                  <p>Hỗ trợ khu dân cư</p>
                  <p>Tin cậy và an toàn</p>
               </div>
            </div>
            <div className='flex flex-wrap justify-between py-5 border-t border-gray-300'>
               <div>
                  <span className='inline-block text-base'>© 2022 Airbnb, Inc.All right reserved - Quyền riêng tư - Điều khoản - Sơ đồ trang web</span>
               </div>
               <div className='flex flex-wrap'>
                  <span className='mr-5'>
                     <GrLanguage className='inline-block mb-1 mr-2' />
                     <span className='underline hover:text-amber-800 cursor-pointer text-base'>Tiếng việt(VN)</span>
                  </span>
                  <span className='mr-10'>
                     <TfiMoney className='inline-block mb-1 mr-1' />
                     <span className='underline hover:text-amber-800 cursor-pointer text-base'>USD</span>
                  </span>
                  <span className='space-x-5'>
                     <FaFacebookF className='inline-block mb-2 hover:text-amber-800 cursor-pointer text-xl' />
                     <FaTwitter className='inline-block mb-2 hover:text-amber-800 cursor-pointer text-xl' />
                     <ImInstagram className='inline-block mb-2 hover:text-amber-800 cursor-pointer text-xl' />
                  </span>
               </div>
            </div>
         </div>
      </Container>
   )
}

export default Footer

const Container = styled.div`
   &.Footer{
      p{
         font-size: 16px;
         &:hover{
            color: #92400e;
            cursor: pointer;
         }
      }
   }
`