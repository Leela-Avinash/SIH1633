import React, { useEffect, useState } from "react";
import Conversations from "../components/Conversations.jsx";
import MessageContainer from "../components/MessageContainer.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedConversation } from "../redux/slices/setConversationSlice";
import { setConversations } from "../redux/slices/conversationSlice.js";
import { useSocket } from "../context/SocketContext.jsx";
import Navbar from "../components/navBar.jsx";

const ChatPage = () => {
  const host = "http://localhost:5000";
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversations);
  const selectedConversation = useSelector(
    (state) => state.selectedConversation
  );
  const [searchText, setSearchText] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const currentUser = useSelector((state) => state.user);
  const { socket, onlineUsers } = useSocket();
  // const host = "http://localhost:5000";
  //   const dispatch = useDispatch();
  //   const conversations = useSelector((state) => state.conversations);
  //   const selectedConversation = useSelector((state) => state.selectedConversation);
  //   const [searchText, setSearchText] = useState('');
  const [message, setMessage] = useState("");
  //   const { onlineUsers } = useSocket();
  //   const currentUser = useSelector((state) => state.user);

  // ... existing useEffect and other functions from the backend code ...
  const handleConversationSearch = async (e) => {
    e.preventDefault();
    if (!searchText.trim()) {
      setError("Please enter a username or email to search.");
      return;
    }

    setSearchingUser(true);
    setError(null);
    try {
      const res = await fetch(
        `${host}/api/users/profile/${searchText.trim()}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const searchedUser = await res.json();

      if (!res.ok) {
        const message = searchedUser.message || "Failed to search user.";
        setError(message);
        return;
      }
      console.log(searchedUser);
      console.log(currentUser);
      if (searchedUser.user.id === currentUser._id) {
        setError("You cannot message yourself.");
        return;
      }

      const existingConversation = conversations.find((conversation) =>
        conversation.participants.some(
          (participant) => participant._id === searchedUser.user.id
        )
      );

      if (existingConversation) {
        dispatch(
          setSelectedConversation({
            _id: existingConversation._id,
            userId: searchedUser.user.id,
            userProfilePic:
              searchedUser.user.profilepic || "../../IMG/landing.png",
            username: searchedUser.user.username || "Unknown User",
          })
        );
      } else {
        // Optionally, handle creating a new conversation if it doesn't exist
        // For example:
        /*
            const newConversationRes = await fetch(${host}/api/messages/conversations, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ participantId: searchedUser._id }),
            });
            const newConversation = await newConversationRes.json();
            if (newConversation._id) {
                dispatch(setConversations([...conversations, newConversation]));
                dispatch(setSelectedConversation({
                    _id: newConversation._id,
                    userId: searchedUser._id,
                    userProfilePic: searchedUser.profilepic || '../../IMG/landing.png',
                    username: searchedUser.username || 'Unknown User'
                }));
            } else {
                setError(newConversation.message || "Failed to create a new conversation.");
            }
            */
        setError(
          "Conversation does not exist. Optionally, you can create a new conversation."
        );
      }
      setSearchText("");
    } catch (error) {
      console.log(error);
      setError("An error occurred while searching for the user.");
    } finally {
      setSearchingUser(false);
    }
  };

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(`${host}/api/messages/conversations`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        console.log(response)
        const data = await response.json();
        console.log(data)
        if (!response.ok) {
          const message = data.message || "Failed to fetch conversations.";
          console.log(message);
          setError(message);
          setLoadingConversations(false);
          return;
        }
        console.log("Fetched Conversations:", data);
        if (Array.isArray(data)) {
          dispatch(setConversations(data));
        } else {
          console.error("Expected data to be an array");
          setError("Unexpected data format");
        }
      } catch (error) {
        console.log(error);
        setError("Failed to load conversations");
      } finally {
        setLoadingConversations(false);
      }
    };
    getConversations();
  }, [dispatch, host]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Current user profile */}
        <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
          <img
            src={currentUser.profilepic || "/default-avatar.png"}
            alt={currentUser.username}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-gray-800">
              {currentUser.username}
            </h2>
            <p className="text-sm text-gray-500">
              {currentUser.title || "User"}
            </p>
          </div>
          <button className="ml-auto text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>

        {/* Search input */}
        <div className="p-4">
          <div className="relative">
            <form onSubmit={handleConversationSearch}>
              <input
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text"
                placeholder="Search Here..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button type="submit" disabled={searchingUser}>
                {searchingUser ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 absolute left-3 top-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>

        {loadingConversations &&
          [0, 1, 2, 3, 4].map((_, i) => (
            <div
              className="flex items-center p-2 rounded-md"
              key={`skeleton-${i}`}
            >
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-gray-300 w-12 h-12 animate-pulse"></div>

                {/* Rectangle Skeletons */}
                <div className="w-full flex flex-col gap-1">
                  <div
                    className="bg-gray-300 animate-pulse"
                    style={{
                      width: "120px",
                      height: "12px",
                    }}
                  ></div>
                  <div
                    className="bg-gray-300 animate-pulse"
                    style={{
                      width: "80%",
                      height: "8px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}

        {/* Error handling */}
        {error && <p className="text-red-500">{error}</p>}

        {/* No conversations message */}
        {!loadingConversations && conversations.length === 0 && !error && (
          <p className="text-gray-500">No conversations found</p>
        )}

        <div className="flex-1 overflow-y-auto">
          {!loadingConversations &&
            conversations.length > 0 &&
            conversations.map((conversation) => (
              <Conversations
                key={conversation._id}
                conversation={conversation}
                isOnline={onlineUsers.includes(
                  conversation.participants[0]?._id
                )}
              />
            ))}
        </div>

        {/* Conversations list
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => {
            const participant = conversation.participants.find(
              (p) => p._id !== currentUser._id
            );
            return (
              <div
                key={conversation._id}
                className={`flex items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation._id === conversation._id
                    ? "bg-blue-50"
                    : ""
                }`}
                onClick={() =>
                  dispatch(
                    setSelectedConversation({
                      _id: conversation._id,
                      userId: participant._id,
                      userProfilePic: participant.profilepic,
                      username: participant.username,
                    })
                  )
                }
              >
                <div className="relative">
                  <img
                    src={participant.profilepic || "/default-avatar.png"}
                    alt={participant.username}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  {onlineUsers.includes(participant._id) && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {participant.username}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(conversation.lastMessage?.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage?.content}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="ml-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            );
          })} */}
      </div>

      {/* Right chat area */}
      <div className="flex-1 flex flex-col bg-white">
        {!selectedConversation._id && (
          <div className="flex rounded-md p-2 flex-col items-center justify-center h-[400px]">
            <p>Select a Conversation to start messaging</p>
          </div>
        )}
        {selectedConversation._id && <MessageContainer />}
        
      </div>
    </div>
  );
};

export default ChatPage;
