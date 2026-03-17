import { useEffect, useState, useMemo } from "react"
import axios from "axios"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import InvoiceDetailPanel from "@/components/admin/invoices/InvoiceDetailPanel"

export default function Invoices() {
  const [invoices, setInvoices] = useState([])
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const [search, setSearch] = useState("")
  const [vendorFilter, setVendorFilter] = useState("all")

  useEffect(() => {
    fetchInvoices()
  }, [])

  async function fetchInvoices() {
    const res = await axios.get("http://localhost:8000/invoice/all")
    setInvoices(res.data)
  }

  // Unique vendors
  const vendors = useMemo(() => {
    return [...new Set(invoices.map((i) => i.vendor_name))]
  }, [invoices])

  // Filtered invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.vendor_name.toLowerCase().includes(search.toLowerCase()) ||
        inv.invoice_number.toLowerCase().includes(search.toLowerCase())

      const matchesVendor =
        vendorFilter === "all" || inv.vendor_name === vendorFilter

      return matchesSearch && matchesVendor
    })
  }, [invoices, search, vendorFilter])

  return (
    <div className="grid grid-cols-12 gap-6">

      {/* LEFT SIDE TABLE */}
      <div className={selectedInvoice ? "col-span-7" : "col-span-12"}>

        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>

          <CardContent>

            {/* SEARCH + FILTER */}
            <div className="flex gap-4 mb-4">

              <Input
                placeholder="Search vendor or invoice number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Select
                value={vendorFilter}
                onValueChange={(value) => setVendorFilter(value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Vendor" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Vendors</SelectItem>

                  {vendors.map((vendor) => (
                    <SelectItem key={vendor} value={vendor}>
                      {vendor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>

            {/* TABLE */}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Invoice No</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>File</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredInvoices.map((inv) => (
                  <TableRow
                    key={inv.id}
                    className={
                      selectedInvoice?.id === inv.id
                        ? "bg-muted"
                        : "hover:bg-muted/50"
                    }
                  >
                    <TableCell>{inv.id}</TableCell>

                    <TableCell>{inv.vendor_name}</TableCell>

                    <TableCell>{inv.invoice_number}</TableCell>

                    <TableCell>${inv.total_amount}</TableCell>

                    <TableCell>{inv.date || "N/A"}</TableCell>

                    <TableCell>
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>

            </Table>

          </CardContent>
        </Card>

      </div>

      {/* RIGHT SIDE DETAIL PANEL */}

      {selectedInvoice && (
        <div className="col-span-5">
          <InvoiceDetailPanel
            invoice={selectedInvoice}
            onClose={() => setSelectedInvoice(null)}
          />
        </div>
      )}

    </div>
  )
}