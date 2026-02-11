import express from "express";
import multer from "multer";
import protect from "../middleware/authMiddleware.js";
import Document from "../models/Document.js";
import { exec } from "child_process";
import path from "path";
import { generateSummary } from "../utils/gemini.js";

const pythonPath = `"../.venv/Scripts/python.exe"`;
const scriptPath = `"../ai_engine/ocr_runner.py"`;

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
    const filePath = path.join("uploads", req.file.filename);

    // Call Python OCR script
    exec(
      `${pythonPath} ${scriptPath} "${filePath}"`,
      async (error, stdout, stderr) => {
        if (error) {
          console.error("OCR ERROR:", error);
          return res.status(500).json({
            message: "File uploaded but OCR failed"
          });
        }

        const extractedText = stdout;
        const summary = await generateSummary(extractedText);
        // Save document with OCR text
        const newDoc = new Document({
          user: req.user,
          filename: req.file.filename,
          originalname: req.file.originalname,
          extractedText: extractedText,
          summary: summary
        });

        await newDoc.save();

        res.json({
          message: "File uploaded, OCR completed & saved to DB",
          extractedText,
          summary:summary,
        });
      }
    );
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: "Upload error" });
  }
});

export default router;
