import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/landingNav.jsx";

const GetStarted = () => {
  const Navigate=useNavigate();
  return (
    <div className="bg-custombg">
  <div >
    <Navbar />
  </div>
  
  <div className=" flex justify-center items-center flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10 p-5 h-[calc(100vh-5.5rem)]">
    {/* Adjusting height for the navbar space */}
    <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-full lg:w-1/3 h-fit">
      <div className="flex justify-center">
        <img src="../public/alumni.jpg" className="h-48 w-full object-cover rounded-lg" alt="Alumni" />
      </div>
      <div className="flex justify-center items-center flex-col mt-4"> 
        <p className="font-bold text-3xl text-center">Click here to register as</p>
        <button type="button" onClick={() => Navigate("/alumni/signup")} className="mt-5 w-3/5 text-2xl text-white bg-custom1 p-4 rounded-lg text-center hover:bg-blue-800 transition duration-200">
          Alumni
        </button>
        <p className="text-lg mt-3">Have an account? 
          <span> </span> 
          <button type="button" onClick={() => Navigate("/login")} className="text-custom1 hover:text-blue-600 text-md hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>

    <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-full lg:w-1/3 h-fit">
      <div className="flex justify-center">
        <img src="../public/studentlogo.jpg" className="h-48 w-full object-cover rounded-lg" alt="Student" />
      </div>
      <div className="flex justify-center items-center flex-col mt-4"> 
        <p className="font-bold text-3xl text-center">Click here to register as</p>
        <button type="button" onClick={() => Navigate("/student/signup")} className="mt-5 w-3/5 text-2xl text-white bg-custom1 p-4 rounded-lg text-center hover:bg-blue-800 transition duration-200">
          Student
        </button>
        <p className="text-lg mt-3">Have an account? 
          <span> </span>  
          <button type="button" onClick={() => Navigate("/login")} className="text-custom1 hover:text-blue-600 text-md hover:underline">
            Login
          </button>
        </p>
      </div>
      </div>
    </div>
  </div>



  );
};

export default GetStarted;