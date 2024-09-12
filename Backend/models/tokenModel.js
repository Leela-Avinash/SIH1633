import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
        unique: true
    },
    token : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        expires: 3600
    },
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;