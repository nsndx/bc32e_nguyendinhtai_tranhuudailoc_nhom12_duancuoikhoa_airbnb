import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { phongThue } from '../../services/phongThueServices';
import { PhongThue, PostPhongThue } from '../../types/phongThueTypes';

type InitialState = {
   isFetchContentPostPhongThue: boolean,
   errContentPostPhongThue?: any,
   contentPostPhongThue?: PhongThue
}

const initialState: InitialState = {
   isFetchContentPostPhongThue: false
}

export const { reducer: postPhongThueReducer, actions: postPhongThueActions } = createSlice({
   name: 'postPhongThue',
   initialState,
   reducers: {
      removeContentPostPhongThue: (state, action) => {
         state.contentPostPhongThue = undefined
         state.errContentPostPhongThue = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(postPhongThue.pending, (state, action) => {
            state.isFetchContentPostPhongThue = true
         }).addCase(postPhongThue.fulfilled, (state, action) => {
            state.isFetchContentPostPhongThue = false
            state.errContentPostPhongThue = undefined
            state.contentPostPhongThue = action.payload
         }).addCase(postPhongThue.rejected, (state, action) => {
            state.isFetchContentPostPhongThue = false
            state.contentPostPhongThue = undefined
            state.errContentPostPhongThue = action.payload
         })
   }

});

export const postPhongThue = createAsyncThunk('postPhongThue',
   async (data: PostPhongThue, { rejectWithValue }) => {
      try {
         const result = await phongThue.postPhongThue(data)
         return result.data.content
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)