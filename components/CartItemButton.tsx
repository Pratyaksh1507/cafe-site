'use client';

import { useCart } from '@/context/CartContext';
import { cn } from './lib/cn';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemButtonProps {
  itemId: string;
  name: string;
  price: number;
  disabled?: boolean;
}

export default function CartItemButton({ itemId, name, price, disabled }: CartItemButtonProps) {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find((item) => item.id === itemId);
  const quantity = cartItem?.quantity ?? 0;

  if (!cartItem) {
    return (
      <button
        type="button"
        onClick={() => addItem(itemId, name, price)}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
          'bg-text text-white hover:bg-accent active:scale-95',
          disabled && 'opacity-40 cursor-not-allowed active:scale-100 hover:bg-text'
        )}
      >
        Add to Cart
      </button>
    );
  }

  return (
    <div className="w-full flex items-center justify-between gap-2 rounded-lg bg-bg-alt px-2 py-1.5">
      <button
        type="button"
        onClick={() => updateQuantity(itemId, quantity - 1)}
        className={cn(
          'flex items-center justify-center h-8 w-8 rounded-md transition-all duration-150 active:scale-95',
          quantity === 1
            ? 'bg-surface-muted text-destructive hover:bg-destructive hover:text-white'
            : 'bg-surface-muted text-text hover:bg-destructive hover:text-white'
        )}
        aria-label={quantity === 1 ? 'Remove from cart' : 'Decrease quantity'}
      >
        {quantity === 1 ? (
          <Trash2 className="h-4 w-4" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </button>
      <span className="text-base font-bold text-text tabular-nums min-w-[1.5rem] text-center">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => updateQuantity(itemId, quantity + 1)}
        className="flex items-center justify-center h-8 w-8 rounded-md bg-text text-white hover:bg-accent transition-all duration-150 active:scale-95"
        aria-label="Add one more to cart"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
