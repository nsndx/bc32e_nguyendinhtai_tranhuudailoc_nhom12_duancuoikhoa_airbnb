export type NguoiDung = {
   id: number,
   name: string,
   email: string,
   password: string,
   phone: string,
   birthday: string,
   avatar: string,
   gender: boolean,
   role: string,
}

export type ContentGetUsersPhanTrang<T> = {
   pageIndex: string,
   pageSize: number,
   totalRow: number,
   keywords: string,
   data: T
}

export type PostNguoiDung = {
   name?: string,
   email?: string,
   password?: string,
   phone?: string,
   birthday?: string,
   gender?: boolean,
   role?: string,
}

export type PutNguoiDung = {
   name?: string,
   email?: string,
   phone?: string,
   birthday?: string,
   gender?: boolean,
   role?: string,
}