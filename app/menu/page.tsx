'use client';

import { useState } from 'react';
import type { MenuItem } from '@/data/menu';
import { menuItems } from '@/data/menu';
import MenuCard from '@/components/MenuCard';
import CategoryFilter from '@/components/CategoryFilter';
import { FadeIn, StaggerContainer } from '@/components/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuPage() {
  const [active, setActive] = useState('all');

  return (
    <MenuContent active={active} onFilterChange={setActive} />
  );
}

function MenuContent({ active, onFilterChange }: { active: string; onFilterChange: (slug: string) => void }) {
  const filtered: MenuItem[] =
    active === 'all'
      ? menuItems
      : active === 'seasonal'
        ? menuItems.filter((i) => i.seasonal)
        : menuItems.filter((i) => i.category === active);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-bg-alt border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text">
              The Menu
            </h1>
            <p className="mt-4 text-base text-text-muted max-w-lg">
              Seasonal rotations, house-made staples, and everything in between.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.1}>
            <CategoryFilter active={active} onChange={onFilterChange} />
          </FadeIn>

          <div className="mt-8">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-16"
                >
                  <p className="text-text-muted">No items in this category right now.</p>
                </motion.div>
              ) : (
                <StaggerContainer key={active} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((item, index) => (
                    <FadeIn key={item.id}>
                      <MenuCard item={item} priority={index < 6} />
                    </FadeIn>
                  ))}
                </StaggerContainer>
              )}
            </AnimatePresence>
          </div>

          <FadeIn delay={0.3}>
            <p className="mt-12 text-sm text-text-light text-center">
              All prices include tax. Seasonal items subject to availability.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
