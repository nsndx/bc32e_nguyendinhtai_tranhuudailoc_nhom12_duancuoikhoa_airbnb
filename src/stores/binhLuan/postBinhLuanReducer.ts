import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { binhLuan } from '../../services/binhLuanServices';
import { BinhLuan, PostBinhLuan } from '../../types/binhLuanTypes';

type InitialState = {
   isFetchContentPostBinhLuan: boolean,
   errContentPostBinhLuan?: any,
   contentPostBinhLuan?: BinhLuan
}

const initialState: InitialState = {
   isFetchContentPostBinhLuan: false
}

export const { reducer: postBinhLuanReducer, actions: postBinhLuanActions } = createSlice({
   name: 'postBinhLuan',
   initialState,
   reducers: {
      removeContentPostBinhLuan: (state, action) => {
         state.contentPostBinhLuan = undefined
         state.errContentPostBinhLuan = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(postBinhLuan.pending, (state, action) => {
            state.isFetchContentPostBinhLuan = true
         }).addCase(postBinhLuan.fulfilled, (state, action) => {
            state.isFetchContentPostBinhLuan = false
            state.errContentPostBinhLuan = undefined
            state.contentPostBinhLuan = action.payload
         }).addCase(postBinhLuan.rejected, (state, action) => {
            state.isFetchContentPostBinhLuan = false
            state.contentPostBinhLuan = undefined
            state.errContentPostBinhLuan = action.payload
         })
   }
});

export const postBinhLuan = createAsyncThunk('postBinhLuan',
   async (data: PostBinhLuan, { rejectWithValue }) => {
      try {
         const result = await binhLuan.postBinhLuan(data)
         return result.data.content
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
