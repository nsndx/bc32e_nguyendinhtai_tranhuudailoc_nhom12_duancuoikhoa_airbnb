import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { viTri } from '../../services/viTriServices';
import { ViTri } from '../../types/viTriTypes';

type InitialState = {
   isFetchContentGetViTriID: boolean,
   errContentGetViTriID?: any,
   contentGetViTriID?: ViTri
}

const initialState: InitialState = {
   isFetchContentGetViTriID: false
}

export const { reducer: getViTriIDReducer, actions: getViTriIDActions } = createSlice({
   name: 'getViTriID',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getViTriID.pending, (state, action) => {
            state.isFetchContentGetViTriID = true
         }).addCase(getViTriID.fulfilled, (state, action) => {
            state.isFetchContentGetViTriID = false
            state.contentGetViTriID = action.payload
         }).addCase(getViTriID.rejected, (state, action) => {
            state.isFetchContentGetViTriID = false
            state.errContentGetViTriID = action.payload
         })
   }
});

export const getViTriID = createAsyncThunk('getViTriID',
   async (data: string, { rejectWithValue }) => {
      try {
         const result = await viTri.getViTriID(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)