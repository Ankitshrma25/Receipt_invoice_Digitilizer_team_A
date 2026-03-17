// Multi currency aggregation
export function calculateRevenueByCurrency(invoices) {
  return invoices.reduce((acc, invoice) => {
    if (!acc[invoice.currency]) {
      acc[invoice.currency] = 0;
    }

    acc[invoice.currency] += invoice.amount;
    return acc;
  }, {});
}

// Monthly revenue aggregation
export function calculateMonthlyRevenue(invoices = []) {
  const result = {};

  invoices.forEach(inv => {
    if (!inv.month || !inv.currency) return;

    if (!result[inv.month]) {
      result[inv.month] = {};
    }

    if (!result[inv.month][inv.currency]) {
      result[inv.month][inv.currency] = 0;
    }

    result[inv.month][inv.currency] += inv.amount || 0;
  });

  return result;
}

// Vendor performance | top vendors
export function calculateTopVendors(invoices = []) {
  const vendorMap = {};

  invoices.forEach(inv => {
    if (!inv.vendor) return;

    if (!vendorMap[inv.vendor]) {
      vendorMap[inv.vendor] = 0;
    }

    vendorMap[inv.vendor] += inv.amount || 0;
  });

  // Convert to array
  const result = Object.entries(vendorMap).map(([name, value]) => ({
    name,
    value
  }));

  // Sort descending
  result.sort((a, b) => b.value - a.value);

  // Return top 5
  return result.slice(0, 5);
}