import { Metadata } from 'next';
import './globals.css';
import PWAInstallPrompt from '@/components/js/PWAInstallPrompt';
import TelegramVisitorLogger from '@/components/js/TelegramVisitorLogger';


export const metadata: Metadata = {
  title: 'Orca6™ — Automated Trading Platform by Jumpstreet',
  description: 'Orca6 automated trading indicator platform with sub-millisecond latency, VM hosting, and 24/7 VIP support.',
  manifest: "/manifest.json",
  other: {
    'google-adsense-account': 'ca-pub-6072468142870937',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Orca6™",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/js/favicon.ico" sizes="any" />
        <meta name="google-adsense-account" content="ca-pub-6072468142870937" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6072468142870937"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-[#020817] text-slate-50 overflow-x-hidden min-h-screen">
        {children}
        <PWAInstallPrompt />
        <TelegramVisitorLogger />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) { console.log('SW registered: ', registration.scope); },
                    function(err) { console.log('SW registration failed: ', err); }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
