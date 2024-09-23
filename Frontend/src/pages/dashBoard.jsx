import React, { useState } from 'react';
import Navbar from '../components/navBar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import MainContent from './MainContent.jsx';
import Network from '../components/networkSection.jsx';
import Profile from '../components/profilePage.jsx';
import HomePage from './HomePage.jsx';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('profile');

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="flex flex-row">
      <Navbar onNavClick={handleNavClick} />
      <div className="flex w-full">
        <Sidebar />
          <div className='mt-20 ml-52 w-3/4'>
            {/* <MainContent activePage={activePage} /> */}
            {activePage === 'home' && <MainContent />}
            {activePage === 'profile' && <Profile />}
            {activePage === 'network' && <Network />}
          
          </div>

          <div className="">
          <div className= "w-96  mt-6 mr-5 rounded-lg shadow-md"></div>
        </div>
        
      </div>
      
      
      
    </div>
  );
};

export default Dashboard;