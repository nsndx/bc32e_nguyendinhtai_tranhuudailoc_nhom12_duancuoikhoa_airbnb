import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { viTri } from '../../services/viTriServices';
import { PutViTri, ViTri } from '../../types/viTriTypes';

type InitialState = {
   isFetchContentPutViTri: boolean,
   errContentPutViTri?: any,
   contentPutViTri?: ViTri
}

const initialState: InitialState = {
   isFetchContentPutViTri: false
}


export const { reducer: putViTriIDReducer, actions: putViTriIDActions}  = createSlice({
   name: 'putViTriID',
   initialState,
   reducers: {
      removeContentPutViTri: (state, action) => {
         state.contentPutViTri = undefined
         state.errContentPutViTri = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(putViTriID.pending, (state, action) => {
            state.isFetchContentPutViTri = true
         }).addCase(putViTriID.fulfilled, (state, action) => {
            state.isFetchContentPutViTri = false
            state.errContentPutViTri = undefined
            state.contentPutViTri = action.payload
         }).addCase(putViTriID.rejected, (state, action) => {
            state.isFetchContentPutViTri = false
            state.contentPutViTri = undefined
            state.errContentPutViTri = action.payload
         })
   }
});

export const putViTriID = createAsyncThunk('putViTriID',
   async (data: { id: string | undefined, data: PutViTri }, { rejectWithValue }) => {
      try {
         const result = await viTri.putViTriID(data.id, data.data)
         return result.data.content
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)