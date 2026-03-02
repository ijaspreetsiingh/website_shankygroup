 'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import WhoWeAreNav from '../WhoWeAreNav';
import mission1Image from '../../images/mission1.png';

const ACCENT = '#e63a27';
const ACCENT_HOVER = '#c93222';

const MissionVisionPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const checkDark = () => {
      const dark = typeof document !== 'undefined' && (document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark');
      setIsDark(!!dark);
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    if (typeof document !== 'undefined') observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className="relative w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]"
        style={{ ['--accent' as string]: ACCENT, ['--accent-hover' as string]: ACCENT_HOVER }}
      >
        {/* Hero - mission vision (lightbulb / ideas) */}
        <section className="relative w-full pt-4 md:pt-6 lg:pt-8 px-4 md:px-8 lg:px-12 pb-0 bg-[var(--background)]">
          <div className="relative h-[68vh] md:h-[72vh] lg:h-[75vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-[var(--card-border)]">
            <Image
              src={mission1Image}
              alt="Mission & Vision - Ideas and innovation - Shanky Group"
              fill
              className="object-cover object-[center_28%] brightness-[0.85]"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-black/25 z-20 pointer-events-none" />
            <div className="absolute inset-0 flex flex-col z-30">
              <div className="flex-1 flex items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-10 lg:py-16 pt-14 md:pt-20 lg:pt-24">
                <div className="w-full max-w-3xl lg:max-w-4xl text-left">
                  <span className="inline-block px-4 py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-xs lg:text-sm font-semibold tracking-widest rounded-full uppercase mb-5 lg:mb-6 shadow-lg shadow-[#e63a27]/30">
                    Who We Are
                  </span>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] text-white mb-4 lg:mb-5 drop-shadow-lg">
                    Mission & <span className="text-[#e63a27]">Vision</span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl max-w-2xl text-white/95 leading-relaxed mb-8 lg:mb-10">
                    What drives us: clarity of purpose, excellence in execution, and lasting value for everyone we touch.
                  </p>
                  <div className="flex flex-wrap gap-6 md:gap-10">
                    <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-4 max-w-sm">
                      <h2 className="text-[#e63a27] font-bold text-lg mb-1">Our Vision</h2>
                      <p className="text-white/95 text-sm leading-snug">A premium global conglomerate with clear focus in each business.</p>
                    </div>
                    <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-4 max-w-sm">
                      <h2 className="text-[#e63a27] font-bold text-lg mb-1">Our Mission</h2>
                      <p className="text-white/95 text-sm leading-snug">Superior value to customers, shareholders, employees, and society.</p>
                    </div>
                  </div>
                  {!isDark && (
                    <div className="mt-6 lg:mt-8">
                      <WhoWeAreNav />
                    </div>
                  )}
                </div>
              </div>
              <div className="shrink-0 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-4 lg:py-5">
                <nav className="flex items-center text-xs sm:text-sm text-white/90 flex-wrap gap-x-2 gap-y-1">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <span className="opacity-70">/</span>
                  <Link href="/who-we-are" className="hover:text-white transition-colors">Who We Are</Link>
                  <span className="opacity-70">/</span>
                  <span className="text-white font-medium">Mission & Vision</span>
                </nav>
              </div>
            </div>
          </div>
        </section>

      <section
        ref={sectionRef}
        className="mission-vision-content-section relative overflow-hidden bg-[var(--background)] py-20 md:py-24 lg:py-28 px-4 md:px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(230,58,39,0.02)] to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className="text-center mb-12 md:mb-16"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s'
            }}
          >
            <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase">Guiding principles</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mt-2 mb-4 tracking-tight">
              What We Stand For
            </h2>
            <div className="w-14 h-1 bg-[#e63a27] mx-auto mb-6 rounded-full" />
            <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Our principles shape every decision, action, and aspiration for a better future.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-16 md:mb-24">
            {/* Mission Card */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: '0.2s'
              }}
            >
              <div className="h-full rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                <div>
                  <span className="text-[#e63a27] text-xs font-semibold tracking-widest uppercase">Purpose & Values</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mt-2 mb-5">Our Mission</h3>
                  <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                    Deliver superior value to customers, partners, employees, and society through innovative solutions, operational excellence, and ethical business practices. Drive sustainable growth by leveraging sectoral synergies, investing in talent and technology, and embracing responsible business practices. Foster a culture of integrity, collaboration, and continuous improvement, empowering teams to achieve their fullest potential and contribute to the Group&apos;s long-term success. Champion sustainability and social responsibility by integrating environmental, social, and governance (ESG) principles into all aspects of business operations.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: '0.35s'
              }}
            >
              <div className="h-full rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                <div>
                  <span className="text-[#c93222] text-xs font-semibold tracking-widest uppercase">Future & Aspirations</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mt-2 mb-5">Our Vision</h3>
                  <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                    To be a leading diversified conglomerate, recognized for operational excellence, innovation, and sustainable value creation across all sectors of operation. Shanky Group aspires to set benchmarks in each industry it serves, fostering growth, trust, and prosperity for all stakeholders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values - with icons */}
          <div
            className="core-values-block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.5s'
            }}
          >
            <span className="block text-center text-[var(--text-secondary)] text-xs font-semibold tracking-[0.2em] uppercase mb-2">What we stand for</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] text-center mb-10 md:mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { title: 'Integrity', description: 'Upholding ethical standards in all our actions', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                { title: 'Excellence', description: 'Striving for the highest quality in everything', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
                { title: 'Innovation', description: 'Embracing creativity and new ideas', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
                { title: 'Sustainability', description: 'Building a better future for generations', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M12 20.065V18.5a2.5 2.5 0 00-2.5-2.5h-.5a2 2 0 00-2 2 2 2 0 01-4 0h-.5A2.5 2.5 0 008 18.5v1.565M12 3.935a10 10 0 10 0 16.13' }
              ].map((value, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 md:p-7 text-center hover:border-[#e63a27]/40 hover:shadow-lg transition-all duration-300 group"
                >
                  <span className="inline-flex w-14 h-14 rounded-xl bg-[#e63a27]/15 text-[#e63a27] items-center justify-center mb-4 group-hover:bg-[#e63a27]/25 transition-colors mx-auto">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} /></svg>
                  </span>
                  <h3 className="text-lg font-bold text-[#e63a27] mb-2">{value.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-snug">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Priorities */}
          <div
            className="mt-16 md:mt-20"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.65s'
            }}
          >
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 md:p-10 lg:p-12 shadow-md">
              <span className="block text-center text-[var(--text-secondary)] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Focus areas</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] text-center mb-10 md:mb-12">Strategic Priorities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {[
                  { title: 'Digital Transformation', description: 'Leveraging technology to drive efficiency and innovation across all business units.', metrics: ['50% Digital Operations', 'AI Integration', 'Cloud First Strategy'] },
                  { title: 'Sustainable Growth', description: 'Balancing economic success with environmental and social responsibility.', metrics: ['Carbon Neutral by 2030', '100% Renewable Energy', 'Zero Waste Operations'] },
                  { title: 'Market Expansion', description: 'Growing our global footprint while strengthening local market presence.', metrics: ['15 New Markets', 'Strategic Partnerships', 'Local Leadership Development'] }
                ].map((priority, index) => (
                  <div key={index} className="rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-6 md:p-7">
                    <div className="w-10 h-1 bg-[#e63a27] rounded-full mb-4" />
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{priority.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">{priority.description}</p>
                    <ul className="space-y-2">
                      {priority.metrics.map((m, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e63a27] shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA strip */}
          <div
            className="mt-20 md:mt-24 rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)] shadow-lg"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.8s'
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 md:p-10 lg:p-12">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">Explore more</h3>
                <p className="text-[var(--text-secondary)] text-sm md:text-base">See our companies, careers, and how we work.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link href="/company" className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm md:text-base">
                  Our Companies
                </Link>
                <Link href="/careers" className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 border-2 border-[#e63a27] text-[#e63a27] hover:bg-[#e63a27] hover:text-white font-semibold rounded-xl transition-all text-sm md:text-base">
                  Careers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default MissionVisionPage;
