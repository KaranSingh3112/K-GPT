
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

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected!");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.log("Failed to connect with database", err);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
    res.send("Updated, Your backend is running now!!");
});