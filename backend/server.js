
import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import chatRoute from "./routes/chat.js"
import authRoute from "./routes/authRoutes.js"

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api", chatRoute)
app.use("/api", authRoute)

const port = process.env.PORT ||  8080;
app.listen(port, () => {
  console.log("App listens on port 8080");
  connectDB();
});

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Database Connected!");
  } catch (err) {
    console.log("Failed to connect with database",err);
  }
}

app.get("/", (req, res) => {
    res.send("K-GPT Backend Running");
});