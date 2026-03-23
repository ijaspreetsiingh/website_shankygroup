'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BarChart3, Users, Briefcase, Contact, PhoneCall,
  MapPin, Settings, LayoutDashboard, Menu, X, LogOut,
  FileText, Globe, UserCircle2, ChevronRight
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: BarChart3 },
  { href: '/admin/contacts', label: 'Contacts', icon: PhoneCall },
  { href: '/admin/vendors', label: 'Vendors', icon: Contact },
  { href: '/admin/careers', label: 'Careers', icon: Briefcase },
  { href: '/admin/jobs', label: 'Jobs', icon: Users },
  { href: '/admin/visitors', label: 'Visitors', icon: MapPin },
  { href: '/admin/blogs', label: 'Blogs', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  const handleLogout = async () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    localStorage.removeItem('user');
    await fetch('/admin/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  if (pathname === '/admin/login') return <>{children}</>;

  const activeLabel = navItems.find(n =>
    n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href)
  )?.label || 'Page';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .layout-root {
          min-height: 100vh;
          display: flex;
          background: #080810;
          font-family: 'DM Sans', sans-serif;
          color: #e2e8f0;
          overflow: hidden;
          position: relative;
        }

        .layout-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
        }
        .layout-bg::before {
          content: '';
          position: absolute; top: -20%; left: -10%; width: 50%; height: 50%;
          background: radial-gradient(ellipse, rgba(99,57,255,0.1) 0%, transparent 65%);
        }
        .layout-bg::after {
          content: '';
          position: absolute; bottom: -10%; right: -5%; width: 40%; height: 40%;
          background: radial-gradient(ellipse, rgba(20,184,166,0.07) 0%, transparent 65%);
        }

        /* SIDEBAR */
        .sidebar {
          position: fixed; top: 0; left: 0; bottom: 0;
          width: 252px;
          background: #0d0d1a;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column;
          z-index: 50;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .sidebar-closed { transform: translateX(-100%); }

        @media (min-width: 1024px) {
          .sidebar { position: static; transform: none !important; flex-shrink: 0; }
        }

        .sidebar-header {
          height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 18px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }

        .sidebar-brand { display: flex; align-items: center; gap: 10px; }

        .sidebar-logo {
          width: 32px; height: 32px; border-radius: 8px;
          background: linear-gradient(135deg, #6339ff, #14b8a6);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        .sidebar-brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 15px; color: #fff; letter-spacing: -0.2px;
        }

        .sidebar-close-btn {
          background: none; border: none; color: rgba(255,255,255,0.3);
          cursor: pointer; padding: 6px; border-radius: 7px;
          display: flex; align-items: center;
          transition: color 0.2s, background 0.2s;
        }
        .sidebar-close-btn:hover { color: #fff; background: rgba(255,255,255,0.06); }

        .sidebar-nav {
          flex: 1; overflow-y: auto;
          padding: 10px 8px;
          display: flex; flex-direction: column; gap: 1px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.07) transparent;
        }

        .nav-section-label {
          font-size: 10px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.18);
          padding: 10px 10px 5px;
          margin-top: 6px;
        }
        .nav-section-label:first-child { margin-top: 0; }

        .nav-link {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 11px;
          border-radius: 9px;
          border: 1px solid transparent;
          color: rgba(255,255,255,0.42);
          font-size: 13.5px; font-weight: 500;
          text-decoration: none;
          transition: all 0.18s;
        }
        .nav-link:hover {
          color: rgba(255,255,255,0.82);
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.05);
        }
        .nav-link.active {
          color: #fff;
          background: rgba(99,57,255,0.13);
          border-color: rgba(99,57,255,0.28);
        }
        .nav-icon { width: 16px; height: 16px; flex-shrink: 0; transition: color 0.18s; }
        .nav-link.active .nav-icon { color: #a78bfa; }
        .nav-link:hover .nav-icon { color: rgba(255,255,255,0.65); }
        .nav-chevron { margin-left: auto; color: #a78bfa; opacity: 0.6; width: 13px; height: 13px; }

        /* Sidebar footer */
        .sidebar-footer {
          padding: 12px 8px;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }

        .user-card {
          display: flex; align-items: center; gap: 9px;
          padding: 9px 11px;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.03);
          margin-bottom: 8px;
        }

        .user-avatar {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(99,57,255,0.2);
          border: 1px solid rgba(99,57,255,0.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: rgba(255,255,255,0.55);
        }

        .user-info { flex: 1; min-width: 0; }
        .user-name { font-size: 13px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-role { font-size: 11px; color: rgba(255,255,255,0.28); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .logout-btn {
          width: 100%; height: 38px;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.18);
          border-radius: 9px;
          color: #fca5a5; font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          transition: background 0.2s, border-color 0.2s;
        }
        .logout-btn:hover { background: rgba(239,68,68,0.14); border-color: rgba(239,68,68,0.32); }

        /* MAIN */
        .main-area {
          flex: 1; display: flex; flex-direction: column;
          min-width: 0; position: relative; z-index: 1;
        }

        .topbar {
          height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 20px 0 14px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(8,8,16,0.85);
          backdrop-filter: blur(16px);
          position: sticky; top: 0; z-index: 30; flex-shrink: 0;
        }

        .topbar-left { display: flex; align-items: center; gap: 10px; }

        .hamburger {
          background: none; border: none; color: rgba(255,255,255,0.35);
          cursor: pointer; padding: 7px; border-radius: 8px;
          display: flex; align-items: center;
          transition: color 0.2s, background 0.2s;
        }
        .hamburger:hover { color: #fff; background: rgba(255,255,255,0.06); }
        @media (min-width: 1024px) { .hamburger { display: none; } }

        .topbar-breadcrumb {
          font-size: 13px; color: rgba(255,255,255,0.28);
          display: flex; align-items: center; gap: 5px;
        }
        .topbar-breadcrumb .crumb-active {
          color: rgba(255,255,255,0.72); font-weight: 500;
        }
        .topbar-separator { color: rgba(255,255,255,0.15); }

        .topbar-right { display: flex; align-items: center; gap: 8px; }

        .status-pill {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 11px;
          border-radius: 100px;
          background: rgba(20,184,166,0.09);
          border: 1px solid rgba(20,184,166,0.2);
          font-size: 11.5px; font-weight: 500; color: #5eead4;
        }

        .status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #14b8a6;
          box-shadow: 0 0 6px rgba(20,184,166,0.7);
          animation: blink 2.2s ease-in-out infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

        .topbar-badge {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 11px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          font-size: 11.5px; color: rgba(255,255,255,0.35);
        }

        .main-content {
          flex: 1; padding: 28px 22px; overflow-x: hidden;
        }
        .main-inner { max-width: 1280px; margin: 0 auto; }

        .mobile-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
          z-index: 40;
        }
        @media (min-width: 1024px) { .mobile-overlay { display: none; } }
      `}</style>

      <div className="layout-root">
        <div className="layout-bg" />

        {sidebarOpen && (
          <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarOpen ? '' : 'sidebar-closed'}`}>
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <div className="sidebar-logo">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L17.32 6.5V15.5L10 20L2.68 15.5V6.5L10 2Z" fill="white" fillOpacity="0.9"/>
                </svg>
              </div>
              <span className="sidebar-brand-name">Shanky Admin</span>
            </div>
            <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} style={{ display: 'flex' }}>
              <X size={15} />
            </button>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section-label">Main</div>
            {navItems.slice(0, 1).map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <Icon className="nav-icon" />
                  {label}
                  {isActive && <ChevronRight className="nav-chevron" />}
                </Link>
              );
            })}

            <div className="nav-section-label">Data</div>
            {navItems.slice(1, 7).map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link key={href} href={href} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <Icon className="nav-icon" />
                  {label}
                  {isActive && <ChevronRight className="nav-chevron" />}
                </Link>
              );
            })}

            <div className="nav-section-label">Content</div>
            {navItems.slice(7, 8).map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link key={href} href={href} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <Icon className="nav-icon" />
                  {label}
                  {isActive && <ChevronRight className="nav-chevron" />}
                </Link>
              );
            })}

            <div className="nav-section-label">System</div>
            {navItems.slice(8).map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link key={href} href={href} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <Icon className="nav-icon" />
                  {label}
                  {isActive && <ChevronRight className="nav-chevron" />}
                </Link>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="user-avatar"><UserCircle2 size={16} /></div>
              <div className="user-info">
                <div className="user-name">Administrator</div>
                <div className="user-role">admin@shankygroup</div>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </aside>

        {/* MAIN AREA */}
        <div className="main-area">
          <header className="topbar">
            <div className="topbar-left">
              <button className="hamburger" onClick={() => setSidebarOpen(true)}>
                <Menu size={19} />
              </button>
              <div className="topbar-breadcrumb">
                Admin <span className="topbar-separator">/</span>
                <span className="crumb-active">{activeLabel}</span>
              </div>
            </div>
            <div className="topbar-right">
              <div className="status-pill">
                <div className="status-dot" />
                System Active
              </div>
              <div className="topbar-badge">
                <Globe size={11} />
                Admin Panel
              </div>
            </div>
          </header>

          <main className="main-content">
            <div className="main-inner">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}