import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PageTransitionLoader } from "@/components/ui/page-transition-loader";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { themeScript } from "@/lib/theme-script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = 'https://mezzoldstudio.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Mezzold Studio | Software House Premium',
    template: '%s | Mezzold Studio',
  },
  description: 'Mezzold Studio é uma software house especializada em sites, Micro SaaS e dashboards de alta performance. Construímos plataformas ultra-rápidas com design inovador para marcas digitais ambiciosas.',
  keywords: ['Mezzold Studio', 'software house', 'desenvolvimento web', 'Micro SaaS', 'Next.js', 'dashboards', 'automação'],
  authors: [{ name: 'Mezzold Studio', url: BASE_URL }],
  creator: 'Mezzold Studio',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: BASE_URL,
    siteName: 'Mezzold Studio',
    title: 'Mezzold Studio | Software House Premium',
    description: 'Mezzold Studio é uma software house especializada em sites, Micro SaaS e dashboards de alta performance.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mezzold Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mezzold Studio | Software House Premium',
    description: 'Mezzold Studio é uma software house especializada em sites, Micro SaaS e dashboards de alta performance.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/logo.png?v=2',
    apple: '/logo.png?v=2',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
      suppressHydrationWarning
      style={{ colorScheme: "dark light" }}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-[100dvh] flex flex-col font-sans`}>
        <ThemeProvider>
          <PageTransitionLoader />
          <CookieConsent />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
