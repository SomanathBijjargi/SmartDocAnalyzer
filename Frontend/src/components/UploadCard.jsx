import { useState } from "react";
import API from "../services/api";

function UploadCard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select file first");

    const formData = new FormData();
    formData.append("document", file);

    try {
      setLoading(true);

      const res = await API.post("/upload", formData);

      setSummary(res.data.summary);
      alert("AI Analysis completed 🚀");

    } catch (err) {
      console.log(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Upload New Document
          </h2>
          <p className="text-gray-500 text-sm">
            Supports PDF, images & handwritten notes
          </p>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="p-3 border rounded-lg bg-gray-50"
          />

          <button
            onClick={handleUpload}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md"
          >
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>
        </div>

      </div>

      {/* SUMMARY RESULT */}
      {summary && (
        <div className="mt-6 bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-2">
            AI Summary:
          </h3>
          <p className="text-gray-600">{summary}</p>
        </div>
      )}
    </div>
  );
}

export default UploadCard;
