// Utility function to transform raw invoice data into a structured format

// Extracts currency and numeric amount from a raw string
export function parseAmount(rawAmount) {
  if (!rawAmount) {
    return { currency: "UNKNOWN", amount: 0 };
  }

  const currencyMatch = rawAmount.match(/[^\d.,-]+/);
  const numberMatch = rawAmount.replace(/[^\d.-]/g, "");

  return {
    currency: currencyMatch ? currencyMatch[0].trim() : "UNKNOWN",
    amount: parseFloat(numberMatch) || 0
  };
}

// Normalize invoice
export function normalizeInvoice(data) {
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
    currency: "$",
    amount: parseFloat(data.total_amount) || 0,
    date: dateObj,
    month: dateObj
      ? `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`
      : "UNKNOWN",
    status: "Processed"
  };
}