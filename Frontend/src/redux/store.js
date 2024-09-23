import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userSlice from './slices/userSlice';
import postSlice from './slices/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    post: postSlice,
  },
});
