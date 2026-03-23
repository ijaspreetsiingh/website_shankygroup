'use client';

import { useState, useEffect, FormEvent } from 'react';
import {
  Mail, Lock, Server, Save, TestTube, Eye, EyeOff,
  Check, X, AlertCircle, Zap, Globe, FileText,
  Sparkles, Building2, Shield
} from 'lucide-react';

/* ─── types ── */
type Tab = 'smtp' | 'templates' | 'vendor-templates' | 'invoice-templates';
type Msg = { type: 'success' | 'error' | ''; text: string };
type SmtpForm = {
  smtp_host: string; smtp_port: string; smtp_secure: string;
  smtp_user: string; smtp_password: string;
  smtp_from_email: string; smtp_from_name: string;
  admin_notification_email: string;
};
type Template = {
  id: string; name: string; description: string; preview: string;
  color: string; subject: string; body: string; icon: React.ElementType;
};
type InvoiceTpl = {
  id: string; name: string; description: string; preview: string;
  color: string; icon: React.ElementType;
  features: string[];
  previewHtml: string;
};

/* ─── email templates (unchanged) ── */
const emailTemplates: Template[] = [
  {
    id: 'professional', name: 'Professional Premium', icon: FileText,
    description: 'Premium professional design with corporate branding',
    preview: 'Executive-level professional template',
    color: 'blue',
    subject: 'Thank You for Your Inquiry — Reference #{{ticketId}}',
    body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Thank You</title></head><body style="margin:0;padding:0;background:#f1f5f9;font-family:'Georgia',serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:48px 16px;"><tr><td align="center"><table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:2px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);"><tr><td style="background:#1e3a5f;height:6px;font-size:0;">&nbsp;</td></tr><tr><td style="padding:44px 56px 36px;border-bottom:1px solid #e8ecf0;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td><p style="margin:0;font-size:22px;color:#1e3a5f;">Shanky Group</p><p style="margin:4px 0 0;font-size:11px;color:#8a97a5;letter-spacing:2px;text-transform:uppercase;">Professional Business Solutions</p></td><td align="right" valign="top"><p style="margin:0;font-size:11px;color:#8a97a5;letter-spacing:1.5px;text-transform:uppercase;">Reference</p><p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#1e3a5f;">#{{ticketId}}</p></td></tr></table></td></tr><tr><td style="padding:44px 56px;"><p style="margin:0 0 28px;font-size:17px;color:#1e3a5f;">Dear {{firstName}},</p><p style="margin:0 0 24px;font-size:15px;line-height:1.85;color:#3d4f60;">Thank you for contacting <strong>Shanky Group</strong>. We have received your inquiry and will respond within 24 business hours.</p><p style="margin:0;font-size:15px;color:#3d4f60;">Yours sincerely,<br><strong style="color:#1e3a5f;">Shanky Group</strong><br><span style="font-size:13px;color:#8a97a5;">Client Relations Team</span></p></td></tr><tr><td style="padding:28px 56px;background:#f8fafc;border-top:1px solid #e8ecf0;"><p style="margin:0;font-size:11px;color:#b0bac4;">&copy; 2026 Shanky Group. All Rights Reserved.</p></td></tr></table></td></tr></table></body></html>`,
  },
  {
    id: 'modern', name: 'Modern Luxury', icon: Sparkles,
    description: 'Contemporary luxury design with modern aesthetics',
    preview: 'Premium modern template with elegant styling',
    color: 'purple',
    subject: 'We Have Received Your Message — #{{ticketId}}',
    body: `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#0f0f14;font-family:'Helvetica Neue',Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f14;padding:56px 16px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#18181f;border-radius:4px;overflow:hidden;border:1px solid #2a2a35;"><tr><td style="background:linear-gradient(90deg,#6c47ff,#a78bfa);height:4px;font-size:0;">&nbsp;</td></tr><tr><td style="padding:44px 52px 36px;"><p style="margin:0;font-size:24px;font-weight:300;color:#e8e0ff;letter-spacing:1px;">Shanky Group</p></td></tr><tr><td style="padding:0 52px 44px;"><p style="margin:0 0 22px;font-size:17px;color:#c8c0f0;">Hello, <strong>{{firstName}}</strong></p><p style="margin:0;font-size:15px;line-height:1.9;color:#8a8aaa;">Thank you for reaching out to Shanky Group. Your message has been received and will be responded to within 24 business hours.</p></td></tr><tr><td style="padding:28px 52px;background:#0f0f14;border-top:1px solid #2a2a35;"><p style="margin:0;font-size:11px;color:#44445a;">&copy; 2026 Shanky Group</p></td></tr></table></td></tr></table></body></html>`,
  },
  {
    id: 'minimal', name: 'Minimal Elegant', icon: FileText,
    description: 'Clean, sophisticated design with timeless elegance',
    preview: 'Minimalist professional approach',
    color: 'slate',
    subject: 'Thank You for Your Message',
    body: `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#ffffff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:72px 16px;"><tr><td align="center"><table width="540" cellpadding="0" cellspacing="0"><tr><td style="padding-bottom:56px;border-bottom:1px solid #111111;"><p style="margin:0;font-size:20px;color:#111111;">Shanky Group</p></td></tr><tr><td style="padding-top:52px;padding-bottom:40px;"><p style="margin:0 0 10px;font-size:13px;color:#999999;letter-spacing:2px;text-transform:uppercase;">Reference #{{ticketId}}</p><h1 style="margin:0;font-size:36px;font-weight:300;color:#111111;">Thank you,<br>{{firstName}}.</h1></td></tr><tr><td style="padding-bottom:44px;"><p style="margin:0;font-size:16px;line-height:1.9;color:#444444;">We have received your message and will respond within 24 business hours.</p></td></tr><tr><td style="border-top:1px solid #eeeeee;padding-top:28px;"><p style="margin:0;font-size:11px;color:#bbbbbb;">&copy; 2026 Shanky Group · All Rights Reserved</p></td></tr></table></td></tr></table></body></html>`,
  },
  {
    id: 'corporate', name: 'Corporate Excellence', icon: Building2,
    description: 'Premium corporate design with professional branding',
    preview: 'Executive-level professional template',
    color: 'emerald',
    subject: 'Acknowledgment of Your Inquiry — Reference #{{ticketId}}',
    body: `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f0f4f0;font-family:'Georgia',Times,serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:48px 16px;"><tr><td align="center"><table width="660" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:2px;overflow:hidden;"><tr><td style="background:#1a3d2b;padding:52px 64px;"><p style="margin:0;font-size:26px;color:#ffffff;">Shanky Group</p><p style="margin:8px 0 0;font-size:11px;color:rgba(255,255,255,0.6);letter-spacing:3px;text-transform:uppercase;">Executive Business Solutions</p></td></tr><tr><td style="padding:56px 64px;"><p style="margin:0 0 26px;font-size:18px;color:#1a3d2b;">Dear {{firstName}},</p><p style="margin:0 0 28px;font-size:15px;line-height:1.9;color:#3d5248;">This is formal confirmation that your message has been received by <strong>Shanky Group</strong>. Our executive team will respond within 24 business hours.</p><p style="margin:0;font-size:15px;color:#3d5248;">Yours sincerely,<br><strong style="color:#1a3d2b;">Shanky Group</strong></p></td></tr><tr><td style="background:#1a3d2b;padding:16px 64px;text-align:center;"><p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);">&copy; 2026 Shanky Group. All Rights Reserved.</p></td></tr></table></td></tr></table></body></html>`,
  },
];

const vendorEmailTemplates: Template[] = [
  {
    id: 'vendor_professional', name: 'Vendor Professional', icon: Building2,
    description: 'Clean, professional email for vendor registration acknowledgment',
    preview: 'Vendor-focused thank you with next steps',
    color: 'teal',
    subject: 'Your Vendor Registration Has Been Received',
    body: `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f0fdfa;font-family:'Helvetica Neue',Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdfa;padding:48px 16px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:2px;overflow:hidden;"><tr><td style="background:#0d7a6d;height:5px;font-size:0;">&nbsp;</td></tr><tr><td style="padding:40px 52px 32px;border-bottom:1px solid #e8f5f3;"><p style="margin:0;font-size:20px;color:#0d7a6d;">Shanky Group</p><p style="margin:6px 0 0;font-size:11px;color:#9ab0ac;letter-spacing:2px;text-transform:uppercase;">Vendor Registration</p></td></tr><tr><td style="padding:44px 52px;"><p style="margin:0 0 24px;font-size:16px;color:#1a3330;">Dear <strong>{firstName} {lastName}</strong>,</p><p style="margin:0 0 28px;font-size:15px;line-height:1.85;color:#3d5550;">Thank you for registering your company with Shanky Group. Our team will review your details and contact you within 2 to 3 business days.</p><p style="margin:0;font-size:14px;color:#3d5550;">Best regards,<br><strong style="color:#0d7a6d;">Shanky Group</strong></p></td></tr></table></td></tr></table></body></html>`,
  },
  {
    id: 'vendor_corporate', name: 'Vendor Corporate', icon: Building2,
    description: 'Formal corporate style for vendor registration confirmation',
    preview: 'Executive-style vendor acknowledgment with reference',
    color: 'amber',
    subject: 'Vendor Registration Acknowledged — Reference #{ticketId}',
    body: `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#fdf8ef;font-family:'Georgia',Times,serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf8ef;padding:48px 16px;"><tr><td align="center"><table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e8d8b0;border-radius:2px;overflow:hidden;"><tr><td style="background:#7c4f1a;height:5px;font-size:0;">&nbsp;</td></tr><tr><td style="background:#7c4f1a;padding:44px 56px;"><p style="margin:0;font-size:24px;color:#ffffff;">Shanky Group</p></td></tr><tr><td style="padding:52px 56px;"><p style="margin:0 0 26px;font-size:17px;color:#3a2410;">Dear <strong>{firstName} {lastName}</strong>,</p><p style="margin:0 0 28px;font-size:15px;line-height:1.9;color:#5a4030;">This letter confirms receipt of your vendor registration. Your submission is currently under review and you will receive a formal response within 3 to 5 business days.</p><p style="margin:0;font-size:15px;color:#5a4030;">Yours sincerely,<br><strong style="color:#7c4f1a;">Shanky Group</strong></p></td></tr><tr><td style="background:#7c4f1a;height:3px;font-size:0;">&nbsp;</td></tr></table></td></tr></table></body></html>`,
  },
];

