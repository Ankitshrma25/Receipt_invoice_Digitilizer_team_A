export default function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-slate-800 font-bold text-lg leading-tight">
        {value || "---"}
      </p>
    </div>
  );
}