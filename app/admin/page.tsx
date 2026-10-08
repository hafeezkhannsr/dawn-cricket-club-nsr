import AdminShell from "@/components/admin/AdminShell";
import AdminDashboard from "./components/AdminDashboard";
export const metadata = { title: "Admin Dashboard" };
export default function AdminPage() {
  return (
    <AdminShell title="Dashboard" subtitle="Overview of all club activity">
      <AdminDashboard />
    </AdminShell>
  );
}