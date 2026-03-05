'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const WorkWithUs = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isFirstRowPaused, setIsFirstRowPaused] = useState(false);
  const [isSecondRowPaused, setIsSecondRowPaused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Check dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="p-0 bg-[var(--background)] font-sans">
      
      {/* Moving Logos Section */}
      <div 
        className="py-8 sm:py-10 md:py-[60px] overflow-hidden relative transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ 
          background: isDarkMode 
            ? 'var(--card-bg)'
            : 'linear-gradient(to bottom right, #1e293b, #0f172a)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(80px)'
        }}
      >
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          <h2 
            className="text-[20px] sm:text-[26px] md:text-[32px] font-semibold text-white m-0 mb-3 sm:mb-4 tracking-[0.5px] sm:tracking-[1px] leading-tight transition-all duration-800 delay-200"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-60px)' }}
          >
            Trusted by Leading Companies
          </h2>
          <p 
            className="text-[13px] sm:text-[14px] md:text-base text-white/80 max-w-[600px] mx-auto leading-snug transition-all duration-800 delay-400"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(60px)' }}
          >
            Partnering with industry leaders to drive innovation and growth
          </p>
        </div>

        {/* Moving Logos Container - responsive height & card size */}
        <div 
          className="relative w-full h-[56px] sm:h-[64px] md:h-[80px] overflow-hidden transition-all duration-800 delay-600"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)' }}
          onMouseEnter={() => setIsFirstRowPaused(true)}
          onMouseLeave={() => setIsFirstRowPaused(false)}
        >
          {/* First Row of Logos */}
          <div 
            className="flex absolute w-[200%]"
            style={{
              animation: 'scrollLogos 20s linear infinite',
              animationPlayState: isFirstRowPaused ? 'paused' : 'running'
            }}
          >
            {[
              { name: 'Microsoft', color: '#0078D4' },
              { name: 'Google', color: '#4285F4' },
              { name: 'Amazon', color: '#FF9900' },
              { name: 'Apple', color: '#000000' },
              { name: 'Tesla', color: '#CC0000' },
              { name: 'Meta', color: '#1877F2' },
              { name: 'Netflix', color: '#E50914' },
              { name: 'Spotify', color: '#1DB954' }
            ].map((company, index) => (
              <div key={index} className="flex-[0_0_120px] sm:flex-[0_0_160px] md:flex-[0_0_200px] h-[56px] sm:h-[64px] md:h-[80px] flex items-center justify-center mx-3 sm:mx-5 md:mx-[30px] text-sm sm:text-lg md:text-2xl font-bold bg-[var(--background)] rounded-lg sm:rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-2 sm:p-3 md:p-5 transition-transform duration-300"
                   style={{ color: company.color }}>
                {company.name}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              { name: 'Microsoft', color: '#0078D4' },
              { name: 'Google', color: '#4285F4' },
              { name: 'Amazon', color: '#FF9900' },
              { name: 'Apple', color: '#000000' },
              { name: 'Tesla', color: '#CC0000' },
              { name: 'Meta', color: '#1877F2' },
              { name: 'Netflix', color: '#E50914' },
              { name: 'Spotify', color: '#1DB954' }
            ].map((company, index) => (
              <div key={`duplicate-${index}`} className="flex-[0_0_120px] sm:flex-[0_0_160px] md:flex-[0_0_200px] h-[56px] sm:h-[64px] md:h-[80px] flex items-center justify-center mx-3 sm:mx-5 md:mx-[30px] text-sm sm:text-lg md:text-2xl font-bold bg-[var(--background)] rounded-lg sm:rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-2 sm:p-3 md:p-5"
                   style={{ color: company.color }}>
                {company.name}
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Opposite Direction */}
        <div 
          className="relative w-full h-[56px] sm:h-[64px] md:h-[80px] overflow-hidden mt-3 sm:mt-4 md:mt-5 transition-all duration-800 delay-800"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)' }}
          onMouseEnter={() => setIsSecondRowPaused(true)}
          onMouseLeave={() => setIsSecondRowPaused(false)}
        >
          <div 
            className="flex absolute w-[200%]"
            style={{
              animation: 'scrollLogosReverse 25s linear infinite',
              animationPlayState: isSecondRowPaused ? 'paused' : 'running'
            }}
          >
            {[
              { name: 'IBM', color: '#054ADA' },
              { name: 'Oracle', color: '#F80000' },
              { name: 'SAP', color: '#008FD3' },
              { name: 'Salesforce', color: '#00A1E0' },
              { name: 'Adobe', color: '#FF0000' },
              { name: 'Cisco', color: '#1BA1D2' },
              { name: 'Intel', color: '#0071C5' },
              { name: 'HP', color: '#0096D6' }
            ].map((company, index) => (
              <div key={index} className="flex-[0_0_120px] sm:flex-[0_0_160px] md:flex-[0_0_200px] h-[56px] sm:h-[64px] md:h-[80px] flex items-center justify-center mx-3 sm:mx-5 md:mx-[30px] text-sm sm:text-lg md:text-2xl font-bold bg-[var(--background)] rounded-lg sm:rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-2 sm:p-3 md:p-5"
                   style={{ color: company.color }}>
                {company.name}
              </div>
            ))}
            
            {[
              { name: 'IBM', color: '#054ADA' },
              { name: 'Oracle', color: '#F80000' },
              { name: 'SAP', color: '#008FD3' },
              { name: 'Salesforce', color: '#00A1E0' },
              { name: 'Adobe', color: '#FF0000' },
              { name: 'Cisco', color: '#1BA1D2' },
              { name: 'Intel', color: '#0071C5' },
              { name: 'HP', color: '#0096D6' }
            ].map((company, index) => (
              <div key={`duplicate-reverse-${index}`} className="flex-[0_0_120px] sm:flex-[0_0_160px] md:flex-[0_0_200px] h-[56px] sm:h-[64px] md:h-[80px] flex items-center justify-center mx-3 sm:mx-5 md:mx-[30px] text-sm sm:text-lg md:text-2xl font-bold bg-[var(--background)] rounded-lg sm:rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-2 sm:p-3 md:p-5"
                   style={{ color: company.color }}>
                {company.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WORK WITH US - Full width, top margin, clean design */}
      <div 
        className="relative w-full mt-16 sm:mt-20 md:mt-24 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] delay-1000"
        style={{ 
          opacity: isVisible ? 1 : 0, 
          transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
          backgroundColor: 'var(--background)',
        }}
      >
        {/* Subtle background - soft gradient + very light image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]/30" />

        <div className="relative z-10 w-full max-w-[640px] mx-auto text-center">
          {/* Main Title */}
          <h1 
            className="text-[28px] sm:text-[34px] md:text-[42px] font-bold text-[var(--text-primary)] m-0 mb-3 tracking-[4px] md:tracking-[6px] uppercase transition-all duration-800 delay-1200"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)' }}
          >
            WORK WITH US
          </h1>
          <div 
            className="w-14 h-1 rounded-full bg-[#e63a27] mx-auto mb-10 sm:mb-12"
            style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.6s 0.2s' }}
          />

          {/* Card - JOIN OUR TEAM */}
          <div 
            className="rounded-2xl p-8 sm:p-10 md:p-12 text-center transition-all duration-500 border"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)', 
              transitionDelay: '0.15s',
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            }}
          >
            <h2 className="text-[22px] sm:text-[26px] md:text-[28px] font-bold text-[var(--text-primary)] m-0 mb-3 tracking-[2px] uppercase">
              JOIN OUR TEAM
            </h2>
            <p className="text-[15px] sm:text-base text-[var(--text-secondary)] leading-[1.65] m-0 mb-8 max-w-[420px] mx-auto">
              See current job openings and find your place with us.
            </p>
            <Link 
              href="/careers"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-8 bg-[#e63a27] text-white rounded-xl text-sm font-semibold uppercase tracking-wide transition-all hover:bg-[#c93222] hover:shadow-lg hover:shadow-[#e63a27]/25"
              onMouseEnter={() => setHoveredButton('team')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              View openings
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUs;
