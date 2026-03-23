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
  color: string; glow: string; trend: string; trendUp: boolean;
}> = {
  leads:    { label: 'Total Leads',     icon: Target,    color: '#6339ff', glow: 'rgba(99,57,255,0.18)',  trend: '+12%',  trendUp: true  },
  contacts: { label: 'Contacts',        icon: PhoneCall, color: '#14b8a6', glow: 'rgba(20,184,166,0.18)', trend: '+5%',   trendUp: true  },
  visitors: { label: 'Site Visitors',   icon: Eye,       color: '#f59e0b', glow: 'rgba(245,158,11,0.18)', trend: '+18%',  trendUp: true  },
  jobs:     { label: 'Active Jobs',     icon: Users,     color: '#ec4899', glow: 'rgba(236,72,153,0.18)', trend: 'Stable',trendUp: false },
  careers:  { label: 'Applications',    icon: Briefcase, color: '#3b82f6', glow: 'rgba(59,130,246,0.18)', trend: '+2%',   trendUp: true  },
  vendors:  { label: 'Vendors',         icon: Truck,     color: '#10b981', glow: 'rgba(16,185,129,0.18)', trend: 'Stable',trendUp: false },
  blogs:    { label: 'Published Blogs', icon: FileText,  color: '#8b5cf6', glow: 'rgba(139,92,246,0.18)', trend: '+1',    trendUp: true  },
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
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
    .dash-root { font-family: 'DM Sans', sans-serif; }
    .dash-header { display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between; gap:16px; margin-bottom:28px; }
    .dash-eyebrow { font-size:11px; font-weight:600; letter-spacing:1.8px; text-transform:uppercase; color:rgba(255,255,255,0.28); margin-bottom:6px; }
    .dash-title { font-family:'Syne',sans-serif; font-weight:800; font-size:28px; color:#fff; letter-spacing:-0.8px; line-height:1.1; margin-bottom:5px; }
    .dash-sub { font-size:14px; color:rgba(255,255,255,0.38); font-weight:300; }
    .header-controls { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
    .live-badge { display:flex; align-items:center; gap:6px; padding:6px 12px; border-radius:100px; background:rgba(20,184,166,0.09); border:1px solid rgba(20,184,166,0.2); font-size:12px; font-weight:500; color:#5eead4; }
    .live-dot { width:6px; height:6px; border-radius:50%; background:#14b8a6; box-shadow:0 0 6px rgba(20,184,166,0.7); animation:blink 2.2s ease-in-out infinite; }
    @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
    .time-label { font-size:12px; color:rgba(255,255,255,0.3); padding:6px 12px; border-radius:8px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07); }
    .refresh-btn { width:36px; height:36px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:9px; color:rgba(255,255,255,0.4); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:color 0.2s,background 0.2s; }
    .refresh-btn:hover { color:#fff; background:rgba(255,255,255,0.07); }
    .refresh-btn:disabled { opacity:0.4; cursor:not-allowed; }
    .spin { animation:spin 0.8s linear infinite; }
    @keyframes spin { to { transform:rotate(360deg); } }
    .error-bar { display:flex; align-items:center; gap:10px; background:rgba(239,68,68,0.07); border:1px solid rgba(239,68,68,0.18); border-radius:10px; padding:12px 16px; margin-bottom:24px; }
    .error-dot { width:6px; height:6px; border-radius:50%; background:#ef4444; flex-shrink:0; }
    .error-text { font-size:13px; color:#fca5a5; }
    .stats-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(195px,1fr)); gap:13px; margin-bottom:22px; }
    .stat-card { position:relative; overflow:hidden; background:#0d0d1a; border:1px solid rgba(255,255,255,0.06); border-radius:13px; padding:18px; transition:transform 0.2s,border-color 0.2s; cursor:default; }
    .stat-card:hover { transform:translateY(-2px); border-color:rgba(255,255,255,0.1); }
    .stat-card-glow { position:absolute; top:-40px; right:-40px; width:110px; height:110px; border-radius:50%; pointer-events:none; opacity:0; transition:opacity 0.3s; filter:blur(28px); }
    .stat-card:hover .stat-card-glow { opacity:1; }
    .stat-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
    .stat-icon-wrap { width:36px; height:36px; border-radius:9px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.07); }
    .stat-trend { display:flex; align-items:center; gap:4px; font-size:11px; font-weight:600; padding:3px 8px; border-radius:100px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.5); }
    .stat-trend.up { color:#4ade80; background:rgba(74,222,128,0.08); border-color:rgba(74,222,128,0.15); }
    .stat-value { font-family:'Syne',sans-serif; font-weight:800; font-size:29px; color:#fff; letter-spacing:-1px; line-height:1; margin-bottom:5px; }
    .stat-skeleton { width:60px; height:28px; border-radius:6px; background:rgba(255,255,255,0.07); animation:shimmer 1.4s ease-in-out infinite; }
    @keyframes shimmer { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
    .stat-label { font-size:12px; color:rgba(255,255,255,0.32); font-weight:400; }
    .bottom-grid { display:grid; grid-template-columns:1fr 1fr; gap:13px; margin-bottom:13px; }
    @media(max-width:900px){.bottom-grid{grid-template-columns:1fr;}}
    .panel { background:#0d0d1a; border:1px solid rgba(255,255,255,0.06); border-radius:13px; padding:20px; }
    .panel-title { font-family:'Syne',sans-serif; font-weight:700; font-size:14px; color:#fff; letter-spacing:-0.3px; margin-bottom:16px; display:flex; align-items:center; gap:8px; }
    .panel-icon { width:26px; height:26px; border-radius:7px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.07); color:rgba(255,255,255,0.35); }
    .empty-state { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:36px 20px; border:1px dashed rgba(255,255,255,0.08); border-radius:10px; text-align:center; }
    .empty-icon { width:42px; height:42px; border-radius:10px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.06); display:flex; align-items:center; justify-content:center; margin-bottom:10px; color:rgba(255,255,255,0.18); }
    .empty-title { font-size:13px; font-weight:600; color:rgba(255,255,255,0.45); margin-bottom:4px; }
    .empty-sub { font-size:12px; color:rgba(255,255,255,0.2); }
    .promo-panel { background:#0d0d1a; border:1px solid rgba(99,57,255,0.2); border-radius:13px; padding:20px; position:relative; overflow:hidden; }
    .promo-glow { position:absolute; top:-60px; right:-60px; width:200px; height:200px; border-radius:50%; background:radial-gradient(circle,rgba(99,57,255,0.13) 0%,transparent 70%); pointer-events:none; }
    .promo-badge { display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:100px; background:rgba(99,57,255,0.13); border:1px solid rgba(99,57,255,0.28); font-size:10px; font-weight:600; color:#a78bfa; letter-spacing:0.5px; text-transform:uppercase; margin-bottom:12px; }
    .promo-title { font-family:'Syne',sans-serif; font-weight:800; font-size:19px; color:#fff; letter-spacing:-0.5px; margin-bottom:8px; line-height:1.2; }
    .promo-sub { font-size:13px; color:rgba(255,255,255,0.38); line-height:1.6; margin-bottom:18px; font-weight:300; }
    .promo-actions { display:flex; gap:8px; flex-wrap:wrap; }
    .promo-btn { display:flex; align-items:center; gap:7px; padding:8px 14px; border-radius:9px; font-size:12.5px; font-weight:600; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.18s; border:1px solid; }
    .promo-btn-primary { background:rgba(99,57,255,0.18); border-color:rgba(99,57,255,0.32); color:#c4b5fd; }
    .promo-btn-primary:hover { background:rgba(99,57,255,0.28); }
    .promo-btn-secondary { background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.08); color:rgba(255,255,255,0.45); }
    .promo-btn-secondary:hover { background:rgba(255,255,255,0.07); color:rgba(255,255,255,0.7); }
    .summary-bar { background:#0d0d1a; border:1px solid rgba(255,255,255,0.06); border-radius:13px; padding:18px 24px; display:grid; grid-template-columns:repeat(4,1fr); }
    @media(max-width:640px){.summary-bar{grid-template-columns:repeat(2,1fr);gap:16px 0;}}
    .summary-stat { text-align:center; border-right:1px solid rgba(255,255,255,0.06); padding:0 12px; }
    .summary-stat:last-child { border-right:none; }
    .summary-val { font-family:'Syne',sans-serif; font-weight:800; font-size:22px; letter-spacing:-0.5px; margin-bottom:4px; }
    .summary-label { font-size:10px; letter-spacing:0.8px; text-transform:uppercase; color:rgba(255,255,255,0.28); font-weight:400; }
    .skel-line { height:13px; border-radius:4px; background:rgba(255,255,255,0.07); animation:shimmer 1.4s ease-in-out infinite; }
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
              <RefreshCw size={14} className={loading ? 'spin' : ''} />
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
                <div className="stat-card-glow" style={{ background: cfg.glow }} />
                <div className="stat-top">
                  <div className="stat-icon-wrap">
                    <Icon size={15} style={{ color: cfg.color }} />
                  </div>
                  <div className={`stat-trend ${cfg.trendUp ? 'up' : ''}`}>
                    {cfg.trendUp && <ArrowUpRight size={9} />}
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
              <div className="panel-icon"><Activity size={13} /></div>
              Recent Activity
            </div>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0 }} className="skel-line" />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div className="skel-line" style={{ width: '55%' }} />
                      <div className="skel-line" style={{ width: '35%', height: 9 }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon"><Activity size={17} /></div>
                <p className="empty-title">No activity yet</p>
                <p className="empty-sub">Events and actions will appear here.</p>
              </div>
            )}
          </div>

          <div className="promo-panel">
            <div className="promo-glow" />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="promo-badge">
                <Zap size={9} />
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
                  <TrendingUp size={12} />
                  View Analytics
                </button>
                <button className="promo-btn promo-btn-secondary">
                  <Zap size={12} />
                  Quick Actions
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="summary-bar">
          {[
            { val: (stats.leads + stats.contacts), label: 'Interactions', g: 'linear-gradient(135deg,#6339ff,#14b8a6)' },
            { val: stats.visitors,                  label: 'Visitors',     g: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
            { val: (stats.careers + stats.vendors),  label: 'Applications', g: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' },
            { val: stats.blogs,                      label: 'Published',    g: 'linear-gradient(135deg,#10b981,#14b8a6)' },
          ].map(({ val, label, g }) => (
            <div key={label} className="summary-stat">
              <div className="summary-val" style={{ background: g, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
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