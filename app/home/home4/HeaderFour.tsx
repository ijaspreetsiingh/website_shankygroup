'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useI18n } from '../../i18n/I18nProvider';

interface HeaderFourProps {
  isScrolled: boolean;
}

const HeaderFour = ({ isScrolled }: HeaderFourProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMiniHeaderHidden, setIsMiniHeaderHidden] = useState(false);
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const [whoWeAreDropdown, setWhoWeAreDropdown] = useState(false);
  const [businessDropdown, setBusinessDropdown] = useState(false);
  const [whoWeAreMobileOpen, setWhoWeAreMobileOpen] = useState(false);
  const [businessMobileOpen, setBusinessMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activePath, setActivePath] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const lastScrollY = useRef(0);
  const baseDPR = useRef<number | null>(null);
  const [uiScale, setUiScale] = useState(1);
  const whoWeAreTimeout = useRef<NodeJS.Timeout | null>(null);
  const businessTimeout = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const { t, lang, setLang } = useI18n();

  // Initialize dark mode: respect explicit 'light' / 'dark'; only use system when no choice saved
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      const shouldBeDark = saved === 'dark' || (saved !== 'light' && saved !== 'dark');

      setIsDark(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Set active path on mount
      setActivePath(window.location.pathname);
    }
  }, []);

  // Track route changes for active highlighting
  useEffect(() => {
    const handleRouteChange = () => {
      const currentPath = window.location.pathname;
      console.log('Route changed to:', currentPath);
      setActivePath(currentPath);
    };

    // Listen for browser navigation
    window.addEventListener('popstate', handleRouteChange);
    
    // Next.js App Router does not expose router.events; route changes are tracked via
    // popstate, history overrides, link clicks, and the interval below.
    
    // Also listen for pushstate/replacestate as fallback
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function(...args) {
      console.log('PushState called');
      originalPushState.apply(window.history, args);
      setTimeout(handleRouteChange, 10);
    };
    
    window.history.replaceState = function(...args) {
      console.log('ReplaceState called');
      originalReplaceState.apply(window.history, args);
      setTimeout(handleRouteChange, 10);
    };
    
    // Listen for click events on links
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href) {
        console.log('Link clicked:', link.href);
        setTimeout(handleRouteChange, 50);
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    // Ultimate fallback: Check path every 100ms for changes
    let lastPath = window.location.pathname;
    const intervalCheck = setInterval(() => {
      const currentPath = window.location.pathname;
      if (currentPath !== lastPath) {
        console.log('Path changed detected by interval:', currentPath);
        lastPath = currentPath;
        handleRouteChange();
      }
    }, 100);
    
    // Initial check
    if (typeof window !== 'undefined') {
      handleRouteChange();
    }

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      document.removeEventListener('click', handleLinkClick);
      clearInterval(intervalCheck);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  // Zoom-based UI scaling while preserving positions
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (baseDPR.current === null) {
      baseDPR.current = window.devicePixelRatio || 1;
    }
    const updateScale = () => {
      const current = window.devicePixelRatio || 1;
      let scale = baseDPR.current! / current;
      scale = Math.max(0.8, Math.min(1, scale));
      setUiScale(scale);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // Clear any pending timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Debounce scroll events for smoother transitions
      scrollTimeout.current = setTimeout(() => {
        const currentScrollY = window.scrollY;
        const scrollDiff = currentScrollY - lastScrollY.current;
        
        // Thoda sa bhi scroll pe top header hide, main header top pe aaye
        const HIDE_THRESHOLD = 15; // 15px scroll pe hi mini header hide
        const SHOW_THRESHOLD = 8;  // Top pe (8px ke andar) ya scroll up pe mini header dikhe
        
        if (currentScrollY > HIDE_THRESHOLD && scrollDiff > 0) {
          setIsMiniHeaderHidden(true);
        } else if (currentScrollY <= SHOW_THRESHOLD || scrollDiff < -5) {
          setIsMiniHeaderHidden(false);
        }
        
        lastScrollY.current = currentScrollY;
      }, 10); // Small debounce delay
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    const paths = ['/who-we-are/about-us','/who-we-are/leadership','/who-we-are/mission-vision','/who-we-are/compliance'];
    paths.forEach(p => {
      try { router.prefetch(p); } catch {}
    });
  }, [router]);

  useEffect(() => {
    return () => {
      if (whoWeAreTimeout.current) clearTimeout(whoWeAreTimeout.current);
      if (businessTimeout.current) clearTimeout(businessTimeout.current);
    };
  }, []);

  // Handle keyboard events for search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);

  const toggleTheme = () => {
    setIsThemeChanging(true);
    
    const next = !isDark;
    setIsDark(next);
    
    // Add animation class to body
    document.body.style.overflow = 'hidden';
    
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    // Remove animation after completion
    setTimeout(() => {
      setIsThemeChanging(false);
      document.body.style.overflow = '';
    }, 800);
  };

  const companies = [
    {
      name: 'Shanky Financial Service Pvt Ltd',
      description: 'Specialized financial intermediation and trading',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=60&h=60&fit=crop&crop=center',
      link: '/company/shanky-financial-pvt-ltd'
    },
    {
      name: 'VMS Hub Pvt Ltd',
      description: 'Agricultural innovation and supply chain management',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=60&h=60&fit=crop&crop=center',
      link: '/company/vms-hub'
    },
    {
      name: 'Shanky Corporate Training Pvt Ltd',
      description: 'Professional development and corporate training programs',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=60&h=60&fit=crop&crop=center',
      link: '/company/shanky-corporate-training'
    },
    {
      name: 'Shanky Smart Tech Pvt Ltd',
      description: 'Renewable energy and sustainable technology solutions',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=60&h=60&fit=crop&crop=center',
      link: '/company/shanky-smart-tech'
    },
    {
      name: 'Shanky Buildtech Pvt Ltd',
      description: 'Infrastructure development, construction and EPC projects',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=60&h=60&fit=crop&crop=center',
      link: '/company/shanky-buildtech-pvt-ltd'
    },
    {
      name: 'Shanky Metals Pvt Ltd',
      description: 'Trading and distribution of ferrous and non-ferrous metals',
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=60&h=60&fit=crop&crop=center',
      link: '/company/shanky-metals-pvt-ltd'
    }
  ];

  const businessGroup1 = companies.slice(0, 3);
  const businessGroup2 = companies.slice(3, 6);

  return (
    <React.Fragment>
      {/* Theme Change Animation Overlay - full height, smooth animation */}
      {isThemeChanging && (
        <div 
          className="fixed inset-0 w-full min-h-[100vh] min-h-[100dvh] z-[9999] pointer-events-none flex items-center justify-center"
          style={{
            animation: 'themeOverlayFadeIn 0.25s ease-out forwards',
          }}
        >
          {/* Full cover background - ensures no black gaps */}
          <div 
            className={`absolute inset-0 w-full min-h-[100vh] min-h-[100dvh] transition-opacity duration-300 ${
              isDark ? 'bg-[#0f1115]' : 'bg-white'
            }`}
            style={{ opacity: 1 }}
          />
          
          {/* Circular Wipe - expands to cover entire viewport */}
          <div 
            className={`absolute rounded-full ${
              isDark ? 'bg-[#0f1115]' : 'bg-white'
            }`}
            style={{
              width: '200vmax',
              height: '200vmax',
              top: '-50vmax',
              right: '-50vmax',
              transformOrigin: 'top right',
              animation: 'themeCircleExpand 0.7s ease-out forwards',
            }}
          />
          
          {/* Icon in center - flexbox centering so perfect on phone */}
          <div 
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <div className="flex flex-col items-center justify-center gap-5">
              {/* Soft glow ring around icon */}
              <div 
                className={`relative flex items-center justify-center ${isDark ? 'text-[#0f1115]' : 'text-white'}`}
                style={{ animation: 'themeIconPop 0.6s ease-out 0.15s both' }}
              >
                <span 
                  className="absolute rounded-full"
                  style={{
                    width: 120,
                    height: 120,
                    background: isDark 
                      ? 'radial-gradient(circle, rgba(230,58,39,0.25) 0%, transparent 70%)' 
                      : 'radial-gradient(circle, rgba(230,58,39,0.15) 0%, transparent 70%)',
                    animation: 'themeGlow 1.5s ease-in-out infinite',
                  }}
                />
                <span 
                  className="absolute rounded-full border-2 border-[#e63a27]/30"
                  style={{ width: 100, height: 100, animation: 'themeRing 0.8s ease-out forwards' }}
                />
                {isDark ? (
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#e63a27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg shrink-0 relative z-10">
                    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"></path>
                  </svg>
                ) : (
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#e63a27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg shrink-0 relative z-10">
                    <circle cx="12" cy="12" r="5"></circle>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                  </svg>
                )}
              </div>
              {/* Friendly tagline */}
              <p 
                className={`text-sm font-medium tracking-widest uppercase opacity-0 ${isDark ? 'text-white/80' : 'text-black/70'}`}
                style={{ animation: 'themeTaglineFade 0.5s ease-out 0.4s forwards' }}
              >
                {isDark ? 'Hello, night' : 'Hello, sunshine'}
              </p>
            </div>
          </div>
          
          {/* Subtle floating dots - depth */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`absolute rounded-full ${isDark ? 'bg-[#e63a27]/10' : 'bg-[#e63a27]/5'}`}
                style={{
                  width: 4 + i * 2,
                  height: 4 + i * 2,
                  left: `${15 + i * 18}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animation: `themeFloat 2.5s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mini Header - Top Bar - Visible on desktop only */}
      <div 
        className={`hidden md:block fixed top-0 left-0 right-0 z-[1001] min-h-[34px] md:h-[38px] bg-[var(--background)] border-b border-[var(--card-border)] transition-transform duration-300 ease-in-out ${
          isMiniHeaderHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled ? 'shadow-sm dark:shadow-[0_2px_10px_0_rgba(255,255,255,0.06)]' : ''
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-12 py-1.5 md:py-0 md:h-full flex flex-nowrap items-center justify-between gap-2 md:gap-0 min-h-[34px] md:min-h-0">
          {/* Left: Location only on mobile; Location + Timing on desktop */}
          <div className="flex items-center gap-2 md:gap-6 min-w-0 flex-shrink">
            <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
              <svg className="w-3 h-3 md:w-[13px] md:h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="text-[var(--text-secondary)] text-[10px] md:text-xs font-normal truncate">
                Unit no. 03 and 04, Ground floor, D-Mall, NSP
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <svg className="w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span className="text-[var(--text-secondary)] text-xs font-normal whitespace-nowrap">
                Mon-Sat: 10AM-6PM
              </span>
            </div>
          </div>

          {/* Right: Phone only on mobile; Phone + Social + Language on desktop */}
          <div className="flex items-center gap-2 md:gap-5 flex-shrink-0">
            <a href="tel:+01147586938" className="flex items-center gap-1.5 md:gap-2 md:pr-5 md:border-r md:border-[var(--card-border)]">
              <svg className="w-3 h-3 md:w-[13px] md:h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className="text-[var(--text-secondary)] text-[10px] md:text-[13px] font-semibold whitespace-nowrap">
                +011-47586938
              </span>
            </a>

            {/* Social Icons - desktop only */}
            <div className="hidden md:flex items-center gap-3">
              <a href="#" className="text-[var(--text-secondary)] flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 opacity-80 hover:opacity-100 hover:text-[#0077b5] hover:scale-110" aria-label="Facebook">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-[var(--text-secondary)] flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 opacity-80 hover:opacity-100 hover:text-[#1DA1F2] hover:scale-110" aria-label="X">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-[var(--text-secondary)] flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 opacity-80 hover:opacity-100 hover:text-[#0A66C2] hover:scale-110" aria-label="LinkedIn">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-[var(--text-secondary)] flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 opacity-80 hover:opacity-100 hover:text-[#C13584] hover:scale-110" aria-label="Instagram">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.848-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
            </div>

            <div className="relative shrink-0 hidden md:block">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-primary)] text-xs font-semibold transition-all duration-300 hover:bg-[var(--card-border)]"
              >
                <svg className="w-[14px] h-[14px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"></path>
                </svg>
                <span>{t('change_language')}</span>
                <span className="uppercase">{lang}</span>
                <svg className={`w-[10px] h-[10px] shrink-0 transition-transform ${langOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div
                className={`absolute right-0 mt-2 w-36 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg shadow-xl overflow-hidden transition-all duration-200 ${
                  langOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                <button
                  onClick={() => {
                    setLang('en');
                    setLangOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[var(--text-primary)] text-sm hover:bg-[var(--card-border)]"
                >
                  {t('english')}
                </button>
                <button
                  onClick={() => {
                    setLang('hi');
                    setLangOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[var(--text-primary)] text-sm hover:bg-[var(--card-border)]"
                >
                  {t('hindi')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Fixed positioning with smooth transition */}
      <div 
        className={`fixed left-0 right-0 z-[1000] transition-all duration-300 ease-in-out top-0 ${
          !isMiniHeaderHidden ? 'md:top-[38px]' : ''
        } ${
          isScrolled 
            ? 'bg-[var(--background)] shadow-xl dark:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.3),0_4px_15px_-8px_rgba(0,0,0,0.2)] backdrop-blur-lg'
            : 'bg-[var(--background)] backdrop-blur-md'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-2 sm:pt-0">
          <div className="flex items-center justify-between h-[76px] sm:h-[88px] lg:h-[104px]">
            {/* Logo - Left Side - larger size */}
            <div className="flex items-center flex-shrink-0 min-w-0" style={{ transform: `scale(${uiScale})`, transformOrigin: 'top left' }}>
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="p-0.5 sm:p-0 rounded-xl sm:rounded-none bg-[var(--card-bg)]/50 sm:bg-transparent border border-[var(--card-border)] sm:border-transparent shrink-0 transition-all group-hover:border-[#e63a27]/40 flex items-center justify-center h-[68px] sm:h-auto">
                  <img 
                    src="/images/new_logo_finalM.png" 
                    alt="Shanky Group Logo"
                    className="h-[64px] sm:h-[68px] md:h-[80px] lg:h-[96px] w-auto object-contain object-center transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="hidden sm:block lg:hidden text-[var(--text-primary)] font-bold text-xs sm:text-sm tracking-[0.12em] uppercase truncate">Shanky Group</span>
              </Link>
            </div>

            {/* Center to Right - Navigation & Controls */}
            <div className="flex items-center gap-6 xl:gap-8 ml-auto" style={{ transform: `scale(${uiScale})`, transformOrigin: 'top right' }}>
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                {/* WHO WE ARE Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => {
                    if (whoWeAreTimeout.current) {
                      clearTimeout(whoWeAreTimeout.current);
                      whoWeAreTimeout.current = null;
                    }
                    setWhoWeAreDropdown(true);
                  }}
                  onMouseLeave={() => {
                    whoWeAreTimeout.current = setTimeout(() => {
                      setWhoWeAreDropdown(false);
                    }, 300);
                  }}
                >
                  <button className="text-[var(--text-primary)] text-[13px] font-semibold tracking-[1.3px] uppercase transition-all duration-300 flex items-center gap-2 hover:text-[#e63a27] bg-transparent border-none cursor-pointer">
                    {t('who_we_are')}
                    <svg 
                      className={`transition-transform duration-300 ${whoWeAreDropdown ? 'rotate-180' : ''} w-[9px] h-[9px]`}
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-[var(--card-bg)] shadow-xl rounded-xl overflow-hidden min-w-[220px] transition-all duration-300 z-[1002] border border-[var(--card-border)] ${
                    whoWeAreDropdown 
                      ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                      : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
                  onMouseEnter={() => {
                    if (whoWeAreTimeout.current) {
                      clearTimeout(whoWeAreTimeout.current);
                      whoWeAreTimeout.current = null;
                    }
                  }}
                  onMouseLeave={() => {
                    whoWeAreTimeout.current = setTimeout(() => {
                      setWhoWeAreDropdown(false);
                    }, 300);
                  }}
                  >
                    <Link 
                      href="/who-we-are/about-us" 
                      className={`block px-5 py-3.5 text-[13px] border-b border-[var(--card-border)] transition-all duration-300 hover:pl-7 ${
                        activePath === '/who-we-are/about-us'
                          ? 'text-[#e63a27] font-black bg-[#e63a27]/5' 
                          : 'text-[var(--text-primary)] font-medium hover:bg-[var(--card-border)] hover:text-[#e63a27]'
                      }`}
                    >
                      About Us
                    </Link>
                    <Link 
                      href="/who-we-are/leadership" 
                      className={`block px-5 py-3.5 text-[13px] border-b border-[var(--card-border)] transition-all duration-300 hover:pl-7 ${
                        activePath === '/who-we-are/leadership'
                          ? 'text-[#e63a27] font-black bg-[#e63a27]/5' 
                          : 'text-[var(--text-primary)] font-medium hover:bg-[var(--card-border)] hover:text-[#e63a27]'
                      }`}
                    >
                      Leadership
                    </Link>
                    <Link 
                      href="/who-we-are/mission-vision" 
                      className={`block px-5 py-3.5 text-[13px] border-b border-[var(--card-border)] transition-all duration-300 hover:pl-7 ${
                        activePath === '/who-we-are/mission-vision'
                          ? 'text-[#e63a27] font-black bg-[#e63a27]/5' 
                          : 'text-[var(--text-primary)] font-medium hover:bg-[var(--card-border)] hover:text-[#e63a27]'
                      }`}
                    >
                      Mission & Vision
                    </Link>
                    <Link 
                      href="/who-we-are/compliance" 
                      className={`block px-5 py-3.5 text-[13px] transition-all duration-300 hover:pl-7 ${
                        activePath === '/who-we-are/compliance'
                          ? 'text-[#e63a27] font-black bg-[#e63a27]/5' 
                          : 'text-[var(--text-primary)] font-medium hover:bg-[var(--card-border)] hover:text-[#e63a27]'
                      }`}
                    >
                      Compliance
                    </Link>
                  </div>
                </div>

                {/* BUSINESS Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => {
                    if (businessTimeout.current) {
                      clearTimeout(businessTimeout.current);
                      businessTimeout.current = null;
                    }
                    setBusinessDropdown(true);
                  }}
                  onMouseLeave={() => {
                    businessTimeout.current = setTimeout(() => {
                      setBusinessDropdown(false);
                    }, 300);
                  }}
                >
                  <button className="text-[var(--text-primary)] text-[13px] font-semibold tracking-[1.3px] uppercase transition-all duration-300 flex items-center gap-2 hover:text-[#e63a27] bg-transparent border-none cursor-pointer">
                    {t('businesses')}
                    <svg 
                      className={`transition-transform duration-300 ${businessDropdown ? 'rotate-180' : ''} w-[9px] h-[9px]`}
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  
                  {/* Business Dropdown Menu - Professional mega menu */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[920px] w-[960px] max-w-[95vw] transition-all duration-300 z-[1002] ${
                    businessDropdown 
                      ? 'opacity-100 visible translate-y-0 scale-100 pointer-events-auto' 
                      : 'opacity-0 invisible -translate-y-2 scale-95 pointer-events-none'
                  }`}
                  onMouseEnter={() => {
                    if (businessTimeout.current) {
                      clearTimeout(businessTimeout.current);
                      businessTimeout.current = null;
                    }
                  }}
                  onMouseLeave={() => {
                    businessTimeout.current = setTimeout(() => {
                      setBusinessDropdown(false);
                    }, 300);
                  }}
                  >
                    <div className="bg-[var(--card-bg)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden border border-[var(--card-border)]">
                      {/* Dropdown header - professional */}
                      <div className="px-6 py-5 border-b border-[var(--card-border)] bg-gradient-to-b from-[var(--background)] to-[var(--card-bg)] flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#e63a27]">Portfolio</span>
                          <h3 className="text-[var(--text-primary)] font-bold text-lg tracking-tight mt-0.5">Our Companies</h3>
                          <p className="text-[var(--text-secondary)] text-sm mt-1 opacity-90">Explore our portfolio across sectors</p>
                        </div>
                        <Link
                          href="/company"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#e63a27]/10 text-[#e63a27] text-sm font-semibold hover:bg-[#e63a27] hover:text-white transition-all duration-300"
                          onClick={() => setBusinessDropdown(false)}
                        >
                          View all
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        </Link>
                      </div>
                      <div className="grid grid-cols-3 gap-[1px] bg-[var(--card-border)] p-[1px]">
                        {companies.map((company, index) => (
                          <Link
                            key={index}
                            href={company.link}
                            className={`flex flex-col bg-[var(--card-bg)] p-5 transition-all duration-300 group/item relative overflow-hidden ${
                              activePath === company.link ? 'ring-2 ring-[#e63a27]/40 ring-inset' : ''
                            } hover:bg-[var(--background)]/80 hover:shadow-md`}
                            onClick={() => setBusinessDropdown(false)}
                          >
                            <div className="w-14 h-14 rounded-xl overflow-hidden mb-4 shrink-0 border border-[var(--card-border)] bg-[var(--background)]/50 shadow-sm group-hover/item:shadow-md group-hover/item:border-[#e63a27]/40 transition-all duration-300 ring-1 ring-black/5">
                              <img 
                                src={company.image} 
                                alt={company.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                              />
                            </div>
                            <h3 className={`text-[14px] font-bold leading-snug mb-1.5 line-clamp-2 transition-colors duration-300 tracking-tight ${
                              activePath === company.link ? 'text-[#e63a27]' : 'text-[var(--text-primary)] group-hover/item:text-[#e63a27]'
                            }`}>
                              {company.name}
                            </h3>
                            <p className="text-[var(--text-secondary)] text-[12px] leading-snug line-clamp-2 min-w-0 opacity-90">
                              {company.description}
                            </p>
                            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#e63a27] opacity-70 group-hover/item:opacity-100 transition-all duration-300">
                              Learn more
                              <svg className="w-3.5 h-3.5 group-hover/item:translate-x-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Link 
                  href="/careers" 
                  className={`text-[13px] tracking-[1.3px] uppercase transition-all duration-300 no-underline hover:scale-105 relative group ${
                    activePath === '/careers' 
                      ? 'text-[#e63a27] font-black' 
                      : 'text-[var(--text-primary)] font-semibold hover:text-[#e63a27]'
                  }`}
                >
                  {t('careers')}
                  <span className={`absolute bottom-[-2px] left-0 h-[2px] bg-[#e63a27] transition-all duration-300 ease-out ${
                    activePath === '/careers' 
                      ? 'w-full' 
                      : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
                <Link 
                  href="/contact" 
                  className={`text-[13px] tracking-[1.3px] uppercase transition-all duration-300 no-underline hover:scale-105 relative group ${
                    activePath === '/contact' 
                      ? 'text-[#e63a27] font-black' 
                      : 'text-[var(--text-primary)] font-semibold hover:text-[#e63a27]'
                  }`}
                >
                  {t('contact_us')}
                  <span className={`absolute bottom-[-2px] left-0 h-[2px] bg-[#e63a27] transition-all duration-300 ease-out ${
                    activePath === '/contact' 
                      ? 'w-full' 
                      : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
                                <Link 
                  href="/blog" 
                  className={`text-[13px] tracking-[1.3px] uppercase transition-all duration-300 no-underline hover:scale-105 relative group ${
                    activePath === '/blog' 
                      ? 'text-[#e63a27] font-black' 
                      : 'text-[var(--text-primary)] font-semibold hover:text-[#e63a27]'
                  }`}
                >
                  {t('blog')}
                  <span className={`absolute bottom-[-2px] left-0 h-[2px] bg-[#e63a27] transition-all duration-300 ease-out ${
                    activePath === '/blog' 
                      ? 'w-full' 
                      : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </nav>

              {/* Right Side Controls - Search on all screens, Theme + Menu by breakpoint */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
                {/* Search Button - Mobile + Desktop (same as laptop) */}
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="flex shrink-0 items-center justify-center w-10 h-10 sm:w-10 sm:h-10 rounded-xl bg-[var(--card-bg)]/80 lg:bg-transparent border border-[var(--card-border)] lg:border-transparent cursor-pointer text-[var(--text-secondary)] transition-all duration-300 hover:text-[#e63a27] hover:bg-[var(--card-border)] hover:border-[#e63a27]/30 active:scale-95"
                  aria-label="Search"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>

                {/* Theme Toggle - Mobile/tablet only (next to search); click = light/dark switch */}
                <button 
                  onClick={toggleTheme}
                  className="flex shrink-0 items-center justify-center w-10 h-10 rounded-xl bg-[var(--card-bg)]/80 border border-[var(--card-border)] cursor-pointer text-[var(--text-secondary)] transition-all duration-300 hover:text-[#e63a27] hover:bg-[var(--card-border)] hover:border-[#e63a27]/30 active:scale-95 lg:!hidden"
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5"></circle>
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"></path>
                    </svg>
                  )}
                </button>

                {/* Theme Toggle - Desktop only */}
                <button 
                  onClick={toggleTheme}
                  className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer text-[var(--text-secondary)] transition-all duration-300 hover:text-[#e63a27] hover:bg-[var(--card-border)] hover:scale-110 relative overflow-hidden group"
                  aria-label="Toggle theme"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#e63a27]/10 to-transparent scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg"></span>
                  <span className="relative z-10 transition-transform duration-500 group-hover:rotate-180">
                    {isDark ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-fade-in">
                        <circle cx="12" cy="12" r="5"></circle>
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-fade-in">
                        <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"></path>
                      </svg>
                    )}
                  </span>
                </button>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                    if (isMobileMenuOpen) {
                      setWhoWeAreMobileOpen(false);
                      setBusinessMobileOpen(false);
                    }
                  }}
                  className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-primary)] transition-all duration-300 hover:bg-[#e63a27]/10 hover:border-[#e63a27]/40 hover:scale-105 active:scale-95"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-rotate-in">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full width, full height, professional design */}
      <div 
        className={`lg:hidden fixed inset-0 w-full h-screen min-h-[100dvh] shadow-2xl transform transition-all duration-300 ease-in-out z-[1001] flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
        style={{ background: 'linear-gradient(180deg, var(--card-bg) 0%, var(--background) 100%)' }}
      >
        <div className="flex flex-col h-full min-h-0">
          {/* Mobile Menu Header - Brand strip */}
          <div className="sticky top-0 z-10 shrink-0 bg-[var(--card-bg)]/95 backdrop-blur-md border-b border-[var(--card-border)]">
            <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group" onClick={() => { setIsMobileMenuOpen(false); setWhoWeAreMobileOpen(false); setBusinessMobileOpen(false); }}>
                <div className="p-1.5 rounded-xl bg-[var(--background)] border border-[var(--card-border)] group-hover:border-[#e63a27]/40 transition-colors">
                  <img src="/images/new_logo_finalM.png" alt="Shanky Group" className="h-12 w-auto object-contain" />
                </div>
                <div>
                  <span className="block text-[var(--text-primary)] font-bold text-sm tracking-[0.15em] uppercase">Shanky</span>
                  <span className="block text-[var(--text-secondary)] text-[11px] font-medium tracking-widest uppercase">Group</span>
                </div>
              </Link>
              <button
                onClick={() => { setIsMobileMenuOpen(false); setWhoWeAreMobileOpen(false); setBusinessMobileOpen(false); }}
                className="p-2.5 rounded-xl border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[#e63a27] hover:border-[#e63a27]/40 hover:bg-[#e63a27]/5 transition-all duration-200"
                aria-label="Close menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Content - scrollable, scrollbar hidden */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide px-4 sm:px-6 py-6 space-y-4">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-secondary)] px-1 pb-2">Navigation</p>

            {/* WHO WE ARE - Card-style dropdown */}
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 overflow-hidden shadow-sm">
              <button
                onClick={() => setWhoWeAreMobileOpen(!whoWeAreMobileOpen)}
                className="w-full flex items-center gap-4 py-4 px-4 text-left active:bg-[var(--card-border)]/30 transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#e63a27]/10 text-[#e63a27] shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <span className="flex-1 text-[var(--text-primary)] font-semibold text-[15px] tracking-wide">{t('who_we_are')}</span>
                <svg className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-200 ${whoWeAreMobileOpen ? 'rotate-180 text-[#e63a27]' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div className={`grid transition-all duration-200 ease-out overflow-hidden ${whoWeAreMobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="min-h-0">
                  <div className="px-4 pb-4 pt-0 space-y-0.5 bg-[var(--background)]/50 border-t border-[var(--card-border)]">
                    <Link href="/who-we-are/about-us" className={`flex items-center gap-3 py-3 px-4 rounded-xl text-[14px] font-medium transition-all border-l-2 ${
                      activePath === '/who-we-are/about-us' ? 'text-[#e63a27] bg-[#e63a27]/10 border-[#e63a27]' : 'text-[var(--text-secondary)] border-transparent hover:bg-[var(--card-border)]/50 hover:text-[var(--text-primary)]'
                    }`} onClick={() => { setIsMobileMenuOpen(false); setWhoWeAreMobileOpen(false); }}>About Us</Link>
                    <Link href="/who-we-are/leadership" className={`flex items-center gap-3 py-3 px-4 rounded-xl text-[14px] font-medium transition-all border-l-2 ${
                      activePath === '/who-we-are/leadership' ? 'text-[#e63a27] bg-[#e63a27]/10 border-[#e63a27]' : 'text-[var(--text-secondary)] border-transparent hover:bg-[var(--card-border)]/50 hover:text-[var(--text-primary)]'
                    }`} onClick={() => { setIsMobileMenuOpen(false); setWhoWeAreMobileOpen(false); }}>Leadership</Link>
                    <Link href="/who-we-are/mission-vision" className={`flex items-center gap-3 py-3 px-4 rounded-xl text-[14px] font-medium transition-all border-l-2 ${
                      activePath === '/who-we-are/mission-vision' ? 'text-[#e63a27] bg-[#e63a27]/10 border-[#e63a27]' : 'text-[var(--text-secondary)] border-transparent hover:bg-[var(--card-border)]/50 hover:text-[var(--text-primary)]'
                    }`} onClick={() => { setIsMobileMenuOpen(false); setWhoWeAreMobileOpen(false); }}>Mission & Vision</Link>
                    <Link href="/who-we-are/compliance" className={`flex items-center gap-3 py-3 px-4 rounded-xl text-[14px] font-medium transition-all border-l-2 ${
                      activePath === '/who-we-are/compliance' ? 'text-[#e63a27] bg-[#e63a27]/10 border-[#e63a27]' : 'text-[var(--text-secondary)] border-transparent hover:bg-[var(--card-border)]/50 hover:text-[var(--text-primary)]'
                    }`} onClick={() => { setIsMobileMenuOpen(false); setWhoWeAreMobileOpen(false); }}>Compliance</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* BUSINESSES - Card-style dropdown */}
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 overflow-hidden shadow-sm min-w-0">
              <button
                onClick={() => setBusinessMobileOpen(!businessMobileOpen)}
                className="w-full flex items-center gap-4 py-4 px-4 text-left active:bg-[var(--card-border)]/30 transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#e63a27]/10 text-[#e63a27] shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <span className="flex-1 text-[var(--text-primary)] font-semibold text-[15px] tracking-wide">{t('businesses')}</span>
                <svg className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-200 ${businessMobileOpen ? 'rotate-180 text-[#e63a27]' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div className={`grid transition-all duration-200 ease-out overflow-hidden ${businessMobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="min-h-0 min-w-0 overflow-hidden">
                  <div className="px-3 sm:px-4 pb-4 pt-2 space-y-2 bg-[var(--background)]/50 border-t border-[var(--card-border)] min-w-0">
                    {companies.map((company, index) => (
                      <Link key={index} href={company.link} className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl border transition-all min-w-0 ${
                        activePath === company.link ? 'bg-[#e63a27]/10 border-[#e63a27]/30' : 'border-[var(--card-border)] hover:border-[#e63a27]/20 hover:bg-[var(--card-border)]/40'
                      }`} onClick={() => { setIsMobileMenuOpen(false); setBusinessMobileOpen(false); }}>
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden shrink-0 border border-[var(--card-border)] bg-[var(--card-bg)]">
                          <img src={company.image} alt={company.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <span className={`block text-[13px] sm:text-[14px] font-semibold truncate ${activePath === company.link ? 'text-[#e63a27]' : 'text-[var(--text-primary)]'}`}>{company.name}</span>
                          <span className="block text-[11px] sm:text-[12px] text-[var(--text-secondary)] truncate">{company.description}</span>
                        </div>
                        <svg className="w-4 h-4 text-[var(--text-secondary)] shrink-0 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                      </Link>
                    ))}
                    <Link href="/company" className="flex items-center justify-center gap-2 w-full min-w-0 py-3 px-3 sm:px-4 rounded-xl bg-[#e63a27]/10 text-[#e63a27] text-[13px] sm:text-[14px] font-semibold hover:bg-[#e63a27]/20 transition-colors overflow-hidden border border-[#e63a27]/30 box-border" onClick={() => { setIsMobileMenuOpen(false); setBusinessMobileOpen(false); }}>
                      View all companies <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick links - Card style with icons */}
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 overflow-hidden shadow-sm divide-y divide-[var(--card-border)]">
              <Link href="/careers" className={`flex items-center gap-4 py-4 px-4 transition-colors ${activePath === '/careers' ? 'bg-[#e63a27]/10 text-[#e63a27]' : 'text-[var(--text-primary)] hover:bg-[var(--card-border)]/30'}`} onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--card-border)]/60 text-[var(--text-primary)] shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14h6M9 18h6"/></svg></div>
                <span className="flex-1 font-semibold text-[15px] tracking-wide">{t('careers')}</span>
                <svg className="w-4 h-4 text-[var(--text-secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
              <Link href="/contact" className={`flex items-center gap-4 py-4 px-4 transition-colors ${activePath === '/contact' ? 'bg-[#e63a27]/10 text-[#e63a27]' : 'text-[var(--text-primary)] hover:bg-[var(--card-border)]/30'}`} onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--card-border)]/60 text-[var(--text-primary)] shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                <span className="flex-1 font-semibold text-[15px] tracking-wide">{t('contact_us')}</span>
                <svg className="w-4 h-4 text-[var(--text-secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
              <Link href="/blog" className={`flex items-center gap-4 py-4 px-4 transition-colors ${activePath === '/blog' ? 'bg-[#e63a27]/10 text-[#e63a27]' : 'text-[var(--text-primary)] hover:bg-[var(--card-border)]/30'}`} onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--card-border)]/60 text-[var(--text-primary)] shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
                <span className="flex-1 font-semibold text-[15px] tracking-wide">{t('blog')}</span>
                <svg className="w-4 h-4 text-[var(--text-secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
            </div>

            {/* Contact & Info - right under menu options (Blog ke niche) */}
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 overflow-hidden shadow-sm p-4 space-y-3">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-secondary)]">Contact & Info</p>
              <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Unit no. 03 and 04, Ground floor, D-Mall, NSP</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                <span>Mon-Sat: 10AM-6PM</span>
              </div>
              <a href="tel:+01147586938" className="flex items-center gap-2 text-[var(--text-primary)] text-sm font-semibold">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +011-47586938
              </a>
              <div className="flex items-center gap-3 pt-1">
                <a href="#" className="text-[var(--text-secondary)] hover:text-[#1877F2] transition-colors" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[#1DA1F2] transition-colors" aria-label="X">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[#C13584] transition-colors" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.848-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>
                </a>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-[var(--card-border)]">
                <span className="text-[var(--text-secondary)] text-sm">Language:</span>
                <button onClick={() => { setLang('en'); setLangOpen(false); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${lang === 'en' ? 'bg-[#e63a27] text-white' : 'bg-[var(--card-border)] text-[var(--text-primary)]'}`}>EN</button>
                <button onClick={() => { setLang('hi'); setLangOpen(false); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${lang === 'hi' ? 'bg-[#e63a27] text-white' : 'bg-[var(--card-border)] text-[var(--text-primary)]'}`}>HI</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] transition-opacity duration-300"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setWhoWeAreMobileOpen(false);
            setBusinessMobileOpen(false);
          }}
        />
      )}

      {/* Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[20vh] animate-fade-in">
          <div className="w-full max-w-2xl mx-4 bg-[var(--card-bg)] rounded-2xl shadow-2xl border border-[var(--card-border)] overflow-hidden animate-slide-down">
            {/* Search Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--card-border)]">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Search</h2>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-2 rounded-lg bg-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-border)] transition-all duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Search Input */}
            <div className="p-6">
              <div className="relative">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for pages, content, or..."
                  className="w-full pl-12 pr-4 py-4 bg-[var(--card-border)] border border-[var(--card-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[#e63a27] focus:ring-2 focus:ring-[#e63a27]/20 transition-all duration-300"
                  autoFocus
                />
              </div>
              
              {/* Search Results Preview */}
              {searchQuery && (
                <div className="mt-6 space-y-2">
                  <p className="text-sm text-[var(--text-secondary)] mb-3">Quick suggestions:</p>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 rounded-lg bg-[var(--card-border)] hover:bg-[var(--card-border)] transition-all duration-300 text-[var(--text-primary)]">
                      <div className="font-medium">About Us</div>
                      <div className="text-sm text-[var(--text-secondary)]">Learn more about Shanky Group</div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg bg-[var(--card-border)] hover:bg-[var(--card-border)] transition-all duration-300 text-[var(--text-primary)]">
                      <div className="font-medium">Careers</div>
                      <div className="text-sm text-[var(--text-secondary)]">Join our team</div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg bg-[var(--card-border)] hover:bg-[var(--card-border)] transition-all duration-300 text-[var(--text-primary)]">
                      <div className="font-medium">Contact Us</div>
                      <div className="text-sm text-[var(--text-secondary)]">Get in touch with us</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Search Footer */}
            <div className="p-6 border-t border-[var(--card-border)] bg-[var(--card-border)]">
              <p className="text-sm text-[var(--text-secondary)] text-center">
                Press <kbd className="px-2 py-1 bg-[var(--card-bg)] rounded text-xs font-mono">ESC</kbd> to close • Press <kbd className="px-2 py-1 bg-[var(--card-bg)] rounded text-xs font-mono">Enter</kbd> to search
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header - matches header height per breakpoint */}
      <div className="h-[76px] sm:h-[88px] md:h-[142px] lg:h-[142px] mb-3 sm:mb-4" />

      {/* Add Custom CSS for Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin-slow {
            from {
              transform: rotate(0deg) scale(1);
            }
            50% {
              transform: rotate(180deg) scale(1.2);
            }
            to {
              transform: rotate(360deg) scale(1);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes slide-down {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes rotate-in {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(90deg);
            }
          }

          .animate-spin-slow {
            animation: spin-slow 0.8s ease-in-out;
          }

          .animate-fade-in {
            animation: fade-in 0.3s ease-in-out;
          }

          .animate-slide-down {
            animation: slide-down 0.3s ease-out;
          }

          .animate-rotate-in {
            animation: rotate-in 0.2s ease-out;
          }
        `
      }} />
    </React.Fragment>
  );
};

export default HeaderFour;