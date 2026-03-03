'use client';

import React, { useEffect, useRef, useState } from "react";
import { useI18n } from '../../i18n/I18nProvider';

const AboutHomeFour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);
  return (
    <section ref={sectionRef} className="bg-[var(--background)] p-0 w-full overflow-x-hidden overflow-y-visible min-h-0 lg:min-h-[720px] lg:h-[720px] lg:max-h-[90vh]">
      <div className="py-6 md:py-[90px] lg:py-[50px] lg:h-full max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-0 lg:h-full">
          {/* Mobile Image - Centered, Slight Round + Border */}
          <div className={`lg:hidden order-1 flex justify-center px-4 transition-all duration-1000 ease-out`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-100px)' }}>
            <div className="relative h-[300px] w-full max-w-[360px] rounded-2xl overflow-hidden border-[3px] border-[var(--card-border)] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#e6f0fb_0%,_transparent_70%)]"></div>
              <img
                src="/images/vipin_sir2.png"
                alt="Vipin Kumar"
                className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.backgroundColor = "var(--card-border)";
                }}
              />
            </div>
          </div>
          
          {/* Desktop Image - Left Side */}
          <div className={`hidden lg:block order-1 lg:order-1 h-full lg:col-span-2 transition-all duration-1000 ease-out overflow-hidden rounded-r-[8px] lg:rounded-r-[10px]`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-100px)' }}>
            <div className="relative w-full h-full overflow-hidden rounded-r-[8px] lg:rounded-r-[10px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#e6f0fb_0%,_transparent_70%)]"></div>
              <img
                src="/images/vipin_sir2.png"
                alt="Vipin Kumar"
                className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"

                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.backgroundColor = "var(--card-border)";
                }}
              />
            </div>
          </div>
          
          {/* Content - Mobile: professional editorial / Desktop: same */}
          <div className={`order-2 lg:order-2 px-5 py-6 sm:p-[20px] md:p-[30px] lg:p-[40px] lg:py-[50px] flex flex-col justify-center lg:col-span-3 lg:pl-[48px] lg:pr-[40px] lg:min-w-0 min-h-0 overflow-visible transition-all duration-1000 ease-out delay-300 lg:items-stretch items-center`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(100px)' }}>
            <div className={`relative w-full max-w-[360px] sm:max-w-[500px] md:max-w-[630px] lg:max-w-[680px] xl:max-w-[720px] mx-auto lg:mx-0 lg:translate-x-[50px] xl:translate-x-[80px] min-w-0 overflow-visible transition-all duration-700 lg:rounded-none lg:px-1 lg:py-0 pl-0 pr-1 py-1`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)' }}>

              {/* Quote - professional: left accent, left-aligned */}
              <p className="text-[15px] sm:text-[17px] md:text-[18px] lg:text-[21px] xl:text-[22px] leading-[1.85] sm:leading-[1.75] lg:leading-[1.65] text-[var(--text-primary)]/95 lg:text-[var(--text-primary)] text-left font-normal lg:font-semibold tracking-[-0.01em] lg:tracking-normal">
                <span className="lg:inline">"{t('about_quote')}"</span>
              </p>
              {/* Signature line - hidden on phone, visible on desktop */}
              <div className="relative -mt-[4px] lg:-mt-[5px] hidden lg:block">
                <svg className="w-full h-[60px] sm:h-[70px] md:h-[80px] lg:h-[72px] xl:h-[76px] text-[var(--text-primary)]" viewBox="0 0 2500 80" fill="none" preserveAspectRatio="none">
                  <path 
                    d="M10 37 H1400 V53 L1440 37 H2000 Q2300 37 2300 17 V-13" 
                    stroke="currentColor" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 2500,
                      strokeDashoffset: isVisible ? 0 : 2500,
                      transition: 'stroke-dashoffset 1500ms ease-out'
                    }}
                  />
                </svg>
              </div>
              {/* Attribution - professional hierarchy */}
              <div className="mt-6 lg:mt-[10px] text-left pt-5 lg:pt-0 border-t border-[var(--card-border)]/20 lg:border-t-0">
                <p className="text-[15px] sm:text-[16px] md:text-[18px] lg:text-[17px] xl:text-[18px] font-bold text-[var(--text-primary)] tracking-tight">{t('vipin_kumar')}</p>
                <p className="text-[11px] sm:text-[12px] md:text-[14px] lg:text-[14px] xl:text-[15px] text-[var(--text-secondary)] mt-0.5 uppercase tracking-[0.12em] font-medium">{t('managing_director')}</p>
              </div>
              <div className="mt-6 lg:mt-[16px] text-left lg:text-left">
                <a href="#" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto lg:gap-[10px] px-5 py-3 lg:px-[24px] lg:py-[11px] rounded-md lg:rounded-[10px] font-medium text-[13px] lg:text-[15px] border border-[var(--card-border)] text-[var(--text-primary)] bg-transparent hover:bg-[var(--card-bg)] lg:bg-[var(--card-bg)] lg:hover:bg-[var(--background)] active:scale-[0.99] transition-all duration-200">
                  {t('view_profile')}
                  <span className="text-[14px] lg:text-[17px] font-normal opacity-80">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHomeFour;
