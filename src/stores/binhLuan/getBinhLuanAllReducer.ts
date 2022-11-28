import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { binhLuan } from '../../services/binhLuanServices';
import { BinhLuan } from '../../types/binhLuanTypes';

type InitialState = {
   isFetchContentGetBinhLuanAll: boolean,
   errContentGetBinhLuanAll?: any,
   contentGetBinhLuanAll?: BinhLuan[]
}

const initialState: InitialState = {
   isFetchContentGetBinhLuanAll: false
}

export const { reducer: getBinhLuanAllReducer, actions: getBinhLuanAllActions } = createSlice({
   name: 'getBinhLuanAll',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getBinhLuanAll.pending, (state, action) => {
            state.isFetchContentGetBinhLuanAll = true
         }).addCase(getBinhLuanAll.fulfilled, (state, action) => {
            state.isFetchContentGetBinhLuanAll = false
            state.contentGetBinhLuanAll = action.payload
         }).addCase(getBinhLuanAll.rejected, (state, action) => {
            state.isFetchContentGetBinhLuanAll = false
            state.errContentGetBinhLuanAll = action.payload
         })
   }
});

export const getBinhLuanAll = createAsyncThunk('getBinhLuanAll',
   async (data, { rejectWithValue }) => {
      try {
         const result = await binhLuan.getBinhLuanAll()
         return result.data.content
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)