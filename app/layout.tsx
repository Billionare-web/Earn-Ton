import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/context/AuthContext"; // ✅ AuthProvider import qildik

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Earn Ton",
  description: "Earn TON by completing tasks and referring friends.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=400, user-scalable=no" />
      </head>
      <body
        className={`${sans.variable} ${mono.variable} antialiased bg-gray-900 text-white`}
        style={{ maxWidth: "400px", margin: "auto", overflowX: "hidden" }}
      >
        <AuthProvider>
          <main className="min-h-screen flex flex-col items-center justify-center px-4">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
