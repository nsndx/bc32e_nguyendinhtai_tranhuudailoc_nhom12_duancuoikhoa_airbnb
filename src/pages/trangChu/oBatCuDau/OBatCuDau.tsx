import React from 'react'

const OBatCuDau: React.FC = () => {
   return (
      <div className='OBatCuDau py-5'>
         <div className='container'>
            <h3 className='text-xl font-bold text-amber-800'>Ở bất cứ đâu</h3>
            <div className='grid grid-cols-4 gap-5'>
               <div className='col-span-2 lg:col-span-1'>
                  <img src="./image/nha.jpg" alt="" className='w-full rounded-xl hover:-translate-y-2 hover:shadow hover:shadow-black transition duration-500' />
                  <p className='m-0 mt-1 font-bold text-amber-800'>Toàn bộ nhà</p>
               </div>
               <div className='col-span-2 lg:col-span-1'>
                  <img src="./image/docdao.jpg" alt="" className='w-full rounded-xl hover:-translate-y-2 hover:shadow hover:shadow-black transition duration-500' />
                  <p className='m-0 mt-1 font-bold text-amber-800'>Chỗ ở độc đáo</p>
               </div>
               <div className='col-span-2 lg:col-span-1'>
                  <img src="./image/trangtrai.jpg" alt="" className='w-full rounded-xl hover:-translate-y-2 hover:shadow hover:shadow-black transition duration-500' />
                  <p className='m-0 mt-1 font-bold text-amber-800'>Trang trại và thiên nhiên</p>
               </div>
               <div className='col-span-2 lg:col-span-1'>
                  <img src="./image/thucung.jpg" alt="" className='w-full rounded-xl hover:-translate-y-2 hover:shadow hover:shadow-black transition duration-500' />
                  <p className='m-0 mt-1 font-bold text-amber-800'>Cho phép mang theo thú cưng</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default OBatCuDau