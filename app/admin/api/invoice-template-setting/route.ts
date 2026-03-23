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
       WHERE setting_key IN ('invoice_template_id', 'invoice_template_html')`
    );
    
    const map = Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value || '']));
    
    return NextResponse.json({
      template_id: map.invoice_template_id || 'professional',
      template_html: map.invoice_template_html || '',
    });
  } catch (error) {
    console.error('Invoice template GET error:', error);
    return NextResponse.json({ message: 'Failed to fetch invoice template' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const body = await request.json();
    const { template_id, template_html } = body;

    if (!template_id) {
      return NextResponse.json({ message: 'Template ID is required' }, { status: 400 });
    }

    await execute(
      `INSERT INTO admin_settings (setting_key, setting_value)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      ['invoice_template_id', String(template_id).trim()]
    );
    await execute(
      `INSERT INTO admin_settings (setting_key, setting_value)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      ['invoice_template_html', String(template_html || '').trim()]
    );

    return NextResponse.json({ message: 'Invoice template saved successfully' });
  } catch (error) {
    console.error('Invoice template POST error:', error);
    return NextResponse.json({ message: 'Failed to save invoice template' }, { status: 500 });
  }
}
