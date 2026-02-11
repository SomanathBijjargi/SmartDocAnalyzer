import express from "express";
import protect from "../middleware/authMiddleware.js";
import Document from "../models/Document.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// CHAT WITH DOCUMENT
router.post("/:docId", protect, async (req, res) => {
  try {
    const { question } = req.body;
    const { docId } = req.params;

    // get document
    const doc = await Document.findById(docId);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are an AI document assistant.

DOCUMENT CONTENT:
${doc.extractedText}

USER QUESTION:
${question}

Answer clearly based only on the document.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    res.json({
      question,
      answer
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Chat error" });
  }
});

export default router;
