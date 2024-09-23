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
                const newConversationRes = await fetch(`${host}/api/messages/conversations`, {
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
