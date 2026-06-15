import mongoose, { Schema } from "mongoose";

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
    }
});

const ThreadSchema = new Schema({
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
        type: String,
        default: Date.now
    },
    upodatedAt: {
        type: String,
        default: Date.now
    }
})

const Thread = mongoose.model("Thread", ThreadSchema)

export default Thread;