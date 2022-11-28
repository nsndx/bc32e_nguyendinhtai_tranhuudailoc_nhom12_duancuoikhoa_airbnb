import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import AdminLayout from '../components/layouts/adminLayout/AdminLayout'
import MainLayout from '../components/layouts/mainLayout/MainLayout'
import UserLayout from '../components/layouts/userLayout/UserLayout'
import QuanLyDatPhong from '../pages/admin/quanLyDatPhong/QuanLyDatPhong'
import QuanLyNguoiDung from '../pages/admin/quanLyNguoiDung/QuanLyNguoiDung'
import QuanLyThongTinPhong from '../pages/admin/quanLyThongTinPhong/QuanLyThongTinPhong'
import QuanLyThongTinViTri from '../pages/admin/quanLyThongTinViTri/QuanLyThongTinViTri'
import ChiTietPhong from '../pages/chiTietPhong/ChiTietPhong'
import DangKi from '../pages/dangKi/DangKi'
import DangNhap from '../pages/dangNhap/DangNhap'
import DanhSachPhong from '../pages/danhSachPhong/DanhSachPhong'
import ThongTinCaNhan from '../pages/thongTinCaNhan/ThongTinCaNhan'
import TrangChu from '../pages/trangChu/TrangChu'

const Routers: React.FC = () => {
   return useRoutes([
      {
         path: '',
         element: <MainLayout />,
         children: [
            {
               path: '',
               element: <Navigate to='trangchu' />
            },
            {
               path: 'trangchu',
               element: <TrangChu />
            },
            {
               path: 'trainghiem',
               element: <div className='container py-24'>Trải nghiệm</div>
            },
            {
               path: 'trainghiemtructuyen',
               element: <div className='container py-24'>Trải nghiệm trực tuyến</div>
            },
            {
               path: 'danhsachphong/:id',
               element: <DanhSachPhong />
            },
            {
               path: 'chitietphong/:id',
               element: <ChiTietPhong />
            },
            {
               path: 'thongtincanhan/:id',
               element: <ThongTinCaNhan />
            },
         ]
      },
      {
         path: 'admin',
         element: <AdminLayout />,
         children: [
            {
               path: 'quanlynguoidung',
               element: <QuanLyNguoiDung />
            },
            {
               path: 'quanlythongtinvitri',
               element: <QuanLyThongTinViTri />
            },
            {
               path: 'quanlythongtinphong',
               element: <QuanLyThongTinPhong />
            },
            {
               path: 'quanlydatphong/:id',
               element: <QuanLyDatPhong />
            },
         ]
      },
      {
         path: 'user',
         element: <UserLayout />,
         children: [
            {
               path: 'dangki',
               element: <DangKi />
            },
            {
               path: 'dangnhap',
               element: <DangNhap />
            },
         ]
      }
   ])
}

export default Routers