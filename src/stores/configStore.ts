import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import * as nguoiDung from './nguoiDung'
import * as viTri from './viTri'
import * as phongThue from './phongThue'
import * as datPhong from './datPhong'
import * as auth from './auth'
import * as binhLuan from './binhLuan'


const rootReducer = combineReducers({
   ...nguoiDung,
   ...viTri,
   ...phongThue,
   ...datPhong,
   ...auth,
   ...binhLuan
})

export const store = configureStore({
   reducer: rootReducer,
   middleware: [thunk]
})

export type RootState = ReturnType<typeof rootReducer>