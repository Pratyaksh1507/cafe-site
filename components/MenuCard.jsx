'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from './lib/cn';
import CartItemButton from './CartItemButton';

const tagStyles = {
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

export default function MenuCard({ item, priority = false }) {
  return (
    <div
      className={cn(
        'group relative bg-surface rounded-xl border border-surface-muted overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full'
      )}
    >
      {/* Image */}
      <motion.div layoutId={`image-${item.id}`} className="aspect-[4/3] bg-bg-alt overflow-hidden relative">
        <Image
          src={item.image}
          alt={item.imageAlt || item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8+hgAAtsB1P0f95wAAAAASUVORK5CYII="
          className={cn(
            'object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-95',
            item.soldOut && 'grayscale opacity-80'
          )}
        />
      </motion.div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-1 sm:gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-text group-hover:text-accent transition-colors duration-150">
            {item.name}
          </h3>
          <span className="text-sm sm:text-base font-bold tabular-nums text-text shrink-0">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="mt-1 text-xs sm:text-sm text-text-muted leading-snug line-clamp-2 sm:line-clamp-none">{item.description}</p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.filter((t) => t !== 'seasonal').map((tag) => {
            const style = tagStyles[tag];
            if (!style) return null;
            return (
              <span
                key={tag}
                className={cn('inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium', style.bg, style.text)}
              >
                {style.label}
              </span>
            );
          })}
          {item.seasonal && (
            <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-accent/10 text-accent">
              Seasonal
            </span>
          )}
        </div>

        {/* Add to Cart / Sold Out - always at the bottom */}
        <div className="mt-auto pt-4 w-full">
          {item.soldOut ? (
            <div className="w-full flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium bg-surface-muted text-text-light border border-surface-muted cursor-not-allowed select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-text-light/50" />
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
