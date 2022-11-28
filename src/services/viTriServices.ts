import { ContentGetViTriPhanTrang, PostViTri, PutViTri, ViTri } from "../types/viTriTypes"
import { api } from "../utils/constants/api"

export const viTri = {
   getViTriAll: () => {
      return api.get<HttpResponse<ViTri[]>>(`/api/vi-tri`)
   },
   getViTriPhanTrang: (data: string) => {
      return api.get<HttpResponse<ContentGetViTriPhanTrang<ViTri[]>>>(`/api/vi-tri/phan-trang-tim-kiem?${data}`)
   },
   deleteViTri: (data: string) => {
      return api.delete<HttpResponse<null>>(`/api/vi-tri/${data}`)
   },
   postViTri: (data: PostViTri) => {
      return api.post<HttpResponse<ViTri>>(`/api/vi-tri`, data)
   },
   getViTriID: (data: string) => {
      return api.get<HttpResponse<ViTri>>(`/api/vi-tri/${data}`)
   },
   putViTriID: (id: string | undefined, data: PutViTri) => {
      return api.put<HttpResponse<ViTri>>(`/api/vi-tri/${id}`, data)
   },
}