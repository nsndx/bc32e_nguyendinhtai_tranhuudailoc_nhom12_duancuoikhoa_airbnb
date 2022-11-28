import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { nguoiDung } from '../../services/nguoiDungServices';
import { NguoiDung } from '../../types/nguoiDungTypes';

type InitialState = {
   isFetchContentGetUsersID: boolean,
   errContentGetUsersID?: any,
   contentGetUsersID?: NguoiDung
}

const initialState: InitialState = {
   isFetchContentGetUsersID: false
}

export const { reducer: getUsersIDReducer, actions: getUsersIDActions} = createSlice({
   name: 'getUsersID',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getUsersID.pending, (state, action) => {
            state.isFetchContentGetUsersID = true
         }).addCase(getUsersID.fulfilled, (state, action) => {
            state.isFetchContentGetUsersID = false
            state.contentGetUsersID = action.payload
         }).addCase(getUsersID.rejected, (state, action) => {
            state.isFetchContentGetUsersID = false
            state.errContentGetUsersID = action.payload
         })
   }
});

export const getUsersID = createAsyncThunk('getUsersID',
   async (data: string | undefined, { rejectWithValue }) => {
      try {
         const result = await nguoiDung.getUsersID(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

