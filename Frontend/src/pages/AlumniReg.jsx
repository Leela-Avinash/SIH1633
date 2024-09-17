import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    resetCredentials,
    updateCredentials,
    setError,
    clearFieldError,
} from "../redux/slices/authSlice";
import { setUser } from "../redux/slices/userSlice.js";
import RegistrationForm from "../components/RegistrationForm"
const AlumniReg=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { credentials } = useSelector(
        (state) => state.auth
    );
    const host = "http://localhost:5000";

    useEffect(() => {
        dispatch(resetCredentials());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        if (name === "username") {
            sanitizedValue = value.toLowerCase().replace(/[^a-zA-Z0-9._-]/g, "");
        }
        if (name === "identifier") {
            sanitizedValue = value.toLowerCase();
        }
        dispatch(updateCredentials({ name, value: sanitizedValue }));
        dispatch(setError(""));
        dispatch(clearFieldError(name));
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password === credentials.cpassword) {
            console.log(credentials);
            const response = await fetch(`${host}/api/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fname: credentials.fname,
                    lname: credentials.lname,
                    username: credentials.username,
                    email: credentials.email,
                    collegeName: credentials.collegeName,
                    password: credentials.password,
                    role: "alumni"
                }),
                credentials: "include",
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('user', JSON.stringify(json.user));
                dispatch(setUser(json.user));
                dispatch(resetCredentials());  
            } else {
                dispatch(setError(json.message));
            }
        }
    };
    return(
        <div className="h-screen flex justify-center items-center ">
            <div className="w-1/3">
            <h1 className="text-3xl font-bold text-blue-500 py-6">Register as Alumni</h1>
            <RegistrationForm 
                credentials={credentials}
                handleChange={handleChange}
                onSubmit={handleSignupSubmit}
            />
            </div>
        </div>
    )
}
export default AlumniReg;