import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Store password in environment variable in production
// Set ADMIN_PASSWORD in Vercel dashboard → Settings → Environment Variables
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'artisan2024';

// Rate limit login attempts
const loginAttempts = new Map<string, { count: number; resetTime: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_WINDOW = 15 * 60 * 1000; // 15 minutes

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';

    // Check lockout
    const attempts = loginAttempts.get(ip);
    if (attempts && Date.now() < attempts.resetTime && attempts.count >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required.' },
        { status: 400 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      // Track failed attempts
      const now = Date.now();
      const current = loginAttempts.get(ip);
      if (!current || now > current.resetTime) {
        loginAttempts.set(ip, { count: 1, resetTime: now + LOCKOUT_WINDOW });
      } else {
        current.count++;
      }

      return NextResponse.json(
        { error: 'Incorrect password.' },
        { status: 401 }
      );
    }

    // Generate a simple session token
    const token = Buffer.from(`${Date.now()}-${Math.random().toString(36).slice(2)}`).toString('base64');

    return NextResponse.json({ 
      success: true, 
      token 
    });
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed.' },
      { status: 500 }
    );
  }
}
