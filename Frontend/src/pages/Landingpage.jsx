import React from "react";
import Navbar from "../components/Navbar.jsx";

function LandingPage(){

  return(
    <div>
      <Navbar/>
      <div className="flex justify-center items-center "> {/* Ensure full height to center vertically */}
            <div className="grid grid-cols-2 pl-10 pr-10 rounded-lg">
                <div className="bg-red-300 p-5 pl-10 pt-20">
                    <h1 className="text-white text-xl font-bold text-2xl">Empower Your Alumni Network
                    Foster Connections, Drive Engagement</h1>
                    <p className="text-white mt-3 font-semibold text-md">A dynamic platform that enables alumni and students to stay connected. Foster meaningful interactions, professional development, and mentorships.</p>
                </div>
                <div className="flex justify-center items-center p-5">
                    <img className="w-4/5" src="../public/bodylogo2.png" alt="Logo" />
                </div>
            </div>
        </div>
      </div>
  )
}
export default LandingPage;