import { useEffect, useState, useMemo } from "react"
import axios from "axios"

import StatsGrid from "../components/admin/stats/StatsGrid"
import RevenueChart from "../components/admin/charts/RevenueChart"
import VendorChart from "../components/admin/charts/VendorChart"
import RecentInvoicesTable from "../components/admin/tables/RecentInvoicesTable"

import { normalizeInvoice } from "../utils/invoiceTransformer"
import {
  calculateRevenueByCurrency,
  calculateMonthlyRevenue,
  calculateTopVendors
} from "../utils/analytics"

import { Skeleton } from "@/components/ui/skeleton"

export default function AdminDashboard() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchInvoices()
  }, [])

  async function fetchInvoices() {
    try {
      const res = await axios.get("http://localhost:8000/invoice/all")
      const normalized = res.data.map(normalizeInvoice)
      setInvoices(normalized)
    } catch (err) {
      console.error(err)
      setError("Failed to load invoices")
    } finally {
      setLoading(false)
    }
  }

  const revenueByCurrency = useMemo(
    () => calculateRevenueByCurrency(invoices),
    [invoices]
  )

  const monthlyRevenue = useMemo(
    () => calculateMonthlyRevenue(invoices),
    [invoices]
  )

  const topVendors = useMemo(
    () => calculateTopVendors(invoices),
    [invoices]
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>

        <Skeleton className="h-72 w-full rounded-xl" />
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-6">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <StatsGrid
        invoices={invoices}
        revenueByCurrency={revenueByCurrency}
      />

      <RevenueChart monthlyRevenue={monthlyRevenue} />

      <VendorChart topVendors={topVendors} />

      <RecentInvoicesTable invoices={invoices} />
    </div>
  )
}