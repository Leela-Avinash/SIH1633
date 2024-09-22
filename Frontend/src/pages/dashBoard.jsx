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
        <div className=' w-full'>
          {/* <MainContent activePage={activePage} /> */}
          {activePage === 'home' && <MainContent />}
          {activePage === 'profile' && <Profile />}
          {activePage === 'network' && <Network />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;