'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, ArrowLeft, ArrowRight, CreditCard, CheckCircle2, Lock, Shield } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/site.config';
import { getStoreStatus, fullHours } from '@/data/hours';
import Image from 'next/image';

const itemIdToImageNumber = {
  espresso: '1', cortado: '2', 'oat-latte': '3', 'cold-brew': '4',
  'pour-over': '5', 'matcha-latte': '6', chai: '7', 'fresh-juice': '8',
  croissant: '9', 'avocado-toast': '10', 'granola-bowl': '11',
  sandwich: '12', 'lavender-latte': '13', 'mango-matcha': '14', 'açaí-bowl': '15',
};

function generatePickupSlots() {
  const now = new Date();
  const dayIndex = now.getDay();
  const todayHours = fullHours.find((h) => h.dayIndex === dayIndex);
  if (!todayHours) return [];

  const [closeH, closeM] = todayHours.close.split(':').map(Number);
  const slots = [];

  // Start from next 15-min interval
  let startMin = now.getMinutes();
  startMin = Math.ceil(startMin / 15) * 15 + 15; // next slot + 15 min prep
  let startH = now.getHours();
  if (startMin >= 60) {
    startMin -= 60;
    startH += 1;
  }

  for (let h = startH; h <= closeH; h++) {
    for (let m = h === startH ? startMin : 0; m < 60; m += 15) {
      if (h === closeH && m > closeM - 15) break;
      const hour12 = h % 12 || 12;
      const ampm = h < 12 ? 'AM' : 'PM';
      const minStr = m.toString().padStart(2, '0');
      slots.push(`${hour12}:${minStr} ${ampm}`);
    }
  }

  return slots;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState('review'); // 'review' | 'pickup' | 'payment' | 'success'
  const [pickupTime, setPickupTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pickupSlots = generatePickupSlots();
  const status = getStoreStatus();

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="pt-16 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-xl text-center px-4">
          <h1 className="text-2xl font-bold tracking-tight text-text">Your cart is empty</h1>
          <p className="mt-3 text-text-muted text-sm">Add some items from the menu first.</p>
          <button
            onClick={() => router.push('/menu')}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-text px-6 py-3 text-sm font-medium text-white transition-all hover:bg-text/90"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  async function handlePayment() {
    setLoading(true);
    try {
      // Simulate real payment delay, then post to our fake backend
      await new Promise((r) => setTimeout(r, 1000));
      
      const payload = {
        customerName,
        customerEmail,
        customerPhone,
        pickupTime,
        items,
        total: totalPrice,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Order failed');

      clearCart();
      setStep('success');
    } catch (error) {
      alert('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-bg-alt border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-text">Checkout</h1>
          {/* Step Progress */}
          <div className="mt-6 flex items-center gap-2 text-xs">
            {['review', 'pickup', 'payment'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                    step === s
                      ? 'bg-text text-white'
                      : step === 'success' || (['review', 'pickup', 'payment'].indexOf(step) > i)
                        ? 'bg-accent/20 text-accent'
                        : 'bg-surface-muted text-text-light'
                  }`}
                >
                  {(['review', 'pickup', 'payment'].indexOf(step) > i) || step === 'success' ? '✓' : i + 1}
                </div>
                <span className={`hidden sm:inline text-sm ${step === s ? 'text-text font-medium' : 'text-text-muted'}`}>
                  {s === 'review' ? 'Review' : s === 'pickup' ? 'Pickup Time' : 'Payment'}
                </span>
                {i < 2 && <div className="w-8 h-px bg-surface-muted" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Step 1: Review */}
          {step === 'review' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-text">Review Your Order</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-surface rounded-xl border border-surface-muted p-4"
                  >
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={`/menu-items/${itemIdToImageNumber[item.id] || '1'}.jpg`}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text truncate">{item.name}</p>
                      <p className="text-xs text-text-muted">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-text tabular-nums">
                      {siteConfig.currency.symbol}{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-surface-muted pt-4 flex items-center justify-between">
                <span className="text-base font-semibold text-text">Total</span>
                <span className="text-lg font-bold text-text tabular-nums">
                  {siteConfig.currency.symbol}{totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => setStep('pickup')}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-text px-7 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-text/90 hover:shadow-lg"
              >
                Continue to Pickup Time
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Step 2: Pickup Time */}
          {step === 'pickup' && (
            <div className="space-y-6">
              <button
                onClick={() => setStep('review')}
                className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back to review
              </button>

              <h2 className="text-lg font-semibold text-text">Choose Pickup Time</h2>

              {!status.isOpen ? (
                <div className="bg-destructive-bg text-destructive rounded-xl p-4 text-sm">
                  We&apos;re currently closed. {status.text}
                </div>
              ) : pickupSlots.length === 0 ? (
                <div className="bg-destructive-bg text-destructive rounded-xl p-4 text-sm">
                  No more pickup slots available today. Please try again tomorrow.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {pickupSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setPickupTime(slot)}
                      className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                        pickupTime === slot
                          ? 'border-text bg-text text-white'
                          : 'border-surface-muted bg-surface text-text hover:border-text/30'
                      }`}
                    >
                      <Clock className="h-3 w-3 inline mr-1.5" />
                      {slot}
                    </button>
                  ))}
                </div>
              )}

              {/* Customer Info */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-semibold text-text">Your Details</h3>
                <input
                  type="text"
                  placeholder="Your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-lg border border-surface-muted bg-surface px-4 py-3 text-sm text-text placeholder:text-text-light focus:outline-none focus:border-text transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email for confirmation"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full rounded-lg border border-surface-muted bg-surface px-4 py-3 text-sm text-text placeholder:text-text-light focus:outline-none focus:border-text transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full rounded-lg border border-surface-muted bg-surface px-4 py-3 text-sm text-text placeholder:text-text-light focus:outline-none focus:border-text transition-colors"
                />
              </div>

              <button
                onClick={() => setStep('payment')}
                disabled={!pickupTime || !customerName || !customerEmail}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-text px-7 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-text/90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 'payment' && (
            <div className="space-y-6">
              <button
                onClick={() => setStep('pickup')}
                className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              <h2 className="text-lg font-semibold text-text">Payment</h2>

              {/* Order Summary Card */}
              <div className="bg-surface rounded-xl border border-surface-muted p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Items ({items.reduce((a, b) => a + b.quantity, 0)})</span>
                  <span className="text-text font-medium">{siteConfig.currency.symbol}{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Pickup</span>
                  <span className="text-text font-medium">Today at {pickupTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Name</span>
                  <span className="text-text font-medium">{customerName}</span>
                </div>
                <div className="border-t border-surface-muted pt-3 flex justify-between">
                  <span className="text-base font-semibold text-text">Total</span>
                  <span className="text-lg font-bold text-text">{siteConfig.currency.symbol}{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Form */}
              <div className="bg-surface rounded-xl border border-surface-muted p-5 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-accent" />
                    <span className="text-sm font-semibold text-text">Card Details</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-success font-medium">
                    <Lock className="h-3 w-3" />
                    Secure &amp; Encrypted
                  </div>
                </div>

                {/* Card number */}
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full rounded-lg border border-surface-muted bg-bg px-4 py-3 text-sm text-text placeholder:text-text-light focus:outline-none focus:border-text transition-colors"
                      readOnly
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <span className="text-[10px] font-bold text-text-light bg-surface-muted px-1.5 py-0.5 rounded">VISA</span>
                      <span className="text-[10px] font-bold text-text-light bg-surface-muted px-1.5 py-0.5 rounded">MC</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full rounded-lg border border-surface-muted bg-bg px-4 py-3 text-sm text-text placeholder:text-text-light focus:outline-none focus:border-text transition-colors"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1.5">CVV</label>
                    <input
                      type="text"
                      placeholder="•••"
                      className="w-full rounded-lg border border-surface-muted bg-bg px-4 py-3 text-sm text-text placeholder:text-text-light focus:outline-none focus:border-text transition-colors"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Shield className="h-4 w-4 text-success shrink-0" />
                  <p className="text-xs text-text-light">Your payment information is encrypted and never stored on our servers.</p>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-accent-light hover:shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-30" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Pay {siteConfig.currency.symbol}{totalPrice.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="h-16 w-16 rounded-full bg-success-bg flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-text">Order Confirmed!</h2>
              <p className="mt-3 text-text-muted">
                Thanks, {customerName.split(' ')[0]}! Your order will be ready for pickup at <strong>{pickupTime}</strong>.
              </p>
              <p className="mt-1 text-sm text-text-light">
                A confirmation has been sent to {customerEmail}.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => router.push('/menu')}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-text px-6 py-3 text-sm font-medium text-white transition-all hover:bg-text/90"
                >
                  Order More
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-surface-muted bg-surface px-6 py-3 text-sm font-medium text-text transition-all hover:bg-bg-alt"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
