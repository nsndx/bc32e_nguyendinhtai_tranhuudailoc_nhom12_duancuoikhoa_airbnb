import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth } from '../../services/authServices';
import { DangNhap, PostDangNhap } from '../../types/authTypes';
import { AccessToken, UserLogin } from '../../utils/constants/api';

type InitialState = {
   isFetchContentDangNhap: boolean,
   errContentDangNhap?: any,
   contentDangNhap?: DangNhap
}

const initialState: InitialState = {
   isFetchContentDangNhap: false
}

export const { reducer: dangNhapReducer, actions: dangNhapActions } = createSlice({
   name: 'dangNhap',
   initialState,
   reducers: {
      removeContentDangNhap: (state, action) => {
         state.contentDangNhap = undefined
         state.errContentDangNhap = undefined
         localStorage.removeItem(UserLogin)
         localStorage.removeItem(AccessToken)
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(dangNhap.pending, (state, action) => {
            state.isFetchContentDangNhap = true
         }).addCase(dangNhap.fulfilled, (state, action) => {
            state.isFetchContentDangNhap = false
            state.errContentDangNhap = undefined
            state.contentDangNhap = action.payload
            localStorage.setItem(UserLogin, JSON.stringify(action.payload.user))
            localStorage.setItem(AccessToken, JSON.stringify(action.payload.token))
         }).addCase(dangNhap.rejected, (state, action) => {
            state.isFetchContentDangNhap = false
            state.contentDangNhap = undefined
            state.errContentDangNhap = action.payload
         })
   }
});

export const dangNhap = createAsyncThunk('dangNhap',
   async (data: PostDangNhap, { rejectWithValue }) => {
      try {
         const result = await auth.dangNhap(data)
         return result.data.content
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
