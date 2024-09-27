import React, { useState, useEffect } from "react";

const Chatbot = ({ isOpen, handleToggle }) => {
  const [messages, setMessages] = useState([
    { text: "Hey! 👋 I’m AlumniConnect Bot, an automated assistant. How can I help you today?", sender: "bot" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Typing status
  const [typingMessage, setTypingMessage] = useState(""); // Dynamic message for typing effect

  // Function to simulate typing effect
  const simulateTyping = (text) => {
    let index = 0;
    setTypingMessage(""); // Clear the typing message before starting

    const typingInterval = setInterval(() => {
      setTypingMessage((prev) => prev + text.charAt(index));
      index++;

      // Stop typing effect once the message is fully typed out
      if (index === text.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, { text, sender: "bot" }]); // Add the full message to the chat
          setTypingMessage(""); // Clear the typing effect message
          setIsTyping(false); // Stop typing status
        }, 500); // Small delay after typing finishes
      }
    }, 50); // Adjust this value to speed up or slow down the typing
  };

  // Function to handle user input
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessages = [...messages, { text: inputMessage, sender: "user" }];
      setMessages(newMessages);
      setInputMessage("");

      // Start typing effect
      setIsTyping(true);

      // Simulate delay before the bot starts typing
      setTimeout(() => {
        const botReply = "Hello! I can assist you with finding alumni, connecting with mentors, viewing events, updating your profile, and more. What would you like to do today?";
        simulateTyping(botReply);
      }, 1000); // Bot delay before starting to type
    }
  };

  return (
    <div
      className={`fixed bottom-36 left-10 bg-white border border-gray-300 rounded-lg shadow-lg transition-all transform ${
        isOpen ? "block" : "hidden"
      }`}
      style={{ width: "300px", height: "400px", zIndex: 50 }}
    >
      {/* Chatbot Header */}
      <div className="bg-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3>Need Help? Chat with Us!</h3>
        <button className="text-xl text-gray-500" onClick={handleToggle}>
          x
        </button>
      </div>

      {/* Chat Messages */}
      <div className="p-4 bg-gray-100 h-80 overflow-y-auto flex flex-col space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 text-xs rounded-lg max-w-full break-words ${
              message.sender === "bot"
                ? "bg-gray-200 text-left self-start"
                : "bg-blue-500 text-white text-right self-end"
            }`}
          >
            {message.text}
          </div>
        ))}

        {/* Typing Effect */}
        {isTyping && (
          <div className="p-3 text-xs rounded-lg max-w-full break-words bg-gray-200 text-left self-start">
            {typingMessage || "Processing your Request..."} {/* Show dynamic typing effect */}
          </div>
        )}
      </div>

      {/* Message Input Box */}
      <form onSubmit={handleSendMessage} className="p-4 flex items-center bg-gray-200 rounded-b-lg">
        <input
          type="text"
          className="flex-grow p-2 text-xs rounded-lg border border-gray-300 focus:outline-none"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-xs text-white ml-2 px-[9px] py-[7px] rounded-md focus:outline-none hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
