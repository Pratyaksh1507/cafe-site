'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { MenuItem } from '@/data/menu';
import { cn } from './lib/cn';
import CartItemButton from './CartItemButton';

interface MenuCardProps {
  item: MenuItem;
  priority?: boolean;
}

const tagStyles: Record<string, { bg: string; text: string; label: string }> = {
  vegan: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    label: 'Vegan',
  },
  'gluten-free': {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    label: 'GF',
  },
  seasonal: {
    bg: 'bg-pink-50',
    text: 'text-pink-700',
    label: 'Seasonal',
  },
};

export default function MenuCard({ item, priority = false }: MenuCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={cn(
        'group relative bg-surface rounded-xl border border-surface-muted overflow-hidden transition-shadow duration-200 hover:shadow-lg flex flex-col h-full'
      )}
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-bg-alt overflow-hidden relative">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-muted to-bg flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-text-light/30 border-t-text-light rounded-full animate-spin" />
          </div>
        )}
        {imgError ? (
          <div className="w-full h-full bg-gradient-to-br from-surface-muted to-bg flex items-center justify-center">
            <span className="text-text-light text-sm font-medium">{item.name}</span>
          </div>
        ) : (
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className={cn(
                'object-cover transition-opacity duration-300 group-hover:scale-105 group-hover:brightness-95',
                imgLoaded ? 'opacity-100' : 'opacity-0',
                item.soldOut && 'grayscale opacity-80'
              )}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-text group-hover:text-accent transition-colors duration-150">
            {item.name}
          </h3>
          <span className="text-base font-bold tabular-nums text-text shrink-0">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="mt-1 text-sm text-text-muted leading-snug">{item.description}</p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.filter(t => t !== 'seasonal').map((tag) => {
            const style = tagStyles[tag];
            if (!style) return null;
            return (
              <span
                key={tag}
                className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', style.bg, style.text)}
              >
                {style.label}
              </span>
            );
          })}
          {item.seasonal && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
              Seasonal
            </span>
          )}
        </div>

        {/* Add to Cart / Sold Out - always at the bottom */}
        <div className="mt-auto pt-4 w-full">
          {item.soldOut ? (
            <div className="w-full flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium bg-destructive text-white cursor-not-allowed">
              Sold Out
            </div>
          ) : (
            <CartItemButton
              itemId={item.id}
              name={item.name}
              price={item.price}
            />
          )}
        </div>
      </div>
    </div>
  );
}
