// redux/slices/conversationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: "",
    userId: "",
    username: "",
    userProfilePic: "",
};

const setConversationSlice = createSlice({
    name: 'selectedConversation',
    initialState,
    reducers: {
        setSelectedConversation: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearSelectedConversation: () => {
            return initialState;
        },
    },
});

export const { setSelectedConversation, clearSelectedConversation } = setConversationSlice.actions;
export default setConversationSlice.reducer;
