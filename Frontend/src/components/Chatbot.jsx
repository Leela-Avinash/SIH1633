import React, { useState } from "react";

const Chatbot = ({ isOpen, handleToggle }) => {
  // State to manage messages
  const [messages, setMessages] = useState([
    { text: "Hey! 👋 I’m AlumniConnect Bot, an automated assistant. How can I help you today?", sender: "bot" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // Function to handle user input
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessages = [
        ...messages,
        { text: inputMessage, sender: "user" }, // Add user message
        { text: "Thank you for your query. Our team will get back to you shortly.", sender: "bot" }, // Simulated bot response
      ];
      setMessages(newMessages);
      setInputMessage("");
    }
  };

  return (
    <div
      className={`fixed bottom-28 left-10 bg-white border border-gray-300 rounded-lg shadow-lg transition-all transform ${
        isOpen ? "block" : "hidden"
      }`}
      style={{ width: "350px", height: "451px", zIndex: 50 }}
    >
      {/* Chatbot Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3>Connective Support</h3>
        <button onClick={handleToggle}>✖</button>
      </div>

      {/* Chat Messages */}
      <div className="p-4 bg-gray-100 h-80 overflow-y-auto flex flex-col space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-full break-words ${
              message.sender === "bot"
                ? "bg-gray-200 text-left self-start"
                : "bg-blue-500 text-white text-right self-end"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Message Input Box */}
      <form onSubmit={handleSendMessage} className="p-4 flex items-center bg-gray-200 rounded-b-lg">
        <input
          type="text"
          className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-custom1 text-white ml-2 p-2 rounded-lg focus:outline-none hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
