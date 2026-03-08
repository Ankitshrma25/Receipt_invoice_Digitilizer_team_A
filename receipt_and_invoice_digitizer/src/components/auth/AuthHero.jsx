export default function AuthHero() {
  return (
    <div className="hidden lg:flex items-center justify-center bg-slate-900 text-white p-10">

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-8 w-[420px]">

        <h2 className="text-2xl font-bold mb-4">
          Receipt & Invoice Digitizer
        </h2>

        <p className="text-slate-300 mb-6">
          Turn invoices into structured analytics automatically.
        </p>

        <div className="bg-slate-800 rounded-lg p-4 space-y-2 text-sm">

          <div className="flex justify-between">
            <span>Total Revenue</span>
            <span>$48,230</span>
          </div>

          <div className="flex justify-between">
            <span>Invoices Processed</span>
            <span>312</span>
          </div>

          <div className="flex justify-between">
            <span>Top Vendor</span>
            <span>Amazon</span>
          </div>

        </div>

      </div>

    </div>
  );
}