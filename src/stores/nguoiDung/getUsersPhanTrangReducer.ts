import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { nguoiDung } from '../../services/nguoiDungServices';
import { ContentGetUsersPhanTrang, NguoiDung } from '../../types/nguoiDungTypes';

type InitialState = {
   isFetchContentGetUsers: boolean,
   errContentGetUsers?: any,
   contentGetUsers?: ContentGetUsersPhanTrang<NguoiDung[]>,
}

const initialState: InitialState = {
   isFetchContentGetUsers: false,
}

export const { reducer: getUsersPhanTrangReducer, actions: getUsersPhanTrangActions } = createSlice({
   name: 'getUsersPhanTrang',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getUsersPhanTrang.pending, (state, action) => {
            state.isFetchContentGetUsers = true
         }).addCase(getUsersPhanTrang.fulfilled, (state, action) => {
            state.isFetchContentGetUsers = false
            state.contentGetUsers = action.payload
         }).addCase(getUsersPhanTrang.rejected, (state, action) => {
            state.isFetchContentGetUsers = false
            state.errContentGetUsers = action.payload
         })
   }
});

export const getUsersPhanTrang = createAsyncThunk('getUsersPhanTrang',
   async (data:string, { rejectWithValue }) => {
      try {
         const result = await nguoiDung.getUsersPhanTrang(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)
