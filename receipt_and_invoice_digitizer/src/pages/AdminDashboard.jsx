import { useEffect, useState, useMemo } from "react";
import axios from "axios";

import AdminLayout from "../components/admin/layout/AdminLayout";
import StatsGrid from "../components/admin/stats/StatsGrid";
import RevenueChart from "../components/admin/charts/RevenueChart";
import VendorChart from "../components/admin/charts/VendorChart";
import RecentInvoicesTable from "../components/admin/tables/RecentInvoicesTable";

import { normalizeInvoice } from "../utils/invoiceTransformer";
import {
  calculateRevenueByCurrency,
  calculateMonthlyRevenue,
  calculateTopVendors
} from "../utils/analytics";

export default function AdminDashboard() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {
    const res = await axios.get("http://localhost:8000/invoice/all");
    const normalized = res.data.map(normalizeInvoice);
    setInvoices(normalized);
  }

  const revenueByCurrency = useMemo(
    () => calculateRevenueByCurrency(invoices),
    [invoices]
  );

  const monthlyRevenue = useMemo(
    () => calculateMonthlyRevenue(invoices),
    [invoices]
  );

  const topVendors = useMemo(
    () => calculateTopVendors(invoices),
    [invoices]
  );

  return (
    <AdminLayout>
      <StatsGrid
        invoices={invoices}
        revenueByCurrency={revenueByCurrency}
      />

      <RevenueChart monthlyRevenue={monthlyRevenue} />

      <VendorChart topVendors={topVendors} />

      <RecentInvoicesTable invoices={invoices} />
    </AdminLayout>
  );
}