const invoiceTemplates: InvoiceTpl[] = [
  {
    id: 'professional',
    name: 'Professional Standard',
    icon: FileText,
    description: 'Market-ready professional GST invoice with full company branding',
    preview: 'Corporate tax invoice for real client use',
    color: 'blue',
    features: ['Shanky Group branded header', 'Buyer & seller GST blocks', 'HSN/SAC + tax table', 'CGST/SGST/IGST ready totals'],
    previewHtml: `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#1f2937;padding:16px}</style></head><body><div style="max-width:760px;margin:0 auto;background:#fff;border:1px solid #dbe4ef;box-shadow:0 2px 12px rgba(0,0,0,.08)"><div style="background:#0f3b7a;display:flex;justify-content:space-between;align-items:stretch"><div style="padding:18px 20px"><div style="font-size:18px;font-weight:700;color:#fff;letter-spacing:-.3px">SHANKY GROUP</div><div style="font-size:10px;color:#93c5fd;letter-spacing:1.5px;margin-top:2px">PROFESSIONAL BUSINESS SOLUTIONS</div><div style="margin-top:10px;font-size:11px;color:#bfdbfe;line-height:1.7">New Delhi 110001, India<br>GSTIN: 07AAKCS0000A1Z3<br>accounts@shankygroup.com</div></div><div style="background:#1e4e9e;padding:18px 20px;min-width:200px;display:flex;flex-direction:column;justify-content:center;text-align:right"><div style="font-size:10px;color:#93c5fd;letter-spacing:2px;text-transform:uppercase">Tax Invoice</div><div style="font-size:20px;font-weight:700;color:#fff;margin-top:4px">INV-2026-104</div><div style="margin-top:8px;font-size:11px;color:#bfdbfe;line-height:1.8"><div>Date: <strong>23-03-2026</strong></div><div>Due: <strong>22-04-2026</strong></div><div>Currency: <strong>INR</strong></div></div></div></div><div style="display:flex;border-bottom:2px solid #e5e7eb"><div style="flex:1;padding:14px 20px;border-right:1px solid #e5e7eb"><div style="font-size:9px;font-weight:700;color:#6b7280;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px">Bill To</div><div style="font-size:13px;font-weight:700;color:#111827">ABC Manufacturing Pvt Ltd</div><div style="font-size:12px;color:#374151;margin-top:2px">Rajesh Kumar (CFO)</div><div style="font-size:11px;color:#6b7280;margin-top:5px;line-height:1.7">rajesh@abcmfg.com · +91 98765 43210<br>GSTIN: 07ABCDE1234F1Z2<br>Connaught Place, New Delhi</div></div><div style="flex:1;padding:14px 20px"><div style="font-size:9px;font-weight:700;color:#6b7280;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px">Order Details</div><div style="font-size:11px;color:#374151;line-height:1.9"><div>PO Number: <strong>PO-MFG-7821</strong></div><div>Place of Supply: <strong>Delhi (07)</strong></div><div>Supply Type: <strong>Inter-State</strong></div></div></div></div><div style="padding:16px 20px"><table style="width:100%;border-collapse:collapse;font-size:11px"><thead><tr style="background:#f8fafc;border-bottom:2px solid #e5e7eb"><th style="padding:8px 10px;text-align:center;font-weight:600;color:#374151;width:32px">#</th><th style="padding:8px 10px;text-align:left;font-weight:600;color:#374151">Description of Service / Goods</th><th style="padding:8px 10px;text-align:center;font-weight:600;color:#374151;width:64px">HSN/SAC</th><th style="padding:8px 10px;text-align:right;font-weight:600;color:#374151;width:44px">Qty</th><th style="padding:8px 10px;text-align:right;font-weight:600;color:#374151;width:100px">Unit Price</th><th style="padding:8px 10px;text-align:right;font-weight:600;color:#374151;width:100px">Amount</th></tr></thead><tbody><tr style="border-bottom:1px solid #e5e7eb"><td style="padding:8px 10px;text-align:center;color:#374151">1</td><td style="padding:8px 10px;color:#111827">Annual Consulting Retainer</td><td style="padding:8px 10px;text-align:center;color:#374151">9983</td><td style="padding:8px 10px;text-align:right;color:#374151">1</td><td style="padding:8px 10px;text-align:right;color:#374151">₹1,20,000.00</td><td style="padding:8px 10px;text-align:right;font-weight:600;color:#111827">₹1,20,000.00</td></tr><tr style="border-bottom:1px solid #e5e7eb"><td style="padding:8px 10px;text-align:center;color:#374151">2</td><td style="padding:8px 10px;color:#111827">Business Strategy Workshop (2 days)</td><td style="padding:8px 10px;text-align:center;color:#374151">9983</td><td style="padding:8px 10px;text-align:right;color:#374151">2</td><td style="padding:8px 10px;text-align:right;color:#374151">₹25,000.00</td><td style="padding:8px 10px;text-align:right;font-weight:600;color:#111827">₹50,000.00</td></tr></tbody></table></div><div style="display:flex;border-top:1px solid #e5e7eb;margin:0 20px 16px"><div style="flex:1;padding:12px 0;padding-right:16px;border-right:1px solid #e5e7eb;font-size:11px;color:#6b7280"><div style="font-weight:700;color:#374151;margin-bottom:6px;font-size:10px;text-transform:uppercase;letter-spacing:1px">Payment Details</div><div style="line-height:1.9">Bank: <strong style="color:#374151">HDFC Bank</strong><br>A/C No: <strong style="color:#374151">50100123456789</strong><br>IFSC: <strong style="color:#374151">HDFC0000001</strong><br>Branch: <strong style="color:#374151">New Delhi Main Branch</strong></div></div><div style="min-width:240px;padding:12px 0;padding-left:16px"><table style="width:100%;font-size:11px;border-collapse:collapse"><tr><td style="padding:4px 10px;color:#6b7280">Taxable Value</td><td style="padding:4px 10px;text-align:right;color:#374151">₹1,70,000.00</td></tr><tr><td style="padding:4px 10px;color:#6b7280">IGST (18%)</td><td style="padding:4px 10px;text-align:right;color:#374151">₹30,600.00</td></tr><tr style="background:#f8fafc;border-top:2px solid #e5e7eb"><td style="padding:8px 10px;font-weight:700;font-size:13px;color:#0f3b7a">Grand Total</td><td style="padding:8px 10px;text-align:right;font-weight:700;font-size:15px;color:#0f3b7a">₹2,00,600.00</td></tr></table></div></div><div style="margin:0 20px 14px;padding:10px 14px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:4px;font-size:11px"><span style="color:#6b7280;font-weight:600">Amount in Words: </span><span style="color:#0369a1;font-weight:600">INR Two Lakh Six Hundred Only</span></div><div style="border-top:2px solid #0f3b7a;margin:0 20px;padding:10px 0;display:flex;justify-content:space-between;align-items:flex-end"><div style="font-size:10px;color:#6b7280;max-width:320px;line-height:1.7">Payment due within 30 days. Late payments attract 2% per month interest. Goods once sold will not be taken back.</div><div style="text-align:center;min-width:130px"><div style="border-top:1px solid #9ca3af;padding-top:5px;font-size:10px;color:#6b7280">Authorised Signatory<br><strong style="color:#111827">Shanky Group</strong></div></div></div><div style="background:#f8fafc;padding:8px 20px;font-size:9px;color:#9ca3af;text-align:center;border-top:1px solid #e5e7eb">Computer Generated Invoice — Valid without physical signature | accounts@shankygroup.com</div></div></body></html>`,
  },
  {
    id: 'corporate',
    name: 'Corporate Executive',
    icon: Building2,
    description: 'Formal enterprise layout with stronger branding',
    preview: 'Navy executive invoice style',
    color: 'indigo',
    features: ['Executive header style', 'Structured billing blocks', 'PO and supply place visibility', 'Legal footer section'],
    previewHtml: `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#eef2ff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#0f172a;padding:16px}</style></head><body><div style="max-width:760px;margin:0 auto;background:#fff;border:1px solid #c7d2fe;box-shadow:0 4px 20px rgba(30,58,138,.1)"><div style="height:5px;background:linear-gradient(90deg,#1e3a8a,#4f46e5,#7c3aed)"></div><div style="padding:20px 24px;border-bottom:1px solid #e0e7ff;display:flex;justify-content:space-between;align-items:flex-start"><div><div style="font-size:20px;font-weight:800;color:#1e3a8a;letter-spacing:-.5px">SHANKY GROUP</div><div style="font-size:10px;color:#6366f1;letter-spacing:2px;margin-top:2px;text-transform:uppercase">Corporate & Executive Services</div><div style="margin-top:10px;font-size:11px;color:#475569;line-height:1.8">New Delhi 110001, India<br>GSTIN: 07AAKCS0000A1Z3<br>accounts@shankygroup.com · +91 11 4567 8900</div></div><div style="text-align:right"><div style="display:inline-block;border:2px solid #1e3a8a;border-radius:6px;padding:12px 18px"><div style="font-size:10px;font-weight:700;color:#6366f1;letter-spacing:2px;text-transform:uppercase">Corporate Tax Invoice</div><div style="font-size:22px;font-weight:800;color:#1e3a8a;margin-top:3px">INV-CORP-0091</div><div style="margin-top:8px;font-size:11px;color:#475569;line-height:1.8"><div>Date: <strong>23-03-2026</strong></div><div>Due: <strong>22-04-2026</strong></div></div></div><div style="margin-top:8px;font-size:18px;font-weight:800;color:#1e3a8a">₹2,36,000.00</div><div style="font-size:9px;color:#94a3b8;letter-spacing:1px">TOTAL DUE</div></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:0;border-bottom:1px solid #e0e7ff"><div style="padding:14px 24px;border-right:1px solid #e0e7ff"><div style="font-size:9px;font-weight:700;color:#94a3b8;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px">Billed To</div><div style="font-size:14px;font-weight:700;color:#0f172a">Nexus Enterprises Pvt Ltd</div><div style="font-size:12px;color:#475569;margin-top:2px">Priya Sharma (Director)</div><div style="font-size:11px;color:#94a3b8;margin-top:5px;line-height:1.8">priya@nexusent.com<br>GSTIN: 27NEXUS0001B1Z5<br>Bandra Kurla Complex, Mumbai</div></div><div style="padding:14px 24px"><div style="font-size:9px;font-weight:700;color:#94a3b8;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px">Reference</div><div style="font-size:11px;color:#475569;line-height:2"><span style="color:#94a3b8">PO Number:</span> <strong>PO-NX-2026-0312</strong><br><span style="color:#94a3b8">Place of Supply:</span> <strong>Maharashtra (27)</strong><br><span style="color:#94a3b8">Supply Type:</span> <strong>Inter-State (IGST)</strong><br><span style="color:#94a3b8">Payment Terms:</span> <strong>Net 30 Days</strong></div></div></div><div style="padding:16px 24px"><table style="width:100%;border-collapse:collapse;font-size:11px"><thead><tr style="border-bottom:2px solid #e0e7ff"><th style="padding:8px 0;text-align:left;font-weight:600;color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:1px">Description</th><th style="padding:8px 0;text-align:center;font-weight:600;color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:1px;width:64px">HSN</th><th style="padding:8px 0;text-align:center;font-weight:600;color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:1px;width:44px">Qty</th><th style="padding:8px 0;text-align:right;font-weight:600;color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:1px;width:100px">Rate</th><th style="padding:8px 0;text-align:right;font-weight:600;color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:1px;width:100px">Amount</th></tr></thead><tbody><tr style="border-bottom:1px solid #f1f5f9"><td style="padding:10px 0;color:#0f172a">Enterprise Digital Transformation — Phase 1</td><td style="padding:10px 0;text-align:center;color:#475569">9983</td><td style="padding:10px 0;text-align:center;color:#475569">1</td><td style="padding:10px 0;text-align:right;color:#475569">₹1,50,000.00</td><td style="padding:10px 0;text-align:right;font-weight:600;color:#0f172a">₹1,50,000.00</td></tr><tr style="border-bottom:1px solid #f1f5f9"><td style="padding:10px 0;color:#0f172a">Executive Leadership Programme (5 sessions)</td><td style="padding:10px 0;text-align:center;color:#475569">9992</td><td style="padding:10px 0;text-align:center;color:#475569">5</td><td style="padding:10px 0;text-align:right;color:#475569">₹10,000.00</td><td style="padding:10px 0;text-align:right;font-weight:600;color:#0f172a">₹50,000.00</td></tr></tbody></table></div><div style="display:flex;justify-content:flex-end;padding:0 24px 16px"><div style="min-width:260px"><div style="display:flex;justify-content:space-between;padding:6px 0;font-size:11px;color:#475569;border-bottom:1px solid #f1f5f9"><span>Subtotal</span><span>₹2,00,000.00</span></div><div style="display:flex;justify-content:space-between;padding:6px 0;font-size:11px;color:#475569;border-bottom:1px solid #f1f5f9"><span>IGST (18%)</span><span>₹36,000.00</span></div><div style="display:flex;justify-content:space-between;padding:10px 0;font-size:15px;font-weight:800;color:#1e3a8a;border-top:2px solid #1e3a8a;margin-top:2px"><span>Grand Total</span><span>₹2,36,000.00</span></div></div></div><div style="margin:0 24px 14px;padding:10px 14px;background:#eff6ff;border:1px solid #bfdbfe;font-size:11px"><span style="color:#3b82f6;font-weight:700">Amount in Words: </span><span style="color:#1e3a8a;font-weight:600">INR Two Lakh Thirty-Six Thousand Only</span></div><div style="display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid #e0e7ff;margin:0 24px;padding:12px 0"><div style="font-size:11px;color:#475569;line-height:1.7"><div style="background:#f8fafc;border-radius:6px;padding:10px 14px;font-size:11px;color:#334155"><strong>Bank:</strong> HDFC Bank &nbsp;|&nbsp; <strong>A/C:</strong> 50100123456789 &nbsp;|&nbsp; <strong>IFSC:</strong> HDFC0000001</div></div><div style="text-align:center;min-width:140px"><div style="height:36px"></div><div style="border-top:1px solid #94a3b8;padding-top:5px;font-size:10px;color:#94a3b8">For Shanky Group<br><strong style="color:#0f172a">Authorised Signatory</strong></div></div></div><div style="background:#1e3a8a;padding:10px 24px;display:flex;justify-content:space-between;align-items:center"><div style="font-size:10px;color:#93c5fd">Subject to Delhi jurisdiction. E&OE.</div><div style="font-size:10px;font-weight:700;color:#fff">accounts@shankygroup.com</div></div></div></body></html>`,
  },
  {
    id: 'modern',
    name: 'Modern Minimal',
    icon: Sparkles,
    description: 'Contemporary clean card layout with subtle accents',
    preview: 'Minimal modern invoice card',
    color: 'purple',
    features: ['Minimal visual noise', 'Clear tax breakup', 'Compact sections', 'Fast readability on mobile'],
    previewHtml: `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#111827;padding:16px}</style></head><body><div style="max-width:680px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1),0 10px 40px rgba(0,0,0,.07)"><div style="background:#7c3aed;padding:24px 28px;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:18px;font-weight:800;color:#fff;letter-spacing:-.5px">Shanky Group</div><div style="font-size:10px;color:#ddd6fe;margin-top:2px">accounts@shankygroup.com</div></div><div style="text-align:right"><div style="font-size:10px;color:#ddd6fe;letter-spacing:2px;text-transform:uppercase">Invoice</div><div style="font-size:18px;font-weight:800;color:#fff;margin-top:1px">INV-2026-301</div></div></div><div style="display:flex;border-bottom:1px solid #f3f4f6"><div style="flex:1;padding:12px 28px;border-right:1px solid #f3f4f6"><div style="font-size:9px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:3px">Issued</div><div style="font-size:13px;font-weight:600;color:#111827">23 March 2026</div></div><div style="flex:1;padding:12px 28px;border-right:1px solid #f3f4f6"><div style="font-size:9px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:3px">Due</div><div style="font-size:13px;font-weight:600;color:#ef4444">22 April 2026</div></div><div style="flex:1;padding:12px 28px"><div style="font-size:9px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:3px">Currency</div><div style="font-size:13px;font-weight:600;color:#111827">INR</div></div></div><div style="padding:20px 28px;display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #f3f4f6"><div><div style="font-size:9px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:5px">Billed To</div><div style="font-size:15px;font-weight:700;color:#111827">Zenith Tech Solutions</div><div style="font-size:12px;color:#6b7280;margin-top:2px">Aryan Mehta · aryan@zenithtech.io</div><div style="font-size:11px;color:#9ca3af;margin-top:3px">GSTIN: 29ZENITH001C1Z9 · Bengaluru</div></div><div style="text-align:right"><div style="font-size:9px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px">Amount Due</div><div style="font-size:30px;font-weight:800;color:#7c3aed">₹94,400</div></div></div><div style="padding:16px 28px"><table style="width:100%;border-collapse:collapse"><thead><tr><th style="padding:0 0 8px;text-align:left;font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px">Description</th><th style="padding:0 0 8px;text-align:center;font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;width:44px">Qty</th><th style="padding:0 0 8px;text-align:right;font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;width:90px">Rate</th><th style="padding:0 0 8px;text-align:right;font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;width:90px">Total</th></tr></thead><tbody><tr style="border-top:1px solid #f3f4f6"><td style="padding:11px 0;font-size:13px;color:#111827">Brand Identity Design System</td><td style="padding:11px 0;text-align:center;font-size:12px;color:#6b7280">1</td><td style="padding:11px 0;text-align:right;font-size:12px;color:#6b7280">₹45,000</td><td style="padding:11px 0;text-align:right;font-size:13px;font-weight:700;color:#111827">₹45,000</td></tr><tr style="border-top:1px solid #f3f4f6"><td style="padding:11px 0;font-size:13px;color:#111827">Digital Marketing Campaign (3 months)</td><td style="padding:11px 0;text-align:center;font-size:12px;color:#6b7280">3</td><td style="padding:11px 0;text-align:right;font-size:12px;color:#6b7280">₹12,000</td><td style="padding:11px 0;text-align:right;font-size:13px;font-weight:700;color:#111827">₹36,000</td></tr></tbody></table></div><div style="padding:0 28px 20px;display:flex;justify-content:flex-end"><div style="min-width:230px;background:#f9fafb;border-radius:10px;padding:14px 18px"><div style="display:flex;justify-content:space-between;margin-bottom:7px;font-size:12px;color:#6b7280"><span>Subtotal</span><span>₹81,000</span></div><div style="display:flex;justify-content:space-between;margin-bottom:7px;font-size:12px;color:#6b7280"><span>IGST (18%)</span><span>₹14,580</span></div><div style="display:flex;justify-content:space-between;padding-top:10px;margin-top:3px;border-top:2px solid #e5e7eb;font-size:15px;font-weight:800;color:#7c3aed"><span>Total</span><span>₹95,580</span></div></div></div><div style="margin:0 28px 16px;font-size:11px;color:#6b7280"><strong style="color:#374151">Amount in Words:</strong> INR Ninety-Five Thousand Five Hundred Eighty Only</div><div style="border-top:1px solid #f3f4f6;padding:14px 28px;display:flex;justify-content:space-between;align-items:center;background:#fafafa"><div style="font-size:11px;color:#6b7280">Bank: <strong style="color:#374151">HDFC Bank</strong> &nbsp;·&nbsp; A/C: <strong style="color:#374151">50100123456789</strong> &nbsp;·&nbsp; IFSC: <strong style="color:#374151">HDFC0000001</strong></div><div style="font-size:10px;color:#9ca3af">Net 30 Days</div></div></div></body></html>`,
  },
  {
    id: 'classic',
    name: 'Classic Traditional',
    icon: FileText,
    description: 'Traditional black-and-white invoice with formal structure',
    preview: 'Old-school formal invoice look',
    color: 'slate',
    features: ['Monochrome legal format', 'Dense item detail support', 'Strong print contrast', 'Audit-friendly layout'],
    previewHtml: `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;font-family:'Times New Roman',Times,Georgia,serif;color:#111827;padding:16px}</style></head><body><div style="max-width:760px;margin:0 auto;border:1px solid #4b5563;padding:24px 28px"><div style="border-bottom:3px double #374151;padding-bottom:12px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:flex-start"><div><div style="font-size:20px;font-weight:700;letter-spacing:-.3px">SHANKY GROUP</div><div style="font-size:10px;color:#6b7280;margin-top:1px;letter-spacing:1px">PROFESSIONAL BUSINESS SOLUTIONS</div><div style="font-size:11px;color:#374151;margin-top:7px;line-height:1.8">New Delhi 110001, India<br>GSTIN: 07AAKCS0000A1Z3<br>accounts@shankygroup.com</div></div><div style="text-align:right"><div style="font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:2px;border:2px solid #374151;padding:5px 14px;display:inline-block">TAX INVOICE</div><div style="margin-top:10px;font-size:11px;line-height:1.9"><div><strong>Invoice No.:</strong> SG-CL-2026-0088</div><div><strong>Date:</strong> 23-03-2026</div><div><strong>Due Date:</strong> 22-04-2026</div><div><strong>Currency:</strong> INR</div></div></div></div><div style="display:flex;gap:20px;margin-bottom:16px;font-size:11px"><div style="flex:1;border:1px solid #d1d5db;padding:10px 12px"><div style="font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;border-bottom:1px solid #d1d5db;padding-bottom:4px;font-size:10px">Bill To</div><div style="font-weight:700;font-size:12px">Horizon Exports Ltd</div><div style="margin-top:2px">Vikram Nair (Managing Director)</div><div style="color:#6b7280;margin-top:3px;line-height:1.8">vikram@horizonexports.com<br>GSTIN: 32HORIZ0001X1Z4<br>Marine Drive, Kochi, Kerala</div></div><div style="flex:1;border:1px solid #d1d5db;padding:10px 12px"><div style="font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;border-bottom:1px solid #d1d5db;padding-bottom:4px;font-size:10px">Invoice Details</div><div style="color:#374151;line-height:1.9">PO Ref: <strong>PO-HE-881</strong><br>Place of Supply: <strong>Kerala (32)</strong><br>Supply Type: <strong>Inter-State</strong><br>HSN/SAC Code: <strong>9983</strong></div></div></div><table style="width:100%;border-collapse:collapse;font-size:11px;margin-bottom:14px;border:1px solid #9ca3af"><thead><tr style="background:#f3f4f6;border-bottom:2px solid #9ca3af"><th style="padding:8px 10px;text-align:center;width:28px">#</th><th style="padding:8px 10px;text-align:left">Particulars</th><th style="padding:8px 10px;text-align:center;width:44px">Qty</th><th style="padding:8px 10px;text-align:right;width:95px">Unit Rate</th><th style="padding:8px 10px;text-align:right;width:95px">Amount</th></tr></thead><tbody><tr style="border-bottom:1px solid #d1d5db"><td style="padding:8px 10px;text-align:center">1</td><td style="padding:8px 10px">Annual Compliance & Legal Advisory</td><td style="padding:8px 10px;text-align:center">1</td><td style="padding:8px 10px;text-align:right">₹85,000.00</td><td style="padding:8px 10px;text-align:right;font-weight:600">₹85,000.00</td></tr><tr style="border-bottom:1px solid #d1d5db"><td style="padding:8px 10px;text-align:center">2</td><td style="padding:8px 10px">Export Documentation Support (per shipment)</td><td style="padding:8px 10px;text-align:center">4</td><td style="padding:8px 10px;text-align:right">₹5,000.00</td><td style="padding:8px 10px;text-align:right;font-weight:600">₹20,000.00</td></tr></tbody></table><div style="display:flex;gap:18px;margin-bottom:14px"><div style="flex:1;border:1px solid #d1d5db;padding:10px 12px;font-size:11px"><div style="font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;font-size:10px">Bank Details</div><div style="line-height:1.9;color:#374151">Bank Name: <strong>HDFC Bank</strong><br>Account No: <strong>50100123456789</strong><br>IFSC Code: <strong>HDFC0000001</strong><br>Branch: <strong>New Delhi Main Branch</strong></div></div><div style="min-width:240px"><table style="width:100%;border-collapse:collapse;font-size:11px;border:1px solid #d1d5db"><tr style="border-bottom:1px solid #d1d5db"><td style="padding:7px 10px;color:#6b7280">Taxable Value</td><td style="padding:7px 10px;text-align:right">₹1,05,000.00</td></tr><tr style="border-bottom:1px solid #d1d5db"><td style="padding:7px 10px;color:#6b7280">IGST (18%)</td><td style="padding:7px 10px;text-align:right">₹18,900.00</td></tr><tr style="background:#f3f4f6;border-top:2px solid #374151"><td style="padding:9px 10px;font-weight:700;font-size:12px">Grand Total</td><td style="padding:9px 10px;text-align:right;font-weight:700;font-size:14px">₹1,23,900.00</td></tr></table></div></div><div style="border:1px solid #d1d5db;padding:9px 12px;font-size:11px;margin-bottom:14px"><strong>Amount in Words:</strong> INR One Lakh Twenty-Three Thousand Nine Hundred Only</div><div style="display:flex;justify-content:space-between;align-items:flex-end;padding-top:12px;border-top:1px solid #d1d5db"><div style="font-size:10px;color:#374151;max-width:320px;line-height:1.7"><strong>Terms &amp; Conditions:</strong><br>1. Payment due within 30 days from invoice date.<br>2. Late payments subject to 2% per month interest.<br>3. Subject to Delhi jurisdiction.</div><div style="text-align:center;min-width:150px"><div style="height:40px;border-bottom:1px solid #374151"></div><div style="font-size:10px;color:#374151;margin-top:4px">Authorised Signatory<br><strong>Shanky Group</strong></div></div></div><div style="margin-top:12px;padding-top:8px;border-top:1px solid #d1d5db;font-size:9px;color:#9ca3af;text-align:center">Computer Generated Invoice — No Signature Required | accounts@shankygroup.com</div></div></body></html>`,
  },
];

