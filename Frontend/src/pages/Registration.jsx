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
import _ from 'lodash';
const Registration = () => {
    const host = "http://localhost:5000";
    const param = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [toggleReg, setToggleReg] = useState(false);
    const { credentials } = useSelector(
        (state) => state.auth
    );

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
    return (

        <div className="relative flex items-center justify-center min-h-screen bg-blue-50">
        <div className="absolute inset-0">
          <img src={param.role === "alumni" ? "/alumni_registar.jpg" : "/studen.jpg"} alt="background" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 bg-white bg-opacity-95 p-8 shadow-2xl rounded-lg lg:w-5/12 w-11/12 mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white">1</div>
              <div className={`h-1 w-16 ${toggleReg ? "bg-blue-600" : "bg-gray-300"} transition-all duration-500`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${toggleReg ? "bg-blue-600 text-white" : "bg-gray-300"} transition-all duration-500`}>2</div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Register as {_.capitalize(param.role)}</h2>
          {!toggleReg ? (
            <RegistrationFormPage1
              credentials={credentials}
              handleChange={handleChange}
              setToggleReg={setToggleReg}
            />
          ) : (
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