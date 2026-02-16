import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function MyDocuments() {
  const [docs, setDocs] = useState([]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this document?");
    if (!confirmDelete) return;

    try {
        await API.delete(`/docs/${id}`);

        // remove from UI instantly
        setDocs(docs.filter((doc) => doc._id !== id));

    } catch (err) {
        console.log(err);
        alert("Delete failed");
    }
  };


  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await API.get("/docs/my");
      setDocs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#f8fafc]">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          My Documents
        </h1>

        {/* DOCUMENT GRID */}
        <div className="grid grid-cols-3 gap-6">

          {docs.map((doc) => (
            <div key={doc._id} className="bg-white p-6 rounded-2xl shadow-md">

              <h2 className="font-semibold text-lg text-gray-800">
                {doc.originalname}
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                {new Date(doc.createdAt).toLocaleDateString()}
              </p>

              <p className="text-gray-600 mt-4 text-sm line-clamp-3">
                {doc.summary || "No summary yet"}
              </p>

              <div className="flex gap-3 mt-5">

                <button onClick={() => navigate(`/docs/${doc._id}`)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  View
                </button>

                <button onClick={() => navigate(`/chat/${doc._id}`)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">
                  Chat
                </button>

                <button onClick={() => handleDelete(doc._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm">
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default MyDocuments;
