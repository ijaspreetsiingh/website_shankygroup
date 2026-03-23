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
       WHERE setting_key IN ('contact_template_id', 'contact_custom_subject', 'contact_custom_body')`
    );
    
    const map = Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value || '']));
    
    return NextResponse.json({
      template_id: map.contact_template_id || 'professional',
      custom_subject: map.contact_custom_subject || '',
      custom_body: map.contact_custom_body || ''
    });
  } catch (error) {
    console.error('Contact template GET error:', error);
    return NextResponse.json({ message: 'Failed to fetch contact template' }, { status: 500 });
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
      ['contact_template_id', String(template_id).trim()],
      ['contact_custom_subject', String(custom_subject || '').trim()],
      ['contact_custom_body', String(custom_body || '').trim()],
    ];

    for (const [key, value] of entries) {
      await execute(
        `INSERT INTO admin_settings (setting_key, setting_value)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
        [key, value]
      );
    }

    return NextResponse.json({ message: 'Contact email template saved successfully' });
  } catch (error) {
    console.error('Contact template POST error:', error);
    return NextResponse.json({ message: 'Failed to save contact template' }, { status: 500 });
  }
}
