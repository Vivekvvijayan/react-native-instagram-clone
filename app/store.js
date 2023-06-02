import { configureStore } from '@reduxjs/toolkit'
import postReducer from './slice/postSlice'
import userReducer from './slice/userSlice'
export const store = configureStore({
  reducer: {
    feed:postReducer,
    authUser:userReducer,
    
  }
})