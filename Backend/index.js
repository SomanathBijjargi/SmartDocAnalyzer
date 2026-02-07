import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/uploads.js";

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

app.listen(5000, () => {
  console.log("Server running on port http://localhost:5000");
});
