export type PhongThue = {
   id: number,
   tenPhong: string,
   khach: number,
   phongNgu: number,
   giuong: number,
   phongTam: number,
   moTa: string,
   giaTien: number,
   mayGiat: boolean,
   banLa: boolean,
   tivi: boolean,
   dieuHoa: boolean,
   wifi: boolean,
   bep: boolean,
   doXe: boolean,
   hoBoi: boolean,
   banUi: boolean,
   maViTri: number,
   hinhAnh: string
}

export type ContentGetPhongThuePhanTrang<T> = {
   pageIndex: string,
   pageSize: number,
   totalRow: number,
   keywords: string,
   data: T
}

export type PostPhongThue = {
   tenPhong?: string,
   khach?: number,
   phongNgu?: number,
   giuong?: number,
   phongTam?: number,
   moTa?: string,
   giaTien?: number,
   mayGiat?: boolean,
   banLa?: boolean,
   tivi?: boolean,
   dieuHoa?: boolean,
   wifi?: boolean,
   bep?: boolean,
   doXe?: boolean,
   hoBoi?: boolean,
   banUi?: boolean,
   maViTri?: number,
   hinhAnh?: string
}

export type PutPhongThue = {
   tenPhong?: string,
   khach?: number,
   phongNgu?: number,
   giuong?: number,
   phongTam?: number,
   moTa?: string,
   giaTien?: number,
   mayGiat?: boolean,
   banLa?: boolean,
   tivi?: boolean,
   dieuHoa?: boolean,
   wifi?: boolean,
   bep?: boolean,
   doXe?: boolean,
   hoBoi?: boolean,
   banUi?: boolean,
   maViTri?: number,
   hinhAnh?: string
}