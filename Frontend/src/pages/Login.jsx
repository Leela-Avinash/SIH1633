import React from "react";
import Input from "./authInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setValidationErrors } from "../redux/slices/authSlice.js";

const Login = ({ credentials, handleChange, onSubmit }) => {
    const dispatch = useDispatch();
    const { errors, backendError } = useSelector((state) => state.auth);

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
            <div className="flex items-center my-3">
                <hr className="w-full border-gray-600" />
                <span className="mx-4 text-gray-400">or</span>
                <hr className="w-full border-gray-600" />
            </div>
        </form>
    );
};

export default Login;