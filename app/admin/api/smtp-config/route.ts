import { NextResponse } from 'next/server';
import { execute, query } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

async function ensureTable() {
  await execute(
    `CREATE TABLE IF NOT EXISTS admin_settings (
      setting_key VARCHAR(120) PRIMARY KEY,
      setting_value TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`
  );
}

export async function GET() {
  try {
    await ensureTable();
    const rows = await query<RowDataPacket[]>(
      `SELECT setting_key, setting_value
       FROM admin_settings
       WHERE setting_key IN ('smtp_host', 'smtp_port', 'smtp_user', 'smtp_password', 'smtp_secure', 'smtp_from_email', 'smtp_from_name')`
    );
    
    const map = Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value || '']));
    
    if (!map.smtp_host || !map.smtp_port || !map.smtp_user) {
      return NextResponse.json({ config: null }, { status: 404 });
    }

    return NextResponse.json({
      config: {
        host: map.smtp_host,
        port: parseInt(map.smtp_port) || 587,
        user: map.smtp_user,
        password: map.smtp_password,
        secure: map.smtp_secure === 'true' && parseInt(map.smtp_port) === 465,
        from_email: map.smtp_from_email,
        from_name: map.smtp_from_name || 'Business Management System'
      }
    });
  } catch (error) {
    console.error('SMTP GET error:', error);
    return NextResponse.json({ message: 'Failed to fetch SMTP configuration' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const body = await request.json();
    const { host, port, secure, user, password, from_email, from_name } = body;

    if (!host || !port || !user) {
      return NextResponse.json({ message: 'SMTP host, port, and user are required' }, { status: 400 });
    }

    const entries: Array<[string, string]> = [
      ['smtp_host', String(host).trim()],
      ['smtp_port', String(port).trim()],
      ['smtp_secure', String(secure === true).trim()],
      ['smtp_user', String(user).trim()],
      ['smtp_password', String(password || '').trim()],
      ['smtp_from_email', String(from_email || '').trim()],
      ['smtp_from_name', String(from_name || 'Business Management System').trim()],
    ];

    for (const [key, value] of entries) {
      await execute(
        `INSERT INTO admin_settings (setting_key, setting_value)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
        [key, value]
      );
    }

    return NextResponse.json({ message: 'SMTP configuration saved successfully' });
  } catch (error) {
    console.error('SMTP POST error:', error);
    return NextResponse.json({ message: 'Failed to save SMTP configuration' }, { status: 500 });
  }
}
