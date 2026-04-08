'use client';

import { useState } from 'react';
import { Send, Check } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus('success');
      setMessage(data.message);
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-sm text-success">
        <Check className="h-4 w-4" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === 'error') setStatus('idle');
        }}
        className="flex-1 min-w-0 rounded-lg border border-surface-muted bg-surface px-3 py-2 text-xs text-text placeholder:text-text-light focus:outline-none focus:border-text transition-colors"
        required
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="shrink-0 rounded-lg bg-text px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-text/90 disabled:opacity-50"
        aria-label="Subscribe"
      >
        {status === 'loading' ? (
          <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-30" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        ) : (
          <Send className="h-3.5 w-3.5" />
        )}
      </button>
      {status === 'error' && (
        <p className="text-xs text-destructive mt-1">{message}</p>
      )}
    </form>
  );
}
