'use client';

import { useEffect, useState, FormEvent } from 'react';
import { RefreshCw, Search, TableProperties, AlertCircle, FileSearch, Filter, Plus, Edit2, Trash2, X, CheckCircle2 } from 'lucide-react';

type Row = Record<string, string | number | null | boolean>;

export default function AdminTableClient({ title, endpoint }: { title: string; endpoint: string }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState<Row>({});
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFullData, setShowFullData] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailRow, setDetailRow] = useState<Row | null>(null);
  const [detailTab, setDetailTab] = useState<'basic' | 'contact' | 'business' | 'meta'>('basic');

  const load = async () => {
    try {
      setLoading(true); setError('');
      const res = await fetch(endpoint, { cache: 'no-store' });
      const data = (await res.json()) as { rows?: Row[]; message?: string };
      if (!res.ok) throw new Error(data.message || 'Failed to fetch data');
      setRows(Array.isArray(data.rows) ? data.rows : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally { setLoading(false); }
  };

  useEffect(() => { void load(); }, [endpoint]);
  useEffect(() => {
    const valid = new Set(rows.map(r => String(r.id ?? '')));
    setSelectedIds(prev => new Set(Array.from(prev).filter(id => valid.has(id))));
  }, [rows]);

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  const formColumns = columns.filter(c => !['id', 'created_at', 'updated_at'].includes(c));
  const filteredRows = rows.filter(row => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return Object.values(row).some(val => String(val).toLowerCase().includes(term));
  });

  const handleOpenAdd = () => {
    setModalMode('add');
    const emptyForm: Row = {};
    formColumns.forEach(c => emptyForm[c] = '');
    setFormData(emptyForm); setIsModalOpen(true); setSuccessMsg(''); setError('');
  };
  const handleOpenEdit = (row: Row) => { setModalMode('edit'); setFormData({...row}); setIsModalOpen(true); setSuccessMsg(''); setError(''); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setActionLoading(true); setError(''); setSuccessMsg('');
    try {
      const res = await fetch(endpoint, { method: modalMode === 'add' ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (!res.ok || !(data.success ?? data.ok)) throw new Error(data.message || 'Failed to save record.');
      setSuccessMsg(`Record successfully ${modalMode === 'add' ? 'created' : 'updated'}!`);
      setTimeout(() => { setIsModalOpen(false); load(); }, 1000);
    } catch (err) { setError(err instanceof Error ? err.message : 'Action failed'); }
    finally { setActionLoading(false); }
  };

  const handleDelete = async (id: string | number | null | boolean) => {
    if (!id || !confirm('Delete this record permanently?')) return;
    setActionLoading(true); setError('');
    try {
      const res = await fetch(endpoint, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      const data = await res.json();
      if (!res.ok || !(data.success ?? data.ok)) throw new Error(data.message || 'Failed to delete record.');
      await load();
    } catch (err) { setError(err instanceof Error ? err.message : 'Action failed'); }
    finally { setActionLoading(false); }
  };

  const getRowId = (row: Row): string => String(row.id ?? '');
  const toggleRowSelection = (row: Row) => {
    const id = getRowId(row);
    if (!id) return;
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const allFilteredSelected = filteredRows.length > 0 && filteredRows.every(r => selectedIds.has(getRowId(r)));
  const toggleSelectAllFiltered = () => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (allFilteredSelected) filteredRows.forEach(r => next.delete(getRowId(r)));
      else filteredRows.forEach(r => { const id = getRowId(r); if (id) next.add(id); });
      return next;
    });
  };
  const handleBulkDelete = async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    if (!confirm(`Delete ${ids.length} selected record(s)? This action cannot be undone.`)) return;
    setActionLoading(true); setError('');
    try {
      for (const id of ids) {
        const row = rows.find(r => getRowId(r) === id);
        if (!row) continue;
        const res = await fetch(endpoint, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: row.id }),
        });
        const data = await res.json();
        if (!res.ok || !(data.success ?? data.ok)) throw new Error(data.message || `Failed to delete record ${id}.`);
      }
      setSelectedIds(new Set());
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bulk delete failed');
    } finally {
      setActionLoading(false);
    }
  };

  const isTextarea = (col: string) => ['message','description','content','requirements'].includes(col);
  const isVendorPage = endpoint.includes('/vendors');
  const isCareerPage = endpoint.includes('/careers');
  const isJobsPage = endpoint.includes('/jobs');
  const visibleValue = (val: Row[string]) => {
    const str = val===null||val==='' ? '—' : String(val);
    if (showFullData) return str;
    return str.length > 50 ? `${str.substring(0, 50)}…` : str;
  };
  const vendorTabs = detailRow ? {
    basic: ['company_name','first_name','last_name','vendor_status','created_at'],
    contact: ['email','phone','landline','contact_person','designation','website'],
    business: ['address','city','state','country','gst_no','exclusive_offers'],
    meta: ['message'],
  } : null;
  const openDetails = (row: Row) => {
    setDetailRow(row);
    setDetailTab('basic');
    setIsDetailsOpen(true);
  };
  const renderCellValue = (col: string, val: Row[string], isPrimary: boolean) => {
    if (isCareerPage && col === 'resume_path') {
      const raw = val===null || val==='' ? '' : String(val);
      if (!raw) return <span className="atc-cell-val">—</span>;
      const href = raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('/') ? raw : `/${raw}`;
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="atc-btn atc-btn-ghost"
          style={{ height:28, padding:'0 10px', fontSize:11, color:'#93c5fd', borderColor:'rgba(59,130,246,0.35)' }}
          onClick={(e) => e.stopPropagation()}
        >
          Download Resume
        </a>
      );
    }
    if (isPrimary) return <span className="atc-cell-primary">{val===null||val===''?'—':String(val)}</span>;
    return <span className="atc-cell-val">{visibleValue(val)}</span>;
  };
  const renderDetailField = (key: string) => {
    if (!detailRow || !(key in detailRow)) return null;
    const value = detailRow[key];
    return (
      <div key={key} style={{ padding:'10px 12px', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, background:'rgba(255,255,255,0.02)' }}>
        <div style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'.06em', color:'rgba(255,255,255,0.35)', marginBottom:4 }}>{key.replace(/_/g, ' ')}</div>
        <div style={{ fontSize:13, color:'rgba(255,255,255,0.82)', whiteSpace:key==='message'?'pre-wrap':'normal', wordBreak:'break-word' }}>
          {value===null || value==='' ? '—' : String(value)}
        </div>
      </div>
    );
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
    .atc-root { font-family:'DM Sans',sans-serif; color:#e2e8f0; }

    /* HEADER */
    .atc-header { display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between; gap:14px; margin-bottom:20px; }
    .atc-eyebrow { font-size:11px; font-weight:600; letter-spacing:1.8px; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:5px; }
    .atc-title { font-family:'Syne',sans-serif; font-weight:800; font-size:26px; color:#fff; letter-spacing:-0.7px; margin-bottom:3px; }
    .atc-sub { font-size:13px; color:rgba(255,255,255,0.35); font-weight:300; }
    .atc-controls { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }

    /* BUTTONS */
    .atc-btn { display:inline-flex; align-items:center; gap:7px; height:38px; padding:0 14px; border-radius:9px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; cursor:pointer; transition:all 0.18s; border:none; }
    .atc-btn:disabled { opacity:0.5; cursor:not-allowed; }
    .atc-btn-primary { background:linear-gradient(135deg,#6339ff,#4f46e5); color:#fff; box-shadow:0 4px 14px rgba(99,57,255,0.25); }
    .atc-btn-primary:hover:not(:disabled) { box-shadow:0 6px 20px rgba(99,57,255,0.35); transform:translateY(-1px); }
    .atc-btn-ghost { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09); color:rgba(255,255,255,0.5); }
    .atc-btn-ghost:hover:not(:disabled) { background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.8); }
    .atc-icon-btn { width:38px; height:38px; border-radius:9px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09); color:rgba(255,255,255,0.4); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.18s; }
    .atc-icon-btn:hover { color:#fff; background:rgba(255,255,255,0.08); }
    .atc-icon-btn:disabled { opacity:0.4; cursor:not-allowed; }
    .atc-spin { animation:atc-spin 0.8s linear infinite; }
    @keyframes atc-spin { to { transform:rotate(360deg); } }

    /* SEARCH */
    .atc-search-wrap { position:relative; }
    .atc-search-icon { position:absolute; top:50%; left:12px; transform:translateY(-50%); color:rgba(255,255,255,0.25); pointer-events:none; transition:color 0.18s; }
    .atc-search-wrap:focus-within .atc-search-icon { color:#a78bfa; }
    .atc-search {
      width:220px; height:38px; padding:0 14px 0 36px;
      background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09);
      border-radius:9px; color:#fff; font-size:13px; font-family:'DM Sans',sans-serif; outline:none;
      transition:border-color 0.18s, box-shadow 0.18s, width 0.2s;
    }
    .atc-search::placeholder { color:rgba(255,255,255,0.2); }
    .atc-search:focus { border-color:rgba(99,57,255,0.45); box-shadow:0 0 0 3px rgba(99,57,255,0.08); width:260px; }

    /* ALERT */
    .atc-alert { display:flex; align-items:flex-start; gap:9px; border-radius:10px; border:1px solid; padding:11px 14px; font-size:13px; margin-bottom:16px; }
    .atc-alert.error { border-color:rgba(239,68,68,0.22); background:rgba(239,68,68,0.07); color:#fca5a5; }
    .atc-alert.success { border-color:rgba(20,184,166,0.22); background:rgba(20,184,166,0.07); color:#5eead4; }

    /* TABLE CARD */
    .atc-card { background:#0d0d1a; border:1px solid rgba(255,255,255,0.07); border-radius:13px; overflow:hidden; }
    .atc-toolbar { padding:13px 16px; border-bottom:1px solid rgba(255,255,255,0.06); display:flex; align-items:center; justify-content:space-between; }
    .atc-count { font-size:12.5px; color:rgba(255,255,255,0.4); }
    .atc-count strong { color:rgba(255,255,255,0.7); }

    .atc-table-wrap { overflow-x:auto; }
    table.atc-table { width:100%; border-collapse:collapse; }
    .atc-table th {
      padding:10px 14px; text-align:left; font-size:10.5px; font-weight:600;
      letter-spacing:0.9px; text-transform:uppercase; color:rgba(255,255,255,0.28);
      border-bottom:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02);
      white-space:nowrap;
    }
    .atc-table td { padding:11px 14px; border-bottom:1px solid rgba(255,255,255,0.05); vertical-align:middle; }
    .atc-table tr:last-child td { border-bottom:none; }
    .atc-table tbody tr:hover td { background:rgba(255,255,255,0.02); }

    .atc-cell-primary { font-size:13px; font-weight:600; color:#fff; }
    .atc-cell-val { font-size:13px; color:rgba(255,255,255,0.55); max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

    /* SKELETON */
    .atc-skel { height:13px; border-radius:4px; background:rgba(255,255,255,0.07); animation:atc-shimmer 1.4s ease-in-out infinite; }
    @keyframes atc-shimmer { 0%,100%{opacity:1} 50%{opacity:0.4} }

    /* ROW ACTIONS */
    .atc-row-actions { display:flex; align-items:center; justify-content:flex-end; gap:5px; }
    .atc-row-btn { background:none; border:1px solid transparent; border-radius:7px; padding:6px; cursor:pointer; display:flex; align-items:center; transition:all 0.15s; }
    .atc-row-btn.edit { color:#a78bfa; }
    .atc-row-btn.edit:hover { background:rgba(167,139,250,0.1); border-color:rgba(167,139,250,0.2); }
    .atc-row-btn.del { color:#f87171; }
    .atc-row-btn.del:hover { background:rgba(248,113,113,0.1); border-color:rgba(248,113,113,0.2); }

    /* EMPTY STATE */
    .atc-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:56px 24px; text-align:center; }
    .atc-empty-icon { width:52px; height:52px; border-radius:14px; background:rgba(255,255,255,0.03); border:1px dashed rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; margin-bottom:14px; color:rgba(255,255,255,0.18); }
    .atc-empty-title { font-family:'Syne',sans-serif; font-size:15px; font-weight:700; color:rgba(255,255,255,0.45); margin-bottom:5px; }
    .atc-empty-sub { font-size:12.5px; color:rgba(255,255,255,0.22); margin-bottom:16px; max-width:280px; line-height:1.6; }

    /* TABLE FOOTER */
    .atc-footer { padding:11px 16px; border-top:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.01); font-size:12px; color:rgba(255,255,255,0.28); }
    .atc-footer strong { color:rgba(255,255,255,0.55); }

    /* MODAL */
    .atc-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.72); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; z-index:100; padding:16px; }
    .atc-modal { background:#0d0d1a; border:1px solid rgba(255,255,255,0.09); border-radius:16px; width:100%; max-width:640px; max-height:90vh; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 24px 64px rgba(0,0,0,0.7); }
    .atc-modal-header { padding:17px 20px; border-bottom:1px solid rgba(255,255,255,0.07); display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
    .atc-modal-title { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; color:#fff; letter-spacing:-0.3px; }
    .atc-modal-close { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.09); border-radius:8px; color:rgba(255,255,255,0.45); cursor:pointer; width:30px; height:30px; display:flex; align-items:center; justify-content:center; transition:all 0.15s; }
    .atc-modal-close:hover { color:#fff; background:rgba(255,255,255,0.09); }
    .atc-modal-body { padding:18px 20px; overflow-y:auto; flex:1; scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.08) transparent; }
    .atc-modal-footer { padding:14px 20px; border-top:1px solid rgba(255,255,255,0.07); display:flex; justify-content:flex-end; gap:8px; flex-shrink:0; }

    /* FORM */
    .atc-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:13px; }
    @media(max-width:540px){ .atc-form-grid { grid-template-columns:1fr; } }
    .atc-field-full { grid-column:1 / -1; }
    .atc-label { font-size:11px; font-weight:600; letter-spacing:0.8px; text-transform:uppercase; color:rgba(255,255,255,0.4); display:block; margin-bottom:6px; }
    .atc-input {
      width:100%; height:40px; padding:0 12px;
      background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09);
      border-radius:9px; color:#fff; font-size:13px; font-family:'DM Sans',sans-serif; outline:none;
      transition:border-color 0.18s, box-shadow 0.18s;
    }
    .atc-input::placeholder { color:rgba(255,255,255,0.2); }
    .atc-input:focus { border-color:rgba(99,57,255,0.45); box-shadow:0 0 0 3px rgba(99,57,255,0.08); }
    .atc-textarea { height:auto; padding:10px 12px; resize:vertical; line-height:1.6; }
    .atc-modal-spinner { width:14px; height:14px; border-radius:50%; border:2px solid rgba(255,255,255,0.25); border-top-color:#fff; animation:atc-spin 0.7s linear infinite; }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="atc-root">

        {/* HEADER */}
        <div className="atc-header">
          <div>
            <p className="atc-eyebrow">Data Management</p>
            <h1 className="atc-title">{title}</h1>
            <p className="atc-sub">Manage and overview your {title.toLowerCase()} records.</p>
          </div>
          <div className="atc-controls">
            <div className="atc-search-wrap">
              <Search size={14} className="atc-search-icon"/>
              <input className="atc-search" type="text" placeholder="Search records..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
            </div>
            <button className="atc-icon-btn" title="Refresh" onClick={load} disabled={loading}>
              <RefreshCw size={14} className={loading ? 'atc-spin' : ''}/>
            </button>
            <button className="atc-btn atc-btn-primary" onClick={handleOpenAdd}>
              <Plus size={13}/> Add New
            </button>
          </div>
        </div>

        {/* ERROR (outside modal) */}
        {error && !isModalOpen && (
          <div className="atc-alert error">
            <AlertCircle size={13} style={{flexShrink:0,marginTop:1}}/>
            <span>{error}</span>
          </div>
        )}

        {/* TABLE CARD */}
        <div className="atc-card">
          <div className="atc-toolbar">
            <span className="atc-count">
              {loading ? 'Loading…' : <><strong>{filteredRows.length}</strong> of <strong>{rows.length}</strong> records</>}
            </span>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <button className="atc-btn atc-btn-ghost" style={{height:30,padding:'0 11px',fontSize:12}}>
                <Filter size={11}/> Filter
              </button>
              <button
                className="atc-btn atc-btn-ghost"
                style={{height:30,padding:'0 11px',fontSize:12}}
                onClick={() => setShowFullData(v => !v)}
              >
                {showFullData ? 'Show Less' : 'Show More'}
              </button>
              <button
                className="atc-btn atc-btn-ghost"
                style={{height:30,padding:'0 11px',fontSize:12,color:'#fca5a5',borderColor:'rgba(248,113,113,0.35)'}}
                onClick={handleBulkDelete}
                disabled={actionLoading || selectedIds.size === 0}
              >
                <Trash2 size={11}/> Delete Selected ({selectedIds.size})
              </button>
            </div>
          </div>

          <div className="atc-table-wrap">
            <table className="atc-table">
              <thead>
                <tr>
                  {!loading && rows.length > 0 && (
                    <th style={{ width:40 }}>
                      <input type="checkbox" checked={allFilteredSelected} onChange={toggleSelectAllFiltered} />
                    </th>
                  )}
                  {columns.map(col=>(
                    <th key={col}>{col.replace(/_/g,' ')}</th>
                  ))}
                  {!loading && rows.length > 0 && <th style={{textAlign:'right'}}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({length:5}).map((_,i)=>(
                    <tr key={i}>
                      {Array.from({length:Math.max(columns.length+2,6)}).map((_,j)=>(
                        <td key={j}><div className="atc-skel" style={{width:j===0?'60%':'80%'}}/></td>
                      ))}
                    </tr>
                  ))
                ) : rows.length === 0 ? (
                  <tr><td colSpan={Math.max(columns.length+2,1)}>
                    <div className="atc-empty">
                      <div className="atc-empty-icon"><FileSearch size={22}/></div>
                      <p className="atc-empty-title">No records yet</p>
                      <p className="atc-empty-sub">The {title.toLowerCase()} database is empty. Click "Add New" to insert the first record.</p>
                      <button className="atc-btn atc-btn-primary" onClick={handleOpenAdd}><Plus size={13}/>Add New</button>
                    </div>
                  </td></tr>
                ) : filteredRows.length === 0 ? (
                  <tr><td colSpan={columns.length+2} style={{padding:'32px 16px',textAlign:'center',fontSize:13,color:'rgba(255,255,255,0.3)'}}>
                    No results match &ldquo;{searchTerm}&rdquo;
                  </td></tr>
                ) : (
                  filteredRows.map((row, idx)=>(
                    <tr
                      key={idx}
                      style={{ cursor:'pointer' }}
                      onClick={() => { if (isVendorPage) openDetails(row); }}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(getRowId(row))}
                          onChange={() => toggleRowSelection(row)}
                          onClick={e => e.stopPropagation()}
                        />
                      </td>
                      {columns.map((col, ci)=>(
                        <td key={col}>
                          {renderCellValue(col, row[col], ci === 0)}
                        </td>
                      ))}
                      <td>
                        <div className="atc-row-actions">
                          <button className="atc-row-btn edit" title="Edit" onClick={(e)=>{ e.stopPropagation(); handleOpenEdit(row); }}><Edit2 size={13}/></button>
                          <button className="atc-row-btn del" title="Delete" onClick={(e)=>{ e.stopPropagation(); handleDelete(row.id); }}><Trash2 size={13}/></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && rows.length > 0 && (
            <div className="atc-footer">
              Showing <strong>{filteredRows.length}</strong> of <strong>{rows.length}</strong> total entries
            </div>
          )}
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="atc-overlay">
            <div className="atc-modal">
              <div className="atc-modal-header">
                <span className="atc-modal-title">
                  {modalMode === 'add' ? 'Add New Record' : `Edit Record #${formData.id}`}
                </span>
                <button className="atc-modal-close" onClick={()=>setIsModalOpen(false)}><X size={14}/></button>
              </div>

              <div className="atc-modal-body">
                {error && (
                  <div className="atc-alert error" style={{marginBottom:14}}>
                    <AlertCircle size={13} style={{flexShrink:0,marginTop:1}}/><span>{error}</span>
                  </div>
                )}
                {successMsg && (
                  <div className="atc-alert success" style={{marginBottom:14}}>
                    <CheckCircle2 size={13} style={{flexShrink:0,marginTop:1}}/><span>{successMsg}</span>
                  </div>
                )}

                <form id="atc-form" onSubmit={handleSubmit}>
                  <div className="atc-form-grid">
                    {formColumns.map(col=>(
                      <div key={col} className={isTextarea(col) ? 'atc-field-full' : ''}>
                        <label className="atc-label">{col.replace(/_/g,' ')}</label>
                        {isTextarea(col) ? (
                          <textarea
                            className="atc-input atc-textarea"
                            rows={4}
                            required={modalMode==='add'}
                            value={String(formData[col]||'')}
                            onChange={e=>setFormData({...formData,[col]:e.target.value})}
                          />
                        ) : (isJobsPage && col === 'status') ? (
                          <select
                            className="atc-input"
                            value={String(formData[col] || 'draft')}
                            onChange={e=>setFormData({...formData,[col]:e.target.value})}
                          >
                            <option value="draft">draft</option>
                            <option value="published">published</option>
                            <option value="closed">closed</option>
                          </select>
                        ) : (
                          <input
                            className="atc-input"
                            type={col.includes('email')?'email':col.includes('phone')?'tel':'text'}
                            required={modalMode==='add' && !col.includes('status') && !col.includes('priority')}
                            value={String(formData[col]||'')}
                            onChange={e=>setFormData({...formData,[col]:e.target.value})}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </form>
              </div>

              <div className="atc-modal-footer">
                <button className="atc-btn atc-btn-ghost" type="button" onClick={()=>setIsModalOpen(false)}>
                  <X size={13}/> Cancel
                </button>
                <button className="atc-btn atc-btn-primary" type="submit" form="atc-form" disabled={actionLoading}>
                  {actionLoading ? <span className="atc-modal-spinner"/> : null}
                  {modalMode==='add'?'Create Record':'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DETAILS MODAL (VENDORS) */}
        {isDetailsOpen && detailRow && isVendorPage && (
          <div className="atc-overlay" onClick={e => { if (e.target === e.currentTarget) setIsDetailsOpen(false); }}>
            <div className="atc-modal" style={{ maxWidth: 860 }}>
              <div className="atc-modal-header">
                <span className="atc-modal-title">Vendor Details</span>
                <button className="atc-modal-close" onClick={()=>setIsDetailsOpen(false)}><X size={14}/></button>
              </div>
              <div className="atc-modal-body">
                <div style={{ display:'flex', gap:8, marginBottom:14, flexWrap:'wrap' }}>
                  {(['basic','contact','business','meta'] as const).map(tab => (
                    <button
                      key={tab}
                      className="atc-btn atc-btn-ghost"
                      style={{
                        height:30, padding:'0 10px', fontSize:12,
                        borderColor: detailTab===tab ? 'rgba(99,57,255,0.6)' : undefined,
                        color: detailTab===tab ? '#c4b5fd' : undefined,
                        background: detailTab===tab ? 'rgba(99,57,255,0.12)' : undefined,
                      }}
                      onClick={() => setDetailTab(tab)}
                    >
                      {tab === 'basic' ? 'Basic' : tab === 'contact' ? 'Contact' : tab === 'business' ? 'Business' : 'Message'}
                    </button>
                  ))}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {vendorTabs?.[detailTab].map(renderDetailField)}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}