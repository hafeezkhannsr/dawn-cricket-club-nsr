import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MyRegistrations from "./MyRegistrations";
export const metadata = { title: "My Registrations" };
export default function MyRegistrationsPage() {
  return (
    <>
      <Navbar />
      <MyRegistrations />
      <Footer />
    </>
  );
}