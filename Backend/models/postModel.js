import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    userId: { // Reference to the user (alumni) who commented
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumni', // Referencing the Alumni model
        required: true
    },
    content: { // The comment content
        type: String,
        required: true
    },
    createdAt: { // Comment creation date
        type: Date,
        default: Date.now
    }
}, { _id: false });

const PostSchema = mongoose.Schema({
    authorId: { // Reference to the user (alumni) who made the post
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumni', // Referencing the Alumni model
        required: true
    },
    content: { // Main content of the post (text)
        type: String,
        required: true
    },
    media: { // Optional media (images, videos)
        type: [String], // Array of media URLs
        default: []
    },
    tags: { // Optional tags related to the post
        type: [String],
        default: []
    },
    likes: { // Alumni who liked the post
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' }],
        default: []
    },
    comments: { // Embedded array of comments
        type: [CommentSchema],
        default: []
    },
    createdAt: { // Post creation timestamp
        type: Date,
        default: Date.now
    },
    updatedAt: { // Post update timestamp (if any)
        type: Date
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
