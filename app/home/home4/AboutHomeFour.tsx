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
    <section ref={sectionRef} className="bg-[var(--background)] p-0 w-screen overflow-x-hidden h-[750px] lg:h-[80vh]">
      <div className="py-[60px] md:py-[90px] h-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 h-full">
          {/* Mobile Image - Full Width */}
          <div className={`lg:hidden order-1 h-[300px] transition-all duration-1000 ease-out`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-100px)' }}>
            <div className="relative h-full w-full overflow-hidden">
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
          <div className={`hidden lg:block order-1 lg:order-1 h-full lg:col-span-2 transition-all duration-1000 ease-out overflow-hidden rounded-r-[12px] lg:rounded-r-[16px]`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-100px)' }}>
            <div className="relative w-full h-full overflow-hidden rounded-r-[12px] lg:rounded-r-[16px]">
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
          
          {/* Content - Mobile Full Width, Desktop Right Side */}
          <div className={`order-2 lg:order-2 p-[16px] sm:p-[20px] md:p-[30px] lg:p-[40px] flex flex-col justify-center lg:col-span-3 lg:pl-[60px] lg:pr-[40px] transition-all duration-1000 ease-out delay-300`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(100px)' }}>
            <div className={`relative max-w-full sm:max-w-[500px] md:max-w-[630px] lg:max-w-[700px] lg:translate-x-[110px] transition-all duration-700`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)' }}>

              <p className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[22px] leading-[1.6] sm:leading-[1.65] text-[var(--text-primary)] text-center lg:text-left">
                <span className="font-semibold">"{t('about_quote')}"</span>
              </p>
              <div className="relative -mt-[4px] sm:-mt-[5px]">
                <svg className="w-full h-[60px] sm:h-[70px] md:h-[80px] text-[var(--text-primary)]" viewBox="0 0 2500 80" fill="none" preserveAspectRatio="none">
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
              <div className="mt-[8px] sm:mt-[10px] text-center lg:text-left">
                <div className="text-[15px] sm:text-[16px] md:text-[18px] font-bold text-[var(--text-primary)]">{t('vipin_kumar')}</div>
                <div className="text-[12px] sm:text-[13px] md:text-[14px] text-[var(--text-secondary)]">{t('managing_director')}</div>
              </div>
              <div className="mt-[14px] sm:mt-[16px] md:mt-[18px] text-center lg:text-left">
                <a href="#" className="inline-flex items-center gap-[8px] sm:gap-[10px] px-[18px] sm:px-[22px] py-[8px] sm:py-[10px] rounded-[8px] sm:rounded-[10px] font-semibold text-[13px] sm:text-[14px] border border-[var(--card-border)] text-[var(--text-primary)] bg-[var(--card-bg)] hover:bg-[var(--background)] transition-colors duration-200">
                  {t('view_profile')}
                  <span className="text-[14px] sm:text-[16px] font-bold">→</span>
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
