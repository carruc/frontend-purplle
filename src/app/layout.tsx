import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PurpLLE - Purposeful Lifelong Learning Environment",
  description: "An effective environment for continuous learning and self-assessment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geist.className} h-full overflow-hidden`}>
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-1 overflow-hidden p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
