import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedConversation } from "../redux/slices/setConversationSlice";

const Conversations = ({ conversation, isOnline }) => {
  const currentUser = useSelector((state) => state.user);
  const lastMessage = conversation.lastMessage || {};
  console.log(conversation.participants);
  const selectedConversation = useSelector(
    (state) => state.selectedConversation
  );

  const user = conversation.participants[0] || {
    _id: "",
    username: "Unknown User",
    profilepic: "../../userlogo.jpeg",
  };

  const dispatch = useDispatch();

  return (
    <div
      className={`flex items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
        selectedConversation._id === conversation._id ? "bg-blue-50" : ""
      }`}
      onClick={() =>
        dispatch(
          setSelectedConversation({
            _id: conversation._id,
            userId: user._id,
            userProfilePic: user.profilepic,
            username: user.username,
          })
        )
      }
    >
      <div className="relative">
        <img
          className="w-12 h-12 rounded-full mr-3"
          src={user.profilepic || "../../userlogo.jpeg"}
          alt="Avatar"
        />
        {isOnline ? (
          // <div className="relative">
          //     <span className="absolute right-1.5 -bottom-6 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
          // </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        ) : (
          ""
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold text-gray-800 truncate">
            {user.username}
          </h3>
          {/* <img
            src="../../IMG/istockphoto-1396933001-612x612.png"
            className="w-5 h-5 ml-1"
            alt="Verified Badge"
          /> */}
        </div>
          {currentUser._id === lastMessage?.sender ? (
            <p className="text-sm text-gray-600 truncate">Message sent</p>
          ) : lastMessage.text?.length > 18 ? (
            <p className="text-sm text-gray-600 truncate">{`${lastMessage.text.substring(0, 18)}...`}</p>
          ) : (
            <p className="text-sm text-gray-600 truncate">{lastMessage.text || "No message"}</p>
          )}
      </div>
    </div>
  );
};

export default Conversations;
