import React from 'react';


const NetworkSection = ({ users }) => {
  return (
    <div className="p-6">
      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img
              src={user.profilePicture}
              alt={`${user.name} profile`}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 text-center mb-4">{user.jobTitle}</p>
            <div className="flex flex-wrap justify-center space-x-2 mb-4">
              {user.skills.map((skill) => (
                <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                  {skill}
                </span>
              ))}
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example usage of the NetworkSection component with sample user data


export default NetworkSection;
