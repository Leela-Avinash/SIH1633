import React from "react";
import { Link } from "react-router-dom";
const GetStarted = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-bgcol1 via-bgcol2 to-bgcol3 h-screen w-full">
  <div className="grid grid-cols-1 lg:grid-cols-2 p-5 rounded-lg">
    <div className="flex flex-col bg-blue-0">
      <div className="flex justify-center">
        <img src="../public/alumni.jpg" className="pt-5 w-3/5 rounded-lg"></img>
      </div>
      <div className="flex justify-center items-center flex-col mt-8"> 
        <p className="font-bold font-medium text-3xl">Click here to Register as</p>
        <button type="button" onClick={()=>Navigate("/alumnireg")} className="mt-5 lg:w-1/5 text-2xl text-white bg-custom1 p-4 rounded-lg text-center hover:bg-blue-800">Alumni</button>
        <p className="text-lg mt-3 pb-10">Have an account? <a href="" className="text-custom1 hover:text-blue-600 text-md hover:underline">Login</a></p>
      </div>
    </div>

    <div className="flex flex-col bg-sky-0 mt-10 lg:mt-0 ">
      <div className="flex justify-center">
        <img src="../public/studentlogo.jpg" className="pt-5 w-3/5 rounded-lg"></img>
      </div>
      <div className="flex justify-center items-center flex-col mt-11"> 
        <p className="font-bold font-medium text-3xl">Click here to Register as</p>
        <button type="button" onClick={()=>Navigate("/alumnireg")} className="mt-5 lg:w-1/5 text-2xl text-white bg-custom1 p-4 rounded-lg text-center hover:bg-blue-800">Student</button>
        <p className="text-lg mt-3 pb-10">Have an account? <a href="" className="text-custom1 hover:text-blue-600 text-md hover:underline">Login</a></p>
      </div>
    </div>
  </div>    
</div>

  );
};

export default GetStarted;