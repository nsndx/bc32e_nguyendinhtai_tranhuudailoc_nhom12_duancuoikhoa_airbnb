import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { nguoiDung } from '../../services/nguoiDungServices';
import { NguoiDung } from '../../types/nguoiDungTypes';

type InitialState = {
   isFetchContentPostUserUpLoadAvatar: boolean,
   errContentPostUserUpLoadAvatar?: any,
   contentPostUserUpLoadAvatar?: NguoiDung
}

const initialState: InitialState = {
   isFetchContentPostUserUpLoadAvatar: false
}

export const { reducer: postUsersUploadAvatarReducer, actions: postUsersUploadAvatarActions } = createSlice({
   name: 'postUsersUploadAvatar',
   initialState,
   reducers: {
      removeContentPostUserUpLoadAvatar: (state, action) => {
         state.contentPostUserUpLoadAvatar = undefined
         state.errContentPostUserUpLoadAvatar = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(postUsersUploadAvatar.pending, (state, action) => {
            state.isFetchContentPostUserUpLoadAvatar = true
         }).addCase(postUsersUploadAvatar.fulfilled, (state, action) => {
            state.isFetchContentPostUserUpLoadAvatar = false
            state.errContentPostUserUpLoadAvatar = undefined
            state.contentPostUserUpLoadAvatar = action.payload
         }).addCase(postUsersUploadAvatar.rejected, (state, action) => {
            state.isFetchContentPostUserUpLoadAvatar = false
            state.contentPostUserUpLoadAvatar = undefined
            state.errContentPostUserUpLoadAvatar = action.payload
         })
   }
});

export const postUsersUploadAvatar = createAsyncThunk('postUsersUploadAvatar',
   async (data: any, { rejectWithValue }) => {
      try {
         const result = await nguoiDung.postUsersUploadAvatar(data)
         return result.data.content
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
