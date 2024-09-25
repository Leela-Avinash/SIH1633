import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getRecipientSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";
import Alumni from "../models/alumniModel.js";
import Student from "../models/studentModel.js";

const sendMessage = async (req, res) => {
    try {
        const { recipientId, message } = req.body;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recipientId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recipientId],
                lastMessage: {
                    text: message,
                    sender: senderId,
                },
            });
        } else {
            conversation.lastMessage = {
                text: message,
                sender: senderId,
            };
            await conversation.save();
        }
        const newMessage = await Message.create({
            conversationId: conversation._id,
            sender: senderId,
            text: message,
        });

        const recipientSocketId = getRecipientSocketId(recipientId);
        if (recipientSocketId) {
            console.log(recipientSocketId)
            io.to(recipientSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMessages = async (req, res) => {
    try {
        const { otherUserId } = req.params;
        const userId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [userId, otherUserId] },
        });

        if (!conversation) {
            return res.status(404).json({ error: "conversation not found" });
        }

        const messages = await Message.find({
            conversationId: conversation._id,
        }).sort({ createdAt: 1 });

        res.status(201).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getConversations = async (req, res) => {
    try {
        const userId = req.user._id;
        const conversations = await Conversation.find({ participants: userId }).sort({ updatedAt: 1 });

        const participantIds = new Set();
        conversations.forEach((conversation) => {
            conversation.participants.forEach((participantId) => participantIds.add(participantId.toString()));
        });

        const alumniParticipants = await Alumni.find({ _id: { $in: Array.from(participantIds) } }, "username profilepic");
        const studentParticipants = await Student.find({ _id: { $in: Array.from(participantIds) } }, "username profilepic");

        const allParticipants = [
            ...alumniParticipants.map((alumni) => ({
                _id: alumni._id,
                username: alumni.username,
                profilepic: alumni.profilepic,
                role: 'alumni'
            })),
            ...studentParticipants.map((student) => ({
                _id: student._id,
                username: student.username,
                profilepic: student.profilepic,
                role: 'student'
            }))
        ];

        const populatedConversations = conversations.map((conversation) => {
            const populatedParticipants = conversation.participants.map((participantId) =>
                allParticipants.find((participant) => participant && participant._id.toString() === participantId.toString())
            );
            return {
                ...conversation.toObject(), // Convert Mongoose document to plain object
                participants: populatedParticipants.filter(p => p) // Filter out undefined participants
            };
        });

        populatedConversations.forEach((conversation) => {
            conversation.participants = conversation.participants.filter(
                (participant) =>
                    participant && participant._id.toString() !== userId.toString() // Ensure participant is defined
            );
        });

        res.status(200).json(populatedConversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

export { sendMessage, getMessages, getConversations };
