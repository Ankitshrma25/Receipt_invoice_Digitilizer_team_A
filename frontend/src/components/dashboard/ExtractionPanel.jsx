import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import DetailItem from "./DetailItem";

export default function ExtractionPanel({ latestData }) {
  return (
    <aside className="col-span-12 lg:col-span-4">
      <AnimatePresence mode="wait">
        {latestData ? (
          <motion.div
            key="data"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/60 p-6 sticky top-28"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Extraction Result</h2>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
                AI Confidence 98%
              </span>
            </div>

            <div className="space-y-5">
              <DetailItem label="Vendor Name" value={latestData.vendor || "-"} />
              <DetailItem label="Invoice Number" value={latestData.invoice_number || "-"} />

              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Date" value={latestData.date || "-"} />
                <DetailItem label="Category" value="Infrastructure" />
              </div>

              <div className="mt-6 p-5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                <p className="text-xs font-bold uppercase tracking-widest">
                  Total Amount
                </p>
                <p className="text-4xl font-black mt-1">
                  ${latestData.total || "0.00"}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[500px] bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/60 p-8 flex flex-col items-center justify-center text-slate-400 text-center sticky top-28"
          >
            <Clock size={32} className="mb-4" />

            <h2 className="text-lg font-semibold text-slate-600">
              Extraction Results
            </h2>

            <p className="text-sm mt-2">
              Upload an invoice to view extracted details here.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}