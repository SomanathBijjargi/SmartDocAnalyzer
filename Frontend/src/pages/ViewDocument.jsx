import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function ViewDocument() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    fetchDoc();
  }, []);

  const fetchDoc = async () => {
    try {
      const res = await API.get(`/docs/${id}`);
      setDoc(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!doc) return <p className="p-10">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#f8fafc]">
      
      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {doc.originalname}
        </h1>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            AI Summary
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {doc.summary || "No summary"}
          </p>
        </div>

        {/* EXTRACTED TEXT */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-green-600">
            Extracted Text
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {doc.extractedText || "No text"}
          </p>
        </div>

      </div>
    </div>
  );
}

export default ViewDocument;
