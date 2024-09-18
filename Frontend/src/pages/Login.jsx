import React, { useEffect, useState } from "react";
import Input from "../components/authInput.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setValidationErrors } from "../redux/slices/authSlice.js";
import { setUser } from "../redux/slices/userSlice.js";
import {
    resetCredentials,
    updateCredentials,
    setError,
    clearFieldError,
} from "../redux/slices/authSlice";

const Login = ( ) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { credentials } = useSelector(
        (state) => state.auth
    );
    const host = "http://localhost:5000";

    useEffect(() => {
        dispatch(resetCredentials());
    }, [dispatch]);

    const { errors, backendError } = useSelector((state) => state.auth);

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

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials);
        const response = await fetch(`${host}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                identifier: credentials.identifier,
                password: credentials.password,
            }),
            credentials: "include",
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('user', JSON.stringify(json));
            console.log(json.user);
            dispatch(setUser(json.user));
            dispatch(resetCredentials());
            if(json.user.role === "student") {
                navigate("/dashboard");
            } else if(json.user.role === "alumni") {
              if(!json.user.document_verification){
                navigate("/docai");
              }
              else{
                navigate("/dashboard");
              }

        } else {
            dispatch(setError(json.message));
        }
    };
  };

    const validate = () => {
        const newErrors = {};
        if (!credentials.identifier)
            newErrors.identifier = "Please enter an email or username";
        if (credentials.password.length < 8)
            newErrors.password = "Passwords must be eight or more characters";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            dispatch(setValidationErrors(validationErrors));
        } else {
            dispatch(setValidationErrors({}));
            onSubmit(e);
        }
    };
    return (
        <form
            className="bg-white w-full rounded-br-lg rounded-tr-lg"
            onSubmit={handleSubmit}
            noValidate
        >
            <Input
                type="text"
                name="identifier"
                value={credentials.identifier}
                handleChange={handleChange}
                label="Username or Email"
            />
            {errors.identifier && (
                <p className="text-red-400 text-xs">{errors.identifier}</p>
            )}
            <Input
                type="password"
                name="password"
                value={credentials.password}
                handleChange={handleChange}
                label="Password"
                minLength={8}
            />
            {errors.password && (
                <p className="text-red-400 text-xs">{errors.password}</p>
            )}
            <div className="w-full flex justify-center mt-2">{backendError && <p className="text-red-400 text-sm">{backendError}</p>}</div>
            <button
                type="submit"
                className="w-full py-2 rounded-md mt-3 transition duration-300 bg-blue-500 text-white hover:bg-blue-600"
            >
                Sign In
            </button>
        </form>
    );
};

export default Login;