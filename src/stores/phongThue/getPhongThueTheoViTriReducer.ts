import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { phongThue } from '../../services/phongThueServices';
import { PhongThue } from '../../types/phongThueTypes';


type InitialState = {
   isFetchContentGetPhongThueTheoViTri: boolean,
   errContentGetPhongThueTheoViTri?: any,
   contentGetPhongThueTheoViTri?: PhongThue[]
}

const initialState: InitialState = {
   isFetchContentGetPhongThueTheoViTri: false
}

export const { reducer: getPhongThueTheoViTriReducer, actions: getPhongThueTheoViTriActions } = createSlice({
   name: 'getPhongThueTheoViTri',
   initialState,
   reducers: {
      removecontentGetPhongThueTheoViTri:(state, action)=>{
         state.contentGetPhongThueTheoViTri = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(getPhongThueTheoViTri.pending, (state, action) => {
            state.isFetchContentGetPhongThueTheoViTri = true
         }).addCase(getPhongThueTheoViTri.fulfilled, (state, action) => {
            state.isFetchContentGetPhongThueTheoViTri = false
            state.contentGetPhongThueTheoViTri = action.payload
         }).addCase(getPhongThueTheoViTri.rejected, (state, action) => {
            state.isFetchContentGetPhongThueTheoViTri = false
            state.errContentGetPhongThueTheoViTri = action.payload
         })
   }
});

export const getPhongThueTheoViTri = createAsyncThunk('getPhongThueTheoViTri',
   async (data: string, { rejectWithValue }) => {
      try {
         const result = await phongThue.getPhongThueTheoViTri(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)