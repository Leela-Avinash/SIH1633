import MentorshipProgram from "./MentorShipProgram.jsx";
import ProfileAnalytics from "./ProfileAnalytics.jsx";
import UpcomingEvents from "./UpcomingEvents.jsx";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className=" h-full ">
      {/* <hr className="mt-2 w-full border-t border-gray-300"/> */}
      <h1 className="font-semibold text-2xl m-3">Welcome,<span className="text-blue-500 text-3xl font-bold">{user.fname}</span> </h1>
      {/* <hr className="mt-5 mb-3 w-full border-t border-gray-300"/> */}
      <div className="w-full flex justify-around h-24 items-center">
        <button>
          <div className="shadow-lg h-20 w-72 flex flex-col justify-center items-center rounded-md border-2  border-yellow-400 hover:bg-yellow-100 hover:w-74 hover:h-22">
            <div className="flex gap-2 justify-center pr-5 items-center">
              <img src="../postadd.png" className="h-8 w-8 "></img>
              {/* <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/plus-math.png" alt="plus-math"/> */}
              <p className="text-lg font-normal">Create a post</p>
            </div>
            <div>
              <p className="font-thin text-tiny text-gray-500 text-center">Inspire others with your experience!</p>
            </div>
          </div>
        </button>
        <button>
          <div className="shadow-lg h-20 w-72 flex flex-col justify-center items-center rounded-md border-2 border-blue-500 hover:bg-blue-100 hover:w-74 hover:h-22">
            {/* <img src="../schedue_event.png" className="w-7 h-7 mr-2"></img>Schedule an event</div> */}
            <div className="flex gap-2 justify-center pr-5 items-center">
              <img src="../schedue_event.png" className="h-8 w-8 "></img>
              {/* <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/plus-math.png" alt="plus-math"/> */}
              <p className="text-md font-normal">Schedule an Event</p>
            </div>
            <div>
              <p className="font-thin text-tiny text-gray-500 text-center">Organize an event to connect, learn, and grow!</p>
            </div>
          </div>
        </button>
        <button>
          {/* <div className="shadow-lg h-20 w-60 text-sm flex justify-center items-center rounded-md border-2 border-violet-600">
          <img src="/be_a_mentor.png" className=""></img>Host a Mentorship Program</div> */}

          <div className="shadow-lg h-20 w-72 flex flex-col justify-center items-center rounded-md border-2  border-violet-500 hover:bg-violet-100 hover:w-74 hover:h-22">
            {/* <img src="../schedue_event.png" className="w-7 h-7 mr-2"></img>Schedule an event</div> */}
            <div className="flex gap-2 justify-center pr-5 items-center">
              <img src="../be_a_mentor.png" className="h-8 w-8 "></img>
              {/* <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/plus-math.png" alt="plus-math"/> */}
              <p className="text-md font-normal">Host a Mentorship Program</p>
            </div>
            <div>
              <p className="font-thin text-tiny text-gray-500 text-center"> Create your mentorship program today!</p>
            </div>



          </div>
        </button>

      </div>
      {/* <hr className="mt-5 w-full border-t border-gray-300"/> */}
      <div>
        <h1 className="text-xl my-4 text-gray-600 ml-6 font-semibold">Your Achievements and Engagement</h1>
        <ProfileAnalytics />
      </div>
      {/* <hr className="mt-5 mb-3 w-full border-t border-gray-300"/> */}
      <div className="flex w-full">
        <div className="pl-5 w-1/2">
       <h1 className="text-xl pl-5 my-1 mt-10 ml-2 text-gray-700 font-semibold">Upcoming Events</h1>
          <UpcomingEvents />
        </div>
        <div class="my-10 h-100 w-[1px] bg-gray-300"></div>
        <div className="w-1/2 ">
          <h1 className="text-xl my-1 mt-10 ml-2 pl-5 text-gray-700 font-semibold">Upcoming Mentorship Programs</h1>
          <MentorshipProgram/>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
