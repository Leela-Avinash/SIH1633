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
        dispatch(
          updateConversation({
            _id: selectedConversation._id,
            messageText: data.text,
            sender: data.sender,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        <button className="text-gray-500 hover:text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
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
        <form className="flex w-full space-x-2 pr-5" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessagetext(e.target.value || "")} 
            className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 w-[80%]"
            placeholder="Sent a Message"
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
          <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600" onClick={handleSendMessage}>
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
        </form>
      </div>
    </div>
    // <form className="flex" onSubmit={handleSendMessage}>
    //     <div className="relative flex w-full">
    //         <input
    //             type="text"
    //             value={messageText} // Controlled input
    //             onChange={(e) => setMessagetext(e.target.value || "")} // Ensure value is always a string
    //             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    //             placeholder="Type a message"
    //         />
    //         <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleSendMessage}>
    //             <i className="fa fa-paper-plane" aria-hidden="true"></i>
    //         </div>
    //     </div>
    // </form>
  );
};

export default MessageInput;
