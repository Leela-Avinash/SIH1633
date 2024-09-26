import React, { useState } from "react";
import Input from "./authInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setValidationErrors } from "../redux/slices/authSlice.js";

const RegistrationFormPage1 = ({ credentials, handleChange, setToggleReg}) => {
    const dispatch = useDispatch();
    const { errors } = useSelector((state) => state.auth);

    const [passwordVisible,setPasswordVisible]=useState(false);
    const [passwordVisible1,setPasswordVisible1]=useState(false);

    const isEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const isValidPassword = (password) => {
        const re =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    const validate = () => {
        const newErrors = {};
        if (!credentials.username)
            newErrors.username = "Please enter your preferred username";
        if (!isEmail(credentials.email))
            newErrors.email = "Please enter a valid email address";
        if (credentials.password.length < 8)
            newErrors.password = "Passwords must be eight or more characters";
        else if (!isValidPassword(credentials.password))
            newErrors.password =
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        if (credentials.password !== credentials.cpassword)
            newErrors.cpassword = "Passwords do not match";
        return newErrors;
    };

    const handleNext = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            dispatch(setValidationErrors(validationErrors));
        } else {
            dispatch(setValidationErrors({}));
            setToggleReg(true);
            console.log("toggle is true")
        }
    };
    

    return (
        <div>
            <form className=" bg-white rounded-br-lg rounded-tr-lg " noValidate>
                <Input
                    type="text"
                    name="username"
                    value={credentials.username}
                    handleChange={handleChange}
                    label="Username"
                    minLength={3}
                />
                {errors.username && (
                    <p className="text-red-400 text-xs">{errors.username}</p>
                )}
                <Input
                    type="email"
                    name="email"
                    value={credentials.email}
                    handleChange={handleChange}
                    label="University Email"
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}

                <button
                    type="button"
                    className="absolute right-14 mt-9 text-blue-600 fill-current bg-transparent"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (<svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="w-5 h-5 text-gray-400"
                    >
                      <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/>
                    </svg>) : (<svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="w-5 h-5 text-gray-400"
                    >
                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                    </svg>)}
                  </button>
                   
                <Input
                    type={passwordVisible? "text":"password"}
                    name="password"
                    value={credentials.password}
                    handleChange={handleChange}
                    label="Password"
                    minLength={8}>

                    
                  </Input>
                 
                

                {errors.password && (
                    <p className="text-red-400 text-xs">{errors.password}</p>
                )}
                <button
                    type="button"
                    className="absolute right-14 mt-9 text-blue-800 fill-current bg-transparent"
                    onClick={() => setPasswordVisible1(!passwordVisible1)}
                  >
                    {passwordVisible1 ? (<svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="w-5 h-5 text-gray-400"
                    >
                      <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/>
                    </svg>) : (<svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="w-5 h-5 text-gray-400"
                    >
                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                    </svg>)}
                  </button>
                <Input
                    type={passwordVisible1?"text":"password"}
                    name="cpassword"
                    value={credentials.cpassword}
                    handleChange={handleChange}
                    label="Confirm Password"
                    minLength={8}
                />
                {errors.cpassword && (
                    <p className="text-red-400 text-xs">{errors.cpassword}</p>
                )}
                <button
                    className={`w-full py-2 rounded-md mt-1 transition duration-300 text-white hover bg-blue-500`}
                    onClick={handleNext}
                >
                    Next
                </button>
            </form>
        </div>
    );
};
export default RegistrationFormPage1;
