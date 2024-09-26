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

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchRecommendedPosts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users/posts", {
                    method: "GET",
                    credentials: "include",
                });
                const json = await response.json();
                setRecommendedPosts(json.topRecommendations); // Adjust as per your API structure
            } catch (error) {
                console.error('Error fetching recommended posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendedPosts();
    }, []);

    return (
        <div className=" py-2 ">
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
                        />
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                            What's on your mind?
                        </span>
                    </div>
                </div>
            </div>

            {/* Recommended Posts Section */}
            <div className="bg-gray-50 px-6">
                {loading ? (
                    <div>
                        {/* Skeleton Loader for Posts */}
                        {[1, 2, 3].map((_, index) => (
                            <div key={index} className="animate-pulse space-y-4 py-4 border-b border-gray-300">
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                                        <div className="h-4 bg-gray-300 rounded w-1/5"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                    <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/5"></div>
                                </div>
                                <div className="h-48 bg-gray-300 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : recommendedPosts.length > 0 ? (
                    recommendedPosts.map((post) => {
                        const isExpanded = expandedPosts[post._id] || false;
                        const smallContent = post.content.split(" ").slice(0, 20).join(" ") + ".....";
                        return (
                            <div key={post._id} className="border-b border-gray-300 py-4">
                                <div>
                                    <div className='flex items-center'>
                                        {post.author.profilepic ? (
                                            <img src={post.author.profilepic} className='w-10 h-10 rounded-full mr-3 border-[1px] p-[2px] border-blue-400 object-cover ' />
                                        ) : (
                                            <img src="userlogo.jpeg" className='w-10 h-10 rounded-full mr-3 object-cover ' />
                                        )}
                                        <div className='flex flex-col'>
                                            <h3 className="font-bold text-xl text-gray-900 cursor-pointer hover:text-gray-700">{post.author.name}</h3>
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
                                <div className='rounded-md px-1'>
                                    {post.content.length > 300 ? (
                                        <p className="text-[18px] text-gray-800 font-light mt-3 rounded-lg">
                                            {isExpanded ? post.content : smallContent}&nbsp;
                                            <button className="text-blue-400 font-thin" onClick={() => toggleExpand(post._id)}>
                                                {isExpanded ? 'See less' : 'See more'}
                                            </button>
                                        </p>
                                    ) : (
                                        <p className="text-[18px] text-gray-800 font-light mt-3 rounded-lg">{post.content}</p>
                                    )}
                                </div>
                                {post.media && post.media.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Post media ${index}`}
                                        className="mt-2 w-full bg-white h-96 object-contain shadow-sm"
                                    />
                                ))}
                                <div className="flex justify-between mt-3">
                                    <div className='ml-2 mt-1 flex justify-center items-center gap-2'>
                                        <img src="/like.png" className='h-7 w-7 hover:scale-125' />
                                        <span className="text-gray-500 text-md">Likes: 16</span>
                                    </div>
                                    <div className='ml-2 mt-1 flex justify-center items-center gap-2'>
                                        <img src="/comment.png" className='h-7 w-7 hover:scale-125' />
                                        <span className="text-gray-500 text-md">Comments: 33</span>
                                    </div>
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
