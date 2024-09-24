import React, { useEffect, useState } from "react";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  setConversations,
  updateConversation,
} from "../redux/slices/conversationSlice.js";
import { useSocket } from "../context/SocketContext.jsx";

const MessageContainer = () => {
  const host = "http://localhost:5000";
  const selectedConversation = useSelector(
    (state) => state.selectedConversation
  );
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const { socket, onlineUsers } = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("newMessage", (message) => {
      console.log("Received new message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
      dispatch(
        updateConversation({
          _id: selectedConversation._id,
          messageText: message.text,
          sender: message.sender,
        })
      );
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
    <>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-3"
            src={selectedConversation.userProfilePic || "../../IMG/profile.JPG"}
            alt={selectedConversation.username}
          />
          <div>
            <h2 className="font-semibold text-gray-800">
              {selectedConversation.username}
              {/* <img
                src="../../IMG/istockphoto-1396933001-612x612.png"
                className="w-5 h-5 ml-1"
                alt="Verified Badge"
              /> */}
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
      {/* <hr /> */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {loadingMessages &&
          [0, 1, 2, 3, 4].map((_, i) => (
            <div
              className="flex gap-2 items-center p-1 rounded-md"
              key={i}
              style={{
                alignSelf: i % 2 === 0 ? "flex-start" : "flex-end",
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
        {!loadingMessages &&
          messages.map((message) => (
            <Message
              key={message._id}
              message={message}
              ownMessage={currentUser._id === message.sender}
            />
          ))}         
      </div>
      <MessageInput setMessages={setMessages} />
    </>
  );
};

export default MessageContainer;
