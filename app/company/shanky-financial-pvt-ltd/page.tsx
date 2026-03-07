'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FooterFour from '../../home/home4/FooterFour';
import ContactUs from '../../home/home4/vender';

/** Scroll-triggered fade-in-up animation when element enters viewport */
function AnimateInView({
  children,
  className = '',
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export default function ShankyFinancialScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const heroIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Slide 1: any; Slides 2–4: images with content on right, empty on left (object-position left for text overlay)
  const HERO_SLIDES = [
    { src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&q=80', alt: 'Financial Services Excellence', objectPosition: 'center' as const },
    { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1920&q=80', alt: 'Business Finance', objectPosition: 'left' as const },
    { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80', alt: 'Corporate Banking', objectPosition: 'left' as const },
    { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80', alt: 'Growth & Investment', objectPosition: 'left' as const },
  ] as const;
  const HERO_SLIDE_COUNT = HERO_SLIDES.length;

  useEffect(() => {
    heroIntervalRef.current = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % HERO_SLIDE_COUNT);
    }, 4500);
    return () => {
      if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);
    };
  }, []);

  return (    
    <div
      ref={containerRef}
      className="company-financial-root relative w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style={{ ['--accent' as string]: '#e63a27', ['--accent-hover' as string]: '#c93222' }}
    >
      {/* Careers jaisa heading font: Syne, bold, 0.04em tracking – isi page par force */}
      <style dangerouslySetInnerHTML={{ __html: `
        .company-financial-root .section-heading,
        .company-financial-root h1, .company-financial-root h2, .company-financial-root h3, .company-financial-root h4 {
          font-family: var(--font-syne), 'Syne', 'Inter', Arial, sans-serif !important;
          font-weight: 700 !important;
          letter-spacing: 0.04em !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}} />
      {/* Section 1 - Hero */}
      <section className="relative w-full pt-2 sm:pt-3 md:pt-4 px-3 sm:px-4 md:px-8 lg:px-12 pb-8 bg-[var(--background)]">
        <div className="relative h-[58vh] min-h-[280px] min-[375px]:min-h-[300px] sm:min-h-[360px] sm:h-[65vh] md:h-[70vh] lg:h-[72vh] w-full rounded-xl sm:rounded-2xl overflow-hidden">
          {/* Sliding track: absolute slides so all 4 images render and show correctly */}
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
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-20 pointer-events-none" />
          {/* Content: left-aligned, vertical centre in main area */}
          <div className="absolute inset-0 flex flex-col z-30">
            <div className="flex-1 flex items-center min-h-0 px-3 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-4 min-[375px]:py-5 sm:py-8 md:py-10 lg:py-14 overflow-y-auto scrollbar-hide">
              <div
                className={`w-full max-w-xl lg:max-w-2xl text-left space-y-4 sm:space-y-5 md:space-y-6 transition-all duration-700 ease-out ${
                  heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div>
                  <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-[10px] min-[375px]:text-[11px] sm:text-xs lg:text-sm font-semibold tracking-[0.12em] sm:tracking-widest rounded-full uppercase">
                    Established Excellence Since 2011
                  </span>
                </div>
                <h1 className="section-heading text-2xl min-[360px]:text-3xl min-[400px]:text-4xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold leading-[1.15] sm:leading-[1.12] text-white drop-shadow-md">
                  <span className="block">SHANKY <span className="text-[#e63a27]">FINANCIAL</span> SERVICES</span>
                  <span className="block mt-0.5 sm:mt-1 text-[#e63a27]">PVT LTD</span>
                </h1>
                <p className="text-xs min-[375px]:text-sm sm:text-base md:text-lg lg:text-xl max-w-lg text-white/95 leading-relaxed font-medium">
                  Best financial service provider company based in Delhi, India
                </p>
              </div>
            </div>
            {/* Breadcrumb: bottom left */}
            <div className="shrink-0 px-3 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-2.5 min-[375px]:py-3 sm:py-4 lg:py-5">
              <nav className="flex items-center text-[10px] min-[375px]:text-[11px] sm:text-xs md:text-sm text-white/90 flex-wrap gap-x-1 gap-y-0.5">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="opacity-70">/</span>
                <Link href="/company" className="hover:text-white transition-colors">Our Companies</Link>
                <span className="opacity-70">/</span>
                <span className="text-white font-medium truncate max-w-[120px] min-[380px]:max-w-[160px] sm:max-w-none">Shanky Financial Services Pvt Ltd</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - About Us */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden">
          <AnimateInView>
          <div className="container mx-auto px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-12 sm:py-16 lg:py-20">
            <div className="grid md:grid-cols-[1fr_1.15fr] lg:grid-cols-[1fr_1.25fr] gap-4 sm:gap-6 lg:gap-8 xl:gap-10 items-stretch w-full max-w-[90rem] mx-auto">
              {/* Left: How It Started – text only */}
              <div className="order-2 md:order-1 min-w-0 flex flex-col justify-center">
                <p className="text-[#e63a27] font-semibold text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
                  Overview
                </p>
                <p className="text-[var(--text-secondary)] text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.65] max-w-2xl mb-4 sm:mb-0 font-medium">
                  Shanky Financial Services Pvt Ltd is a private B2B financial intermediary led by Directors Vipin Kumar and Manoj Kumar Mishra. The company delivers institutional-grade investment and trading services tailored for corporate clients, asset managers, family offices, and other financial institutions.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                  <div className="bg-[var(--background)] rounded-xl p-4 sm:p-6 border border-[var(--card-border)]">
                    <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 sm:mb-4">B2B Services</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {['Investment in securities', 'Proprietary trading', 'Market-making support', 'Structured solutions for corporate treasuries'].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><span className="text-[#e63a27] shrink-0 mt-0.5">✓</span><span className="text-[var(--text-secondary)] text-xs sm:text-sm">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl p-4 sm:p-6 border border-[var(--card-border)]">
                    <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 sm:mb-4">Value Proposition</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {['Deep market access', 'Disciplined risk controls', 'Institutional execution capabilities', 'Research-driven approach'].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><span className="text-[#e63a27] shrink-0 mt-0.5">✓</span><span className="text-[var(--text-secondary)] text-xs sm:text-sm">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* Right: Image + 2x2 stats grid */}
              <div className="order-1 md:order-2 space-y-3 sm:space-y-5 min-w-0 flex flex-col justify-center">
                <div className="relative w-full overflow-hidden rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] aspect-[4/3] min-h-[220px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[320px] max-h-[50vh] sm:max-h-[55vh] md:max-h-[420px]">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                    alt="Shanky Financial Services team"
                    fill
                    className="object-cover object-center rounded-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 55vw, 60vw"
                  />
                </div>
              </div>
            </div>
          </div>
          </AnimateInView>
        </div>
      </section>

      {/* Section 3 - Services */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
  <div className="relative w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden">
    <AnimateInView>
    <div className="container mx-auto px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-12 sm:py-16 lg:py-20 max-w-[90rem]">
      
      {/* Header Section - Fixed visibility on mobile */}
      <div className="text-center mt-1 sm:mt-6 lg:mt-8 mb-3 sm:mb-6 flex-shrink-0">
        <p className="text-[#e63a27] font-semibold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1 sm:mb-2">B2B Services</p>
        <h2 className="section-heading text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-1.5 sm:mb-2 leading-tight">
          Institutional <span className="text-[#e63a27]">Services</span>
        </h2>
        <div className="w-16 sm:w-24 h-0.5 bg-[#e63a27] mx-auto mb-2 sm:mb-3 rounded-full" />
        <p className="text-[var(--text-secondary)] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
          Bespoke portfolio structuring, liquidity management, execution services, and short-term proprietary strategies
        </p>
      </div>

      {/* Cards Grid - Mobile optimized with better visibility */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 pb-16 sm:pb-8">
        {[
          { 
            title: 'Investment in Securities', 
            desc: 'Institutional-grade investment opportunities and portfolio management.',
            image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
            bgColor: 'from-blue-900/40'
          },
          { 
            title: 'Proprietary Trading', 
            desc: 'Short-term proprietary strategies designed to complement client risk profiles.',
            image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80',
            bgColor: 'from-purple-900/40'
          },
          { 
            title: 'Market-Making Support', 
            desc: 'Liquidity provision and market infrastructure services.',
            image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80',
            bgColor: 'from-green-900/40'
          },
          { 
            title: 'Corporate Treasury Solutions', 
            desc: 'Structured solutions for corporate liquidity and investment needs.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
            bgColor: 'from-orange-900/40'
          },
        ].map((item, index) => (
          <AnimateInView key={index} delayMs={index * 80}>
          <div 
            className="group bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--card-border)] hover:border-[#e63a27]/40 hover:shadow-lg transition-all duration-300 flex flex-col min-h-[280px] sm:min-h-[320px]"
          >
            {/* Image Container - Better mobile aspect ratio */}
            <div className="relative w-full h-32 sm:h-40 md:h-44 lg:h-48 overflow-hidden bg-[var(--background)]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={index < 2}
              />
              {/* Gradient Overlay for better text visibility */}
              <div className={`absolute inset-0 bg-gradient-to-t ${item.bgColor} via-transparent to-transparent opacity-90`} />
              
              {/* Title Badge - Better positioned for mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                <span className="inline-block px-2 py-1 sm:px-3 sm:py-1.5 bg-[#e63a27] text-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase rounded-full shadow-lg">
                  {item.title}
                </span>
              </div>
            </div>

            {/* Content Section - Better spacing for mobile */}
            <div className="p-3 sm:p-4 flex-1 flex flex-col">
              <h3 className="section-heading text-xs sm:text-sm md:text-base font-bold text-[var(--text-primary)] group-hover:text-[#e63a27] transition-colors line-clamp-1 mb-1.5 sm:mb-2">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3 sm:line-clamp-2 mb-2 sm:mb-3 flex-1">
                {item.desc}
              </p>
              
              {/* Learn More Link - Better touch target */}
              <div className="mt-auto pt-2 border-t border-[var(--card-border)]/80">
                <span className="inline-flex items-center text-[10px] sm:text-xs font-semibold text-[#e63a27] group-hover:gap-1.5 transition-all gap-1 cursor-pointer active:opacity-80">
                  Learn more
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          </AnimateInView>
        ))}
      </div>

      {/* Optional: scroll indicator for mobile - removed for normal scroll */}
      </div>
    </AnimateInView>
    </div>
</section>

      {/* Section 4 - Bill Discounting */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #e63a27 1px, transparent 1px), radial-gradient(circle at 80% 80%, #e63a27 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <AnimateInView>
          <div className="container relative mx-auto px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20 max-w-[90rem]">
            {/* Hero strip: image + headline + stat */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden mb-5 sm:mb-8 lg:mb-10 border border-[var(--card-border)] shadow-xl shrink-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[180px] sm:min-h-[200px] lg:min-h-[240px]">
                <div className="lg:col-span-5 relative w-full aspect-[2/1] sm:aspect-[16/10] lg:aspect-[4/3] lg:min-h-[240px] min-h-[160px] sm:min-h-[200px]">
                  <Image
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=85"
                    alt="Bill discounting and invoice finance"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:from-black/50" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6">
                    <p className="text-white/90 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">Invoice Finance</p>
                    <p className="text-white text-lg sm:text-2xl md:text-3xl font-bold mt-0.5 sm:mt-1">Turn bills into cash.</p>
                  </div>
                </div>
                <div className="lg:col-span-7 bg-gradient-to-br from-[#e63a27] to-[#c93222] p-4 sm:p-6 md:p-8 flex flex-col justify-center min-h-[140px] sm:min-h-0">
                  <h2 className="section-heading text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2 sm:mb-3">
                    Understanding <span className="text-white/90">Bill Discounting</span>
                  </h2>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-xl mb-4 sm:mb-6">
                    Get the invoice amount from a partner lender at a discounted value—instant working capital against your receivables.
                  </p>
                  <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10">
                    <div>
                      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Quick</p>
                      <p className="text-white/80 text-[10px] sm:text-xs md:text-sm font-medium">Fund disbursal</p>
                    </div>
                    <div className="w-px bg-white/30 hidden sm:block" />
                    <div>
                      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Flexible</p>
                      <p className="text-white/80 text-[10px] sm:text-xs md:text-sm font-medium">Lender options</p>
                    </div>
                    <div className="w-px bg-white/30 hidden sm:block" />
                    <div>
                      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Simple</p>
                      <p className="text-white/80 text-[10px] sm:text-xs md:text-sm font-medium">Process</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Two main cards: Methods + Procedure */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-5 sm:mb-8 lg:mb-10 shrink-0">
              <div className="group bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 border-2 border-[var(--card-border)] hover:border-[#e63a27]/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/25 shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </span>
                  <h3 className="section-heading text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-primary)]">Presenting Methods</h3>
                </div>
                <div className="space-y-3 sm:space-y-4 overflow-y-auto max-h-[280px] sm:max-h-[320px] pr-1">
                  <div className="bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)] rounded-xl p-3 sm:p-5 shadow-sm">
                    <h4 className="section-heading text-sm sm:text-base font-bold text-[var(--text-primary)] mb-1.5 sm:mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 sm:w-7 sm:h-7 bg-[#e63a27] rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-white shrink-0">1</span>
                      With Recourse
                    </h4>
                    <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed pl-8 sm:pl-9">
                      Seller’s bank verifies all documents and discount terms, then presents bills to the buyer’s bank for clearance.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)] rounded-xl p-3 sm:p-5 shadow-sm">
                    <h4 className="section-heading text-sm sm:text-base font-bold text-[var(--text-primary)] mb-1.5 sm:mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 sm:w-7 sm:h-7 bg-[#e63a27] rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-white shrink-0">2</span>
                      Without Recourse
                    </h4>
                    <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed pl-8 sm:pl-9">
                      No document verification by seller’s bank; the bill is presented directly for payment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 border-2 border-[var(--card-border)] hover:border-[#e63a27]/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/25 shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                  <h3 className="section-heading text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-primary)]">How It Works</h3>
                </div>
                <div className="space-y-2 sm:space-y-3 overflow-y-auto max-h-[280px] sm:max-h-[320px] pr-1">
                  {[
                    'Seller and buyer sign a contract for goods or services.',
                    'Seller raises the invoice on the buyer.',
                    'Buyer accepts the invoice and payment terms.',
                    'Seller approaches partner bank or lender for discounting.',
                    'Lender verifies transaction and creditworthiness, then releases funds after deducting fees.',
                    'On maturity, lender presents the bill and collects from the buyer.',
                  ].map((text, i) => (
                    <div key={i} className="flex gap-2 sm:gap-3 items-start">
                      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#e63a27] flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white flex-shrink-0">{i + 1}</span>
                      <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed pt-0.5">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key highlights - 4 cards with more punch */}
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-5 sm:mb-8 lg:mb-10 shrink-0">
              {[
                { title: 'Creditworthiness', desc: 'Buyer & seller evaluation', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                { title: 'Preferred Banking', desc: 'Reputed banking partners', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h1m-1 4h1m4-4h1m-1 4h1m-5-10v-2a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h.01' },
                { title: 'Inter Bank Dealing', desc: 'Direct bank-to-bank', icon: 'M8 7h12m0 0l-4-4m4 4l4-4m0 6H4m0 0l4 4m-4-4l4-4' },
                { title: 'Usance Bill', desc: 'Time-bound validity', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              ].map((item) => (
                <div key={item.title} className="group bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-[var(--card-border)] hover:border-[#e63a27]/40 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e63a27]/15 group-hover:bg-[#e63a27]/25 flex items-center justify-center mb-3 sm:mb-4 transition-colors shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  </span>
                  <h4 className="section-heading text-[var(--text-primary)] font-bold text-sm sm:text-base mb-0.5">{item.title}</h4>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Benefits - bolder layout */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[var(--card-border)] shadow-lg shrink-0">
              <div className="bg-[var(--card-bg)] px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b border-[var(--card-border)]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/25 shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </span>
                  <h3 className="section-heading text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-primary)]">Benefits of Bill Discounting</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'Immediate Funds', desc: 'Quick working capital' },
                  { title: 'Short-term Support', desc: 'Working capital boost' },
                  { title: 'Multiple Options', desc: 'Wide lender choices' },
                  { title: 'Hassle Free', desc: 'Prompt disbursal' },
                  { title: 'Cost Effective', desc: 'Interest on utilized amount only' },
                  { title: 'Risk Coverage', desc: 'Lenders may assume bad debt risk' },
                ].map((item, idx) => (
                  <div key={item.title} className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 border-[var(--card-border)] hover:bg-[#e63a27]/5 transition-colors border-b last:border-b-0 ${idx < 3 ? 'sm:border-b' : ''}`}>
                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#e63a27] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <div className="min-w-0">
                      <h4 className="section-heading text-[var(--text-primary)] font-bold text-xs sm:text-sm md:text-base mb-0.5">{item.title}</h4>
                      <p className="text-[var(--text-secondary)] text-[11px] sm:text-xs md:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </AnimateInView>
        </div>
      </section>

      {/* Section 5 - Vision, Mission & Vendor Finance */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden">
          <AnimateInView>
          <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20">
            <div className="text-center mb-4 sm:mb-8 lg:mb-12 shrink-0">
              <span className="text-[#e63a27] font-semibold text-[10px] sm:text-xs md:text-sm tracking-wider mb-1.5 sm:mb-4 block uppercase">Clients & Governance</span>
              <h2 className="section-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-2 sm:mb-6 px-1">
                Partnerships & <span className="text-[#e63a27]">Compliance</span>
              </h2>
              <div className="w-12 sm:w-[80px] h-[3px] sm:h-[4px] bg-[#e63a27] mx-auto mb-3 sm:mb-4 rounded-[2px]" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 mb-6 sm:mb-12">
              <div className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-[var(--card-border)]">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3 sm:mr-4 shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <h3 className="section-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#e63a27]">Clients and Partnerships</h3>
                </div>
                <p className="text-[var(--text-primary)] text-sm sm:text-base md:text-lg leading-relaxed">
                  The company partners with corporates, institutional investors, broker-dealers, and wealth managers, providing white label solutions, co-investment opportunities, and tailored counterparty arrangements.
                </p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-[var(--card-border)]">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3 sm:mr-4 shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <h3 className="section-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#e63a27]">Governance and Compliance</h3>
                </div>
                <p className="text-[var(--text-primary)] text-sm sm:text-base md:text-lg leading-relaxed">
                  Operations adhere to regulatory standards set by the Ministry of Corporate Affairs and applicable financial regulations. Robust compliance frameworks, audit trails, and governance policies ensure regulatory alignment and protect client interests.
                </p>
              </div>
            </div>
            <div className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-[var(--card-border)]">
              <h3 className="section-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6 flex items-center flex-wrap gap-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#e63a27] rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                Growth Focus
              </h3>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                Shanky Financial Services is focused on expanding institutional distribution, enhancing algorithmic execution capabilities, and developing bespoke financial products that address evolving corporate liquidity and investment needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-[var(--background)] rounded-xl p-4 sm:p-6 border border-[var(--card-border)]">
                  <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 sm:mb-4">Key Growth Areas</h4>
                  <ul className="space-y-3">
                    {['Expanding institutional distribution', 'Enhancing algorithmic execution capabilities', 'Developing bespoke financial products', 'Addressing evolving corporate liquidity needs'].map((text, i) => (
                      <li key={i} className="flex items-start gap-2"><span className="text-[#e63a27] shrink-0 mt-0.5">✓</span><span className="text-[var(--text-secondary)] text-xs sm:text-sm">{text}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[var(--background)] rounded-xl p-4 sm:p-6 border border-[var(--card-border)]">
                  <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 sm:mb-4">Partnership Values</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {['Long-term relationships built on confidentiality', 'Performance transparency', 'Service reliability', 'White label solutions'].map((text, i) => (
                      <li key={i} className="flex items-start gap-2"><span className="text-[#e63a27] shrink-0 mt-0.5">✓</span><span className="text-[var(--text-secondary)] text-xs sm:text-sm">{text}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          </AnimateInView>
        </div>
      </section>

      {/* Section 6 - Dealer, Factoring, Sales Invoice */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden">
          <AnimateInView>
          <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20">
            <div className="text-center mb-4 sm:mb-8 lg:mb-12 shrink-0">
              <span className="text-[#e63a27] font-semibold text-[10px] sm:text-xs md:text-sm tracking-wider mb-1.5 sm:mb-4 block uppercase">Execution Excellence</span>
              <h2 className="section-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-2 sm:mb-6 px-1">
                Trading <span className="text-[#e63a27]">Infrastructure</span>
              </h2>
              <div className="w-12 sm:w-[80px] h-[3px] sm:h-[4px] bg-[#e63a27] mx-auto mb-3 sm:mb-4 rounded-[2px]" />
            </div>

            <div className="space-y-5 sm:space-y-8 lg:space-y-12">
              <div className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-[var(--card-border)]">
                <h3 className="section-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#e63a27] mb-3 sm:mb-6 flex items-center flex-wrap gap-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#e63a27] rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  Trading Infrastructure
                </h3>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                  Our state-of-the-art trading infrastructure enables efficient execution and market intelligence for strategic decision making. The firm's technology-driven approach ensures optimal capital deployment and enhanced treasury returns for corporate clients.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-[var(--background)] rounded-xl p-4 sm:p-6 border border-[var(--card-border)]">
                    <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 sm:mb-4">Execution Capabilities</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {['Algorithmic execution systems', 'Real-time market intelligence', 'Advanced order management', 'Multi-asset class support'].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><span className="text-[#e63a27] shrink-0 mt-0.5">✓</span><span className="text-[var(--text-secondary)] text-xs sm:text-sm">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl p-4 sm:p-6 border border-[var(--card-border)]">
                    <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 sm:mb-4">Risk Management</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {['Disciplined risk controls', 'Real-time monitoring systems', 'Comprehensive compliance framework', 'Audit trail maintenance'].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><span className="text-[#e63a27] shrink-0 mt-0.5">✓</span><span className="text-[var(--text-secondary)] text-xs sm:text-sm">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-[var(--card-border)]">
                <h3 className="section-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#e63a27] mb-3 sm:mb-6 flex items-center flex-wrap gap-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#e63a27] rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>
                  Research-Driven Approach
                </h3>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                  Our research-driven approach combines quantitative analysis with market expertise to deliver bespoke financial solutions. We leverage deep market access and institutional capabilities to optimize capital deployment strategies for our clients.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-[var(--background)] rounded-xl p-4 sm:p-6 border border-[var(--card-border)]">
                    <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 sm:mb-4">Market Intelligence</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {['Deep market access', 'Real-time analytics', 'Strategic insights', 'Performance optimization'].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><span className="text-[#e63a27] shrink-0 mt-0.5">✓</span><span className="text-[var(--text-secondary)] text-xs sm:text-sm">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl p-4 sm:p-6 border border-[var(--card-border)]">
                    <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 sm:mb-4">Client Solutions</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {['Bespoke portfolio structuring', 'Liquidity management', 'Capital optimization', 'Treasury enhancement'].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><span className="text-[#e63a27] shrink-0 mt-0.5">✓</span><span className="text-[var(--text-secondary)] text-xs sm:text-sm">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </AnimateInView>
        </div>
      </section>

      {/* Section 7 - Why We Are Best & Contact */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden">
          <AnimateInView>
          <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20">
            <div className="text-center mb-4 sm:mb-8 lg:mb-12 shrink-0">
              <span className="text-[#e63a27] font-semibold text-[10px] sm:text-xs md:text-sm tracking-wider mb-1.5 sm:mb-4 block uppercase">Why Choose Us</span>
              <h2 className="section-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-2 sm:mb-6 px-1">
                Why We Are <span className="text-[#e63a27]">Best</span>
              </h2>
              <div className="w-12 sm:w-[80px] h-[3px] sm:h-[4px] bg-[#e63a27] mx-auto mb-3 sm:mb-4 rounded-[2px]" />
            </div>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-12">
              {[
                { icon: '🏦', title: 'Access to Multiple Banking Partners', desc: 'Wide network of banks' },
                { icon: '📊', title: 'Free Financial Need Analysis', desc: 'Complimentary financial assessment' },
                { icon: '🤝', title: 'Complete Guidance and Support', desc: 'End-to-end assistance' },
              ].map((item, idx) => (
                <AnimateInView key={item.title} delayMs={idx * 100}>
                <div className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-[var(--card-border)] hover:border-[#e63a27]/50 transition-all">
                  <div className="text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2 text-[#e63a27]">{item.icon}</div>
                  <h4 className="section-heading text-sm sm:text-base md:text-lg font-bold text-[var(--text-primary)] mb-0.5 sm:mb-2">{item.title}</h4>
                  <p className="text-[var(--text-secondary)] text-[11px] sm:text-xs md:text-sm">{item.desc}</p>
                </div>
                </AnimateInView>
              ))}
            </div>
            <div className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-[var(--card-border)] mb-6 sm:mb-8 shrink-0">
              <h3 className="section-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#e63a27] mb-3 sm:mb-4">Our Strengths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {['Latest updates on Bank guidelines and related circulars', 'Identification of best banking option', 'Unbeatable liasoning across all levels', 'Cost effective and timely delivery', 'Utmost transparency and honesty', 'Processing fee is payable only on success/delivery'].map((t, i) => (
                  <div key={i} className="flex items-start gap-2 sm:gap-3">
                    <span className="text-[#e63a27] text-base sm:text-xl shrink-0 mt-0.5">✓</span>
                    <span className="text-[var(--text-secondary)] text-xs sm:text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </AnimateInView>
        </div>
      </section>

      {/* Section 8 - Contact Us */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden">
          <ContactUs />
          <div className="w-full">
            <FooterFour />
          </div>
        </div>
      </section>
    </div>
  );
}