import React, { useState } from 'react';
import Navbar from './navBar.jsx';
import Sidebar from './Sidebar.jsx';
import MainContent from './MainContent.jsx';

const App = () => {
  const [activePage, setActivePage] = useState('home');

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar onNavClick={handleNavClick} />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent activePage={activePage} />
      </div>
    </div>
  );
};

export default App;