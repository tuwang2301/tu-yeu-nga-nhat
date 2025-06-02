import type { Metadata } from "next";
import { Geist, Geist_Mono, Pattaya, Sansita_Swashed } from "next/font/google";
import "./globals.css";
import BackToMenu from "@/components/BackToMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sanistaSwashed = Sansita_Swashed({
  subsets: ["vietnamese"], // Hỗ trợ tiếng Việt
  variable: "--font-dancing-script", // Dễ dùng với Tailwind
  display: "swap", // Tránh nhấp nháy chữ,
  weight: ["300", "400", "500", "600", "700", "800"],
});

const pattaya = Pattaya({
  subsets: ["vietnamese"],
  variable: "--font-pattaya",
  style: ["normal"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Love Calculator",
  description: "Tu yeu Nga nhat tren doi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sanistaSwashed.variable} ${pattaya.variable} antialiased`}
      >
        <div className="h-screen w-screen bg-gradient-to-br from-pink-100 to-pink-300 flex items-center justify-center">
          <BackToMenu />
          {children}
        </div>
      </body>
    </html>
  );
}
