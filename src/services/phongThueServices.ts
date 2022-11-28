import { ContentGetPhongThuePhanTrang, PhongThue, PostPhongThue, PutPhongThue } from "../types/phongThueTypes"
import { api } from "../utils/constants/api"

export const phongThue = {
   getPhongThueAll: () => {
      return api.get<HttpResponse<PhongThue[]>>(`/api/phong-thue`)
   },
   getPhongThuePhanTrang: (data: string) => {
      return api.get<HttpResponse<ContentGetPhongThuePhanTrang<PhongThue[]>>>(`/api/phong-thue/phan-trang-tim-kiem?${data}`)
   },
   deletePhongThue: (data: string) => {
      return api.delete<HttpResponse<null>>(`/api/phong-thue/${data}`)
   },
   postPhongThue: (data: PostPhongThue) => {
      return api.post<HttpResponse<PhongThue>>(`/api/phong-thue`, data)
   },
   getPhongThueID: (data: string) => {
      return api.get<HttpResponse<PhongThue>>(`/api/phong-thue/${data}`)
   },
   putPhongThueID: (id: string | undefined, data: PutPhongThue) => {
      return api.put<HttpResponse<PhongThue>>(`/api/phong-thue/${id}`, data)
   },
   getPhongThueTheoViTri: (data: string) => {
      return api.get<HttpResponse<PhongThue[]>>(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${data}`)
   },
}