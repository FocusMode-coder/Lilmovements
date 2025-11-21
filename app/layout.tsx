import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { GtmLoader } from "@/(consent)/GtmLoader";
import { AuthProvider } from "@/components/AuthProvider";
import ScrollTexture from "@/components/ScrollTexture";
import GoldenEdgeLines from "@/components/GoldenEdgeLines";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lil Movements",
  description: "Dance and movement classes with Lily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <GtmLoader />
      </head>
      <body className={`${inter.className} bg-white min-h-screen`}>
        <AuthProvider>
          <ScrollTexture />
          <GoldenEdgeLines />
          <main className="bg-white">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}