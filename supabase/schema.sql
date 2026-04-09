-- Artisan Cafe — Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- =====================
-- 1. MENU ITEMS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price NUMERIC(10,2) NOT NULL,
  category TEXT NOT NULL DEFAULT 'coffee',
  tags TEXT[] DEFAULT '{}',
  seasonal BOOLEAN DEFAULT false,
  sold_out BOOLEAN DEFAULT false,
  image TEXT DEFAULT '/menu-items/1.jpg',
  image_alt TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================
-- 2. ORDERS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY DEFAULT 'ORD-' || LPAD(nextval('order_seq')::TEXT, 4, '0'),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT DEFAULT '',
  items JSONB NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  pickup_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'ready', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Sequence for order IDs
CREATE SEQUENCE IF NOT EXISTS order_seq START 1;

-- =====================
-- 3. SUBSCRIBERS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT now()
);

-- =====================
-- 4. CONTACT MESSAGES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================
-- 5. ROW LEVEL SECURITY
-- =====================

-- Menu items: anyone can read, only service role can write
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read menu" ON menu_items FOR SELECT USING (true);

-- Orders: only service role can read/write (no public access)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Subscribers: only service role can read/write
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Contact messages: only service role can read/write
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- =====================
-- 6. AUTO-UPDATE TIMESTAMP
-- =====================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- =====================
-- 7. SEED MENU DATA
-- =====================
INSERT INTO menu_items (id, name, description, price, category, tags, seasonal, sold_out, image, image_alt)
VALUES
  ('espresso', 'Espresso', 'Rich, full-bodied double shot pulled from our La Marzocca Linea', 4.00, 'coffee', '{"classic","strong"}', false, false, '/menu-items/1.jpg', 'Espresso double shot'),
  ('cortado', 'Cortado', 'Equal parts espresso and steamed milk — smooth and balanced', 5.00, 'coffee', '{"classic","smooth"}', false, false, '/menu-items/2.jpg', 'Cortado in a small glass'),
  ('oat-latte', 'Oat Milk Latte', 'House-made oat milk, double espresso, light foam', 5.50, 'coffee', '{"popular","dairy-free"}', false, false, '/menu-items/3.jpg', 'Oat milk latte from above'),
  ('cold-brew', 'Cold Brew', '18-hour steeped cold brew. Incredibly smooth, low acidity.', 5.00, 'coffee', '{"cold","popular"}', false, false, '/menu-items/4.jpg', 'Cold brew in a tall glass'),
  ('pour-over', 'Pour Over', 'Single origin, brewed to order. Ask about today''s selection.', 5.50, 'coffee', '{"single-origin","specialty"}', false, false, '/menu-items/5.jpg', 'Pour over brewing'),
  ('matcha-latte', 'Matcha Latte', 'Ceremonial-grade matcha whisked with oat milk', 5.50, 'drinks', '{"popular","dairy-free"}', false, false, '/menu-items/6.jpg', 'Matcha latte'),
  ('chai', 'House Chai', 'Spiced black tea simmered with whole milk and honey', 4.50, 'drinks', '{"warm","spiced"}', false, false, '/menu-items/7.jpg', 'Chai latte'),
  ('fresh-juice', 'Fresh Pressed Juice', 'Seasonal fruit and vegetable blend, cold-pressed daily', 7.00, 'drinks', '{"healthy","cold"}', false, false, '/menu-items/8.jpg', 'Fresh pressed juice'),
  ('croissant', 'Butter Croissant', 'Flaky, golden, house-baked every morning', 4.00, 'food', '{"bakery","morning"}', false, false, '/menu-items/9.jpg', 'Butter croissant'),
  ('avocado-toast', 'Avocado Toast', 'Sourdough, smashed avocado, everything seasoning, microgreens', 12.00, 'food', '{"popular","healthy"}', false, false, '/menu-items/10.jpg', 'Avocado toast'),
  ('granola-bowl', 'House Granola Bowl', 'Greek yogurt, house granola, seasonal fruit, honey drizzle', 9.00, 'food', '{"healthy","morning"}', false, false, '/menu-items/11.jpg', 'Granola bowl'),
  ('sandwich', 'Turkey & Brie', 'Roasted turkey, brie, arugula, fig jam on ciabatta', 13.00, 'food', '{"lunch","popular"}', false, false, '/menu-items/12.jpg', 'Turkey and brie sandwich'),
  ('lavender-latte', 'Lavender Honey Latte', 'Seasonal lavender syrup, local honey, oat milk, espresso', 6.50, 'seasonal', '{"seasonal","floral"}', true, false, '/menu-items/13.jpg', 'Lavender honey latte'),
  ('mango-matcha', 'Mango Matcha Cooler', 'Summer special — mango puree layered with iced matcha', 7.00, 'seasonal', '{"seasonal","cold"}', true, false, '/menu-items/14.jpg', 'Mango matcha drink'),
  ('pumpkin-latte', 'Pumpkin Spice Latte', 'Real pumpkin puree with warming spices and espresso', 6.50, 'seasonal', '{"seasonal","warm"}', true, true, '/menu-items/15.jpg', 'Pumpkin spice latte')
ON CONFLICT (id) DO NOTHING;
