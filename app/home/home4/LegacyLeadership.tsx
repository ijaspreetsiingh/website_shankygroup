'use client';

import { useState, useEffect, useRef } from "react";

const PRINCIPLES = [
  'Integrity in every transaction',
  'Innovation across sectors',
  'Risk mitigation through robust structures',
  'Empowerment of teams and executives',
  'Long-term partnerships built on trust',
];

const LegacyLeadership = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.08, rootMargin: '0px 0px -80px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Content grid - no duplicate heading */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 pt-10 sm:pt-12 md:pt-14 pb-16 sm:pb-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Card: A Legacy of Excellence */}
          <div
            className={`rounded-xl md:rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-500 delay-75 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] m-0" style={{ fontFamily: '"Inter", sans-serif' }}>
                A Legacy of Excellence
              </h3>
            </div>
            <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-[1.7] m-0" style={{ fontFamily: '"Inter", sans-serif' }}>
              Founded with a vision to create impact across diverse industries, Shanky Group has built a reputation for trust, innovation, and resilience. Over the years, the Group has expanded into electronics, metals, financial services, Agri Products, Infrastructure and corporate training—consistently delivering value to clients and partners.
            </p>
          </div>

          {/* Card: Leadership that Inspires */}
          <div
            className={`rounded-xl md:rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-500 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] m-0" style={{ fontFamily: '"Inter", sans-serif' }}>
                Leadership that Inspires
              </h3>
            </div>
            <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-[1.7] m-0" style={{ fontFamily: '"Inter", sans-serif' }}>
              At the helm, Shanky Group&apos;s leadership combines strategic foresight with hands-on execution. The Group&apos;s senior executive and owner has steered growth through bold investments, operational discipline, and a commitment to transparency—emphasizing collaboration, compliance, and investor confidence for sustainable success.
            </p>
          </div>
        </div>

        {/* Guiding Principles - full width card */}
        <div
          className={`mt-6 md:mt-8 rounded-xl md:rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <div className="mb-5">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] m-0" style={{ fontFamily: '"Inter", sans-serif' }}>
              Guiding Principles
            </h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 list-none p-0 m-0">
            {PRINCIPLES.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm sm:text-[15px] text-[var(--text-secondary)]">
                <span className="text-[#e63a27] mt-0.5 shrink-0" aria-hidden>•</span>
                <span className="leading-[1.6]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Future-Oriented Vision */}
        <div
          className={`mt-6 md:mt-8 rounded-xl md:rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] m-0" style={{ fontFamily: '"Inter", sans-serif' }}>
              Future-Oriented Vision
            </h3>
          </div>
          <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-[1.7] m-0" style={{ fontFamily: '"Inter", sans-serif' }}>
            Shanky Group&apos;s leadership is not only about preserving its legacy but also about shaping the future. By embracing new technologies, strengthening investor relations, and expanding into emerging markets, the Group continues to set benchmarks for excellence in diversified business operations.
          </p>
        </div>

      </div>
    </section>
  );
};

export default LegacyLeadership;
