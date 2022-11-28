import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { viTri } from '../../services/viTriServices';
import { PostViTri, ViTri } from '../../types/viTriTypes';

type InitialState = {
   isFetchContentPostViTri: boolean,
   errContentPostViTri?: any,
   contentPostViTri?: ViTri
}

const initialState: InitialState = {
   isFetchContentPostViTri: false
}

export const { reducer: postViTriReducer, actions: postViTriActions }  = createSlice({
   name: 'postViTri',
   initialState,
   reducers: {
      removeContentPostViTri: (state, action) => {
         state.contentPostViTri = undefined
         state.errContentPostViTri = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(postViTri.pending, (state, action) => {
            state.isFetchContentPostViTri = true
         }).addCase(postViTri.fulfilled, (state, action) => {
            state.isFetchContentPostViTri = false
            state.errContentPostViTri = undefined
            state.contentPostViTri = action.payload
         }).addCase(postViTri.rejected, (state, action) => {
            state.isFetchContentPostViTri = false
            state.contentPostViTri = undefined
            state.errContentPostViTri = action.payload
         })
   }   
});

export const postViTri = createAsyncThunk('postViTri',
   async (data: PostViTri, { rejectWithValue }) => {
      try {
         const result = await viTri.postViTri(data)
         return result.data.content
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)