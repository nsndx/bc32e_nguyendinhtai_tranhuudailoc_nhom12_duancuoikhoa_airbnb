import axios from "axios";

const BaseURL = 'https://airbnbnew.cybersoft.edu.vn'
const TokenCybersoft = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIxMS8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2Nzg0OTI4MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3ODY0MDQwMH0.nNcGn0C4SvUfrKPkxYBi5rhhLNuGbmfuND5eXehhzPQ'
export const UserLogin = 'UserLogin'
export const AccessToken = 'AccessToken'

export const api = axios.create()
api.interceptors.request.use((config) => {
   return {
      ...config,
      baseURL: BaseURL,
      headers: {
         tokenCybersoft: TokenCybersoft,
         token: localStorage.getItem(AccessToken)?.replaceAll('"', '')
      }
   }
})