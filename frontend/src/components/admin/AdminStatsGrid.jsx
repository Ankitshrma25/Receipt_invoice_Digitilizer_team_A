export default function AdminStatsGrid({ invoices, revenueByCurrency }) {
  const totalInvoices = invoices.length;

  const uniqueVendors = new Set(
    invoices.map(inv => inv.vendor)
  ).size;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="p-4 bg-white shadow rounded">
        <p>Total Invoices</p>
        <h2 className="text-2xl font-bold">{totalInvoices}</h2>
      </div>

      <div className="p-4 bg-white shadow rounded">
        <p>Unique Vendors</p>
        <h2 className="text-2xl font-bold">{uniqueVendors}</h2>
      </div>

      {Object.entries(revenueByCurrency).map(([currency, total]) => (
        <div key={currency} className="p-4 bg-white shadow rounded">
          <p>Total Revenue ({currency})</p>
          <h2 className="text-2xl font-bold">
            {currency} {total.toFixed(2)}
          </h2>
        </div>
      ))}
    </div>
  );
}