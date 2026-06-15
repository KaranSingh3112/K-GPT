import express from "express";
import { Router } from "express";
import { chat, deleteThread, getSingleThread, getThread, test } from "../controller/chat.js";

 
const router = express.Router()

router.post("/test", test)

router.get("/thread", getThread)

router.post("/chat", chat)

router.route("/thread/:threadId")
    .get(getSingleThread)
    .delete(deleteThread)


export default router;