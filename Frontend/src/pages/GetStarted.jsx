import React from "react";
import { Link } from "react-router-dom";
const GetStarted = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {/* Card Section */}
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Register as
        </h1>
        <p className="text-gray-600 mb-8">
          Please select how you'd like to register on the platform.
        </p>

        {/* Buttons for Alumni, Student, Admin */}
        <div className="space-y-4">
          <div className="pb-5">
            <Link
              to="/alusignup"
              className="w-full p-40 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Alumini
            </Link>
          </div>
          <div>
            <Link
              to="/stusignup"
              className="w-full p-40 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Student
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default GetStarted;