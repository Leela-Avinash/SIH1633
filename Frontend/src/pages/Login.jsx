import React, { useEffect, useState } from "react";
import Input from "../components/authInput.jsx";
import { setAuth, setDoc } from "../redux/slices/authSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setValidationErrors } from "../redux/slices/authSlice.js";
import Navbar from "../components/landingNav.jsx";
import { setUser } from "../redux/slices/userSlice.js";
import {
  resetCredentials,
  updateCredentials,
  setError,
  clearFieldError,
} from "../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedRole, setSelectedRole] = useState("");

  const { credentials } = useSelector((state) => state.auth);
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
        role: selectedRole,
      }),
      credentials: "include",
    });
    const json = await response.json();
    if (json.success) {
      dispatch(setAuth(true));
      localStorage.setItem('user', JSON.stringify(json));
      console.log(json.user);
      dispatch(setUser(json.user));
      dispatch(resetCredentials());
      if (json.user.role === "student") {
        navigate("/dashboard");
      } else if (json.user.role === "alumni") {
        if (!json.user.document_verification) {
          navigate("/docai");
        } else {
          dispatch(setDoc(true));
          navigate("/dashboard");
        }
      }
    } else {
      dispatch(setError(json.message));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!credentials.identifier)
      newErrors.identifier = "Please enter an email or username";
    if (credentials.password.length < 8)
      newErrors.password = "Passwords must be eight or more characters";
    if (!selectedRole)
      newErrors.role = "Please select a role"; 
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
    <div className="h-screen bg-custombg">
      <Navbar></Navbar>
      <div className="h-[calc(100vh-5.5rem)] flex justify-center items-center ">
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row w-full max-w-5xl overflow-hidden">
            <div className="lg:w-1/2 flex items-center justify-center ">
              <div className="text-center h-full">
                <img src="../public/student_registar.jpg"/>
              </div>
            </div>

            <div className="lg:w-1/2 pt-0 md:pt-8 p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-1">
                  Login Form
                </h2>
                <p className="text-sm text-gray-700">
                  Welcome back to AlumniConnect
                </p>
              </div>

            <div className="mb-3">
                <label className="block text-black font-bold mb-2">
                    Select Role:
                </label>

                <div className="flex gap-4">
                    {/* Alumni Role */}
                    <div
                    onClick={() => setSelectedRole("alumni")}
                    className={`text-center cursor-pointer border-2 ${
                        selectedRole === "alumni"
                        ? "bg-blue-500 text-white shadow-md"
                        : "border-gray-300"
                    } p-3 rounded-lg w-1/2 transition duration-300`}
                    >
                    <input
                        type="radio"
                        name="role"
                        value="alumni"
                        checked={selectedRole === "alumni"}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="hidden" // Hide the default radio button
                    />
                    Alumni
                    </div>

                    {/* Student Role */}
                    <div
                    onClick={() => setSelectedRole("student")}
                    className={`text-center cursor-pointer border-2 ${
                        selectedRole === "student"
                        ? "bg-blue-500 text-white shadow-md"
                        : "border-gray-300"
                    } p-3 rounded-lg w-1/2 transition duration-300`}
                    >
                    <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={selectedRole === "student"}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="hidden" // Hide the default radio button
                    />
                    Student
                    </div>
                </div>

                {errors.role && (
                    <p className="text-red-400 text-xs mt-2">{errors.role}</p>
                )}
                </div>
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
                

                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center text-gray-700">
                    <input type="checkbox" className="mr-2" />
                    Remember Me
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-md mt-3 transition duration-300 bg-blue-500 text-white hover:bg-blue-600"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
