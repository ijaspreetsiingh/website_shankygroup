import { NextResponse } from 'next/server';
import { execute, query } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

async function sendEmail(to: string, subject: string, html: string) {
  try {
    // Get SMTP configuration
    const rows = await query<RowDataPacket[]>(
      `SELECT setting_key, setting_value
       FROM admin_settings
       WHERE setting_key IN ('smtp_host', 'smtp_port', 'smtp_user', 'smtp_password', 'smtp_secure', 'smtp_from_email', 'smtp_from_name')`
    );
    
    const map = Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value || '']));
    
    if (!map.smtp_host || !map.smtp_port || !map.smtp_user) {
      console.log('SMTP not configured, skipping email');
      return;
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

    await transporter.sendMail({
      from: `"${map.smtp_from_name || 'Business Management System'}" <${map.smtp_from_email || map.smtp_user}>`,
      to,
      subject,
      html
    });
  } catch (error) {
    console.error('Email sending error:', error);
  }
}

async function getAdminEmail() {
  try {
    const rows = await query<RowDataPacket[]>(
      `SELECT setting_value FROM admin_settings WHERE setting_key = 'admin_notification_email'`
    );
    return rows[0]?.setting_value || null;
  } catch {
    return null;
  }
}

async function getContactEmailTemplate() {
  try {
    const rows = await query<RowDataPacket[]>(
      `SELECT setting_key, setting_value FROM admin_settings WHERE setting_key IN ('contact_template_id', 'contact_custom_subject', 'contact_custom_body')`
    );
    const map = Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value || '']));
    return {
      template_id: map.contact_template_id || 'professional',
      subject: map.contact_custom_subject || '',
      body: map.contact_custom_body || ''
    };
  } catch {
    return { template_id: 'professional', subject: '', body: '' };
  }
}

function normalizePlaceholders(template: string) {
  return template
    // Convert single braces to double braces for consistency
    .replace(/\{firstName\}/g, '{{firstName}}')
    .replace(/\{lastName\}/g, '{{lastName}}')
    .replace(/\{companyName\}/g, '{{companyName}}')
    .replace(/\{email\}/g, '{{email}}')
    .replace(/\{mobile\}/g, '{{mobile}}')
    .replace(/\{landline\}/g, '{{landline}}')
    .replace(/\{address\}/g, '{{address}}')
    .replace(/\{city\}/g, '{{city}}')
    .replace(/\{state\}/g, '{{state}}')
    .replace(/\{country\}/g, '{{country}}')
    .replace(/\{gstNo\}/g, '{{gstNo}}')
    .replace(/\{contactPerson\}/g, '{{contactPerson}}')
    .replace(/\{designation\}/g, '{{designation}}')
    .replace(/\{website\}/g, '{{website}}')
    .replace(/\{message\}/g, '{{message}}')
    .replace(/\{ticketId\}/g, '{{ticketId}}');
}

