import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmailAdmin from "./EmailAdmin";
export const metadata = { title: "Email Logs" };
export default function EmailsPage() {
  return (
    <>
      <Navbar />
      <EmailAdmin />
      <Footer />
    </>
  );
}