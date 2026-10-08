import AdminShell from "@/components/admin/AdminShell";
import AnalyticsClient from "./AnalyticsClient";
export const metadata = { title: "Analytics — Admin" };
export default function AnalyticsPage() {
  return (
    <AdminShell title="Analytics" subtitle="Real-time insights across all data sources">
      <AnalyticsClient />
    </AdminShell>
  );
}