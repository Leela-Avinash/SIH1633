import React from 'react';

const Navbar = ({ onNavClick }) => {
  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
      <div className="text-xl font-bold">
        Website Name
      </div>
      <div className="space-x-4">
        <button onClick={() => onNavClick('home')} className="hover:underline">Home</button>
        <button onClick={() => onNavClick('network')} className="hover:underline">Network</button>
        <button onClick={() => onNavClick('mentorship')} className="hover:underline">Mentorship Programs</button>
        <button onClick={() => onNavClick('forums')} className="hover:underline">Discussion Forums</button>
      </div>
      <div>
        <img src="profile.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </nav>
  );
};

export default Navbar;