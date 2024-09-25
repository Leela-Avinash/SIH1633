const Suggestions = () => {
    const suggestions = [
        {
            name: "J Praneeth",
            college: "Alumni at JNTUGV",
            profilePic: "../user111.png", // Update with the correct path
        },
        {
            name: "Badam Jyothi",
            college: "Alumni at RITV-Rajasthan",
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
            college: "Alumni at Andhra University",
            profilePic: "../boy.jpg",
        },
    ];

    return (
        <div className="bg-gray-100 rounded-lg p-4 mt-5 ml-8">
            <h1 className="text-xl text-center te-tgray-570 m font-semibold b-4 pb-5">Suggestions</h1>
            <div className="grid grid-cols-1 gap-4">
                {suggestions.map((suggestion, index) => (
                    <div 
                        key={index} 
                        className="flex items-center justify-between  p-4 rounded-lg shadow-md bg-gray-50"
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
                            <p className="text-sm text-gray-500">{suggestion.college}</p>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center space-x-2 ml-4">
                            <button className="bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-blue-600">
                                Connect
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Suggestions;
