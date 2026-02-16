import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="w-64 bg-white/70 backdrop-blur-xl border-r border-gray-200 shadow-sm p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-600 mb-12">
        SmartDoc AI
      </h2>

      <ul className="space-y-6 text-gray-700 font-medium">
        <li><Link to="/">🏠 Dashboard</Link></li>
        <li><Link to="/docs">📄 My Documents</Link></li>
      </ul>

      {/* <div className="absolute bottom-6 text-sm text-gray-400">
        AI SaaS v1.0
      </div>
       */}

      <div className="absolute bottom-10 w-52">
        <button onClick={handleLogout} className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
          Logout
        </button>
    </div>
    </div>
  );
}

export default Sidebar;
