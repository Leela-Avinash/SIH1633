import React, { useState } from 'react';
import Navbar from '../components/navBar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import MainContent from './MainContent.jsx';
import ProfilePage from './profilePage.jsx';

const App = ({user}) => {
  const [activePage, setActivePage] = useState('home');

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar onNavClick={handleNavClick} />
      <div className="flex">
        <Sidebar />
        <div className='bg-black w-full'>
          {/* <MainContent activePage={activePage} /> */}
          <ProfilePage user={user} />
        </div>
      </div>
    </div>
  );
};

export default App;