'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FooterFour from '../../home/home4/FooterFour';

const UNOPTIMIZED = true;

const HERO_SLIDES = [
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80', alt: 'Metals trading', objectPosition: 'center' as const },
  { src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80', alt: 'Industrial metals', objectPosition: 'center' as const },
  { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80', alt: 'Export and logistics', objectPosition: 'left' as const },
  { src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80', alt: 'Metal supply chain', objectPosition: 'center' as const },
] as const;
const HERO_SLIDE_COUNT = HERO_SLIDES.length;

export default function ShankyMetalsPvtLtdPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const heroIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      const clampedSection = Math.min(Math.max(currentSection, 0), 7);
      setActiveSection(clampedSection);
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
      {/* Section 1 - Hero with carousel */}
      <section
        className={`fixed top-0 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] pt-32 md:pt-40 lg:pt-44 px-4 md:px-8 lg:px-12 pb-0 bg-[var(--background)] ${
          activeSection === 0 ? 'z-40 translate-y-0 scale-100 opacity-100' :
          activeSection > 0 ? 'z-40 -translate-y-full scale-95 opacity-0' :
          'z-40 translate-y-0 scale-100 opacity-100'
        }`}
      >
        <div className="relative h-[65vh] md:h-[70vh] lg:h-[72vh] w-full rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10">
          <div
            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ width: `${HERO_SLIDE_COUNT * 100}%`, transform: `translateX(-${heroSlideIndex * (100 / HERO_SLIDE_COUNT)}%)` }}
          >
            {HERO_SLIDES.map((slide, idx) => (
              <div key={slide.src} className="absolute top-0 h-full" style={{ left: `${idx * (100 / HERO_SLIDE_COUNT)}%`, width: `${100 / HERO_SLIDE_COUNT}%` }} aria-hidden={idx !== heroSlideIndex}>
                <Image src={slide.src} alt={slide.alt} fill className="object-cover brightness-[0.72]" style={{ objectPosition: slide.objectPosition }} priority={idx === 0} sizes="100vw" unoptimized={UNOPTIMIZED} />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 z-20 pointer-events-none" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} type="button" aria-label={`Slide ${i + 1}`} onClick={() => setHeroSlideIndex(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === heroSlideIndex ? 'w-8 bg-[#e63a27]' : 'w-1.5 bg-white/50 hover:bg-white/80'}`} />
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col z-30">
            <div className="flex-1 flex items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-10 lg:py-14">
              <div className="w-full max-w-xl lg:max-w-2xl text-left">
                <span className="inline-block px-4 py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-xs lg:text-sm font-semibold tracking-widest rounded-full uppercase mb-5 lg:mb-6 shadow-lg shadow-[#e63a27]/30">
                  B2B metals trading & distribution
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.12] text-white mb-4 lg:mb-5 drop-shadow-lg">
                  SHANKY <span className="text-[#e63a27]">METALS</span> PVT LTD
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-lg text-white/95 leading-relaxed mb-8 lg:mb-10">
                  A B2B metals trading and distribution specialist—sourcing and supplying a broad range of metals to industrial buyers, traders, and export partners.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="px-6 py-3 lg:px-8 lg:py-3.5 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm lg:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                    Explore Services
                  </button>
                  <Link href="/contact" className="inline-flex px-6 py-3 lg:px-8 lg:py-3.5 border-2 border-white text-white bg-white/10 hover:bg-white/25 font-semibold rounded-xl transition-all text-sm lg:text-base backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            <div className="shrink-0 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-4 lg:py-5">
              <nav className="flex items-center text-xs sm:text-sm text-white/90">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="mx-2 sm:mx-2.5 opacity-70">/</span>
                <Link href="/company" className="hover:text-white transition-colors">Our Companies</Link>
                <span className="mx-2 sm:mx-2.5 opacity-70">/</span>
                <span className="text-white font-medium truncate max-w-[160px] sm:max-w-none">Shanky Metals Pvt Ltd</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen" />
      {/* Section 2 - Overview */}
      <section
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 1 ? 'z-50 translate-y-0 scale-100 opacity-100' :
          activeSection > 1 ? 'z-50 -translate-y-full scale-95 opacity-0' :
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[#0f172a]/30" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#e63a27 1px, transparent 1px), linear-gradient(90deg, #e63a27 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="container relative mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-12 sm:py-16 lg:py-20 h-full flex items-center">
            <div className="grid md:grid-cols-[1fr_1.25fr] gap-8 lg:gap-12 xl:gap-14 items-center w-full max-w-[90rem] mx-auto">
              <div className="order-2 md:order-1">
                <p className="text-[#e63a27] font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-3">
                  Overview
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.25rem] font-bold leading-[1.1] text-[var(--text-primary)] tracking-tight mb-5">
                  Shanky Metals <span className="text-[#e63a27]">Pvt Ltd</span>
                </h2>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg leading-[1.7] max-w-xl mb-6">
                  Shanky Metals Pvt Ltd is a B2B metals trading and distribution specialist led by Directors Vipin Kumar and Manoj Kumar Mishra. The company focuses on sourcing and supplying a broad range of metals to industrial buyers, traders, and export partners.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-[var(--card-border)] shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-3">B2B Services</h4>
                    <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                      {['Bulk metal trading', 'Procurement and supply contracts', 'Inventory management and export facilitation', 'Aluminium, copper, brass, iron, steel', 'Supplied to fabricators, OEMs, distributors', 'International trading partners'].map((t, i) => (
                        <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-0.5">✓</span>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-[var(--card-border)] shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-3">Value Proposition</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      Consistent supply, competitive pricing, and trade-compliant export services that help corporate buyers stabilize procurement and manage cost volatility. Commercial expertise and logistics coordination reduce lead times and simplify cross-border transactions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative order-1 md:order-2">
                <div className="aspect-[4/3] md:aspect-[4/3] max-h-[55vh] md:max-h-[68vh] w-full overflow-hidden rounded-2xl border-2 border-[var(--text-primary)]/10 shadow-2xl ring-2 ring-[#e63a27]/20 [&>span]:!rounded-[1.5rem] [&_img]:!rounded-[1.5rem]" style={{ borderRadius: '1.5rem' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                    alt="Shanky Metals - B2B metals trading and distribution"
                    fill
                    className="object-cover !rounded-[1.5rem]"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    unoptimized={UNOPTIMIZED}
                  />
                  <div className="absolute inset-0 rounded-3xl rounded-b-3xl bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden />
                  <div className="absolute bottom-0 left-0 right-0 rounded-b-3xl p-5 sm:p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-white/90 text-xs sm:text-sm font-medium uppercase tracking-wider">Focus</p>
                        <p className="text-white text-2xl sm:text-3xl font-bold">Trading & export</p>
                      </div>
                      <div className="h-1.5 flex-1 max-w-[140px] sm:max-w-[180px] rounded-full bg-white/20 overflow-hidden">
                        <div className="h-full w-3/4 bg-[#e63a27] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen" />
      {/* Section 3 - B2B Services */}
      <section
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 2 ? 'z-50 translate-y-0 scale-100 opacity-100' :
          activeSection > 2 ? 'z-50 -translate-y-full scale-95 opacity-0' :
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="absolute inset-0 bg-[var(--background)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#e63a27]/[0.03] via-transparent to-transparent" />
          <div className="container relative mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-8 sm:py-10 lg:py-12 h-full flex flex-col max-w-[90rem]">
            <div className="text-center mt-6 sm:mt-8 lg:mt-10 mb-6 sm:mb-8">
              <p className="text-[#e63a27] font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-2">What We Offer</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-2">
                B2B <span className="text-[#e63a27]">Services</span>
              </h2>
              <div className="w-20 h-1 bg-[#e63a27] mx-auto mb-3 rounded-full" />
              <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-2xl mx-auto">
                Bulk metal trading, procurement and supply contracts, inventory management, and export facilitation for industrial buyers and international partners
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 flex-1 min-h-0 overflow-y-auto pb-6 scrollbar-hide items-start">
              {[
                { title: 'Bulk Metal Trading', desc: 'Bulk metal trading for fabricators, OEMs, distributors, and international trading partners.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
                { title: 'Procurement & Supply Contracts', desc: 'Procurement and supply contracts to stabilize corporate procurement and manage cost volatility.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80' },
                { title: 'Inventory & Export Facilitation', desc: 'Inventory management and export facilitation with trade-compliant processes and documentation.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
                { title: 'Product Coverage', desc: 'Aluminium, copper, brass, iron, and steel supplied to industrial buyers and overseas markets.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
              ].map((item) => (
                <div key={item.title} className="group bg-[var(--card-bg)] rounded-2xl overflow-hidden border-2 border-[var(--card-border)] hover:border-[#e63a27]/50 hover:shadow-xl hover:shadow-[#e63a27]/10 hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-[16/9] w-full max-h-[160px] overflow-hidden bg-[var(--background)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized={UNOPTIMIZED}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="inline-block px-3 py-1.5 bg-[#e63a27] text-white text-[10px] font-semibold tracking-wider uppercase rounded-lg shadow-lg">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[#e63a27] transition-colors mb-1">{item.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-snug line-clamp-2">{item.desc}</p>
                    <div className="mt-3 pt-3 border-t border-[var(--card-border)]/80">
                      <span className="inline-flex items-center text-[11px] font-semibold text-[#e63a27] group-hover:gap-1.5 transition-all gap-1">
                        Learn more
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen" />
      {/* Section 4 - Value Proposition */}
      <section
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 3 ? 'z-50 translate-y-0 scale-100 opacity-100' :
          activeSection > 3 ? 'z-50 -translate-y-full scale-95 opacity-0' :
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="absolute inset-0 bg-[var(--background)]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #e63a27 1px, transparent 1px), radial-gradient(circle at 80% 80%, #e63a27 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12 h-full flex flex-col overflow-y-auto scrollbar-hide max-w-[90rem]">
            <div className="rounded-2xl overflow-hidden mb-8 lg:mb-10 border-2 border-[var(--card-border)] shadow-2xl ring-2 ring-[#e63a27]/10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[200px] sm:min-h-[240px]">
                <div className="lg:col-span-5 relative aspect-[2/1] lg:aspect-auto lg:min-h-[240px]">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85"
                    alt="Value proposition - metals trading and export"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    unoptimized={UNOPTIMIZED}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:from-black/50" />
                  <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6">
                    <p className="text-white/90 text-xs font-semibold tracking-widest uppercase">Our Edge</p>
                    <p className="text-white text-2xl sm:text-3xl font-bold mt-1">Supply. Pricing. Compliance.</p>
                  </div>
                </div>
                <div className="lg:col-span-7 bg-gradient-to-br from-[#e63a27] to-[#c93222] p-6 sm:p-8 flex flex-col justify-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                    Value <span className="text-white/90">Proposition</span>
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base max-w-xl mb-6">
                    Shanky Metals delivers consistent supply, competitive pricing, and trade-compliant export services that help corporate buyers stabilize procurement and manage cost volatility. The company&apos;s commercial expertise and logistics coordination reduce lead times and simplify cross-border transactions.
                  </p>
                  <div className="flex flex-wrap gap-6 sm:gap-10">
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Supply</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Consistent</p>
                    </div>
                    <div className="w-px bg-white/30 hidden sm:block" />
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Pricing</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Competitive</p>
                    </div>
                    <div className="w-px bg-white/30 hidden sm:block" />
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Compliance</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Export-ready</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-10">
              <div className="group bg-[var(--card-bg)] rounded-2xl p-5 sm:p-6 lg:p-7 border-2 border-[var(--card-border)] hover:border-[#e63a27]/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shadow-md">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/30">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Commercial Expertise & Logistics</h3>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Our commercial expertise and logistics coordination reduce lead times and simplify cross-border transactions for industrial manufacturers, distributors, and overseas trading houses.
                </p>
              </div>
              <div className="group bg-[var(--card-bg)] rounded-2xl p-5 sm:p-6 lg:p-7 border-2 border-[var(--card-border)] hover:border-[#e63a27]/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shadow-md">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/30">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Trade-Compliant Export Services</h3>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Trade-compliant export services with documentation controls and export compliance processes to meet corporate procurement standards and international requirements.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 lg:mb-10">
              {[
                { title: 'Consistent Supply', desc: 'Stable procurement', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
                { title: 'Competitive Pricing', desc: 'Cost volatility managed', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { title: 'Export Compliance', desc: 'Trade-compliant', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                { title: 'Logistics & Lead Times', desc: 'Reduced lead times', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              ].map((item) => (
                <div key={item.title} className="group bg-[var(--card-bg)] rounded-2xl p-5 border-2 border-[var(--card-border)] hover:border-[#e63a27]/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col shadow-md">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27]/15 group-hover:bg-[#e63a27]/30 flex items-center justify-center mb-4 transition-colors">
                    <svg className="w-6 h-6 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  </span>
                  <h4 className="text-[var(--text-primary)] font-bold text-base mb-1">{item.title}</h4>
                  <p className="text-[var(--text-secondary)] text-sm leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden border-2 border-[var(--card-border)] shadow-xl">
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
                  { title: 'Stabilized Procurement', desc: 'For corporate buyers' },
                  { title: 'Cost Volatility Managed', desc: 'Competitive pricing' },
                  { title: 'Simplified Cross-Border', desc: 'Export facilitation' },
                  { title: 'Reduced Lead Times', desc: 'Logistics coordination' },
                  { title: 'Trade Compliance', desc: 'Documentation & processes' },
                  { title: 'Commercial Credibility', desc: 'Authorized & paid-up capital' },
                ].map((item, idx) => (
                  <div key={item.title} className={`flex items-start gap-4 p-5 sm:p-6 border-[var(--card-border)] hover:bg-[#e63a27]/5 transition-colors border-b sm:border-r-0 sm:border-b ${(idx + 1) % 3 !== 0 && idx < 6 ? 'lg:border-r' : ''} ${idx >= 3 ? 'sm:border-b-0' : ''}`}>
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
      </section>

      <div className="h-screen" />
      {/* Section 5 - Clients, Financial Strength, Quality & Growth */}
      <section
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 4 ? 'z-50 translate-y-0 scale-100 opacity-100' :
          activeSection > 4 ? 'z-50 -translate-y-full scale-95 opacity-0' :
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="absolute inset-0 bg-[var(--background)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#e63a27]/[0.02] to-transparent" />
          <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-12 xl:py-16 h-full flex flex-col overflow-y-auto scrollbar-hide">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">Clients, Strength & Growth</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                Clients, Finance & <span className="text-[#e63a27]">Quality</span>
              </h2>
              <div className="w-20 h-1 bg-[#e63a27] mx-auto mb-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border-2 border-[var(--card-border)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#e63a27] rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-[#e63a27]/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h1m-1 4h1m4-4h1m-1 4h1m-5-10v-2a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h.01" /></svg>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27]">Clients and Partnerships</h3>
                </div>
                <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                  Primary clients are industrial manufacturers, large distributors, and overseas trading houses in Hong Kong and other Asian markets. Long-term supplier agreements and strategic sourcing partnerships ensure continuity and scale.
                </p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border-2 border-[var(--card-border)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#e63a27] rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-[#e63a27]/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27]">Financial and Commercial Strength</h3>
                </div>
                <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                  With an authorized share capital of ₹75 lakh and a paid-up capital of ₹70 lakh, Shanky Metals has demonstrated commercial traction and market credibility. The company&apos;s B2B focus emphasizes contractual supply, credit-backed transactions, and export compliance.
                </p>
              </div>
            </div>
            <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border-2 border-[var(--card-border)] shadow-lg">
              <h3 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
                <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3 shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                Quality Assurance and Growth Focus
              </h3>
              <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                Shanky Metals enforces material specification checks, documentation controls, and export compliance processes to meet corporate procurement standards. Growth priorities include expanding institutional client relationships, increasing export volumes, and enhancing supply-chain transparency for enterprise buyers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Expanding institutional client relationships', 'Increasing export volumes', 'Enhancing supply-chain transparency for enterprise buyers'].map((t, i) => (
                  <div key={i} className="bg-[var(--background)] rounded-xl p-4 border-2 border-[var(--card-border)] flex items-start gap-3 hover:border-[#e63a27]/30 transition-colors">
                    <span className="text-[#e63a27] mt-0.5 text-lg">✓</span>
                    <span className="text-[var(--text-secondary)]">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen" />
      {/* Section 6 - Trading & Export */}
      <section
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 5 ? 'z-50 translate-y-0 scale-100 opacity-100' :
          activeSection > 5 ? 'z-50 -translate-y-full scale-95 opacity-0' :
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="absolute inset-0 bg-[var(--background)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#e63a27]/[0.03] via-transparent to-transparent" />
          <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-12 xl:py-16 h-full flex flex-col overflow-y-auto scrollbar-hide">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">How We Deliver</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                Trading & <span className="text-[#e63a27]">Export</span>
              </h2>
              <div className="w-20 h-1 bg-[#e63a27] mx-auto mb-4 rounded-full" />
            </div>

            <div className="space-y-8 lg:space-y-12">
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border-2 border-[var(--card-border)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27] mb-4 lg:mb-6 flex items-center">
                  <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  </div>
                  Bulk Trading & Procurement
                </h3>
                <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                  Bulk metal trading and procurement and supply contracts for fabricators, OEMs, distributors, and international trading partners. Product coverage includes aluminium, copper, brass, iron, and steel.
                </p>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  {['Bulk metal trading', 'Procurement and supply contracts', 'Aluminium, copper, brass, iron, steel', 'Fabricators, OEMs, distributors'].map((t, i) => (
                    <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-0.5">✓</span>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border-2 border-[var(--card-border)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27] mb-4 lg:mb-6 flex items-center">
                  <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  Export & Compliance
                </h3>
                <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                  Inventory management and export facilitation with trade-compliant export services. Material specification checks, documentation controls, and export compliance processes meet corporate procurement standards and support overseas trading houses in Hong Kong and Asian markets.
                </p>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  {['Inventory management', 'Export facilitation', 'Trade-compliant documentation', 'Export compliance processes'].map((t, i) => (
                    <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-0.5">✓</span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen" />
      {/* Section 7 - Why Shanky Metals & CTA */}
      <section
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 6 ? 'z-50 translate-y-0 scale-100 opacity-100' :
          activeSection > 6 ? 'z-50 -translate-y-full scale-95 opacity-0' :
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="absolute inset-0 bg-[var(--background)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#e63a27]/[0.06] via-[#e63a27]/[0.02] to-transparent" />
          <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-12 xl:py-16 h-full flex flex-col overflow-y-auto scrollbar-hide">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">Why Choose Us</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                Why <span className="text-[#e63a27]">Shanky Metals</span>
              </h2>
              <div className="w-20 h-1 bg-[#e63a27] mx-auto mb-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {[
                { icon: '📦', title: 'Consistent Supply', desc: 'Stabilize procurement, manage cost volatility' },
                { icon: '💰', title: 'Competitive Pricing', desc: 'Cost transparency for corporate buyers' },
                { icon: '📋', title: 'Export Compliance', desc: 'Trade-compliant export services' },
                { icon: '🚚', title: 'Logistics Coordination', desc: 'Reduced lead times, cross-border ease' },
                { icon: '🔩', title: 'Product Range', desc: 'Aluminium, copper, brass, iron, steel' },
                { icon: '🤝', title: 'Strategic Partnerships', desc: 'Long-term supplier agreements' },
                { icon: '🏭', title: 'Industrial & Export', desc: 'Fabricators, OEMs, overseas markets' },
                { icon: '📊', title: 'Commercial Strength', desc: '₹75L authorized, ₹70L paid-up capital' },
                { icon: '✓', title: 'Quality & Documentation', desc: 'Material specs, export compliance' },
              ].map((item) => (
                <div key={item.title} className="bg-[var(--card-bg)] rounded-2xl p-4 sm:p-6 border-2 border-[var(--card-border)] hover:border-[#e63a27]/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shadow-md">
                  <div className="text-2xl sm:text-3xl mb-2 text-[#e63a27]">{item.icon}</div>
                  <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1 sm:mb-2">{item.title}</h4>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border-2 border-[var(--card-border)] mb-8 shadow-lg">
              <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27] mb-4">Our Strengths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Material specification checks, documentation controls, export compliance', 'Long-term supplier agreements and strategic sourcing partnerships', 'Authorized share capital ₹75 lakh, paid-up ₹70 lakh', 'Consistent supply, competitive pricing, trade-compliant export services', 'Commercial expertise and logistics coordination', 'Industrial manufacturers, distributors, overseas trading houses (Hong Kong, Asia)'].map((t, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <span className="text-[#e63a27] text-xl">✓</span>
                    <span className="text-[var(--text-secondary)]">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-auto relative rounded-2xl overflow-hidden py-10 sm:py-12 lg:py-16 bg-gradient-to-br from-[#e63a27]/10 via-[#e63a27]/5 to-transparent border-2 border-[#e63a27]/20">
              <span className="inline-block px-4 lg:px-6 py-2 lg:py-2.5 bg-[#e63a27] text-white text-xs sm:text-sm font-semibold tracking-wider rounded-full uppercase mb-4 sm:mb-6 shadow-lg">
                B2B Metals Trading & Distribution
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6 leading-tight">
                Partner with <span className="text-[#e63a27]">Shanky Metals</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 lg:mb-12 max-w-6xl mx-auto text-[var(--text-secondary)] leading-relaxed px-2">
                Consistent supply, competitive pricing, and trade-compliant export services for industrial buyers, traders, and export partners—with commercial expertise and logistics coordination that reduce lead times and simplify cross-border transactions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center">
                <Link href="/contact" className="inline-flex px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-100">
                  Get Started Today
                </Link>
                <Link href="/contact" className="inline-flex px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 border-2 border-[#e63a27] text-[#e63a27] bg-transparent hover:bg-[#e63a27] hover:text-white font-semibold rounded-xl transition-all text-sm sm:text-base lg:text-lg">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen" />

      <section className="relative bg-[var(--background)]">
        <FooterFour />
      </section>
    </div>
  );
}
