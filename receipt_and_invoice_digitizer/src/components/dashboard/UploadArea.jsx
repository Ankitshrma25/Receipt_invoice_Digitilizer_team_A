import { motion } from "framer-motion";
import { Upload } from "lucide-react";

export default function UploadArea({ onUpload, processing }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white p-2 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50"
    >
      <label className="border-2 border-dashed border-slate-200 rounded-[22px] p-12 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-all block relative overflow-hidden group">
        <div className="relative z-10">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Upload size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            Drop your invoices here
          </h3>
          <p className="text-slate-400 mt-1">
            Supports PDF, PNG, JPG (Max 10MB)
          </p>
        </div>

        <input type="file" className="hidden" onChange={handleChange} />

        {processing && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </label>
    </motion.div>
  );
}