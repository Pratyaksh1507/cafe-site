'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { cn } from './lib/cn';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/40 z-50 transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-surface shadow-xl transform transition-transform duration-200 ease-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-muted">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-text-muted" />
              <h2 className="text-lg font-semibold text-text">Your Cart</h2>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent/10 text-accent text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-text-muted hover:text-text transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-12 w-12 text-text-light mb-3" />
                <p className="text-text-muted text-base font-medium">Your cart is empty</p>
                <p className="text-text-light text-sm mt-1">Browse the menu and add some items!</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 py-3 px-4 mb-3 last:mb-0 bg-bg rounded-xl border border-surface-muted shadow-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text truncate">{item.name}</p>
                      <p className="text-sm text-text-muted">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          item.quantity <= 1
                            ? removeItem(item.id)
                            : updateQuantity(item.id, item.quantity - 1)
                        }
                        className="inline-flex items-center justify-center h-7 w-7 rounded-full border border-surface-muted text-text-muted hover:text-text hover:border-text transition-colors"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="inline-flex items-center justify-center h-7 w-7 rounded-full border border-surface-muted text-text-muted hover:text-text hover:border-text transition-colors"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Line total */}
                    <span className="w-16 text-right text-sm font-semibold tabular-nums text-text">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-surface-muted px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-medium text-text">Total</span>
                <span className="text-lg font-bold tabular-nums text-text">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => alert('Checkout flow is currently a mock. Integration coming soon!')}
                className={cn(
                  'w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-semibold transition-all duration-150',
                  'bg-text text-white hover:bg-accent active:scale-95'
                )}
              >
                Checkout
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="w-full mt-2 text-sm text-text-muted hover:text-destructive transition-colors py-1"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>
      </aside>
    </>,
    document.body
  );
}
