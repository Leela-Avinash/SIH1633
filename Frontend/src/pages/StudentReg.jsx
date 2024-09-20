import React, { useState } from "react";

const RegisterForm = () => {
  const [step, setStep] = useState(1); 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    collegeName: "",
    degree: "",
    rollNumber: "",
    graduationYear: "",
    graduationMonth: "",
  });

  const [error, setError] = useState("");
  const graduationYears = Array.from({ length: 30 }, (_, i) => 2020 + i);
  const Expectedgraduation = Array.from({ length: 30 }, (_, i) => 2024 + i);
  const graduationMonths = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const strongPasswordPattern = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    const { username, email, password, confirmPassword } = formData;
    
    // Define patterns for each password requirement
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    const hasMinLength = password.length >= 8;
  
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else if (!username || !email || !password) {
      setError("Please fill all required fields.");
    } else if (!hasMinLength) {
      setError("Password must be at least 8 characters long.");
    } else if (!hasUpperCase) {
      setError("Password must contain at least one uppercase letter.");
    } else if (!hasLowerCase) {
      setError("Password must contain at least one lowercase letter.");
    } else if (!hasNumber) {
      setError("Password must contain at least one number.");
    } else if (!hasSpecialChar) {
      setError("Password must contain at least one special character (@, $, !, %, *, ?, &).");
    } else {
      setError("");
      setStep(step + 1); 
    }
  };
  return (
    <div className="grid flex flex-col-reverse lg:grid-cols-2 bg-blue-50">

<div className="flex lg:h-screen items-center justify-center">
        <div className="w-5/6 h-fit lg:mt-0 mt-20">
          <img src="../public/students.jpg" alt="alumni_register" className="w-dvw rounded"></img>
        </div>
      </div>

      <div className={`mx-auto  bg-white p-6 shadow-lg rounded-lg w-11/12 lg:w-8/12 ${step===2 ? "mt-10":"lg:h-fit lg:mt-20 mt-10 h-full "}`}>
      
        <div className="flex justify-center mb-6 mt-5">
          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              1
            </div>
            <div className={`h-1 w-16  ${ step === 2 ? "bg-blue-600" : "bg-gray-300" }`}></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 2 ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              2
            </div>
          </div>
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Register as Student
            </h2>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">Username</label>
              <input
                type="text"
                name="username"
                className="w-full p-2 border rounded"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">University Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 relative">
              <label className="block mb-1 text-sm font-bold">Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                className="w-full p-2 border rounded"
                value={formData.password}
                onChange={handleChange}
              /> 
              <button
                type="button"
                className="absolute right-3 top-8 text-sm text-blue-600 "
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          fill="currentColor"
          width="24"
          height="24"
        >
          <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
        </svg>) :
        (<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />   
        </svg>)
        }
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">Confirm Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="confirmPassword"
                className="w-full p-2 border rounded"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
               
            </div>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <button
              className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition duration-300"
              onClick={handleNextStep}
            >
              Next
            </button>
            <p className="text-center font-md text-md mt-5">Already have an account? <a href="" className="text-custom1 hover:underline">  Login</a></p>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Register as Student
            </h2>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full p-2 border rounded"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full p-2 border rounded"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">College Name</label>
              <input
                type="text"
                name="collegeName"
                className="w-full p-2 border rounded"
                value={formData.collegeName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">Degree</label>
              <input
                type="text"
                name="degree"
                className="w-full p-2 border rounded"
                value={formData.degree}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                className="w-full p-2 border rounded"
                value={formData.rollNumber}
                onChange={handleChange}
              />
            </div>
            <div className="flex">
            <div className="mb-4 w-1/2 mr-5">
              <label className="block mb-1 text-sm font-bold">Graduation Year</label>
              <select
                name="graduationYear"
                className="w-full p-2 border rounded"
                value={formData.graduationYear}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                {graduationYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              </div>

              <div className="mb-4 w-1/2">
              <label className="block mb-1 text-sm  font-bold">Expected Graduation Year</label>
              <select
                name="graduationYear"
                className="w-full p-2 border rounded"
                value={formData.graduationYear}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                {Expectedgraduation.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">Graduation Month</label>
              <select
                name="graduationMonth"
                className="w-full p-2 border rounded"
                value={formData.graduationMonth}
                onChange={handleChange}
              >
                <option value="">Select Month</option>
                {graduationMonths.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                Proceed
              </button>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default RegisterForm;
