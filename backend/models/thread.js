import mongoose, { Schema } from "mongoose";
import User from "./user.js"

const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true,
    } ,
    timestamp: {
        type: Date,
        default: Date.now()
    },
});

const ThreadSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    threadId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        default: "New Chat",
    },
    messages: [messageSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Thread = mongoose.model("Thread", ThreadSchema)

export default Thread;