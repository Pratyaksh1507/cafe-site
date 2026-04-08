import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // max subscribe attempts
const RATE_WINDOW = 60 * 1000; // per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count++;
  return false;
}

// In production, store in database (Neon + Prisma)
const subscribers = new Set<string>();

export async function POST(request: Request) {
  try {
    // Rate limiting
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

    // Block disposable email domains (basic list)
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

    if (subscribers.has(email)) {
      return NextResponse.json({ 
        success: true, 
        message: 'You\'re already subscribed!' 
      });
    }

    subscribers.add(email);
    console.log('📬 New subscriber:', email, `(Total: ${subscribers.size})`);

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
