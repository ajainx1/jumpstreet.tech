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
  title: 'Orca6™ — Automated Trading Platform | JumpStreet Tech',
  description: 'Orca6 automated trading indicator platform with sub-millisecond execution latency, dedicated Equinix LD4 cloud VPS hosting, and 24/7 VIP support.',
  manifest: "/manifest.json",
  metadataBase: new URL("https://jumpstreet.tech"),
  alternates: {
    canonical: "https://jumpstreet.tech",
  },
  openGraph: {
    title: "Orca6™ — Sub-Millisecond Automated Trading Platform",
    description: "High-frequency trading indicators, cloud VPS hosting, and execution gateway.",
    url: "https://jumpstreet.tech",
    siteName: "JumpStreet Tech",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Orca6 Automated Trading Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orca6™ — Sub-Millisecond HFT Platform",
    description: "High-frequency trading indicators, cloud VPS hosting, and execution gateway.",
    images: ["/icon.png"],
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
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Orca6 Automated Trading Platform",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Windows, Linux, Web",
      "offers": {
        "@type": "Offer",
        "price": "18",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "JumpStreet Tech",
        "url": "https://jumpstreet.tech"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "JumpStreet Tech",
      "url": "https://jumpstreet.tech",
      "logo": "https://jumpstreet.tech/icon.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "support@jumpstreet.tech",
        "contactType": "customer support"
      }
    }
  ];

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0B0F0E" />
        <meta name="google-adsense-account" content="ca-pub-6072468142870937" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="google-adsense-account" content="ca-pub-6072468142870937" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in navigator) { window.addEventListener('load', function() { navigator.serviceWorker.register('/sw.js').catch(function(err){}); }); }`
          }}
        />
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6072468142870937"
        />
      </head>
      <body className="antialiased overflow-x-hidden min-h-screen">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-slate-950 font-bold rounded-lg shadow-lg font-mono">
          Skip to main content
        </a>
        <noscript>
          <div className="p-6 bg-slate-900 text-emerald-400 text-center font-mono text-sm border-b border-emerald-500/30">
            <strong>JumpStreet Tech requires JavaScript to run the trading platform terminal.</strong> Sub-millisecond execution infrastructure & Equinix LD4 hosting portal.
          </div>
        </noscript>
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
