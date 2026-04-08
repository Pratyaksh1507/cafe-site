import { NextResponse } from 'next/server';
import { siteConfig } from '@/site.config';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // In production, integrate with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: `${siteConfig.name} Website <noreply@yourdomain.com>`,
    //   to: siteConfig.email,
    //   subject: `Contact Form: ${subject || 'No Subject'}`,
    //   html: `
    //     <h2>New Contact Message</h2>
    //     <p><strong>From:</strong> ${name} (${email})</p>
    //     <p><strong>Subject:</strong> ${subject || 'None'}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // For now, log to server console
    console.log('📧 Contact form submission:', { name, email, subject, message });

    return NextResponse.json({ 
      success: true, 
      message: 'Message received successfully.' 
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    );
  }
}
