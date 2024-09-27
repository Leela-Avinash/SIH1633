const UpcomingEvents = () => {
    const events = [
        {
            name: " Project Expo",
            date: "12/12/2024",
            time: "7 PM To 9 PM",
            organizer: "Prema Sagar",
            image: "../event1.jpeg",
            venue:"Jawaharlal Nehru Technological University, Gurajada Vizianagaram",
        },
        {
            name: "Tech India",
            date: "01/11/2024",
            time: "6 PM To 8 PM",
            organizer: "Charan Sala",
            image: "../event2.jpg",
            venue:"Jawaharlal Nehru Technological University, Kakinada",
        },
        {
            name: "Thoughts on Tech",
            date: "02/10/2024",
            time: "5 PM To 7 PM",
            organizer: "Leela Avinash",
            image: "../event3.jpeg",
            venue:"Jawaharlal Nehru Technological University, Ananthapur",

        },
    ];

    return (
        <div className="  rounded-lg p-4 mb-14">
            {/* <h1 className="text-2xl font-semibold">Upcoming Events</h1> */}
            <div className="grid grid-cols-1 gap-4 ">
                {events.map((event, index) => (
                    <div key={index} className="cursor-pointer flex justify-between items-center bg-gray-50 rounded-lg shadow-md p-5 hover:scale-95 hover:border-2 hover:border-blue-400 h-44">
                        <div className="flex items-center gap-4">
                            <img 
                                src={event.image} 
                                alt={event.name} 
                                className="h-20 w-20 object-cover rounded-lg" 
                            />
                            <div className="">
                            {/* <p className="text-sm font-normal text-gray-500">Organized by: <span className="font-semibold hover:text-blue-400">{event.organizer}</span></p> */}
                                <h1 className="hover:text-blue-500 text-xl text-gray-800 font-bold">{event.name}</h1>
                                <p className="text-sm font-normal text-gray-500">Organized by: <span className="font-semibold hover:text-blue-400">{event.organizer}</span></p>
                                <p className="text-sm font-normal text-gray-500">Date: {event.date}</p>
                                <p className="text-sm font-normal text-gray-500">Time: {event.time}</p>
                                <p className="text-sm font-normal text-gray-500">Venue: {event.venue}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingEvents;
