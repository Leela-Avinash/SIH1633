import React, { useState, useEffect } from 'react';
import PostModal from '../components/PostModal';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recommendedPosts, setRecommendedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const [expandedPosts, setExpandedPosts] = useState({});

    const toggleExpand = (postId) => {
        setExpandedPosts((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

    // Function to handle opening the modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Fetch recommended posts when component mounts
    useEffect(() => {
        const fetchRecommendedPosts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users/posts", {
                    method: "GET",
                    credentials: "include",
                });
                const json = await response.json(); // Adjust the endpoint as needed
                console.log(json);
                setRecommendedPosts(json.topRecommendations); // Assuming the response structure
            } catch (error) {
                console.error('Error fetching recommended posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendedPosts();
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <div className=" py-2 ">
            {/* Post Something Section */}
            <div className="bg-gray-50 p-6 border-b-[1px]">
                <div className="flex items-start">
                    <img
                        src={user.profilepic}
                        alt="Profile"
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div className="relative w-full">
                        <button
                            onClick={handleOpenModal}
                            className="w-full h-12 p-4 border border-gray-300 bg-gray-100 rounded-full focus:outline-none cursor-text"
                        >
                            {/* Actual button content can be added here if needed */}
                        </button>
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                            What's on your mind?
                        </span>
                    </div>
                </div>

                {/* <div className="flex justify-end mt-4">
                    <button
                        onClick={handleOpenModal}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Create Post
                    </button>
                </div> */}
            </div>

            {/* Recommended Posts Section */}
            <div className="bg-gray-50 px-6 ">
                {/* <h2 className="text-xl font-semibold mb-4 text-gray-800">Suggested for You</h2> */}
                {/* <hr className="border-gray-300 " /> */}
                {loading ? (
                    <p className="text-gray-600">Loading recommended posts...</p>
                ) : recommendedPosts.length > 0 ? (
                    recommendedPosts.map((post) => {
                        const isExpanded = expandedPosts[post._id] || false;
                        const smallContent = post.content.split(" ").slice(0, 10).join(" ") + ".....";
                        return (
                            <div key={post._id} className="border-b border-gray-300 py-4">
                                <div>
                                    <div className='flex items-center'>
                                        {post.author.profilepic ? (<img src={post.author.profilepic} className='w-10 h-10 rounded-full mr-3 border-[1px] p-[2px] border-blue-400 object-cover '></img>) : (<img src="userlogo.jpeg" className='w-10 h-10 rounded-full mr-3 object-cover '></img>)}

                                        <div className='flex flex-col'>
                                            <h3 className="font-bold text-xl text-gray-900 cursor-pointer hover:text-gray-700">{post.author.name}</h3>
                                            {/* <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p> */}
                                            <p className="text-gray-500 text-tiny font-thin">
                                                {new Date(post.createdAt).toLocaleString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <div className=' rounded-md px-1'>
                                    {post.content.length > 300 ? (
                                        <p className="text-[18px] text-gray-800 font-light mt-3 rounded-lg ">
                                            {isExpanded ? post.content : smallContent}&nbsp;
                                            <button className="text-blue-400 font-thin" onClick={() => toggleExpand(post._id)}>
                                                {isExpanded ? 'See less' : 'See more'}
                                            </button>
                                        </p>
                                    ) : (
                                        <p className=" text-[18px] text-gray-800 font-light mt-3 rounded-lg ">{post.content}</p>
                                    )}
                                </div>
                                {post.media && post.media.map((url, index) => (
                                    <img key={index} src={url} alt={`Post media ${index}`} className="mt-2 w-full h-96 object-cover shadow-sm" />
                                ))}
                                <div className="flex justify-between mt-2">
                                    <span className="text-gray-500 text-sm">Likes: 15</span>
                                    <span className="text-gray-500 text-sm">Comments: 20</span>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <p className="text-gray-600">No recommended posts available.</p>
                )}
            </div>

            {/* Modal Component */}
            {isModalOpen && <PostModal onClose={handleCloseModal} />}
        </div>
    );
};

export default HomePage;
