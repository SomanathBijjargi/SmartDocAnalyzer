import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/uploads.js";
import docRoutes from "./routes/documents.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Document Analyzer API running");
});

app.use("/api/auth", authRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/docs", docRoutes);

app.use("/api/chat", chatRoutes);

app.listen(5000, () => {
  console.log("Server running on port http://localhost:5000");
});
