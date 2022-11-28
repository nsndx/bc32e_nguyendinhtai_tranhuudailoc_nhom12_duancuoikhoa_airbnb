export type BinhLuan = {
   id: number,
   maPhong: number,
   maNguoiBinhLuan: number,
   ngayBinhLuan: string,
   noiDung: string,
   saoBinhLuan: number
}

export type PostBinhLuan = {
   maPhong?: number,
   maNguoiBinhLuan?: number,
   ngayBinhLuan?: string,
   noiDung?: string,
   saoBinhLuan?: number
}

export type PutBinhLuan = {
   maPhong?: number,
   maNguoiBinhLuan?: number,
   ngayBinhLuan?: string,
   noiDung?: string,
   saoBinhLuan?: number
}