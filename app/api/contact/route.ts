import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  topic?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequest = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { ok: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Get email configuration from environment variables
    const emailConfig = {
      host: process.EMAIL_HOST,
      port: parseInt(process.EMAIL_PORT || '587'),
      secure: process.EMAIL_SECURE === 'true',
      auth: {
        user: process.EMAIL_USER,
        pass: process.EMAIL_PASS,
      },
    };

    const emailFrom = process.EMAIL_FROM;
    const emailTo = process.EMAIL_TO;

    // Validate environment variables
    if (!emailConfig.host || !emailConfig.auth.user || !emailConfig.auth.pass || !emailFrom || !emailTo) {
      console.error('Missing email configuration in environment variables');
      return NextResponse.json(
        { ok: false, error: 'Email service is not configured properly.' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport(emailConfig);

    // Verify transporter configuration
    await transporter.verify();

    // Compose email
    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: `Contact Form: ${body.topic || 'General Inquiry'} - ${body.name}`,
      text: `
Name: ${body.name}
Email: ${body.email}
Topic: ${body.topic || 'General Inquiry'}

Message:
${body.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Topic:</strong> ${body.topic || 'General Inquiry'}</p>
        <h3>Message:</h3>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: body.email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Contact form error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { ok: false, error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}