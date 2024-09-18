import React from "react";
import Navbar from "../components/Navbar.jsx";

function LandingPage(){

  return(
    <div>
      <Navbar/>
      <div>
            <div className="bg-red-300">
                <h1></h1>
            </div>
          <div className=" flex justify-end mr-24">
                  <img className=" w-5/12" src="../public/bodylogo2.png"></img>
          </div>
          
       </div>
    </div>
  )
}
export default LandingPage;