import React from 'react';

const MainContent = ({ activePage }) => {
  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <div>Home Content</div>;
      case 'network':
        return <div>Network Content</div>;
      case 'mentorship':
        return <div>Mentorship Programs Content</div>;
      case 'forums':
        return <div>Discussion Forums Content</div>;
      default:
        return <div>Home Content</div>;
    }
  };

  return <main className="flex-1 p-4">{renderContent()}</main>;
};

export default MainContent;