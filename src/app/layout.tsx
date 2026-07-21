import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Orca6™ — Automated Trading Platform by Jumpstreet',
  description: 'Orca6 automated trading indicator platform with sub-millisecond latency, VM hosting, and 24/7 VIP support.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/js/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased bg-[#020817] text-slate-50 overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
