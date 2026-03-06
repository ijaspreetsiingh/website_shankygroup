'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FooterFour from '../../home/home4/FooterFour';
import ContactUs from '../../home/home4/vender';

export default function ShankySmartTechPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const heroIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const HERO_SLIDES = [
    { src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80', alt: 'Solar panels - renewable energy', objectPosition: 'center' as const },
    { src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&q=80', alt: 'Solar power installation', objectPosition: 'center bottom' as const },
  ] as const;
  const UNOPTIMIZED = true;
  const HERO_SLIDE_COUNT = HERO_SLIDES.length;

  useEffect(() => {
    heroIntervalRef.current = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % HERO_SLIDE_COUNT);
    }, 4500);
    return () => {
      if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const currentSection = Math.round(scrollTop / windowHeight);
      const clampedSection = Math.min(Math.max(currentSection, 0), 8);
      setActiveSection(clampedSection);
      setScrollProgress(scrollTop / (windowHeight * 9));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (    
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style={{ ['--accent' as string]: '#e63a27', ['--accent-hover' as string]: '#c93222' }}
    >
      {/* Section 1 - Hero (home4 style: top margin + rounded image) */}
      <section 
        className={`fixed top-0 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] pt-32 md:pt-40 lg:pt-44 px-4 md:px-8 lg:px-12 pb-0 bg-[var(--background)] ${
          activeSection === 0 ? 'z-40 translate-y-0 scale-100 opacity-100' : 
          activeSection > 0 ? 'z-40 -translate-y-full scale-95 opacity-0' : 
          'z-40 translate-y-0 scale-100 opacity-100'
        }`}
      >
        <div className="relative h-[65vh] md:h-[70vh] lg:h-[72vh] w-full rounded-2xl overflow-hidden">
          {/* Sliding track: 2 hero images */}
          <div
            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              width: `${HERO_SLIDE_COUNT * 100}%`,
              transform: `translateX(-${heroSlideIndex * (100 / HERO_SLIDE_COUNT)}%)`,
            }}
          >
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.src}
                className="absolute top-0 h-full"
                style={{
                  left: `${idx * (100 / HERO_SLIDE_COUNT)}%`,
                  width: `${100 / HERO_SLIDE_COUNT}%`,
                }}
                aria-hidden={idx !== heroSlideIndex}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover brightness-[0.75]"
                  style={{ objectPosition: slide.objectPosition }}
                  priority={idx === 0}
                  sizes="100vw"
                  unoptimized={UNOPTIMIZED}
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-20 pointer-events-none" />
          {/* Content: left-aligned, vertical centre in main area */}
          <div className="absolute inset-0 flex flex-col z-30">
            <div className="flex-1 flex items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-10 lg:py-14">
              <div className="w-full max-w-xl lg:max-w-2xl text-left">
                <div className="mb-5 lg:mb-6">
                  <span className="inline-block px-4 py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-xs lg:text-sm font-semibold tracking-widest rounded-full uppercase">
                    Solar EPC & Electronics
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15] text-white mb-4 lg:mb-5">
                  SHANKY <span className="text-[#e63a27]">SMART TECH</span> PVT LTD
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-lg text-white/90 leading-relaxed mb-8 lg:mb-10">
                  Solar EPC advisory, energy management systems, IoT-enabled monitoring, and smart building electronics for enterprise clients.
                </p>
              </div>
            </div>
            {/* Breadcrumb: bottom left */}
            <div className="shrink-0 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-4 lg:py-5">
              <nav className="flex items-center text-xs sm:text-sm text-white/90">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="mx-2 sm:mx-2.5 opacity-70">/</span>
                <Link href="/company" className="hover:text-white transition-colors">Our Companies</Link>
                <span className="mx-2 sm:mx-2.5 opacity-70">/</span>
                <span className="text-white font-medium truncate max-w-[160px] sm:max-w-none">Shanky Smart Tech Pvt Ltd</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen" />
      {/* Section 2 - About Us (How It Started – theme-aware for dark/light mode) */}
      <section 
        className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 1 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 1 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="container mx-auto px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 pt-20 sm:pt-24 lg:pt-28 xl:pt-32 pb-5 sm:pb-8 lg:pb-10 h-full flex items-stretch overflow-hidden">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 items-stretch w-full max-w-[90rem] mx-auto py-0 pb-10 min-h-0 overflow-y-auto scrollbar-hide">
              {/* Left: How It Started – text only */}
              <div className="order-2 md:order-1">
                <p className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">
                  Overview
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] text-[var(--text-primary)] tracking-tight mb-3">
                  Shanky Smart Tech <span className="text-[#e63a27]">Pvt Ltd</span>
                </h2>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg leading-[1.6] max-w-xl">
                  Shanky Smart Tech Pvt Ltd operates as a B2B solutions provider at the intersection of renewable energy and smart electronics, under the leadership of Directors Vipin Kumar and Manoj Kumar Mishra. The company serves industrial, commercial, and institutional clients seeking integrated energy and smart technology solutions.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-[var(--background)] rounded-xl p-4 border border-[var(--card-border)]">
                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">B2B Services</h4>
                    <ul className="space-y-1.5">
                      {['Solar EPC advisory for corporate rooftops and campuses', 'Energy management systems', 'IoT-enabled monitoring', 'Procurement and integration of smart building electronics', 'End-to-end project advisory and system integration', 'Post-installation performance contracts for enterprise clients'].map((t, i) => (
                        <li key={i} className="flex items-start gap-1.5"><span className="text-[#e63a27] shrink-0 mt-0.5 text-xs">✓</span><span className="text-[var(--text-secondary)] text-xs leading-snug">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl p-4 border border-[var(--card-border)]">
                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">Value Proposition</h4>
                    <ul className="space-y-1.5">
                      {['Technical design and digital monitoring', 'Lifecycle services', 'Advanced analytics and AI-driven optimization', 'Digital twin simulations', 'Predictable performance and measurable energy savings', 'Sustainability target alignment'].map((t, i) => (
                        <li key={i} className="flex items-start gap-1.5"><span className="text-[#e63a27] shrink-0 mt-0.5 text-xs">✓</span><span className="text-[var(--text-secondary)] text-xs leading-snug">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* Right: Image + 2x2 stats grid */}
              <div className="order-1 md:order-2 space-y-4">
                <div className="relative w-full overflow-hidden rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] xl:h-[360px]">
                  <Image
                    src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80"
                    alt="Shanky Smart Tech - Solar EPC and smart technology"
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, 55vw"
                    unoptimized={UNOPTIMIZED}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: '10+', label: 'Years Experience' },
                    { value: '2014', label: 'Established' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] shadow-sm p-3 sm:p-4"
                    >
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--text-primary)] tracking-tight leading-none">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-[var(--text-secondary)] mt-1 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen"></div>

      {/* Section 3 - Services */}
      <section 
        className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 2 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 2 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="container mx-auto px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-3 sm:py-8 lg:py-10 h-full flex flex-col max-w-[90rem] overflow-y-auto scrollbar-hide">
            <div className="text-center mt-1 sm:mt-6 lg:mt-8 mb-3 sm:mb-6 flex-shrink-0">
              <p className="text-[#e63a27] font-semibold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1 sm:mb-2">What We Offer</p>
              <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-1.5 sm:mb-2 leading-tight">
                B2B <span className="text-[#e63a27]">Services</span>
              </h2>
              <div className="w-16 sm:w-24 h-0.5 bg-[#e63a27] mx-auto mb-2 sm:mb-3 rounded-full" />
              <p className="text-[var(--text-secondary)] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
                Solar EPC advisory, energy management systems, IoT-enabled monitoring, and smart building electronics for enterprise clients.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 pb-16 sm:pb-8">
              {[
                { title: 'Solar EPC Advisory', desc: 'End-to-end advisory for corporate rooftops and campuses; system design and implementation.', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80', bgColor: 'from-blue-900/40' },
                { title: 'Energy Management Systems', desc: 'Integrated energy management and optimization for commercial and industrial sites.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', bgColor: 'from-purple-900/40' },
                { title: 'IoT-Enabled Monitoring', desc: 'Real-time monitoring, analytics, and remote management of energy assets.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', bgColor: 'from-green-900/40' },
                { title: 'Smart Building Electronics', desc: 'Procurement and integration of smart building electronics and controls.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80', bgColor: 'from-orange-900/40' },
              ].map((item, index) => (
                <div key={index} className="group bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--card-border)] hover:border-[#e63a27]/40 hover:shadow-lg transition-all duration-300 flex flex-col min-h-[280px] sm:min-h-[320px]">
                  <div className="relative w-full h-32 sm:h-40 md:h-44 lg:h-48 overflow-hidden bg-[var(--card-bg)]">
                    <Image src={item.image} alt={item.title} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" unoptimized={UNOPTIMIZED} />
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.bgColor} via-transparent to-transparent opacity-90`} />
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                      <span className="inline-block px-2 py-1 sm:px-3 sm:py-1.5 bg-[#e63a27] text-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase rounded-full shadow-lg">{item.title}</span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 flex-1 flex flex-col">
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-[var(--text-primary)] group-hover:text-[#e63a27] transition-colors line-clamp-1 mb-1.5 sm:mb-2">{item.title}</h3>
                    <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3 sm:line-clamp-2 mb-2 sm:mb-3 flex-1">{item.desc}</p>
                    <div className="mt-auto pt-2 border-t border-[var(--card-border)]/80">
                      <span className="inline-flex items-center text-[10px] sm:text-xs font-semibold text-[#e63a27] group-hover:gap-1.5 transition-all gap-1 cursor-pointer active:opacity-80">
                        Learn more
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 sm:hidden">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#e63a27]/50 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#e63a27]/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#e63a27]/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen"></div>

      {/* Section 4 - Value Proposition */}
      <section 
        className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 3 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 3 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)] flex flex-col min-h-0">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #e63a27 1px, transparent 1px), radial-gradient(circle at 80% 80%, #e63a27 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10 flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide max-w-[90rem]">
            <div className="min-h-[min-content] pb-8">
            <div className="rounded-2xl overflow-hidden mb-8 lg:mb-10 border border-[var(--card-border)] shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[200px] sm:min-h-[240px]">
                <div className="lg:col-span-5 relative w-full aspect-[2/1] lg:aspect-[4/3] lg:min-h-[240px]">
                  <Image
                    src="https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&q=85"
                    alt="Value proposition - energy and smart technology"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    unoptimized={UNOPTIMIZED}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:from-black/50" />
                  <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6">
                    <p className="text-white/90 text-xs font-semibold tracking-widest uppercase">Our Edge</p>
                    <p className="text-white text-2xl sm:text-3xl font-bold mt-1">Technical design. Digital monitoring. Lifecycle services.</p>
                  </div>
                </div>
                <div className="lg:col-span-7 bg-gradient-to-br from-[#e63a27] to-[#c93222] p-6 sm:p-8 flex flex-col justify-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                    Value <span className="text-white/90">Proposition</span>
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base max-w-xl mb-6">
                    Shanky Smart Tech combines technical design, digital monitoring, and lifecycle services to help businesses reduce energy costs and meet sustainability targets. Advanced analytics, AI-driven optimization, and digital twin simulations enable predictable performance and measurable energy savings.
                  </p>
                  <div className="flex flex-wrap gap-6 sm:gap-10">
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Design</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Technical & digital</p>
                    </div>
                    <div className="w-px bg-white/30 hidden sm:block" />
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Analytics</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">AI-driven</p>
                    </div>
                    <div className="w-px bg-white/30 hidden sm:block" />
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Savings</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Measurable</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-10">
              <div className="group bg-[var(--card-bg)] rounded-2xl p-5 sm:p-6 lg:p-7 border-2 border-[var(--card-border)] hover:border-[#e63a27]/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">What We Deliver</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)] rounded-xl p-4 sm:p-5 border-l-4 border-[#e63a27] shadow-sm">
                    <h4 className="text-base font-bold text-[var(--text-primary)] mb-2">Technical design & digital monitoring</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      End-to-end design and real-time digital monitoring for energy and smart building systems.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)] rounded-xl p-4 sm:p-5 border-l-4 border-[#e63a27]/70 shadow-sm">
                    <h4 className="text-base font-bold text-[var(--text-primary)] mb-2">Lifecycle services</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      Support from design and installation through operation and maintenance for sustained performance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group bg-[var(--card-bg)] rounded-2xl p-5 sm:p-6 lg:p-7 border-2 border-[var(--card-border)] hover:border-[#e63a27]/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">How We Enable Outcomes</h3>
                </div>
                <div className="space-y-3">
                  {[
                    'Advanced analytics for energy and asset performance.',
                    'AI-driven optimization for cost and efficiency.',
                    'Digital twin simulations for predictable performance.',
                    'Measurable energy savings and sustainability reporting.',
                  ].map((text, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="w-7 h-7 rounded-full bg-[#e63a27] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">{i + 1}</span>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed pt-0.5">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 lg:mb-10">
              {[
                { title: 'Technical Design', desc: 'Engineering & integration', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                { title: 'Digital Monitoring', desc: 'Real-time visibility', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                { title: 'Lifecycle Services', desc: 'End-to-end support', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
                { title: 'Digital Twin', desc: 'Predictable performance', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              ].map((item) => (
                <div key={item.title} className="group bg-[var(--card-bg)] rounded-2xl p-5 border-2 border-[var(--card-border)] hover:border-[#e63a27]/40 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27]/15 group-hover:bg-[#e63a27]/25 flex items-center justify-center mb-4 transition-colors">
                    <svg className="w-6 h-6 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  </span>
                  <h4 className="text-[var(--text-primary)] font-bold text-base mb-1">{item.title}</h4>
                  <p className="text-[var(--text-secondary)] text-sm leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden border-2 border-[var(--card-border)] shadow-lg">
              <div className="bg-[var(--card-bg)] px-5 sm:px-6 lg:px-8 py-5 border-b border-[var(--card-border)]">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Why It Matters</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'Lower Energy Costs', desc: 'Measurable reduction in operational spend' },
                  { title: 'Sustainability Targets', desc: 'Alignment with green and ESG goals' },
                  { title: 'Predictable Performance', desc: 'Digital twin and analytics-driven' },
                  { title: 'AI-Driven Optimization', desc: 'Continuous efficiency gains' },
                  { title: 'Lifecycle Support', desc: 'Design to operation and maintenance' },
                  { title: 'Enterprise-Grade', desc: 'Scalable solutions for large sites' },
                ].map((item, idx) => (
                  <div key={item.title} className={`flex items-start gap-4 p-5 sm:p-6 border-[var(--card-border)] hover:bg-[#e63a27]/5 transition-colors border-b ${idx >= 3 ? 'sm:border-b-0' : ''}`}>
                    <span className="w-10 h-10 rounded-lg bg-[#e63a27] flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <div>
                      <h4 className="text-[var(--text-primary)] font-bold text-sm sm:text-base mb-0.5">{item.title}</h4>
                      <p className="text-[var(--text-secondary)] text-xs sm:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen"></div>

      {/* Section 5 - Vision, Mission & Vendor Finance (home4 style) */}
      <section 
        className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 4 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 4 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-12 xl:py-16 h-full flex flex-col overflow-y-auto scrollbar-hide max-w-[90rem]">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">Clients & Quality</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                Clients, Partnerships & <span className="text-[#e63a27]">Compliance</span>
              </h2>
              <div className="w-[80px] h-[4px] bg-[#e63a27] mx-auto mb-4 rounded-[2px]" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#e63a27] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27]">Clients and Partnerships</h3>
                </div>
                <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                  Clients include industrial parks, commercial real estate owners, educational campuses, and large corporates. The company partners with component manufacturers, system integrators, and financing partners to deliver scalable, enterprise-grade solutions.
                </p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#e63a27] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27]">Compliance and Quality</h3>
                </div>
                <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                  Deliverables conform to industry standards for electrical safety, renewable integration, and green building requirements. Service agreements include performance guarantees, SLAs, and remote monitoring to ensure contractual outcomes.
                </p>
              </div>
            </div>
            <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
              <h3 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
                <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                Growth Focus
              </h3>
              <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                  Shanky Smart Tech is focused on expanding B2B service contracts, embedding predictive maintenance offerings, and delivering integrated energy-as-a-service models that align capital expenditure with operational savings.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Key Growth Areas</h4>
                  <ul className="space-y-3">
                    {['Electrical safety', 'Renewable integration', 'Green building requirements', 'Performance guarantees', 'SLAs', 'Remote monitoring'].map((text, i) => (
                      <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{text}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Partnership Values</h4>
                  <ul className="space-y-3">
                    {['B2B service contracts', 'Predictive maintenance offerings', 'Integrated energy-as-a-service models', 'Capital expenditure alignment with operational savings'].map((text, i) => (
                      <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{text}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen"></div>

      {/* Section 6 - Dealer, Factoring, Sales Invoice (home4 style) */}
      <section 
        className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 5 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 5 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-12 xl:py-16 h-full flex flex-col overflow-y-auto scrollbar-hide">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">How We Deliver</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                End-to-end & <span className="text-[#e63a27]">Performance</span>
              </h2>
              <div className="w-[80px] h-[4px] bg-[#e63a27] mx-auto mb-4 rounded-[2px]" />
            </div>

            <div className="space-y-8 lg:space-y-12">
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27] mb-4 lg:mb-6 flex items-center">
                  <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h1m-1 4h1m4-4h1m-1 4h1m-5-10v-2a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h.01" /></svg>
                  </div>
                  End-to-end Project Advisory
                </h3>
                <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                  We provide end-to-end project advisory for solar EPC and smart building solutions. From design and procurement to system integration and commissioning, we ensure enterprise clients get a single point of accountability and seamless execution.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Advisory & Design</h4>
                    <ul className="space-y-3">
                      {['Solar EPC advisory for rooftops and campuses', 'System design and sizing', 'Integration planning', 'Technical feasibility'].map((t, i) => (
                        <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Execution</h4>
                    <ul className="space-y-3">
                      {['Procurement and integration', 'System integration', 'Commissioning and handover', 'Post-installation support'].map((t, i) => (
                        <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27] mb-4 lg:mb-6 flex items-center">
                  <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  Performance Contracts & Energy-as-a-Service
                </h3>
                <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                  Post-installation performance contracts and integrated energy-as-a-service models align capital expenditure with operational savings. We focus on expanding B2B service contracts, embedding predictive maintenance offerings, and delivering outcomes that matter to enterprise clients.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Performance Guarantees</h4>
                    <ul className="space-y-3">
                      {['SLAs and performance guarantees', 'Remote monitoring', 'Predictive maintenance', 'Contractual outcomes'].map((t, i) => (
                        <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Growth Focus</h4>
                    <ul className="space-y-3">
                      {['Expanding B2B service contracts', 'Predictive maintenance offerings', 'Energy-as-a-service models', 'CapEx aligned with operational savings'].map((t, i) => (
                        <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen"></div>

      {/* Section 7 - Why We Are Best & Contact (home4 style) */}
      <section 
        className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 6 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 6 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-12 xl:py-16 h-full flex flex-col overflow-y-auto scrollbar-hide">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">Why Choose Us</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                Why We Are <span className="text-[#e63a27]">Best</span>
              </h2>
              <div className="w-[80px] h-[4px] bg-[#e63a27] mx-auto mb-4 rounded-[2px]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {[
                  { icon: '⚡', title: 'Technical Excellence', desc: 'Cutting-edge technology integration' },
                  { icon: '🏭', title: 'Smart Solutions', desc: 'IoT-enabled energy management' },
                  { icon: '🌱', title: 'Sustainable Design', desc: 'Green building certifications' },
                  { icon: '📈', title: 'Scalable Systems', desc: 'Enterprise-grade solutions' },
                  { icon: '�', title: 'Cost Optimization', desc: 'Measurable energy savings' },
                  { icon: '🤝', title: 'Partnership Focus', desc: 'Long-term client relationships' },
                  { icon: '�', title: 'Industry Leadership', desc: 'B2B solar EPC and smart tech' },
                  { icon: '❄', title: 'Quality Assurance', desc: 'Safety and compliance standards' },
                  { icon: '📊', title: 'Innovation Focus', desc: 'AI-driven optimization and analytics' },
              ].map((item) => (
                <div key={item.title} className="bg-[var(--card-bg)] rounded-2xl p-4 sm:p-6 border border-[var(--card-border)] hover:border-[#e63a27]/50 transition-all">
                  <div className="text-2xl sm:text-3xl mb-2 text-[#e63a27]">{item.icon}</div>
                  <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1 sm:mb-2">{item.title}</h4>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)] mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27] mb-4">Our Strengths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Technical design and digital monitoring', 'End-to-end project advisory and system integration', 'Post-installation performance contracts', 'Electrical safety and green building compliance', 'IoT-enabled monitoring and analytics', 'Enterprise-grade scalable solutions'].map((t, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <span className="text-[#e63a27] text-xl">✓</span>
                    <span className="text-[var(--text-secondary)]">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen" />

      {/* Section 8 - Contact Us */}
      <section
        className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 7 ? 'z-50 translate-y-0 scale-100 opacity-100' :
          activeSection > 7 ? 'z-50 -translate-y-full scale-95 opacity-0' :
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] border-t border-[var(--card-border)] overflow-y-auto overflow-x-hidden scrollbar-hide">
          <ContactUs />
          <div className="shrink-0 w-full">
            <FooterFour />
          </div>
        </div>
      </section>

      <div className="h-screen" />
    </div>
  );
}