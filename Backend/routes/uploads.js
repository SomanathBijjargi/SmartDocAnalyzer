import express from "express";
import multer from "multer";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });


// upload route (protected)
router.post("/", protect, upload.single("document"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    file: req.file.filename
  });
});

export default router;
