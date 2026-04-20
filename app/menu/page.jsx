import { supabase } from '@/lib/supabase';
import { menuItems as fallbackMenu } from '@/data/menu';
import MenuContent from './_menu-client';

export const metadata = {
  title: 'Menu',
  description: 'Explore the full Artisan menu — specialty coffees, seasonal drinks, house-made pastries, and fresh food made daily.',
};

export const revalidate = 60; // Cache the menu for 60 seconds

function toMenuItem(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: parseFloat(row.price),
    category: row.category,
    tags: row.tags || [],
    seasonal: row.seasonal,
    soldOut: row.sold_out,
    image: row.image,
    imageAlt: row.image_alt,
  };
}

export default async function MenuPage() {
  let items = fallbackMenu;

  // Skip DB fetch entirely if Supabase isn't configured (local dev without .env.local)
  const hasSupabaseConfig =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

  if (hasSupabaseConfig) {
    try {
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Supabase timeout')), 3000)
      );

      const query = supabase
        .from('menu_items')
        .select('*')
        .order('created_at', { ascending: true });

      const { data, error } = await Promise.race([query, timeout]);

      if (!error && data && data.length > 0) {
        items = data.map(toMenuItem);
      }
    } catch (err) {
      console.warn('Menu fetch skipped (using fallback):', err.message);
    }
  }

  return <MenuContent initialItems={items} />;
}
