import React, { useEffect, useState } from "react";
import Conversations from "../components/Conversations.jsx";
import MessageContainer from "../components/MessageContainer.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedConversation } from "../redux/slices/setConversationSlice"; 
import { setConversations } from "../redux/slices/conversationSlice.js";
import { useSocket } from "../context/SocketContext.jsx";

const ChatPage = () => {
    const host = "http://localhost:5000"; 
    const [loadingConversations, setLoadingConversations] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const conversations = useSelector((state) => state.conversations);
    const selectedConversation = useSelector((state) => state.selectedConversation);
    const [searchText, setSearchText] = useState("");
    const [searchingUser, setSearchingUser] = useState(false);
    const currentUser = useSelector((state) => state.user);
    const {socket, onlineUsers} = useSocket();

    const handleConversationSearch = async (e) => {
        e.preventDefault();
        if (!searchText.trim()) {
            setError("Please enter a username or email to search.");
            return;
        }

        setSearchingUser(true);
        setError(null); 
        try {
            const res = await fetch(`${host}/api/users/profile/${searchText.trim()}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const searchedUser = await res.json(); 

            if (!res.ok) {
                const message = searchedUser.message || "Failed to search user.";
                setError(message);
                return;
            }
            console.log(searchedUser)
            console.log(currentUser)
            if (searchedUser.user.id === currentUser._id) {
                setError("You cannot message yourself.");
                return;
            }

            const existingConversation = conversations.find(conversation => 
                conversation.participants.some(participant => participant._id === searchedUser.user.id)
            );

            if (existingConversation) {
                dispatch(setSelectedConversation({
                    _id: existingConversation._id,
                    userId: searchedUser.user.id,
                    userProfilePic: searchedUser.user.profilepic || '../../IMG/landing.png',
                    username: searchedUser.user.username || 'Unknown User'
                }));
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
                setError("Conversation does not exist. Optionally, you can create a new conversation.");
            }
            setSearchText("")
        } catch (error) {
            console.log(error);
            setError("An error occurred while searching for the user.");
        } finally {
            setSearchingUser(false);
        }
    }

    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await fetch(
                    `${host}/api/messages/conversations`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );
                const data = await response.json();
                if (!response.ok) {
                    const message = data.message || "Failed to fetch conversations.";
                    console.log(message);
                    setError(message);
                    setLoadingConversations(false);
                    return;
                }
                console.log('Fetched Conversations:', data);
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

    return (
        <div className="flex justify-center w-screen">
            <div className="flex flex-col md:flex-row w-full md:w-[750px]">
                <div className="flex flex-col gap-4 w-full md:w-[30%]">
                    <div className="flex flex-col gap-2 w-full">
                        <p className="font-bold">Your Conversations</p>
                        <form className="flex gap-3 items-center" onSubmit={handleConversationSearch}>
                            <input
                                className="flex-1 p-2 border border-gray-300 rounded"
                                type="text"
                                placeholder="Search for a user"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button type="submit" disabled={searchingUser} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                {searchingUser ? (
                                    <i className="fa-solid fa-spinner fa-spin"></i>
                                ) : (
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                )}
                            </button>
                        </form>

                        {/* Skeleton loading */}
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

                        {/* Conversations */}
                        {!loadingConversations && conversations.length > 0 && (
                            conversations.map(conversation => (
                                <Conversations key={conversation._id} conversation={conversation} isOnline={onlineUsers.includes(conversation.participants[0]?._id)}/>
                            ))
                        )}
                    </div>
                </div>
                {!selectedConversation._id && (
                    <div className="flex rounded-md p-2 flex-col items-center justify-center h-[400px]">
                        <p>Select a Conversation to start messaging</p>
                    </div>
                )}
                {selectedConversation._id  && <MessageContainer />}
            </div>
        </div>
    );
};

export default ChatPage;

{selectedConversation._id ? (
    <>
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-3"
            src={
              selectedConversation.userProfilePic || "/default-avatar.png"
            }
            alt={selectedConversation.username}
          />
          <div>
            <h2 className="font-semibold text-gray-800">
              {selectedConversation.username}
            </h2>
            <p className="text-xs text-gray-500">
              {onlineUsers.includes(selectedConversation.userId)
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {/* Example messages - replace with actual messages from your state */}
        <div className="flex justify-start">
          <div className="bg-white rounded-lg p-3 max-w-xs lg:max-w-md">
            <p className="text-gray-800">
              Hi David, have you got the project report pdf?
            </p>
            <p className="text-xs text-gray-500 mt-1">10:15 AM</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs lg:max-w-md">
            <p>NO, I did not get it</p>
            <p className="text-xs text-blue-100 mt-1">10:16 AM</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-white rounded-lg p-3 max-w-xs lg:max-w-md">
            <p className="text-gray-800">
              Ok, I will just sent it here. Plz be sure to fill the
              details by today end of the day.
            </p>
            <p className="text-xs text-gray-500 mt-1">10:17 AM</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-white rounded-lg p-3 max-w-xs lg:max-w-md">
            <p className="text-blue-500 underline">project_report.pdf</p>
            <p className="text-xs text-gray-500 mt-1">10:17 AM</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs lg:max-w-md">
            <p>
              Ok. Should I sent it over email as well after filling the
              details.
            </p>
            <p className="text-xs text-blue-100 mt-1">10:18 AM</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-white rounded-lg p-3 max-w-xs lg:max-w-md">
            <p className="text-gray-800">
              Ya. I'll be adding more team members to it.
            </p>
            <p className="text-xs text-gray-500 mt-1">10:19 AM</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs lg:max-w-md">
            <p>OK</p>
            <p className="text-xs text-blue-100 mt-1">10:20 AM</p>
          </div>
        </div>
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Write Something..."
          />
          <button className="text-gray-500 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="flex-1 flex items-center justify-center bg-gray-100">
      <p className="text-gray-500">
        Select a conversation to start messaging
      </p>
    </div>
  )}