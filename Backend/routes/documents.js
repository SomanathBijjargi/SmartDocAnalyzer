import express from "express";
import protect from "../middleware/authMiddleware.js";
import Document from "../models/Document.js";

const router = express.Router();

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

export default router;
