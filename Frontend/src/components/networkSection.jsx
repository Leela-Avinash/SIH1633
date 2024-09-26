import React, { useEffect, useState } from 'react';

const NetworkSection = () => {
  const [recommendations, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Recommendation = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/recommendations",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const json = await response.json();
        setUsers(json.topRecommendations);
      } catch (error) {
        console.log("Error checking auth", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    Recommendation();
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold pb-5 text-blue-800">Top Recommended Alumni</h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center border border-gray-200"
              >
                {/* Skeleton for profile picture */}
                <div className="skeleton skeleton-circle mb-4"></div>

                {/* Skeleton for user name */}
                <div className="skeleton skeleton-text"></div>

                {/* Skeleton for job title */}
                <div className="skeleton skeleton-small"></div>

                {/* Skeleton for connect button */}
                <div className="skeleton skeleton-button"></div>
              </div>
            ))
          : recommendations.map((recommendation) => (
              <div
                key={recommendation.user.id}
                className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center border border-gray-200"
              >
                {/* Profile Picture */}
                {recommendation.user.profilepic ? (
                  <img
                    src={recommendation.user.profilepic}
                    alt={`${recommendation.user.fname} profile`}
                    className="w-24 h-24 rounded-full mb-4 object-cover border border-gray-300"
                  />
                ) : (
                  <img
                    src="userlogo.jpeg"
                    alt={`${recommendation.user.fname} profile`}
                    className="w-24 h-24 rounded-full mb-4 object-cover border border-gray-300"
                  />
                )}

                {/* User Name */}
                <a
                  href={`/profile/${recommendation.user.username}`}
                  className="text-blue-600 font-semibold text-lg text-center" 
                >
                  <h2 className="text-xl font-bold text-gray-800 text-center mb-2 hover:text-blue-500">
                    {recommendation.user.fname}
                  </h2>
                </a>

                {/* Job Title */}
                <p className="text-xs text-gray-500 text-center mb-4">
                  Alumni at {recommendation.user.collegeName}
                </p>

                {/* Connect Button */}
                <div className='mt-auto'>
                <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-colors">
                  Connect
                </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default NetworkSection;
