import React, { useEffect, useState } from "react";

const ProfilePage = ({user, formatDate}) => {
    return (
        <div className="p-6">
            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full ">
                {/* Profile Photo and Info */}
                <div className="flex items-center p-6">
                    <img
                        className="w-24 h-24 rounded-full mr-4"
                        src={
                            user.profilepic
                        }
                        alt="User"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {user.fname}
                        </h1>
                        <p className="text-gray-600 block-style text-lg font-medium">
                            {user.role} at {user.collegeName}
                        </p>
                    </div>
                </div>
                {/* About Section */}
                <div className="p-6 border-t border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        About
                    </h2>
                    <p className="text-gray-700 mb-4">{user.bio}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Skills Section */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-800">
                                Skills
                            </h3>
                            {/* <ul className="text-gray-600 list-disc list-inside">
                <li>JavaScript</li>
                <li>React.js</li>
                <li>Node.js</li>
                <li>Machine Learning</li>
              </ul> */}
                            {user.skills && user.skills.length > 0 ? (
                                <ul className="text-gray-600 list-disc list-inside">
                                    {user.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">
                                    No skills listed.
                                </p>
                            )}
                        </div>
                        {/* Experience Section */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-800">
                                Experience
                            </h3>
                            {/* <p className="text-gray-600">
                2 years as a Software Developer Intern at XYZ Corp.
              </p> */}
                            {user.experiences && user.experiences.length > 0 ? (
                                <ul className="text-gray-600 list-disc list-inside">
                                    {user.experiences.map((exp, index) => (
                                        <li key={index} className="mb-2">
                                            <strong>{exp.JobTitle}</strong> at{" "}
                                            {exp.CompanyName}
                                            <br />
                                            {formatDate(exp.StartDate)} - {formatDate(exp.EndDate)}
                                            <br />
                                            Location: {exp.Location}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">
                                    No experience listed.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                {/* Contact Section */}
                <div className="p-6 border-t border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Contact Information
                    </h2>
                    {/* <ul className="text-gray-700">
            <li>Location: London, UK</li>
            <li>Email: johndoe@email.com</li>
            <li>Phone: +44 1234 567 890</li>
            <li>LinkedIn: linkedin.com/in/johndoe</li>
          </ul> */}
                    <ul className="text-gray-700">
                        {user.location && (
                            <>
                                {user.location.City && (
                                    <li>City: {user.location.City}</li>
                                )}
                                {user.location.State && (
                                    <li>State: {user.location.State}</li>
                                )}
                                {user.location.Code && (
                                    <li>Postal Code: {user.location.Code}</li>
                                )}
                                {user.location.Country && (
                                    <li>Country: {user.location.Country}</li>
                                )}
                                {user.location.Phone && (
                                    <li>Phone: {user.location.Phone}</li>
                                )}
                            </>
                        )}
                        {user.email && (
                            <li>
                                Email:{" "}
                                <a
                                    href={`mailto:${user.email}`}
                                    className="text-blue-500"
                                >
                                    {user.email}
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex justify-center items-center mt-8">
                    {user.social && (
                        <div className="flex space-x-6">
                            {user.social.linkedinProfile && (
                                <a
                                    href={user.social.linkedinProfile}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 text-3xl hover:text-blue-700"
                                >
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            )}
                            {user.social.githubProfile && (
                                <a
                                    href={user.social.githubProfile}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-700 text-3xl hover:text-gray-900"
                                >
                                    <i className="fab fa-github"></i>
                                </a>
                            )}
                            {user.social.websiteURL && (
                                <a
                                    href={user.social.websiteURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-500 text-3xl hover:text-green-700"
                                >
                                    <i className="fas fa-globe"></i>
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
