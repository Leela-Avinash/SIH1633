import React, { useState } from 'react';
import PostModal from '../components/PostModal';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = useSelector((state) => state.user);

    // Function to handle opening the modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className=" bg-gray-100 p-4">
            {/* Navigation Bar and other sections */}

            {/* Post Something Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-start">
                    <img
                        src={user.profilepic}
                        alt="Profile"
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <textarea
                        onClick={handleOpenModal} // Open modal when clicked
                        placeholder="What's on your mind?"
                        className="w-full h-20 p-4 border border-gray-300 rounded-lg focus:outline-none cursor-pointer"
                        readOnly
                    ></textarea>
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

            {/* Modal Component */}
            {isModalOpen && <PostModal onClose={handleCloseModal} />}
        </div>
    );
};

export default HomePage;