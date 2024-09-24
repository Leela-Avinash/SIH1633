import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message, ownMessage }) => {
  const selectedConversation = useSelector(
    (state) => state.selectedConversation
  );
  const currentUser = useSelector((state) => state.user);
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
      {ownMessage ? (
        // <div className="flex gap-2 self-end">
        //     <p className="max-w-[350px] bg-blue-400 p-1 rounded-md">
        //         {message.text}
        //     </p>
        //     <img
        //         src={currentUser.profilepic || "../../IMG/profile.JPG"}
        //         className="w-8 h-8 ml-1 rounded-full"
        //         alt="Verified Badge"
        //     />
        // </div>
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs lg:max-w-md">
            <p>{message.text}t</p>
          </div>
        </div>
      ) : (
        // <div className="flex gap-2">
        //   <img
        //     src={selectedConversation.userProfilePic || "../../IMG/profile.JPG"}
        //     className="w-8 h-8 ml-1 rounded-full"
        //     alt="Verified Badge"
        //   />
        //   <p className="max-w-[350px] bg-gray-400 p-1 rounded-md">
        //     {message.text}
        //   </p>
        // </div>
        <div className="flex justify-start">
          <div className="bg-white rounded-lg p-3 max-w-xs lg:max-w-md">
            <p className="text-gray-800">
              {message.text}
            </p>
            {/* <p className="text-xs text-gray-500 mt-1">10:15 AM</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
