import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Navbar */}
      <div className="shadow-lg text-black container mx-auto flex items-center p-2 transform transition-all duration-300">
        {/* Logo Section */}
        <div className="flex items-center pl-0 md:pl-20 sm:mx-0 mx-auto sm:ml-0 backdrop-blur-lg bg-white/30 p-1 rounded-lg">
          <img src="../logo1.svg" className="h-16 w-16" alt="logo" />
          <h1 className="text-3xl font-extrabold font-sans drop-shadow-lg">
            Alumni
            <span className="text-yellow-400 text-3xl font-serif">Connect</span>
          </h1>
        </div>

        {/* Links for Desktop */}
        <div className="hidden sm:flex ml-auto space-x-8 lg:ml-auto lg:pr-40 pr-5">
          <a
            href="#"
            className="transition duration-300 flex items-center hover:scale-110 transform"
          >
            <i className="fas fa-home w-5 h-5 mt-1"></i>
            <span className="font-bold text-lg">Home</span>
          </a>
          <button
            type="button"
            onClick={() => navigate("/Doc_AI")}
            className="transition duration-300 flex items-center hover:scale-110 transform"
          >
            <i className="fas fa-info-circle w-5 h-5 mt-1"></i>
            <span className="font-bold text-lg">About</span>
          </button>
          <a
            href="#"
            className="transition duration-300 flex items-center hover:scale-110 transform"
          >
            <i className="fas fa-bolt w-5 h-5 mt-1"></i>
            <span className="font-bold text-lg">Features</span>
          </a>
          <a
            href="#"
            className="transition duration-300 flex items-center hover:scale-110 transform"
          >
            <i className="fas fa-phone w-5 h-5 mt-1"></i>
            <span className="font-bold text-lg">Contact</span>
          </a>
          {/* Sign In/Register */}
          <button
            type="button"
            className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-gray-100 font-bold shadow-lg transition-all w-24 duration-300 hover:scale-105 hover:shadow-xl transform"
          >
            Login
          </button>
          <button
            type="button"
            className="bg-custom1 text-white px-4 py-2 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
          >
            Register
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden block pr-5 icon-container">
          <button type="button" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-8 h-8 text-white hover:text-yellow-300 transition-all duration-300 transform hover:scale-110"
            >
              <path d="M..." />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden ${menuOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="ml-10 mr-10">
          <div className="flex flex-col justify-center bg-white shadow-lg space-y-4 pt-5 pb-5 rounded-lg backdrop-blur-lg bg-white/30">
            <a
              href="#"
              className="pl-5 w-full text-start flex items-center space-x-2 text-gray-700 transition duration-300 hover:text-yellow-500 hover:scale-110 transform"
            >
              <i className="fas fa-home w-5 h-5"></i>
              <span className="font-bold text-lg">Home</span>
            </a>
            <a
              href="#"
              className="pl-5 w-full text-start flex items-center space-x-2 text-gray-700 transition duration-300 hover:text-yellow-500 hover:scale-110 transform"
            >
              <i className="fas fa-info-circle w-5 h-5"></i>
              <span className="font-bold text-lg">About</span>
            </a>
            <a
              href="#"
              className="pl-5 text-start flex items-center space-x-2 text-gray-700 transition duration-300 hover:text-yellow-500 hover:scale-110 transform"
            >
              <i className="fas fa-bolt w-5 h-5"></i>
              <span className="font-bold text-lg">Features</span>
            </a>
            <a
              href="#"
              className="pl-5 text-start flex items-center space-x-2 text-gray-700 transition duration-300 hover:text-yellow-500 hover:scale-110 transform"
            >
              <i className="fas fa-phone w-5 h-5"></i>
              <span className="font-bold text-lg">Contact</span>
            </a>
            {/* Mobile Sign In/Register */}
            <div className="flex justify-start space-x-4 pl-5">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
              >
                Login
              </button>
              <button
                type="button"
                className="bg-yellow-100 text-white px-4 py-2 rounded-full hover:bg-yellow-50 font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
