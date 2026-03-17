import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function InvoiceDetailPanel({ invoice, onClose }) {

  const [fullscreen, setFullscreen] = useState(false)

  // close panel with ESC key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        if (fullscreen) {
          setFullscreen(false)
        } else {
          onClose()
        }
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [fullscreen, onClose])

  return (
    <>
      {/* Sliding panel */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 80, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Card className="h-full">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Invoice Details</CardTitle>

            <button
              onClick={onClose}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </CardHeader>

          <CardContent className="space-y-4">

            <div>
              <strong>Vendor:</strong> {invoice.vendor_name}
            </div>

            <div>
              <strong>Invoice Number:</strong> {invoice.invoice_number}
            </div>

            <div>
              <strong>Amount:</strong> ${invoice.total_amount}
            </div>

            <div>
              <strong>Date:</strong> {invoice.date || "N/A"}
            </div>

            <div>
              <strong>File:</strong>
            </div>

            {/* Click image to expand */}
            <img
              src={`http://localhost:8000/${invoice.filename}`}
              alt="Invoice"
              onClick={() => setFullscreen(true)}
              className="rounded-md border cursor-pointer hover:opacity-90"
            />

            <p className="text-xs text-muted-foreground">
              Click image to expand
            </p>

          </CardContent>
        </Card>
      </motion.div>

      {/* Fullscreen Viewer */}
      {fullscreen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setFullscreen(false)}
        >
          <img
            src={`http://localhost:8000/${invoice.filename}`}
            alt="Invoice Full"
            className="max-h-[90vh] rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  )
}