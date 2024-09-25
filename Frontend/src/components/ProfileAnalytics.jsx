import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProfileAnalytics = () => {
  const user = useSelector((state) => state.user);
  const [credits, setCredits] = useState(0);
  const [mentorship, setMentorship] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [eventsHosted, setEventsHosted] = useState(0);

  const userCredits = 100;
  const userMentorship = 15;
  const userFollowers = 200;
  const userEventsHosted = 3;

  // Function to animate numbers
  const animateValue = (setValue, userValue, duration) => {
    let start = 0;
    const increment = userValue / (duration / 60);

    const counter = setInterval(() => {
      start += increment;
      if (start >= userValue) {
        setValue(userValue); // set final value when done
        clearInterval(counter);
      } else {
        setValue(Math.ceil(start)); // update state with animated number
      }
    }, 50);

    return () => clearInterval(counter); // clean up on unmount
  };

  // useEffect for each stat
  useEffect(() => {
    animateValue(setCredits, userCredits, 2000);
    animateValue(setMentorship, userMentorship, 2000);
    animateValue(setFollowers, userFollowers, 2000);
    animateValue(setEventsHosted, userEventsHosted, 2000);
  }, []);

  return (
    
    <div className="flex w-full h-80 justify-around items-center bg-gray-50 shadow-md mx-5 ">
      
      <div className="flex flex-col items-center justify-center ml-8">
        <img src={user.profilepic} className="object-cover rounded-full w-60 h-60  shadow-md border-4 p-1 border-blue-400" alt="Profile" />
      </div>
      <div className="flex flex-col justify-evenly items-center space-y-5 w-3/4 h-full">
        {/* Credits Section */}
        <div className="flex items-center space-x-4 justify-center mt-3">
          <img src="../coins2.gif" className="h-14 w-14 animate-fade-in" alt="Credits Icon" />
          <p className="text-2xl font-normal ">Total Credits Secured:</p>
          <p className="text-6xl font-bold text-green-600">{credits}</p>
        </div>
        

        {/* Stats Section */}
        <div className="flex justify-evenly gap-10 mt-6 text-center ">
          <div className="flex flex-col gap-3">
          <p className="text-5xl font-bold text-violet-500">{mentorship}</p>
            <p className="text-md text-gray-400 font-normal text-center">Mentorship Sessions<br/> Organized</p>
            
          </div>
          <div className="flex flex-col gap-3">
          <p className="text-5xl font-bold text-gray-700">{followers}</p>
            <p className="text-md  text-gray-400 font-normal">Your Followers</p>
            
          </div>
          <div className="flex flex-col gap-3">
          <p className=" text-5xl font-bold text-blue-500">{eventsHosted}</p>
            <p className="text-md text-gray-400 font-normal">Total Events Hosted</p>
           
          </div>
        </div>
        <div className="flex pb-2 pb-12">
        {/* <img src="../reward_top1.gif" className="w-8 h-8"></img> */}
        <div className="rounded-full bg-orange-100 text-gray-800 font-seminold px-3 py-1 pr-3 font-thin">
            You are among the top 10 Alumni on the platform</div>
        <img src="../reward_top2.gif" className="w-8 h-8"></img>
        </div>
      </div>
    </div>
  );
}

export default ProfileAnalytics;