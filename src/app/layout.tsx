import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mezzold Studio | Software House Premium",
  description: "Construímos plataformas ultra-rápidas e com design inovador que parecem vivas—feitas para marcas SaaS e digital-first ambiciosas.",
  icons: {
    icon: '/logo.png?v=2',
    apple: '/logo.png?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="dark"
      style={{ colorScheme: "dark" }}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-[100dvh] flex flex-col font-sans`}>
        {children}
      </body>
    </html>
  );
}
