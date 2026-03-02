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
        className="py-[60px] overflow-hidden relative transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ 
          background: isDarkMode 
            ? 'var(--card-bg)'
            : 'linear-gradient(to bottom right, #1e293b, #0f172a)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(80px)'
        }}
      >
        <div className="text-center mb-10 px-4">
          <h2 
            className="text-[32px] font-semibold text-white m-0 mb-4 tracking-[1px] transition-all duration-800 delay-200"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-60px)' }}
          >
            Trusted by Leading Companies
          </h2>
          <p 
            className="text-base text-white/80 max-w-[600px] mx-auto transition-all duration-800 delay-400"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(60px)' }}
          >
            Partnering with industry leaders to drive innovation and growth
          </p>
        </div>

        {/* Moving Logos Container */}
        <div 
          className="relative w-full h-[80px] overflow-hidden transition-all duration-800 delay-600"
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
              <div key={index} className="flex-[0_0_200px] h-[80px] flex items-center justify-center mx-[30px] text-2xl font-bold bg-[var(--background)] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-5 transition-transform duration-300"
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
              <div key={`duplicate-${index}`} className="flex-[0_0_200px] h-[80px] flex items-center justify-center mx-[30px] text-2xl font-bold bg-[var(--background)] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-5"
                   style={{ color: company.color }}>
                {company.name}
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Opposite Direction */}
        <div 
          className="relative w-full h-[80px] overflow-hidden mt-5 transition-all duration-800 delay-800"
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
              <div key={index} className="flex-[0_0_200px] h-[80px] flex items-center justify-center mx-[30px] text-2xl font-bold bg-[var(--background)] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-5"
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
              <div key={`duplicate-reverse-${index}`} className="flex-[0_0_200px] h-[80px] flex items-center justify-center mx-[30px] text-2xl font-bold bg-[var(--background)] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-5"
                   style={{ color: company.color }}>
                {company.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-[60px] px-5 md:py-[80px] md:px-[40px] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] delay-1000" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(60px)' }}>
        <div className="max-w-[1200px] mx-auto">
          {/* Main Title */}
          <h1 
            className="text-[36px] md:text-[48px] font-normal text-[var(--text-primary)] m-0 mb-[40px] md:mb-[60px] text-center tracking-[6px] md:tracking-[8px] uppercase font-['Helvetica_Neue',_Arial,_sans-serif] transition-all duration-800 delay-1200"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)' }}
          >
            WORK WITH US
          </h1>

          {/* Cards Container */}
          <div className="flex flex-col gap-[30px] transition-all duration-800 delay-1400" style={{ opacity: isVisible ? 1 : 0 }}>
            {/* Bottom Two Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
              {/* Card 2 - JOIN OUR TEAM */}
              <div 
                className="bg-[var(--background)] rounded-lg p-[35px] md:p-[45px] md:px-[40px] border border-[var(--card-border)] h-auto md:h-[300px] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:scale-[1.02] hover:-translate-y-2"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-60px)' }}
              >
                <div>
                  <h2 
                    className="text-[26px] md:text-[32px] font-normal text-[var(--text-primary)] m-0 mb-[15px] tracking-[3px] uppercase font-['Helvetica_Neue',_Arial,_sans-serif] leading-[1.2] transition-all duration-600"
                    style={{ 
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transitionDelay: '0.1s'
                    }}
                  >
                    JOIN OUR TEAM
                  </h2>
                  
                  <p 
                    className="text-base text-[var(--text-secondary)] leading-[1.6] m-0 font-normal tracking-[0.2px] transition-all duration-600"
                    style={{ 
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: '0.15s'
                    }}
                  >
                    See current job openings.
                  </p>
                </div>
                
                <Link 
                  href="/careers"
                  className="w-full py-3 bg-white text-gray-800 border border-gray-300 rounded-[12px] text-[0.85rem] font-semibold cursor-pointer transition-all hover:bg-gray-50 self-start uppercase mt-6 md:mt-0 transform hover:scale-105 hover:shadow-lg text-center inline-block"
                  style={{ 
                    width: '200px',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                    transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1) 0.2s'
                  }}
                  onMouseEnter={() => setHoveredButton('team')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  Learn more
                </Link>
              </div>

              {/* Card 3 - MAHINDRA AI */}
              <div 
                className="bg-[var(--background)] rounded-lg p-[35px] md:p-[45px] md:px-[40px] border border-[var(--card-border)] h-auto md:h-[300px] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:scale-[1.02] hover:-translate-y-2"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(60px)' }}
              >
                <div>
                  <h2 
                    className="text-[26px] md:text-[32px] font-normal text-[var(--text-primary)] m-0 mb-[15px] tracking-[3px] uppercase font-['Helvetica_Neue',_Arial,_sans-serif] leading-[1.2] transition-all duration-600"
                    style={{ 
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transitionDelay: '0.3s'
                    }}
                  >
                    SHANKY GROUP
                  </h2>
                  
                  <p 
                    className="text-base text-[var(--text-secondary)] leading-[1.6] m-0 font-normal tracking-[0.2px] transition-all duration-600"
                    style={{ 
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: '0.35s'
                    }}
                  >
                    Leading innovation and excellence across diverse industries.
                  </p>
                </div>
                
                <button 
                  className="w-full py-3 bg-white text-gray-800 border border-gray-300 rounded-[12px] text-[0.85rem] font-semibold cursor-pointer transition-all hover:bg-gray-50 self-start uppercase mt-6 md:mt-0 transform hover:scale-105 hover:shadow-lg"
                  style={{ 
                    width: '200px',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                    transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1) 0.4s'
                  }}
                  onMouseEnter={() => setHoveredButton('ai')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUs;
