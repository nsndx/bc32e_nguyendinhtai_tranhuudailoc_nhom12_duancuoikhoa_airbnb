import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { nguoiDung } from '../../services/nguoiDungServices';
import { NguoiDung } from '../../types/nguoiDungTypes';

type InitialState = {
   isFetchContentGetUsersAll: boolean,
   errContentGetUsersAll?: any,
   contentGetUsersAll?: NguoiDung[]
}

const initialState: InitialState = {
   isFetchContentGetUsersAll: false
}

export const { reducer: getUsersAllReducer, actions: getUsersAllActions } = createSlice({
   name: 'getUsersAll',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getUsersAll.pending, (state, action) => {
            state.isFetchContentGetUsersAll = true
         }).addCase(getUsersAll.fulfilled, (state, action) => {
            state.isFetchContentGetUsersAll = false
            state.contentGetUsersAll = action.payload
         }).addCase(getUsersAll.rejected, (state, action) => {
            state.isFetchContentGetUsersAll = false
            state.errContentGetUsersAll = action.payload
         })
   }
});

export const getUsersAll = createAsyncThunk('getUsersAll',
   async (data, { rejectWithValue }) => {
      try {
         const result = await nguoiDung.getUsersAll()
         return result.data.content
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

