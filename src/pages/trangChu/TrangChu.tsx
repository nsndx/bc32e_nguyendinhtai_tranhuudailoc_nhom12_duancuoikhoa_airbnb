import React, { useEffect } from 'react'
import Banner from './banner/Banner'
import ChonViTri from './chonViTri/ChonViTri'
import DiemDenGanDay from './diemDenGanDay/DiemDenGanDay'
import OBatCuDau from './oBatCuDau/OBatCuDau'

const TrangChu = () => {

   useEffect(() => {
      window.scrollTo(0, 0)
   })

   return (
      <div className='TrangChu'>
         <Banner />
         <ChonViTri/>
         <DiemDenGanDay />
         <OBatCuDau />
      </div>
   )
}

export default TrangChu