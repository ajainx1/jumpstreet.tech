import { Metadata, Viewport } from 'next';
import './globals.css';
import PWAInstallPrompt from '@/components/js/PWAInstallPrompt';
import TelegramVisitorLogger from '@/components/js/TelegramVisitorLogger';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import Script from 'next/script';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Orca6™ — Automated HFT Trading Platform by JumpStreet Tech',
  description: 'Orca6 automated trading indicator platform with sub-millisecond execution latency, dedicated Equinix LD4 cloud VPS hosting, and 24/7 VIP support.',
  manifest: "/manifest.json",
  metadataBase: new URL("https://jumpstreet.tech"),
  alternates: {
    canonical: "https://jumpstreet.tech",
  },
  openGraph: {
    title: "Orca6™ — Sub-Millisecond Automated HFT Platform",
    description: "High-frequency trading indicators, cloud VPS hosting, and execution gateway.",
    url: "https://jumpstreet.tech",
    siteName: "JumpStreet Tech",
    locale: "en_US",
    type: "website",
  },
  other: {
    'google-adsense-account': 'ca-pub-6072468142870937',
    'theme-color': '#020817',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Orca6™",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Orca6 Automated Trading Platform",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Windows, Linux, Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "JumpStreet Tech",
      "url": "https://jumpstreet.tech"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/js/favicon.ico" sizes="any" />
        <meta name="google-adsense-account" content="ca-pub-6072468142870937" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6072468142870937"
        />
      </head>
      <body className="antialiased overflow-x-hidden min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Footer />
          <CookieConsent />
          <ThemeToggle />
          <PWAInstallPrompt />
          <TelegramVisitorLogger />
        </ThemeProvider>
      </body>
    </html>
  );
}
