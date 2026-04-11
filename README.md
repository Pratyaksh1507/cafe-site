<div align="center">

<img src="https://raw.githubusercontent.com/Pratyaksh1507/cafe-site/main/public/logo.svg" alt="Artisan Cafe" width="72" height="72" />

# Artisan Cafe

**A production-ready, full-stack cafe website built to be sold to real business owners.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-accent.svg)](./LICENSE)

[**Live Demo →**](https://artisancafe.com) &nbsp;·&nbsp; [Features](#-features) &nbsp;·&nbsp; [Tech Stack](#-tech-stack) &nbsp;·&nbsp; [Quick Start](#-quick-start) &nbsp;·&nbsp; [Deployment](#-deployment)

</div>

---

## 📸 Screenshots

| Homepage Hero | Menu Page | Checkout Flow |
|:---:|:---:|:---:|
| ![Hero](docs/screenshots/hero.png) | ![Menu](docs/screenshots/menu.png) | ![Checkout](docs/screenshots/checkout.png) |

---

## ✨ Features

### 🛒 Customer-Facing
- **Cinematic Hero** — Full-bleed coffee photography with animated headline, social proof bar, and dual CTAs
- **Live Menu** — Animated category filtering, image zoom-on-hover, sold-out states, and real-time data from Supabase
- **Pickup Ordering** — Multi-step checkout (Review → Pickup Time → Payment) with 15-minute slot generation based on today's actual hours
- **Real-time Open/Closed Indicator** — Navbar + hero badge that accurately shows status and closing/opening times
- **Cart System** — Persistent, cross-route cart powered by React Context with a slide-out drawer
- **Newsletter Signup** — Email capture with validation, rate-limiting, and Supabase storage
- **Contact Form** — Validated form with honeypot spam protection and server-side rate limiting
- **Testimonials with Star Ratings** — Social proof section with 5-star reviews
- **Fully Responsive** — Mobile-first design, pixel-perfect from 320px to 4K

### 🔧 Admin Dashboard (`/admin`)
- **Password-protected** with rate-limited login (5 attempts, 15-min lockout)
- **Live Order Management** — View, mark ready, and complete incoming orders
- **Menu Management** — Toggle sold-out status, edit prices in-place, add/remove items in real-time
- **Revenue & Stats** — Today's order count, pending count, revenue, sold-out count at a glance

### 🏗️ Technical Quality
- **Full SEO** — Per-page metadata, Open Graph, Twitter Card, theme-color, sitemap-ready
- **Custom 404** — Brand-consistent "Page not found" with on-brand copy and recovery CTAs
- **Accessibility** — Skip-to-content link, `aria-` attributes, keyboard navigation, `focus-visible` ring, `prefers-reduced-motion` support
- **Security** — API rate limiting, honeypot fields, input sanitization, Supabase Row Level Security, environment variable separation

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) — App Router, Server Components, API Routes |
| **Language** | JavaScript (ES2022+) with JSDoc comments |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) with a custom warm-tone design system |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) — stagger, fade, layout animations |
| **Database** | [Supabase](https://supabase.com/) — PostgreSQL, Row Level Security |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Font** | [DM Sans](https://fonts.google.com/specimen/DM+Sans) — Google Fonts |
| **Utilities** | `clsx`, `tailwind-merge` for conditional class management |

---

## 📁 Project Structure

```
cafe-site/
├── app/                        # Next.js App Router
│   ├── layout.jsx              # Root layout + global metadata (SEO, OG, Twitter)
│   ├── page.jsx                # Homepage — hero, features, menu preview, testimonials
│   ├── not-found.jsx           # Custom branded 404 page
│   ├── menu/
│   │   ├── page.jsx            # Server wrapper (metadata export)
│   │   └── _menu-client.jsx    # Client component — animated filtering
│   ├── checkout/page.jsx       # Multi-step checkout flow
│   ├── about/page.jsx          # Story, values, team
│   ├── contact/page.jsx        # Contact form with validation
│   ├── admin/page.jsx          # Password-protected admin dashboard
│   ├── privacy/page.jsx        # Privacy policy
│   ├── terms/page.jsx          # Terms of service
│   ├── api/
│   │   ├── contact/route.js    # Contact form handler (sanitize, rate-limit, Supabase)
│   │   ├── orders/route.js     # Order creation (rate-limit, Supabase insert)
│   │   ├── subscribe/route.js  # Newsletter (upsert, disposable email block)
│   │   └── admin/
│   │       ├── auth/route.js   # Admin login (rate-limited brute-force protection)
│   │       ├── menu/route.js   # CRUD — GET/PATCH/POST/DELETE menu items
│   │       └── orders/route.js # GET orders + PATCH status
│   └── globals.css             # Tailwind directives, custom scrollbar, fonts
│
├── components/                 # Reusable UI components
│   ├── Navbar.jsx              # Fixed, blur, scroll-aware, mobile menu, cart trigger
│   ├── Footer.jsx              # Auto-generated hours, links, newsletter, socials
│   ├── MenuCard.jsx            # Image, tags, sold-out state, cart interaction
│   ├── CartDrawer.jsx          # Slide-out cart with item controls
│   ├── CartItemButton.jsx      # +/− quantity controls with Framer animations
│   ├── CategoryFilter.jsx      # Pill-style animated filter tabs
│   ├── FadeIn.jsx              # Scroll-triggered fade/slide animation wrapper
│   ├── HoursDisplay.jsx        # Full/compact hours table from data
│   ├── CookieBanner.jsx        # GDPR-compliant cookie consent banner
│   ├── NewsletterSignup.jsx    # Email input with inline validation
│   └── Logo.jsx                # SVG inline logo component
│
├── context/
│   ├── CartContext.jsx         # Cart state (add, remove, update qty, persist)
│   └── Providers.jsx           # Wraps app with all providers
│
├── data/
│   ├── menu.js                 # Menu items with images, tags, seasonal flags
│   └── hours.js                # Weekly hours + isOpen logic + slot generation
│
├── lib/
│   └── supabase.js             # Supabase client (anon + service-role)
│
├── supabase/
│   └── schema.sql              # Full DB schema — run this to set up your project
│
├── public/
│   └── menu-items/             # 15 curated food/drink photos (1.jpg – 15.jpg)
│
├── site.config.js              # 🔑 Single source of truth — name, address, socials, features
├── tailwind.config.js          # Custom design tokens (colors, fonts, shadows)
├── jsconfig.json               # Path alias: @/ → root
├── next.config.js              # Security headers, image domains
├── .env.example                # Environment variable template
└── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- A [Supabase](https://supabase.com/) project (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/Pratyaksh1507/cafe-site.git
cd cafe-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=your-secure-password
```

### 4. Set up the database

In your Supabase Dashboard, open the **SQL Editor** and run the contents of:

```
supabase/schema.sql
```

This creates all tables (`menu_items`, `orders`, `contact_messages`, `subscribers`) with Row Level Security policies.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the site is live.  
Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🎨 Customizing for a New Client

Everything needed to white-label this for a new cafe owner lives in a **single file**:

```js
// site.config.js
export const siteConfig = {
  name: 'Artisan',                  // ← Business name
  tagline: 'Coffee crafted with intention.',
  address: { street: '127 Willow St', city: 'Brooklyn', ... },
  phone: { display: '(646) 555-1234', href: 'tel:+16465551234' },
  email: 'hello@artisancafe.com',
  socials: { instagram: '@artisan.cafe', instagramUrl: '...' },
  features: {
    onlineOrdering: true,           // ← Toggle entire features on/off
    newsletter: true,
    cookieBanner: true,
  },
  currency: { symbol: '$', code: 'USD' },
};
```

Then swap:
- `public/logo.svg` — your client's logo
- `data/menu.js` — their actual menu
- `data/hours.js` — their real opening hours
- `public/menu-items/*.jpg` — their food photos

---

## 🌍 Deployment

This project is optimized for **[Vercel](https://vercel.com/)** (zero config).

### Deploy to Vercel

```bash
npm run build   # verify no build errors first
```

Then push to GitHub and connect the repo in the [Vercel Dashboard](https://vercel.com/new).

**Set these environment variables in Vercel → Settings → Environment Variables:**

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only, never expose) |
| `ADMIN_PASSWORD` | Password to access `/admin` dashboard |

---

## 🗄️ Database Schema

```
┌─────────────────┐   ┌─────────────────┐
│   menu_items    │   │     orders      │
│─────────────────│   │─────────────────│
│ id (text, PK)   │   │ id (uuid, PK)   │
│ name            │   │ customer_name   │
│ description     │   │ customer_email  │
│ price (decimal) │   │ customer_phone  │
│ category        │   │ items (jsonb)   │
│ tags (text[])   │   │ total (decimal) │
│ seasonal (bool) │   │ pickup_time     │
│ sold_out (bool) │   │ status          │
│ image           │   │ created_at      │
└─────────────────┘   └─────────────────┘

┌──────────────────────┐   ┌──────────────────────┐
│  contact_messages    │   │     subscribers      │
│──────────────────────│   │──────────────────────│
│ id (uuid, PK)        │   │ id (uuid, PK)         │
│ name                 │   │ email (unique)        │
│ email                │   │ created_at            │
│ subject              │   └──────────────────────┘
│ message              │
│ created_at           │
└──────────────────────┘
```

---

## 📜 License

MIT License — see [LICENSE](./LICENSE) for full text.  
Free to use, modify, and sell with attribution.

---

<div align="center">
  <p>Built with ☕ and a lot of intention.</p>
  <p>
    <a href="https://github.com/Pratyaksh1507/cafe-site/issues">Report a Bug</a> ·
    <a href="https://github.com/Pratyaksh1507/cafe-site/issues">Request a Feature</a>
  </p>
</div>
