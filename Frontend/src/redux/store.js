import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userSlice from './slices/userSlice';
import postSlice from './slices/postSlice';
import conversationSlice from './slices/conversationSlice';
import setConversationSlice from './slices/setConversationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    post: postSlice,
    conversations: conversationSlice,
    selectedConversation: setConversationSlice,
  },
});
