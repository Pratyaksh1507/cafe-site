import { NextResponse } from 'next/server';
import { menuItems as defaultMenu } from '@/data/menu';
import type { MenuItem } from '@/data/menu';

// In-memory menu state — in production, replace with Neon DB + Prisma
// This persists across requests but resets on redeploy
let liveMenu: MenuItem[] = [...defaultMenu];

export async function GET() {
  return NextResponse.json({ items: liveMenu });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, updates } = body;

    if (!id || !updates) {
      return NextResponse.json({ error: 'Item ID and updates required.' }, { status: 400 });
    }

    const index = liveMenu.findIndex((item) => item.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found.' }, { status: 404 });
    }

    // Only allow safe fields to be updated
    const allowedFields = ['soldOut', 'price', 'name', 'description', 'seasonal'];
    const safeUpdates: Partial<MenuItem> = {};
    for (const key of allowedFields) {
      if (key in updates) {
        (safeUpdates as any)[key] = updates[key];
      }
    }

    liveMenu[index] = { ...liveMenu[index], ...safeUpdates };

    console.log(`📝 Menu updated: ${liveMenu[index].name}`, safeUpdates);

    return NextResponse.json({ success: true, item: liveMenu[index] });
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

    const newItem: MenuItem = {
      id: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      name: String(name).slice(0, 100),
      description: String(description || '').slice(0, 300),
      price: Number(price),
      category: String(category),
      tags: Array.isArray(tags) ? tags : [],
      seasonal: Boolean(seasonal),
      soldOut: false,
      image: image || '/menu-items/1.jpg',
      imageAlt: imageAlt || name,
    };

    liveMenu.push(newItem);
    console.log(`➕ New menu item added: ${newItem.name}`);

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
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

    const index = liveMenu.findIndex((item) => item.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found.' }, { status: 404 });
    }

    const removed = liveMenu.splice(index, 1)[0];
    console.log(`🗑️ Menu item removed: ${removed.name}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Menu API error:', error);
    return NextResponse.json({ error: 'Failed to delete item.' }, { status: 500 });
  }
}
