import { useParams } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function ChatPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const sendQuestion = async () => {
    if (!question) return;

    const userMsg = { type: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await API.post(`/chat/${id}`, {
        question: question,
      });

      const botMsg = { type: "bot", text: res.data.answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.log(err);
    }

    setQuestion("");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#f8fafc] dark:from-gray-950 dark:to-gray-900 transition-colors">
      <Sidebar />

      <div className="flex-1 p-10 flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Chat with Document
        </h1>

        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${msg.type === "user" ? "text-right" : "text-left"}`}
            >
              <p
                className={`inline-block px-4 py-2 rounded-xl ${
                  msg.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something about document..."
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />

          <button
            onClick={sendQuestion}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
