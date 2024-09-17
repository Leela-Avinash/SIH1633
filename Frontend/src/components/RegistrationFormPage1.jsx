import React from "react";
import Input from "./authInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setValidationErrors } from "../redux/slices/authSlice.js";

const RegistrationFormPage1 = ({ credentials, handleChange, }) => {
    const dispatch = useDispatch();

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
        onSubmit(e);
      }
    };

  return (
    <div >
      <form
        className=" bg-white rounded-br-lg rounded-tr-lg "
        noValidate
      >
        
        <Input
          type="text"
          name="username"
          value={credentials.username}
          handleChange={handleChange}
          label="Username"
          minLength={3}
        />
        {/* {errors.username && (
        <p className="text-red-400 text-xs">{errors.username}</p>
      )} */}
        <Input
          type="email"
          name="email"
          value={credentials.email}
          handleChange={handleChange}
          label="University Email"
        />
        {/* {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>} */}
        <Input
          type="password"
          name="password"
          value={credentials.password}
          handleChange={handleChange}
          label="Password"
          minLength={8}
        />
        {/* {errors.password && (
        <p className="text-red-400 text-xs">{errors.password}</p>
      )} */}
        <Input
          type="password"
          name="cpassword"
          value={credentials.cpassword}
          handleChange={handleChange}
          label="Confirm Password"
          minLength={8}
        />
        {/* {errors.cpassword && (
        <p className="text-red-400 text-xs">{errors.cpassword}</p>
      )} */}
        {/* <div className="w-full flex justify-center mt-2">
        {backendError && <p className="text-red-400 text-sm">{backendError}</p>}
      </div> */}
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
