import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // block admin from user pages
  if (!adminOnly && role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}