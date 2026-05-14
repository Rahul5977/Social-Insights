import type { Metadata } from "next";
import { Cabin, DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const dmSans = DM_Sans({
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const cabinetGrotesk = Cabin({
  variable: "--font-display",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SuperLiving Insights",
  description: "Internal healthcare Instagram analytics dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable} ${cabinetGrotesk.variable}`}>
      <body className="min-h-screen">
        <TooltipProvider>
          <Sidebar />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
