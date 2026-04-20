import { DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/context/Providers';
import CookieBanner from '@/components/CookieBanner';
import SmoothScroller from '@/components/SmoothScroller';
import { siteConfig } from '@/site.config';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Specialty Coffee in Brooklyn`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['specialty coffee', 'Brooklyn cafe', 'artisan coffee', 'single origin', 'coffee shop'],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Specialty Coffee in Brooklyn`,
    description: siteConfig.description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Specialty Coffee in Brooklyn`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Specialty Coffee in Brooklyn`,
    description: siteConfig.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#2b1e16',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans min-h-screen flex flex-col antialiased`}>
        <SmoothScroller>
          <Providers>
            <Navbar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
            <CookieBanner />
          </Providers>
        </SmoothScroller>
      </body>
    </html>
  );
}
