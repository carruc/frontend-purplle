import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PurpLLE - Purposeful Lifelong Learning Environment",
  description: "An effective environment for continuous learning and self-assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
