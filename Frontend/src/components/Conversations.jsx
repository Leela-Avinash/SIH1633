import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedConversation } from "../redux/slices/setConversationSlice"; 

const Conversations = ({ conversation, isOnline }) => {
    const currentUser = useSelector((state) => state.user);
    const lastMessage = conversation.lastMessage || {};
    console.log(conversation.participants)

    const user = conversation.participants[0] || { 
        _id: "", 
        username: "Unknown User", 
        profilepic: "../../IMG/landing.png"
    };
    
    const dispatch = useDispatch();

    return (
        <div 
            className="flex gap-4 items-center p-1 hover:cursor-pointer hover:bg-gray-600 hover:text-white rounded-md" 
            onClick={() => dispatch(setSelectedConversation({
                _id: conversation._id, 
                userId: user._id, 
                userProfilePic: user.profilepic, 
                username: user.username 
            }))}
        >
            <div className="flex items-center space-x-2">
                <img
                    className="w-8 h-8 md:w-12 md:h-12 rounded-full"
                    src={user.profilepic} 
                    alt="Avatar"
                />
                {isOnline ? (
                    <div className="relative">
                        <span className="absolute right-1.5 -bottom-6 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                    </div>
                ) : ""}
            </div>

            <div className="flex flex-col text-sm space-y-1">
                <div className="flex items-center font-bold">
                    {user.username} 
                    <img
                        src="../../IMG/istockphoto-1396933001-612x612.png"
                        className="w-5 h-5 ml-1"
                        alt="Verified Badge"
                    />
                </div>
                <div className="flex items-center text-xs gap-1">
                    {currentUser._id === lastMessage?.sender ? 
                        <p>Message sent</p> : 
                        (lastMessage.text?.length > 18 ? `${lastMessage.text.substring(0, 18)}...` : 
                        lastMessage.text || 'No message')
                    }
                </div>
            </div>
        </div>
    );
};

export default Conversations;
