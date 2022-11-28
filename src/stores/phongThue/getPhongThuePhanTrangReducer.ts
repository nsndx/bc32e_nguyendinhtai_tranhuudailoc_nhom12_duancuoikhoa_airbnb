import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { phongThue } from "../../services/phongThueServices";
import { ContentGetPhongThuePhanTrang, PhongThue } from "../../types/phongThueTypes";

type InitialState = {
   isFetchContentGetPhongThue: boolean,
   errContentGetPhongThue?: any,
   contentGetPhongThue?: ContentGetPhongThuePhanTrang<PhongThue[]>,
}

const initialState: InitialState = {
   isFetchContentGetPhongThue: false,
}

export const { reducer: getPhongThuePhanTrangReducer, actions: getPhongThuePhanTrangActions } = createSlice({
   name: 'getPhongThuePhanTrang',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getPhongThuePhanTrang.pending, (state, action) => {
            state.isFetchContentGetPhongThue = true
         }).addCase(getPhongThuePhanTrang.fulfilled, (state, action) => {
            state.isFetchContentGetPhongThue = false
            state.contentGetPhongThue = action.payload
         }).addCase(getPhongThuePhanTrang.rejected, (state, action) => {
            state.isFetchContentGetPhongThue = false
            state.errContentGetPhongThue = action.payload
         })
   }
});

export const getPhongThuePhanTrang = createAsyncThunk('getPhongThuePhanTrang',
   async (data: string, { rejectWithValue }) => {
      try {
         const result = await phongThue.getPhongThuePhanTrang(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)
