import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "./AuthForm";
export const metadata = { title: "Sign up" };
export default function SignupPage() {
  return (
    <>
      <Navbar />
      <AuthForm mode="signup" />
      <Footer />
    </>
  );
}