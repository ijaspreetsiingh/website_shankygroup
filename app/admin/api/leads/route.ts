import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { execute, query } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';

export const runtime = 'nodejs';

type LeadRow = RowDataPacket & {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  source: string | null;
  status: string | null;
  priority: string | null;
  value_amount: number | null;
  next_follow_up: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type LeadActivity = RowDataPacket & {
  id: number;
  lead_id: number;
  activity_type: string;
  message: string;
  created_at: string;
};

type LeadInvoice = RowDataPacket & {
  id: number;
  lead_id: number;
  invoice_number: string;
  invoice_date: string;
  due_date: string | null;
  currency: string;
  subtotal: number;
  tax_percent: number;
  tax_amount: number;
  total_amount: number;
  status: string;
  line_items_json: string;
  invoice_meta_json: string | null;
  sent_to_email: string | null;
  sent_at: string | null;
  created_at: string;
};

const LEAD_COLUMNS: Array<[string, string]> = [
  ['name', 'VARCHAR(160) NULL'],
  ['email', 'VARCHAR(180) NULL'],
  ['phone', 'VARCHAR(40) NULL'],
  ['company', 'VARCHAR(180) NULL'],
  ['source', 'VARCHAR(80) NULL DEFAULT "website"'],
  ['status', 'VARCHAR(40) NULL DEFAULT "new"'],
  ['priority', 'VARCHAR(40) NULL DEFAULT "medium"'],
  ['value_amount', 'DECIMAL(12,2) NULL'],
  ['next_follow_up', 'DATETIME NULL'],
  ['notes', 'TEXT NULL'],
  ['created_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'],
  ['updated_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'],
];

async function ensureLeadsSchema() {
  await execute(
    `CREATE TABLE IF NOT EXISTS leads (
      id INT AUTO_INCREMENT PRIMARY KEY
    )`
  );

  const existingRows = await query<RowDataPacket[]>(
    `SELECT COLUMN_NAME
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'leads'`
  );
  const existing = new Set(existingRows.map((r) => String(r.COLUMN_NAME)));

  for (const [columnName, columnDef] of LEAD_COLUMNS) {
    if (!existing.has(columnName)) {
      await execute(`ALTER TABLE leads ADD COLUMN ${columnName} ${columnDef}`);
    }
  }

  await execute(
    `CREATE TABLE IF NOT EXISTS crm_lead_activities (
      id INT AUTO_INCREMENT PRIMARY KEY,
      lead_id INT NOT NULL,
      activity_type VARCHAR(60) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_lead_id (lead_id),
      CONSTRAINT fk_crm_activity_lead FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
    )`
  );

  await execute(
    `CREATE TABLE IF NOT EXISTS crm_invoices (
      id INT AUTO_INCREMENT PRIMARY KEY,
      lead_id INT NOT NULL,
      invoice_number VARCHAR(60) NOT NULL UNIQUE,
      invoice_date DATE NOT NULL,
      due_date DATE NULL,
      currency VARCHAR(10) NOT NULL DEFAULT 'INR',
      subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
      tax_percent DECIMAL(6,2) NOT NULL DEFAULT 0,
      tax_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
      total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
      status VARCHAR(40) NOT NULL DEFAULT 'draft',
      line_items_json LONGTEXT NOT NULL,
      sent_to_email VARCHAR(180) NULL,
      sent_at DATETIME NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_invoice_lead_id (lead_id),
      CONSTRAINT fk_crm_invoice_lead FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
    )`
  );

  const invoiceColumns = await query<RowDataPacket[]>(
    `SELECT COLUMN_NAME
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'crm_invoices'`
  );
  const invoiceColumnSet = new Set(invoiceColumns.map((r) => String(r.COLUMN_NAME)));
  if (!invoiceColumnSet.has('invoice_meta_json')) {
    await execute(`ALTER TABLE crm_invoices ADD COLUMN invoice_meta_json LONGTEXT NULL`);
  }
}

async function logActivity(leadId: number, activityType: string, message: string) {
  await execute(
    `INSERT INTO crm_lead_activities (lead_id, activity_type, message)
     VALUES (?, ?, ?)`,
    [leadId, activityType, message]
  );
}

async function getSmtpConfig() {
  const rows = await query<RowDataPacket[]>(
    `SELECT setting_key, setting_value
     FROM admin_settings
     WHERE setting_key IN ('smtp_host', 'smtp_port', 'smtp_user', 'smtp_password', 'smtp_secure', 'smtp_from_email', 'smtp_from_name')`
  );
  const map = Object.fromEntries(rows.map((r) => [String(r.setting_key), String(r.setting_value || '')]));
  if (!map.smtp_host || !map.smtp_port || !map.smtp_user) {
    throw new Error('SMTP not configured. Configure it in admin settings first.');
  }
  return map;
}

function safeNum(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function buildInvoiceHtml(lead: LeadRow, invoice: LeadInvoice, lineItems: Array<{ description: string; qty: number; rate: number; amount: number }>) {
  const rowsHtml = lineItems
    .map(
      (item, idx) => `
        <tr>
          <td style="padding:10px;border:1px solid #d1d5db;">${idx + 1}</td>
          <td style="padding:10px;border:1px solid #d1d5db;">${item.description}</td>
          <td style="padding:10px;border:1px solid #d1d5db;text-align:right;">${item.qty}</td>
          <td style="padding:10px;border:1px solid #d1d5db;text-align:right;">${item.rate.toFixed(2)}</td>
          <td style="padding:10px;border:1px solid #d1d5db;text-align:right;">${item.amount.toFixed(2)}</td>
        </tr>
      `
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:20px;">
      <div style="max-width:780px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
        <div style="background:#1d4ed8;color:#fff;padding:20px 24px;">
          <h2 style="margin:0 0 6px 0;">Shanky Group Invoice</h2>
          <div style="opacity:.9;font-size:13px;">Invoice #${invoice.invoice_number}</div>
        </div>
        <div style="padding:24px;">
          <p style="margin-top:0;">Hi ${lead.name || 'Client'},</p>
          <p>Please find your invoice details below:</p>
          <div style="display:flex;gap:24px;flex-wrap:wrap;margin-bottom:14px;">
            <div><strong>Invoice Date:</strong> ${invoice.invoice_date}</div>
            <div><strong>Due Date:</strong> ${invoice.due_date || '-'}</div>
            <div><strong>Currency:</strong> ${invoice.currency}</div>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:13px;margin:10px 0 18px 0;">
            <thead>
              <tr style="background:#f3f4f6;">
                <th style="padding:10px;border:1px solid #d1d5db;text-align:left;">#</th>
                <th style="padding:10px;border:1px solid #d1d5db;text-align:left;">Description</th>
                <th style="padding:10px;border:1px solid #d1d5db;text-align:right;">Qty</th>
                <th style="padding:10px;border:1px solid #d1d5db;text-align:right;">Rate</th>
                <th style="padding:10px;border:1px solid #d1d5db;text-align:right;">Amount</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
          <div style="margin-left:auto;max-width:300px;">
            <div style="display:flex;justify-content:space-between;padding:4px 0;"><span>Subtotal</span><strong>${invoice.subtotal.toFixed(2)}</strong></div>
            <div style="display:flex;justify-content:space-between;padding:4px 0;"><span>Tax (${invoice.tax_percent.toFixed(2)}%)</span><strong>${invoice.tax_amount.toFixed(2)}</strong></div>
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-top:1px solid #d1d5db;margin-top:8px;font-size:15px;"><span>Total</span><strong>${invoice.total_amount.toFixed(2)}</strong></div>
          </div>
          <p style="margin-bottom:0;color:#4b5563;">Thanks,<br/>Shanky Group Sales Team</p>
        </div>
      </div>
    </div>
  `;
}

function sanitizeMeta(bodyMeta: unknown) {
  const meta = typeof bodyMeta === 'object' && bodyMeta !== null ? (bodyMeta as Record<string, unknown>) : {};
  return {
    bill_to_name: String(meta.bill_to_name || '').trim(),
    bill_to_address: String(meta.bill_to_address || '').trim(),
    bill_to_gstin: String(meta.bill_to_gstin || '').trim(),
    seller_gstin: String(meta.seller_gstin || '').trim(),
    place_of_supply: String(meta.place_of_supply || '').trim(),
    po_number: String(meta.po_number || '').trim(),
    terms: String(meta.terms || '').trim(),
    notes: String(meta.notes || '').trim(),
    discount_amount: safeNum(meta.discount_amount),
    shipping_amount: safeNum(meta.shipping_amount),
    gst_mode: String(meta.gst_mode || 'igst').trim().toLowerCase(),
  };
}

export async function GET(request: Request) {
  try {
    await ensureLeadsSchema();
    const { searchParams } = new URL(request.url);
    const leadId = Number(searchParams.get('leadId') || 0);

    if (leadId > 0) {
      const leadRows = await query<LeadRow[]>(
        `SELECT id, name, email, phone, company, source, status, priority, value_amount, next_follow_up, notes, created_at, updated_at
         FROM leads
         WHERE id = ?
         LIMIT 1`,
        [leadId]
      );
      const activities = await query<LeadActivity[]>(
        `SELECT id, lead_id, activity_type, message, created_at
         FROM crm_lead_activities
         WHERE lead_id = ?
         ORDER BY id DESC
         LIMIT 100`,
        [leadId]
      );
      const invoices = await query<LeadInvoice[]>(
        `SELECT id, lead_id, invoice_number, invoice_date, due_date, currency, subtotal, tax_percent, tax_amount, total_amount, status, line_items_json, invoice_meta_json, sent_to_email, sent_at, created_at
         FROM crm_invoices
         WHERE lead_id = ?
         ORDER BY id DESC`,
        [leadId]
      );
      return NextResponse.json({ lead: leadRows[0] || null, activities, invoices });
    }

    const rows = await query<LeadRow[]>(
      `SELECT id, name, email, phone, company, source, status, priority, value_amount, next_follow_up, notes, created_at, updated_at
       FROM leads
       ORDER BY id DESC
       LIMIT 500`
    );
    return NextResponse.json({ rows });
  } catch (error) {
    console.error('Leads GET error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch leads data.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureLeadsSchema();
    const body = await request.json();
    const action = String(body?.action || 'createLead');

    if (action === 'createLead') {
      const name = String(body?.name || '').trim();
      const email = String(body?.email || '').trim();
      const phone = String(body?.phone || '').trim();
      const company = String(body?.company || '').trim();
      if (!name || !email) {
        return NextResponse.json({ success: false, message: 'Name and email are required.' }, { status: 400 });
      }
      await execute(
        `INSERT INTO leads (name, email, phone, company, source, status, priority, value_amount, next_follow_up, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          email,
          phone,
          company,
          String(body?.source || 'manual').trim(),
          String(body?.status || 'new').trim(),
          String(body?.priority || 'medium').trim(),
          safeNum(body?.value_amount),
          body?.next_follow_up || null,
          String(body?.notes || '').trim(),
        ]
      );
      const idRow = await query<RowDataPacket[]>(`SELECT LAST_INSERT_ID() AS id`);
      const newId = Number(idRow[0]?.id || 0);
      if (newId > 0) {
        await logActivity(newId, 'lead_created', 'Lead created in CRM');
      }
      return NextResponse.json({ success: true, id: newId, message: 'Lead created successfully.' });
    }

    if (action === 'addActivity') {
      const leadId = Number(body?.lead_id || 0);
      const message = String(body?.message || '').trim();
      if (leadId <= 0 || !message) {
        return NextResponse.json({ success: false, message: 'Lead and message are required.' }, { status: 400 });
      }
      await logActivity(leadId, String(body?.activity_type || 'note').trim(), message);
      return NextResponse.json({ success: true, message: 'Activity added.' });
    }

    if (action === 'createInvoice') {
      const leadId = Number(body?.lead_id || 0);
      const lineItems: Array<{ description: string; qty: number; rate: number; hsn_sac?: string; gst_percent?: number }> = Array.isArray(body?.line_items) ? body.line_items : [];
      if (leadId <= 0 || lineItems.length === 0) {
        return NextResponse.json({ success: false, message: 'Lead and line items are required.' }, { status: 400 });
      }
      const normalizedItems = lineItems.map((item) => {
        const qty = safeNum(item?.qty);
        const rate = safeNum(item?.rate);
        const lineGst = safeNum(item?.gst_percent);
        return {
          description: String(item?.description || '').trim() || 'Item',
          qty: qty <= 0 ? 1 : qty,
          rate: rate < 0 ? 0 : rate,
          hsn_sac: String(item?.hsn_sac || '').trim(),
          gst_percent: lineGst < 0 ? 0 : lineGst,
          amount: (qty <= 0 ? 1 : qty) * (rate < 0 ? 0 : rate),
        };
      });
      const meta = sanitizeMeta(body?.meta);
      const subtotal = normalizedItems.reduce((sum, item) => sum + item.amount, 0);
      const taxPercent = safeNum(body?.tax_percent);
      const discountAmount = meta.discount_amount < 0 ? 0 : meta.discount_amount;
      const shippingAmount = meta.shipping_amount < 0 ? 0 : meta.shipping_amount;
      const taxableAmount = Math.max(0, subtotal - discountAmount);
      const taxAmount = Number((taxableAmount * (taxPercent / 100)).toFixed(2));
      const totalAmount = Number((taxableAmount + taxAmount + shippingAmount).toFixed(2));
      const invoiceNumber = String(body?.invoice_number || `INV-${Date.now()}`).trim();

      await execute(
        `INSERT INTO crm_invoices
         (lead_id, invoice_number, invoice_date, due_date, currency, subtotal, tax_percent, tax_amount, total_amount, status, line_items_json, invoice_meta_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?, ?)`,
        [
          leadId,
          invoiceNumber,
          String(body?.invoice_date || new Date().toISOString().slice(0, 10)),
          body?.due_date || null,
          String(body?.currency || 'INR').trim().toUpperCase(),
          subtotal,
          taxPercent,
          taxAmount,
          totalAmount,
          JSON.stringify(normalizedItems),
          JSON.stringify(meta),
        ]
      );
      await logActivity(leadId, 'invoice_created', `Invoice ${invoiceNumber} created.`);
      return NextResponse.json({ success: true, message: 'Invoice created successfully.' });
    }

    if (action === 'importContacts') {
      const contacts = await query<RowDataPacket[]>(
        `SELECT first_name, last_name, email, phone, inquiry_type, state, message
         FROM contact_inquiries
         WHERE email IS NOT NULL AND TRIM(email) <> ''`
      );
      let created = 0;
      let skipped = 0;
      for (const contact of contacts) {
        const email = String(contact.email || '').trim();
        if (!email) {
          skipped += 1;
          continue;
        }
        const exists = await query<RowDataPacket[]>(
          `SELECT id FROM leads WHERE LOWER(email) = LOWER(?) LIMIT 1`,
          [email]
        );
        if (exists.length > 0) {
          skipped += 1;
          continue;
        }
        const name = `${String(contact.first_name || '').trim()} ${String(contact.last_name || '').trim()}`.trim() || 'Contact Lead';
        await execute(
          `INSERT INTO leads (name, email, phone, company, source, status, priority, notes)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            name,
            email,
            String(contact.phone || '').trim(),
            '',
            'contact_form',
            'new',
            'medium',
            String(contact.message || '').trim() || `Inquiry type: ${String(contact.inquiry_type || 'general').trim()}, State: ${String(contact.state || '').trim()}`,
          ]
        );
        const idRow = await query<RowDataPacket[]>(`SELECT LAST_INSERT_ID() AS id`);
        const newId = Number(idRow[0]?.id || 0);
        if (newId > 0) {
          await logActivity(newId, 'imported_contact', 'Lead imported from contact inquiries');
        }
        created += 1;
      }
      return NextResponse.json({ success: true, message: `Imported ${created} contact leads (${skipped} skipped).` });
    }

    if (action === 'importVendors') {
      const vendors = await query<RowDataPacket[]>(
        `SELECT first_name, last_name, contact_person, email, phone, company_name, vendor_status, country, message
         FROM vendor_registrations
         WHERE email IS NOT NULL AND TRIM(email) <> ''`
      );
      let created = 0;
      let skipped = 0;
      for (const vendor of vendors) {
        const email = String(vendor.email || '').trim();
        if (!email) {
          skipped += 1;
          continue;
        }
        const exists = await query<RowDataPacket[]>(
          `SELECT id FROM leads WHERE LOWER(email) = LOWER(?) LIMIT 1`,
          [email]
        );
        if (exists.length > 0) {
          skipped += 1;
          continue;
        }
        const name =
          `${String(vendor.first_name || '').trim()} ${String(vendor.last_name || '').trim()}`.trim() ||
          String(vendor.contact_person || '').trim() ||
          'Vendor Lead';
        await execute(
          `INSERT INTO leads (name, email, phone, company, source, status, priority, notes)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            name,
            email,
            String(vendor.phone || '').trim(),
            String(vendor.company_name || '').trim(),
            'vendor_registration',
            String(vendor.vendor_status || 'qualified').trim(),
            'high',
            String(vendor.message || '').trim() || `Imported from vendor registration (${String(vendor.country || '').trim()})`,
          ]
        );
        const idRow = await query<RowDataPacket[]>(`SELECT LAST_INSERT_ID() AS id`);
        const newId = Number(idRow[0]?.id || 0);
        if (newId > 0) {
          await logActivity(newId, 'imported_vendor', 'Lead imported from vendor registrations');
        }
        created += 1;
      }
      return NextResponse.json({ success: true, message: `Imported ${created} vendor leads (${skipped} skipped).` });
    }

    if (action === 'sendInvoice') {
      const leadId = Number(body?.lead_id || 0);
      const invoiceId = Number(body?.invoice_id || 0);
      if (leadId <= 0 || invoiceId <= 0) {
        return NextResponse.json({ success: false, message: 'Lead and invoice are required.' }, { status: 400 });
      }

      const leadRows = await query<LeadRow[]>(
        `SELECT id, name, email, phone, company, source, status, priority, value_amount, next_follow_up, notes, created_at, updated_at
         FROM leads
         WHERE id = ? LIMIT 1`,
        [leadId]
      );
      const invoiceRows = await query<LeadInvoice[]>(
        `SELECT id, lead_id, invoice_number, invoice_date, due_date, currency, subtotal, tax_percent, tax_amount, total_amount, status, line_items_json, invoice_meta_json, sent_to_email, sent_at, created_at
         FROM crm_invoices
         WHERE id = ? AND lead_id = ? LIMIT 1`,
        [invoiceId, leadId]
      );

      const lead = leadRows[0];
      const invoice = invoiceRows[0];
      if (!lead || !invoice || !lead.email) {
        return NextResponse.json({ success: false, message: 'Lead/invoice/email not found.' }, { status: 404 });
      }

      const smtp = await getSmtpConfig();
      const transporter = nodemailer.createTransport({
        host: smtp.smtp_host,
        port: Number(smtp.smtp_port || 587),
        secure: smtp.smtp_secure === 'true',
        auth: { user: smtp.smtp_user, pass: smtp.smtp_password || '' },
      });
      await transporter.verify();

      const parsed = JSON.parse(invoice.line_items_json || '[]') as Array<{ description: string; qty: number; rate: number; amount: number }>;
      const html = buildInvoiceHtml(lead, invoice, parsed);
      await transporter.sendMail({
        from: `"${smtp.smtp_from_name || 'Business Management System'}" <${smtp.smtp_from_email || smtp.smtp_user}>`,
        to: lead.email,
        subject: `Invoice ${invoice.invoice_number} from Shanky Group`,
        html,
      });

      await execute(
        `UPDATE crm_invoices
         SET status = 'sent', sent_to_email = ?, sent_at = NOW()
         WHERE id = ?`,
        [lead.email, invoice.id]
      );
      await logActivity(lead.id, 'invoice_sent', `Invoice ${invoice.invoice_number} sent to ${lead.email}`);
      return NextResponse.json({ success: true, message: 'Invoice sent successfully.' });
    }

    return NextResponse.json({ success: false, message: 'Unknown action.' }, { status: 400 });
  } catch (error) {
    console.error('Leads POST error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process request.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureLeadsSchema();
    const body = await request.json();
    const action = String(body?.action || 'updateLead');
    const leadId = Number(body?.id || body?.lead_id || 0);

    if (action === 'updateLead') {
      if (leadId <= 0) {
        return NextResponse.json({ success: false, message: 'Lead id is required.' }, { status: 400 });
      }
      await execute(
        `UPDATE leads
         SET name = ?, email = ?, phone = ?, company = ?, source = ?, status = ?, priority = ?, value_amount = ?, next_follow_up = ?, notes = ?
         WHERE id = ?`,
        [
          String(body?.name || '').trim(),
          String(body?.email || '').trim(),
          String(body?.phone || '').trim(),
          String(body?.company || '').trim(),
          String(body?.source || 'manual').trim(),
          String(body?.status || 'new').trim(),
          String(body?.priority || 'medium').trim(),
          safeNum(body?.value_amount),
          body?.next_follow_up || null,
          String(body?.notes || '').trim(),
          leadId,
        ]
      );
      await logActivity(leadId, 'lead_updated', 'Lead details updated.');
      return NextResponse.json({ success: true, message: 'Lead updated.' });
    }

    if (action === 'moveStage') {
      const status = String(body?.status || '').trim();
      if (leadId <= 0 || !status) {
        return NextResponse.json({ success: false, message: 'Lead id and status are required.' }, { status: 400 });
      }
      await execute(`UPDATE leads SET status = ? WHERE id = ?`, [status, leadId]);
      await logActivity(leadId, 'stage_changed', `Lead moved to ${status}`);
      return NextResponse.json({ success: true, message: 'Lead stage updated.' });
    }

    if (action === 'updateInvoiceStatus') {
      const invoiceId = Number(body?.invoice_id || 0);
      const status = String(body?.status || '').trim();
      if (invoiceId <= 0 || !status || leadId <= 0) {
        return NextResponse.json({ success: false, message: 'Lead, invoice and status are required.' }, { status: 400 });
      }
      await execute(`UPDATE crm_invoices SET status = ? WHERE id = ? AND lead_id = ?`, [status, invoiceId, leadId]);
      await logActivity(leadId, 'invoice_status_changed', `Invoice status changed to ${status}`);
      return NextResponse.json({ success: true, message: 'Invoice status updated.' });
    }

    return NextResponse.json({ success: false, message: 'Unknown action.' }, { status: 400 });
  } catch (error) {
    console.error('Leads PUT error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process request.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureLeadsSchema();
    const body = await request.json();
    const action = String(body?.action || 'deleteLead');

    if (action === 'deleteLead') {
      const leadId = Number(body?.id || body?.lead_id || 0);
      if (leadId <= 0) {
        return NextResponse.json({ success: false, message: 'Lead id is required.' }, { status: 400 });
      }
      await execute(`DELETE FROM leads WHERE id = ?`, [leadId]);
      return NextResponse.json({ success: true, message: 'Lead deleted.' });
    }

    if (action === 'deleteInvoice') {
      const leadId = Number(body?.lead_id || 0);
      const invoiceId = Number(body?.invoice_id || 0);
      if (leadId <= 0 || invoiceId <= 0) {
        return NextResponse.json({ success: false, message: 'Lead and invoice are required.' }, { status: 400 });
      }
      await execute(`DELETE FROM crm_invoices WHERE id = ? AND lead_id = ?`, [invoiceId, leadId]);
      await logActivity(leadId, 'invoice_deleted', `Invoice ${invoiceId} deleted.`);
      return NextResponse.json({ success: true, message: 'Invoice deleted.' });
    }

    return NextResponse.json({ success: false, message: 'Unknown action.' }, { status: 400 });
  } catch (error) {
    console.error('Leads DELETE error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process request.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
