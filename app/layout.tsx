import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FluxPay | Premium Digital Wallet",
  description: "Experience the future of digital payments with FluxPay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#020617] text-slate-100 selection:bg-teal-500/30 overflow-x-hidden min-h-screen relative`}>
        {/* Unified Global Background */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          {/* Base tint */}
          <div className="absolute inset-0 bg-[#020617]" />

          {/* Ambient Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full opacity-50" />

          {/* Subtle Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
        </div>

        {children}
      </body>
    </html>
  );
}
