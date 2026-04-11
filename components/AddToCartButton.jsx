'use client';

import { Check, Plus } from 'lucide-react';
import { cn } from './lib/cn';

export default function AddToCartButton({ onAdd, disabled, label = 'Add to Cart' }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={disabled}
      className={cn(
        'w-full flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
        'bg-text text-white hover:bg-accent active:scale-95',
        disabled && 'opacity-40 cursor-not-allowed active:scale-100 hover:bg-text'
      )}
    >
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
}
