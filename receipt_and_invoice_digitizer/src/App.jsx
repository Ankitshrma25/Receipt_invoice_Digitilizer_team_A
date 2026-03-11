import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Features from "./pages/Features";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";
import Auth from "./pages/auth/Auth";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        {/* Routes without protection */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>

      {/* Chatbot appears on all pages */}
      <Chatbot />

    </Router>
  );
}

export default App;