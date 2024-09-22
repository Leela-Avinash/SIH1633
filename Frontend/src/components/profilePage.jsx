import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    console.log(user);

    const formatDate = (isoString) => {
        if (!isoString) return 'Present';

        const dateObj = new Date(isoString);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const year = dateObj.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const [postopen,setpostopen]=useState(false);
    const [mentoropen,setmentoropen]=useState(false);
    const [guideopen,setguideopen]=useState(false);
    const [openSection, setOpenSection] = useState('posts');

    const [showMore, setShowMore] = useState(false);
    const bioText = `
  My name is Sala Satya Sai Sadguru Charan, and I am currently pursuing a B.Tech in Computer Science and Engineering at JNTU-GV, Vizianagaram, with an expected graduation in 2026. Prior to this, I completed my diploma at Sir CR Reddy Polytechnic, Eluru.
  
  I am deeply passionate about full stack development and have cultivated a diverse skill set in this area. My technical expertise includes HTML, CSS, JavaScript, Bootstrap, Node.js, Express.js, React, SQL, and Git. These skills enable me to build robust, efficient, and user-friendly web applications from the ground up.
  
  I am always eager to take on new challenges and continuously improve my knowledge and abilities in web development. My goal is to contribute to innovative projects and collaborate with like-minded professionals in the tech industry.
`;
    const shortText = bioText.split(' ').slice(0, 30).join(' ') + '....';
    return (
        <div className="flex bg-custombg">


            <div className="p-6 bg-custombg  w-9/12">
                {/* Profile Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
                    {/* Profile Photo and Info */}
                    <div className="relative">
                        <img className="w-full h-52 object-cover object-center" src={user.profilepic} alt="Background" />

                        <div className="absolute top-16 left-12">
                            <img className="w-52 h-52 rounded-full object-cover" src={user.profilepic} alt="User" />
                        </div>
                    </div>





                    <div className="flex items-center flex-col  p-3">
                        <div className=" ml-auto ">
                            <div className="font-semibold text-lg mr-32">Rating...</div>
                            <div className="font-semibold text-lg mr-32">
                                Credits 56</div>


                        </div>

                    </div>
                    <div className="pl-16">
                        <div className="flex">

                            <h1 className="text-4xl font-bold text-black">
                                {user.fname}
                            </h1>
                            {user.social && (
                                <div className="flex space-x-6 ml-auto mr-28 ">
                                    {user.social.linkedinProfile && (
                                        <a
                                            href={user.social.linkedinProfile}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 text-2xl hover:text-blue-700"
                                        >
                                            <i className="fab fa-linkedin"></i>
                                        </a>
                                    )}
                                    {user.social.githubProfile && (
                                        <a
                                            href={user.social.githubProfile}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-700 text-2xl hover:text-gray-900"
                                        >
                                            <i className="fab fa-github"></i>
                                        </a>
                                    )}
                                    {user.social.websiteURL && (
                                        <a
                                            href={user.social.websiteURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-500 text-2xl hover:text-green-700"
                                        >
                                            <i className="fas fa-globe"></i>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>


                        <p className="text-gray-600 block-style text-lg font-medium mb-5">
                            {user.role} at {user.collegeName}
                        </p>
                    </div>




                    {/* About Section  */}
                    <div className="p-4 border-t border-gray-300 pl-10">
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                            About
                        </h2>
                        <div className="text-gray-700 mb-4 ">
                            <div className="items-center">
                                <p className="">{showMore ? bioText : shortText}
                                <button
                                    className="text-blue-500 ml-2"
                                    onClick={() => setShowMore(!showMore)}
                                >
                                    {showMore ? 'See Less' : 'See More'}
                                </button>
                                </p>
                                
                            </div>
                        </div>
                        </div>

                    {/* About Section  <div className={`sm:hidden ${menuOpen ? "block" : "hidden"}`} id="mobile-menu">*/}

                        <div className="border-t border-gray-300 ">
                            <div className="font-semibold text-xl flex pl-10 p-3 space-x-5  ">
                                <div className=""><button
                                type="button"
                                className=""
                                onClick={()=>setOpenSection(openSection === 'posts' ? 'posts' : 'posts')}>Posts</button></div>
                                <div><button type="button" 
                                onClick={()=>setOpenSection(openSection === 'mentor' ? 'mentor' : 'mentor')}>Mentorship</button></div>
                                <div><button type="button" 
                                onClick={()=>setOpenSection(openSection === 'guide' ? 'guide' : 'guide')}>CarrerGuidence</button></div>
                            </div>
                            <div className=" h-28 ">
                                    <div className={openSection=== 'posts' ? "block" : "hidden"}> 
                                        <h1 className="pl-10">Posts</h1>
                                    </div>
                                    <div className={openSection==='mentor' ? "block" : "hidden" }> 
                                        <h1 className="pl-10">Mentorship</h1>
                                    </div>
                                    <div className={openSection==='guide' ? "block" : "hidden" }> 
                                        <h1 className="pl-10">Guidenece</h1>
                                    </div>

                            </div>
                        </div>





                        <div className="border-t border-gray-300 ">

                        <div className="mt-5 mb-10">
                                <h3 className="text-2xl font-medium pl-10 text-gray-800">
                                    Experience
                                </h3>

                                <div className="mt-4 space-y-10">
                                {user.experiences && user.experiences.length > 0 ? (
                                    <ul className="pl-10  list-disc list-inside">
                                        {user.experiences.map((exp, index) => (
                                            <li key={index} className="mb-2">
                                                <strong>{exp.JobTitle}</strong> at{" "}
                                                {exp.CompanyName}
                                                <br />
                                                <div className="pt-5 pl-5">{formatDate(exp.StartDate)} - {formatDate(exp.EndDate)}</div>
                    
                                                <div className="pl-5">Location: {exp.Location}</div>
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

                        <div className="border-t border-gray-300 ">

                        <div className="mt-10 mb-10">
                            {/* Skills Section */}
                            <div>
                                <h3 className="pl-10 text-2xl font-medium">
                                    Skills
                                </h3>

                                {user.skills && user.skills.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {user.skills.map((skill, index) => (
                                            <li key={index} className="pl-10 pt-5">{skill}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600">
                                        No skills listed.
                                    </p>
                                )}
                            </div>
                            </div>
                        </div>       
                    </div>

                    {/* Contact Section */}
                    <div className="p-6 border-t border-gray-200 mb-5">
                        <h2 className="text-2xl font-medium mb-4 pl-5">
                            Contact Information
                        </h2>
                        {/* <ul className="text-gray-700">
            <li>Location: London, UK</li>
            <li>Email: johndoe@email.com</li>
            <li>Phone: +44 1234 567 890</li>
            <li>LinkedIn: linkedin.com/in/johndoe</li>
          </ul> */}
                        <ul className="text-gray-700 pl-5">
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
                                <li >
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
                </div>
            </div>

            <div className="bg-custombg">
                <div className="bg-white w-96 h-screen mt-6 mr-5 rounded-lg shadow-md"></div>
            </div>
        </div>
    );
};

export default ProfilePage;
