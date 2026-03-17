
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444"];

/* ---------- DATE NORMALIZER ---------- */

const getMonthLabel = (dateStr) => {

  if (!dateStr || dateStr === "N/A") return "Unknown";

  // Handle formats like 10/20/07
  if (dateStr.includes("/")) {

    const parts = dateStr.split("/");

    const month = parts[0];
    let year = parts[2];

    if (year.length === 2) {
      year = "20" + year; // 07 -> 2007 safely
    }

    const date = new Date(`${year}-${month}-01`);

    return date.toLocaleString("default", { month: "short" });
  }

  const date = new Date(dateStr);

  return date.toLocaleString("default", { month: "short" });
};



export default function Charts({ invoices = [] }) {


  /* ---------- MONTHLY SPENDING ---------- */

  const monthlyMap = {};

  invoices.forEach((inv) => {

    const month = getMonthLabel(inv.date);

    if (!monthlyMap[month]) monthlyMap[month] = 0;

    monthlyMap[month] += Number(inv.total_amount || 0);

  });

  const monthlyChart = Object.keys(monthlyMap).map((month) => ({
    month,
    amount: Number(monthlyMap[month].toFixed(2))
  }));



  /* ---------- TOP MERCHANTS ---------- */

  const vendorMap = {};

  invoices.forEach((inv) => {

    const vendor = inv.vendor_name || "Unknown";

    if (!vendorMap[vendor]) vendorMap[vendor] = 0;

    vendorMap[vendor]++;

  });

  const vendorChart = Object.keys(vendorMap).map((v) => ({
    vendor: v,
    count: vendorMap[v]
  }));



  /* ---------- SPENDING DISTRIBUTION ---------- */

  const pieData = invoices.map((inv) => ({
    name: inv.vendor_name || "Unknown",
    value: Number(inv.total_amount || 0)
  }));



  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

      {/* MONTHLY TREND */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">

        <h3 className="text-lg font-semibold mb-4">
          Monthly Spending Trend
        </h3>

        <ResponsiveContainer width="100%" height={250}>

          <LineChart data={monthlyChart}>

            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3b82f6"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>



      {/* TOP MERCHANTS */}

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">

        <h3 className="text-lg font-semibold mb-4">
          Top Merchants
        </h3>

        <ResponsiveContainer width="100%" height={250}>

          <BarChart data={vendorChart}>

            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

            <XAxis dataKey="vendor" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="count" fill="#22c55e" />

          </BarChart>

        </ResponsiveContainer>

      </div>



      {/* SPENDING DISTRIBUTION */}

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow col-span-1 lg:col-span-2">

        <h3 className="text-lg font-semibold mb-4">
          Spending Distribution
        </h3>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >

              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}