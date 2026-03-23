import { NextResponse } from 'next/server';
import { execute, query } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';

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
       WHERE setting_key IN (
         'admin_notification_email', 'smtp_host', 'smtp_port', 'smtp_user', 
         'smtp_secure', 'smtp_password', 'smtp_from_email', 'smtp_from_name'
       )`
    );
    
    const map = Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value || '']));
    
    return NextResponse.json({
      admin_notification_email: map.admin_notification_email || '',
      smtp_host: map.smtp_host || '',
      smtp_port: map.smtp_port || '',
      smtp_user: map.smtp_user || '',
      smtp_secure: map.smtp_secure || 'false',
      smtp_password: map.smtp_password || '',
      smtp_from_email: map.smtp_from_email || '',
      smtp_from_name: map.smtp_from_name || 'Business Management System',
    });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ message: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureTable();
    const body = await request.json();
    const entries: Array<[string, string]> = [
      ['admin_notification_email', String(body?.admin_notification_email || '').trim()],
      ['smtp_host', String(body?.smtp_host || '').trim()],
      ['smtp_port', String(body?.smtp_port || '').trim()],
      ['smtp_user', String(body?.smtp_user || '').trim()],
      ['smtp_secure', String(body?.smtp_secure || 'false').trim()],
      ['smtp_password', String(body?.smtp_password || '').trim()],
      ['smtp_from_email', String(body?.smtp_from_email || '').trim()],
      ['smtp_from_name', String(body?.smtp_from_name || 'Business Management System').trim()],
    ];

    for (const [key, value] of entries) {
      if (value) {
        await execute(
          `INSERT INTO admin_settings (setting_key, setting_value)
           VALUES (?, ?)
           ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
          [key, value]
        );
      }
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Settings PUT error:', error);
    return NextResponse.json({ message: 'Failed to save settings' }, { status: 500 });
  }
}
