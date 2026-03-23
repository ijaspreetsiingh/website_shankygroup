'use client';

import { CSSProperties, FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Plus, RefreshCw, Send, Trash2, X, Download,
  ChevronRight, FileText, MessageSquare, User,
  Phone, Mail, Building2, Calendar, IndianRupee,
  CheckCircle, AlertCircle, Zap, TrendingUp,
  Search, Edit2, Save, StickyNote, Printer,
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────── */
type Lead = {
  id: number; name: string; email: string; phone: string; company: string;
  source: string; status: string; priority: string; value_amount: number;
  next_follow_up: string | null; notes: string; created_at: string; updated_at: string;
};
type Activity = { id: number; lead_id: number; activity_type: string; message: string; created_at: string; };
type InvoiceLine = { description: string; qty: number; rate: number; amount: number; hsn_sac?: string; gst_percent?: number };
type InvoiceMeta = {
  bill_to_name?: string; bill_to_address?: string; bill_to_gstin?: string; seller_gstin?: string;
  place_of_supply?: string; po_number?: string; terms?: string; notes?: string;
  discount_amount?: number; shipping_amount?: number; gst_mode?: 'igst'|'cgst_sgst';
};
type Invoice = {
  id: number; lead_id: number; invoice_number: string; invoice_date: string;
  due_date: string | null; currency: string; subtotal: number; tax_percent: number;
  tax_amount: number; total_amount: number; status: string; line_items_json: string; invoice_meta_json?: string | null;
  sent_to_email: string | null; sent_at: string | null; created_at: string;
};
type LeadForm = Omit<Lead, 'id' | 'created_at' | 'updated_at'>;
type RightTab = 'details' | 'notes' | 'invoices';

/* ─── Config ─────────────────────────────────────── */
const STATUSES: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  new:           { label: 'New',           color: '#60a5fa', bg: '#1e3a5f', dot: '#3b82f6' },
  contacted:     { label: 'Contacted',     color: '#c084fc', bg: '#3b1f5e', dot: '#a855f7' },
  qualified:     { label: 'Qualified',     color: '#34d399', bg: '#064e3b', dot: '#10b981' },
  proposal_sent: { label: 'Proposal Sent', color: '#fbbf24', bg: '#451a03', dot: '#f59e0b' },
  won:           { label: 'Won',           color: '#4ade80', bg: '#052e16', dot: '#22c55e' },
  lost:          { label: 'Lost',          color: '#f87171', bg: '#450a0a', dot: '#ef4444' },
};
const PRIORITIES: Record<string, { color: string; bg: string }> = {
  low:    { color: '#94a3b8', bg: '#1e293b' },
  medium: { color: '#fbbf24', bg: '#422006' },
  high:   { color: '#f87171', bg: '#450a0a' },
};
const SOURCES = ['manual','website','contact_form','vendor_registration','referral','other'];
const emptyLead: LeadForm = { name:'', email:'', phone:'', company:'', source:'manual', status:'new', priority:'medium', value_amount:0, next_follow_up:'', notes:'' };
const fmt  = (n: number) => `₹${n >= 100000 ? (n/100000).toFixed(1)+'L' : n >= 1000 ? (n/1000).toFixed(0)+'K' : n}`;
const fmtF = (n: number) => `₹${Number(n).toLocaleString('en-IN')}`;

