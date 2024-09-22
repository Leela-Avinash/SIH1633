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
    const[guideVar,setguideVar]=useState(false);
    
    const [showMore, setShowMore] = useState(false);
    const carrer_guidance_var=`"When I graduated, I was uncertain about how to navigate the highly competitive tech industry. The key was focusing on building my technical portfolio by working on real-world projects, which I could showcase to potential employers. I also leveraged my network, particularly reaching out to alumni, which helped me secure interviews. My advice to current students is to always be curious and keep learning—especially emerging technologies like AI and cloud computing. And don’t hesitate to reach out to seniors for mentorship; I’m always happy to help! Work on real-world campaigns as part of your coursework or internships—practical experience is invaluable. I also emphasize the importance of building a personal brand online. In today’s world, having a well-maintained LinkedIn profile and an active social media presence can set you apart"`;
    const carrer_guide_var2=carrer_guidance_var.split('').slice(0,50).join('')+'.....';
    const bioText = `
  My name is S. Gowri Charan Teja, and I am currently pursuing a B.Tech in Computer Science and Engineering at JNTU-GV, Vizianagaram, with an expected graduation in 2026. Prior to this, I completed my diploma at Sir CR Reddy Polytechnic, Eluru.
   I am deeply passionate about full stack development and have cultivated a diverse skill set in this area. My technical expertise includes HTML, CSS, JavaScript, Bootstrap, Node.js, Express.js, React, SQL, and Git. These skills enable me to build robust, efficient, and user-friendly web applications from the ground up.
  I am always eager to take on new challenges and continuously improve my knowledge and abilities in web development. My goal is to contribute to innovative projects and collaborate with like-minded professionals in the tech industry.`;
    const shortText = bioText.split(' ').slice(0, 30).join(' ') + '....';
    return (
        <div className="relative top-20 flex bg-custombg">


            <div className="p-6 bg-custombg w-9/12">

                <div className="bg-white shadow-lg rounded-lg overflow-hidden ">
                    <div className="relative">
                        <img className="w-full h-52 object-cover object-center" src={user.profilepic} alt="Background" />

                        <div className="absolute top-16 left-12">
                            <img className="w-52 h-52 rounded-full object-cover" src={user.profilepic} alt="User" />
                        </div>
                    </div>

                    <div  className="flex items-center flex-col p-3">
                        <div className=" ml-auto ">
                            <div className="font-semibold text-lg mr-32">Rating : </div>
                            <div className="font-semibold text-lg mr-32">
                                Credits: 48</div>
                                </div>
                    </div>
                    <div className="pl-12 flex h-fit  justify-between mb-3">
                            <div className=" flex-col w-56">
                                <div>
                                <h1 className="text-4xl font-bold text-black">
                                    {user.fname}
                                </h1>
                                <p className="text-gray-600 text-lg font-medium mb-2">
                                    {user.role} at {user.collegeName}
                                </p>
                                </div>
                                </div>

                                <div className=" w-56 flex justify-center p-5  ">
                                <div className="mt-auto flex space-x-5">
                                {user.social && (
                                    <div className="flex space-x-5">
                                        {user.social.linkedinProfile && (
                                            <a
                                                href={user.social.linkedinProfile}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-custom1 text-2xl hover:text-blue-700"
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
                                                className="text-2xl hover:text-gray-800">
                                                <i className="fas fa-globe"></i>
                                            </a>
                                        )}
                                    </div>
                                )}   </div>
                                </div>
                               
                           
                        </div>

                    

                    <div className="p-4 border-t border-gray-300 pl-10">
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                            About
                        </h2>
                        <div className="text-gray-700 mb-4 ">
                            <div className="items-center">
                                <p className="">{showMore ? bioText : shortText}
                                <button
                                    className="text-custom1 ml-2"
                                    onClick={() => setShowMore(!showMore)}
                                >
                                    {showMore ? 'See Less' : 'See More'}
                                </button>
                                </p>
                                
                            </div>
                        </div>
                        </div>

                <div className="border-t border-gray-300 ">
                <div className="font-semibold text-xl flex justify-around  pl-10 p-3   ">
                    <div className={`transition-colors p-2  ${openSection === 'posts' ? 'text-black w-2/6 text-center bg-white ' : 'text-black bg-gray-200 border border-white w-2/6 text-center '}`}>
                    <button type="button"onClick={() => setOpenSection('posts')}>Posts</button>
                    </div>

                    <div className={`transition-colors p-2  ${openSection === 'mentor' ? 'text-black w-2/6 text-center bg-white ' : 'text-black bg-gray-200 border border-white w-2/6 text-center '}`}>
                    <button type="button"onClick={() => setOpenSection('mentor')}>Mentorship</button>
                    </div>

                    <div className={`transition-colors p-2  ${openSection === 'guide' ? 'text-black w-2/6 text-center bg-white ' : 'text-black bg-gray-200 w-2/6 border border-white text-center '}`}>
                    <button type="button"onClick={() => setOpenSection('guide')}>Carrer Guidance</button>
                    </div>

                </div>

                <div className="h-fit mb-5 ">  
                    <div className={openSection === 'posts' ? "block" : "hidden"}>
                        <div className="pl-10 flex space-x-4 ">
                            <img src="sample1.jpg" alt="Post 1" className="w-24 h-24 rounded-lg shadow-lg" />
                            <img src="sample2.jpg" alt="Post 2" className="w-24 h-24 rounded-lg shadow-lg" />
                            <img src="sample3.jpg" alt="Post 3" className="w-24 h-24 rounded-lg shadow-lg" />
                        </div>
                    </div>
                    
                    <div className={openSection === 'mentor' ? "block" : "hidden"}>
                        <h1 className="pl-10 text-lg font-semibold p-3">Mentorship Programs offered by Charan teja</h1>
                        <div className="pl-10 flex">
                            <video controls className="w-48 h-28 rounded-lg shadow-lg">
                                <source src="sample_video1.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <video controls className="w-48 h-28 rounded-lg shadow-lg ml-4">
                                <source src="sample_video2.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    
                    <div className={openSection === 'guide' ? "block" : "hidden"}>
                        <h1 className="pl-10 text-lg font-semibold">Career Guidance</h1>
                        <div className="pl-10 space-y-2">
                            <p className="text-gray-600">{guideVar ? carrer_guidance_var : carrer_guide_var2}
                                <button
                                    className="text-custom1 ml-2"
                                    onClick={() =>setguideVar(!guideVar)}
                                >
                                    {guideVar ? 'See Less' : 'See More'}
                                </button>
                           <br/> <span className="text-black">Contact:</span>tejaunknown@gmail.com</p>
                            
                        </div>
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
