const Suggestions = () => {
    const suggestions = [
        {
            name: "J Praneeth",
            college: "Alumni at JNTUGV",
            profilePic: "../user111.png", // Update with the correct path
        },
        {
            name: "Badam Jyothi",
            college: "Alumni at VIT-AP",
            profilePic: "../boy.jpg",
        },
        {
            name: "Praveen Suvvari",
            college: "Alumni at VIT-AP",
            profilePic: "../user111.png",
        },
        {
            name: "Mali Rajesh",
            college: "Alumni at LPU University",
            profilePic: "../user111.png",
        },
        {
            name: "P SivaRam",
            college: "Alumni at JNTU Kakinada",
            profilePic: "../boy.jpg",
        },
    ];

    return (
        <div className=" rounded-lg p-4 ml-7 ">
            <h1 className="text-2xl text-center text-gray-700 m font-bold b-4 pb-5">Suggestions</h1>
            <div className="border-2 rounded-md">
                <div className="grid grid-cols-1">
                    {suggestions.map((suggestion, index) => (
                        <div>
                        <div
                            key={index}
                            className="h-20 flex items-center justify-between  p-4 "
                        >
                            {/* Profile picture */}
                            <img
                                src={suggestion.profilePic}
                                alt={suggestion.name}
                                className="h-12 w-12 rounded-full object-cover mr-4"
                            />

                            {/* Name and College */}
                            <div className="flex-grow">
                                <h1 className="text-lg font-semibold">{suggestion.name}</h1>
                                <p className="text-xs text-gray-500">{suggestion.college}</p>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center space-x-2 ml-4">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                                    Connect
                                </button>

                            </div>
                            
                        </div>
                        <hr className=" w-full border-t border-gray-300" />
                        </div>

                    ))}
                    
                </div>
            </div>
        </div>
    );
};

export default Suggestions;
