import type { Metadata } from "next";
import { bebasNeue, inter } from "@/styles/fonts";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ruden Fitness | Elite Personal Training by Rudrendra Shrestha",
  description:
    "Transform your body and build elite discipline with personalized coaching from Rudrendra Shrestha — Men's Physique Athlete and Personal Trainer.",
  keywords: [
    "personal trainer",
    "fitness coach",
    "body transformation",
    "Rudrendra Shrestha",
    "Ruden Fitness",
  ],
  openGraph: {
    title: "Ruden Fitness | Elite Personal Training",
    description:
      "Personalized coaching to help you unlock your strongest self.",
    type: "website",
    siteName: "Ruden Fitness",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}