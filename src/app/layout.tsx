import Header from "@/components/layout/Header";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Providers from "@/lib/ThemeProvider";

export const metadata: Metadata = {
  title: "zscrum App",
  description: "this is a reting zscrum app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen"> {children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
