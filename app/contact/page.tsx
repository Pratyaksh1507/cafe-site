'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ExternalLink } from 'lucide-react';
import HoursDisplay from '@/components/HoursDisplay';
import { FadeIn } from '@/components/FadeIn';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email address.';
    if (!form.message.trim()) next.message = 'Message is required.';
    else if (form.message.trim().length < 10)
      next.message = 'Message must be at least 10 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  }

  if (submitted) {
    return (
      <div className="pt-16 min-h-[60vh] flex items-center">
        <FadeIn className="mx-auto max-w-xl text-center px-4">
          <div className="h-16 w-16 rounded-full bg-success-bg flex items-center justify-center mx-auto mb-6">
            <Send className="h-7 w-7 text-success" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-text">Message Sent!</h1>
          <p className="mt-3 text-text-muted">
            Thanks for reaching out, {form.name.split(' ')[0]}. We&apos;ll get back to you within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm({ name: '', email: '', subject: '', message: '' });
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-text px-6 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-text/90"
          >
            Send Another Message
          </button>
        </FadeIn>
      </div>
    );
  }

  const inputClass = (field: keyof FormState) =>
    `w-full rounded-lg border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-light transition-colors duration-150 focus:outline-none ${
      errors[field]
        ? 'border-destructive focus:border-destructive'
        : 'border-surface-muted focus:border-text'
    }`;

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-bg-alt border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text">
              Get in Touch
            </h1>
            <p className="mt-4 text-base text-text-muted max-w-lg">
              Questions, catering requests, or just want to say hi. We read every message.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <FadeIn direction="right" className="lg:col-span-2 space-y-6">
              <HoursDisplay variant="full" />

              {/* Contact Details */}
              <div className="bg-surface rounded-xl border border-surface-muted p-5 space-y-4">
                <h3 className="text-base font-semibold text-text">Details</h3>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-text">127 Willow Street</p>
                    <p className="text-sm text-text-muted">Brooklyn, NY 11201</p>
                  </div>
                </div>

                <a
                  href="tel:+16465551234"
                  className="flex items-center gap-3 group"
                >
                  <Phone className="h-5 w-5 text-accent shrink-0" />
                  <span className="text-sm text-text-muted group-hover:text-text transition-colors">
                    (646) 555-1234
                  </span>
                </a>

                <a
                  href="mailto:hello@artisancafe.com"
                  className="flex items-center gap-3 group"
                >
                  <Mail className="h-5 w-5 text-accent shrink-0" />
                  <span className="text-sm text-text-muted group-hover:text-text transition-colors">
                    hello@artisancafe.com
                  </span>
                </a>
              </div>

              {/* Map */}
              <div className="rounded-xl border border-surface-muted overflow-hidden">
                <iframe
                  title="Artisan Cafe location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.1!2d-73.99!3d40.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQxJzI0LjAiTiA3M8KwNTknMjQuMCJX!5e0!3m2!1sen!2sus!4v1700000000000"
                  className="w-full h-56 md:h-64 border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://maps.google.com/?q=127+Willow+Street+Brooklyn+NY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-surface-muted hover:bg-bg-alt transition-colors text-sm font-medium text-accent"
                >
                  Open in Google Maps
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn direction="left" className="lg:col-span-3">
              <div className="bg-surface rounded-xl border border-surface-muted p-6 md:p-8">
                <h2 className="text-xl font-semibold text-text mb-6">Send Us a Message</h2>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-1.5">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={inputClass('name')}
                      placeholder="Your full name"
                      autoComplete="name"
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 text-xs text-destructive" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={inputClass('email')}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-destructive" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text mb-1.5">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className={inputClass('subject')}
                      placeholder="What's this about?"
                      autoComplete="off"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-1.5">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className={`${inputClass('message')} resize-none`}
                      placeholder="Tell us what's on your mind..."
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-destructive" role="alert">
                        {errors.message}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-text-light">Min 10 characters.</p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-text px-7 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-150 hover:bg-text/90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-30" />
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
