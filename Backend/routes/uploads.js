import express from "express";
import multer from "multer";
import protect from "../middleware/authMiddleware.js";
import Document from "../models/Document.js";
import { generateSummary } from "../utils/gemini.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";


const router = express.Router();

// =========================
// Multer storage config
// =========================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// =========================
// POST: Upload + OCR + Save
// =========================
router.post("/", protect, upload.single("document"), async (req, res) => {
  try {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(req.file.path));

  const ocrResponse = await axios.post(
    process.env.OCR_API_URL,
    formData,
    {
      headers: formData.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    }
  );

  const extractedText = ocrResponse.data.extracted_text;

  const summary = await generateSummary(extractedText);

  const newDoc = new Document({
    user: req.user,
    filename: req.file.filename,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    extractedText,
    summary
  });

  await newDoc.save();

  res.json({
    message: "File uploaded, OCR completed & saved to DB",
    extractedText,
    summary
  });

} catch (error) {
  console.error("OCR API ERROR:", error.message);
  res.status(500).json({ message: "OCR service failed" });
}
});

export default router;
