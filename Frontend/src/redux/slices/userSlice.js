import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    username: "",
    email: "",
    profilepic: "",
    followersCount: 0,
    followingCount: 0,
    bio: "",
    date: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;