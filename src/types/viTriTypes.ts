export type ViTri = {
   id: number,
   tenViTri: string,
   tinhThanh: string,
   quocGia: string,
   hinhAnh: string
}

export type ContentGetViTriPhanTrang<T> = {
   pageIndex: string,
   pageSize: number,
   totalRow: number,
   keywords: string,
   data: T
}

export type PostViTri = {
   tenViTri?: string,
   tinhThanh?: string,
   quocGia?: string,
   hinhAnh?: string
}

export type PutViTri = {
   tenViTri?: string,
   tinhThanh?: string,
   quocGia?: string,
   hinhAnh?: string
}