export default function StatCard({ title, value, icon, trend, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/40 flex justify-between items-start">
      <div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-black text-slate-900">{value}</h3>
        <p className="text-xs font-bold mt-2 flex items-center gap-1">
          <span className="text-emerald-500">{trend}</span>
          <span className="text-slate-300 font-medium tracking-tight">
            vs last month
          </span>
        </p>
      </div>

      <div className={`p-3 rounded-2xl ${bg} ${color}`}>{icon}</div>
    </div>
  );
}