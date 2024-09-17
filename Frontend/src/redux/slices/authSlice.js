import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSignUp: true,
    isAuthenticated: false,
    credentials: {
        fname: "",
        lname: "",
        username: "",
        email: "",
        collegeName: "",
        password: "",
        cpassword: "",
        identifier: "",
        degree:"",
        gyear:"",
        gmonth:"",
        rollnumber:"",
    },
    backendError: "", 
    errors: {}, 
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateCredentials: (state, action) => {
            const { name, value } = action.payload;
            state.credentials[name] = value;
        },
        resetCredentials: (state) => {
            state.credentials = { ...initialState.credentials };
            state.errors = {}; 
            state.backendError = "";
        },
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setSignUp: (state, action) => {
            state.isSignUp = action.payload;
            state.credentials = { ...initialState.credentials };
            state.errors = {};
            state.backendError = "";
        },
        setError: (state, action) => {
            state.backendError = action.payload;
        },
        setValidationErrors: (state, action) => {
            state.errors = action.payload; 
        },
        clearFieldError: (state, action) => {
            const field = action.payload;
            const { [field]: _, ...remainingErrors } = state.errors;
            state.errors = remainingErrors;
        },
    },
});

export const {
    toggleAuthForm,
    updateCredentials,
    resetCredentials,
    setAuth,
    setSignUp,
    setError,
    setValidationErrors,
    clearFieldError
} = authSlice.actions;

export default authSlice.reducer;