const smtpPresets = [
  { name: 'Elastic Mail', icon: Zap, host: 'smtp.elasticemail.com', port: '2525', secure: 'false', color: 'purple', description: 'Free — 100 emails/day' },
  { name: 'Gmail', icon: Mail, host: 'smtp.gmail.com', port: '587', secure: 'false', color: 'red', description: 'Use App Password' },
  { name: 'Outlook', icon: Globe, host: 'smtp-mail.outlook.com', port: '587', secure: 'false', color: 'sky', description: 'Microsoft Outlook SMTP' },
];

/* ─── color map ── */
const COLOR: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  blue:   { border:'rgba(59,130,246,0.25)',  bg:'rgba(59,130,246,0.07)',  text:'#93c5fd', badge:'rgba(59,130,246,0.15)' },
  purple: { border:'rgba(139,92,246,0.25)',  bg:'rgba(139,92,246,0.07)',  text:'#c4b5fd', badge:'rgba(139,92,246,0.15)' },
  slate:  { border:'rgba(148,163,184,0.2)',  bg:'rgba(148,163,184,0.05)', text:'#cbd5e1', badge:'rgba(148,163,184,0.1)' },
  emerald:{ border:'rgba(16,185,129,0.25)',  bg:'rgba(16,185,129,0.07)',  text:'#6ee7b7', badge:'rgba(16,185,129,0.15)' },
  teal:   { border:'rgba(20,184,166,0.25)',  bg:'rgba(20,184,166,0.07)',  text:'#5eead4', badge:'rgba(20,184,166,0.15)' },
  amber:  { border:'rgba(245,158,11,0.25)',  bg:'rgba(245,158,11,0.07)',  text:'#fcd34d', badge:'rgba(245,158,11,0.15)' },
  red:    { border:'rgba(239,68,68,0.25)',   bg:'rgba(239,68,68,0.07)',   text:'#fca5a5', badge:'rgba(239,68,68,0.15)' },
  sky:    { border:'rgba(14,165,233,0.25)',  bg:'rgba(14,165,233,0.07)',  text:'#7dd3fc', badge:'rgba(14,165,233,0.15)' },
  indigo: { border:'rgba(99,102,241,0.25)',  bg:'rgba(99,102,241,0.07)',  text:'#a5b4fc', badge:'rgba(99,102,241,0.15)' },
};

