// redux/slices/conversationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: "conversations",
    initialState: [],
    reducers: {
        setConversations: (state, action) => {
            return action.payload;
        },
        addConversation: (state, action) => {
            state.push(action.payload);
        },
        updateConversation: (state, action) => {
            const index = state.findIndex(
                (conv) => conv._id === action.payload._id
            );
            if (index !== -1) {
                // Update the lastMessage property here
                state[index].lastMessage = {
                    text: action.payload.messageText,
                    sender: action.payload.sender,
                };
            }
        },
    },
});

export const { setConversations, addConversation, updateConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
