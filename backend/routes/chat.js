import express from "express";
import { Router } from "express";
import { chat, deleteThread, getSingleThread, getThread } from "../controller/chat.js";
import { verifyToken } from "../middleware/authMiddleWare.js";

const router = express.Router()

router.get("/thread", verifyToken, getThread)

router.post("/chat", verifyToken, chat)

router.route("/thread/:threadId")
    .get(verifyToken, getSingleThread)
    .delete(verifyToken, deleteThread)


export default router;