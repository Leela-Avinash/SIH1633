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
  const [passwordVisible,setPasswordVisible]=useState(false);

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
                <img src="../student_registar.jpg"/>
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
              <div>
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

                <button
                    type="button"
                    className="absolute right-72 mr-5 mt-9 text-blue-600 fill-current bg-transparent"
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
                  type={passwordVisible ? "text":"password"}
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
    </div>
  );
};

export default Login;
