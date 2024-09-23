import { timeStamp } from "console";
import mongoose, { mongo } from "mongoose";
import { type } from "os";

const messageSchema = mongoose.Schema({
    conversationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    // senderType: {
    //     type: String,
    //     enum: ['Alumni', 'Student'],
    //     required: true,
    // },
    text:{
        type: String,
    }
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;