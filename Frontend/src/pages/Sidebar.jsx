import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <ul className="space-y-4">
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded">Messages</li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded">Notifications</li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded">Requests</li>
      </ul>
    </aside>
  );
};

export default Sidebar;