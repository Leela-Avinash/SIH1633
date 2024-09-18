import React from "react";
import Navbar from "../components/Navbar.jsx";

function LandingPage(){

  return(
    <div>
      <Navbar/>
      <div className="">
        <div className="bg-blue-300 grid grid-rows-3-3">
            <div>
                <h1 >Empower Your Alumni Network</h1>
            </div>
            <div className="bg-red-300 ">
                <h1 >Foster Connections, Drive Engagement</h1>
            </div>
            <div>
            <div className="bg-red-300 ">
                <h1 >A dynamic platform that enables alumni and students to stay connected. Foster meaningful interactions, professional development, and mentorships.</h1>
            </div>
            </div>
            <div>
          <div className=" flex justify-end mr-24">
                  <img className=" w-4/5" src="../public/bodylogo2.png"></img>
          </div>
          </div>
       </div>
       </div>
    </div>
  )
}
export default LandingPage;