// export default function StatsGrid({ files }) {
//   const totalInvoices = files.length;
//   const totalValue = files.reduce(
//     (sum, file) => sum + Number(file.total || 0),
//     0
//   );

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

//       <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow transition-colors">
//         <p className="text-sm text-gray-500 dark:text-gray-300">TOTAL INVOICES</p>
//         <h2 className="text-3xl font-bold">{totalInvoices}</h2>
//       </div>

//       <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow transition-colors">
//         <p className="text-sm text-gray-500 dark:text-gray-300">TOTAL VALUE</p>
//         <h2 className="text-3xl font-bold">${totalValue.toFixed(2)}</h2>
//       </div>

//       <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow transition-colors">
//         <p className="text-sm text-gray-500 dark:text-gray-300">AVERAGE VALUE</p>
//         <h2 className="text-3xl font-bold">
//           ${totalInvoices > 0 ? (totalValue / totalInvoices).toFixed(2) : "0.00"}
//         </h2>
//       </div>

//     </div>
//   );
// }

export default function StatsGrid({ files }) {

  const totalInvoices = files.length;

  const totalValue = files.reduce((sum, file) => {
    const value = file.total
      ? parseFloat(file.total.toString().replace(/,/g, ""))
      : 0;

    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const averageValue =
    totalInvoices > 0 ? totalValue / totalInvoices : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          TOTAL INVOICES
        </p>
        <h2 className="text-3xl font-bold">{totalInvoices}</h2>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          TOTAL VALUE
        </p>
        <h2 className="text-3xl font-bold">
          ${totalValue.toFixed(2)}
        </h2>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          AVERAGE VALUE
        </p>
        <h2 className="text-3xl font-bold">
          ${averageValue.toFixed(2)}
        </h2>
      </div>

    </div>
  );
}