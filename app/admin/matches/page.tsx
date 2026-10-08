import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MatchAdminList from "./MatchAdminList";
export const metadata = { title: "Match Management" };
export default function MatchAdminPage() {
  return (
    <>
      <Navbar />
      <MatchAdminList />
      <Footer />
    </>
  );
}