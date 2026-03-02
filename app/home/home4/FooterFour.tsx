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
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
      <div className="max-w-[1800px] mx-auto">
        {/* CTA Block - Above Footer */}
        <div
          ref={ctaRef}
          className="relative rounded-[24px] overflow-hidden mb-8 sm:mb-10 px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20 text-center border border-white/10"
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
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold text-white mb-4 tracking-tight"
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
              className="text-base sm:text-lg text-gray-300/95 max-w-2xl mx-auto mb-10 leading-relaxed"
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
              className="group inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] active:scale-[0.98]"
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

        {/* Main Footer Card */}
        <div className="relative z-10 rounded-[20px] shadow-sm px-8 sm:px-12 py-10 bg-[var(--card-bg)] border border-[var(--card-border)]">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-12 pb-8 border-b border-[var(--card-border)]">
            {/* Brand Section */}
            <div>
              {/* Logo */}
              <div className="flex items-center gap-2.5 mb-5">
                <img 
                  src="/images/new_logo_finalM.png"
                  alt="Shanky Group Logo"
                  className="h-[50px] w-auto object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              {/* Description */}
              <p className="text-[14px] leading-[1.7] mb-6 max-w-[400px] text-[var(--text-secondary)]">
                {t('footer_description')}
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3.5">
                <a 
                  href="#" 
                  aria-label="X (Twitter)"
                  className="w-[20px] h-[20px] text-[var(--text-primary)] hover:text-[#0066cc] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  aria-label="Instagram"
                  className="w-[20px] h-[20px] text-[var(--text-primary)] hover:text-[#E4405F] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  aria-label="LinkedIn"
                  className="w-[20px] h-[20px] text-[var(--text-primary)] hover:text-[#0A66C2] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  aria-label="GitHub"
                  className="w-[20px] h-[20px] text-[var(--text-primary)] hover:text-[#333] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-[15px] font-semibold mb-4 text-[var(--text-primary)]">{t('product')}</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {t('features')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {t('pricing')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-[15px] font-semibold mb-4 text-[var(--text-primary)]">{t('resources')}</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {t('documentation')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {t('tutorials')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {t('blog')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {t('support')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-[15px] font-semibold mb-4 text-[var(--text-primary)]">{t('company')}</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {t('about')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {t('careers')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {t('contact')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Section */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-[13px] text-[var(--text-secondary)]">
              © {currentYear} {t('shanky_group')}. {t('all_rights_reserved')}
            </div>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors underline">
                {t('privacy_policy')}
              </Link>
              <Link href="#" className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors underline">
                {t('terms_of_service')}
              </Link>
              <Link href="#" className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors underline">
                {t('cookie_settings')}
              </Link>
            </div>
          </div>
        </div>

        {/* Background Watermark Text - SEPARATE BLOCK NEECHE */}
        <div ref={watermarkRef} className="relative mt-8 flex justify-center items-center overflow-hidden py-8">
          {/* Animated Background Balls with Blur */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full backdrop-blur-sm transition-all duration-1000" 
              style={{ 
                animation: isVisible ? 'bounce 3s infinite 0s' : 'none', 
                filter: 'blur(8px)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.8)',
                transitionDelay: '200ms'
              }}
            ></div>
            <div 
              className="absolute top-20 right-20 w-16 h-16 bg-orange-500/10 rounded-full backdrop-blur-sm transition-all duration-1000" 
              style={{ 
                animation: isVisible ? 'bounce 3.5s infinite 0.5s' : 'none', 
                filter: 'blur(6px)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.8)',
                transitionDelay: '400ms'
              }}
            ></div>
            <div 
              className="absolute bottom-10 left-1/4 w-24 h-24 bg-green-500/10 rounded-full backdrop-blur-sm transition-all duration-1000" 
              style={{ 
                animation: isVisible ? 'bounce 4s infinite 1s' : 'none', 
                filter: 'blur(10px)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.8)',
                transitionDelay: '600ms'
              }}
            ></div>
            <div 
              className="absolute bottom-20 right-1/3 w-14 h-14 bg-purple-500/10 rounded-full backdrop-blur-sm transition-all duration-1000" 
              style={{ 
                animation: isVisible ? 'bounce 3.2s infinite 1.5s' : 'none', 
                filter: 'blur(5px)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.8)',
                transitionDelay: '800ms'
              }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/3 w-18 h-18 bg-pink-500/10 rounded-full backdrop-blur-sm transition-all duration-1000" 
              style={{ 
                animation: isVisible ? 'bounce 3.8s infinite 2s' : 'none', 
                filter: 'blur(7px)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.8)',
                transitionDelay: '1000ms'
              }}
            ></div>
            <div 
              className="absolute top-1/3 right-1/4 w-22 h-22 bg-yellow-500/10 rounded-full backdrop-blur-sm transition-all duration-1000" 
              style={{ 
                animation: isVisible ? 'bounce 4.2s infinite 2.5s' : 'none', 
                filter: 'blur(9px)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.8)',
                transitionDelay: '1200ms'
              }}
            ></div>
          </div>
          
          {/* Centered SHANKY GROUP Text */}
          <span 
            className={`relative z-10 text-[120px] sm:text-[160px] lg:text-[220px] xl:text-[280px] font-bold leading-none transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] select-none text-center ${
              isDark ? 'text-gray-700/30' : 'text-[#e8e8ed]/40'
            }`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(100px) scale(0.8)',
              filter: isVisible ? 'blur(0px)' : 'blur(10px)',
              transitionDelay: '500ms'
            }}
          >
            {t('shanky_group').toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GraphyFooter;