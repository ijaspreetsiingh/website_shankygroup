'use client';

import { useEffect, useState } from 'react';
import {
  Target, PhoneCall, Truck, Briefcase,
  Users, Eye, FileText, ArrowUpRight,
  Activity, RefreshCw, TrendingUp, Zap
} from 'lucide-react';

type Stats = {
  leads: number; contacts: number; vendors: number;
  careers: number; jobs: number; visitors: number; blogs: number;
};

const initialStats: Stats = {
  leads: 0, contacts: 0, vendors: 0,
  careers: 0, jobs: 0, visitors: 0, blogs: 0,
};

const STATS_CONFIG: Record<keyof Stats, {
  label: string; icon: React.ElementType;
  color: string; bg: string; trend: string; trendUp: boolean;
}> = {
  leads:    { label: 'Total Leads',     icon: Target,    color: '#6339ff', bg: 'rgba(99,57,255,0.08)',  trend: '+12%',  trendUp: true  },
  contacts: { label: 'Contacts',        icon: PhoneCall, color: '#14b8a6', bg: 'rgba(20,184,166,0.08)', trend: '+5%',   trendUp: true  },
  visitors: { label: 'Site Visitors',   icon: Eye,       color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', trend: '+18%',  trendUp: true  },
  jobs:     { label: 'Active Jobs',     icon: Users,     color: '#ec4899', bg: 'rgba(236,72,153,0.08)', trend: 'Stable',trendUp: false },
  careers:  { label: 'Applications',    icon: Briefcase, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', trend: '+2%',   trendUp: true  },
  vendors:  { label: 'Vendors',         icon: Truck,     color: '#10b981', bg: 'rgba(16,185,129,0.08)', trend: 'Stable',trendUp: false },
  blogs:    { label: 'Published Blogs', icon: FileText,  color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', trend: '+1',    trendUp: true  },
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fetchTime, setFetchTime] = useState<Date>(new Date());

  const loadStats = async () => {
    try {
      setLoading(true); setError('');
      const res = await fetch('/admin/api/stats', { cache: 'no-store' });
      const data = (await res.json()) as Partial<Stats> & { message?: string };
      if (!res.ok) throw new Error(data.message || 'Failed to load stats');
      setStats({
        leads: Number(data.leads || 0), contacts: Number(data.contacts || 0),
        vendors: Number(data.vendors || 0), careers: Number(data.careers || 0),
        jobs: Number(data.jobs || 0), visitors: Number(data.visitors || 0),
        blogs: Number(data.blogs || 0),
      });
      setFetchTime(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadStats(); }, []);

  const css = `
    .dash-root { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
    .dash-header { display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between; gap:16px; margin-bottom:28px; }
    .dash-eyebrow { font-size:12px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#999; margin-bottom:4px; }
    .dash-title { font-weight:800; font-size:28px; color:#1d1d1f; letter-spacing:-0.8px; line-height:1.1; margin-bottom:4px; }
    .dash-sub { font-size:14px; color:#888; font-weight:400; }
    .header-controls { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
    .live-badge { display:flex; align-items:center; gap:6px; padding:6px 14px; border-radius:100px; background:#f0fdf4; border:1px solid #bbf7d0; font-size:12px; font-weight:500; color:#16a34a; }
    .live-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; box-shadow:0 0 6px rgba(34,197,94,0.5); animation:blink 2.2s ease-in-out infinite; }
    @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
    .time-label { font-size:12px; color:#999; padding:6px 12px; border-radius:8px; background:#fff; border:1px solid #e5e5e5; }
    .refresh-btn { width:36px; height:36px; background:#fff; border:1px solid #e5e5e5; border-radius:10px; color:#666; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
    .refresh-btn:hover { color:#333; background:#f5f5f5; border-color:#ddd; }
    .refresh-btn:disabled { opacity:0.4; cursor:not-allowed; }
    .spin { animation:spin 0.8s linear infinite; }
    @keyframes spin { to { transform:rotate(360deg); } }
    .error-bar { display:flex; align-items:center; gap:10px; background:#fef2f2; border:1px solid #fecaca; border-radius:10px; padding:12px 16px; margin-bottom:24px; }
    .error-dot { width:6px; height:6px; border-radius:50%; background:#ef4444; flex-shrink:0; }
    .error-text { font-size:13px; color:#dc2626; }
    .stats-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:14px; margin-bottom:24px; }
    .stat-card { position:relative; overflow:hidden; background:#fff; border:1px solid #e5e5e5; border-radius:14px; padding:20px; transition:all 0.2s; cursor:default; }
    .stat-card:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.06); border-color:#ddd; }
    .stat-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
    .stat-icon-wrap { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; }
    .stat-trend { display:flex; align-items:center; gap:4px; font-size:11px; font-weight:600; padding:4px 10px; border-radius:100px; background:#f5f5f5; color:#888; }
    .stat-trend.up { color:#16a34a; background:#f0fdf4; }
    .stat-value { font-weight:800; font-size:30px; color:#1d1d1f; letter-spacing:-1px; line-height:1; margin-bottom:6px; }
    .stat-skeleton { width:60px; height:28px; border-radius:6px; background:#f0f0f0; animation:shimmer 1.4s ease-in-out infinite; }
    @keyframes shimmer { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
    .stat-label { font-size:13px; color:#888; font-weight:400; }
    .bottom-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
    @media(max-width:900px){.bottom-grid{grid-template-columns:1fr;}}
    .panel { background:#fff; border:1px solid #e5e5e5; border-radius:14px; padding:22px; }
    .panel-title { font-weight:700; font-size:15px; color:#1d1d1f; letter-spacing:-0.2px; margin-bottom:18px; display:flex; align-items:center; gap:8px; }
    .panel-icon { width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; background:#f5f5f5; color:#888; }
    .empty-state { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px; border:1px dashed #e0e0e0; border-radius:12px; text-align:center; }
    .empty-icon { width:44px; height:44px; border-radius:12px; background:#f5f5f5; display:flex; align-items:center; justify-content:center; margin-bottom:12px; color:#ccc; }
    .empty-title { font-size:14px; font-weight:600; color:#666; margin-bottom:4px; }
    .empty-sub { font-size:12px; color:#999; }
    .promo-panel { background:#fff; border:1px solid #e5e5e5; border-radius:14px; padding:22px; position:relative; overflow:hidden; }
    .promo-glow { position:absolute; top:-60px; right:-60px; width:200px; height:200px; border-radius:50%; background:radial-gradient(circle,rgba(99,57,255,0.06) 0%,transparent 70%); pointer-events:none; }
    .promo-badge { display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:100px; background:rgba(99,57,255,0.06); border:1px solid rgba(99,57,255,0.12); font-size:11px; font-weight:600; color:#6339ff; letter-spacing:0.5px; text-transform:uppercase; margin-bottom:14px; }
    .promo-title { font-weight:800; font-size:20px; color:#1d1d1f; letter-spacing:-0.5px; margin-bottom:8px; line-height:1.2; }
    .promo-sub { font-size:13px; color:#888; line-height:1.6; margin-bottom:20px; font-weight:400; }
    .promo-actions { display:flex; gap:8px; flex-wrap:wrap; }
    .promo-btn { display:flex; align-items:center; gap:7px; padding:9px 16px; border-radius:10px; font-size:13px; font-weight:600; font-family:'Inter',sans-serif; cursor:pointer; transition:all 0.2s; border:1px solid; }
    .promo-btn-primary { background:#6339ff; border-color:#6339ff; color:#fff; }
    .promo-btn-primary:hover { background:#5228e0; box-shadow:0 4px 12px rgba(99,57,255,0.3); }
    .promo-btn-secondary { background:#fff; border-color:#e5e5e5; color:#666; }
    .promo-btn-secondary:hover { background:#f5f5f5; color:#333; }
    .summary-bar { background:#fff; border:1px solid #e5e5e5; border-radius:14px; padding:20px 24px; display:grid; grid-template-columns:repeat(4,1fr); }
    @media(max-width:640px){.summary-bar{grid-template-columns:repeat(2,1fr);gap:16px 0;}}
    .summary-stat { text-align:center; border-right:1px solid #f0f0f0; padding:0 12px; }
    .summary-stat:last-child { border-right:none; }
    .summary-val { font-weight:800; font-size:24px; color:#1d1d1f; letter-spacing:-0.5px; margin-bottom:4px; }
    .summary-label { font-size:11px; letter-spacing:0.8px; text-transform:uppercase; color:#999; font-weight:500; }
    .skel-line { height:13px; border-radius:4px; background:#f0f0f0; animation:shimmer 1.4s ease-in-out infinite; }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="dash-root">
        <div className="dash-header">
          <div>
            <p className="dash-eyebrow">Overview</p>
            <h1 className="dash-title">Dashboard</h1>
            <p className="dash-sub">Welcome back — here's what's happening.</p>
          </div>
          <div className="header-controls">
            <div className="live-badge">
              <div className="live-dot" />
              Live Data
            </div>
            <span className="time-label">
              {fetchTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <button className="refresh-btn" onClick={loadStats} disabled={loading}>
              <RefreshCw size={15} className={loading ? 'spin' : ''} />
            </button>
          </div>
        </div>

        {error && (
          <div className="error-bar">
            <div className="error-dot" />
            <span className="error-text">{error}</span>
          </div>
        )}

        <div className="stats-grid">
          {Object.entries(STATS_CONFIG).map(([key, cfg]) => {
            const val = stats[key as keyof Stats];
            const Icon = cfg.icon;
            return (
              <div key={key} className="stat-card">
                <div className="stat-top">
                  <div className="stat-icon-wrap" style={{ background: cfg.bg }}>
                    <Icon size={18} style={{ color: cfg.color }} />
                  </div>
                  <div className={`stat-trend ${cfg.trendUp ? 'up' : ''}`}>
                    {cfg.trendUp && <ArrowUpRight size={10} />}
                    {cfg.trend}
                  </div>
                </div>
                <div className="stat-value">
                  {loading ? <div className="stat-skeleton" /> : val.toLocaleString()}
                </div>
                <div className="stat-label">{cfg.label}</div>
              </div>
            );
          })}
        </div>

        <div className="bottom-grid">
          <div className="panel">
            <div className="panel-title">
              <div className="panel-icon"><Activity size={14} /></div>
              Recent Activity
            </div>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0 }} className="skel-line" />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div className="skel-line" style={{ width: '55%' }} />
                      <div className="skel-line" style={{ width: '35%', height: 9 }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon"><Activity size={18} /></div>
                <p className="empty-title">No activity yet</p>
                <p className="empty-sub">Events and actions will appear here.</p>
              </div>
            )}
          </div>

          <div className="promo-panel">
            <div className="promo-glow" />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="promo-badge">
                <Zap size={10} />
                Pro Dashboard
              </div>
              <div className="promo-title">
                Full visibility.<br />Total control.
              </div>
              <p className="promo-sub">
                Manage leads, content, and operations from one unified interface — built for the Shanky Group admin team.
              </p>
              <div className="promo-actions">
                <button className="promo-btn promo-btn-primary">
                  <TrendingUp size={13} />
                  View Analytics
                </button>
                <button className="promo-btn promo-btn-secondary">
                  <Zap size={13} />
                  Quick Actions
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="summary-bar">
          {[
            { val: (stats.leads + stats.contacts), label: 'Interactions', color: '#6339ff' },
            { val: stats.visitors,                  label: 'Visitors',     color: '#f59e0b' },
            { val: (stats.careers + stats.vendors),  label: 'Applications', color: '#3b82f6' },
            { val: stats.blogs,                      label: 'Published',    color: '#10b981' },
          ].map(({ val, label, color }) => (
            <div key={label} className="summary-stat">
              <div className="summary-val" style={{ color }}>
                {loading ? '—' : val.toLocaleString()}
              </div>
              <div className="summary-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
