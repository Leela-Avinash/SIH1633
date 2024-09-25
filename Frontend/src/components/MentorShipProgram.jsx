const MentorshipProgram = () => {
    const events = [
        {
            name: "Resume Building and Interview Skills",
            date: "12/12/2024",
            organizer: "S.G. Charan Teja",
            image: "../building_skills.jpg",
            starttime:"5pm",
            endtime:"6pm",
            sessions: "2",
            mentees: "50",
        },
        {
            name: "Full Stack Web Development",
            date: "01/11/2024",
            organizer: "Bhavani Malleswari",
            image: "../web_develop.jpg",
            starttime:"5pm",
            endtime:"6pm",
            sessions: "2",
            mentees: "97",
        },
        {
            name: "AI & Machine Learning",
            date: "02/10/2024",
            organizer: "Mohana Swarupa",
            image: "../AIML_Mentorship.jpg",
            starttime:"5pm",
            endtime:"6pm",
            sessions: "2",
            mentees: "75",
        },
    ];
    return (
        <div className=" rounded-2xl p-4  mb-14">
            <div className="grid grid-cols-1 gap-4">
                {events.map((event, index) => (
                    <div key={index} className="flex justify-between items-center rounded-lg hover:scale-95 hover:border-2 hover:border-purple-400 bg-gray-50 shadow-md p-5 h-44">
                        <div className="flex items-center gap-4">
                            <img
                                src={event.image}
                                alt={event.name}
                                className="h-20 w-20 object-cover rounded-lg"
                            />
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">{event.name}</h1>
                                {/* <p className="text-sm font-normal text-gray-500">Date: {event.date}</p> */}
                                <p className="text-sm font-normal text-gray-500">Organized by: <span className="font-semibold hover:text-blue-400">{event.organizer}</span></p>
                                <div className="flex gap-2">
                                <p className="text-sm font-normal text-gray-500">Sessions Conducted: {event.sessions}</p>
                                <p className="text-sm font-normal text-gray-500">Active Mentees: {event.mentees}</p>
                                </div>
                                <p className="text-sm font-normal text-gray-500">Next Session: {event.starttime} - {event.endtime} ({event.date})</p> 

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default MentorshipProgram;