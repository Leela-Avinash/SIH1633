import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateConversation } from "../redux/slices/conversationSlice";

const MessageInput = ({ setMessages }) => {
    const [messageText, setMessagetext] = useState(""); 
    const host = "http://localhost:5000";
    const selectedConversation = useSelector(
        (state) => state.selectedConversation
    );
    const dispatch = useDispatch(); 

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageText) return; 
        
        try {
            const res = await fetch(`${host}/api/messages/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: messageText,
                    recipientId: selectedConversation.userId,
                }),
                credentials: "include",
            });
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
                setMessagetext("");
                if (setMessages) {
                    setMessages((prevMessages) => [...prevMessages, data]);
                }
                dispatch(updateConversation({
                    _id: selectedConversation._id, 
                    messageText: data.text, 
                    sender: data.sender,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="flex" onSubmit={handleSendMessage}>
            <div className="relative flex w-full">
                <input
                    type="text"
                    value={messageText} // Controlled input
                    onChange={(e) => setMessagetext(e.target.value || "")} // Ensure value is always a string
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Type a message"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleSendMessage}>
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </div>
            </div>
        </form>
    );
};

export default MessageInput;
