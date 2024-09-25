import React, { useState } from 'react';
import Navbar from '../components/navBar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import MainContent from './MainContent.jsx';
import Network from '../components/networkSection.jsx';
import Profile from '../components/profilePage.jsx';
import HomePage from './HomePage.jsx';
import Dashboard from '../components/dashBoard.jsx';
import LeaderBoard from '../components/LeaderBoard.jsx';
import Suggestions from '../components/Suggestions.jsx';

const MainPage = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="flex flex-row">
      <Navbar onNavClick={handleNavClick} />
      <div className="flex w-full">
        <Sidebar />
          <div className='mt-20 ml-52 w-3/4 h-svh'>
            {/* <MainContent activePage={activePage} /> */}
            {activePage === 'home' && <HomePage />}
            {activePage === 'profile' && <Profile />}
            {activePage === 'network' && <Network />}
            {activePage === 'dashboard' && <Dashboard />}
          
          </div>

          <div className="flex flex-col">
          {/* <div className="w-96  h-1/2 bg-gray-300 mt-20 mr-5 shadow-md ">
            <h1 className="mt-5 ml-5">LeaderBoard</h1>
          </div> */}
          <LeaderBoard />
          <div className="w-96 h-fit mr-5">
           <Suggestions />
            <div>
            </div>
          </div>
        </div>
        
      </div>
      
      
      
    </div>
  );
};

export default MainPage;