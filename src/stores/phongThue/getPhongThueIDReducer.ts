import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { phongThue } from '../../services/phongThueServices';
import { PhongThue } from '../../types/phongThueTypes';


type InitialState = {
   isFetchContentGetPhongThueID: boolean,
   errContentGetPhongThueID?: any,
   contentGetPhongThueID?: PhongThue
}

const initialState: InitialState = {
   isFetchContentGetPhongThueID: false
}

export const { reducer: getPhongThueIDReducer, actions: getPhongThueIDActions } = createSlice({
   name: 'getPhongThueID',
   initialState,
   reducers: {
      removeContentGetPhongThueID: (state, action) => {
         state.errContentGetPhongThueID = undefined
         state.contentGetPhongThueID = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(getPhongThueID.pending, (state, action) => {
            state.isFetchContentGetPhongThueID = true
         }).addCase(getPhongThueID.fulfilled, (state, action) => {
            state.isFetchContentGetPhongThueID = false
            state.contentGetPhongThueID = action.payload
         }).addCase(getPhongThueID.rejected, (state, action) => {
            state.isFetchContentGetPhongThueID = false
            state.errContentGetPhongThueID = action.payload
         })
   }
});

export const getPhongThueID = createAsyncThunk('getPhongThueID',
   async (data: string, { rejectWithValue }) => {
      try {
         const result = await phongThue.getPhongThueID(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)