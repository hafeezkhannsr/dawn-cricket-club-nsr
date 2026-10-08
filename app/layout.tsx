import type { Metadata, Viewport } from "next";
import "./globals.css";
import ChatBot from "@/components/chatbot/ChatBot";
import PwaRegister from "@/components/PwaRegister";
import LangProvider from "@/components/i18n/LangProvider";
export const metadata: Metadata = {
  title: {
    default: "DAWN Cricket Club | Nowshera, KPK",
    template: "%s | DAWN Cricket Club",
  },
  description:
    "DAWN Cricket Club (DKK) - Building Future Champions in Dheri Katti Khel, Nowshera, Khyber Pakhtunkhwa, Pakistan.",
  metadataBase: new URL("https://dawncricketclub.pk"),
  openGraph: {
    title: "DAWN Cricket Club",
    description: "Building Future Champions in Nowshera, KPK",
    type: "website",
    locale: "en_PK",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon-192.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon-192.svg" }],
  },
  appleWebApp: {
    capable: true,
    title: "DAWN CC",
    statusBarStyle: "black-translucent",
  },
};
export const viewport: Viewport = {
  themeColor: "#f0b429",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LangProvider>
          {children}
          <ChatBot />
          <PwaRegister />
        </LangProvider>
      </body>
    </html>
  );
}