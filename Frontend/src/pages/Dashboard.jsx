import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import UploadCard from "../components/UploadCard";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#f8fafc]">

      <Sidebar />

      <div className="flex-1 p-10">
        <Header />
        <StatsCards />
        <UploadCard />
      </div>

    </div>
  );
}

export default Dashboard;
