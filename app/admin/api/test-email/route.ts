import { NextResponse } from 'next/server';
import { execute, query } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { to_email } = await request.json();

    if (!to_email) {
      return NextResponse.json({ message: 'Test email address is required' }, { status: 400 });
    }

    // Get SMTP configuration
    const rows = await query<RowDataPacket[]>(
      `SELECT setting_key, setting_value
       FROM admin_settings
       WHERE setting_key IN ('smtp_host', 'smtp_port', 'smtp_user', 'smtp_password', 'smtp_secure', 'smtp_from_email', 'smtp_from_name')`
    );
    
    const map = Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value || '']));
    
    if (!map.smtp_host || !map.smtp_port || !map.smtp_user) {
      return NextResponse.json({ message: 'SMTP configuration not found. Please configure email settings first.' }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: map.smtp_host,
      port: parseInt(map.smtp_port) || 587,
      secure: map.smtp_secure === 'true',
      auth: {
        user: map.smtp_user,
        pass: map.smtp_password || ''
      }
    });

    // Verify SMTP connection first
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return NextResponse.json({ 
        message: 'SMTP connection failed. Please check your credentials and try again.' 
      }, { status: 500 });
    }

    // Send test email
    const mailOptions = {
      from: `"${map.smtp_from_name || 'Business Management System'}" <${map.smtp_from_email || map.smtp_user}>`,
      to: to_email,
      subject: 'Test Email - SMTP Configuration',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Test Email</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <tr>
                    <td style="padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0 0 20px 0; color: #2563eb; font-size: 24px;">Test Email Successful!</h1>
                      <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 16px;">
                        Your SMTP configuration is working correctly.
                      </p>
                      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
                        <p style="margin: 0; color: #374151; font-size: 14px;">
                          <strong>SMTP Server:</strong> ${map.smtp_host}<br>
                          <strong>Port:</strong> ${map.smtp_port}<br>
                          <strong>Secure:</strong> ${map.smtp_secure === 'true' ? 'Yes' : 'No'}<br>
                          <strong>From:</strong> ${map.smtp_from_name || 'Business Management System'}
                        </p>
                      </div>
                      <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px;">
                        This is a test email sent from your Business Management System.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('Test email error:', error);
    
    // Provide more detailed error message
    let errorMessage = 'Failed to send test email. Please check your SMTP configuration and try again.';
    
    if (error instanceof Error) {
      if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        errorMessage = 'SMTP server connection failed. Please check the SMTP host and port.';
      } else if (error.message.includes('ETIMEDOUT')) {
        errorMessage = 'Connection timeout. Please check your network and SMTP settings.';
      } else if (error.message.includes('auth') || error.message.includes('535')) {
        errorMessage = 'Authentication failed. Please check your username and password.';
      } else if (error.message.includes('from')) {
        errorMessage = 'Invalid from email address. Please check your SMTP from email setting.';
      }
    }
    
    return NextResponse.json({ 
      message: errorMessage,
      debug: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
}
