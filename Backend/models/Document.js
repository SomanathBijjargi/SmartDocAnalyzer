import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  filename: {
    type: String,
    required: true
  },

  originalname: {
    type: String
  },

  mimetype: {
    type: String,
    default: ""
  },

  uploadDate: {
    type: Date,
    default: Date.now
  },

  extractedText: {
    type: String,
    default: ""
  },
  
  summary: {
  type: String,
  default: ""
}
});

const Document = mongoose.model("Document", documentSchema);
export default Document;
