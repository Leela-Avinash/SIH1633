// socket.js
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

export const getRecipientSocketId = (recipientId) => {
    return userSocketMap[recipientId]
}

const userSocketMap = {};

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("user connected", socket.id, "with userId:", userId);

    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        // Remove the user from the map upon disconnection
        for (const [key, value] of Object.entries(userSocketMap)) {
            if (value === socket.id) {
                delete userSocketMap[key];
                break;
            }
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, server, app };
