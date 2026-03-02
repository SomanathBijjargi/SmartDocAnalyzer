import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const getPreviewType = (mimeType = "", filename = "") => {
  const normalizedMime = mimeType.toLowerCase();
  const normalizedName = filename.toLowerCase();

  if (normalizedMime.startsWith("image/")) return "image";
  if (normalizedMime.includes("pdf")) return "pdf";
  if (/\.(png|jpg|jpeg|gif|bmp|webp|svg)$/.test(normalizedName)) return "image";
  if (normalizedName.endsWith(".pdf")) return "pdf";
  return "other";
};

function ViewDocument() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [previewType, setPreviewType] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await API.get(`/docs/${id}`);
        setDoc(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDoc();
  }, [id]);

  useEffect(() => {
    setPreviewVisible(false);
    setPreviewType("");
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl("");
    }
  }, [id]);

  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const handlePreviewClick = async () => {
    if (previewVisible) {
      setPreviewVisible(false);
      return;
    }

    if (fileUrl) {
      setPreviewVisible(true);
      return;
    }

    try {
      setPreviewLoading(true);
      const res = await API.get(`/docs/${id}/file`, { responseType: "blob" });
      const blobUrl = URL.createObjectURL(res.data);
      setFileUrl(blobUrl);

      const contentType =
        res.headers["content-type"] || res.data.type || doc?.mimetype || "";
      setPreviewType(getPreviewType(contentType, doc?.originalname || ""));
      setPreviewVisible(true);
    } catch (err) {
      console.log(err);
      alert("Could not load the uploaded document.");
    } finally {
      setPreviewLoading(false);
    }
  };

  if (!doc) return <p className="p-10 text-gray-800 dark:text-gray-100">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#f8fafc] dark:from-gray-950 dark:to-gray-900 transition-colors">
      <Sidebar />

      <div className="flex-1 p-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {doc.originalname}
          </h1>

          <button
            onClick={handlePreviewClick}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            {previewLoading
              ? "Loading..."
              : previewVisible
                ? "Hide Uploaded Document"
                : "Show Uploaded Document"}
          </button>
        </div>

        {previewVisible && fileUrl && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                Uploaded Document Preview
              </h2>
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Open in new tab
              </a>
            </div>

            {previewType === "image" && (
              <img
                src={fileUrl}
                alt={doc.originalname}
                className="max-h-[75vh] w-auto rounded-lg border border-gray-200 dark:border-gray-700"
              />
            )}

            {previewType === "pdf" && (
              <iframe
                src={fileUrl}
                title="Uploaded PDF preview"
                className="w-full h-[75vh] rounded-lg border border-gray-200 dark:border-gray-700"
              />
            )}

            {previewType === "other" && (
              <p className="text-gray-700 dark:text-gray-200">
                Preview is not supported for this file type. Use "Open in new tab" to view or
                download it.
              </p>
            )}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">AI Summary</h2>
          <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
            {doc.summary || "No summary"}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-green-600">Extracted Text</h2>
          <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
            {doc.extractedText || "No text"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewDocument;
