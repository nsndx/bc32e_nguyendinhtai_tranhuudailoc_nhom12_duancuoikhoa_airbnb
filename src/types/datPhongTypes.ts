export type DatPhong = {
   id: number,
   maPhong: number,
   ngayDen: string,
   ngayDi: string,
   soLuongKhach: number,
   maNguoiDung: number
}

export type PostDatPhong = {
   maPhong?: number,
   ngayDen?: string,
   ngayDi?: string,
   soLuongKhach?: number,
   maNguoiDung?: number
}

export type PutDatPhong = {
   maPhong?: number,
   ngayDen?: string,
   ngayDi?: string,
   soLuongKhach?: number,
   maNguoiDung?: number
}