import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onNavClick, activePage }) => {
    const navigate = useNavigate();
    return (
        <aside className="fixed top-16  bg-white p-5 ">
            <ul className="space-y-4 mt-5">
                <li className={`pl-5 cursor-pointer hover:rounded-full hover:bg-gray-50 hover:text-custom1 p-2 rounded flex items-center space-x-2 hover:shadow-md group ${activePage == "dashboard" ? "text-custom1" : "text-black"}`} onClick={() => onNavClick('dashboard')}>
                    <svg
                        className="w-5 h-5 group-hover:text-custom1 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z" />
                    </svg>
                    <span>Dashboard</span>
                </li>
                <li className={`pl-5 cursor-pointer hover:rounded-full hover:bg-gray-50 hover:text-custom1 p-2 rounded flex items-center space-x-2 hover:shadow-md group ${activePage == "messages" ? "text-custom1" : "text-black"}`} onClick={() => { navigate("/chat") }}>
                    <svg
                        className="w-5 h-5  group-hover:text-custom1 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z" />
                    </svg>
                    <span>Messages</span>
                </li>

                <li className={`pl-5 cursor-pointer hover:rounded-full hover:bg-gray-50 hover:text-custom1 p-2 rounded flex items-center space-x-2 hover:shadow-md group ${activePage == "notifications" ? "text-custom1" : "text-black"}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="h-6 w-6  group-hover:text-custom1 fill-current"
                    >
                        <path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                    </svg>
                    <span>Notifications</span>
                </li>

                <li className={`pl-5 cursor-pointer hover:rounded-full hover:bg-gray-50 hover:text-custom1 p-2 rounded flex items-center space-x-2 hover:shadow-md group ${activePage == "requests" ? "text-custom1" : "text-black"}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="h-6 w-6 group-hover:text-custom1 transition-colors duration-200 fill-current" // Adjust size and color
                    >
                        {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                        <path d="M32 32C32 14.3 46.3 0 64 0S96 14.3 96 32l0 208-64 0L32 32zM224 192c0-17.7 14.3-32 32-32s32 14.3 32 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64zm-64-64c17.7 0 32 14.3 32 32l0 48c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-48c0-17.7 14.3-32 32-32zm160 96c0-17.7 14.3-32 32-32s32 14.3 32 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64zm-96 88l0-.6c9.4 5.4 20.3 8.6 32 8.6c13.2 0 25.4-4 35.6-10.8c8.7 24.9 32.5 42.8 60.4 42.8c11.7 0 22.6-3.1 32-8.6l0 8.6c0 88.4-71.6 160-160 160l-61.7 0c-42.4 0-83.1-16.9-113.1-46.9L37.5 453.5C13.5 429.5 0 396.9 0 363l0-27c0-35.3 28.7-64 64-64l88 0c22.1 0 40 17.9 40 40s-17.9 40-40 40l-56 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l56 0c39.8 0 72-32.2 72-72z" />
                    </svg>
                    <span>Requests</span>
                </li>

                <li className={`pl-5 cursor-pointer hover:rounded-full hover:bg-gray-50 hover:text-custom1 p-2 rounded flex items-center space-x-2 hover:shadow-md group ${activePage == "settings" ? "text-custom1" : "text-black"}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="h-6 w-6 group-hover:text-custom1 transition-colors duration-200 fill-current"
                    >
                        <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                    </svg>
                    <span>Settings</span>
                </li>

                <li className={`pl-5 cursor-pointer hover:rounded-full hover:bg-gray-50  hover:text-custom1 p-2 rounded flex items-center space-x-2 hover:shadow-md group ${activePage == "logout" ? "text-custom1" : "text-black"}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="h-6 w-6 group-hover:text-custom1 transition-colors duration-200 fill-current"
                    >
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                    </svg>
                    <span>Logout</span>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
