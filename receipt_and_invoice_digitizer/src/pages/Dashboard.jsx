// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import Navbar from "../components/dashboard/Navbar";
// import Header from "../components/dashboard/Header";
// import StatsGrid from "../components/dashboard/StatsGrid";
// import UploadArea from "../components/dashboard/UploadArea";
// import RecentTable from "../components/dashboard/RecentTable";
// import ExtractionPanel from "../components/dashboard/ExtractionPanel";
// import axios from "axios";

// const API_URL = "http://localhost:8000";

// export default function Dashboard() {
//   const location = useLocation();

//   const [files, setFiles] = useState([]);
//   const [processing, setProcessing] = useState(false);
//   const [latestData, setLatestData] = useState(null);
//   const [user, setUser] = useState(null);

//   const [showSettings, setShowSettings] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   // Load theme + user
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("darkMode");
//     if (savedTheme === "true") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     }

//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Apply theme when toggled
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("darkMode", "true");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("darkMode", "false");
//     }
//   }, [darkMode]);

//   // Open settings from navbar
//   useEffect(() => {
//     if (location.state?.openSettings) {
//       setShowSettings(true);
//     }
//   }, [location.state]);

//   const handleUpload = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setProcessing(true);

//       const res = await axios.post(
//         `${API_URL}/invoice/upload`,
//         formData
//       );

//       const extracted = res.data.extracted_text;

//       const newInvoice = {
//         id: res.data.invoice_id,
//         filename: res.data.filename,
//         status: "Processed",
//         vendor: extracted.vendor_name,
//         total: extracted.total_amount,
//         date: extracted.date,
//       };

//       setLatestData({
//         vendor: extracted.vendor_name,
//         total: extracted.total_amount,
//         invoice_number: extracted.invoice_number,
//         date: extracted.date,
//       });

//       setFiles((prev) => [newInvoice, ...prev]);

//     } catch (err) {
//       alert("Upload failed");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">

//       <Navbar user={user} />

//       <main className="max-w-7xl mx-auto p-8">
//         <Header onUpload={handleUpload} />
//         <StatsGrid files={files} />

//         <div className="grid grid-cols-12 gap-8">
//           <div className="col-span-12 lg:col-span-8 space-y-8">
//             <UploadArea onUpload={handleUpload} processing={processing} />
//             <RecentTable files={files} />
//           </div>

//           <ExtractionPanel latestData={latestData} />
//         </div>
//       </main>

//       {/* SETTINGS MODAL */}
//       {showSettings && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 w-[400px] shadow-2xl transition-colors">

//             <h2 className="text-xl font-semibold mb-6 text-center">
//               Settings
//             </h2>

//             <div className="flex justify-between items-center mb-6">
//               <span>Dark Mode</span>
//               <input
//                 type="checkbox"
//                 checked={darkMode}
//                 onChange={() => setDarkMode(!darkMode)}
//                 className="w-5 h-5"
//               />
//             </div>

//             <div className="flex justify-between">
//               <button
//                 onClick={() => setShowSettings(false)}
//                 className="px-4 py-2 bg-gray-400 rounded-lg text-white"
//               >
//                 Back
//               </button>

//               <button
//                 onClick={() => setShowSettings(false)}
//                 className="px-4 py-2 bg-indigo-600 rounded-lg text-white"
//               >
//                 Save
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import Header from "../components/dashboard/Header";
import StatsGrid from "../components/dashboard/StatsGrid";
import UploadArea from "../components/dashboard/UploadArea";
import RecentTable from "../components/dashboard/RecentTable";
import ExtractionPanel from "../components/dashboard/ExtractionPanel";
import axios from "axios";

const API_URL = "http://localhost:8000";

export default function Dashboard() {
  const location = useLocation();

  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [latestData, setLatestData] = useState(null);
  const [user, setUser] = useState(null);

  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  useEffect(() => {
    if (location.state?.openSettings) {
      setShowSettings(true);
    }
  }, [location.state]);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setProcessing(true);

      const res = await axios.post(
        `${API_URL}/invoice/upload`,
        formData
      );

      const extracted = res.data.extracted_text;

      const cleanTotal = extracted.total_amount
        ? parseFloat(
            extracted.total_amount.toString().replace(/,/g, "")
          )
        : 0;

      const newInvoice = {
        id: Date.now(), // 🔥 Unique ID fix
        filename: res.data.filename,
        status: "Processed",
        vendor: extracted.vendor_name || "N/A",
        total: cleanTotal,
        date: extracted.date || "N/A",
      };

      setLatestData({
        vendor: extracted.vendor_name || "N/A",
        total: cleanTotal,
        invoice_number: extracted.invoice_number || "N/A",
        date: extracted.date || "N/A",
      });

      setFiles((prev) => [newInvoice, ...prev]);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">

      <Navbar user={user} />

      <main className="max-w-7xl mx-auto p-8">
        <Header onUpload={handleUpload} />
        <StatsGrid files={files} />

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <UploadArea onUpload={handleUpload} processing={processing} />
            <RecentTable files={files} />
          </div>

          <ExtractionPanel latestData={latestData} />
        </div>
      </main>

      {showSettings && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 w-[400px] shadow-2xl">

            <h2 className="text-xl font-semibold mb-6 text-center">
              Settings
            </h2>

            <div className="flex justify-between items-center mb-6">
              <span>Dark Mode</span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-gray-400 rounded-lg text-white"
              >
                Back
              </button>

              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-indigo-600 rounded-lg text-white"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}