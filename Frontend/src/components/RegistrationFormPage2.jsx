import React from "react";
import Input from "./authInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setValidationErrors } from "../redux/slices/authSlice.js";

const RegistrationFormPage2 = ({ credentials, handleChange }) => {
    const dispatch = useDispatch();
    const { errors, backendError } = useSelector((state) => state.auth);

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
        if (!credentials.fname) newErrors.fname = "Please enter your name";
        if (!credentials.lname) newErrors.lname = "Please enter your name";
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
        <div>
            <form
                className=" bg-white rounded-br-lg rounded-tr-lg "
                onSubmit={handleSubmit}
                noValidate
            >
                <Input
                    type="text"
                    name="fname"
                    value={credentials.fname}
                    handleChange={handleChange}
                    label="First Name"
                    minLength={3}
                />
                {/* {errors.fname && <p className="text-red-400">{errors.fname}</p>} */}

                <Input
                    type="text"
                    name="lname"
                    value={credentials.lname}
                    handleChange={handleChange}
                    label="Last Name"
                    minLength={3}
                />
                {/* {errors.lname && <p className="text-red-400">{errors.lname}</p>} */}

                <Input
                    type="text"
                    name="collegeName"
                    value={credentials.collegeName}
                    handleChange={handleChange}
                    label="College Name"
                />

                <Input
                    type="text"
                    name="degree"
                    value={credentials.degree}
                    handleChange={handleChange}
                    label="Degree"
                />

                <Input
                    type="text"
                    name="Rollno"
                    value={credentials.rollno}
                    handleChange={handleChange}
                    label="Roll number"
                />

                <Input
                    type="text"
                    name="gyear"
                    value={credentials.gyear}
                    handleChange={handleChange}
                    label="Graduation year/Expected graduation Year"
                />

                <Input
                    type="text"
                    name="gmonth"
                    value={credentials.gmonth}
                    handleChange={handleChange}
                    label="Graduation month/Expected graduation month"
                />

                {/* <div className="w-full flex justify-center mt-2">
        {backendError && <p className="text-red-400 text-sm">{backendError}</p>}
      </div> */}
                <div className="flex items-start my-2">
                    <input type="checkbox" id="terms" className="mr-2 mt-2" />
                    <label htmlFor="terms" className="text-gray-400 text-sm">
                        By signing up, you are creating a Unknown2.0 account,
                        and you agree
                        <a href="#" className="text-blue-500">
                            {" "}
                            Terms of Use{" "}
                        </a>
                        and
                        <a href="#" className="text-blue-500">
                            {" "}
                            Privacy Policy{" "}
                        </a>
                    </label>
                </div>
                <div>
                    <button
                        className={`w-full py-2 rounded-md mt-1 transition duration-300 text-white hover bg-blue-500`}
                        // disabled={credentials.name.length < 3}
                    >
                        BACK
                    </button>
                    <button
                        type="submit"
                        className={`w-full py-2 rounded-md mt-1 transition duration-300 text-white hover bg-blue-500`}
                        // disabled={credentials.name.length < 3}
                    >
                        Proceed
                    </button>
                </div>
            </form>
        </div>
    );
};
export default RegistrationFormPage2;
