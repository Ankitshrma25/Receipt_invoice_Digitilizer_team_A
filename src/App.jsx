import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Features from "./pages/Features";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/auth/Auth";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth pages */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />

        <Route
          path="/settings"
          element={<ProtectedRoute><Settings /></ProtectedRoute>}
        />

        <Route
          path="/admin"
          element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
        />

      </Routes>
    </Router>
  );
}

export default App;
