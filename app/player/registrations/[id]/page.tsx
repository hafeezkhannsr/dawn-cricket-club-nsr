import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ManageRegistration from "./ManageRegistration";
export const dynamic = "force-dynamic";
export const metadata = { title: "Manage Registration" };
export default async function ManageRegistrationPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <ManageRegistration regId={id} />
      <Footer />
    </>
  );
}