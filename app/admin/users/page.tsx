import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UsersAdmin from "./UsersAdmin";
export const metadata = { title: "Users — Admin" };
export default function AdminUsersPage() {
  return (
    <>
      <Navbar />
      <UsersAdmin />
      <Footer />
    </>
  );
}