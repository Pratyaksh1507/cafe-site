import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { menuItems as fallbackMenu } from '@/data/menu';
import type { MenuItem } from '@/data/menu';

// Helper: convert DB row (snake_case) to MenuItem (camelCase)
function toMenuItem(row: any): MenuItem {
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

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      // Fallback to hardcoded data if Supabase is not configured yet
      return NextResponse.json({ items: fallbackMenu });
    }

    return NextResponse.json({ items: data.map(toMenuItem) });
  } catch {
    return NextResponse.json({ items: fallbackMenu });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, updates } = body;

    if (!id || !updates) {
      return NextResponse.json({ error: 'Item ID and updates required.' }, { status: 400 });
    }

    // Map camelCase to snake_case for DB
    const dbUpdates: Record<string, any> = {};
    if ('soldOut' in updates) dbUpdates.sold_out = updates.soldOut;
    if ('price' in updates) dbUpdates.price = updates.price;
    if ('name' in updates) dbUpdates.name = updates.name;
    if ('description' in updates) dbUpdates.description = updates.description;
    if ('seasonal' in updates) dbUpdates.seasonal = updates.seasonal;

    const { data, error } = await supabaseAdmin
      .from('menu_items')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: 'Failed to update item.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, item: toMenuItem(data) });
  } catch (error) {
    console.error('Menu API error:', error);
    return NextResponse.json({ error: 'Failed to update menu.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, category, tags, seasonal, image, imageAlt } = body;

    if (!name || !price || !category) {
      return NextResponse.json({ error: 'Name, price, and category are required.' }, { status: 400 });
    }

    const id = String(name).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const { data, error } = await supabaseAdmin
      .from('menu_items')
      .insert({
        id,
        name: String(name).slice(0, 100),
        description: String(description || '').slice(0, 300),
        price: Number(price),
        category: String(category),
        tags: Array.isArray(tags) ? tags : [],
        seasonal: Boolean(seasonal),
        sold_out: false,
        image: image || '/menu-items/1.jpg',
        image_alt: imageAlt || name,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to add item.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, item: toMenuItem(data) }, { status: 201 });
  } catch (error) {
    console.error('Menu API error:', error);
    return NextResponse.json({ error: 'Failed to add item.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Item ID required.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('menu_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json({ error: 'Failed to delete item.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Menu API error:', error);
    return NextResponse.json({ error: 'Failed to delete item.' }, { status: 500 });
  }
}
