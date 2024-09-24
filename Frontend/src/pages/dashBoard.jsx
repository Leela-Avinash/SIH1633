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
            {activePage === 'home' && <HomePage />}
            {activePage === 'profile' && <Profile />}
            {activePage === 'network' && <Network />}
          
          </div>

          <div className="w-96  mt-20 mr-5 shadow-md ">
            <h1 className="mt-5 ml-5">LeaderBoard</h1> 
        </div>
        
      </div>
      
      
      
    </div>
  );
};

export default Dashboard;