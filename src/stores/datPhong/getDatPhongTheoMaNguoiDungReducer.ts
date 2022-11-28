import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { datPhong } from '../../services/datPhongServices';
import { DatPhong } from '../../types/datPhongTypes';

type InitialState = {
   isFetchContentGetDatPhongTheoMaNguoiDung: boolean,
   errContentGetDatPhongTheoMaNguoiDung?: any,
   contentGetDatPhongTheoMaNguoiDung?: DatPhong[]
}

const initialState: InitialState = {
   isFetchContentGetDatPhongTheoMaNguoiDung: false
}

export const { reducer: getDatPhongTheoMaNguoiDungReducer, actions: getDatPhongTheoMaNguoiDungActions } = createSlice({
   name: 'getDatPhongTheoMaNguoiDung',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getDatPhongTheoMaNguoiDung.pending, (state, action) => {
            state.isFetchContentGetDatPhongTheoMaNguoiDung = true
         }).addCase(getDatPhongTheoMaNguoiDung.fulfilled, (state, action) => {
            state.isFetchContentGetDatPhongTheoMaNguoiDung = false
            state.contentGetDatPhongTheoMaNguoiDung = action.payload
         }).addCase(getDatPhongTheoMaNguoiDung.rejected, (state, action) => {
            state.isFetchContentGetDatPhongTheoMaNguoiDung = false
            state.errContentGetDatPhongTheoMaNguoiDung = action.payload
         })
   }
});

export const getDatPhongTheoMaNguoiDung = createAsyncThunk('getDatPhongTheoMaNguoiDung',
   async (data: string | undefined, { rejectWithValue }) => {
      try {
         const result = await datPhong.getDatPhongTheoMaNguoiDung(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

