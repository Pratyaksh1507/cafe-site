'use client';

import { useState, useEffect } from 'react';
import { getStoreStatus } from '@/data/hours';

export default function StoreStatusBadge() {
  const [status, setStatus] = useState({ isOpen: false, text: 'Loading...' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStatus(getStoreStatus());
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering the colors until the browser confirms the time
  if (!mounted) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm bg-black/20 text-white/50 border border-white/10">
        Loading status...
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm ${
        status.isOpen
          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          : 'bg-red-500/20 text-red-300 border border-red-500/30'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full animate-pulse ${
          status.isOpen ? 'bg-emerald-400' : 'bg-red-400'
        }`}
      />
      {status.text}
    </span>
  );
}
