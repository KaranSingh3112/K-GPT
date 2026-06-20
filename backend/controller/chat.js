import Thread from "../models/thread.js";
import getGrokAiResponse from "../utils/grokai.js";

export const test = async(req,res) => {
    try {
        const thread = new Thread({
            threadId: "abcd1234679191",
            title: "testing done code",
        })
        let result = await thread.save();
        res.send(result);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to save in DB"})
    }
}

//get all threads
export const getThread = async(req,res) => {
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1})
        res.json(threads)
    } catch (err) {
        console.log("Something went wrong",err);
        res.status(500).json({error: "Failed to fetch threads"})
    }
}

//For single chat
export const getSingleThread = async(req,res) => {
    let {threadId} = req.params;
    try {
        const thread = await Thread.findOne({threadId});
        if(!thread){
            res.status(404).json({error: "Thread not found"})
        }
        res.json(thread.messages)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed to fetch thread"})
    }
}


//For delete chat
export const deleteThread = async(req,res) => {
    const {threadId} = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            res.status(404).json({error: "Thread not found"})
        }
        res.status(200).json({success: "Thread deleted successfully!!!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Failed to delete thread"})
    }
}


//For doing chat with AI
export const chat = async(req,res) => {
    const {threadId, message} = req.body;
    if(!threadId || !message){
        res.status(400).json({error: "Missing requires fields"})
    }
    try {
        let thread = await Thread.findOne({threadId})
        if(!thread){
            //Creating new thread
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role: "user", content: message}]
            })
        }else{
            thread.messages.push({role: "user", content: message})
        }
        const assistantReply = await getGrokAiResponse(message)
        thread.messages.push({role: "assistant", content: assistantReply})
        thread.updatedAt = new Date();

        await thread.save();
        res.json({reply: assistantReply})

    } catch (error) {
        console.log(error);
        res.status(500).json(error, "Something went wrong")
    }
}
