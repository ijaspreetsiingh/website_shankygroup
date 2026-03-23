import { NextResponse } from 'next/server';
import { execute, query } from '@/app/lib/db';

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
    const rows = await query<any[]>(
      `SELECT setting_key, setting_value
       FROM admin_settings
       WHERE setting_key = 'admin_notification_email'`
    );
    
    const map = Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value || '']));
    
    return NextResponse.json({
      email: map.admin_notification_email || ''
    });
  } catch (error) {
    console.error('Admin notification email GET error:', error);
    return NextResponse.json({ message: 'Failed to fetch admin notification email' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureTable();
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    await execute(
      `INSERT INTO admin_settings (setting_key, setting_value)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      ['admin_notification_email', String(email).trim()]
    );

    return NextResponse.json({ 
      message: 'Admin notification email saved. You will receive an email when someone submits Contact Us or Vendor Registration form.' 
    });
  } catch (error) {
    console.error('Admin notification email PUT error:', error);
    return NextResponse.json({ message: 'Failed to save admin notification email' }, { status: 500 });
  }
}
