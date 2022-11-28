import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { nguoiDung } from '../../services/nguoiDungServices';
import { NguoiDung, PutNguoiDung } from '../../types/nguoiDungTypes';

type InitialState = {
   isFetchContentPutUser: boolean,
   errContentPutUser?: any,
   contentPutUser?: NguoiDung
}

const initialState: InitialState = {
   isFetchContentPutUser: false
}

export const { reducer: putUserIDReducer, actions: putUserIDActions } = createSlice({
   name: 'putUserID',
   initialState,
   reducers: {
      removeContentPutUser: (state, action) => {
         state.contentPutUser = undefined
         state.errContentPutUser = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(putUsersID.pending, (state, action) => {
            state.isFetchContentPutUser = true
         }).addCase(putUsersID.fulfilled, (state, action) => {
            state.isFetchContentPutUser = false
            state.errContentPutUser = undefined
            state.contentPutUser = action.payload
         }).addCase(putUsersID.rejected, (state, action) => {
            state.isFetchContentPutUser = false
            state.contentPutUser = undefined
            state.errContentPutUser = action.payload
         })
   }
});

export const putUsersID = createAsyncThunk('putUserID',
   async (data: { id: string | undefined, data: PutNguoiDung }, { rejectWithValue }) => {
      try {
         const result = await nguoiDung.putUsersID(data.id, data.data)
         return result.data.content
      } catch (err: any) {
         return rejectWithValue(err.response.data.content)
      }
   }
)