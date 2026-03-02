import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { ThemeContext } from "../context/ThemeContext";

function Login() {
  const { dark, setDark } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
        navigate("/");
    }
  }, [navigate]);


  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");

    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#f8fafc] dark:from-gray-950 dark:to-gray-900 transition-colors">
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-6 right-6 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg"
      >
        {dark ? "Light" : "Dark"}
      </button>

      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg w-[400px] transition-colors">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Login</h2>

        <input
          placeholder="Email"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-600 text-white rounded-lg"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center text-gray-600 dark:text-gray-300">
          New user? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
