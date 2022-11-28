import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { datPhong } from '../../services/datPhongServices';
import { DatPhong, PostDatPhong } from '../../types/datPhongTypes';

type InitialState = {
   isFetchContentPostDatPhong: boolean,
   errContentPostDatPhong?: any,
   contentPostDatPhong?: DatPhong
}

const initialState: InitialState = {
   isFetchContentPostDatPhong: false
}

export const { reducer: postDatPhongReducer, actions: postDatPhongActions } = createSlice({
   name: 'postDatPhong',
   initialState,
   reducers: {
      removeContentPostDatPhong: (state, action) => {
         state.contentPostDatPhong = undefined
         state.errContentPostDatPhong = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(postDatPhong.pending, (state, action) => {
            state.isFetchContentPostDatPhong = true
         }).addCase(postDatPhong.fulfilled, (state, action) => {
            state.isFetchContentPostDatPhong = false
            state.errContentPostDatPhong = undefined
            state.contentPostDatPhong = action.payload
         }).addCase(postDatPhong.rejected, (state, action) => {
            state.isFetchContentPostDatPhong = false
            state.contentPostDatPhong = undefined
            state.errContentPostDatPhong = action.payload
         })
   }
});

export const postDatPhong = createAsyncThunk('postDatPhong',
   async (data: PostDatPhong, { rejectWithValue }) => {
      try {
         const result = await datPhong.postDatPhong(data)
         return result.data.content
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
