import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { phongThue } from '../../services/phongThueServices';

type InitialState = {
   isFetchMessageDeletePhongThue: boolean,
   errMessageDeletePhongThue?: any,
   messageDeletePhongThue?: string
}

const initialState: InitialState = {
   isFetchMessageDeletePhongThue: false
}

export const { reducer: deletePhongThueReducer, actions: deletePhongThueActions } = createSlice({
   name: 'deletePhongThue',
   initialState,
   reducers: {
      removeMessageDeletePhongThue: (state, action) => {
         state.errMessageDeletePhongThue = undefined
         state.messageDeletePhongThue = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(deletePhongThue.pending, (state, action) => {
            state.isFetchMessageDeletePhongThue = true
         }).addCase(deletePhongThue.fulfilled, (state, action) => {
            state.isFetchMessageDeletePhongThue = false
            state.errMessageDeletePhongThue = undefined
            state.messageDeletePhongThue = action.payload
         }).addCase(deletePhongThue.rejected, (state, action) => {
            state.isFetchMessageDeletePhongThue = false
            state.messageDeletePhongThue = undefined
            state.errMessageDeletePhongThue = action.payload
         })
   }
});

export const deletePhongThue = createAsyncThunk('deletePhongThue',
   async (data: string, { rejectWithValue }) => {
      try {
         const result = await phongThue.deletePhongThue(data)
         return result.data.message
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
