'use client';

import { getTodayHours, fullHours, formatTime12Hour } from '@/data/hours';
import { cn } from './lib/cn';

export default function HoursDisplay({ variant = 'full' }) {
  const today = getTodayHours();

  if (variant === 'compact') {
    return (
      <div className="bg-surface rounded-lg border border-surface-muted p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-text">Today&apos;s Hours</p>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full',
              today.isOpen
                ? 'bg-success-bg text-success'
                : 'bg-destructive-bg text-destructive'
            )}
          >
            <span className={cn('h-1.5 w-1.5 rounded-full', today.isOpen ? 'bg-success' : 'bg-destructive')} />
            {today.isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
        <p className="text-sm text-text-muted">
          {formatTime12Hour(today.open)} &mdash; {formatTime12Hour(today.close)}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl border border-surface-muted overflow-hidden">
      <div className="px-5 py-4 border-b border-surface-muted">
        <h3 className="text-lg font-semibold text-text">Opening Hours</h3>
      </div>
      <div className="px-5 py-3">
        <ul className="space-y-2">
          {fullHours.map((day) => {
            const isToday = day.dayIndex === new Date().getDay();
            const currentMinutes = new Date().getHours() * 60 + new Date().getMinutes();
            const openMinutes =
              Number(day.open.split(':')[0]) * 60 + Number(day.open.split(':')[1]);
            const closeMinutes =
              Number(day.close.split(':')[0]) * 60 + Number(day.close.split(':')[1]);
            const isCurrentlyOpen = !isToday
              ? false
              : currentMinutes >= openMinutes && currentMinutes < closeMinutes;

            return (
              <li
                key={day.day}
                className={cn(
                  'flex items-center justify-between py-2 rounded-md px-2 transition-colors',
                  isToday && 'bg-bg-alt font-medium'
                )}
              >
                <span className={cn('text-sm', isToday ? 'text-text' : 'text-text-muted')}>
                  {day.day}
                  {isToday && (
                    <span className="ml-2 text-xs font-normal text-text-light">(Today)</span>
                  )}
                </span>
                <div className="flex items-center gap-2">
                  {isToday && isCurrentlyOpen && (
                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  )}
                  <span className={cn('text-sm tabular-nums text-right min-w-[9rem]', isToday ? 'text-text' : 'text-text-muted')}>
                    {formatTime12Hour(day.open)} &mdash; {formatTime12Hour(day.close)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