/* ─── Main Component ─────────────────────────────── */
export default function AdminLeadsPage() {
  const [rows, setRows]               = useState<Lead[]>([]);
  const [selectedId, setSelectedId]   = useState<number | null>(null);
  const [activities, setActivities]   = useState<Activity[]>([]);
  const [invoices, setInvoices]       = useState<Invoice[]>([]);
  const [leadForm, setLeadForm]       = useState<LeadForm>(emptyLead);
  const [search, setSearch]           = useState('');
  const [filterStatus, setFilter]     = useState('all');
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [rightTab, setRightTab]       = useState<RightTab>('details');
  const [noteInput, setNoteInput]     = useState('');
  const [showNewLead, setShowNewLead]         = useState(false);
  const [showNewInvoice, setShowNewInvoice]   = useState(false);
  const [newLeadForm, setNewLead]     = useState<LeadForm>(emptyLead);
  const [toast, setToast]             = useState<{ type: 'ok'|'err'; text: string } | null>(null);
  const [invoiceTemplateId, setInvoiceTemplateId] = useState('professional');
  const [invoiceTemplateHtml, setInvoiceTemplateHtml] = useState('');
  const [invF, setInvF] = useState({
    invoice_number:'', invoice_date: new Date().toISOString().slice(0,10),
    due_date:'', currency:'INR', tax_percent:18,
    gst_mode:'igst' as 'igst'|'cgst_sgst',
    bill_to_name:'', bill_to_address:'', bill_to_gstin:'', seller_gstin:'', place_of_supply:'',
    po_number:'', terms:'Payment due within 7 days', notes:'',
    discount_amount:0, shipping_amount:0,
    lines: [{ description:'', qty:1, rate:0, hsn_sac:'', gst_percent:18 }] as { description:string; qty:number; rate:number; hsn_sac:string; gst_percent:number }[],
  });

  const selectedLead = useMemo(() => rows.find(r => r.id === selectedId) || null, [rows, selectedId]);

  const filtered = useMemo(() => {
    let list = rows;
    const q = search.toLowerCase().trim();
    if (q) list = list.filter(r => [r.name,r.email,r.phone,r.company].some(v => String(v||'').toLowerCase().includes(q)));
    if (filterStatus !== 'all') list = list.filter(r => r.status === filterStatus);
    return list;
  }, [rows, search, filterStatus]);

  const stats = useMemo(() => ({
    total:    rows.length,
    active:   rows.filter(r => !['won','lost'].includes(r.status)).length,
    won:      rows.filter(r => r.status === 'won').length,
    pipeline: rows.filter(r => !['won','lost'].includes(r.status)).reduce((s,r) => s + Number(r.value_amount||0), 0),
  }), [rows]);

  function showToast(type: 'ok'|'err', text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  }

  async function apiFetch(method: string, body: object) {
    const res = await fetch('/admin/api/leads', { method, headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed');
    return data;
  }

  async function loadLeads() {
    setLoading(true);
    try {
      const res  = await fetch('/admin/api/leads', { cache:'no-store' });
      const data = await res.json();
      const list = Array.isArray(data.rows) ? data.rows as Lead[] : [];
      setRows(list);
      if (!selectedId && list.length > 0) setSelectedId(list[0].id);
    } catch { showToast('err', 'Failed to load leads'); }
    finally { setLoading(false); }
  }

  async function loadDetail(id: number) {
    try {
      const res  = await fetch(`/admin/api/leads?leadId=${id}`, { cache:'no-store' });
      const data = await res.json();
      setActivities(Array.isArray(data.activities) ? data.activities : []);
      setInvoices(Array.isArray(data.invoices) ? data.invoices : []);
      if (data.lead) setLeadForm({
        name: data.lead.name||'', email: data.lead.email||'', phone: data.lead.phone||'',
        company: data.lead.company||'', source: data.lead.source||'manual',
        status: data.lead.status||'new', priority: data.lead.priority||'medium',
        value_amount: Number(data.lead.value_amount||0),
        next_follow_up: data.lead.next_follow_up ? String(data.lead.next_follow_up).slice(0,16) : '',
        notes: data.lead.notes||'',
      });
    } catch { showToast('err', 'Failed to load lead details'); }
  }

  useEffect(() => { void loadLeads(); }, []);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/admin/api/invoice-template-setting', { cache:'no-store' });
        const data = await res.json();
        if (res.ok && data?.template_id) setInvoiceTemplateId(String(data.template_id));
        if (res.ok) setInvoiceTemplateHtml(String(data?.template_html || ''));
      } catch { /* ignore */ }
    })();
  }, []);
  useEffect(() => {
    if (selectedId) { void loadDetail(selectedId); setRightTab('details'); }
    else { setActivities([]); setInvoices([]); setLeadForm(emptyLead); }
  }, [selectedId]);

  async function createLead(e: FormEvent) {
    e.preventDefault(); setSaving(true);
    try {
      const data = await apiFetch('POST', { action:'createLead', ...newLeadForm });
      showToast('ok', 'Lead created!');
      setNewLead(emptyLead); setShowNewLead(false);
      await loadLeads();
      if (data.id) setSelectedId(Number(data.id));
    } catch (err) { showToast('err', err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  }

  async function saveLead() {
    if (!selectedLead) return; setSaving(true);
    try {
      await apiFetch('PUT', { action:'updateLead', id:selectedLead.id, ...leadForm });
      showToast('ok', 'Saved!');
      await loadLeads(); await loadDetail(selectedLead.id);
    } catch (err) { showToast('err', err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  }

  async function changeStatus(leadId: number, status: string) {
    try {
      await apiFetch('PUT', { action:'moveStage', id:leadId, status });
      await loadLeads(); if (selectedId === leadId) await loadDetail(leadId);
    } catch (err) { showToast('err', err instanceof Error ? err.message : 'Failed'); }
  }

  async function addNote() {
    if (!selectedLead || !noteInput.trim()) return; setSaving(true);
    try {
      await apiFetch('POST', { action:'addActivity', lead_id:selectedLead.id, activity_type:'note', message:noteInput.trim() });
      setNoteInput(''); await loadDetail(selectedLead.id);
      showToast('ok', 'Note added');
    } catch (err) { showToast('err', err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  }

  async function createInvoice() {
    if (!selectedLead) return;
    const validLines = invF.lines.filter(l => l.description.trim());
    if (!validLines.length) { showToast('err', 'Add at least one item'); return; }
    setSaving(true);
    try {
      await apiFetch('POST', {
        action:'createInvoice', lead_id:selectedLead.id,
        invoice_number: invF.invoice_number || `INV-${Date.now()}`,
        invoice_date: invF.invoice_date, due_date: invF.due_date || null,
        currency: invF.currency, tax_percent: invF.tax_percent,
        line_items: validLines.map(l => ({
          description:l.description, qty:Number(l.qty||1), rate:Number(l.rate||0),
          hsn_sac:String(l.hsn_sac||''), gst_percent:Number(l.gst_percent||0),
        })),
        meta: {
          gst_mode: invF.gst_mode,
          bill_to_name: invF.bill_to_name,
          bill_to_address: invF.bill_to_address,
          bill_to_gstin: invF.bill_to_gstin,
          seller_gstin: invF.seller_gstin,
          place_of_supply: invF.place_of_supply,
          po_number: invF.po_number,
          terms: invF.terms,
          notes: invF.notes,
          discount_amount: Number(invF.discount_amount || 0),
          shipping_amount: Number(invF.shipping_amount || 0),
        },
      });
      showToast('ok', 'Invoice created!');
      setInvF({
        invoice_number:'', invoice_date:new Date().toISOString().slice(0,10), due_date:'', currency:'INR', tax_percent:18, gst_mode:'igst',
        bill_to_name:'', bill_to_address:'', bill_to_gstin:'', seller_gstin:'', place_of_supply:'',
        po_number:'', terms:'Payment due within 7 days', notes:'', discount_amount:0, shipping_amount:0,
        lines:[{ description:'', qty:1, rate:0, hsn_sac:'', gst_percent:18 }],
      });
      setShowNewInvoice(false);
      await loadDetail(selectedLead.id);
    } catch (err) { showToast('err', err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  }

  async function sendInvoice(invId: number) {
    if (!selectedLead) return; setSaving(true);
    try {
      await apiFetch('POST', { action:'sendInvoice', lead_id:selectedLead.id, invoice_id:invId });
      showToast('ok', 'Invoice sent!');
      await loadDetail(selectedLead.id);
    } catch (err) { showToast('err', err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  }

  async function deleteLead(id: number) {
    if (!confirm('Delete this lead?')) return; setSaving(true);
    try {
      const res = await fetch('/admin/api/leads', { method:'DELETE', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ action:'deleteLead', id }) });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      showToast('ok', 'Lead deleted');
      if (selectedId === id) setSelectedId(null);
      await loadLeads();
    } catch (err) { showToast('err', err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  }

  async function importFrom(source: 'contacts'|'vendors') {
    setSaving(true);
    try {
      const data = await apiFetch('POST', { action: source==='contacts' ? 'importContacts' : 'importVendors' });
      showToast('ok', data.message || 'Imported!');
      await loadLeads();
    } catch (err) { showToast('err', err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  }

  function addLine() { setInvF(p => ({ ...p, lines:[...p.lines, { description:'', qty:1, rate:0, hsn_sac:'', gst_percent:p.tax_percent }] })); }
  function removeLine(i: number) { setInvF(p => ({ ...p, lines:p.lines.filter((_,idx) => idx!==i) })); }
  function updateLine(i: number, key: string, val: string|number) {
    setInvF(p => { const lines=[...p.lines]; lines[i]={ ...lines[i], [key]:val }; return { ...p, lines }; });
  }

  const invSubtotal = invF.lines.reduce((s,l) => s + Number(l.qty||1)*Number(l.rate||0), 0);
  const invTaxable  = Math.max(0, invSubtotal - Number(invF.discount_amount||0));
  const invTax      = invTaxable * invF.tax_percent / 100;
  const invTotal    = invTaxable + invTax + Number(invF.shipping_amount||0);

  function getInvoiceMeta(inv: Invoice): InvoiceMeta {
    try { return inv.invoice_meta_json ? JSON.parse(inv.invoice_meta_json) as InvoiceMeta : {}; } catch { return {}; }
  }

  function renderInvoiceHtml(inv: Invoice, lead: Lead) {
    const lines: InvoiceLine[] = (() => { try { return JSON.parse(inv.line_items_json||'[]'); } catch { return []; } })();
    const m = getInvoiceMeta(inv);
    const cgst = (m.gst_mode === 'cgst_sgst') ? Number(inv.tax_amount)/2 : 0;
    const sgst = (m.gst_mode === 'cgst_sgst') ? Number(inv.tax_amount)/2 : 0;
    const igst = (m.gst_mode === 'cgst_sgst') ? 0 : Number(inv.tax_amount);
    const rowsHtml = lines.map((l, i) =>
      `<tr><td>${i + 1}</td><td>${l.description || ''}</td><td>${l.hsn_sac || '-'}</td><td style="text-align:right">${l.qty || 0}</td><td style="text-align:right">${Number(l.rate || 0).toFixed(2)}</td><td style="text-align:right">${Number(l.gst_percent || 0).toFixed(2)}</td><td style="text-align:right">${Number(l.amount || (l.qty || 0) * (l.rate || 0)).toFixed(2)}</td></tr>`
    ).join('');
    const taxBreakup = m.gst_mode === 'cgst_sgst'
      ? `CGST: ${cgst.toFixed(2)} | SGST: ${sgst.toFixed(2)}`
      : `IGST: ${igst.toFixed(2)}`;

    let html = String(invoiceTemplateHtml || '').trim();
    if (!html) {
      html = '';
    }
    const hasPlaceholders = html.includes('{{invoice_number}}') || html.includes('{{line_items_rows}}');
    if (!hasPlaceholders) {
      const styleMap: Record<string, { primary: string; bg: string }> = {
        professional: { primary:'#0f3b7a', bg:'#eef2f7' },
        corporate: { primary:'#1e3a8a', bg:'#eef2ff' },
        modern: { primary:'#7c3aed', bg:'#f5f3ff' },
        classic: { primary:'#1f2937', bg:'#f9fafb' },
      };
      const st = styleMap[invoiceTemplateId] || styleMap.professional;
      return `<!doctype html><html><head><meta charset="utf-8"/><title>${inv.invoice_number}</title>
      <style>
      body{font-family:Arial,sans-serif;background:${st.bg};color:#111827;margin:0;padding:20px}
      .card{max-width:960px;margin:0 auto;background:#fff;border:1px solid #d5deea}
      .hdr{padding:16px 20px;background:${st.primary};color:#fff;display:flex;justify-content:space-between;align-items:flex-start}
      .r{text-align:right}.sec{padding:16px 20px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .box{border:1px solid #d1d5db;padding:10px;font-size:12px;line-height:1.55;background:#fbfdff}
      table{width:100%;border-collapse:collapse;font-size:12px;margin-top:12px}
      th,td{border:1px solid #d1d5db;padding:8px;vertical-align:top}th{background:#f8fafc;text-align:left;color:#334155}
      .sum{margin-top:14px;max-width:330px;margin-left:auto}.row{display:flex;justify-content:space-between;padding:4px 0;font-size:12px}
      .row.t{font-size:14px;font-weight:700;border-top:1px solid #cbd5e1;margin-top:6px;padding-top:8px}
      </style></head><body><div class="card">
      <div class="hdr"><div><div style="font-size:20px;font-weight:700">SHANKY GROUP</div><div style="font-size:11px;opacity:.9">Professional Business Solutions</div></div><div class="r"><div style="font-size:11px;opacity:.85">TAX INVOICE</div><div style="font-size:15px;font-weight:700">${inv.invoice_number}</div><div style="font-size:11px;opacity:.9">Date: ${inv.invoice_date}</div></div></div>
      <div class="sec">
      <div class="grid">
      <div class="box"><strong>Bill To</strong><div>${m.bill_to_name || lead.name || '-'}</div><div>${m.bill_to_address || lead.company || '-'}</div><div>${lead.email || '-'} ${lead.phone ? `| ${lead.phone}` : ''}</div><div>GSTIN: ${m.bill_to_gstin || '-'}</div></div>
      <div class="box"><strong>Seller Details</strong><div>Shanky Group</div><div>Due Date: ${inv.due_date || '-'}</div><div>Seller GSTIN: ${m.seller_gstin || '-'}</div><div>Place of Supply: ${m.place_of_supply || '-'}</div><div>PO Number: ${m.po_number || '-'}</div></div>
      </div>
      <table><thead><tr><th>#</th><th>Description</th><th>HSN/SAC</th><th style="text-align:right">Qty</th><th style="text-align:right">Rate</th><th style="text-align:right">GST%</th><th style="text-align:right">Amount</th></tr></thead><tbody>${rowsHtml || '<tr><td colspan="7">No items</td></tr>'}</tbody></table>
      <div class="sum">
        <div class="row"><span>Subtotal</span><strong>${Number(inv.subtotal).toFixed(2)}</strong></div>
        <div class="row"><span>Tax</span><strong>${Number(inv.tax_amount).toFixed(2)}</strong></div>
        <div class="row t"><span>Total (${inv.currency})</span><span>${Number(inv.total_amount).toFixed(2)}</span></div>
      </div>
      <div style="margin-top:14px;font-size:12px;line-height:1.6"><strong>Terms:</strong> ${m.terms || '-'}<br/><strong>Notes:</strong> ${m.notes || '-'}<br/><strong>Tax Breakup:</strong> ${taxBreakup}</div>
      </div></div></body></html>`;
    }
    const replacementMap: Record<string, string> = {
      '{{invoice_number}}': inv.invoice_number,
      '{{invoice_date}}': inv.invoice_date,
      '{{due_date}}': inv.due_date || '-',
      '{{bill_to_name}}': m.bill_to_name || lead.name || '-',
      '{{bill_to_address}}': m.bill_to_address || lead.company || '-',
      '{{bill_to_gstin}}': m.bill_to_gstin || '-',
      '{{seller_gstin}}': m.seller_gstin || '-',
      '{{place_of_supply}}': m.place_of_supply || '-',
      '{{po_number}}': m.po_number || '-',
      '{{terms}}': m.terms || '-',
      '{{notes}}': m.notes || '-',
      '{{currency}}': inv.currency || 'INR',
      '{{subtotal}}': Number(inv.subtotal).toFixed(2),
      '{{tax_amount}}': Number(inv.tax_amount).toFixed(2),
      '{{total_amount}}': Number(inv.total_amount).toFixed(2),
      '{{tax_breakup}}': taxBreakup,
      '{{line_items_rows}}': rowsHtml || '<tr><td colspan="7">No items</td></tr>',
    };
    Object.entries(replacementMap).forEach(([key, value]) => {
      html = html.split(key).join(value);
    });
    return html;
  }

  function printInvoice(inv: Invoice) {
    if (!selectedLead) return;
    const w = window.open('', '_blank', 'width=1100,height=800');
    if (!w) return;
    w.document.write(renderInvoiceHtml(inv, selectedLead));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  }

  function downloadInvoice(inv: Invoice) {
    if (!selectedLead) return;
    const html = renderInvoiceHtml(inv, selectedLead);
    const blob = new Blob([html], { type:'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${inv.invoice_number}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const sc = selectedLead ? (STATUSES[selectedLead.status] || STATUSES.new) : null;

  return (
    <div style={{ fontFamily:'Inter,system-ui,sans-serif', color:'#e2e8f0', minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:99px}
        input::placeholder,textarea::placeholder{color:#475569!important}
        select option{background:#1e293b;color:#e2e8f0}
        input[type=date]::-webkit-calendar-picker-indicator,
        input[type=datetime-local]::-webkit-calendar-picker-indicator{filter:invert(.5)}
        .lead-row{transition:background .12s,border-color .12s;cursor:pointer;border-left:2px solid transparent}
        .lead-row:hover{background:rgba(255,255,255,.04)!important}
        .lead-row.active{background:rgba(99,102,241,.1)!important;border-left-color:#6366f1!important}
        .spill{cursor:pointer;transition:all .15s}
        .spill:hover{opacity:.75;transform:translateY(-1px)}
        .pbtn{transition:opacity .12s,transform .12s}
        .pbtn:hover{opacity:.85;transform:translateY(-1px)}
        .fade{animation:fi .18s ease}
        @keyframes fi{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
        .ov{animation:oi .15s ease}
        @keyframes oi{from{opacity:0}to{opacity:1}}
        .mod{animation:mi .18s ease}
        @keyframes mi{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}
        .tab{background:none;border:none;cursor:pointer;transition:color .12s,border-color .12s;font-family:Inter,system-ui,sans-serif}
        .icb{transition:background .12s;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:Inter,system-ui,sans-serif}
        .icb:hover{background:rgba(255,255,255,.1)!important}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* Toast */}
      {toast && (
        <div className="ov" style={{ position:'fixed', top:20, right:20, zIndex:999, display:'flex', alignItems:'center', gap:10, padding:'12px 16px', borderRadius:12, background:toast.type==='ok'?'#052e16':'#450a0a', border:`1px solid ${toast.type==='ok'?'#16a34a':'#b91c1c'}`, boxShadow:'0 8px 32px rgba(0,0,0,.6)' }}>
          {toast.type==='ok' ? <CheckCircle size={15} color="#4ade80"/> : <AlertCircle size={15} color="#f87171"/>}
          <span style={{ fontSize:13, fontWeight:500, color:toast.type==='ok'?'#bbf7d0':'#fecaca' }}>{toast.text}</span>
          <button onClick={() => setToast(null)} className="icb" style={{ background:'transparent', borderRadius:6, padding:2, color:'rgba(255,255,255,.4)', marginLeft:6 }}><X size={13}/></button>
        </div>
      )}

      {/* Header */}
      <div style={{ padding:'18px 24px 14px', borderBottom:'1px solid rgba(255,255,255,.06)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', color:'#6366f1', marginBottom:3 }}>CRM</div>
          <h1 style={{ fontSize:22, fontWeight:700, color:'#f1f5f9', margin:0 }}>Leads</h1>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={() => void importFrom('contacts')} style={G} disabled={saving}><Download size={13}/> Import Contacts</button>
          <button onClick={() => void importFrom('vendors')}  style={G} disabled={saving}><Download size={13}/> Import Vendors</button>
          <button onClick={() => void loadLeads()} style={G} disabled={loading}><RefreshCw size={13} style={{ animation:loading?'spin 1s linear infinite':'none' }}/></button>
          <button onClick={() => { setNewLead(emptyLead); setShowNewLead(true); }} style={P} className="pbtn"><Plus size={14}/> New Lead</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:'1px solid rgba(255,255,255,.06)' }}>
        {[
          { label:'Total Leads', value:stats.total,    icon:<User size={13}/>,        color:'#818cf8' },
          { label:'Active',      value:stats.active,   icon:<Zap size={13}/>,         color:'#34d399' },
          { label:'Won',         value:stats.won,      icon:<CheckCircle size={13}/>, color:'#4ade80' },
          { label:'Pipeline',    value:fmt(stats.pipeline), icon:<TrendingUp size={13}/>, color:'#fbbf24' },
        ].map((s,i) => (
          <div key={i} style={{ padding:'14px 20px', borderRight:i<3?'1px solid rgba(255,255,255,.06)':'none' }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, color:s.color, marginBottom:5 }}>
              {s.icon}<span style={{ fontSize:11, fontWeight:600 }}>{s.label}</span>
            </div>
            <div style={{ fontSize:22, fontWeight:700, color:'#f1f5f9' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* 2-Column layout */}
      <div style={{ display:'grid', gridTemplateColumns:'310px 1fr', height:'calc(100vh - 162px)' }}>

        {/* LEFT – Lead list */}
        <div style={{ borderRight:'1px solid rgba(255,255,255,.06)', display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {/* Search + filter chips */}
          <div style={{ padding:'10px 12px 8px' }}>
            <div style={{ position:'relative', marginBottom:8 }}>
              <Search size={13} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#475569', pointerEvents:'none' }}/>
              <input style={{ ...I, paddingLeft:32, height:36, fontSize:13 }} placeholder="Search leads…" value={search} onChange={e => setSearch(e.target.value)}/>
            </div>
            <div style={{ display:'flex', gap:5, overflowX:'auto', paddingBottom:3 }}>
              {['all',...Object.keys(STATUSES)].map(s => {
                const active = filterStatus===s;
                const sv = STATUSES[s];
                return (
                  <button key={s} onClick={() => setFilter(s)}
                    style={{ flexShrink:0, fontSize:11, fontWeight:600, padding:'4px 10px', borderRadius:99, cursor:'pointer', transition:'all .12s', background:active?(s==='all'?'#4f46e5':sv?.bg):'rgba(255,255,255,.04)', color:active?(s==='all'?'#fff':sv?.color):'#64748b', border:`1px solid ${active?(s==='all'?'#6366f1':sv?.dot+'70'):'transparent'}` }}>
                    {s==='all'?'All':sv.label}
                  </button>
                );
              })}
            </div>
            <div style={{ fontSize:11, color:'#334155', marginTop:6 }}>{filtered.length} lead{filtered.length!==1?'s':''}</div>
          </div>

          {/* List */}
          <div style={{ overflowY:'auto', flex:1 }}>
            {loading && [...Array(5)].map((_,i) => (
              <div key={i} style={{ padding:'14px', borderBottom:'1px solid rgba(255,255,255,.05)', display:'flex', gap:10, alignItems:'center' }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,.06)' }}/>
                <div style={{ flex:1 }}>
                  <div style={{ height:12, width:'60%', borderRadius:4, background:'rgba(255,255,255,.06)', marginBottom:6 }}/>
                  <div style={{ height:10, width:'40%', borderRadius:4, background:'rgba(255,255,255,.04)' }}/>
                </div>
              </div>
            ))}
            {!loading && filtered.length===0 && (
              <div style={{ padding:40, textAlign:'center', color:'#334155' }}>
                <User size={28} style={{ margin:'0 auto 8px', display:'block' }}/>
                <div style={{ fontSize:13 }}>No leads found</div>
              </div>
            )}
            {!loading && filtered.map(lead => {
              const lsc = STATUSES[lead.status] || STATUSES.new;
              const lpc = PRIORITIES[lead.priority] || PRIORITIES.medium;
              const isA = selectedId===lead.id;
              return (
                <div key={lead.id} onClick={() => setSelectedId(lead.id)}
                  style={{ padding:'11px 13px', borderBottom:'1px solid rgba(255,255,255,.05)' }}
                  className={`lead-row${isA?' active':''}`}>
                  <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                    <div style={{ width:34, height:34, borderRadius:9, background:lsc.bg, border:`1px solid ${lsc.dot}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:lsc.color, flexShrink:0 }}>
                      {(lead.name||'?')[0].toUpperCase()}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:4, marginBottom:2 }}>
                        <div style={{ fontSize:13, fontWeight:600, color:'#f1f5f9', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{lead.name||'Unnamed'}</div>
                        <div style={{ display:'flex', alignItems:'center', gap:4, flexShrink:0 }}>
                          {Number(lead.value_amount)>0 && <span style={{ fontSize:11, fontWeight:600, color:'#fbbf24' }}>{fmt(Number(lead.value_amount))}</span>}
                          <button className="icb" style={{ width:22, height:22, borderRadius:6, background:'rgba(239,68,68,.1)', color:'#f87171', padding:0 }}
                            onClick={e => { e.stopPropagation(); void deleteLead(lead.id); }}>
                            <Trash2 size={11}/>
                          </button>
                        </div>
                      </div>
                      <div style={{ fontSize:11, color:'#64748b', marginBottom:5, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                        {lead.company||lead.email}
                      </div>
                      <div style={{ display:'flex', gap:5 }}>
                        <span style={{ fontSize:10, fontWeight:600, padding:'2px 7px', borderRadius:99, background:lsc.bg, color:lsc.color, border:`1px solid ${lsc.dot}45` }}>{lsc.label}</span>
                        <span style={{ fontSize:10, fontWeight:600, padding:'2px 7px', borderRadius:99, background:lpc.bg, color:lpc.color }}>{lead.priority}</span>
                      </div>
                    </div>
                    <ChevronRight size={13} color={isA?'#6366f1':'#1e293b'} style={{ flexShrink:0, marginTop:10 }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT – Detail panel */}
        <div style={{ display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {!selectedLead ? (
            <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#1e293b' }}>
              <User size={44} style={{ marginBottom:14, opacity:.4 }}/>
              <div style={{ fontSize:15, fontWeight:600, color:'#334155' }}>Select a lead</div>
              <div style={{ fontSize:13, marginTop:5, color:'#1e293b' }}>Click any lead on the left</div>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', height:'100%' }} className="fade">

              {/* Lead header */}
              <div style={{ padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,.06)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:42, height:42, borderRadius:11, background:sc?.bg, border:`1px solid ${sc?.dot}55`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, fontWeight:700, color:sc?.color }}>
                    {(selectedLead.name||'?')[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize:16, fontWeight:700, color:'#f1f5f9' }}>{selectedLead.name}</div>
                    <div style={{ fontSize:12, color:'#64748b', display:'flex', gap:10, marginTop:2, flexWrap:'wrap' }}>
                      <span>{selectedLead.email}</span>
                      {selectedLead.company && <span>· {selectedLead.company}</span>}
                      {selectedLead.phone   && <span>· {selectedLead.phone}</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  {Number(selectedLead.value_amount)>0 && (
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontSize:15, fontWeight:700, color:'#fbbf24' }}>{fmtF(Number(selectedLead.value_amount))}</div>
                      <div style={{ fontSize:10, color:'#475569' }}>Deal Value</div>
                    </div>
                  )}
                  <button onClick={() => void deleteLead(selectedLead.id)} className="icb" style={{ width:32, height:32, borderRadius:8, background:'rgba(239,68,68,.08)', color:'#f87171', padding:0 }}>
                    <Trash2 size={13}/>
                  </button>
                </div>
              </div>

              {/* Quick status pills */}
              <div style={{ padding:'9px 20px', borderBottom:'1px solid rgba(255,255,255,.06)', display:'flex', gap:5, flexWrap:'wrap' }}>
                {Object.entries(STATUSES).map(([k,v]) => (
                  <button key={k} onClick={() => void changeStatus(selectedLead.id, k)} className="spill"
                    style={{ fontSize:11, fontWeight:600, padding:'5px 12px', borderRadius:99, cursor:'pointer', background:selectedLead.status===k?v.bg:'rgba(255,255,255,.04)', color:selectedLead.status===k?v.color:'#475569', border:`1px solid ${selectedLead.status===k?v.dot+'75':'rgba(255,255,255,.08)'}` }}>
                    {selectedLead.status===k && <span style={{ display:'inline-block', width:6, height:6, borderRadius:99, background:v.dot, marginRight:5, verticalAlign:'middle' }}/>}
                    {v.label}
                  </button>
                ))}
              </div>

              {/* Tabs */}
              <div style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,.06)', padding:'0 20px' }}>
                {([
                  ['details', 'Details',                   <Edit2 size={12}/>],
                  ['notes',   `Notes (${activities.length})`, <StickyNote size={12}/>],
                  ['invoices',`Invoices (${invoices.length})`, <FileText size={12}/>],
                ] as [RightTab,string,React.ReactNode][]).map(([key,label,icon]) => (
                  <button key={key} onClick={() => setRightTab(key)} className="tab"
                    style={{ padding:'10px 14px', fontSize:12, fontWeight:500, display:'flex', alignItems:'center', gap:5, color:rightTab===key?'#818cf8':'#475569', borderBottom:`2px solid ${rightTab===key?'#6366f1':'transparent'}` }}>
                    {icon}{label}
                  </button>
                ))}
              </div>

              {/* Tab body */}
              <div style={{ flex:1, overflowY:'auto', padding:'18px 20px' }}>

                {/* DETAILS */}
                {rightTab==='details' && (
                  <div style={{ display:'grid', gap:14, maxWidth:580 }} className="fade">
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                      <F label="Full Name" icon={<User size={11}/>}>
                        <input style={I} value={leadForm.name} onChange={e => setLeadForm(p => ({ ...p, name:e.target.value }))} placeholder="Full name"/>
                      </F>
                      <F label="Email" icon={<Mail size={11}/>}>
                        <input style={I} type="email" value={leadForm.email} onChange={e => setLeadForm(p => ({ ...p, email:e.target.value }))} placeholder="email@co.com"/>
                      </F>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                      <F label="Phone" icon={<Phone size={11}/>}>
                        <input style={I} value={leadForm.phone} onChange={e => setLeadForm(p => ({ ...p, phone:e.target.value }))} placeholder="+91 98765 43210"/>
                      </F>
                      <F label="Company" icon={<Building2 size={11}/>}>
                        <input style={I} value={leadForm.company} onChange={e => setLeadForm(p => ({ ...p, company:e.target.value }))} placeholder="Company name"/>
                      </F>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
                      <F label="Status">
                        <select style={I} value={leadForm.status} onChange={e => setLeadForm(p => ({ ...p, status:e.target.value }))}>
                          {Object.entries(STATUSES).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
                        </select>
                      </F>
                      <F label="Priority">
                        <select style={I} value={leadForm.priority} onChange={e => setLeadForm(p => ({ ...p, priority:e.target.value }))}>
                          {['low','medium','high'].map(s => <option key={s} value={s}>{s[0].toUpperCase()+s.slice(1)}</option>)}
                        </select>
                      </F>
                      <F label="Value (₹)" icon={<IndianRupee size={11}/>}>
                        <input style={I} type="number" value={leadForm.value_amount||''} onChange={e => setLeadForm(p => ({ ...p, value_amount:Number(e.target.value||0) }))} placeholder="0"/>
                      </F>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                      <F label="Source">
                        <select style={I} value={leadForm.source} onChange={e => setLeadForm(p => ({ ...p, source:e.target.value }))}>
                          {SOURCES.map(s => <option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
                        </select>
                      </F>
                      <F label="Follow-up" icon={<Calendar size={11}/>}>
                        <input style={I} type="datetime-local" value={leadForm.next_follow_up||''} onChange={e => setLeadForm(p => ({ ...p, next_follow_up:e.target.value }))}/>
                      </F>
                    </div>
                    <F label="Notes">
                      <textarea style={{ ...I, minHeight:88, paddingTop:10, resize:'vertical', lineHeight:1.7 }}
                        value={leadForm.notes} onChange={e => setLeadForm(p => ({ ...p, notes:e.target.value }))} placeholder="Notes about this lead…"/>
                    </F>
                    <button style={{ ...P, justifyContent:'center', width:'100%' }} className="pbtn" onClick={() => void saveLead()} disabled={saving}>
                      <Save size={13}/> {saving?'Saving…':'Save Changes'}
                    </button>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                      {[
                        { label:'Lead ID', val:`#${selectedLead.id}` },
                        { label:'Created',  val:new Date(selectedLead.created_at).toLocaleDateString('en-IN') },
                        { label:'Updated',  val:new Date(selectedLead.updated_at).toLocaleDateString('en-IN') },
                      ].map((m,i) => (
                        <div key={i} style={{ background:'rgba(255,255,255,.03)', borderRadius:8, padding:'9px 12px', border:'1px solid rgba(255,255,255,.06)' }}>
                          <div style={{ fontSize:10, color:'#475569', marginBottom:2 }}>{m.label}</div>
                          <div style={{ fontSize:12, fontWeight:600, color:'#94a3b8' }}>{m.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* NOTES */}
                {rightTab==='notes' && (
                  <div className="fade">
                    <div style={{ display:'flex', gap:8, marginBottom:6 }}>
                      <textarea style={{ ...I, flex:1, minHeight:70, paddingTop:10, resize:'none', lineHeight:1.6 }}
                        placeholder="Write a note, call log, or follow-up reminder… (Ctrl+Enter to save)"
                        value={noteInput} onChange={e => setNoteInput(e.target.value)}
                        onKeyDown={e => { if(e.key==='Enter'&&(e.metaKey||e.ctrlKey)) void addNote(); }}
                      />
                      <button style={{ ...P, alignSelf:'flex-end' }} className="pbtn" onClick={() => void addNote()} disabled={saving||!noteInput.trim()}>
                        <Plus size={14}/> Add
                      </button>
                    </div>
                    <div style={{ fontSize:11, color:'#334155', marginBottom:16 }}>Ctrl+Enter to add quickly</div>
                    {activities.length===0 ? (
                      <div style={{ textAlign:'center', padding:36, color:'#334155' }}>
                        <MessageSquare size={28} style={{ margin:'0 auto 8px', display:'block' }}/>
                        <div style={{ fontSize:13 }}>No notes yet</div>
                      </div>
                    ) : (
                      <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                        {activities.map(a => {
                          const tc: Record<string,string> = { note:'#818cf8', lead_created:'#34d399', lead_updated:'#60a5fa', invoice_created:'#fbbf24', invoice_sent:'#4ade80', stage_changed:'#f87171', imported_contact:'#6366f1', imported_vendor:'#a855f7' };
                          const c = tc[a.activity_type]||'#64748b';
                          return (
                            <div key={a.id} style={{ display:'flex', gap:10, padding:'11px 13px', background:'rgba(255,255,255,.03)', borderRadius:9, border:'1px solid rgba(255,255,255,.06)' }}>
                              <div style={{ width:7, height:7, borderRadius:99, background:c, flexShrink:0, marginTop:5 }}/>
                              <div style={{ flex:1 }}>
                                <div style={{ fontSize:13, color:'#cbd5e1', lineHeight:1.6 }}>{a.message}</div>
                                <div style={{ fontSize:11, color:'#475569', marginTop:4 }}>
                                  {a.activity_type.replace(/_/g,' ')} · {new Date(a.created_at).toLocaleString('en-IN')}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* INVOICES */}
                {rightTab==='invoices' && (
                  <div className="fade">
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                      <div style={{ fontSize:13, color:'#64748b' }}>
                        {invoices.length} invoice{invoices.length!==1?'s':''}
                        {invoices.length>0 && ` · Total: ${fmtF(invoices.reduce((s,i)=>s+Number(i.total_amount||0),0))}`}
                      </div>
                      <button style={P} className="pbtn" onClick={() => setShowNewInvoice(true)}>
                        <Plus size={13}/> Create Invoice
                      </button>
                    </div>

                    {invoices.length===0 ? (
                      <div style={{ textAlign:'center', padding:44, color:'#334155', border:'2px dashed rgba(255,255,255,.07)', borderRadius:14 }}>
                        <FileText size={32} style={{ margin:'0 auto 10px', display:'block' }}/>
                        <div style={{ fontSize:14, fontWeight:600, color:'#475569', marginBottom:5 }}>No invoices yet</div>
                        <div style={{ fontSize:12, marginBottom:16 }}>Create your first invoice for this client</div>
                        <button style={{ ...P, margin:'0 auto', display:'flex' }} className="pbtn" onClick={() => setShowNewInvoice(true)}>
                          <Plus size={13}/> Create Invoice
                        </button>
                      </div>
                    ) : (
                      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                        {invoices.map(inv => {
                          const lines: InvoiceLine[] = (() => { try { return JSON.parse(inv.line_items_json||'[]'); } catch { return []; } })();
                          const isc = ({ draft:{c:'#94a3b8',bg:'rgba(148,163,184,.1)',bd:'rgba(148,163,184,.2)'}, sent:{c:'#34d399',bg:'rgba(52,211,153,.1)',bd:'rgba(52,211,153,.25)'}, paid:{c:'#4ade80',bg:'rgba(74,222,128,.1)',bd:'rgba(74,222,128,.25)'} } as Record<string,{c:string;bg:string;bd:string}>)[inv.status] || {c:'#94a3b8',bg:'rgba(148,163,184,.1)',bd:'rgba(148,163,184,.2)'};
                          return (
                            <div key={inv.id} style={{ borderRadius:12, border:'1px solid rgba(255,255,255,.08)', overflow:'hidden', background:'rgba(255,255,255,.02)' }}>
                              {/* Invoice top */}
                              <div style={{ padding:'13px 15px', display:'flex', justifyContent:'space-between', alignItems:'flex-start', borderBottom:'1px solid rgba(255,255,255,.06)' }}>
                                <div>
                                  <div style={{ fontSize:14, fontWeight:700, color:'#f1f5f9', marginBottom:2 }}>{inv.invoice_number}</div>
                                  <div style={{ fontSize:11, color:'#64748b' }}>{inv.invoice_date}{inv.due_date?` · Due ${inv.due_date}`:''}</div>
                                </div>
                                <div style={{ textAlign:'right' }}>
                                  <div style={{ fontSize:16, fontWeight:700, color:'#fbbf24', marginBottom:4 }}>{inv.currency} {Number(inv.total_amount).toLocaleString()}</div>
                                  <span style={{ fontSize:10, fontWeight:600, padding:'2px 9px', borderRadius:99, background:isc.bg, color:isc.c, border:`1px solid ${isc.bd}` }}>{inv.status.toUpperCase()}</span>
                                </div>
                              </div>
                              {/* Line items table */}
                              {lines.length>0 && (
                                <div style={{ padding:'10px 15px', borderBottom:'1px solid rgba(255,255,255,.06)' }}>
                                  <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
                                    <thead>
                                      <tr>
                                        {['Item','Qty','Rate','Amount'].map((h,i) => (
                                          <th key={i} style={{ textAlign:i===0?'left':'right', paddingBottom:6, fontWeight:500, color:'#475569' }}>{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {lines.map((l,li) => (
                                        <tr key={li} style={{ borderTop:'1px solid rgba(255,255,255,.04)' }}>
                                          <td style={{ padding:'5px 0', color:'#cbd5e1' }}>{l.description}</td>
                                          <td style={{ padding:'5px 0', textAlign:'right', color:'#94a3b8' }}>{l.qty}</td>
                                          <td style={{ padding:'5px 0', textAlign:'right', color:'#94a3b8' }}>{Number(l.rate).toLocaleString()}</td>
                                          <td style={{ padding:'5px 0', textAlign:'right', color:'#e2e8f0', fontWeight:500 }}>{Number(l.amount||l.qty*l.rate).toLocaleString()}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                  <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:2, marginTop:8, paddingTop:8, borderTop:'1px solid rgba(255,255,255,.08)' }}>
                                    <div style={{ display:'flex', gap:20, fontSize:12, color:'#64748b' }}><span>Subtotal</span><span>{Number(inv.subtotal).toLocaleString()}</span></div>
                                    <div style={{ display:'flex', gap:20, fontSize:12, color:'#64748b' }}><span>Tax ({inv.tax_percent}%)</span><span>{Number(inv.tax_amount).toLocaleString()}</span></div>
                                    <div style={{ display:'flex', gap:20, fontSize:13, fontWeight:700, color:'#fbbf24' }}><span>Total</span><span>{inv.currency} {Number(inv.total_amount).toLocaleString()}</span></div>
                                  </div>
                                </div>
                              )}
                              {/* Footer */}
                              <div style={{ padding:'9px 15px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, flexWrap:'wrap' }}>
                                {inv.sent_to_email
                                  ? <span style={{ fontSize:11, color:'#475569', display:'flex', alignItems:'center', gap:4 }}><Mail size={11}/> Sent to {inv.sent_to_email}</span>
                                  : <span style={{ fontSize:11, color:'#334155' }}>Not sent yet</span>
                                }
                                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                                  <button style={{ ...G, height:32, fontSize:12 }} onClick={() => printInvoice(inv)}><Printer size={11}/> Print</button>
                                  <button style={{ ...G, height:32, fontSize:12 }} onClick={() => downloadInvoice(inv)}><Download size={11}/> Download</button>
                                  {inv.status!=='sent' && inv.status!=='paid' && (
                                    <button style={{ ...P, height:32, fontSize:12 }} className="pbtn" onClick={() => void sendInvoice(inv.id)} disabled={saving}>
                                      <Send size={11}/> Send to Client
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL – New Lead */}
      {showNewLead && (
        <div className="ov" style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.7)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, padding:20 }}
          onClick={e => e.target===e.currentTarget && setShowNewLead(false)}>
          <div className="mod" style={{ background:'#0f172a', border:'1px solid rgba(255,255,255,.1)', borderRadius:16, padding:24, width:'100%', maxWidth:500, maxHeight:'90vh', overflowY:'auto', boxShadow:'0 32px 80px rgba(0,0,0,.8)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:'#f1f5f9' }}>New Lead</div>
                <div style={{ fontSize:12, color:'#475569', marginTop:2 }}>Add a lead to your pipeline</div>
              </div>
              <button onClick={() => setShowNewLead(false)} className="icb" style={{ width:28, height:28, borderRadius:8, background:'rgba(255,255,255,.06)', color:'#64748b', padding:0 }}><X size={14}/></button>
            </div>
            <form onSubmit={createLead} style={{ display:'grid', gap:11 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <F label="Full Name *"><input style={I} placeholder="John Doe" value={newLeadForm.name} onChange={e => setNewLead(p => ({ ...p, name:e.target.value }))} required/></F>
                <F label="Email *"><input style={I} type="email" placeholder="john@company.com" value={newLeadForm.email} onChange={e => setNewLead(p => ({ ...p, email:e.target.value }))} required/></F>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <F label="Phone"><input style={I} placeholder="+91 98765 43210" value={newLeadForm.phone} onChange={e => setNewLead(p => ({ ...p, phone:e.target.value }))} /></F>
                <F label="Company"><input style={I} placeholder="Company name" value={newLeadForm.company} onChange={e => setNewLead(p => ({ ...p, company:e.target.value }))} /></F>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
                <F label="Status">
                  <select style={I} value={newLeadForm.status} onChange={e => setNewLead(p => ({ ...p, status:e.target.value }))}>
                    {Object.entries(STATUSES).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </F>
                <F label="Priority">
                  <select style={I} value={newLeadForm.priority} onChange={e => setNewLead(p => ({ ...p, priority:e.target.value }))}>
                    {['low','medium','high'].map(s => <option key={s} value={s}>{s[0].toUpperCase()+s.slice(1)}</option>)}
                  </select>
                </F>
                <F label="Value (₹)"><input style={I} type="number" placeholder="0" value={newLeadForm.value_amount||''} onChange={e => setNewLead(p => ({ ...p, value_amount:Number(e.target.value||0) }))} /></F>
              </div>
              <F label="Notes"><textarea style={{ ...I, minHeight:68, paddingTop:10, resize:'vertical', lineHeight:1.6 }} placeholder="Initial notes…" value={newLeadForm.notes} onChange={e => setNewLead(p => ({ ...p, notes:e.target.value }))} /></F>
              <div style={{ display:'flex', gap:8, paddingTop:4 }}>
                <button type="button" onClick={() => setShowNewLead(false)} style={{ ...G, flex:1, justifyContent:'center' }}>Cancel</button>
                <button type="submit" style={{ ...P, flex:2, justifyContent:'center' }} className="pbtn" disabled={saving}>{saving?'Creating…':<><Plus size={13}/> Create Lead</>}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL – New Invoice */}
      {showNewInvoice && selectedLead && (
        <div className="ov" style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.7)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, padding:20 }}
          onClick={e => e.target===e.currentTarget && setShowNewInvoice(false)}>
          <div className="mod" style={{ background:'#0f172a', border:'1px solid rgba(255,255,255,.1)', borderRadius:16, padding:24, width:'100%', maxWidth:580, maxHeight:'92vh', overflowY:'auto', boxShadow:'0 32px 80px rgba(0,0,0,.8)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:'#f1f5f9' }}>Create Invoice</div>
                <div style={{ fontSize:12, color:'#475569', marginTop:2 }}>For {selectedLead.name}</div>
              </div>
              <button onClick={() => setShowNewInvoice(false)} className="icb" style={{ width:28, height:28, borderRadius:8, background:'rgba(255,255,255,.06)', color:'#64748b', padding:0 }}><X size={14}/></button>
            </div>

            <div style={{ display:'grid', gap:13 }}>
              {/* Meta row */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
                <F label="Invoice No."><input style={I} placeholder="Auto-generated" value={invF.invoice_number} onChange={e => setInvF(p => ({ ...p, invoice_number:e.target.value }))}/></F>
                <F label="Currency">
                  <select style={I} value={invF.currency} onChange={e => setInvF(p => ({ ...p, currency:e.target.value }))}>
                    {['INR','USD','EUR','GBP','AED'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </F>
                <F label="Tax (%)"><input style={I} type="number" value={invF.tax_percent} onChange={e => setInvF(p => ({ ...p, tax_percent:Number(e.target.value||0) }))}/></F>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <F label="GST Mode">
                  <select style={I} value={invF.gst_mode} onChange={e => setInvF(p => ({ ...p, gst_mode:e.target.value as 'igst'|'cgst_sgst' }))}>
                    <option value="igst">IGST</option>
                    <option value="cgst_sgst">CGST + SGST</option>
                  </select>
                </F>
                <F label="Template In Use"><input style={I} value={invoiceTemplateId} readOnly /></F>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <F label="Invoice Date"><input style={I} type="date" value={invF.invoice_date} onChange={e => setInvF(p => ({ ...p, invoice_date:e.target.value }))}/></F>
                <F label="Due Date"><input style={I} type="date" value={invF.due_date} onChange={e => setInvF(p => ({ ...p, due_date:e.target.value }))}/></F>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <F label="Bill To Name"><input style={I} value={invF.bill_to_name} onChange={e => setInvF(p => ({ ...p, bill_to_name:e.target.value }))} placeholder={selectedLead.name} /></F>
                <F label="PO Number"><input style={I} value={invF.po_number} onChange={e => setInvF(p => ({ ...p, po_number:e.target.value }))} placeholder="PO-001" /></F>
              </div>
              <F label="Bill To Address"><input style={I} value={invF.bill_to_address} onChange={e => setInvF(p => ({ ...p, bill_to_address:e.target.value }))} placeholder={selectedLead.company || 'Client billing address'} /></F>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
                <F label="Client GSTIN"><input style={I} value={invF.bill_to_gstin} onChange={e => setInvF(p => ({ ...p, bill_to_gstin:e.target.value }))} placeholder="22AAAAA0000A1Z5" /></F>
                <F label="Your GSTIN"><input style={I} value={invF.seller_gstin} onChange={e => setInvF(p => ({ ...p, seller_gstin:e.target.value }))} placeholder="Your GSTIN" /></F>
                <F label="Place of Supply"><input style={I} value={invF.place_of_supply} onChange={e => setInvF(p => ({ ...p, place_of_supply:e.target.value }))} placeholder="Delhi" /></F>
              </div>

              {/* Line items */}
              <div>
                <div style={{ fontSize:11, fontWeight:600, color:'#475569', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:8 }}>Items</div>
                <div style={{ border:'1px solid rgba(255,255,255,.08)', borderRadius:10, overflow:'hidden' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 86px 72px 96px 72px 36px', padding:'8px 12px', background:'rgba(255,255,255,.04)', borderBottom:'1px solid rgba(255,255,255,.06)' }}>
                    {['Description','HSN/SAC','Qty','Rate (₹)','GST %',''].map((h,i) => <div key={i} style={{ fontSize:11, fontWeight:600, color:'#475569', textAlign:i>1?'right':'left' }}>{h}</div>)}
                  </div>
                  {invF.lines.map((line,li) => (
                    <div key={li} style={{ display:'grid', gridTemplateColumns:'1fr 86px 72px 96px 72px 36px', padding:'8px 12px', borderBottom:li<invF.lines.length-1?'1px solid rgba(255,255,255,.05)':'none', alignItems:'center', gap:4 }}>
                      <input style={{ ...I, height:33, fontSize:13 }} placeholder="Item description" value={line.description} onChange={e => updateLine(li,'description',e.target.value)}/>
                      <input style={{ ...I, height:33, fontSize:13, marginLeft:6 }} placeholder="9983" value={line.hsn_sac || ''} onChange={e => updateLine(li,'hsn_sac',e.target.value)}/>
                      <input style={{ ...I, height:33, fontSize:13, textAlign:'right', marginLeft:6 }} type="number" min="1" value={line.qty} onChange={e => updateLine(li,'qty',Number(e.target.value||1))}/>
                      <input style={{ ...I, height:33, fontSize:13, textAlign:'right', marginLeft:6 }} type="number" min="0" placeholder="0" value={line.rate||''} onChange={e => updateLine(li,'rate',Number(e.target.value||0))}/>
                      <input style={{ ...I, height:33, fontSize:13, textAlign:'right', marginLeft:6 }} type="number" min="0" value={line.gst_percent||0} onChange={e => updateLine(li,'gst_percent',Number(e.target.value||0))}/>
                      <button onClick={() => removeLine(li)} disabled={invF.lines.length===1} className="icb" style={{ width:26, height:26, borderRadius:7, background:'rgba(239,68,68,.08)', color:'#f87171', marginLeft:6, opacity:invF.lines.length===1?.3:1 }}>
                        <X size={11}/>
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={addLine} style={{ ...G, marginTop:8, height:32, fontSize:12, padding:'0 10px' }}><Plus size={12}/> Add Item</button>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <F label="Discount"><input style={I} type="number" min="0" value={invF.discount_amount || 0} onChange={e => setInvF(p => ({ ...p, discount_amount:Number(e.target.value || 0) }))}/></F>
                <F label="Shipping"><input style={I} type="number" min="0" value={invF.shipping_amount || 0} onChange={e => setInvF(p => ({ ...p, shipping_amount:Number(e.target.value || 0) }))}/></F>
              </div>
              <F label="Terms"><input style={I} value={invF.terms} onChange={e => setInvF(p => ({ ...p, terms:e.target.value }))} placeholder="Payment terms" /></F>
              <F label="Invoice Notes"><textarea style={{ ...I, minHeight:70, paddingTop:10, resize:'vertical', lineHeight:1.6 }} value={invF.notes} onChange={e => setInvF(p => ({ ...p, notes:e.target.value }))} placeholder="Additional notes for client" /></F>

              {/* Live total */}
              <div style={{ background:'rgba(251,191,36,.05)', border:'1px solid rgba(251,191,36,.15)', borderRadius:10, padding:'12px 15px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#94a3b8', marginBottom:3 }}><span>Subtotal</span><span>{invF.currency} {invSubtotal.toLocaleString('en-IN',{minimumFractionDigits:2})}</span></div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#94a3b8', marginBottom:3 }}><span>Discount</span><span>{invF.currency} {Number(invF.discount_amount||0).toLocaleString('en-IN',{minimumFractionDigits:2})}</span></div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#94a3b8', marginBottom:3 }}><span>Shipping</span><span>{invF.currency} {Number(invF.shipping_amount||0).toLocaleString('en-IN',{minimumFractionDigits:2})}</span></div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#94a3b8', marginBottom:8 }}><span>Tax ({invF.tax_percent}%)</span><span>{invF.currency} {invTax.toLocaleString('en-IN',{minimumFractionDigits:2})}</span></div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:16, fontWeight:700, color:'#fbbf24' }}><span>Total</span><span>{invF.currency} {invTotal.toLocaleString('en-IN',{minimumFractionDigits:2})}</span></div>
              </div>

              <div style={{ display:'flex', gap:8 }}>
                <button onClick={() => setShowNewInvoice(false)} style={{ ...G, flex:1, justifyContent:'center' }}>Cancel</button>
                <button onClick={() => void createInvoice()} style={{ ...P, flex:2, justifyContent:'center' }} className="pbtn" disabled={saving}>
                  {saving?'Creating…':<><FileText size={13}/> Create Invoice</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Field wrapper ── */
function F({ label, icon, children }: { label:string; icon?:React.ReactNode; children:React.ReactNode }) {
  return (
    <div>
      <label style={{ display:'flex', alignItems:'center', gap:4, fontSize:10, fontWeight:600, color:'#475569', marginBottom:5, letterSpacing:'.05em', textTransform:'uppercase' }}>
        {icon}{label}
      </label>
      {children}
    </div>
  );
}

/* ── Shared style tokens ── */
const I: CSSProperties = { width:'100%', background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.09)', borderRadius:8, color:'#e2e8f0', height:38, padding:'0 12px', fontFamily:'Inter,system-ui,sans-serif', fontSize:13, outline:'none' };
const P: CSSProperties = { height:36, borderRadius:8, border:'none', background:'linear-gradient(135deg,#4f46e5,#7c3aed)', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, cursor:'pointer', padding:'0 14px', fontFamily:'Inter,system-ui,sans-serif', fontWeight:600, fontSize:13, flexShrink:0 };
const G: CSSProperties = { height:36, borderRadius:8, border:'1px solid rgba(255,255,255,.1)', background:'rgba(255,255,255,.04)', color:'#94a3b8', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, cursor:'pointer', padding:'0 12px', fontFamily:'Inter,system-ui,sans-serif', fontWeight:500, fontSize:13, flexShrink:0 };