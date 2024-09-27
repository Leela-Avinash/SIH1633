import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Otp = () => {
    const host = "http://localhost:5000";
    const navigate = useNavigate();
    // const { credentials } = useSelector((state) => state.auth);
    const currentUser = useSelector((state) => state.user);
    const [otp, setOtp] = useState(Array(6).fill(""));

    // Handle OTP input changes and auto-focus to next box
    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, ""); // Only allow numeric values
        if (value.length <= 1) {
            const updatedOtp = [...otp];
            updatedOtp[index] = value;
            setOtp(updatedOtp);
            // Move to next input box if available
            if (value !== "" && index < 5) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    // Handle OTP submit
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
            alert("Please enter a 6-digit OTP");
            return;
        }
        const response = await fetch(`${host}/api/users/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: currentUser.email,
                role: currentUser.role,
                otp: enteredOtp,
            }),
        });
        const json = await response.json();
        if (json.success) {
            alert("OTP verified successfully!");
            navigate("/login");
        } else {
            alert(json.message || "Invalid OTP");
        }
    };

    const handleResendSubmit = async () => {
        const response = await fetch(`${host}/api/users/resend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: currentUser.email,
            }),
        });
        const json = await response.json();
        if (json.success) {
            alert("OTP Resent to your email!");
        } else {
            alert(json.message || "Failed to resend OTP");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">OTP Verification</h2>
                <p className="text-center mb-4">Enter the 6-digit OTP sent to {currentUser.email}</p>
                <form onSubmit={handleOtpSubmit}>
                    <div className="flex justify-center space-x-2 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                maxLength="1"
                                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                            />
                        ))}
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={handleResendSubmit}
                            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-all"
                        >
                            Resend OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Otp;
