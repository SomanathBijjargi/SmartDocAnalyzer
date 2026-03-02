import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import protect from "../middleware/authMiddleware.js";
import Document from "../models/Document.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "../uploads");

// GET all user documents
router.get("/my", protect, async (req, res) => {
  try {
    const docs = await Document.find({ user: req.user }).sort({ uploadDate: -1 });
    res.json(docs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/stats/overview", protect, async (req, res) => {
  try {
    const docs = await Document.find({ user: req.user });

    const totalDocs = docs.length;
    const totalSummaries = docs.filter((d) => d.summary && d.summary.length > 0).length;
    const totalChats = docs.length; // temp

    res.json({
      totalDocs,
      totalSummaries,
      totalChats,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Stats error" });
  }
});

router.get("/:id/file", protect, async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, user: req.user });

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    const filePath = path.join(uploadsDir, doc.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Uploaded file not found on server" });
    }

    if (doc.mimetype) {
      res.type(doc.mimetype);
    }
    res.setHeader("Content-Disposition", "inline");
    return res.sendFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "File access error" });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, user: req.user });

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, user: req.user });

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    await doc.deleteOne();
    res.json({ message: "Document deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Delete error" });
  }
});

export default router;
