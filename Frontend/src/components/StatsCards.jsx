import { useEffect, useState } from "react";
import API from "../services/api";

function StatsCards() {
  const [stats, setStats] = useState({
    totalDocs: 0,
    totalSummaries: 0,
    totalChats: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/docs/stats/overview");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6 mb-10">

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <p className="text-gray-500">Total Documents</p>
        <h2 className="text-3xl font-bold text-blue-600">
          {stats.totalDocs}
        </h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <p className="text-gray-500">AI Summaries</p>
        <h2 className="text-3xl font-bold text-purple-600">
          {stats.totalSummaries}
        </h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <p className="text-gray-500">Chats</p>
        <h2 className="text-3xl font-bold text-green-600">
          {stats.totalChats}
        </h2>
      </div>

    </div>
  );
}

export default StatsCards;
