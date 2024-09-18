import React from "react";
import { useNavigate } from "react-router-dom";

function LandBody(){
    const Navigate=useNavigate();
    return(
        <div className="">
        <div className="flex justify-center items-center lg:mt-10"> {/* Ensure full height to center vertically */}
            <div className="grid grid-cols-1 lg:grid-cols-2 pl-10 pr-10 rounded-lg flex items-start">
            <div className="flex justify-center items-center p-5 ">
                    <img className="w-4/5" src="../public/bodylogo3.png" alt="Logo" />
                </div>

                <div className=" p-5 pl-5 lg:pl-10 pt-5 lg:pt-14">
                    <h1 className="text-black text-4xl md:text-5xl lg:text-4xl font-bold">Empower Your Alumni Network</h1>
                    <h1 className="text-black mt-2 text-2xl md:text-3xl lg:text-2xl font-bold">Foster Connections, Drive Engagement</h1>
                    <p className="text-gray-700 mt-3 font-semibold text-md md:text-xl lg:text-md">A dynamic platform that enables alumni and students to stay connected. Foster meaningful interactions, professional development, and mentorships.</p>
                    <button type="button" onClick={()=>Navigate("/getstarted")} className="flex items-center mt-5 text-white bg-custom1 p-4 rounded-xl">Get Started
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="ml-2 w-4 h-4" fill="currentColor"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                    </button>
                </div>
                </div>

                
            </div>
        </div>
    )
}
export default LandBody;