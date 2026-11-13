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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .layout-root {
          min-height: 100vh;
          display: flex;
          background: #f5f5f7;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #1d1d1f;
          overflow: hidden;
          position: relative;
        }

        /* SIDEBAR */
        .sidebar {
          position: fixed; top: 0; left: 0; bottom: 0;
          width: 260px;
          background: #ffffff;
          border-right: 1px solid #e5e5e5;
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
          padding: 0 20px;
          border-bottom: 1px solid #f0f0f0;
          flex-shrink: 0;
        }

        .sidebar-brand { display: flex; align-items: center; gap: 10px; }

        .sidebar-logo {
          width: 34px; height: 34px; border-radius: 10px;
          background: linear-gradient(135deg, #6339ff, #8b5cf6);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(99,57,255,0.25);
        }

        .sidebar-brand-name {
          font-weight: 700; font-size: 16px; color: #1d1d1f; letter-spacing: -0.3px;
        }

        .sidebar-close-btn {
          background: none; border: none; color: #999;
          cursor: pointer; padding: 6px; border-radius: 8px;
          display: flex; align-items: center;
          transition: all 0.2s;
        }
        .sidebar-close-btn:hover { color: #333; background: #f5f5f5; }

        .sidebar-nav {
          flex: 1; overflow-y: auto;
          padding: 12px 10px;
          display: flex; flex-direction: column; gap: 2px;
        }

        .nav-section-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.8px; text-transform: uppercase;
          color: #999;
          padding: 12px 10px 6px;
          margin-top: 4px;
        }
        .nav-section-label:first-child { margin-top: 0; }

        .nav-link {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid transparent;
          color: #666;
          font-size: 14px; font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
        }
        .nav-link:hover {
          color: #1d1d1f;
          background: #f5f5f5;
        }
        .nav-link.active {
          color: #6339ff;
          background: rgba(99,57,255,0.06);
          border-color: rgba(99,57,255,0.12);
          font-weight: 600;
        }
        .nav-icon { width: 18px; height: 18px; flex-shrink: 0; transition: color 0.2s; }
        .nav-link.active .nav-icon { color: #6339ff; }
        .nav-link:hover .nav-icon { color: #333; }
        .nav-chevron { margin-left: auto; color: #6339ff; opacity: 0.5; width: 14px; height: 14px; }

        /* Sidebar footer */
        .sidebar-footer {
          padding: 14px 10px;
          border-top: 1px solid #f0f0f0;
          flex-shrink: 0;
        }

        .user-card {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #f0f0f0;
          background: #fafafa;
          margin-bottom: 10px;
        }

        .user-avatar {
          width: 34px; height: 34px; border-radius: 10px;
          background: linear-gradient(135deg, #6339ff, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #fff;
        }

        .user-info { flex: 1; min-width: 0; }
        .user-name { font-size: 13px; font-weight: 600; color: #1d1d1f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-role { font-size: 11px; color: #999; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .logout-btn {
          width: 100%; height: 40px;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 10px;
          color: #666; font-size: 13px; font-weight: 500;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          transition: all 0.2s;
        }
        .logout-btn:hover { background: #fef2f2; border-color: #fecaca; color: #dc2626; }

        /* MAIN */
        .main-area {
          flex: 1; display: flex; flex-direction: column;
          min-width: 0; position: relative; z-index: 1;
        }

        .topbar {
          height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 24px 0 16px;
          border-bottom: 1px solid #e5e5e5;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(20px);
          position: sticky; top: 0; z-index: 30; flex-shrink: 0;
        }

        .topbar-left { display: flex; align-items: center; gap: 10px; }

        .hamburger {
          background: none; border: none; color: #666;
          cursor: pointer; padding: 8px; border-radius: 8px;
          display: flex; align-items: center;
          transition: all 0.2s;
        }
        .hamburger:hover { color: #1d1d1f; background: #f0f0f0; }
        @media (min-width: 1024px) { .hamburger { display: none; } }

        .topbar-breadcrumb {
          font-size: 13px; color: #999;
          display: flex; align-items: center; gap: 6px;
        }
        .topbar-breadcrumb .crumb-active {
          color: #1d1d1f; font-weight: 600;
        }
        .topbar-separator { color: #ccc; }

        .topbar-right { display: flex; align-items: center; gap: 8px; }

        .status-pill {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px;
          border-radius: 100px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          font-size: 12px; font-weight: 500; color: #16a34a;
        }

        .status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px rgba(34,197,94,0.5);
          animation: blink 2.2s ease-in-out infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

        .topbar-badge {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          background: #f5f5f5;
          border: 1px solid #e5e5e5;
          font-size: 12px; color: #666;
        }

        .main-content {
          flex: 1; padding: 28px 24px; overflow-x: hidden;
        }
        .main-inner { max-width: 1280px; margin: 0 auto; }

        .mobile-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(4px);
          z-index: 40;
        }
        @media (min-width: 1024px) { .mobile-overlay { display: none; } }
      `}</style>

      <div className="layout-root">
        {sidebarOpen && (
          <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarOpen ? '' : 'sidebar-closed'}`}>
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <div className="sidebar-logo">
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L17.32 6.5V15.5L10 20L2.68 15.5V6.5L10 2Z" fill="white" fillOpacity="0.9"/>
                </svg>
              </div>
              <span className="sidebar-brand-name">Shanky Admin</span>
            </div>
            <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} style={{ display: 'flex' }}>
              <X size={16} />
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
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </aside>

        {/* MAIN AREA */}
        <div className="main-area">
          <header className="topbar">
            <div className="topbar-left">
              <button className="hamburger" onClick={() => setSidebarOpen(true)}>
                <Menu size={20} />
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
                <Globe size={12} />
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
