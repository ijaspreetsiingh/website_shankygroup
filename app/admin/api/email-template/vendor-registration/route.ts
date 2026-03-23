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
       WHERE setting_key IN ('vendor_registration_template_id', 'vendor_registration_subject', 'vendor_registration_body')`
    );
    
    const map = Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value || '']));
    
    return NextResponse.json({
      template_id: map.vendor_registration_template_id || 'vendor_professional',
      custom_subject: map.vendor_registration_subject || '',
      custom_body: map.vendor_registration_body || ''
    });
  } catch (error) {
    console.error('Vendor template GET error:', error);
    return NextResponse.json({ message: 'Failed to fetch vendor template' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const body = await request.json();
    const { template_id, custom_subject, custom_body } = body;

    if (!template_id) {
      return NextResponse.json({ message: 'Template ID is required' }, { status: 400 });
    }

    const entries: Array<[string, string]> = [
      ['vendor_registration_template_id', String(template_id).trim()],
      ['vendor_registration_subject', String(custom_subject || '').trim()],
      ['vendor_registration_body', String(custom_body || '').trim()],
    ];

    for (const [key, value] of entries) {
      await execute(
        `INSERT INTO admin_settings (setting_key, setting_value)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
        [key, value]
      );
    }

    return NextResponse.json({ message: 'Vendor email template saved successfully' });
  } catch (error) {
    console.error('Vendor template POST error:', error);
    return NextResponse.json({ message: 'Failed to save vendor template' }, { status: 500 });
  }
}
