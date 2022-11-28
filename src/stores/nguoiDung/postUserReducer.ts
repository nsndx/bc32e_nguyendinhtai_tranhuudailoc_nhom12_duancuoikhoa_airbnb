import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { nguoiDung } from '../../services/nguoiDungServices';
import { NguoiDung, PostNguoiDung } from '../../types/nguoiDungTypes';

type InitialState = {
   isFetchContentPostUser: boolean,
   errContentPostUser?: any,
   contentPostUser?: NguoiDung
}

const initialState: InitialState = {
   isFetchContentPostUser: false
}

export const { reducer: postUserReducer, actions: postUserActions } = createSlice({
   name: 'postUser',
   initialState,
   reducers: {
      removeContentPostUser: (state, action) => {
         state.contentPostUser = undefined
         state.errContentPostUser = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(postUser.pending, (state, action) => {
            state.isFetchContentPostUser = true
         }).addCase(postUser.fulfilled, (state, action) => {
            state.isFetchContentPostUser = false
            state.errContentPostUser = undefined
            state.contentPostUser = action.payload
         }).addCase(postUser.rejected, (state, action) => {
            state.isFetchContentPostUser = false
            state.contentPostUser = undefined
            state.errContentPostUser = action.payload
         })
   }
});

export const postUser = createAsyncThunk('postUser',
   async (data: PostNguoiDung, { rejectWithValue }) => {
      try {
         const result = await nguoiDung.postUsers(data)
         return result.data.content
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
