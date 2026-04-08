'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Clock, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';
import { siteConfig } from '@/site.config';

const ADMIN_PASSWORD = 'artisan2024'; // In production, use NextAuth + proper auth

// Mock orders for demo purposes
const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'Priya M.',
    items: [
      { name: 'Oat Milk Latte', qty: 2, price: 5.5 },
      { name: 'Butter Croissant', qty: 1, price: 4.0 },
    ],
    total: 15.0,
    pickupTime: '10:30 AM',
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ORD-002',
    customerName: 'Marcus T.',
    items: [
      { name: 'Cold Brew', qty: 1, price: 5.0 },
      { name: 'Avocado Toast', qty: 1, price: 12.0 },
    ],
    total: 17.0,
    pickupTime: '11:00 AM',
    status: 'ready' as const,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ORD-003',
    customerName: 'Sophia L.',
    items: [{ name: 'Matcha Latte', qty: 1, price: 5.5 }],
    total: 5.5,
    pickupTime: '9:15 AM',
    status: 'completed' as const,
    createdAt: new Date().toISOString(),
  },
];

type OrderStatus = 'pending' | 'ready' | 'completed';

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-800', icon: Clock },
  ready: { label: 'Ready', color: 'bg-blue-100 text-blue-800', icon: AlertTriangle },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [orders, setOrders] = useState(mockOrders);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password.');
    }
  }

  function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  }

  if (!authenticated) {
    return (
      <div className="pt-16 min-h-[80vh] flex items-center justify-center">
        <div className="mx-auto max-w-sm w-full px-4">
          <div className="bg-surface rounded-xl border border-surface-muted p-8 text-center">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-xl font-bold text-text mb-1">{siteConfig.name} Admin</h1>
            <p className="text-sm text-text-muted mb-6">Enter the admin password to continue.</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full rounded-lg border border-surface-muted bg-bg px-4 py-3 text-sm text-text placeholder:text-text-light focus:outline-none focus:border-text transition-colors"
                autoFocus
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-text px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-text/90"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const readyCount = orders.filter((o) => o.status === 'ready').length;
  const completedCount = orders.filter((o) => o.status === 'completed').length;
  const todayRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-bg-alt border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-text-muted">
                Today&apos;s orders and quick actions for {siteConfig.name}.
              </p>
            </div>
            <button
              onClick={() => setAuthenticated(false)}
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Orders', value: orders.length, color: 'text-text' },
              { label: 'Pending', value: pendingCount, color: 'text-amber-600' },
              { label: 'Ready', value: readyCount, color: 'text-blue-600' },
              { label: 'Revenue', value: `${siteConfig.currency.symbol}${todayRevenue.toFixed(2)}`, color: 'text-green-600' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-surface rounded-xl border border-surface-muted p-4 md:p-5"
              >
                <p className="text-xs text-text-muted font-medium">{stat.label}</p>
                <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-text mb-4">Today&apos;s Orders</h2>
          <div className="space-y-4">
            {orders.map((order) => {
              const config = statusConfig[order.status];
              const StatusIcon = config.icon;
              return (
                <div
                  key={order.id}
                  className="bg-surface rounded-xl border border-surface-muted p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-text">{order.id}</span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {config.label}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted">
                        <strong className="text-text">{order.customerName}</strong> — Pickup at {order.pickupTime}
                      </p>
                      <div className="mt-2 text-xs text-text-light">
                        {order.items.map((item, i) => (
                          <span key={i}>
                            {item.qty}× {item.name}
                            {i < order.items.length - 1 && ' · '}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-text">
                        {siteConfig.currency.symbol}{order.total.toFixed(2)}
                      </p>
                      {/* Status Actions */}
                      <div className="mt-3 flex gap-2">
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                          >
                            Mark Ready
                          </button>
                        )}
                        {order.status === 'ready' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                            className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        {order.status === 'completed' && (
                          <span className="text-xs text-text-light">Done ✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
