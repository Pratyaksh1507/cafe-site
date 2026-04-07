import Link from 'next/link';
import { Coffee, MapPin, Phone, Clock, Instagram } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-bg-alt border-t border-surface-muted mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Logo className="h-9 w-[120px] text-text" />
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Specialty coffee, crafted with care. Serving the neighborhood since 2018.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium text-text mb-3">Navigate</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Menu', href: '/menu' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-text transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-medium text-text mb-3">Visit Us</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>127 Willow Street<br />Brooklyn, NY 11201</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+16465551234" className="hover:text-text transition-colors">
                  (646) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Mon–Fri 7am–6pm</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-medium text-text mb-3">Follow Along</h3>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
            >
              <Instagram className="h-4 w-4" />
              @artisan.cafe
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-surface-muted flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-light">&copy; {new Date().getFullYear()} Artisan Cafe. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-xs text-text-light">
            <Coffee className="h-3 w-3" />
            <span>Brewed in Brooklyn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
