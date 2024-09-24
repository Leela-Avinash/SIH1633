import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  const Experience = ({ user }) => {
    const formatDate = (date) => {
      return date ? new Date(date).toLocaleDateString() : "Present";
    };
  }

  const formatDate = (isoString) => {
    if (!isoString) return "Present";

    const dateObj = new Date(isoString);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "short" });
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };


  const [postopen, setpostopen] = useState(false);
  const [mentoropen, setmentoropen] = useState(false);
  const [guideopen, setguideopen] = useState(false);
  const [openSection, setOpenSection] = useState("posts");
  const [guideVar, setguideVar] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [userPosts,setPosts]=useState([]);
  const maxVisibleExperiences = 1; 
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/userposts", {
          method: "GET",
          credentials: "include",
        });
        const json = await response.json();
        console.log(json);
        setPosts(json.posts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };
    fetchUserPosts();
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const experiencesToShow = showAll
      ? user.experiences
      : user.experiences.slice(0, maxVisibleExperiences); 

  const skillsToShow = showAll ? user.skills : user.skills.slice(0, 3);

  const [showMore, setShowMore] = useState(false);
  const carrer_guidance_var = `"When I graduated, I was uncertain about how to navigate the highly competitive tech industry. The key was focusing on building my technical portfolio by working on real-world projects, which I could showcase to potential employers. I also leveraged my network, particularly reaching out to alumni, which helped me secure interviews. My advice to current students is to always be curious and keep learning—especially emerging technologies like AI and cloud computing. And don’t hesitate to reach out to seniors for mentorship; I’m always happy to help! Work on real-world campaigns as part of your coursework or internships—practical experience is invaluable. I also emphasize the importance of building a personal brand online. In today’s world, having a well-maintained LinkedIn profile and an active social media presence can set you apart"`;
  const carrer_guide_var2 =
    carrer_guidance_var.split("").slice(0, 50).join("") + ".....";
  const bioText = user.bio;
  const shortText = bioText.split(" ").slice(0, 30).join(" ") + "....";
  return (
    <div className="top-20 flex ">
      <div className="p-6 bg-custombg ">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative">
            <img
              className="w-full h-52 object-cover object-center "
              //  src={user.profilepic}
              src="../public/background.jpg"
              alt="Background"
            />

            <div className="absolute top-16 left-12">
              <img
                className="w-52 h-52 rounded-full object-cover border-8 border-white"
                src={user.profilepic}
                alt="User"
              />
            </div>
          </div>

          <div className="flex items-center flex-col space-y-3 p-3">
            <div className=" ml-auto space-y-2 ">
              <div className="flex font-semibold text-md mr-10 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="22"
                  height="22" viewBox="0 0 576 512"
                  className="fill-current text-gray-700 hover:text-gray-950 mr-1 mt-1 text-black transform rotate-15"
                >
                  <path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3 0 289.2zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z" />
                </svg>Rating : (4.5) </div>
              <div className="flex font-semibold text-md mr-3 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className="fill-current text-yellow-700  hover:text-yellow-900 mr-1 mt-1 text-black transform rotate-15"
                >
                  <path d="M12 5C7.031 5 2 6.546 2 9.5S7.031 14 12 14c4.97 0 10-1.546 10-4.5S16.97 5 12 5zm-5 9.938v3c1.237.299 2.605.482 4 .541v-3a21.166 21.166 0 0 1-4-.541zm6 .54v3a20.994 20.994 0 0 0 4-.541v-3a20.994 20.994 0 0 1-4 .541zm6-1.181v3c1.801-.755 3-1.857 3-3.297v-3c0 1.44-1.199 2.542-3 3.297zm-14 3v-3C3.2 13.542 2 12.439 2 11v3c0 1.439 1.2 2.542 3 3.297z"></path>
                </svg>
                Credits: 100
              </div>
            </div>

          </div>
          <div className="pl-12 flex h-fit  justify-between mb-3">
            <div className=" flex-col w-56">
              <div>
                <h1 className="text-4xl font-bold text-black">{user.fname}</h1>
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
                        className="text-2xl hover:text-gray-800"
                      >
                        <i className="fas fa-globe"></i>
                      </a>
                    )}
                  </div>
                )}{" "}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-300 pl-10 ">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">About</h2>
            <div className="text-gray-700 mb-4 ">
              <div className="items-center">
                <p className="">
                  {showMore ? bioText : shortText}
                  <button
                    className="text-custom1 ml-2"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "See Less" : "See More"}
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 ">
            <div className="font-semibold text-xl flex justify-around   p-2  ">
              <div
                onClick={() => setOpenSection("posts")}
                className={`transition-colors p-2 cursor-pointer ${openSection === "posts"
                    ? "text-black w-2/6 text-center bg-white"
                    : "text-black bg-gray-200 border border-white w-2/6 text-center"
                  }`}
              >
                Posts
              </div>
              <div
                onClick={() => setOpenSection("mentor")}
                className={`transition-colors p-2 cursor-pointer ${openSection === "mentor"
                    ? "text-black w-2/6 text-center bg-white"
                    : "text-black bg-gray-200 border border-white w-2/6 text-center"
                  }`}
              >
                Mentorship
              </div>
              <div
                onClick={() => setOpenSection("guide")}
                className={`transition-colors p-2 cursor-pointer ${openSection === "guide"
                    ? "text-black w-2/6 text-center bg-white"
                    : "text-black bg-gray-200 border border-white w-2/6 text-center"
                  }`}
              >
                Career Guidance
              </div>
            </div>

            <div className="h-fit mb-5 ">
              <div className={openSection === "posts" ? "block flex flex-col gap-6" : "hidden"}>
                <div className="pl-10 flex space-x-4 ">
                  {userPosts.map((post) => (
                    <div key={post._id} className="w-56 h-56 rounded-lg shadow-lg">
                      <img
                        src={post.media[0]}
                        alt="Post"
                        className="w-56 h-56 rounded-lg shadow-lg"
                      />
                    </div>
                  ))}
                  </div>
                  <div className="flex justify-center items-center">
                    <h1 className="text-md font-semibold text-blue-500">Show all {openSection}</h1>
                  </div>
                  {/* <img
                    src="sample1.jpg"
                    alt="Post 1"
                    className="w-24 h-24 rounded-lg shadow-lg"
                  />
                  <img
                    src="sample2.jpg"
                    alt="Post 2"
                    className="w-24 h-24 rounded-lg shadow-lg"
                  />
                  <img
                    src="sample3.jpg"
                    alt="Post 3"
                    className="w-24 h-24 rounded-lg shadow-lg"
                  /> */}
              </div>

              <div className={openSection === "mentor" ? "block" : "hidden"}>
                <h1 className="pl-10 text-lg font-semibold p-3">
                  Mentorship Programs offered by Charan teja
                </h1>
                <div className="pl-10 flex">
                  <video controls className="w-48 h-28 rounded-lg shadow-lg">
                    <source src="sample_video1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <video
                    controls
                    className="w-48 h-28 rounded-lg shadow-lg ml-4"
                  >
                    <source src="sample_video2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <div className={openSection === "guide" ? "block" : "hidden"}>
                <h1 className="pl-10 text-lg font-semibold">Career Guidance</h1>
                <div className="pl-10 space-y-2">
                  <p className="text-gray-600">
                    {guideVar ? carrer_guidance_var : carrer_guide_var2}
                    <button
                      className="text-custom1 ml-2"
                      onClick={() => setguideVar(!guideVar)}
                    >
                      {guideVar ? "See Less" : "See More"}
                    </button>
                    <br /> <span className="text-black">Contact:</span>
                    tejaunknown@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 ">
            <div className="mt-5 mb-10">
              <h3 className="text-2xl font-medium pl-10 text-gray-800">Experience</h3>

              <div className="mt-4 space-y-10">
                {user.experiences && user.experiences.length > 0 ? (
                  <ul className="pl-10 list-disc list-inside">
                    {experiencesToShow.map((exp, index) => (
                      <li key={index} className="mb-2">
                        <strong>{exp.JobTitle}</strong> at {exp.CompanyName}
                        <br />
                        <div className="pt-5 pl-5">
                          {formatDate(exp.StartDate)} - {formatDate(exp.EndDate)}
                        </div>
                        <div className="pl-5">Location: {exp.Location}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No experience listed.</p>
                )}

                {user.experiences.length > maxVisibleExperiences && (
                  <button
                    onClick={handleToggle}
                    className="mt-4 ml-10 text-blue-500 hover:underline"
                  >
                    {showAll ? "View Less" : "View More"}
                  </button>
                )}
              </div>
            </div>

            <div className="border-t border-gray-300 ">
              <div className="mt-10 mb-10">
                {/* Skills Section */}
                <div>
                  <h3 className="pl-10 text-2xl font-medium">Skills</h3>

                  {user.skills && user.skills.length > 0 ? (
                    <div>
                      <ul className="list-disc list-inside">
                        {skillsToShow.map((skill, index) => (
                          <li key={index} className="pl-10 pt-5">
                            {skill}
                          </li>
                        ))}

                        {user.skills.length > 3 && (
                          <button
                            onClick={toggleShowAll}
                            className="mt-3 pl-10 text-blue-500 hover:underline"
                          >
                            {showAll ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-600">No skills listed.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 mb-5">
            <h2 className="text-2xl font-medium mb-4 pl-5">
              Contact Information
            </h2>
            <ul className="text-gray-700 pl-5">
              {user.location && (
                <>
                  {user.location.City && <li>City: {user.location.City}</li>}
                  {user.location.State && <li>State: {user.location.State}</li>}
                  {user.location.Code && (
                    <li>Postal Code: {user.location.Code}</li>
                  )}
                  {user.location.Country && (
                    <li>Country: {user.location.Country}</li>
                  )}
                  {user.location.Phone && <li>Phone: {user.location.Phone}</li>}
                </>
              )}
              {user.email && (
                <li>
                  Email:{" "}
                  <a href={`mailto:${user.email}`} className="text-blue-500">
                    {user.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ProfilePage;