

import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/header/site-header";
import Footer from "@/components/layout/footer/footer";
import AnnouncementBar from "@/components/layout/header/announcement-bar";
import HeaderNavigation from "@/components/layout/header/site-nav";
import FloatingHeader from "@/components/layout/header/floating-header";

import { BasketProvider } from "@/lib/basket/basket-store";
import { AuthProvider } from "@/app/providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"] });

export const metadata: Metadata = {
  title: {
    default: "MyShop",
    template: "%s | MyShop",
  },
  description: "E-commerce website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <BasketProvider>
            <AnnouncementBar />
            <Header />
            <HeaderNavigation />
            <FloatingHeader />

            <main className="bg-gray-50 min-h-screen">{children}</main>

            <Footer />
            <Toaster position="top-right" />
          </BasketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
