import { Link } from "react-router-dom";

const role = localStorage.getItem("role");

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Page not found</p>

      <Link
        to={role === "admin" ? "/admin" : "/dashboard"}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Go Home
      </Link>
    </div>
  );
}