import Link from 'next/link';
import { Coffee, MapPin, Phone, Mail, Instagram } from 'lucide-react';
import Logo from './Logo';
import { siteConfig } from '@/site.config';
import NewsletterSignup from './NewsletterSignup';
import { fullHours, formatTime12Hour } from '@/data/hours';

// Build a compact hours summary (e.g. "Mon–Fri 7am–6pm, Sat 8am–8pm, Sun 9am–4pm")
function buildHoursSummary() {
  // Group consecutive days with same hours
  const groups = [];
  let i = 0;
  // Reorder so Mon=0 in display (data has Sun=0)
  const ordered = [1,2,3,4,5,6,0].map((di) => fullHours.find((h) => h.dayIndex === di));

  while (i < ordered.length) {
    const cur = ordered[i];
    let j = i + 1;
    while (j < ordered.length && ordered[j].open === cur.open && ordered[j].close === cur.close) {
      j++;
    }
    const shortDay = (d) => d.day.slice(0, 3);
    const label = j - i > 1 ? `${shortDay(cur)}–${shortDay(ordered[j - 1])}` : shortDay(cur);
    groups.push(`${label} ${formatTime12Hour(cur.open).replace(':00', '').replace(' ', '')}–${formatTime12Hour(cur.close).replace(':00', '').replace(' ', '')}`);
    i = j;
  }
  return groups;
}

export default function Footer() {
  const hoursSummary = buildHoursSummary();

  return (
    <footer className="bg-bg-alt border-t border-surface-muted mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo className="h-9 w-[120px] text-text" />
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Specialty coffee, crafted with care. Serving the neighborhood since 2018.
            </p>
            {/* Social */}
            <a
              href={siteConfig.socials.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-text-muted hover:text-text transition-colors"
            >
              <Instagram className="h-4 w-4" />
              {siteConfig.socials.instagram}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">Navigate</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'Menu', href: '/menu' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Order Online', href: '/menu' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-text transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">Visit Us</h3>
            <ul className="space-y-3 text-sm text-text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <a
                  href={siteConfig.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text transition-colors leading-snug"
                >
                  {siteConfig.address.street}<br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href={siteConfig.phone.href} className="hover:text-text transition-colors">
                  {siteConfig.phone.display}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 shrink-0 mt-0.5 text-accent" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-text transition-colors break-all">
                  {siteConfig.email}
                </a>
              </li>
            </ul>

            {/* Hours — pulled from data, always accurate */}
            <div className="mt-4 pt-4 border-t border-surface-muted">
              <p className="text-xs font-semibold text-text mb-2 uppercase tracking-wide">Hours</p>
              <ul className="space-y-1">
                {hoursSummary.map((line, i) => (
                  <li key={i} className="text-xs text-text-muted">{line}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-2">Stay in the Loop</h3>
            <p className="text-xs text-text-muted mb-4 leading-relaxed">
              Get exclusive deals, seasonal drops, and early access to new menu items.
            </p>
            <NewsletterSignup />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-surface-muted flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-light">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-text-light">
            <Link href="/privacy" className="hover:text-text transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-text transition-colors">Terms of Service</Link>
            <span className="flex items-center gap-1.5">
              <Coffee className="h-3 w-3" />
              Brewed in Brooklyn
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
