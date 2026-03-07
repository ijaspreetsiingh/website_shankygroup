'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactUs from '../../home/home4/vender';

/** Scroll-triggered fade-in-up when element enters viewport */
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

export default function VMSHubPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const heroIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const HERO_SLIDES = [
    { src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&q=80', alt: 'VMS Hub Food Distribution', objectPosition: 'center' as const },
    { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80', alt: 'Agricultural Products', objectPosition: 'left' as const },
    { src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&q=80', alt: 'Supply Chain Management', objectPosition: 'left' as const },
    { src: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1920&q=80', alt: 'Food Distribution', objectPosition: 'left' as const },
  ] as const;
  const HERO_SLIDE_COUNT = HERO_SLIDES.length;

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

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
      className="company-vms-hub-root relative w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style={{ ['--accent' as string]: '#e63a27', ['--accent-hover' as string]: '#c93222' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .company-vms-hub-root .section-heading,
        .company-vms-hub-root h1, .company-vms-hub-root h2, .company-vms-hub-root h3, .company-vms-hub-root h4 {
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
          <div className="absolute inset-0 flex flex-col z-30">
            <div className="flex-1 flex items-center min-h-0 px-3 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-4 min-[375px]:py-5 sm:py-8 md:py-10 lg:py-14 overflow-y-auto scrollbar-hide">
              <div
                className={`w-full max-w-xl lg:max-w-2xl text-left space-y-4 sm:space-y-5 md:space-y-6 transition-all duration-700 ease-out ${
                  heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div>
                  <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-[10px] min-[375px]:text-[11px] sm:text-xs lg:text-sm font-semibold tracking-[0.12em] sm:tracking-widest rounded-full uppercase">
                    B2B Distribution Specialist
                  </span>
                </div>
                <h1 className="section-heading text-2xl min-[360px]:text-3xl min-[400px]:text-4xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold leading-[1.15] sm:leading-[1.12] text-white drop-shadow-md">
                  <span className="block">VMS <span className="text-[#e63a27]">HUB</span></span>
                  <span className="block mt-0.5 sm:mt-1">PVT LTD</span>
                </h1>
                <p className="text-xs min-[375px]:text-sm sm:text-base md:text-lg lg:text-xl max-w-lg text-white/95 leading-relaxed font-medium">
                  B2B wholesale distribution specialist for food and agricultural products
                </p>
              </div>
            </div>
            <div className="shrink-0 px-3 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-2.5 min-[375px]:py-3 sm:py-4 lg:py-5">
              <nav className="flex items-center text-[10px] min-[375px]:text-[11px] sm:text-xs md:text-sm text-white/90 flex-wrap gap-x-1 gap-y-0.5">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="opacity-70">/</span>
                <Link href="/company" className="hover:text-white transition-colors">Our Companies</Link>
                <span className="opacity-70">/</span>
                <span className="text-white font-medium truncate max-w-[120px] min-[380px]:max-w-[160px] sm:max-w-none">VMS Hub Pvt Ltd</span>
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
              <div className="order-2 md:order-1 min-w-0 flex flex-col justify-center">
                <p className="text-[#e63a27] font-semibold text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase mb-1.5 sm:mb-2">Overview</p>
                <p className="text-[var(--text-secondary)] text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.65] max-w-2xl mb-4 sm:mb-0 font-medium">
                  VMS Hub Pvt Ltd is the Group's B2B wholesale distribution specialist for food and agricultural products, led by Directors Vipin Kumar and Manoj Kumar Mishra. The company connects producers and suppliers with retailers, food processors, institutional buyers, and large-scale foodservice operators.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                  <div className="bg-[var(--background)] rounded-xl p-4 sm:p-6 border border-[var(--card-border)]">
                    <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 sm:mb-4">B2B Services</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {['Bulk sourcing', 'Contract distribution', 'Supply chain management', 'Private-label procurement for retailers and processors'].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><span className="text-[#e63a27] shrink-0 mt-0.5">✓</span><span className="text-[var(--text-secondary)] text-xs sm:text-sm">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl p-4 sm:p-6 border border-[var(--card-border)]">
                    <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 sm:mb-4">Value Proposition</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {['Consistent quality and traceability', 'Cost-efficient distribution', 'Centralized procurement', 'Optimized route planning'].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><span className="text-[#e63a27] shrink-0 mt-0.5">✓</span><span className="text-[var(--text-secondary)] text-xs sm:text-sm">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-3 sm:space-y-5 min-w-0 flex flex-col justify-center">
                <div className="relative w-full overflow-hidden rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] aspect-[4/3] min-h-[220px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[320px] max-h-[50vh] sm:max-h-[55vh] md:max-h-[420px]">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                    alt="VMS Hub distribution and supply chain"
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
            <div className="text-center mt-1 sm:mt-6 lg:mt-8 mb-3 sm:mb-6 flex-shrink-0">
              <p className="text-[#e63a27] font-semibold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1 sm:mb-2">B2B Services</p>
              <h2 className="section-heading text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-1.5 sm:mb-2 leading-tight">
                Distribution <span className="text-[#e63a27]">Services</span>
              </h2>
              <div className="w-16 sm:w-24 h-0.5 bg-[#e63a27] mx-auto mb-2 sm:mb-3 rounded-full" />
              <p className="text-[var(--text-secondary)] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
                Demand forecasting, consolidated procurement, vendor aggregation, and logistics coordination to ensure reliable supply at scale
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 pb-16 sm:pb-8">
              {[
                { title: 'Bulk Sourcing', desc: 'Large-scale procurement of agricultural raw materials and food products.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80', bgColor: 'from-blue-900/40' },
                { title: 'Contract Distribution', desc: 'Long-term distribution agreements with reliable supply chain networks.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', bgColor: 'from-purple-900/40' },
                { title: 'Supply Chain Management', desc: 'End-to-end logistics coordination and inventory optimization.', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80', bgColor: 'from-green-900/40' },
                { title: 'Private-Label Procurement', desc: 'Customized procurement solutions for retailers and processors.', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80', bgColor: 'from-orange-900/40' },
              ].map((item, index) => (
                <AnimateInView key={index} delayMs={index * 80}>
                <div className="group bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--card-border)] hover:border-[#e63a27]/40 hover:shadow-lg transition-all duration-300 flex flex-col min-h-[280px] sm:min-h-[320px]">
                  <div className="relative w-full h-32 sm:h-40 md:h-44 lg:h-48 overflow-hidden bg-[var(--background)]">
                    <Image src={item.image} alt={item.title} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" priority={index < 2} />
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.bgColor} via-transparent to-transparent opacity-90`} />
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                      <span className="inline-block px-2 py-1 sm:px-3 sm:py-1.5 bg-[#e63a27] text-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase rounded-full shadow-lg">{item.title}</span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 flex-1 flex flex-col">
                    <h3 className="section-heading text-xs sm:text-sm md:text-base font-bold text-[var(--text-primary)] group-hover:text-[#e63a27] transition-colors line-clamp-1 mb-1.5 sm:mb-2">{item.title}</h3>
                    <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3 sm:line-clamp-2 mb-2 sm:mb-3 flex-1">{item.desc}</p>
                    <div className="mt-auto pt-2 border-t border-[var(--card-border)]/80">
                      <span className="inline-flex items-center text-[10px] sm:text-xs font-semibold text-[#e63a27] group-hover:gap-1.5 transition-all gap-1 cursor-pointer active:opacity-80">
                        Learn more
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>
                  </div>
                </div>
                </AnimateInView>
              ))}
            </div>
          </div>
          </AnimateInView>
        </div>
      </section>

      {/* Section 4 - Quality & Compliance */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden">
          <AnimateInView>
          <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20">
            <div className="text-center mb-4 sm:mb-8 lg:mb-12 shrink-0">
              <span className="text-[#e63a27] font-semibold text-[10px] sm:text-xs md:text-sm tracking-wider mb-1.5 sm:mb-4 block uppercase">Quality & Compliance</span>
              <h2 className="section-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-2 sm:mb-6 px-1">
                Excellence & <span className="text-[#e63a27]">Standards</span>
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
                  Primary clients include retail chains, food manufacturers, institutional caterers, and large wholesalers. The company forges strategic partnerships with farmer cooperatives and accredited suppliers to secure supply continuity and favorable commercial terms.
                </p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-[var(--card-border)]">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3 sm:mr-4 shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <h3 className="section-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#e63a27]">Quality Assurance</h3>
                </div>
                <p className="text-[var(--text-primary)] text-sm sm:text-base md:text-lg leading-relaxed">
                  VMS Hub implements food-safety protocols, batch-level traceability, and supplier audits to meet corporate procurement standards. Service-level agreements and performance metrics underpin client contracts to ensure on-time delivery and product integrity.
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
                With an authorized share capital of ₹16.5 crore, VMS Hub is scaling its B2B distribution footprint, expanding cold-chain capabilities, and offering value-added services such as vendor-managed inventory and contract sourcing for enterprise customers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-[var(--background)] rounded-xl p-4 sm:p-6 border border-[var(--card-border)]">
                  <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 sm:mb-4">Expansion Areas</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {['Scaling B2B distribution footprint', 'Expanding cold-chain capabilities', 'Strategic warehousing', 'Optimized route planning'].map((text, i) => (
                      <li key={i} className="flex items-start gap-2"><span className="text-[#e63a27] shrink-0 mt-0.5">✓</span><span className="text-[var(--text-secondary)] text-xs sm:text-sm">{text}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[var(--background)] rounded-xl p-4 sm:p-6 border border-[var(--card-border)]">
                  <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 sm:mb-4">Value-Added Services</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {['Vendor-managed inventory', 'Contract sourcing for enterprise', 'Demand forecasting', 'Consolidated procurement'].map((text, i) => (
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

      {/* Section 5 - Why We Are Best */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden">
          <AnimateInView>
          <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20">
            <div className="text-center mb-4 sm:mb-8 lg:mb-12 shrink-0">
              <span className="text-[#e63a27] font-semibold text-[10px] sm:text-xs md:text-sm tracking-wider mb-1.5 sm:mb-4 block uppercase">Why Choose VMS Hub</span>
              <h2 className="section-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-2 sm:mb-6 px-1">
                Why We Are <span className="text-[#e63a27]">Best</span>
              </h2>
              <div className="w-12 sm:w-[80px] h-[3px] sm:h-[4px] bg-[#e63a27] mx-auto mb-3 sm:mb-4 rounded-[2px]" />
            </div>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-12">
              {[
                { icon: '🚚', title: 'Reliable Distribution', desc: 'On-time delivery guarantee' },
                { icon: '🏭', title: 'Quality Products', desc: 'Consistent quality standards' },
                { icon: '📊', title: 'Supply Chain Expert', desc: 'End-to-end logistics management' },
                { icon: '🤝', title: 'Partnership Focus', desc: 'Long-term relationships' },
                { icon: '🌱', title: 'Farmer Network', desc: 'Direct sourcing from farmers' },
                { icon: '❄', title: 'Cold Chain', desc: 'Temperature-controlled logistics' },
                { icon: '📈', title: 'Scalable Solutions', desc: 'Flexible capacity options' },
                { icon: '💰', title: 'Cost Effective', desc: 'Competitive pricing' },
              ].map((item, idx) => (
                <AnimateInView key={item.title} delayMs={idx * 60}>
                <div className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-[var(--card-border)] hover:border-[#e63a27]/50 transition-all">
                  <div className="text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2 text-[#e63a27]">{item.icon}</div>
                  <h4 className="section-heading text-sm sm:text-base md:text-lg font-bold text-[var(--text-primary)] mb-0.5 sm:mb-2">{item.title}</h4>
                  <p className="text-[var(--text-secondary)] text-[11px] sm:text-xs md:text-sm">{item.desc}</p>
                </div>
                </AnimateInView>
              ))}
            </div>
          </div>
          </AnimateInView>
        </div>
      </section>

      {/* Section 6 - Contact Us */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden">
          <ContactUs />
        </div>
      </section>
    </div>
  );
}
