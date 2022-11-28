import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { phongThue } from '../../services/phongThueServices';
import { PhongThue } from '../../types/phongThueTypes';


type InitialState = {
   isFetchContentGetPhongThueAll: boolean,
   errContentGetPhongThueAll?: any,
   contentGetPhongThueAll?: PhongThue[]
}

const initialState: InitialState = {
   isFetchContentGetPhongThueAll: false
}

export const { reducer: getPhongThueAllReducer, actions: getPhongThueAllActions } = createSlice({
   name: 'getPhongThueAll',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getPhongThueAll.pending, (state, action) => {
            state.isFetchContentGetPhongThueAll = true
         }).addCase(getPhongThueAll.fulfilled, (state, action) => {
            state.isFetchContentGetPhongThueAll = false
            state.contentGetPhongThueAll = action.payload
         }).addCase(getPhongThueAll.rejected, (state, action) => {
            state.isFetchContentGetPhongThueAll = false
            state.errContentGetPhongThueAll = action.payload
         })
   }
});

export const getPhongThueAll = createAsyncThunk('getPhongThueAll',
   async (data, { rejectWithValue }) => {
      try {
         const result = await phongThue.getPhongThueAll()
         return result.data.content
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)