import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/app/signup/AuthForm";
export const metadata = { title: "Login" };
export default function LoginPage() {
  return (
    <>
      <Navbar />
      <AuthForm mode="login" />
      <Footer />
    </>
  );
}