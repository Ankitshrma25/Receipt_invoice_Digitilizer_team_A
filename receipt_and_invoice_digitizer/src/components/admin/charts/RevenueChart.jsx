import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function RevenueChart({ monthlyRevenue = {} }) {

  const data = Object.entries(monthlyRevenue).map(([month, currencies]) => ({
    month,
    ...currencies
  }));

  return (
    <div className="bg-white shadow rounded-xl p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">
        Revenue Overview
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No revenue data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="$" stroke="#4f46e5" />
            <Line type="monotone" dataKey="₹" stroke="#16a34a" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}