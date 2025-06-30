import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { CustomConfigProvider } from "@/hooks/useCustomLifiConfig";
import { ThemeProvider } from "next-themes";
import { OrderManagerProvider } from "./swap-widgets/hooks/order-manager";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vault Swap",
  description: "Vault is a Dex powered by LIFI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${inter.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <OrderManagerProvider>
            <CustomConfigProvider>{children}</CustomConfigProvider>
          </OrderManagerProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
