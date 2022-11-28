import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { datPhong } from '../../services/datPhongServices';

type InitialState = {
   isFetchMessageDeleteDatPhong: boolean,
   errMessageDeleteDatPhong?: any,
   messageDeleteDatPhong?: string
}

const initialState: InitialState = {
   isFetchMessageDeleteDatPhong: false
}

export const { reducer: deleteDatPhongReducer, actions: deleteDatPhongActions } = createSlice({
   name: 'deleteDatPhong',
   initialState,
   reducers: {
      removeMessageDeleteDatPhong: (state, action) => {
         state.errMessageDeleteDatPhong = undefined
         state.messageDeleteDatPhong = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(deleteDatPhong.pending, (state, action) => {
            state.isFetchMessageDeleteDatPhong = true
         }).addCase(deleteDatPhong.fulfilled, (state, action) => {
            state.isFetchMessageDeleteDatPhong = false
            state.errMessageDeleteDatPhong = undefined
            state.messageDeleteDatPhong = action.payload
         }).addCase(deleteDatPhong.rejected, (state, action) => {
            state.isFetchMessageDeleteDatPhong = false
            state.messageDeleteDatPhong = undefined
            state.errMessageDeleteDatPhong = action.payload
         })
   }
});

export const deleteDatPhong = createAsyncThunk('deleteDatPhong',
   async (data: string, { rejectWithValue }) => {
      try {
         const result = await datPhong.deleteDatPhong(data)
         return result.data.message
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
