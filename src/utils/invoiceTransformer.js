
// Utility function to transform raw invoice data into a structured format

import { create } from "framer-motion/m";

// Extracts currency and numeric amount from a raw string
export function parseAmount(rawAmount) {
  if (!rawAmount) {
    return { currency: "UNKNOWN", amount: 0 };
  }

  // Extract currency (anything that is NOT digit, dot, comma, minus)
  const currencyMatch = rawAmount.match(/[^\d.,-]+/);

  // Extract numeric part
  const numberMatch = rawAmount.replace(/[^\d.-]/g, "");

  return {
    currency: currencyMatch ? currencyMatch[0].trim() : "UNKNOWN",
    amount: parseFloat(numberMatch) || 0
  };
}

// Normalize invoice
export function normalizeInvoice(data) {
  // Safe date parsing (MM/DD/YYYY format)
  let dateObj = null;

  if (data.date) {
    const parsedDate = new Date(data.date);
    if (!isNaN(parsedDate)) {
      dateObj = parsedDate;
    }
  }

  return {
    id: data.id,
    filename: data.filename,
    invoiceNumber: data.invoice_number || "",
    vendor: data.vendor_name || "UNKNOWN",

    // Since backend stores float only
    currency: "$",   // You can change later if needed
    amount: parseFloat(data.total_amount) || 0,

    date: dateObj,

    month: dateObj
      ? `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`
      : "UNKNOWN",

    status: "Processed"
  };
}
