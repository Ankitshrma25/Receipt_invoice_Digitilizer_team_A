import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

export default function RecentInvoicesTable({ invoices, onViewDetails }) {
  const getFilenameOnly = (filepath) => {
    if (!filepath) return "";
    return filepath.split(/[\\/]/).pop();
  };
  return (
    <div className="bg-background rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        Recent Uploads
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{getFilenameOnly(invoice.filename)}</TableCell>
              <TableCell>{invoice.vendor}</TableCell>
              <TableCell>
                {invoice.date?.toLocaleDateString()}
              </TableCell>
              <TableCell>
                ${invoice.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => onViewDetails(invoice)}
                  className="inline-flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition"
                >
                  <Eye size={16} />
                  View
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}