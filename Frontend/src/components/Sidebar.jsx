import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Sidebar() {
  const { dark, setDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="relative w-64 bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 shadow-sm p-6 min-h-screen transition-colors">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-12">
        SmartDoc AI
      </h2>

      <ul className="space-y-6 text-gray-700 dark:text-gray-200 font-medium">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/docs">My Documents</Link>
        </li>
      </ul>

      <div className="absolute bottom-24 w-52">
        <button
          onClick={() => setDark(!dark)}
          className="w-full py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {dark ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>

      <div className="absolute bottom-10 w-52">
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
