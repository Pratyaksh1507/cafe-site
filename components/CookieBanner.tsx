'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

const COOKIE_KEY = 'artisan-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Small delay so it doesn't flash immediately on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="mx-auto max-w-3xl bg-surface border border-surface-muted rounded-xl shadow-xl p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-text">We use cookies 🍪</h3>
            <p className="mt-1 text-xs text-text-muted leading-relaxed">
              We use essential cookies to keep your cart and login working, and analytics cookies
              to understand how you use our site. Read our{' '}
              <Link href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>{' '}
              for details.
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={accept}
                className="rounded-lg bg-text px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-text/90"
              >
                Accept All
              </button>
              <button
                onClick={decline}
                className="rounded-lg border border-surface-muted bg-surface px-5 py-2 text-xs font-medium text-text transition-colors hover:bg-bg-alt"
              >
                Essential Only
              </button>
            </div>
          </div>
          <button
            onClick={decline}
            className="shrink-0 rounded-md p-1 text-text-light hover:text-text transition-colors"
            aria-label="Dismiss cookie banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
