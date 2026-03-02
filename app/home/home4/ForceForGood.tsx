'use client';

import { useState, useEffect, useRef } from "react";
import { useI18n } from '../../i18n/I18nProvider';

const ForceForGood = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

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

  return (
    <section ref={sectionRef} className="w-full h-screen min-h-[450px] md:min-h-[600px] relative overflow-hidden bg-[var(--background)]">
      {/* Background Image - Futuristic City Skyline */}
      <div 
        className={`absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-[3000ms] ease-[cubic-bezier(0.23,1,0.32,1)] brightness-75 contrast-105 ${isHovered ? 'scale-105' : 'scale-100'}`}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop)',
          transform: isVisible ? 'scale(1)' : 'scale(1.1)',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Subtle Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--background)]/15 to-[var(--background)]/25 pointer-events-none" />

      {/* Content Container */}
      <div 
        className="absolute text-center z-[2] transition-all duration-1200 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          top: '50%',
          left: '50%',
          transform: isVisible ? 'translate(-50%, -50%)' : 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '900px',
          padding: '0 30px',
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Main Title - A Force (Red) For Good (White) */}
        <h1 
          className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-normal m-0 mb-[20px] md:mb-[25px] leading-[1.2] tracking-[0.5px] md:tracking-[1px] font-sans drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
          }}
        >
          <span className="text-[#d32f2f] font-normal inline-block transition-all duration-800 delay-200" style={{ opacity: isVisible ? 1 : 0 }}>
            {t('a_force')}
          </span>
          {' '}
          <span className="text-white font-normal inline-block transition-all duration-800 delay-400" style={{ opacity: isVisible ? 1 : 0 }}>
            {t('for_good')}
          </span>
        </h1>

        {/* Click to Read More Link */}
        <div 
          className="inline-block mt-[10px] transition-all duration-800 delay-600"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <a 
            href="#"
            className="group flex items-center justify-center gap-[8px] hover:gap-[12px] text-[12px] sm:text-[13px] md:text-[14px] text-white no-underline font-normal tracking-[0.5px] transition-all duration-300 opacity-95 hover:opacity-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {t('click_to_read_more')}
            <span className="inline-flex items-center justify-center w-[18px] h-[18px] border-[1.5px] border-white rounded-full transition-transform duration-300">
              <span className="inline-block w-0 h-0 border-l-[5px] border-l-white border-y-[3px] border-y-transparent ml-[1px]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ForceForGood;
