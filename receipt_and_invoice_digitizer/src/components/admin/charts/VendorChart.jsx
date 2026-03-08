import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

export default function VendorChart({ topVendors = [] }) {
  if (!topVendors.length) {
    return (
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Top Vendors</h2>
        <p className="text-gray-500">No vendor data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Top Vendors</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={topVendors}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}   // donut effect
            outerRadius={120}
            label
          >
            {topVendors.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}