async function getVendorEmailTemplate() {
  try {
    const rows = await query<RowDataPacket[]>(
      `SELECT setting_key, setting_value FROM admin_settings WHERE setting_key IN ('vendor_registration_template_id', 'vendor_registration_subject', 'vendor_registration_body')`
    );
    const map = Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value || '']));
    return {
      template_id: map.vendor_registration_template_id || 'vendor_professional',
      subject: map.vendor_registration_subject || '',
      body: map.vendor_registration_body || ''
    };
  } catch {
    return { template_id: 'vendor_professional', subject: '', body: '' };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = String(body?.action || '').trim();

    if (action === 'submit_vendor_registration') {
      const email = String(body?.email || '').trim();
      if (!email) return NextResponse.json({ status: 'error', message: 'Email is required' }, { status: 400 });

      console.log('=== VENDOR REGISTRATION DEBUG ===');
      console.log('Received body:', JSON.stringify(body, null, 2));
      
      await execute(
        `CREATE TABLE IF NOT EXISTS vendor_registrations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(255) DEFAULT NULL,
          last_name VARCHAR(255) DEFAULT NULL,
          state VARCHAR(255) DEFAULT NULL,
          phone VARCHAR(50) DEFAULT NULL,
          email VARCHAR(255) NOT NULL,
          message TEXT DEFAULT NULL,
          exclusive_offers TINYINT(1) DEFAULT 0,
          source VARCHAR(100) DEFAULT 'website',
          company_name VARCHAR(255) DEFAULT NULL,
          city VARCHAR(255) DEFAULT NULL,
          budget VARCHAR(100) DEFAULT NULL,
          address VARCHAR(500) DEFAULT NULL,
          country VARCHAR(255) DEFAULT NULL,
          gst_no VARCHAR(100) DEFAULT NULL,
          contact_person VARCHAR(255) DEFAULT NULL,
          designation VARCHAR(255) DEFAULT NULL,
          landline VARCHAR(50) DEFAULT NULL,
          website VARCHAR(255) DEFAULT NULL,
          status ENUM('new', 'contacted', 'qualified', 'converted') DEFAULT 'new',
          vendor_status VARCHAR(50) DEFAULT NULL,
          priority VARCHAR(50) DEFAULT 'medium',
          notes TEXT DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`
      );

      const firstName = String(body?.firstName || '').trim() || String(body?.contactPerson || '').trim() || String(body?.companyName || '').trim() || null;
      const lastName = String(body?.lastName || '').trim() || String(body?.designation || '').trim() || null;

      console.log('Processed values:', {
        firstName,
        lastName,
        companyName: String(body?.companyName || '').trim() || null,
        email: String(body?.email || '').trim() || null,
        mobile: String(body?.mobile || '').trim() || null,
        state: String(body?.state || '').trim() || null,
        city: String(body?.city || '').trim() || null,
        country: String(body?.country || '').trim() || null,
        gstNo: String(body?.gstNo || '').trim() || null,
        contactPerson: String(body?.contactPerson || '').trim() || null,
        designation: String(body?.designation || '').trim() || null,
        landline: String(body?.landline || '').trim() || null,
        website: String(body?.website || '').trim() || null,
        message: String(body?.message || '').trim() || null,
        exclusiveOffers: body?.exclusiveOffers ? 1 : 0,
        status: String(body?.status || '').trim() || null,
      });

      const result = await execute(
        `INSERT INTO vendor_registrations
          (first_name, last_name, company_name, email, phone, landline, address, state, city, country, gst_no, contact_person, designation, website, message, exclusive_offers, source, vendor_status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'website', ?)`,
        [
          firstName || null,
          lastName || null,
          String(body?.companyName || '').trim() || null,
          String(body?.email || '').trim() || null,
          String(body?.mobile || '').trim() || null,
          String(body?.landline || '').trim() || null,
          String(body?.address || '').trim() || null,
          String(body?.state || '').trim() || null,
          String(body?.city || '').trim() || null,
          String(body?.country || '').trim() || null,
          String(body?.gstNo || '').trim() || null,
          String(body?.contactPerson || '').trim() || null,
          String(body?.designation || '').trim() || null,
          String(body?.website || '').trim() || null,
          String(body?.message || '').trim() || null,
          body?.exclusiveOffers ? 1 : 0,
          String(body?.status || '').trim() || null,
        ]
      );

      console.log('Database insert result:', result);
      console.log('=== END VENDOR REGISTRATION DEBUG ===');

      // Send emails after successful submission
      const adminEmail = await getAdminEmail();
      const template = await getVendorEmailTemplate();
      
      // Send thank you email to vendor
      let thankYouSubject, thankYouBody;
      
      if (template.subject && template.body) {
        // Use custom template
        thankYouSubject = normalizePlaceholders(template.subject || '');
        thankYouBody = normalizePlaceholders(template.body || '');
      } else {
        // Use default template
        thankYouSubject = 'Thank You – Your Vendor Registration Has Been Received';
        thankYouBody = `<!DOCTYPE html><html><body><h2>Thank You {{firstName}}!</h2><p>We have received your vendor registration and will contact you soon.</p></body></html>`;
      }
      
      const personalizedThankYouBody = (thankYouBody || '')
        // Replace double braces first
        .replace(/{{firstName}}/g, firstName || '')
        .replace(/{{lastName}}/g, lastName || '')
        .replace(/{{companyName}}/g, String(body?.companyName || '').trim() || 'Your Company')
        .replace(/{{email}}/g, email || '')
        .replace(/{{mobile}}/g, String(body?.mobile || '').trim() || 'N/A')
        .replace(/{{landline}}/g, String(body?.landline || '').trim() || 'N/A')
        .replace(/{{address}}/g, String(body?.address || '').trim() || 'N/A')
        .replace(/{{city}}/g, String(body?.city || '').trim() || 'N/A')
        .replace(/{{state}}/g, String(body?.state || '').trim() || 'N/A')
        .replace(/{{country}}/g, String(body?.country || '').trim() || 'N/A')
        .replace(/{{gstNo}}/g, String(body?.gstNo || '').trim() || 'N/A')
        .replace(/{{contactPerson}}/g, String(body?.contactPerson || '').trim() || 'N/A')
        .replace(/{{designation}}/g, String(body?.designation || '').trim() || 'N/A')
        .replace(/{{website}}/g, String(body?.website || '').trim() || 'N/A')
        .replace(/{{message}}/g, String(body?.message || '').trim() || 'N/A')
        .replace(/{{ticketId}}/g, `VR-${Date.now()}`)
        // Also replace single braces (fallback)
        .replace(/\{firstName\}/g, firstName || '')
        .replace(/\{lastName\}/g, lastName || '')
        .replace(/\{companyName\}/g, String(body?.companyName || '').trim() || 'Your Company')
        .replace(/\{email\}/g, email || '')
        .replace(/\{mobile\}/g, String(body?.mobile || '').trim() || 'N/A')
        .replace(/\{landline\}/g, String(body?.landline || '').trim() || 'N/A')
        .replace(/\{address\}/g, String(body?.address || '').trim() || 'N/A')
        .replace(/\{city\}/g, String(body?.city || '').trim() || 'N/A')
        .replace(/\{state\}/g, String(body?.state || '').trim() || 'N/A')
        .replace(/\{country\}/g, String(body?.country || '').trim() || 'N/A')
        .replace(/\{gstNo\}/g, String(body?.gstNo || '').trim() || 'N/A')
        .replace(/\{contactPerson\}/g, String(body?.contactPerson || '').trim() || 'N/A')
        .replace(/\{designation\}/g, String(body?.designation || '').trim() || 'N/A')
        .replace(/\{website\}/g, String(body?.website || '').trim() || 'N/A')
        .replace(/\{message\}/g, String(body?.message || '').trim() || 'N/A')
        .replace(/\{ticketId\}/g, `VR-${Date.now()}`);
      
      await sendEmail(email, thankYouSubject, personalizedThankYouBody);
      
      // Send notification to admin
      if (adminEmail) {
        const adminSubject = `New Vendor Registration: ${firstName} (${body?.companyName || 'N/A'})`;
        const adminBody = `<!DOCTYPE html><html><body>
          <h2>New Vendor Registration Received</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
          <p><strong>Company:</strong> ${body?.companyName || 'N/A'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${body?.mobile || 'N/A'}</p>
          <p><strong>Message:</strong> ${body?.message || 'N/A'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </body></html>`;
        await sendEmail(adminEmail, adminSubject, adminBody);
      }

      return NextResponse.json({ status: 'success', message: 'Vendor registration submitted successfully' });
    }

    const firstName = String(body?.firstName || '').trim();
    const email = String(body?.email || '').trim();
    if (!firstName || !email) {
      return NextResponse.json({ status: 'error', message: 'Required fields missing' }, { status: 400 });
    }

    await execute(
      `CREATE TABLE IF NOT EXISTS contact_inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) DEFAULT NULL,
        state VARCHAR(255) DEFAULT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        email VARCHAR(255) NOT NULL,
        inquiry_type VARCHAR(100) DEFAULT NULL,
        message TEXT,
        exclusive_offers TINYINT(1) DEFAULT 0,
        source VARCHAR(50) DEFAULT 'website',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    );

    await execute(
      `INSERT INTO contact_inquiries
        (first_name, last_name, state, phone, email, inquiry_type, message, exclusive_offers, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'website')`,
      [
        firstName,
        String(body?.lastName || '').trim() || null,
        String(body?.state || '').trim() || null,
        String(body?.phone || '').trim() || null,
        email,
        String(body?.inquiryType || 'general').trim(),
        String(body?.message || '').trim() || null,
        body?.exclusiveOffers ? 1 : 0,
      ]
    );

    // Send emails after successful submission
    const adminEmail = await getAdminEmail();
    const template = await getContactEmailTemplate();
    
    // Send thank you email to user
    let thankYouSubject, thankYouBody;
    
    if (template.subject && template.body) {
      // Use custom template
      thankYouSubject = normalizePlaceholders(template.subject || '');
      thankYouBody = normalizePlaceholders(template.body || '');
    } else {
      // Use default template
      thankYouSubject = 'Thank You for Your Message';
      thankYouBody = `<!DOCTYPE html><html><body><h2>Thank You {{firstName}}!</h2><p>We have received your message and will contact you soon.</p></body></html>`;
    }
    
    const contactLastName = String(body?.lastName || '').trim();
    const personalizedThankYouBody = (thankYouBody || '')
      .replace(/{{firstName}}/g, firstName || '')
      .replace(/{{companyName}}/g, 'Shanky Group')
      .replace(/{{ticketId}}/g, `CT-${Date.now()}`);
    
    await sendEmail(email, thankYouSubject, personalizedThankYouBody);
    
    // Send notification to admin
    if (adminEmail) {
      const adminSubject = `New Contact Inquiry: ${firstName || ''} ${contactLastName}`;
      const adminBody = `<!DOCTYPE html><html><body>
        <h2>New Contact Inquiry Received</h2>
        <p><strong>Name:</strong> ${firstName || ''} ${contactLastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${body?.phone || 'N/A'}</p>
        <p><strong>Inquiry Type:</strong> ${body?.inquiryType || 'general'}</p>
        <p><strong>Message:</strong> ${body?.message || 'N/A'}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      </body></html>`;
      await sendEmail(adminEmail, adminSubject, adminBody);
    }

    return NextResponse.json({ status: 'success', message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}
