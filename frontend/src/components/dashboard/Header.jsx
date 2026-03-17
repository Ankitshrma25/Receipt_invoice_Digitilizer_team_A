import { TrendingUp, Plus } from "lucide-react";

export default function Header({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900">
          Receipt & Invoice Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your business expenses with AI-powered extraction.
        </p>
      </div>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <TrendingUp size={18} /> Export
        </button>

        <label className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 cursor-pointer">
          <Plus size={18} /> New Upload
          <input type="file" className="hidden" onChange={handleChange} />
        </label>
      </div>
    </header>
  );
}