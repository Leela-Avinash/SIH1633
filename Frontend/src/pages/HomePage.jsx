import React, { useState, useEffect } from 'react';
import PostModal from '../components/PostModal';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recommendedPosts, setRecommendedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user);

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
        <div className="bg-gray-100 p-6 md:p-8 lg:p-10">
            {/* Post Something Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-start">
                    <img
                        src={user.profilepic}
                        alt="User's profile"
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <textarea
                        onClick={handleOpenModal} // Open modal when clicked
                        placeholder="What's on your mind?"
                        className="w-full h-20 p-4 border border-gray-300 rounded-lg focus:outline-none cursor-pointer"
                        readOnly
                    ></textarea>
                </div>
            </div>

            {/* Recommended Posts Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recommended Posts</h2>
                {loading ? (
                    <p className="text-gray-600">Loading recommended posts...</p>
                ) : recommendedPosts.length > 0 ? (
                    recommendedPosts.map((post) => (
                        <div key={post._id} className="border-b border-gray-300 py-4">
                            <div className="flex items-center mb-2">
                                <img
                                    src={post.author.profilepic}
                                    alt={`${post.author.name}'s profile`}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{post.author.name}</h3>
                                    <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-2">{post.content}</p>
                            {post.media && post.media.map((url, index) => (
                                <img key={index} src={url} alt={`Post media ${index}`} className="mt-2 w-full h-auto rounded-lg shadow-sm" />
                            ))}
                            <div className="flex justify-between mt-2">
                                <span className="text-gray-500 text-sm">Likes: {post.likes.length}</span>
                                <span className="text-gray-500 text-sm">Comments: {post.comments.length}</span>
                            </div>
                        </div>
                    ))
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
