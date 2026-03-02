'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FooterFour from '../../home/home4/FooterFour';
import ContactUs from '../../home/home4/vender';

export default function VMSHubPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const heroIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Slide 1: any; Slides 2–4: images with content on right, empty on left (object-position left for text overlay)
  const HERO_SLIDES = [
    { src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&q=80', alt: 'VMS Hub Food Distribution', objectPosition: 'center' as const },
    { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80', alt: 'Agricultural Products', objectPosition: 'left' as const },
    { src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&q=80', alt: 'Supply Chain Management', objectPosition: 'left' as const },
    { src: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1920&q=80', alt: 'Food Distribution', objectPosition: 'left' as const },
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

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const currentSection = Math.round(scrollTop / windowHeight);
      const clampedSection = Math.min(Math.max(currentSection, 0), 5);
      setActiveSection(clampedSection);
      setScrollProgress(scrollTop / (windowHeight * 6));
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
            <div className="flex-1 flex items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-10 lg:py-14">
              <div className="w-full max-w-xl lg:max-w-2xl text-left">
                <div className="mb-5 lg:mb-6">
                  <span className="inline-block px-4 py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-xs lg:text-sm font-semibold tracking-widest rounded-full uppercase">
                    B2B Distribution Specialist
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15] text-white mb-4 lg:mb-5">
                  VMS <span className="text-[#e63a27]">HUB</span> PVT LTD
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-lg text-white/90 leading-relaxed mb-8 lg:mb-10">
                  B2B wholesale distribution specialist for food and agricultural products
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    className="px-6 py-3 lg:px-8 lg:py-3.5 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm lg:text-base shadow-lg"
                  >
                    Explore Services
                  </button>
                  <Link
                    href="/contact"
                    className="inline-flex px-6 py-3 lg:px-8 lg:py-3.5 border-2 border-white text-white bg-white/10 hover:bg-white/20 font-semibold rounded-xl transition-all text-sm lg:text-base backdrop-blur-sm"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            {/* Breadcrumb: bottom left */}
            <div className="shrink-0 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-4 lg:py-5">
              <nav className="flex items-center text-xs sm:text-sm text-white/90">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="mx-2 sm:mx-2.5 opacity-70">/</span>
                <Link href="/company" className="hover:text-white transition-colors">Our Companies</Link>
                <span className="mx-2 sm:mx-2.5 opacity-70">/</span>
                <span className="text-white font-medium truncate max-w-[160px] sm:max-w-none">VMS Hub Pvt Ltd</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen" />
      {/* Section 2 - About Us (How It Started – theme-aware for dark/light mode) */}
      <section 
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 1 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 1 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 lg:py-10 h-full flex items-center">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 items-center w-full max-w-[90rem] mx-auto">
              {/* Left: How It Started – text only */}
              <div className="order-2 md:order-1">
                <p className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">
                  Overview
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] text-[var(--text-primary)] tracking-tight mb-3">
                  VMS Hub <span className="text-[#e63a27]">Pvt Ltd</span>
                </h2>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg leading-[1.6] max-w-xl">
                  VMS Hub Pvt Ltd is the Group's B2B wholesale distribution specialist for food and agricultural products, led by Directors Vipin Kumar and Manoj Kumar Mishra. The company connects producers and suppliers with retailers, food processors, institutional buyers, and large-scale foodservice operators.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">B2B Services</h4>
                    <ul className="space-y-3">
                      {['Bulk sourcing', 'Contract distribution', 'Supply chain management', 'Private-label procurement for retailers and processors'].map((t, i) => (
                        <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Value Proposition</h4>
                    <ul className="space-y-3">
                      {['Consistent quality and traceability', 'Cost-efficient distribution', 'Centralized procurement', 'Optimized route planning'].map((t, i) => (
                        <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* Right: Image + 2x2 stats grid */}
              <div className="order-1 md:order-2 space-y-4">
                <div className="relative aspect-[4/3] max-h-[38vh] w-full overflow-hidden rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                    alt="VMS Hub distribution and supply chain"
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: '500+', label: 'Tons/Month Capacity' },
                    { value: '2014', label: 'Established' },
                    { value: '50+', label: 'Partner Farmers' },
                    { value: '100+', label: 'Retail Partners' },
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
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 2 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 2 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-8 sm:py-10 lg:py-12 h-full flex flex-col max-w-[90rem]">
            <div className="text-center mt-6 sm:mt-8 lg:mt-10 mb-6 sm:mb-8">
              <p className="text-[#e63a27] font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-2">B2B Services</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-2">
                Distribution <span className="text-[#e63a27]">Services</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#e63a27] mx-auto mb-3" />
              <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-2xl mx-auto">
                Demand forecasting, consolidated procurement, vendor aggregation, and logistics coordination to ensure reliable supply at scale
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 flex-1 min-h-0 overflow-y-auto pb-6 scrollbar-hide items-start">
              {[
                { title: 'Bulk Sourcing', desc: 'Large-scale procurement of agricultural raw materials and food products.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80' },
                { title: 'Contract Distribution', desc: 'Long-term distribution agreements with reliable supply chain networks.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },
                { title: 'Supply Chain Management', desc: 'End-to-end logistics coordination and inventory optimization.', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80' },
                { title: 'Private-Label Procurement', desc: 'Customized procurement solutions for retailers and processors.', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80' },
              ].map((item) => (
                <div key={item.title} className="group bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--card-border)] hover:border-[#e63a27]/40 hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[16/9] w-full max-h-[160px] overflow-hidden bg-[var(--background)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="inline-block px-2.5 py-1 bg-[#e63a27] text-white text-[10px] font-semibold tracking-wider uppercase rounded-full">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[#e63a27] transition-colors mb-1">{item.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-snug line-clamp-2">{item.desc}</p>
                    <div className="mt-2 pt-2 border-t border-[var(--card-border)]/80">
                      <span className="inline-flex items-center text-[11px] font-semibold text-[#e63a27] group-hover:gap-1.5 transition-all gap-1">
                        Learn more
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen"></div>

      {/* Section 4 - Quality & Compliance */}
      <section 
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 3 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 3 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-12 xl:py-16 h-full flex flex-col overflow-y-auto scrollbar-hide">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">Quality & Compliance</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                Excellence & <span className="text-[#e63a27]">Standards</span>
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
                  Primary clients include retail chains, food manufacturers, institutional caterers, and large wholesalers. The company forges strategic partnerships with farmer cooperatives and accredited suppliers to secure supply continuity and favorable commercial terms.
                </p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#e63a27] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27]">Quality Assurance</h3>
                </div>
                <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                  VMS Hub implements food-safety protocols, batch-level traceability, and supplier audits to meet corporate procurement standards. Service-level agreements and performance metrics underpin client contracts to ensure on-time delivery and product integrity.
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
                With an authorized share capital of ₹16.5 crore, VMS Hub is scaling its B2B distribution footprint, expanding cold-chain capabilities, and offering value-added services such as vendor-managed inventory and contract sourcing for enterprise customers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Expansion Areas</h4>
                  <ul className="space-y-3">
                    {['Scaling B2B distribution footprint', 'Expanding cold-chain capabilities', 'Strategic warehousing', 'Optimized route planning'].map((text, i) => (
                      <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{text}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Value-Added Services</h4>
                  <ul className="space-y-3">
                    {['Vendor-managed inventory', 'Contract sourcing for enterprise', 'Demand forecasting', 'Consolidated procurement'].map((text, i) => (
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

      {/* Section 5 - Why We Are Best & Contact (home4 style) */}
      <section 
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 4 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] border-t border-[var(--card-border)]">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-12 xl:py-16 h-full flex flex-col overflow-y-auto scrollbar-hide">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">Why Choose VMS Hub</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                Why We Are <span className="text-[#e63a27]">Best</span>
              </h2>
              <div className="w-[80px] h-[4px] bg-[#e63a27] mx-auto mb-4 rounded-[2px]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {[
                { icon: '🚚', title: 'Reliable Distribution', desc: 'On-time delivery guarantee' },
                { icon: '🏭', title: 'Quality Products', desc: 'Consistent quality standards' },
                { icon: '📊', title: 'Supply Chain Expert', desc: 'End-to-end logistics management' },
                { icon: '🤝', title: 'Partnership Focus', desc: 'Long-term relationships' },
                { icon: '🌱', title: 'Farmer Network', desc: 'Direct sourcing from farmers' },
                { icon: '❄', title: 'Cold Chain', desc: 'Temperature-controlled logistics' },
                { icon: '📈', title: 'Scalable Solutions', desc: 'Flexible capacity options' },
                { icon: '💰', title: 'Cost Effective', desc: 'Competitive pricing' },
              ].map((item) => (
                <div key={item.title} className="bg-[var(--card-bg)] rounded-2xl p-4 sm:p-6 border border-[var(--card-border)] hover:border-[#e63a27]/50 transition-all">
                  <div className="text-2xl sm:text-3xl mb-2 text-[#e63a27]">{item.icon}</div>
                  <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1 sm:mb-2">{item.title}</h4>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen" />

      {/* Section 6 - Contact Us */}
      <section
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 5 ? 'z-50 translate-y-0 scale-100 opacity-100' :
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