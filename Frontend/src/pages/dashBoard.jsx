import React, { useState } from 'react';
import Navbar from '../components/navBar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import MainContent from './MainContent.jsx';
import Network from '../components/networkSection.jsx';
import Profile from '../components/profilePage.jsx';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('profile');

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar onNavClick={handleNavClick} />
      <div className="flex">
        <Sidebar />
        <div className=''>
          {/* <MainContent activePage={activePage} /> */}
          {activePage === 'home' && <MainContent />}
          {activePage === 'profile' && <Profile />}
          {activePage === 'network' && <Network />}
         
        </div>
        <div className="bg-custombg">
                <div className="bg-white w-96 h-screen mt-6 mr-5 rounded-lg shadow-md"></div>
            </div>
      </div>
    </div>
  );
};

export default Dashboard;