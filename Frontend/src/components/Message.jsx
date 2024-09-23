import React from "react";
import { useSelector } from "react-redux";

const Message = ({message, ownMessage }) => {
    const selectedConversation = useSelector(
        (state) => state.selectedConversation
    );
    const currentUser = useSelector((state) => state.user);
    return (
        <>
            {ownMessage ? (
                <div className="flex gap-2 self-end">
                    <p className="max-w-[350px] bg-blue-400 p-1 rounded-md">
                        {message.text}
                    </p>
                    <img
                        src={currentUser.profilepic || "../../IMG/profile.JPG"}
                        className="w-8 h-8 ml-1 rounded-full"
                        alt="Verified Badge"
                    />
                </div>
            ):(
                <div className="flex gap-2">
                    <img
                        src={selectedConversation.userProfilePic || "../../IMG/profile.JPG"}
                        className="w-8 h-8 ml-1 rounded-full"
                        alt="Verified Badge"
                    />
                    <p className="max-w-[350px] bg-gray-400 p-1 rounded-md">
                        {message.text}
                    </p>
                </div>
            )}
        </>
    );
};

export default Message;
