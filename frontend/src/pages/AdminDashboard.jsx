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
import { X } from "lucide-react"

export default function AdminDashboard() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

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

      <RecentInvoicesTable
        invoices={invoices}
        onViewDetails={setSelectedInvoice}
      />

      {/* Extraction Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[500px] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">OCR Extraction Details</h2>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">File</p>
                <p className="font-medium">{selectedInvoice.filename?.split(/[\\/]/).pop()}</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">Vendor Name</p>
                <p className="font-medium">{selectedInvoice.vendor || "N/A"}</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">Invoice Number</p>
                <p className="font-medium">{selectedInvoice.invoiceNumber || "N/A"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{selectedInvoice.date?.toLocaleDateString() || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">${selectedInvoice.amount.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Total Amount</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">${selectedInvoice.amount.toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedInvoice(null)}
              className="w-full mt-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}