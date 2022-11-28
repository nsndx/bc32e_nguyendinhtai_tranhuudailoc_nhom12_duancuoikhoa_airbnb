import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { phongThue } from '../../services/phongThueServices';
import { PhongThue, PutPhongThue } from '../../types/phongThueTypes';


type InitialState = {
   isFetchContentPutPhongThue: boolean,
   errContentPutPhongThue?: any,
   contentPutPhongThue?: PhongThue
}

const initialState: InitialState = {
   isFetchContentPutPhongThue: false
}

export const { reducer: putPhongThueIDReducer, actions: putPhongThueIDActions } = createSlice({
   name: 'putPhongThueID',
   initialState,
   reducers: {
      removeContentPutPhongThue: (state, action) => {
         state.contentPutPhongThue = undefined
         state.errContentPutPhongThue = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(putPhongThueID.pending, (state, action) => {
            state.isFetchContentPutPhongThue = true
         }).addCase(putPhongThueID.fulfilled, (state, action) => {
            state.isFetchContentPutPhongThue = false
            state.errContentPutPhongThue = undefined
            state.contentPutPhongThue = action.payload
         }).addCase(putPhongThueID.rejected, (state, action) => {
            state.isFetchContentPutPhongThue = false
            state.contentPutPhongThue = undefined
            state.errContentPutPhongThue = action.payload
         })
   }
});

export const putPhongThueID = createAsyncThunk('putPhongThueID',
   async (data: { id: string | undefined, data: PutPhongThue }, { rejectWithValue }) => {
      try {
         const result = await phongThue.putPhongThueID(data.id, data.data)
         return result.data.content
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)