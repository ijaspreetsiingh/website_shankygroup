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
      if (!raw) return <span className="at-cell-val">—</span>;
      const href = raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('/') ? raw : `/${raw}`;
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="at-btn at-btn-ghost"
          style={{ height:28, padding:'0 10px', fontSize:11, color:'var(--at-primary)', borderColor:'var(--at-primary-border)' }}
          onClick={(e) => e.stopPropagation()}
        >
          Download Resume
        </a>
      );
    }
    if (isPrimary) return <span className="at-cell-primary">{val===null||val===''?'—':String(val)}</span>;
    return <span className="at-cell-val">{visibleValue(val)}</span>;
  };
  const renderDetailField = (key: string) => {
    if (!detailRow || !(key in detailRow)) return null;
    const value = detailRow[key];
    return (
      <div key={key} style={{ padding:'10px 12px', border:'1px solid var(--at-border)', borderRadius:8, background:'var(--at-hover-bg)' }}>
        <div style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--at-text-muted)', marginBottom:4 }}>{key.replace(/_/g, ' ')}</div>
        <div style={{ fontSize:13, color:'var(--at-text-heading)', whiteSpace:key==='message'?'pre-wrap':'normal', wordBreak:'break-word' }}>
          {value===null || value==='' ? '—' : String(value)}
        </div>
      </div>
    );
  };

  return (
    <div className="at-root">

      {/* HEADER */}
      <div className="at-header">
        <div>
          <p className="at-eyebrow">Data Management</p>
          <h1 className="at-page-title">{title}</h1>
          <p className="at-page-sub">Manage and overview your {title.toLowerCase()} records.</p>
        </div>
        <div className="at-controls">
          <div className="at-search-wrap">
            <Search size={14} className="at-search-icon"/>
            <input className="at-search" type="text" placeholder="Search records..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
          </div>
          <button className="at-icon-btn" title="Refresh" onClick={load} disabled={loading}>
            <RefreshCw size={14} className={loading ? 'at-spin' : ''}/>
          </button>
          <button className="at-btn at-btn-primary" onClick={handleOpenAdd}>
            <Plus size={13}/> Add New
          </button>
        </div>
      </div>

      {/* ERROR (outside modal) */}
      {error && !isModalOpen && (
        <div className="at-alert error">
          <AlertCircle size={13} style={{flexShrink:0,marginTop:1}}/>
          <span>{error}</span>
        </div>
      )}

      {/* TABLE CARD */}
      <div className="at-card">
        <div className="at-toolbar">
          <span className="at-count">
            {loading ? 'Loading…' : <><strong>{filteredRows.length}</strong> of <strong>{rows.length}</strong> records</>}
          </span>
          <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
            <button className="at-btn at-btn-ghost" style={{height:30,padding:'0 11px',fontSize:12}}>
              <Filter size={11}/> Filter
            </button>
            <button
              className="at-btn at-btn-ghost"
              style={{height:30,padding:'0 11px',fontSize:12}}
              onClick={() => setShowFullData(v => !v)}
            >
              {showFullData ? 'Show Less' : 'Show More'}
            </button>
            <button
              className="at-btn at-btn-ghost"
              style={{height:30,padding:'0 11px',fontSize:12,color:'var(--at-danger)',borderColor:'var(--at-danger-border)'}}
              onClick={handleBulkDelete}
              disabled={actionLoading || selectedIds.size === 0}
            >
              <Trash2 size={11}/> Delete Selected ({selectedIds.size})
            </button>
          </div>
        </div>

        <div className="at-table-wrap">
          <table className="at-table">
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
                      <td key={j}><div className="at-skel" style={{width:j===0?'60%':'80%'}}/></td>
                    ))}
                  </tr>
                ))
              ) : rows.length === 0 ? (
                <tr><td colSpan={Math.max(columns.length+2,1)}>
                  <div className="at-empty">
                    <div className="at-empty-icon"><FileSearch size={22}/></div>
                    <p className="at-empty-title">No records yet</p>
                    <p className="at-empty-sub">The {title.toLowerCase()} database is empty. Click &quot;Add New&quot; to insert the first record.</p>
                    <button className="at-btn at-btn-primary" onClick={handleOpenAdd}><Plus size={13}/>Add New</button>
                  </div>
                </td></tr>
              ) : filteredRows.length === 0 ? (
                <tr><td colSpan={columns.length+2} style={{padding:'32px 16px',textAlign:'center',fontSize:13,color:'var(--at-text-muted)'}}>
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
                      <div className="at-row-actions">
                        <button className="at-row-btn edit" title="Edit" onClick={(e)=>{ e.stopPropagation(); handleOpenEdit(row); }}><Edit2 size={13}/></button>
                        <button className="at-row-btn del" title="Delete" onClick={(e)=>{ e.stopPropagation(); handleDelete(row.id); }}><Trash2 size={13}/></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && rows.length > 0 && (
          <div className="at-footer">
            Showing <strong>{filteredRows.length}</strong> of <strong>{rows.length}</strong> total entries
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="at-overlay">
          <div className="at-modal">
            <div className="at-modal-header">
              <span className="at-modal-title">
                {modalMode === 'add' ? 'Add New Record' : `Edit Record #${formData.id}`}
              </span>
              <button className="at-modal-close" onClick={()=>setIsModalOpen(false)}><X size={14}/></button>
            </div>

            <div className="at-modal-body">
              {error && (
                <div className="at-alert error" style={{marginBottom:14}}>
                  <AlertCircle size={13} style={{flexShrink:0,marginTop:1}}/><span>{error}</span>
                </div>
              )}
              {successMsg && (
                <div className="at-alert success" style={{marginBottom:14}}>
                  <CheckCircle2 size={13} style={{flexShrink:0,marginTop:1}}/><span>{successMsg}</span>
                </div>
              )}

              <form id="atc-form" onSubmit={handleSubmit}>
                <div className="at-form-grid">
                  {formColumns.map(col=>(
                    <div key={col} className={isTextarea(col) ? 'at-field-full' : ''}>
                      <label className="at-label">{col.replace(/_/g,' ')}</label>
                      {isTextarea(col) ? (
                        <textarea
                          className="at-input at-textarea"
                          rows={4}
                          required={modalMode==='add'}
                          value={String(formData[col]||'')}
                          onChange={e=>setFormData({...formData,[col]:e.target.value})}
                        />
                      ) : (isJobsPage && col === 'status') ? (
                        <select
                          className="at-input"
                          value={String(formData[col] || 'draft')}
                          onChange={e=>setFormData({...formData,[col]:e.target.value})}
                        >
                          <option value="draft">draft</option>
                          <option value="published">published</option>
                          <option value="closed">closed</option>
                        </select>
                      ) : (
                        <input
                          className="at-input"
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

            <div className="at-modal-footer">
              <button className="at-btn at-btn-ghost" type="button" onClick={()=>setIsModalOpen(false)}>
                <X size={13}/> Cancel
              </button>
              <button className="at-btn at-btn-primary" type="submit" form="atc-form" disabled={actionLoading}>
                {actionLoading ? <span className="at-modal-spinner"/> : null}
                {modalMode==='add'?'Create Record':'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILS MODAL (VENDORS) */}
      {isDetailsOpen && detailRow && isVendorPage && (
        <div className="at-overlay" onClick={e => { if (e.target === e.currentTarget) setIsDetailsOpen(false); }}>
          <div className="at-modal" style={{ maxWidth: 860 }}>
            <div className="at-modal-header">
              <span className="at-modal-title">Vendor Details</span>
              <button className="at-modal-close" onClick={()=>setIsDetailsOpen(false)}><X size={14}/></button>
            </div>
            <div className="at-modal-body">
              <div style={{ display:'flex', gap:8, marginBottom:14, flexWrap:'wrap' }}>
                {(['basic','contact','business','meta'] as const).map(tab => (
                  <button
                    key={tab}
                    className="at-btn at-btn-ghost"
                    style={{
                      height:30, padding:'0 10px', fontSize:12,
                      borderColor: detailTab===tab ? 'var(--at-primary-border)' : undefined,
                      color: detailTab===tab ? 'var(--at-primary)' : undefined,
                      background: detailTab===tab ? 'var(--at-primary-light)' : undefined,
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
  );
}
