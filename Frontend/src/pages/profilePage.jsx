import React from 'react';

const ProfilePage = ({user}) => {
  return (
    <div className="p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full ">
        {/* Profile Photo and Info */}
        <div className="flex items-center p-6">
          <img
            className="w-24 h-24 rounded-full mr-4"
            src="https://via.placeholder.com/150"
            alt="User"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user.fname}</h1>
            <p className="text-gray-600 block-style text-lg font-medium">
              {user.role} at {user.collegeName}
            </p>
          </div>
        </div>
        {/* About Section */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">About</h2>
          <p className="text-gray-700 mb-4">
            Enthusiastic learner and coder with a passion for Artificial Intelligence and Machine Learning. 
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Skills Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-800">Skills</h3>
              <ul className="text-gray-600 list-disc list-inside">
                <li>JavaScript</li>
                <li>React.js</li>
                <li>Node.js</li>
                <li>Machine Learning</li>
              </ul>
            </div>
            {/* Experience Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-800">Experience</h3>
              <p className="text-gray-600">
                2 years as a Software Developer Intern at XYZ Corp.
              </p>
            </div>
          </div>
        </div>
        {/* Contact Section */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h2>
          <ul className="text-gray-700">
            <li>Location: London, UK</li>
            <li>Email: johndoe@email.com</li>
            <li>Phone: +44 1234 567 890</li>
            <li>LinkedIn: linkedin.com/in/johndoe</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
