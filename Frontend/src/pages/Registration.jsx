import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    resetCredentials,
    updateCredentials,
    setError,
    clearFieldError,
} from "../redux/slices/authSlice";
import { setUser } from "../redux/slices/userSlice.js";
import RegistrationFormPage1 from "../components/RegistrationFormPage1.jsx";
import RegistrationFormPage2 from "../components/RegistrationFormPage2.jsx";
const Registration=()=>{
    const host = "http://localhost:5000";
    const param = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ toggleReg, setToggleReg ] = useState(false);
    const { credentials } = useSelector(
        (state) => state.auth
    );

    // useEffect(() => {
    //     dispatch(updateCredentials({ name: 'profilepic', value: e.target.files[0] }));
    // }, [dispatch]);

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
                    role: param.role,
                    degree: credentials.degree,
                    gyear: credentials.gyear,
                    gmonth: credentials.gmonth,
                    rollnumber: credentials.rollnumber,
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
            <h1 className="text-3xl font-bold text-blue-500 py-6">Register as {param.role}</h1>
            {!toggleReg ? (
                <RegistrationFormPage1 
                    credentials={credentials}
                    handleChange={handleChange}
                    setToggleReg={setToggleReg}
                />
            ):(
                <RegistrationFormPage2 
                    credentials={credentials}
                    handleChange={handleChange}
                    onSubmit={handleSignupSubmit}
                    setToggleReg={setToggleReg}
                />
            )}       
            </div>
        </div>
    )
}
export default Registration;