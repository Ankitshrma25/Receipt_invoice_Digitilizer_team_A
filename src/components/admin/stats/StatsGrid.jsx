import StatsCard from "./StatsCard"
import { FileText, Store, DollarSign } from "lucide-react"

export default function StatsGrid({ invoices, revenueByCurrency }) {

  const totalInvoices = invoices.length

  const uniqueVendors = new Set(
    invoices.map(inv => inv.vendor)
  ).size

  return (
    <div className="grid grid-cols-3 gap-6 mb-6">

      
      <StatsCard
        title="Total Invoices"
        value={totalInvoices}
        icon={FileText}
        trend={12}
        color="blue"
      />

     
      <StatsCard
        title="Unique Vendors"
        value={uniqueVendors}
        icon={Store}
        trend={6}
        color="purple"
      />

      
      {Object.entries(revenueByCurrency).map(([currency, total]) => (
        <StatsCard
          key={currency}
          title={`Revenue (${currency})`}
          value={`${currency} ${total.toFixed(2)}`}
          icon={DollarSign}
          trend={18}
          color="emerald"
        />
      ))}

    </div>
  )
}