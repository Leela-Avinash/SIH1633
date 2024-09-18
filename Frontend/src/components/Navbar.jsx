import React from "react";

function Navbar(){
    return(
        <div>
        <div className="container mx-auto flex justify-between items-center p-5">
        <div className="flex items-center pl-0 md:pl-20 sm:mx-0 mx-auto ml-5 sm:ml-0">
            <img src="../public/logo1.svg" className="h-20 w-20" alt="logo" />
            <h1 className="pl-1 text-xl font-bold flex flex-col">Alumni<span className="text-custom1 text-3xl"><span className="text-custom2 text-4xl font-bold">C</span>onnect</span></h1>
        </div>
        <div class="hidden sm:block flex mx-auto space-x-6 pr-10">
        <a href="#" className="text-custom1 transition-colors duration-300 font-bold custom-underline hover:text-custom1">About</a>
        <a href="#" className="text-custom1 transition-colors duration-300 font-bold custom-underline hover:text-custom1">Features</a>
        <a href="#" className="text-custom1 transition-colors duration-300 font-bold custom-underline hover:text-custom1">Contact</a>
        </div>

        <div className="sm:hidden block pr-5 icon-container">
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-8 h-8 text-gray-500 hover:text-green-500 transition-colors duration-300"
        >
        <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
        </svg>
        </div>
    </div>
    <div class="block sm:hidden ml-10 mr-10">
    <div className="mx-auto flex flex-col justify-center bg-white space-y-4 pt-5 pb-5">
        <a href="#" className="pl-5 w-full text-start text-custom1 transition-colors duration-300 font-bold custom-underline hover:text-custom1">About</a>
        <a href="#" className="pl-5 text-custom1 text-start transition-colors duration-300 font-bold custom-underline hover:text-custom1">Features</a>
        <a href="#" className="pl-5 text-custom1 text-start transition-colors duration-300 font-bold custom-underline hover:text-custom1">Contact</a>
    </div>
    </div>
    </div>

    )
}
export default Navbar;
