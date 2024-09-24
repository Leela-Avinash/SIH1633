import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
// const users = [
//   {
//     id: 1,
//     name: 'John Doe',
//     jobTitle: 'Software Engineer',
//     profilePicture: 'https://via.placeholder.com/150',
//     skills: ['JavaScript', 'React', 'Node.js'],
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     jobTitle: 'Data Scientist',
//     profilePicture: 'https://via.placeholder.com/150',
//     skills: ['Python', 'Machine Learning', 'AI'],
//   },
//   {
//     id: 3,
//     name: 'Mike Johnson',
//     jobTitle: 'Product Manager',
//     profilePicture: 'https://via.placeholder.com/150',
//     skills: ['Leadership', 'Agile', 'Scrum'],
//   },
//   {
//     id: 1,
//     name: 'John Doe',
//     jobTitle: 'Software Engineer',
//     profilePicture: 'https://via.placeholder.com/150',
//     skills: ['JavaScript', 'React', 'Node.js'],
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     jobTitle: 'Data Scientist',
//     profilePicture: 'https://via.placeholder.com/150',
//     skills: ['Python', 'Machine Learning', 'AI'],
//   },
//   {
//     id: 3,
//     name: 'Mike Johnson',
//     jobTitle: 'Product Manager',
//     profilePicture: 'https://via.placeholder.com/150',
//     skills: ['Leadership', 'Agile', 'Scrum'],
//   },
//   {
//     id: 1,
//     name: 'John Doe',
//     jobTitle: 'Software Engineer',
//     profilePicture: 'https://via.placeholder.com/150',
//     skills: ['JavaScript', 'React', 'Node.js'],
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     jobTitle: 'Data Scientist',
//     profilePicture: 'https://via.placeholder.com/150',
//     skills: ['Python', 'Machine Learning', 'AI'],
//   },
//   {
//     id: 3,
//     name: 'Mike Johnson',
//     jobTitle: 'Product Manager',
//     profilePicture: 'https://via.placeholder.com/150',
//     skills: ['Leadership', 'Agile', 'Scrum'],
//   },
//   // More users...
// ];







const NetworkSection = () => {
  const [recommendations, setUsers] = useState([]);

useEffect(() => {
  // Fetch data from the API
  const Recommendation=async()=>{
  try{
  const response = await fetch(
    "http://localhost:5000/api/users/recommendations",
    {
        method: "GET",
        credentials: "include",
    });
    const json = await response.json();
    console.log(json);
    setUsers(json.topRecommendations);
  }
  catch (error) {
    console.log("Error checking auth", error);
};}
Recommendation();

} , []);
  return (
    <div className="p-6 bg-custombg">
    <h1 className="text-3xl font-bold pb-5 text-blue-600">Top Recommended Alumni</h1>
    {/* Grid Container */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recommendations.map((recommendation) => (
            <div key={recommendation.user.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between items-center border border-gray-200 h-full">
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
                <a href={`/profile/${recommendation.user.username}`} className="text-blue-600 font-semibold text-lg text-center hover:underline">
                    <h2 className="text-xl font-bold text-gray-700 text-center mb-2">
                        {recommendation.user.fname}
                    </h2>
                </a>

                {/* Job Title */}
                <p className="text-sm text-gray-500 text-center mb-4">{recommendation.user.collegeName}</p>

                {/* Skills Section */}
                {/* Uncomment and use if skills are required */}
                {/* <div className="flex flex-wrap justify-center space-x-2 mb-4">
                    {recommendation.user.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                            {skill}
                        </span>
                    ))}
                </div> */}

                {/* Connect Button */}
                <div className="mt-auto">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
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

// Example usage of the NetworkSection component with sample user data

