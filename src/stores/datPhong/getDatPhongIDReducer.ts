import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { datPhong } from '../../services/datPhongServices';
import { DatPhong } from '../../types/datPhongTypes';

type InitialState = {
   isFetchContentGetDatPhongID: boolean,
   errContentGetDatPhongID?: any,
   contentGetDatPhongID?: DatPhong
}

const initialState: InitialState = {
   isFetchContentGetDatPhongID: false
}

export const { reducer: getDatPhongIDReducer, actions: getDatPhongIDActions } = createSlice({
   name: 'getDatPhongID',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getDatPhongID.pending, (state, action) => {
            state.isFetchContentGetDatPhongID = true
         }).addCase(getDatPhongID.fulfilled, (state, action) => {
            state.isFetchContentGetDatPhongID = false
            state.contentGetDatPhongID = action.payload
         }).addCase(getDatPhongID.rejected, (state, action) => {
            state.isFetchContentGetDatPhongID = false
            state.errContentGetDatPhongID = action.payload
         })
   }
});

export const getDatPhongID = createAsyncThunk('getDatPhongID',
   async (data: string | undefined, { rejectWithValue }) => {
      try {
         const result = await datPhong.getDatPhongID(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

