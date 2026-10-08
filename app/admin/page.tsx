import AdminDashboard from "./components/AdminDashboard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = { title: "Admin Dashboard" };
export default function AdminPage() {
  return (
    <>
      <Navbar />
      <AdminDashboard />
      <Footer />
    </>
  );
}