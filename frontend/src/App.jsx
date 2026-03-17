import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Features from "./pages/Features";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import Invoices from "./pages/Invoices";
import Auth from "./pages/auth/Auth";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminLayout from "./components/admin/layout/AdminLayout";
import Landing from "./pages/Landing";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        {/* User protected routes */}
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

        {/* Admin layout routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="invoices" element={<Invoices />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;