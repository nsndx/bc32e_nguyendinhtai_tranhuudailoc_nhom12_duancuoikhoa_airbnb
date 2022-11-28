import { DatPhong, PostDatPhong, PutDatPhong } from "../types/datPhongTypes"
import { api } from "../utils/constants/api"

export const datPhong = {
   getDatPhongTheoMaNguoiDung: (id: string | undefined) => {
      return api.get<HttpResponse<DatPhong[]>>(`/api/dat-phong/lay-theo-nguoi-dung/${id}`)
   },
   deleteDatPhong: (data: string) => {
      return api.delete<HttpResponse<null>>(`/api/dat-phong/${data}`)
   },
   postDatPhong: (data: PostDatPhong) => {
      return api.post<HttpResponse<DatPhong>>(`/api/dat-phong`, data)
   },
   getDatPhongID: (data: string | undefined) => {
      return api.get<HttpResponse<DatPhong>>(`/api/dat-phong/${data}`)
   },
   putDatPhongID: (id: string | undefined, data: PutDatPhong) => {
      return api.put<HttpResponse<DatPhong>>(`/api/dat-phong/${id}`, data)
   },
}