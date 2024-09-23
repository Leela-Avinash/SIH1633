import React, { useEffect, useState } from "react";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setConversations, updateConversation } from "../redux/slices/conversationSlice.js";
import { useSocket } from "../context/SocketContext.jsx";

const MessageContainer = () => {
    const host = "http://localhost:5000";
    const selectedConversation = useSelector(
        (state) => state.selectedConversation
    );
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [messages, setMessages] = useState([])    
    const currentUser = useSelector((state) => state.user);
    const { socket }= useSocket()
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on("newMessage", (message) => {
            console.log("Received new message:", message);
            setMessages((prevMessages) => [...prevMessages, message]);
            dispatch(updateConversation({
                _id: selectedConversation._id,
                messageText: message.text,
                sender: message.sender
            }));
        });

        return () => socket.off("newMessage");
    }, [socket, dispatch, selectedConversation._id]);

    useEffect(() => {
        const getMessages = async () => {
            setLoadingMessages(true);
            setMessages([]);
            try {
                const response = await fetch(
                    `${host}/api/messages/${selectedConversation.userId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );
                const data = await response.json();
                if (data.error) {
                    console.log(data.error);
                } else {
                    setMessages(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingMessages(false);
            }
        };
        getMessages();
    }, [selectedConversation, host]);

    return (
        <div className="flex w-[70%] bg-100 rounded-md flex-col md:ml-4">
            <div className="flex w-full h-22 items-center gap-2 mt-2 mb-2">
                <img
                    className="w-8 h-8 md:w-12 md:h-12 rounded-full"
                    src={selectedConversation.userProfilePic || "../../IMG/profile.JPG"}
                    alt="Avatar"
                />
                <p className="flex items-center">
                    {selectedConversation.username}
                    <img
                        src="../../IMG/istockphoto-1396933001-612x612.png"
                        className="w-5 h-5 ml-1"
                        alt="Verified Badge"
                    />
                </p>
            </div>
            <hr />
            <div className="flex flex-col gap-4 my-4 h-[400px] overflow-y-auto p-2">
                {loadingMessages &&
                    [0, 1, 2, 3, 4].map((_, i) => (
                        <div
                            className="flex gap-2 items-center p-1 rounded-md"
                            key={i}
                            style={{
                                alignSelf:
                                    i % 2 === 0 ? "flex-start" : "flex-end",
                            }}
                        >
                            {i % 2 === 0 && (
                                <div className="w-7 h-7 rounded-full bg-gray-300 animate-pulse"></div>
                            )}
                            <div className="flex flex-col space-y-2">
                                <div className="w-[250px] h-2 bg-gray-300 rounded animate-pulse"></div>
                                <div className="w-[250px] h-2 bg-gray-300 rounded animate-pulse"></div>
                                <div className="w-[250px] h-2 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            {i % 2 !== 0 && (
                                <div className="w-7 h-7 rounded-full bg-gray-300 animate-pulse"></div>
                            )}
                        </div>
                    ))}
                {!loadingMessages && (
                    messages.map((message) => (
                        <Message key={message._id} message={message} ownMessage={currentUser._id === message.sender}/>
                    ))
                )}
            </div>
            <MessageInput setMessages={setMessages}/>
        </div>
    );
};

export default MessageContainer;