/* ══════════════════════════ PAGE ══ */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('smtp');
  const [msg, setMsg] = useState<Msg>({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState<SmtpForm>({
    smtp_host: '', smtp_port: '', smtp_secure: 'false',
    smtp_user: '', smtp_password: '',
    smtp_from_email: '', smtp_from_name: 'Business Management System',
    admin_notification_email: '',
  });
  const [showPwd, setShowPwd] = useState(false);
  const [testEmail, setTestEmail] = useState('');

  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);
  const [customTemplate, setCustomTemplate] = useState({ subject: '', body: '' });

  const [selectedVendorTemplate, setSelectedVendorTemplate] = useState('vendor_professional');
  const [vendorContent, setVendorContent] = useState({ subject: '', body: '' });
  const [isEditingVendor, setIsEditingVendor] = useState(false);
  const [vendorCustom, setVendorCustom] = useState({ subject: '', body: '' });

  const [selectedInvoiceTpl, setSelectedInvoiceTpl] = useState('professional');
  const [invoiceTemplateHtml, setInvoiceTemplateHtml] = useState('');

  const showMsg = (type: 'success' | 'error', text: string) => setMsg({ type, text });
  const clearMsg = () => setMsg({ type: '', text: '' });

  useEffect(() => {
    (async () => {
      try {
        const [smtpRes, adminRes, tplRes, vendorRes, invRes] = await Promise.allSettled([
          fetch('/admin/api/settings'),
          fetch('/admin/api/settings/admin-notification-email'),
          fetch('/admin/api/email-template/contact'),
          fetch('/admin/api/email-template/vendor-registration'),
          fetch('/admin/api/invoice-template-setting'),
        ]);
        if (smtpRes.status === 'fulfilled' && smtpRes.value.ok) { const d = await smtpRes.value.json(); setForm(p => ({ ...p, ...d })); }
        if (adminRes.status === 'fulfilled' && adminRes.value.ok) { const d = await adminRes.value.json(); setForm(p => ({ ...p, admin_notification_email: d.email || '' })); }
        if (tplRes.status === 'fulfilled' && tplRes.value.ok) { const d = await tplRes.value.json(); if (d.template_id) setSelectedTemplate(d.template_id); if (d.custom_subject) setCustomTemplate(p => ({ ...p, subject: d.custom_subject })); if (d.custom_body) setCustomTemplate(p => ({ ...p, body: d.custom_body })); }
        if (vendorRes.status === 'fulfilled' && vendorRes.value.ok) { const d = await vendorRes.value.json(); if (d.template_id) setSelectedVendorTemplate(d.template_id); const base = vendorEmailTemplates.find(t => t.id === d.template_id) || vendorEmailTemplates[0]; setVendorContent({ subject: d.custom_subject || base.subject, body: d.custom_body || base.body }); }
        if (invRes.status === 'fulfilled' && invRes.value.ok) {
          const d = await invRes.value.json();
          const id = d.template_id || 'professional';
          setSelectedInvoiceTpl(id);
          const base = invoiceTemplates.find(t => t.id === id)?.previewHtml || '';
          setInvoiceTemplateHtml(d.template_html || base);
        }
      } catch { /* silent */ }
      finally { setPageLoading(false); }
    })();
  }, []);

  async function handleSaveAdminEmail() {
    setLoading(true); clearMsg();
    try { const res = await fetch('/admin/api/settings/admin-notification-email', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.admin_notification_email }) }); const d = await res.json(); res.ok ? showMsg('success', 'Admin notification email saved!') : showMsg('error', d.message || 'Failed to save'); } catch { showMsg('error', 'Network error.'); } finally { setLoading(false); }
  }
  async function handleSaveSmtp(e: FormEvent) {
    e.preventDefault(); setLoading(true); clearMsg();
    try { const res = await fetch('/admin/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); const d = await res.json(); res.ok ? showMsg('success', 'SMTP configuration saved successfully!') : showMsg('error', d.message || 'Failed to save'); } catch { showMsg('error', 'Network error.'); } finally { setLoading(false); }
  }
  async function handleTestEmail() {
    if (!testEmail) { showMsg('error', 'Please enter a test email address'); return; }
    setLoading(true); clearMsg();
    try { const res = await fetch('/admin/api/test-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to_email: testEmail }) }); const d = await res.json(); res.ok ? showMsg('success', 'Test email sent successfully!') : showMsg('error', d.debug ? `${d.message} (${d.debug})` : d.message); } catch { showMsg('error', 'Network error.'); } finally { setLoading(false); }
  }
  async function handleSaveContactTemplate() {
    setLoading(true); clearMsg();
    const tpl = emailTemplates.find(t => t.id === selectedTemplate)!;
    try { const res = await fetch('/admin/api/email-template/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ template_id: selectedTemplate, custom_subject: customTemplate.subject || tpl.subject, custom_body: customTemplate.body || tpl.body }) }); const d = await res.json(); res.ok ? showMsg('success', 'Email template saved successfully!') : showMsg('error', d.message || 'Failed to save'); } catch { showMsg('error', 'Network error.'); } finally { setLoading(false); }
  }
  async function handleSaveVendorTemplate() {
    setLoading(true); clearMsg();
    try { const res = await fetch('/admin/api/email-template/vendor-registration', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ template_id: selectedVendorTemplate, custom_subject: vendorContent.subject, custom_body: vendorContent.body }) }); const d = await res.json(); if (res.ok) { showMsg('success', 'Vendor email template saved!'); setIsEditingVendor(false); } else showMsg('error', d.message || 'Failed to save'); } catch { showMsg('error', 'Network error.'); } finally { setLoading(false); }
  }
  async function handleSaveVendorContent() { setVendorContent(vendorCustom); setIsEditingVendor(false); await handleSaveVendorTemplate(); }
  async function handleSaveInvoiceTpl() {
    setLoading(true); clearMsg();
    try { const res = await fetch('/admin/api/invoice-template-setting', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ template_id: selectedInvoiceTpl, template_html: invoiceTemplateHtml }) }); const d = await res.json(); res.ok ? showMsg('success', 'Invoice template saved!') : showMsg('error', d.message || 'Failed to save'); } catch { showMsg('error', 'Network error.'); } finally { setLoading(false); }
  }
  function applyPreset(p: typeof smtpPresets[0]) {
    setForm(prev => ({ ...prev, smtp_host: p.host, smtp_port: p.port, smtp_secure: p.secure }));
    showMsg('success', `Applied ${p.name} preset! Fill in your credentials below.`);
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'smtp', label: 'SMTP', icon: Mail },
    { id: 'templates', label: 'Contact Email', icon: FileText },
    { id: 'vendor-templates', label: 'Vendor Email', icon: Building2 },
    { id: 'invoice-templates', label: 'Invoices', icon: FileText },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

    .sp-root { font-family:'DM Sans',sans-serif; color:#e2e8f0; }

    /* PAGE HEADER */
    .sp-page-header {
      margin-bottom:28px;
      display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap;
    }
    .sp-page-eyebrow { font-size:11px; font-weight:600; letter-spacing:1.8px; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:6px; }
    .sp-page-title { font-family:'Syne',sans-serif; font-weight:800; font-size:26px; color:#fff; letter-spacing:-0.7px; margin-bottom:4px; }
    .sp-page-sub { font-size:14px; color:rgba(255,255,255,0.36); font-weight:300; }

    /* TABS */
    .sp-tabs { display:flex; gap:4px; margin-bottom:24px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:11px; padding:4px; }
    .sp-tab {
      flex:1; display:flex; align-items:center; justify-content:center; gap:7px;
      padding:8px 14px; border-radius:8px; border:none; background:none;
      font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
      color:rgba(255,255,255,0.4); cursor:pointer; transition:all 0.18s;
      white-space:nowrap;
    }
    .sp-tab:hover { color:rgba(255,255,255,0.7); background:rgba(255,255,255,0.04); }
    .sp-tab.active { background:#0d0d1a; color:#fff; border:1px solid rgba(255,255,255,0.1); box-shadow:0 2px 8px rgba(0,0,0,0.3); }
    .sp-tab.active .sp-tab-icon { color:#a78bfa; }
    .sp-tab-icon { width:14px; height:14px; }
    @media(max-width:640px){ .sp-tabs { flex-wrap:wrap; } .sp-tab { flex:none; } }

    /* ALERT */
    .sp-alert { display:flex; align-items:flex-start; gap:10px; border-radius:10px; border:1px solid; padding:12px 14px; font-size:13px; margin-bottom:18px; }
    .sp-alert.success { border-color:rgba(20,184,166,0.25); background:rgba(20,184,166,0.08); color:#5eead4; }
    .sp-alert.error   { border-color:rgba(239,68,68,0.25);  background:rgba(239,68,68,0.08);  color:#fca5a5; }
    .sp-alert-close { margin-left:auto; background:none; border:none; color:inherit; opacity:0.5; cursor:pointer; padding:0; display:flex; align-items:center; }
    .sp-alert-close:hover { opacity:1; }

    /* CARD */
    .sp-card { background:#0d0d1a; border:1px solid rgba(255,255,255,0.07); border-radius:14px; overflow:hidden; margin-bottom:14px; }
    .sp-card-header { padding:18px 20px 16px; border-bottom:1px solid rgba(255,255,255,0.06); display:flex; align-items:flex-start; justify-content:space-between; gap:12px; }
    .sp-card-title { font-family:'Syne',sans-serif; font-weight:700; font-size:14px; color:#fff; letter-spacing:-0.2px; margin-bottom:3px; }
    .sp-card-sub { font-size:12px; color:rgba(255,255,255,0.3); font-weight:400; }
    .sp-card-body { padding:18px 20px; }

    /* FIELD */
    .sp-field { margin-bottom:14px; }
    .sp-label { display:flex; align-items:center; gap:6px; font-size:11px; font-weight:600; letter-spacing:0.8px; text-transform:uppercase; color:rgba(255,255,255,0.45); margin-bottom:7px; }
    .sp-input {
      width:100%; height:42px; padding:0 14px;
      background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09);
      border-radius:9px; color:#fff; font-size:13.5px; font-family:'DM Sans',sans-serif;
      outline:none; transition:border-color 0.18s, background 0.18s, box-shadow 0.18s;
    }
    .sp-input::placeholder { color:rgba(255,255,255,0.2); }
    .sp-input:focus { border-color:rgba(99,57,255,0.45); background:rgba(99,57,255,0.06); box-shadow:0 0 0 3px rgba(99,57,255,0.08); }
    .sp-textarea { height:auto; padding:12px 14px; resize:vertical; line-height:1.5; }

    /* GRID */
    .sp-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    @media(max-width:600px){ .sp-grid-2 { grid-template-columns:1fr; } }
    .sp-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
    @media(max-width:600px){ .sp-grid-3 { grid-template-columns:1fr; } }
    .sp-grid-2-cards { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    @media(max-width:560px){ .sp-grid-2-cards { grid-template-columns:1fr; } }

    /* PRESET / TEMPLATE CARDS */
    .sp-preset-card {
      border-radius:10px; border:1px solid; padding:14px 16px;
      text-align:left; cursor:pointer; transition:all 0.18s;
      background:rgba(255,255,255,0.03);
      font-family:'DM Sans',sans-serif;
    }
    .sp-preset-card:hover { transform:translateY(-1px); }
    .sp-preset-name { font-size:13px; font-weight:600; display:flex; align-items:center; gap:7px; margin-bottom:4px; }
    .sp-preset-desc { font-size:11px; opacity:0.65; margin-bottom:3px; }
    .sp-preset-host { font-size:10.5px; opacity:0.4; font-family:monospace; }

    .sp-tpl-card {
      border-radius:10px; border:1px solid rgba(255,255,255,0.07);
      padding:14px 16px; text-align:left; cursor:pointer;
      transition:all 0.18s; background:rgba(255,255,255,0.03);
      font-family:'DM Sans',sans-serif;
    }
    .sp-tpl-card:hover { border-color:rgba(255,255,255,0.14); background:rgba(255,255,255,0.05); }
    .sp-tpl-card.active { border-color:rgba(99,57,255,0.4); background:rgba(99,57,255,0.08); }
    .sp-tpl-card-name { font-size:13px; font-weight:600; color:#fff; display:flex; align-items:center; gap:7px; margin-bottom:4px; }
    .sp-tpl-card-desc { font-size:11.5px; color:rgba(255,255,255,0.38); margin-bottom:3px; }
    .sp-tpl-card-sub { font-size:11px; color:rgba(255,255,255,0.22); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .sp-radio { width:16px; height:16px; border-radius:50%; border:1.5px solid rgba(255,255,255,0.25); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.18s; }
    .sp-radio.active { background:#6339ff; border-color:#6339ff; }

    /* BUTTONS */
    .sp-btn {
      display:inline-flex; align-items:center; gap:7px;
      height:38px; padding:0 16px; border-radius:9px;
      font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600;
      cursor:pointer; transition:all 0.18s; border:none; flex-shrink:0;
    }
    .sp-btn:disabled { opacity:0.5; cursor:not-allowed; }
    .sp-btn-primary { background:linear-gradient(135deg,#6339ff,#4f46e5); color:#fff; box-shadow:0 4px 16px rgba(99,57,255,0.25); }
    .sp-btn-primary:hover:not(:disabled) { box-shadow:0 6px 20px rgba(99,57,255,0.35); transform:translateY(-1px); }
    .sp-btn-emerald { background:rgba(20,184,166,0.15); border:1px solid rgba(20,184,166,0.3); color:#5eead4; }
    .sp-btn-emerald:hover:not(:disabled) { background:rgba(20,184,166,0.22); }
    .sp-btn-ghost { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.55); }
    .sp-btn-ghost:hover:not(:disabled) { background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.8); }
    .sp-btn-sm { height:32px; padding:0 12px; font-size:12px; border-radius:8px; }
    .sp-spinner { width:14px; height:14px; border-radius:50%; border:2px solid rgba(255,255,255,0.25); border-top-color:currentColor; animation:sp-spin 0.7s linear infinite; }
    @keyframes sp-spin { to { transform:rotate(360deg); } }

    /* INFO BOX */
    .sp-info { display:flex; gap:10px; border-radius:9px; border:1px solid; padding:12px 14px; font-size:12.5px; line-height:1.6; }
    .sp-info.amber { border-color:rgba(245,158,11,0.2); background:rgba(245,158,11,0.06); color:#fcd34d; }
    .sp-info.blue  { border-color:rgba(59,130,246,0.2);  background:rgba(59,130,246,0.06);  color:#93c5fd; }

    /* CHECKBOX */
    .sp-checkbox-row { display:flex; align-items:center; gap:10px; font-size:13px; color:rgba(255,255,255,0.65); cursor:pointer; }
    .sp-checkbox { width:16px; height:16px; border-radius:4px; border:1.5px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.04); accent-color:#6339ff; cursor:pointer; }

    /* VAR HINT */
    .sp-var-hint { display:flex; align-items:center; gap:9px; border-radius:9px; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.03); padding:10px 14px; font-size:11.5px; color:rgba(255,255,255,0.4); }
    .sp-var-code { background:rgba(99,57,255,0.15); border:1px solid rgba(99,57,255,0.25); border-radius:4px; padding:2px 7px; color:#c4b5fd; font-family:monospace; font-size:11px; }

    /* PREVIEW */
    .sp-preview-subject { border-radius:8px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.04); padding:10px 14px; font-size:13px; color:rgba(255,255,255,0.7); margin-bottom:12px; }

    /* FOOTER ROW */
    .sp-row-end { display:flex; justify-content:flex-end; gap:8px; padding-top:4px; }

    /* LOADING */
    .sp-page-loading { display:flex; align-items:center; justify-content:center; min-height:320px; }
    .sp-page-spinner { width:32px; height:32px; border-radius:50%; border:2px solid rgba(99,57,255,0.2); border-top-color:#6339ff; animation:sp-spin 0.8s linear infinite; }

    /* PWD WRAPPER */
    .sp-pwd-wrap { position:relative; }
    .sp-pwd-toggle { position:absolute; top:50%; right:12px; transform:translateY(-50%); background:none; border:none; color:rgba(255,255,255,0.25); cursor:pointer; display:flex; align-items:center; transition:color 0.18s; padding:0; }
    .sp-pwd-toggle:hover { color:rgba(255,255,255,0.6); }
  `;

  if (pageLoading) return (
    <>
      <style>{css}</style>
      <div className="sp-root"><div className="sp-page-loading"><div className="sp-page-spinner" /></div></div>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className="sp-root">
        {/* Header */}
        <div className="sp-page-header">
          <div>
            <p className="sp-page-eyebrow">Configuration</p>
            <h1 className="sp-page-title">System Settings</h1>
            <p className="sp-page-sub">SMTP, notifications, and email template management.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="sp-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} className={`sp-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => { setActiveTab(tab.id); clearMsg(); }}>
                <Icon className="sp-tab-icon" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Alert */}
        {msg.text && (
          <div className={`sp-alert ${msg.type}`}>
            {msg.type === 'success' ? <Check size={14} style={{flexShrink:0,marginTop:1}} /> : <X size={14} style={{flexShrink:0,marginTop:1}} />}
            <span style={{flex:1}}>{msg.text}</span>
            <button className="sp-alert-close" onClick={clearMsg}><X size={13} /></button>
          </div>
        )}

        {/* ─── SMTP TAB ─── */}
        {activeTab === 'smtp' && (
          <>
            {/* Presets */}
            <div className="sp-card">
              <div className="sp-card-header">
                <div>
                  <div className="sp-card-title">Quick Setup</div>
                  <div className="sp-card-sub">Auto-fill host & port for popular providers</div>
                </div>
              </div>
              <div className="sp-card-body">
                <div className="sp-grid-3" style={{marginBottom:14}}>
                  {smtpPresets.map(p => {
                    const Icon = p.icon;
                    const c = COLOR[p.color];
                    return (
                      <button key={p.name} className="sp-preset-card" onClick={() => applyPreset(p)}
                        style={{ borderColor: c.border, background: c.bg, color: c.text }}>
                        <div className="sp-preset-name"><Icon size={13} />{p.name}</div>
                        <div className="sp-preset-desc">{p.description}</div>
                        <div className="sp-preset-host">{p.host}:{p.port}</div>
                      </button>
                    );
                  })}
                </div>
                <div className="sp-info amber">
                  <AlertCircle size={14} style={{flexShrink:0,marginTop:1}} />
                  <span><strong>Elastic Mail:</strong> Sign up → Settings → SMTP → Create credentials. Use API key as password. 100 emails/day free.</span>
                </div>
              </div>
            </div>

            {/* Admin notification email */}
            <div className="sp-card">
              <div className="sp-card-header">
                <div>
                  <div className="sp-card-title">Admin Notifications</div>
                  <div className="sp-card-sub">Receive emails when users submit forms</div>
                </div>
              </div>
              <div className="sp-card-body">
                <div className="sp-field">
                  <label className="sp-label"><Mail size={13} /> Admin Email</label>
                  <input className="sp-input" type="email" placeholder="admin@yourcompany.com" value={form.admin_notification_email} onChange={e => setForm(p => ({ ...p, admin_notification_email: e.target.value }))} />
                </div>
                <p style={{fontSize:12,color:'rgba(255,255,255,0.3)',marginBottom:14}}>You'll receive notifications for Contact Us and Vendor Registration submissions.</p>
                <div className="sp-row-end">
                  <button className="sp-btn sp-btn-primary" disabled={loading} onClick={handleSaveAdminEmail} type="button">
                    {loading ? <span className="sp-spinner"/> : <Save size={13}/>} Save Admin Email
                  </button>
                </div>
              </div>
            </div>

            {/* SMTP config */}
            <div className="sp-card">
              <div className="sp-card-header">
                <div>
                  <div className="sp-card-title">SMTP Configuration</div>
                  <div className="sp-card-sub">Manual server configuration</div>
                </div>
              </div>
              <div className="sp-card-body">
                <form onSubmit={handleSaveSmtp}>
                  <div className="sp-grid-2" style={{marginBottom:14}}>
                    <div className="sp-field" style={{marginBottom:0}}>
                      <label className="sp-label"><Server size={13}/>SMTP Host</label>
                      <input className="sp-input" placeholder="smtp.gmail.com" value={form.smtp_host} onChange={e => setForm(p => ({...p, smtp_host: e.target.value}))} />
                    </div>
                    <div className="sp-field" style={{marginBottom:0}}>
                      <label className="sp-label">Port</label>
                      <input className="sp-input" placeholder="587" type="number" value={form.smtp_port} onChange={e => setForm(p => ({...p, smtp_port: e.target.value}))} />
                    </div>
                    <div className="sp-field" style={{marginBottom:0}}>
                      <label className="sp-label"><Lock size={13}/>Username</label>
                      <input className="sp-input" placeholder="your@email.com" value={form.smtp_user} onChange={e => setForm(p => ({...p, smtp_user: e.target.value}))} />
                    </div>
                    <div className="sp-field" style={{marginBottom:0}}>
                      <label className="sp-label">Password</label>
                      <div className="sp-pwd-wrap">
                        <input className="sp-input" type={showPwd ? 'text' : 'password'} placeholder="App password" value={form.smtp_password} onChange={e => setForm(p => ({...p, smtp_password: e.target.value}))} style={{paddingRight:40}} />
                        <button type="button" className="sp-pwd-toggle" onClick={() => setShowPwd(x => !x)}>
                          {showPwd ? <EyeOff size={15}/> : <Eye size={15}/>}
                        </button>
                      </div>
                    </div>
                    <div className="sp-field" style={{marginBottom:0}}>
                      <label className="sp-label">From Email</label>
                      <input className="sp-input" type="email" placeholder="noreply@yourcompany.com" value={form.smtp_from_email} onChange={e => setForm(p => ({...p, smtp_from_email: e.target.value}))} />
                    </div>
                    <div className="sp-field" style={{marginBottom:0}}>
                      <label className="sp-label">From Name</label>
                      <input className="sp-input" placeholder="Your Company" value={form.smtp_from_name} onChange={e => setForm(p => ({...p, smtp_from_name: e.target.value}))} />
                    </div>
                  </div>
                  <label className="sp-checkbox-row" style={{marginBottom:16}}>
                    <input type="checkbox" className="sp-checkbox" checked={form.smtp_secure === 'true'} onChange={e => setForm(p => ({...p, smtp_secure: e.target.checked ? 'true' : 'false'}))} />
                    Use SSL/TLS (secure connection)
                  </label>
                  <div className="sp-row-end">
                    <button className="sp-btn sp-btn-primary" type="submit" disabled={loading}>
                      {loading ? <span className="sp-spinner"/> : <Save size={13}/>} Save Configuration
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Test email */}
            <div className="sp-card">
              <div className="sp-card-header">
                <div>
                  <div className="sp-card-title">Send Test Email</div>
                  <div className="sp-card-sub">Verify your SMTP configuration is working</div>
                </div>
              </div>
              <div className="sp-card-body">
                <div style={{display:'flex',gap:10}}>
                  <input className="sp-input" style={{flex:1}} type="email" placeholder="test@example.com" value={testEmail} onChange={e => setTestEmail(e.target.value)} />
                  <button className="sp-btn sp-btn-emerald" type="button" disabled={loading} onClick={handleTestEmail}>
                    {loading ? <span className="sp-spinner"/> : <TestTube size={13}/>} Send Test
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ─── CONTACT EMAIL TEMPLATES TAB ─── */}
        {activeTab === 'templates' && (
          <>
            <div className="sp-card">
              <div className="sp-card-header">
                <div>
                  <div className="sp-card-title">Choose Email Template</div>
                  <div className="sp-card-sub">Auto-reply template for Contact Us form submissions</div>
                </div>
              </div>
              <div className="sp-card-body">
                <div className="sp-grid-2-cards">
                  {emailTemplates.map(tpl => {
                    const Icon = tpl.icon;
                    const active = selectedTemplate === tpl.id;
                    return (
                      <button key={tpl.id} className={`sp-tpl-card ${active ? 'active' : ''}`} onClick={() => {
                        setSelectedTemplate(tpl.id);
                        setCustomTemplate({ subject: tpl.subject, body: tpl.body });
                        setIsEditingTemplate(false);
                      }}>
                        <div className="sp-tpl-card-name">
                          <div className={`sp-radio ${active ? 'active' : ''}`}>{active && <Check size={9} color="#fff"/>}</div>
                          <Icon size={13}/>{tpl.name}
                        </div>
                        <div className="sp-tpl-card-desc">{tpl.description}</div>
                        <div className="sp-tpl-card-sub">{tpl.subject}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="sp-card">
              <div className="sp-card-header">
                <div>
                  <div className="sp-card-title">Template Preview & Edit</div>
                </div>
                {!isEditingTemplate && (
                  <button className="sp-btn sp-btn-ghost sp-btn-sm" type="button" onClick={() => {
                    const t = emailTemplates.find(x => x.id === selectedTemplate)!;
                    setCustomTemplate({ subject: t.subject, body: t.body });
                    setIsEditingTemplate(true);
                  }}>
                    <FileText size={12}/> Edit
                  </button>
                )}
              </div>
              <div className="sp-card-body">
                {isEditingTemplate ? (
                  <>
                    <div className="sp-field">
                      <label className="sp-label">Subject Line</label>
                      <input className="sp-input" value={customTemplate.subject} onChange={e => setCustomTemplate(p => ({...p, subject: e.target.value}))} />
                    </div>
                    <div className="sp-field">
                      <label className="sp-label">Email Body (HTML)</label>
                      <textarea className="sp-input sp-textarea" rows={10} value={customTemplate.body} onChange={e => setCustomTemplate(p => ({...p, body: e.target.value}))} style={{fontFamily:'monospace',fontSize:12}} />
                    </div>
                    <VarHint />
                    <div className="sp-row-end">
                      <button className="sp-btn sp-btn-ghost" type="button" onClick={() => setIsEditingTemplate(false)}><X size={13}/> Cancel</button>
                      <button className="sp-btn sp-btn-primary" type="button" disabled={loading} onClick={handleSaveContactTemplate}>{loading ? <span className="sp-spinner"/> : <Save size={13}/>} Save Template</button>
                    </div>
                  </>
                ) : (() => {
                  const t = emailTemplates.find(x => x.id === selectedTemplate)!;
                  return (
                    <>
                      <div className="sp-preview-subject">{customTemplate.subject || t.subject}</div>
                      <div style={{borderRadius:9,border:'1px solid rgba(255,255,255,0.08)',background:'#fff',overflow:'hidden',marginBottom:12}}>
                        <iframe srcDoc={customTemplate.body || t.body} style={{width:'100%',height:260,border:'none',display:'block'}} title="Preview" sandbox=""/>
                      </div>
                      <VarHint />
                      <div className="sp-row-end">
                        <button className="sp-btn sp-btn-primary" type="button" disabled={loading} onClick={handleSaveContactTemplate}>{loading ? <span className="sp-spinner"/> : <Save size={13}/>} Save Template</button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </>
        )}

        {/* ─── VENDOR EMAIL TEMPLATES TAB ─── */}
        {activeTab === 'vendor-templates' && (
          <>
            <div className="sp-card">
              <div className="sp-card-header">
                <div>
                  <div className="sp-card-title">Vendor Registration Email</div>
                  <div className="sp-card-sub">Email sent when someone submits the vendor registration form</div>
                </div>
              </div>
              <div className="sp-card-body">
                <div className="sp-grid-2-cards" style={{marginBottom:14}}>
                  {vendorEmailTemplates.map(tpl => {
                    const Icon = tpl.icon;
                    const active = selectedVendorTemplate === tpl.id;
                    return (
                      <button key={tpl.id} className={`sp-tpl-card ${active ? 'active' : ''}`} onClick={() => {
                        setSelectedVendorTemplate(tpl.id);
                        setVendorContent({ subject: tpl.subject, body: tpl.body });
                        setIsEditingVendor(false);
                      }}>
                        <div className="sp-tpl-card-name">
                          <div className={`sp-radio ${active ? 'active' : ''}`}>{active && <Check size={9} color="#fff"/>}</div>
                          <Icon size={13}/>{tpl.name}
                        </div>
                        <div className="sp-tpl-card-desc">{tpl.description}</div>
                        <div className="sp-tpl-card-sub">{tpl.subject}</div>
                      </button>
                    );
                  })}
                </div>
                <div className="sp-row-end">
                  <button className="sp-btn sp-btn-primary" type="button" disabled={loading} onClick={handleSaveVendorTemplate}>{loading ? <span className="sp-spinner"/> : <Save size={13}/>} Save Vendor Template</button>
                </div>
              </div>
            </div>

            <div className="sp-card">
              <div className="sp-card-header">
                <div><div className="sp-card-title">Template Content</div></div>
                {!isEditingVendor && (
                  <button className="sp-btn sp-btn-ghost sp-btn-sm" type="button" onClick={() => { setVendorCustom(vendorContent); setIsEditingVendor(true); }}>
                    <FileText size={12}/> Edit
                  </button>
                )}
              </div>
              <div className="sp-card-body">
                {isEditingVendor ? (
                  <>
                    <div className="sp-field">
                      <label className="sp-label">Subject</label>
                      <input className="sp-input" value={vendorCustom.subject} onChange={e => setVendorCustom(p => ({...p, subject: e.target.value}))} />
                    </div>
                    <div className="sp-field">
                      <label className="sp-label">Body (HTML)</label>
                      <textarea className="sp-input sp-textarea" rows={10} value={vendorCustom.body} onChange={e => setVendorCustom(p => ({...p, body: e.target.value}))} style={{fontFamily:'monospace',fontSize:12}} />
                    </div>
                    <VarHint />
                    <div className="sp-row-end">
                      <button className="sp-btn sp-btn-ghost" type="button" onClick={() => setIsEditingVendor(false)}><X size={13}/> Cancel</button>
                      <button className="sp-btn sp-btn-primary" type="button" disabled={loading} onClick={handleSaveVendorContent}>{loading ? <span className="sp-spinner"/> : <Save size={13}/>} Save Content</button>
                    </div>
                  </>
                ) : (() => {
                  const t = vendorEmailTemplates.find(x => x.id === selectedVendorTemplate)!;
                  return (
                    <>
                      <div className="sp-preview-subject">{vendorContent.subject || t.subject}</div>
                      <div style={{borderRadius:9,border:'1px solid rgba(255,255,255,0.08)',background:'#fff',overflow:'hidden',marginBottom:12}}>
                        <iframe srcDoc={vendorContent.body || t.body} style={{width:'100%',height:260,border:'none',display:'block'}} title="Vendor Preview" sandbox=""/>
                      </div>
                      <VarHint />
                      <div className="sp-row-end">
                        <button className="sp-btn sp-btn-primary" type="button" disabled={loading} onClick={handleSaveVendorTemplate}>{loading ? <span className="sp-spinner"/> : <Save size={13}/>} Save Template</button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </>
        )}

        {/* ─── INVOICE TEMPLATES TAB ─── */}
        {activeTab === 'invoice-templates' && (
          <>
            <div className="sp-card">
              <div className="sp-card-header">
                <div>
                  <div className="sp-card-title">Choose Invoice Template</div>
                  <div className="sp-card-sub">Design used when generating PDF invoices</div>
                </div>
              </div>
              <div className="sp-card-body">
                <div className="sp-grid-2-cards">
                  {invoiceTemplates.map(tpl => {
                    const Icon = tpl.icon;
                    const active = selectedInvoiceTpl === tpl.id;
                    return (
                      <button key={tpl.id} className={`sp-tpl-card ${active ? 'active' : ''}`} onClick={() => { setSelectedInvoiceTpl(tpl.id); setInvoiceTemplateHtml(tpl.previewHtml); }}>
                        <div className="sp-tpl-card-name">
                          <div className={`sp-radio ${active ? 'active' : ''}`}>{active && <Check size={9} color="#fff"/>}</div>
                          <Icon size={13}/>{tpl.name}
                        </div>
                        <div className="sp-tpl-card-desc">{tpl.description}</div>
                        <div className="sp-tpl-card-sub">{tpl.preview}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="sp-card">
              <div className="sp-card-header">
                <div><div className="sp-card-title">Selected Template Details</div></div>
              </div>
              <div className="sp-card-body">
                {(() => {
                  const t = invoiceTemplates.find(x => x.id === selectedInvoiceTpl)!;
                  return (
                    <>
                      <div className="sp-preview-subject" style={{marginBottom:10}}>{t.name}</div>
                      <div style={{borderRadius:9,border:'1px solid rgba(255,255,255,0.08)',background:'#fff',overflow:'hidden',marginBottom:12}}>
                        <iframe srcDoc={invoiceTemplateHtml || t.previewHtml} style={{width:'100%',height:240,border:'none',display:'block'}} title="Invoice Template Preview" sandbox=""/>
                      </div>
                      <div className="sp-field">
                        <label className="sp-label">Template HTML (Editable)</label>
                        <textarea className="sp-input sp-textarea" rows={10} value={invoiceTemplateHtml} onChange={e => setInvoiceTemplateHtml(e.target.value)} style={{fontFamily:'monospace',fontSize:12}} />
                      </div>
                      <div className="sp-info amber" style={{marginBottom:10}}>
                        <AlertCircle size={14} style={{flexShrink:0,marginTop:1}}/>
                        <span>Use placeholders: <code>{'{{invoice_number}}'}</code>, <code>{'{{invoice_date}}'}</code>, <code>{'{{due_date}}'}</code>, <code>{'{{bill_to_name}}'}</code>, <code>{'{{bill_to_address}}'}</code>, <code>{'{{bill_to_gstin}}'}</code>, <code>{'{{seller_gstin}}'}</code>, <code>{'{{place_of_supply}}'}</code>, <code>{'{{po_number}}'}</code>, <code>{'{{terms}}'}</code>, <code>{'{{notes}}'}</code>, <code>{'{{currency}}'}</code>, <code>{'{{subtotal}}'}</code>, <code>{'{{tax_amount}}'}</code>, <code>{'{{total_amount}}'}</code>, <code>{'{{tax_breakup}}'}</code>, <code>{'{{line_items_rows}}'}</code>.</span>
                      </div>
                      <div className="sp-info blue" style={{marginBottom:10}}>
                        <AlertCircle size={14} style={{flexShrink:0,marginTop:1}}/>
                        <span><strong>This template includes:</strong> {t.features.join(', ')}.</span>
                      </div>
                      <div className="sp-row-end">
                        <button className="sp-btn sp-btn-primary" type="button" disabled={loading} onClick={handleSaveInvoiceTpl}>{loading ? <span className="sp-spinner"/> : <Save size={13}/>} Save Invoice Template</button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function VarHint() {
  return (
    <div className="sp-var-hint" style={{marginBottom:14}}>
      <AlertCircle size={13} style={{flexShrink:0}}/>
      <span>Variables: <code className="sp-var-code">{'{{firstName}}'}</code> <code className="sp-var-code">{'{companyName}'}</code> <code className="sp-var-code">{'{{ticketId}}'}</code></span>
    </div>
  );
}