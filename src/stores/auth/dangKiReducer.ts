import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth } from '../../services/authServices';
import { DangKi, PostDangKi } from '../../types/authTypes';

type InitialState = {
   isFetchContentDangKi: boolean,
   errContentDangKi?: any,
   contentDangKi?: DangKi
}

const initialState: InitialState = {
   isFetchContentDangKi: false
}

export const { reducer: dangKiReducer, actions: dangKiActions } = createSlice({
   name: 'dangKi',
   initialState,
   reducers: {
      removeContentDangKi: (state, action) => {
         state.contentDangKi = undefined
         state.errContentDangKi = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(dangKi.pending, (state, action) => {
            state.isFetchContentDangKi = true
         }).addCase(dangKi.fulfilled, (state, action) => {
            state.isFetchContentDangKi = false
            state.errContentDangKi = undefined
            state.contentDangKi = action.payload
         }).addCase(dangKi.rejected, (state, action) => {
            state.isFetchContentDangKi = false
            state.contentDangKi = undefined
            state.errContentDangKi = action.payload
         })
   }
});

export const dangKi = createAsyncThunk('dangKi',
   async (data: PostDangKi, { rejectWithValue }) => {
      try {
         const result = await auth.dangKi(data)
         return result.data.content
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
