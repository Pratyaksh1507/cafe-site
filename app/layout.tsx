import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/context/Providers';

export const metadata: Metadata = {
  title: 'Artisan Cafe | Specialty Coffee in Brooklyn',
  description:
    'Neighborhood specialty coffee shop in Brooklyn. Hand-crafted espresso, pastries, and light fare. Open daily.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col antialiased">
        <Providers>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
