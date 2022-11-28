import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { datPhong } from '../../services/datPhongServices';
import { DatPhong, PutDatPhong } from '../../types/datPhongTypes';

type InitialState = {
   isFetchContentPutDatPhong: boolean,
   errContentPutDatPhong?: any,
   contentPutDatPhong?: DatPhong
}

const initialState: InitialState = {
   isFetchContentPutDatPhong: false
}

export const { reducer: putDatPhongIDReducer, actions: putDatPhongIDActions } = createSlice({
   name: 'putDatPhongID',
   initialState,
   reducers: {
      removeContentPutDatPhong: (state, action) => {
         state.contentPutDatPhong = undefined
         state.errContentPutDatPhong = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(putDatPhongID.pending, (state, action) => {
            state.isFetchContentPutDatPhong = true
         }).addCase(putDatPhongID.fulfilled, (state, action) => {
            state.isFetchContentPutDatPhong = false
            state.errContentPutDatPhong = undefined
            state.contentPutDatPhong = action.payload
         }).addCase(putDatPhongID.rejected, (state, action) => {
            state.isFetchContentPutDatPhong = false
            state.contentPutDatPhong = undefined
            state.errContentPutDatPhong = action.payload
         })
   }
});

export const putDatPhongID = createAsyncThunk('putDatPhongID',
   async (data: { id: string | undefined, data: PutDatPhong }, { rejectWithValue }) => {
      try {
         const result = await datPhong.putDatPhongID(data.id, data.data)
         return result.data.content
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)