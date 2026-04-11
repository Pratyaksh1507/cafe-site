'use client';

import { useCart } from '@/context/CartContext';
import { cn } from './lib/cn';
import { ShoppingCart } from 'lucide-react';

export default function CartButton({ onClick }) {
  const { totalItems } = useCart();

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative inline-flex items-center justify-center rounded-full p-2 text-text-muted hover:text-text transition-colors duration-150"
      aria-label={`Cart, ${totalItems} items`}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white text-xs font-bold tabular-nums">
          {totalItems}
        </span>
      )}
    </button>
  );
}
