import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"

export default function RecentInvoicesTable({ invoices }) {
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
          </TableRow>
        </TableHeader>

        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.filename}</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}