import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentForm = ({ formData, handleChange, expectedGraduationYears, graduationMonths }) => (
  <>
    <div className="mb-4">
      <label className="block mb-1 text-sm font-bold">College Name</label>
      <input
        type="text"
        name="collegeName"
        className="w-full p-2 border rounded"
        value={formData.collegeName}
        onChange={handleChange}
        required
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
        required
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
        required
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1 text-sm font-bold">Expected Graduation Year</label>
      <select
        name="graduationYear"
        className="w-full p-2 border rounded"
        value={formData.graduationYear}
        onChange={handleChange}
      >
        {expectedGraduationYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
    <div className="mb-4">
      <label className="block mb-1 text-sm font-bold">Expected Graduation Month</label>
      <select
        name="graduationMonth"
        className="w-full p-2 border rounded"
        value={formData.graduationMonth}
        onChange={handleChange}
      >
        {graduationMonths.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  </>
);

const AlumniForm = ({ formData, handleChange, graduationYears, graduationMonths }) => (
  <>
    <div className="mb-4">
      <label className="block mb-1 text-sm font-bold">Company Name</label>
      <input
        type="text"
        name="alumniCompany"
        className="w-full p-2 border rounded"
        value={formData.alumniCompany}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1 text-sm font-bold">Designation</label>
      <input
        type="text"
        name="alumniDesignation"
        className="w-full p-2 border rounded"
        value={formData.alumniDesignation}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1 text-sm font-bold">Graduation Year</label>
      <select
        name="graduationYear"
        className="w-full p-2 border rounded"
        value={formData.graduationYear}
        onChange={handleChange}
      >
        {graduationYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
    <div className="mb-4">
      <label className="block mb-1 text-sm font-bold">Graduation Month</label>
      <select
        name="graduationMonth"
        className="w-full p-2 border rounded"
        value={formData.graduationMonth}
        onChange={handleChange}
      >
        {graduationMonths.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  </>
);

const RegisterForm = () => {
  const navigate = useNavigate();
  const { role } = useParams(); // UseParams to get the role from the URL
  const [step, setStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    collegeName: "",
    degree: "",
    rollNumber: "",
    graduationYear: "",
    graduationMonth: "",
    alumniCompany: "",
    alumniDesignation: "",
  });

  const [error, setError] = useState("");
  const graduationYears = Array.from({ length: 30 }, (_, i) => 1990 + i);
  const expectedGraduationYears = Array.from({ length: 30 }, (_, i) => 2024 + i);
  const graduationMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else if (!username || !email || !password) {
      setError("Please fill all required fields.");
    } else {
      setError("");
      setStep(step + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    navigate("/"); // Redirect after successful registration
  };

  return (
    <div className="grid flex flex-col-reverse lg:grid-cols-2 bg-blue-50">
      <div className="flex lg:h-screen items-center justify-center">
        <div className="w-5/6 h-fit lg:mt-0 mt-20">
          <img
            src={role === "student" ? "/students.jpg" : "/alumni_registrar.jpg"}
            alt={role === "student" ? "Student Registration" : "Alumni Registration"}
            className="w-full rounded"
          />
        </div>
      </div>

      <div className={`mx-auto bg-white p-6 shadow-lg rounded-lg w-11/12 lg:w-8/12 ${step === 2 ? "mt-10" : "lg:h-fit lg:mt-20 mt-10 h-full"}`}>
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Register as {role === "student" ? "Student" : "Alumni"}</h2>

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
              <label className="block mb-1 text-sm font-bold">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                className="w-full p-2 border rounded"
                value={formData.password}
                onChange={handleChange}
              />
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

            <div className="text-red-600">{error}</div>

            <button
              className="w-full p-2 bg-blue-600 text-white rounded mt-4 hover:bg-blue-700"
              onClick={handleNextStep}
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Additional Information</h2>
            {role === "student" ? (
              <StudentForm
                formData={formData}
                handleChange={handleChange}
                expectedGraduationYears={expectedGraduationYears}
                graduationMonths={graduationMonths}
              />
            ) : (
              <AlumniForm
                formData={formData}
                handleChange={handleChange}
                graduationYears={graduationYears}
                graduationMonths={graduationMonths}
              />
            )}

            <button
              className="w-full p-2 bg-blue-600 text-white rounded mt-4 hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
