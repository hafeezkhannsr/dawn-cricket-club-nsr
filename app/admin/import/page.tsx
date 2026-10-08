import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImportAdmin from "./ImportAdmin";
export const metadata = { title: "Bulk Import — Admin" };
export default function ImportPage() {
  return (
    <>
      <Navbar />
      <ImportAdmin />
      <Footer />
    </>
  );
}