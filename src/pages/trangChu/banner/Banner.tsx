import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../stores/configStore'
import { getPhongThuePhanTrang } from '../../../stores/phongThue/getPhongThuePhanTrangReducer'
import { Carousel } from 'antd';
import styled from 'styled-components';
import { getViTriAll } from '../../../stores/viTri/getViTriAllReuducer';
import { useNavigate } from 'react-router-dom';

const contentStyle: React.CSSProperties = {
   margin: 0,
   height: '500px',
   color: '#fff',
   textAlign: 'center',
   background: '#364d79',
};

const Banner: React.FC = () => {
   const dispatch = useDispatch<any>()
   const { contentGetPhongThue } = useSelector((state: RootState) => state.getPhongThuePhanTrangReducer)
   const { contentGetViTriAll } = useSelector((state: RootState) => state.getViTriAllReducer)
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(getPhongThuePhanTrang(`pageIndex=${Math.floor(Math.random() * 4) + 1}&pageSize=5`))
      dispatch(getViTriAll())
   }, [])

   return (
      <Container className='Banner pt-16 lg:pt-[92px]'>
         <Carousel draggable arrows>
            {contentGetPhongThue?.data.map((phongThue, i) => (
               <div key={i}>
                  <div style={contentStyle}>
                     <div style={{ backgroundImage: `url(${phongThue.hinhAnh})` }} className='h-full bg-cover bg-center bg-no-repeat relative'>
                        <div className='bg-black/80 absolute bottom-[40px] px-5 py-2 left-4 right-4 sm:left-auto sm:right-auto sm:w-auto sm:inline-block sm:-translate-x-1/2 shadow-lg shadow-black rounded-xl'>
                           <p className='uppercase text-amber-500 text-lg font-semibold m-0'>{phongThue.tenPhong}</p>
                           {(() => {
                              const viTri = contentGetViTriAll?.find(viTri => viTri.id === phongThue.maViTri)
                              return <p>
                                 <span>{viTri?.tenViTri}</span> - <span>{viTri?.tinhThanh}</span> - <span>{viTri?.quocGia}</span>
                              </p>
                           })()}
                           <button onClick={() => navigate(`/chitietphong/${phongThue.id}`)} className='text-lg font-bold text-amber-500 hover:text-amber-300 hover:scale-125 transition duration-500'>Xem chi tiết !</button>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </Carousel>
      </Container>
   )
}

export default Banner
const Container = styled.div`
   &.Banner{
      .ant-carousel .slick-next, .ant-carousel .slick-prev{
         width:initial;
         height:initial;
         z-index:1;
      }
      .ant-carousel .slick-prev {
         left: 20px;
      }      
      .ant-carousel .slick-prev:before{
         color: #f59e0b;
         font-size:80px;
         font-weight:600;
         opacity:0.6;
         content:'\\276C';
         transition: all 0.5s;
      }
      .ant-carousel .slick-prev:hover::before{
         opacity:1;
      }

      .ant-carousel .slick-next {
         right: 20px;
      }
      .ant-carousel .slick-next:before{
         color: #f59e0b;
         font-size:80px;
         font-weight:600;
         opacity:0.6;
         content:'\\276D';
         transition: all 0.5s;
      }
      .ant-carousel .slick-next:hover::before{
         opacity:1;
      }
      .ant-carousel .slick-dots{
         right:initial;
         margin:0;
         left:50px;
      }
      .ant-carousel .slick-dots li{
         height:initial;
      }
      .ant-carousel .slick-dots li button{
         height:15px;
         background-color:#f59e0b;
      }
   }
`