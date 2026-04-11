import Link from 'next/link';
import { Home, ArrowRight, Coffee } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-16 min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
        {/* Decorative coffee icon */}
        <div className="flex justify-center mb-8">
          <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center">
            <Coffee className="h-10 w-10 text-accent" />
          </div>
        </div>

        {/* 404 text */}
        <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">404 Error</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text">
          Page not found.
        </h1>
        <p className="mt-6 text-lg text-text-muted max-w-md mx-auto leading-relaxed">
          Looks like this page wandered off. Maybe it got distracted by the smell of fresh espresso.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-text px-7 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-150 hover:bg-text/90 hover:-translate-y-0.5"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-lg border border-surface-muted bg-surface px-7 py-3.5 text-sm font-medium text-text transition-all duration-150 hover:bg-bg-alt"
          >
            View Menu
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-surface-muted">
          <p className="text-xs text-text-light mb-4">Quick links</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { label: 'About Us', href: '/about' },
              { label: 'Contact', href: '/contact' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-text transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
