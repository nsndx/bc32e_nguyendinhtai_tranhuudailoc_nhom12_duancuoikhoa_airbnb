import { ContentGetUsersPhanTrang, NguoiDung, PostNguoiDung, PutNguoiDung } from "../types/nguoiDungTypes"
import { api } from "../utils/constants/api"

export const nguoiDung = {
   getUsersPhanTrang: (data: string) => {
      return api.get<HttpResponse<ContentGetUsersPhanTrang<NguoiDung[]>>>(`/api/users/phan-trang-tim-kiem?${data}`)
   },
   deleteUsers: (data: string) => {
      return api.delete<HttpResponse<null>>(`/api/users?id=${data}`)
   },
   postUsers: (data: PostNguoiDung) => {
      return api.post<HttpResponse<NguoiDung>>(`/api/users`, data)
   },
   getUsersID: (data: string | undefined) => {
      return api.get<HttpResponse<NguoiDung>>(`/api/users/${data}`)
   },
   getUsersAll: () => {
      return api.get<HttpResponse<NguoiDung[]>>(`/api/users`)
   },
   putUsersID: (id: string | undefined, data: PutNguoiDung) => {
      return api.put<HttpResponse<NguoiDung>>(`/api/users/${id}`, data)
   },
   postUsersUploadAvatar: (data: any) => {
      return api.post<HttpResponse<NguoiDung>>(`/api/users/upload-avatar`, data)
   },
}