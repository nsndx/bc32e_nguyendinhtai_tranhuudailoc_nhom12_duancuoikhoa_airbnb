import { BinhLuan, PostBinhLuan } from "../types/binhLuanTypes"
import { api } from "../utils/constants/api"

export const binhLuan = {
   getBinhLuanAll: () => {
      return api.get<HttpResponse<BinhLuan[]>>(`/api/binh-luan`)
   },
   postBinhLuan: (data: PostBinhLuan) => {
      return api.post<HttpResponse<BinhLuan>>(`/api/binh-luan`, data)
   },
}