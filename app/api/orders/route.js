import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { headers } from 'next/headers';

// Simple in-memory rate limiter for orders (prevent spam)
const rateLimitMap = new Map();
const RATE_LIMIT = 5; // max 5 orders
const RATE_WINDOW = 60 * 1000; // per minute

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(request) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
    }

    const body = await request.json();
    const { customerName, customerEmail, customerPhone, items, total, pickupTime } = body;

    if (!customerName || !customerEmail || !items || items.length === 0 || !total || !pickupTime) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Insert order into Supabase
    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone || '',
        items,
        total,
        pickup_time: pickupTime,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase order insert error:', error);
      return NextResponse.json({ error: 'Failed to save order.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: data }, { status: 201 });
  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
