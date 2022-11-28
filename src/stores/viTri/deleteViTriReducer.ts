import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { viTri } from '../../services/viTriServices';

type InitialState = {
   isFetchMessageDeleteViTri: boolean,
   errMessageDeleteViTri?: any,
   messageDeleteViTri?: string
}

const initialState: InitialState = {
   isFetchMessageDeleteViTri: false
}

export const { reducer: deleteViTriReducer, actions: deleteViTriActions}  = createSlice({
   name: 'deleteViTri',
  initialState,
  reducers: {
     removeMessageDeleteViTri: (state, action) => {
        state.errMessageDeleteViTri = undefined
        state.messageDeleteViTri = undefined
     }
  },
   extraReducers: (builder) => {
      builder
         .addCase(deleteViTri.pending, (state, action) => {
            state.isFetchMessageDeleteViTri = true
         }).addCase(deleteViTri.fulfilled, (state, action) => {
            state.isFetchMessageDeleteViTri = false
            state.errMessageDeleteViTri = undefined
            state.messageDeleteViTri = action.payload
         }).addCase(deleteViTri.rejected, (state, action) => {
            state.isFetchMessageDeleteViTri = false
            state.messageDeleteViTri = undefined
            state.errMessageDeleteViTri = action.payload
         })
   }
});

export const deleteViTri = createAsyncThunk('deleteViTri',
   async (data: string, { rejectWithValue }) => {
      try {
         const result = await viTri.deleteViTri(data)
         return result.data.message
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
