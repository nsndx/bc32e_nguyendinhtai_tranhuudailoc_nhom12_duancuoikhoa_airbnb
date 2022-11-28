import { DangKi, DangNhap, PostDangKi, PostDangNhap } from "../types/authTypes"
import { api } from "../utils/constants/api"

export const auth = {
   dangKi: (data: PostDangKi) => {
      return api.post<HttpResponse<DangKi>>(`/api/auth/signup`, data)
   },
   dangNhap: (data: PostDangNhap) => {
      return api.post<HttpResponse<DangNhap>>(`/api/auth/signin`, data)
   },
}