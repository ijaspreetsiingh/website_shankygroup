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

  // Initialize dark mode immediately
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = saved === 'dark' || (!saved && systemPrefersDark);
      
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
    
    // Listen for Next.js router events
    const handleRouteChangeComplete = () => {
      console.log('Next.js route change complete');
      handleRouteChange();
    };

    // Subscribe to Next.js router events if available
    if (router.events) {
      router.events.on('routeChangeComplete', handleRouteChangeComplete);
      router.events.on('hashChangeComplete', handleRouteChangeComplete);
    }
    
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
      if (router.events) {
        router.events.off('routeChangeComplete', handleRouteChangeComplete);
        router.events.off('hashChangeComplete', handleRouteChangeComplete);
      }
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [router]);

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
        
        // Define thresholds to prevent jitter
        const HIDE_THRESHOLD = 80; // Hide mini-header after scrolling down 80px
        const SHOW_THRESHOLD = 50; // Show mini-header when scroll up or near top
        
        // Logic: Hide on scroll down past threshold, show on scroll up or near top
        if (currentScrollY > HIDE_THRESHOLD && scrollDiff > 0) {
          // Scrolling down and past threshold
          setIsMiniHeaderHidden(true);
        } else if (currentScrollY <= SHOW_THRESHOLD || scrollDiff < -5) {
          // Near top or scrolling up significantly
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
      name: 'Shanky Financial Services',
      description: 'Comprehensive financial solutions and investment services',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=60&h=60&fit=crop&crop=center',
      link: '/company/shanky-financial-services'
    },
    {
      name: 'Shanky Financial Service Pvt Ltd',
      description: 'Specialized financial intermediation and trading',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=60&h=60&fit=crop&crop=center',
      link: '/company/shanky-financial-pvt-ltd'
    },
    {
      name: 'VMS Hub',
      description: 'Agricultural innovation and supply chain management',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=60&h=60&fit=crop&crop=center',
      link: '/company/vms-hub'
    },
    {
      name: 'Shanky Corporate Training',
      description: 'Professional development and corporate training programs',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=60&h=60&fit=crop&crop=center',
      link: '/company/shanky-corporate-training'
    },
    {
      name: 'Shanky Smart Tech',
      description: 'Renewable energy and sustainable technology solutions',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=60&h=60&fit=crop&crop=center',
      link: '/company/shanky-smart-tech'
    },
    {
      name: 'Shanky Electronics Hub',
      description: 'Electronics trading and distribution services',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=60&h=60&fit=crop&crop=center',
      link: '/company/shanky-electronics-hub'
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

  const businessGroup1 = companies.slice(0, 4);
  const businessGroup2 = companies.slice(4, 8);

  return (
    <React.Fragment>
      {/* Theme Change Animation Overlay */}
      {isThemeChanging && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          {/* Circular Wipe Animation */}
          <div 
            className={`absolute inset-0 rounded-full transition-all duration-800 ease-in-out ${
              isDark ? 'bg-[#0a0a0a]' : 'bg-white'
            }`}
            style={{
              transform: isThemeChanging ? 'scale(3)' : 'scale(0)',
              transformOrigin: 'top right',
            }}
          />
          
          {/* Icon Animation in Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-spin-slow">
              {isDark ? (
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#e63a27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"></path>
                </svg>
              ) : (
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#e63a27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                </svg>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mini Header - Top Bar - Hidden on mobile */}
      <div 
        className={`hidden md:block fixed top-0 left-0 right-0 z-[1001] h-[40px] bg-[var(--background)] border-b border-[var(--card-border)] transition-transform duration-300 ease-in-out ${
          isMiniHeaderHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled ? 'shadow-sm dark:shadow-[0_2px_10px_0_rgba(255,255,255,0.06)]' : ''
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
          {/* Left Side - Company Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="text-[var(--text-secondary)] text-xs font-normal">
              D Mall, NSP, Pitampura Delhi, India
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span className="text-[var(--text-secondary)] text-xs font-normal">
                Mon-Sat: 10AM-8PM
              </span>
            </div>
          </div>

          {/* Right Side - Contact & Social */}
          <div className="flex items-center gap-5">
            {/* Contact Number */}
            <div className="flex items-center gap-2 pr-5 border-r border-[var(--card-border)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className="text-[var(--text-secondary)] text-[13px] font-semibold">
                +011-47586938
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="text-[var(--text-secondary)] flex items-center justify-center w-4 h-4 transition-all duration-300 opacity-80 hover:opacity-100 hover:text-[#0077b5] hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-[var(--text-secondary)] flex items-center justify-center w-4 h-4 transition-all duration-300 opacity-80 hover:opacity-100 hover:text-[#1DA1F2] hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-[var(--text-secondary)] flex items-center justify-center w-4 h-4 transition-all duration-300 opacity-80 hover:opacity-100 hover:text-[#0A66C2] hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-[var(--text-secondary)] flex items-center justify-center w-4 h-4 transition-all duration-300 opacity-80 hover:opacity-100 hover:text-[#C13584] hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.848-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
            </div>

            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-primary)] text-xs font-semibold transition-all duration-300 hover:bg-[var(--card-border)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"></path>
                </svg>
                <span>{t('change_language')}</span>
                <span className="uppercase">{lang}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${langOpen ? 'rotate-180' : ''} transition-transform`}>
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
        className={`fixed left-0 right-0 z-[1000] transition-all duration-300 ease-in-out ${
          isMiniHeaderHidden ? 'top-0 md:top-0' : 'top-0 md:top-[40px]'
        } ${
          isScrolled ? 'bg-[var(--card-bg)] shadow-lg dark:shadow-[0_8px_30px_-5px_rgba(255,255,255,0.1),0_4px_15px_-8px_rgba(255,255,255,0.08)] backdrop-blur-sm' : 'bg-[var(--background)]'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-[90px] lg:h-[120px]">
            {/* Logo - Left Side */}
            <div className="flex items-center flex-shrink-0" style={{ transform: `scale(${uiScale})`, transformOrigin: 'top left' }}>
              <Link href="/" className="flex items-center group">
                <img 
                  src="/images/new_logo_finalM.png" 
                  alt="Shanky Group Logo"
                  className="h-[60px] sm:h-[80px] md:h-[90px] lg:h-[100px] w-auto object-contain transition-all duration-500 group-hover:scale-105"
                />
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
                      <div className="grid grid-cols-4 gap-[1px] bg-[var(--card-border)] p-[1px]">
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

              {/* Right Side Controls */}
              <div className="flex items-center gap-3">
                {/* Search Button - Desktop Only */}
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer text-[var(--text-secondary)] transition-all duration-300 hover:text-[#e63a27] hover:bg-[var(--card-border)] hover:scale-110"
                  aria-label="Search"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>

                {/* Theme Toggle Button with Animation */}
                <button 
                  onClick={toggleTheme}
                  className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer text-[var(--text-secondary)] transition-all duration-300 hover:text-[#e63a27] hover:bg-[var(--card-border)] hover:scale-110 relative overflow-hidden group"
                  aria-label="Toggle theme"
                >
                  {/* Background Animation on Hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-[#e63a27]/10 to-transparent scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg"></span>
                  
                  {/* Icon with Rotation Animation */}
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
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-primary)] transition-all duration-300 hover:bg-[var(--card-border)] hover:scale-105"
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

      {/* Mobile Menu - Moved outside header container */}
      <div 
        className={`lg:hidden fixed top-0 left-0 h-full w-[80%] sm:w-[70%] max-w-[320px] bg-[var(--card-bg)] shadow-2xl transform transition-all duration-300 ease-in-out z-[1001] ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">
          {/* Mobile Menu Header */}
          <div className="sticky top-0 bg-[var(--card-bg)] border-b border-[var(--card-border)] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/images/new_logo_finalM.png" 
                alt="Shanky Group Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-[var(--text-primary)] font-bold text-sm">Menu</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-[var(--card-border)] text-[var(--text-primary)] hover:bg-[var(--card-border)] transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="px-5 py-5 space-y-5">
            {/* WHO WE ARE Section */}
            <div className="space-y-2 animate-slide-down">
              <div className="font-bold text-[var(--text-primary)] text-sm pb-2 border-b-2 border-[var(--card-border)]">
                WHO WE ARE
              </div>
              <div className="space-y-0 pl-3">
                <Link 
                  href="/who-we-are/about-us" 
                  className={`block py-3 text-sm transition-all duration-300 border-b border-[var(--card-border)] hover:pl-2 ${
                    activePath === '/who-we-are/about-us'
                      ? 'text-[#e63a27] font-black' 
                      : 'text-[var(--text-secondary)] hover:text-[#e63a27]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  href="/who-we-are/leadership" 
                  className={`block py-3 text-sm transition-all duration-300 border-b border-[var(--card-border)] hover:pl-2 ${
                    activePath === '/who-we-are/leadership'
                      ? 'text-[#e63a27] font-black' 
                      : 'text-[var(--text-secondary)] hover:text-[#e63a27]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Leadership
                </Link>
                <Link 
                  href="/who-we-are/mission-vision" 
                  className={`block py-3 text-sm transition-all duration-300 border-b border-[var(--card-border)] hover:pl-2 ${
                    activePath === '/who-we-are/mission-vision'
                      ? 'text-[#e63a27] font-black' 
                      : 'text-[var(--text-secondary)] hover:text-[#e63a27]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mission & Vision
                </Link>
                <Link 
                  href="/who-we-are/compliance" 
                  className={`block py-3 text-sm transition-all duration-300 hover:pl-2 ${
                    activePath === '/who-we-are/compliance'
                      ? 'text-[#e63a27] font-black' 
                      : 'text-[var(--text-secondary)] hover:text-[#e63a27]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Compliance
                </Link>
              </div>
            </div>
            
            {/* BUSINESS Section - Professional mobile list */}
            <div className="animate-slide-down" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-2 pb-3 mb-2 border-b-2 border-[var(--card-border)]">
                <span className="w-1 h-5 rounded-full bg-[#e63a27] shrink-0"/>
                <span className="font-bold text-[var(--text-primary)] text-base tracking-wide uppercase">Businesses</span>
              </div>
              <div className="space-y-1">
                {companies.map((company, index) => (
                  <Link 
                    key={index} 
                    href={company.link} 
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 border border-transparent ${
                      activePath === company.link
                        ? 'bg-[#e63a27]/10 border-[#e63a27]/20 text-[#e63a27]' 
                        : 'hover:bg-[var(--card-border)]/50 text-[var(--text-primary)]'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[var(--card-border)]">
                      <img src={company.image} alt={company.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`block text-base font-semibold truncate ${activePath === company.link ? 'text-[#e63a27]' : ''}`}>
                        {company.name}
                      </span>
                      <span className="block text-[13px] text-[var(--text-secondary)] truncate">
                        {company.description}
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-[var(--text-secondary)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </Link>
                ))}
              </div>
              <Link 
                href="/company" 
                className="mt-3 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--card-border)] text-[#e63a27] text-base font-semibold hover:bg-[#e63a27]/5 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                View all companies
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
            </div>
            
            {/* Simple Links */}
            <div className="space-y-2 pt-2 animate-slide-down" style={{ animationDelay: '0.2s' }}>
              <Link 
                href="/careers" 
                className={`block text-sm py-3 transition-all duration-300 border-b border-[var(--card-border)] ${
                  activePath === '/careers' 
                    ? 'text-[#e63a27] font-black' 
                    : 'text-[var(--text-primary)] font-bold hover:text-[#e63a27]'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CAREERS
              </Link>
              <Link 
                href="/contact" 
                className={`block text-sm py-3 transition-all duration-300 ${
                  activePath === '/contact' 
                    ? 'text-[#e63a27] font-black' 
                    : 'text-[var(--text-primary)] font-bold hover:text-[#e63a27]'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT US
              </Link>
            </div>

            {/* Mobile Theme Toggle with Animation */}
            <div className="pt-3 border-t border-[var(--card-border)] animate-slide-down" style={{ animationDelay: '0.3s' }}>
              <button 
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--card-border)] to-transparent text-[var(--text-primary)] font-semibold text-sm transition-all duration-300 hover:from-[#e63a27]/10 hover:to-transparent group"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e63a27] animate-pulse"></span>
                  Toggle Theme
                </span>
                <span className="transition-transform duration-500 group-hover:rotate-180">
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
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
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

      {/* Spacer for fixed header - FIXED: Static height to prevent content jumping */}
      <div className="h-[90px] md:h-[130px] lg:h-[160px]" />

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