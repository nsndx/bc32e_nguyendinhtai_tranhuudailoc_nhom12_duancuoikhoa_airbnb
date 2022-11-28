import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { viTri } from '../../services/viTriServices';
import { ViTri } from '../../types/viTriTypes';

type InitialState = {
   isFetchContentGetViTriAll: boolean,
   errContentGetViTriAll?: any,
   contentGetViTriAll?: ViTri[]
}

const initialState: InitialState = {
   isFetchContentGetViTriAll: false
}

export const { reducer: getViTriAllReducer, actions: getViTriAllActions } = createSlice({
   name: 'getViTriAll',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getViTriAll.pending, (state, action) => {
            state.isFetchContentGetViTriAll = true
         }).addCase(getViTriAll.fulfilled, (state, action) => {
            state.isFetchContentGetViTriAll = false
            state.contentGetViTriAll = action.payload
         }).addCase(getViTriAll.rejected, (state, action) => {
            state.isFetchContentGetViTriAll = false
            state.errContentGetViTriAll = action.payload
         })
   }
});

export const getViTriAll = createAsyncThunk('getViTriAll',
   async (data, { rejectWithValue }) => {
      try {
         const result = await viTri.getViTriAll()
         return result.data.content
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)