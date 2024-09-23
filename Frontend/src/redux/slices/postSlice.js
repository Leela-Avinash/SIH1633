import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cpost: {
    content: '',
    media: '',
    tags: [],
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePost: (state, action) => {
      const { name, value } = action.payload;
      state.cpost[name] = value;
    },
    addTag: (state, action) => {
      state.cpost.tags.push(action.payload);
    },
    removeTag: (state, action) => {
      state.cpost.tags = state.cpost.tags.filter(tag => tag !== action.payload);
    },
    resetPost: (state) => {
      state.cpost = { ...initialState.cpost };
    },
  },
});

export const { updatePost, addTag, removeTag, resetPost } = postSlice.actions;
export default postSlice.reducer;
