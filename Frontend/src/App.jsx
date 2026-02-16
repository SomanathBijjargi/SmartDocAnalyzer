import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MyDocuments from "./pages/MyDocuments";
import ViewDocument from "./pages/ViewDocument";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />

        <Route path="/docs" element={
          <PrivateRoute><MyDocuments /></PrivateRoute>
        } />

        <Route path="/docs/:id" element={
          <PrivateRoute><ViewDocument /></PrivateRoute>
        } />

        <Route path="/chat/:id" element={
          <PrivateRoute><ChatPage /></PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
