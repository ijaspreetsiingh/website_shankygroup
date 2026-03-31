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
            className="section-heading text-[20px] sm:text-[26px] md:text-[32px] font-bold text-white m-0 mb-3 sm:mb-4 tracking-[0.5px] sm:tracking-[1px] leading-tight transition-all duration-800 delay-200"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-60px)' }}
          >
            Trusted by Leading Companies
          </h2>
          <p 
            className="section-subheading text-[13px] sm:text-[14px] md:text-base text-white/80 max-w-[600px] mx-auto leading-snug transition-all duration-800 delay-400"
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
              { name: 'Coventry Coilomatic Haryana Ltd', color: '#0078D4' },
              { name: 'Metal Canns Company', color: '#4285F4' },
              { name: 'Shubhampress Automation Pvt Ltd', color: '#FF9900' },
              { name: 'Apollo Green Energy Ltd', color: '#1877F2' },
              { name: 'Maxvolt Energy Industries Ltd', color: '#CC0000' },
              { name: 'Kinetic Green Energy & Power Solution Ltd', color: '#1877F2' },
              { name: 'Pawan Energy India Pvt Ltd', color: '#E50914' },
              { name: 'Shailender Bhadur Singh Infra Pvt Ltd', color: '#1DB954' }
            ].map((company, index) => (
              <div key={index} className="flex-[0_0_260px] sm:flex-[0_0_320px] md:flex-[0_0_400px] h-[56px] sm:h-[64px] md:h-[80px] flex items-center justify-center mx-2 sm:mx-3 md:mx-4 text-xs sm:text-sm md:text-base text-center font-bold bg-[var(--background)] rounded-lg sm:rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-2 sm:p-3 md:p-4 transition-transform duration-300"
                   style={{ color: company.color }}>
                {company.name}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              { name: 'Coventry Coilomatic Haryana Ltd', color: '#0078D4' },
              { name: 'Metal Canns Company', color: '#4285F4' },
              { name: 'Shubhampress Automation Pvt Ltd', color: '#FF9900' },
              { name: 'Apollo Green Energy Ltd', color: '#1877F2' },
              { name: 'Maxvolt Energy Industries Ltd', color: '#CC0000' },
              { name: 'Kinetic Green Energy & Power Solution Ltd', color: '#1877F2' },
              { name: 'Pawan Energy India Pvt Ltd', color: '#E50914' },
              { name: 'Shailender Bhadur Singh Infra Pvt Ltd', color: '#1DB954' }
            ].map((company, index) => (
              <div key={`duplicate-${index}`} className="flex-[0_0_260px] sm:flex-[0_0_320px] md:flex-[0_0_400px] h-[56px] sm:h-[64px] md:h-[80px] flex items-center justify-center mx-2 sm:mx-3 md:mx-4 text-xs sm:text-sm md:text-base text-center font-bold bg-[var(--background)] rounded-lg sm:rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-2 sm:p-3 md:p-4"
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
              { name: 'Uchai Infra Pvt Ltd', color: '#054ADA' },
              { name: 'Rajgor Protein Pvt Ltd', color: '#F80000' },
              { name: 'Rajgor castor Derivatives Limited', color: '#008FD3' },
              { name: 'Coventry Coilomatic Haryana Ltd', color: '#00A1E0' },
              { name: 'Metal Canns Company', color: '#FF0000' },
              { name: 'Shubhampress Automation Pvt Ltd', color: '#1BA1D2' },
              { name: 'Apollo Green Energy Ltd', color: '#0071C5' },
              { name: 'Maxvolt Energy Industries Ltd', color: '#0096D6' }
            ].map((company, index) => (
              <div key={index} className="flex-[0_0_260px] sm:flex-[0_0_320px] md:flex-[0_0_400px] h-[56px] sm:h-[64px] md:h-[80px] flex items-center justify-center mx-2 sm:mx-3 md:mx-4 text-xs sm:text-sm md:text-base text-center font-bold bg-[var(--background)] rounded-lg sm:rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-2 sm:p-3 md:p-4"
                   style={{ color: company.color }}>
                {company.name}
              </div>
            ))}
            
            {[  
              { name: 'Uchai Infra Pvt Ltd', color: '#054ADA' },
              { name: 'Rajgor Protein Pvt Ltd', color: '#F80000' },
              { name: 'Rajgor castor Derivatives Limited', color: '#008FD3' },
              { name: 'Coventry Coilomatic Haryana Ltd', color: '#00A1E0' },
              { name: 'Metal Canns Company', color: '#FF0000' },
              { name: 'Shubhampress Automation Pvt Ltd', color: '#1BA1D2' },
              { name: 'Apollo Green Energy Ltd', color: '#0071C5' },
              { name: 'Maxvolt Energy Industries Ltd', color: '#0096D6' }
            ].map((company, index) => (
              <div key={`duplicate-reverse-${index}`} className="flex-[0_0_260px] sm:flex-[0_0_320px] md:flex-[0_0_400px] h-[56px] sm:h-[64px] md:h-[80px] flex items-center justify-center mx-2 sm:mx-3 md:mx-4 text-xs sm:text-sm md:text-base text-center font-bold bg-[var(--background)] rounded-lg sm:rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-2 sm:p-3 md:p-4"
                   style={{ color: company.color }}>
                {company.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WORK WITH US - Full width, top margin, image visible */}
      <div 
        className="relative w-full mt-16 sm:mt-20 md:mt-24 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] delay-1000"
        style={{ 
          opacity: isVisible ? 1 : 0, 
          transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
        }}
      >
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80)',
          }}
        />
        {/* Light overlay - image clearly visible */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom right, rgba(0,0,0,0.35), rgba(0,0,0,0.3), rgba(0,0,0,0.35))'
              : 'linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.28) 100%)',
          }}
        />
        {isDarkMode && (
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/20" />
        )}

        <div className="relative z-10 w-full max-w-[640px] mx-auto text-center">
          {/* Main Title - dark text in light mode, white in dark mode */}
          <h1
            className={`section-heading text-[28px] sm:text-[34px] md:text-[42px] font-bold m-0 mb-3 tracking-[4px] md:tracking-[6px] uppercase transition-all duration-800 delay-1200 ${isDarkMode ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]' : 'text-[#1a1a1a] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]'}`}
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)' }}
          >
            WORK WITH US 
          </h1>
          <div 
            className="w-14 h-1 rounded-full bg-[#e63a27] mx-auto mb-10 sm:mb-12"
            style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.6s 0.2s' }}
          />

          {/* Card - JOIN OUR TEAM - glass blur */}
          <div 
            className="rounded-2xl p-8 sm:p-10 md:p-12 text-center transition-all duration-500 border border-white/20 backdrop-blur-md bg-white/15 dark:bg-black/25 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)', 
              transitionDelay: '0.15s',
            }}
          >
            <h2 className="section-heading text-[22px] sm:text-[26px] md:text-[28px] font-bold text-[var(--text-primary)] m-0 mb-3 tracking-[2px] uppercase">
              JOIN OUR TEAM
            </h2>
            <p className="section-subheading text-[15px] sm:text-base text-[var(--text-secondary)] leading-[1.65] m-0 mb-8 max-w-[420px] mx-auto">
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
