// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const user = useSelector((state) => state.user);
    const SOCKET_SERVER_URL = "http://localhost:5000";
    const [onlineUsers, setOnlineUsers] = useState([]);
    
    useEffect(() => {
        if (user?._id) {
            const newSocket = io(SOCKET_SERVER_URL, {
                query: {
                    userId: user._id
                },
                withCredentials: true, 
            });

            newSocket.on("connect", () => {
                console.log("Connected to socket server with ID:", newSocket.id);
            });

            newSocket.on("connect_error", (err) => {
                console.error("Socket connection error:", err);
            });

            newSocket.on("getOnlineUsers", (users) => {
                console.log("Received online users:", users);
                setOnlineUsers(users);
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, [user?._id, SOCKET_SERVER_URL]);

    console.log("Online Users:", onlineUsers);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
    