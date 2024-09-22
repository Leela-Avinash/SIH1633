import React from "react";

const NetworkSection = ({ users }) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-8 text-center">Network Section</h1>

      {/* Grid layout for user cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* User Profile Picture */}
            <img
              className="w-full h-48 object-cover"
              src={user.profilePicture}
              alt={user.name}
            />

            {/* User Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-500">{user.jobTitle}</p>

              {/* Skills */}
              <div className="mt-3">
                <h4 className="font-medium text-gray-700">Skills</h4>
                <ul className="flex flex-wrap">
                  {user.skills.map((skill, index) => (
                    <li
                      key={index}
                      className="text-xs bg-blue-100 text-blue-500 rounded-full px-2 py-1 mr-2 mb-2"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect Button */}
              <button className="bg-blue-500 text-white w-full py-2 mt-4 rounded-lg hover:bg-blue-600">
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example usage of the NetworkSection component with sample user data
const users = [
  {
    id: 1,
    name: "John Doe",
    jobTitle: "Software Engineer",
    profilePicture: "https://via.placeholder.com/150",
    skills: ["JavaScript", "React", "Node.js"],
  },
  {
    id: 2,
    name: "Jane Smith",
    jobTitle: "Data Scientist",
    profilePicture: "https://via.placeholder.com/150",
    skills: ["Python", "Machine Learning", "AI"],
  },
  {
    id: 3,
    name: "Mike Johnson",
    jobTitle: "Product Manager",
    profilePicture: "https://via.placeholder.com/150",
    skills: ["Leadership", "Agile", "Scrum"],
  },
  // Add more users as needed...
];

const App = () => {
  return (
    <div>
      <NetworkSection users={users} />
    </div>
  );
};

export default App;
