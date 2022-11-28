export type DangKi = {
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

export type PostDangKi = {
   name?: string,
   email?: string,
   password?: string,
   phone?: string,
   birthday?: string,
   gender?: boolean,
   role?: string,
}

export type DangNhap = {
   user: {
      id: number,
      name: string,
      email: string,
      password: string,
      phone: string,
      birthday: string,
      avatar: string,
      gender: boolean,
      role: string
   },
   token: string
}

export type PostDangNhap = {
   email?: string,
   password?: string
}