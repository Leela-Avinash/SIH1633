import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            minLength: 8,
            required: true,
        },
        profilepic: {
            type: String,
            default: "",
        },
        followers: {
            type: [mongoose.Schema.ObjectId],
            ref: "User",
            default: [],
        },
        following: {
            type: [mongoose.Schema.ObjectId],
            ref: "User",
            default: [],
        },
        bio: {
            type: String,
            default: "",
        },
        date: {
            type: Date,
            default: Date.now,
        },
        verified: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
