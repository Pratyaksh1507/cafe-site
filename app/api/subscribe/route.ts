import { NextResponse } from 'next/server';

// In production, store in database (Neon + Prisma) and optionally sync to Mailchimp
const subscribers: string[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Check for duplicates (in production, use DB unique constraint)
    if (subscribers.includes(email)) {
      return NextResponse.json({ 
        success: true, 
        message: 'You\'re already subscribed!' 
      });
    }

    subscribers.push(email);
    console.log('📬 New subscriber:', email, `(Total: ${subscribers.length})`);

    // In production with Mailchimp:
    // await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
    //   method: 'POST',
    //   headers: { Authorization: `apikey ${MAILCHIMP_API_KEY}` },
    //   body: JSON.stringify({ email_address: email, status: 'subscribed' }),
    // });

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
