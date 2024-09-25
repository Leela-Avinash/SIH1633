import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fname: "",
        lname: "",
        username: "",
        email: "",
        collegeName: "",
        password: "",
        cpassword: "",
        identifier: "",
        degree: "",
        gyear: "",
        gmonth: "",
        rollnumber: "",
        profilepic: "../../../userlogo.jpeg",
        skills: [],
        interests: [],
        fieldOfStudy: '',
        location: {
            City:'',
            State:'',
            Code:'',
            Country:'',
            Phone:'',
        },
        experiences: [],
        social:{
            linkedinProfile:'',
            githubProfile:'',
            websiteURL:'',
        },
        bio:'',
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