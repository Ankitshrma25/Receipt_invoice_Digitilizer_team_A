import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Bell } from "lucide-react";

export default function Navbar({ user }) {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);

  const dropdownRef = useRef(null);
  const notifyRef = useRef(null);

  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setOpenNotify(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg transition-all">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-white dark:bg-slate-600 text-indigo-600 dark:text-white p-2 rounded-xl shadow-md">
          <FileText size={22} />
        </div>
        <span className="text-xl font-bold tracking-wide">
          DigiDoc
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* 🔔 Notifications */}
        <div className="relative" ref={notifyRef}>
          <Bell
            size={20}
            className="cursor-pointer hover:text-indigo-200 transition"
            onClick={() => setOpenNotify(!openNotify)}
          />

          {openNotify && (
            <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-xl shadow-xl p-4 z-50">
              <h3 className="font-semibold mb-3">Notifications</h3>

              <div className="space-y-3 text-sm">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                  Invoice processed successfully
                </div>
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                  New invoice uploaded
                </div>
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                  Extraction completed
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 👤 Profile */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setOpenProfile(!openProfile)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-indigo-200 dark:text-slate-300">
                {user?.plan || "Pro Plan"}
              </p>
            </div>

            {/* Profile Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white dark:bg-slate-600 text-indigo-600 dark:text-white flex items-center justify-center font-bold shadow-md">
              {user?.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.name?.charAt(0) || "U"
              )}
            </div>
          </div>

          {openProfile && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-xl shadow-xl py-2 z-50">

              <button
                onClick={() => {
                  setOpenProfile(false);
                  navigate("/dashboard", { state: { openProfile: true } });
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              >
                Edit Profile
              </button>

              <button
                onClick={() => {
                  setOpenProfile(false);
                  navigate("/dashboard", { state: { openSettings: true } });
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              >
                Settings
              </button>

              <div className="border-t my-2 dark:border-slate-600"></div>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
              >
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </nav>
  );
}