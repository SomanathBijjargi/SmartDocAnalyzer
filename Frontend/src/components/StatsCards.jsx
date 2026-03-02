import { useEffect, useState } from "react";
import API from "../services/api";

function StatsCards() {
  const [stats, setStats] = useState({
    totalDocs: 0,
    totalSummaries: 0,
    totalChats: 0
  });

  const fetchStats = async () => {
    try {
      const res = await API.get("/docs/stats/overview");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <p className="text-gray-500 dark:text-gray-400">Total Documents</p>
        <h2 className="text-3xl font-bold text-blue-600">
          {stats.totalDocs}
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <p className="text-gray-500 dark:text-gray-400">AI Summaries</p>
        <h2 className="text-3xl font-bold text-purple-600">
          {stats.totalSummaries}
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <p className="text-gray-500 dark:text-gray-400">Chats</p>
        <h2 className="text-3xl font-bold text-green-600">
          {stats.totalChats}
        </h2>
      </div>

    </div>
  );
}

export default StatsCards;
