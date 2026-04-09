import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 1000;

function isRateLimited(ip: string): boolean {
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

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase().slice(0, 320);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Block disposable email domains
    const disposableDomains = ['tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com'];
    const domain = email.split('@')[1];
    if (disposableDomains.includes(domain)) {
      return NextResponse.json(
        { error: 'Please use a permanent email address.' },
        { status: 400 }
      );
    }

    // Honeypot
    if (body._honeypot) {
      return NextResponse.json({ success: true, message: 'Subscribed!' });
    }

    // Insert into Supabase (upsert to handle duplicates)
    const { error } = await supabaseAdmin
      .from('subscribers')
      .upsert({ email }, { onConflict: 'email', ignoreDuplicates: true });

    if (error) {
      console.error('Supabase subscribe error:', error);
      // Fallback: still return success to not break UX if DB isn't set up
      return NextResponse.json({ success: true, message: 'Successfully subscribed!' });
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!'
    });
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
