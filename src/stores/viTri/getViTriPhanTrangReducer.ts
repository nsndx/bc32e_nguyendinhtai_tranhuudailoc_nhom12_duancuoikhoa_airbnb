import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { viTri } from '../../services/viTriServices';
import { ContentGetViTriPhanTrang, ViTri } from '../../types/viTriTypes';

type InitialState = {
   isFetchContentGetViTri: boolean,
   errContentGetViTri?: any,
   contentGetViTri?: ContentGetViTriPhanTrang<ViTri[]>,
}

const initialState: InitialState = {
   isFetchContentGetViTri: false,
}

export const { reducer: getViTriPhanTrangReducer, actions: getViTriPhanTrangActions } = createSlice({
   name: 'getViTriPhanTrang',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getViTriPhanTrang.pending, (state, action) => {
            state.isFetchContentGetViTri = true
         }).addCase(getViTriPhanTrang.fulfilled, (state, action) => {
            state.isFetchContentGetViTri = false
            state.contentGetViTri = action.payload
         }).addCase(getViTriPhanTrang.rejected, (state, action) => {
            state.isFetchContentGetViTri = false
            state.errContentGetViTri = action.payload
         })
   }
});

export const getViTriPhanTrang = createAsyncThunk('getViTriPhanTrang',
   async (data: string, { rejectWithValue }) => {
      try {
         const result = await viTri.getViTriPhanTrang(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

