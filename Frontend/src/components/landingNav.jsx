import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const Navigate =useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="container mx-auto flex justify-between items-center p-5">
        {/* Logo Section */}
        <div className="flex items-center pl-0 md:pl-20 sm:mx-0 mx-auto ml-5 sm:ml-0">
          <img src="../public/logo1.svg" className="h-20 w-20" alt="logo" />
          <h1 className="pl-0 text-xl font-bold">
            Alumni
            <span className="text-custom1 text-xl">
              <span className="text-3xl"> C</span>onnect
            </span>
          </h1>
        </div>

        {/* Links for Desktop */}
        <div className="hidden sm:flex ml-auto space-x-6 lg:ml-auto lg:pr-40 pr-5">
          <a
            href="#"
            className="text-custom1 transition-colors duration-300 font-bold custom-underline hover:text-custom1"
          >
            Home
          </a>
          <button
            type="button"
            onClick={()=>Navigate("/Doc_AI")}
            className="text-custom1 transition-colors duration-300 font-bold custom-underline hover:text-custom1"
          >
            About
          </button>
          <a
            href="#"
            className="text-custom1 transition-colors duration-300 font-bold custom-underline hover:text-custom1"
          >
            Features
          </a>
          <a
            href="#"
            className="text-custom1 transition-colors duration-300 font-bold custom-underline hover:text-custom1"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden block pr-5 icon-container">
          <button type="button" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-8 h-8 text-gray-500 hover:text-green-500 transition-colors duration-300"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden ${menuOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="ml-10 mr-10">
          <div className="flex flex-col justify-center bg-transparent space-y-4 pt-5 pb-5">
            <a
              href="#"
              className="pl-5 w-full text-start text-custom1 transition-colors duration-300 font-bold custom-underline hover:text-custom1"
            >
              Home
            </a>
            <a
              href="#"
              className="pl-5 w-full text-start text-custom1 transition-colors duration-300 font-bold custom-underline hover:text-custom1"
            >
              About
            </a>
            <a
              href="#"
              className="pl-5 text-custom1 text-start transition-colors duration-300 font-bold custom-underline hover:text-custom1"
            >
              Features
            </a>
            <a
              href="#"
              className="pl-5 text-custom1 text-start transition-colors duration-300 font-bold custom-underline hover:text-custom1"
            >
              Contact
            </a>
          </div>
        </div>
      </div>


          </div>
     
  );
}

export default Navbar;