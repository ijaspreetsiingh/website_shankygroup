'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useI18n } from '../../i18n/I18nProvider';

const GraphyFooter = () => {
  const currentYear = new Date().getFullYear();
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(true);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  // Scroll animation for CTA block (reveal when in view; content visible by default so it always shows)
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCtaVisible(true);
      },
      { threshold: 0.1, rootMargin: '0px' }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  // Scroll animation observer for watermark
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (watermarkRef.current) {
      observer.observe(watermarkRef.current);
    }

    return () => {
      if (watermarkRef.current) {
        observer.unobserve(watermarkRef.current);
      }
    };
  }, []);

  // Initialize dark mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = saved === 'dark' || (!saved && systemPrefersDark);
      
      setIsDark(shouldBeDark);
    }
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    // Observer for class changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="py-5 sm:py-10 px-4 sm:px-6 lg:px-8 bg-[var(--background)] overflow-x-hidden">
      <div className="max-w-[1800px] mx-auto">
        {/* CTA Block - Above Footer */}
        <div
          ref={ctaRef}
          className="relative rounded-2xl sm:rounded-[24px] overflow-hidden mb-5 sm:mb-6 md:mb-8 px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14 lg:py-20 text-center border border-white/10"
          style={{
            background: 'linear-gradient(165deg, #1a1a2e 0%, #16213e 35%, #0f0f23 70%, #000000 100%)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-violet-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[70px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }} />
            <div className="absolute top-0 right-1/4 w-40 h-40 bg-amber-500/10 rounded-full blur-[60px]" />
          </div>

          <div className="relative z-10">
            <h2
              className="section-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold text-white mb-3 sm:mb-4 tracking-tight"
              style={{
                opacity: ctaVisible ? 1 : 0,
                transform: ctaVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                transitionDelay: '0.1s',
              }}
            >
              Register as a vendor
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg text-gray-300/95 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-1"
              style={{
                opacity: ctaVisible ? 1 : 0,
                transform: ctaVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                transitionDelay: '0.25s',
              }}
            >
              Partner with Shanky Group and grow your business with us. Join our network of trusted vendors.
            </p>
            <Link
              href="/vendor"
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-black font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] active:scale-[0.98] min-h-[44px]"
              style={{
                opacity: ctaVisible ? 1 : 0,
                transform: ctaVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s, transform 0.3s',
                transitionDelay: '0.4s',
              }}
            >
              Register Now
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Main Footer Card - balanced multi-column layout */}
        <div className="relative z-10 rounded-2xl shadow-md px-6 sm:px-10 md:px-14 py-8 sm:py-12 bg-[var(--card-bg)] border border-[var(--card-border)]">
          {/* Top: Brand + Links — all columns top-aligned for balanced look */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-8 lg:gap-x-5 lg:gap-y-8 pb-8 sm:pb-10 border-b border-[var(--card-border)] items-start">
            {/* Brand Section — description clamped so column doesn’t tower */}
            <div className="text-center lg:text-left order-1">
              <div className="flex justify-center lg:justify-start mb-4">
                <img 
                  src="/images/new_logo_finalM.png"
                  alt="Shanky Group"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
              <p className="text-[13px] sm:text-[14px] leading-relaxed mb-5 max-w-[380px] mx-auto lg:mx-0 text-[var(--text-secondary)] line-clamp-4">
                {t('footer_description')}
              </p>
              <div className="flex justify-center lg:justify-start items-center gap-1.5 flex-wrap">
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-[var(--text-secondary)] hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-all duration-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" aria-label="X (Twitter)" className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-[var(--text-secondary)] hover:text-[#000000] dark:hover:text-[#ffffff] hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-[var(--text-secondary)] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all duration-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-[var(--text-secondary)] hover:text-[#E4405F] hover:bg-[#E4405F]/10 transition-all duration-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>
                </a>
              </div>
            </div>

            {/* Link columns — consistent min-height and heading style */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:contents gap-6 lg:gap-0 order-2 lg:order-none">
              <div className="text-center sm:text-left min-h-[120px] sm:min-h-0">
                <h3 className="section-heading text-xs sm:text-[13px] font-semibold mb-3 sm:mb-4 text-[var(--text-primary)] uppercase tracking-widest pb-2 border-b border-[var(--card-border)] inline-block sm:block">{t('product')}</h3>
                <ul className="space-y-2.5 mt-1">
                  <li><Link href="#" className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">{t('features')}</Link></li>
                  <li><Link href="#" className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">{t('pricing')}</Link></li>
                  <li><Link href="#" className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">{t('solutions')}</Link></li>
                </ul>
              </div>
              <div className="text-center sm:text-left min-h-[120px] sm:min-h-0">
                <h3 className="section-heading text-xs sm:text-[13px] font-semibold mb-3 sm:mb-4 text-[var(--text-primary)] uppercase tracking-widest pb-2 border-b border-[var(--card-border)] inline-block sm:block">{t('resources')}</h3>
                <ul className="space-y-2.5 mt-1">
                  <li><Link href="#" className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">{t('documentation')}</Link></li>
                  <li><Link href="#" className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">{t('tutorials')}</Link></li>
                  <li><Link href="#" className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">{t('blog')}</Link></li>
                  <li><Link href="#" className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">{t('support')}</Link></li>
                </ul>
              </div>
              <div className="text-center sm:text-left min-h-[120px] sm:min-h-0">
                <h3 className="section-heading text-xs sm:text-[13px] font-semibold mb-3 sm:mb-4 text-[var(--text-primary)] uppercase tracking-widest pb-2 border-b border-[var(--card-border)] inline-block sm:block">{t('company')}</h3>
                <ul className="space-y-2.5 mt-1">
                  <li><Link href="/who-we-are/about-us" className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">{t('about')}</Link></li>
                  <li><Link href="/careers" className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">{t('careers')}</Link></li>
                  <li><Link href="/contact" className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">{t('contact')}</Link></li>
                </ul>
              </div>
              <div className="text-center sm:text-left min-h-[120px] sm:min-h-0">
                <h3 className="section-heading text-xs sm:text-[13px] font-semibold mb-3 sm:mb-4 text-[var(--text-primary)] uppercase tracking-widest pb-2 border-b border-[var(--card-border)] inline-block sm:block">{t('quick_links')}</h3>
                <ul className="space-y-2.5 mt-1">
                  <li><Link href="/vendor" className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">{t('vendorregistration')}</Link></li>
                  <li><Link href="#" className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">{t('faq')}</Link></li>
                  <li><Link href="#" className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">{t('sitemap')}</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright bar — clear separation */}
          <div className="pt-6 sm:pt-8 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center bg-transparent">
            <p className="text-[11px] sm:text-[13px] text-[var(--text-secondary)] text-center sm:text-left order-2 sm:order-1">
              © {currentYear} {t('shanky_group')}. {t('all_rights_reserved')}
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-1 order-1 sm:order-2">
              <Link href="#" className="text-[11px] sm:text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline transition-colors duration-200">
                {t('privacy_policy')}
              </Link>
              <Link href="#" className="text-[11px] sm:text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline transition-colors duration-200">
                {t('terms_of_service')}
              </Link>
              <Link href="#" className="text-[11px] sm:text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline transition-colors duration-200">
                {t('cookie_settings')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark: full bleed edge-to-edge */}
      <div ref={watermarkRef} className="relative flex justify-center items-center overflow-hidden py-4 sm:py-6 min-h-[50px] sm:min-h-[80px] w-screen max-w-none -ml-4 sm:-ml-6 lg:-ml-8" style={{ width: '100vw', marginRight: 'calc(50% - 50vw)', marginLeft: 'calc(50% - 50vw)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-[8px]" style={{ animation: isVisible ? 'bounce 3s infinite' : 'none' }} />
          <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-[10px]" style={{ animation: isVisible ? 'bounce 4s infinite 1s' : 'none' }} />
        </div>
        <div className="relative z-10 w-full flex justify-center min-w-0">
          <span
            className={`font-bold select-none text-center ${
              isDark ? 'text-gray-700/30' : 'text-[#e8e8ed]/50'
            }`}
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.5s ease',
              transitionDelay: '300ms',
            }}
          >
            <span className="block text-2xl sm:hidden tracking-[0.2em] sm:tracking-widest">{t('shanky_group').toUpperCase()}</span>
            <span
              className="hidden sm:block leading-tight"
              style={{
                fontSize: 'clamp(3rem, 7vw, 18rem)',
                wordBreak: 'break-word',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                maxWidth: '100%',
              }}
            >
              {t('shanky_group').toUpperCase()}
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default GraphyFooter;