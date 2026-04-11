'use client';

import { categories } from '@/data/menu';
import { cn } from './lib/cn';

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          role="tab"
          aria-selected={active === cat.slug}
          onClick={() => onChange(cat.slug)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-all duration-150',
            active === cat.slug
              ? 'bg-text text-white shadow-md'
              : 'bg-surface text-text-muted border border-surface-muted hover:bg-bg-alt hover:text-text'
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
