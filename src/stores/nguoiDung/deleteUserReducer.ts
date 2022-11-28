import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { nguoiDung } from '../../services/nguoiDungServices';

type InitialState = {
   isFetchMessageDeleteUser: boolean,
   errMessageDeleteUser?: any,
   messageDeleteUser?: string
}

const initialState: InitialState = {
   isFetchMessageDeleteUser: false
}

export const { reducer: deleteUserReducer, actions: deleteUserActions } = createSlice({
   name: 'deleteUser',
   initialState,
   reducers: {
      removeMessageDeleteUser:(state, action)=>{
         state.errMessageDeleteUser = undefined
         state.messageDeleteUser = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(deleteUser.pending, (state, action) => {
            state.isFetchMessageDeleteUser = true
         }).addCase(deleteUser.fulfilled, (state, action) => {
            state.isFetchMessageDeleteUser = false
            state.errMessageDeleteUser = undefined
            state.messageDeleteUser = action.payload
         }).addCase(deleteUser.rejected, (state, action) => {
            state.isFetchMessageDeleteUser = false
            state.messageDeleteUser = undefined
            state.errMessageDeleteUser = action.payload
         })
   }
});

export const deleteUser = createAsyncThunk('deleteUser',
   async (data: string, { rejectWithValue }) => {
      try {
         const result = await nguoiDung.deleteUsers(data)
         return result.data.message
      } catch (err:any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
