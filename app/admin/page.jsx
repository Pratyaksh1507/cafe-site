'use client';

import { useState, useEffect } from 'react';
import {
  Clock, CheckCircle2, AlertTriangle, Lock, Coffee,
  ToggleLeft, ToggleRight, DollarSign, Pencil, Plus, Trash2,
  ShoppingBag, UtensilsCrossed
} from 'lucide-react';
import { siteConfig } from '@/site.config';

// No more mockOrders! We fetch from Supabase.
const statusConfig = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-800', icon: Clock },
  ready: { label: 'Ready', color: 'bg-blue-100 text-blue-800', icon: AlertTriangle },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [tab, setTab] = useState('orders'); // 'orders' | 'menu'
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '', description: '', price: '', category: 'coffee', seasonal: false,
  });

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Authentication failed.');
      } else {
        setAuthenticated(true);
        setPassword('');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Fetch data when authenticated
  useEffect(() => {
    if (authenticated) {
      fetchMenu();
      fetchOrders();
    }
  }, [authenticated]);

  async function fetchOrders() {
    setOrdersLoading(true);
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (res.ok && data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Failed to fetch orders');
    } finally {
      setOrdersLoading(false);
    }
  }

  async function fetchMenu() {
    setMenuLoading(true);
    try {
      const res = await fetch('/api/admin/menu');
      const data = await res.json();
      setMenuItems(data.items);
    } catch {
      console.error('Failed to fetch menu');
    } finally {
      setMenuLoading(false);
    }
  }

  async function toggleSoldOut(id, currentStatus) {
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates: { soldOut: !currentStatus } }),
      });
      if (res.ok) {
        setMenuItems((prev) =>
          prev.map((item) => item.id === id ? { ...item, soldOut: !currentStatus } : item)
        );
      }
    } catch {
      alert('Failed to update item.');
    }
  }

  async function updatePrice(id) {
    const price = parseFloat(editPrice);
    if (isNaN(price) || price <= 0) return;
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates: { price } }),
      });
      if (res.ok) {
        setMenuItems((prev) =>
          prev.map((item) => item.id === id ? { ...item, price } : item)
        );
        setEditingItem(null);
        setEditPrice('');
      }
    } catch {
      alert('Failed to update price.');
    }
  }

  async function addItem(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newItem,
          price: parseFloat(newItem.price),
          tags: [],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setMenuItems((prev) => [...prev, data.item]);
        setNewItem({ name: '', description: '', price: '', category: 'coffee', seasonal: false });
        setShowAddForm(false);
      }
    } catch {
      alert('Failed to add item.');
    }
  }

  async function deleteItem(id) {
    if (!confirm('Remove this item from the menu?')) return;
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMenuItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch {
      alert('Failed to delete item.');
    }
  }

  async function updateOrderStatus(orderId, newStatus) {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch {
      alert('Failed to update order status');
    }
  }

  // ── Login Screen ──
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
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full rounded-lg border border-surface-muted bg-bg px-4 py-3 text-sm text-text placeholder:text-text-light focus:outline-none focus:border-text transition-colors"
                autoFocus
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-text px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-text/90 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const readyCount = orders.filter((o) => o.status === 'ready').length;
  const todayRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const soldOutCount = menuItems.filter((i) => i.soldOut).length;

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
                Manage orders and menu for {siteConfig.name}.
              </p>
            </div>
            <button
              onClick={() => setAuthenticated(false)}
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-1 bg-surface rounded-lg p-1 w-fit">
            <button
              onClick={() => setTab('orders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === 'orders' ? 'bg-text text-white' : 'text-text-muted hover:text-text'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Orders
            </button>
            <button
              onClick={() => setTab('menu')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === 'menu' ? 'bg-text text-white' : 'text-text-muted hover:text-text'
              }`}
            >
              <UtensilsCrossed className="h-4 w-4" />
              Menu
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
              { label: 'Revenue', value: `${siteConfig.currency.symbol}${todayRevenue.toFixed(2)}`, color: 'text-green-600' },
              { label: 'Sold Out', value: soldOutCount, color: 'text-red-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface rounded-xl border border-surface-muted p-4 md:p-5">
                <p className="text-xs text-text-muted font-medium">{stat.label}</p>
                <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORDERS TAB ── */}
      {tab === 'orders' && (
        <section className="pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold text-text mb-4">Today&apos;s Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => {
                const config = statusConfig[order.status] || statusConfig['pending'];
                const StatusIcon = config.icon;
                return (
                  <div key={order.id} className="bg-surface rounded-xl border border-surface-muted p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-text">{order.id}</span>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
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
      )}

      {/* ── MENU TAB ── */}
      {tab === 'menu' && (
        <section className="pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text">Menu Items ({menuItems.length})</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-medium text-white hover:bg-accent-light transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Item
              </button>
            </div>

            {/* Add New Item Form */}
            {showAddForm && (
              <form onSubmit={addItem} className="bg-surface rounded-xl border border-surface-muted p-5 mb-6 space-y-4">
                <h3 className="text-sm font-semibold text-text">New Menu Item</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Item name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="rounded-lg border border-surface-muted bg-bg px-3 py-2.5 text-sm text-text placeholder:text-text-light focus:outline-none focus:border-text"
                    required
                  />
                  <input
                    type="number"
                    step="0.5"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="rounded-lg border border-surface-muted bg-bg px-3 py-2.5 text-sm text-text placeholder:text-text-light focus:outline-none focus:border-text"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full rounded-lg border border-surface-muted bg-bg px-3 py-2.5 text-sm text-text placeholder:text-text-light focus:outline-none focus:border-text"
                />
                <div className="flex items-center gap-4">
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="rounded-lg border border-surface-muted bg-bg px-3 py-2.5 text-sm text-text focus:outline-none focus:border-text"
                  >
                    <option value="coffee">Coffee</option>
                    <option value="drinks">Tea &amp; More</option>
                    <option value="food">Food</option>
                    <option value="seasonal">Seasonal</option>
                  </select>
                  <label className="flex items-center gap-2 text-sm text-text-muted">
                    <input
                      type="checkbox"
                      checked={newItem.seasonal}
                      onChange={(e) => setNewItem({ ...newItem, seasonal: e.target.checked })}
                      className="rounded"
                    />
                    Seasonal
                  </label>
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="rounded-lg bg-text px-4 py-2 text-xs font-medium text-white hover:bg-text/90 transition-colors">
                    Add to Menu
                  </button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="rounded-lg border border-surface-muted px-4 py-2 text-xs font-medium text-text-muted hover:text-text transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {menuLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-text-light/30 border-t-text-light rounded-full animate-spin mx-auto" />
                <p className="mt-3 text-sm text-text-muted">Loading menu...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-surface rounded-xl border border-surface-muted p-4 flex items-center gap-4 ${
                      item.soldOut ? 'opacity-60' : ''
                    }`}
                  >
                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-text truncate">{item.name}</h3>
                        <span className="text-xs text-text-light capitalize px-2 py-0.5 bg-bg-alt rounded-full">
                          {item.category}
                        </span>
                        {item.seasonal && (
                          <span className="text-xs text-accent px-2 py-0.5 bg-accent/10 rounded-full">Seasonal</span>
                        )}
                      </div>
                      <p className="text-xs text-text-muted mt-0.5 truncate">{item.description}</p>
                    </div>

                    {/* Price */}
                    <div className="shrink-0">
                      {editingItem === item.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            step="0.5"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-20 rounded border border-surface-muted bg-bg px-2 py-1 text-sm text-text focus:outline-none focus:border-text"
                            autoFocus
                          />
                          <button
                            onClick={() => updatePrice(item.id)}
                            className="text-xs text-accent hover:text-accent-light"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => { setEditingItem(null); setEditPrice(''); }}
                            className="text-xs text-text-light hover:text-text"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setEditingItem(item.id); setEditPrice(item.price.toString()); }}
                          className="text-sm font-bold text-text hover:text-accent transition-colors flex items-center gap-1"
                          title="Click to edit price"
                        >
                          {siteConfig.currency.symbol}{item.price.toFixed(2)}
                          <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                        </button>
                      )}
                    </div>

                    {/* Sold Out Toggle */}
                    <button
                      onClick={() => toggleSoldOut(item.id, item.soldOut)}
                      className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        item.soldOut
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {item.soldOut ? (
                        <>
                          <ToggleLeft className="h-4 w-4" />
                          Sold Out
                        </>
                      ) : (
                        <>
                          <ToggleRight className="h-4 w-4" />
                          Available
                        </>
                      )}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="shrink-0 p-1.5 rounded-lg text-text-light hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
