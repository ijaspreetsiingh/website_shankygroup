'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FooterFour from '../../home/home4/FooterFour';

const UNOPTIMIZED = true;

export default function ShankyCorporateTrainingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const heroIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Slide 1: any; Slides 2–4: images with content on right, empty on left for text overlay
  const HERO_SLIDES = [
    { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80', alt: 'Corporate Training Excellence', objectPosition: 'center' as const },
    { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1920&q=80', alt: 'Team Training', objectPosition: 'left' as const },
    { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80', alt: 'Workshop Session', objectPosition: 'left' as const },
    { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80', alt: 'Leadership Development', objectPosition: 'left' as const },
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
      const clampedSection = Math.min(Math.max(currentSection, 0), 7);
      setActiveSection(clampedSection);
      setScrollProgress(scrollTop / (windowHeight * 8));
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
                    B2B talent development partner
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15] text-white mb-4 lg:mb-5">
                  SHANKY <span className="text-[#e63a27]">CORPORATE TRAINING</span> PVT LTD
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-lg text-white/90 leading-relaxed mb-8 lg:mb-10">
                  The Group&apos;s B2B talent development partner—designing and delivering corporate learning programs that strengthen workforce capabilities across sectors.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="px-6 py-3 lg:px-8 lg:py-3.5 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm lg:text-base shadow-lg">
                    Our Programs
                  </button>
                  <Link href="/contact" className="inline-flex px-6 py-3 lg:px-8 lg:py-3.5 border-2 border-white text-white bg-white/10 hover:bg-white/20 font-semibold rounded-xl transition-all text-sm lg:text-base backdrop-blur-sm">
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
                <span className="text-white font-medium truncate max-w-[160px] sm:max-w-none">Shanky Corporate Training Pvt Ltd</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen" />
      {/* Section 2 - About Us (professional editorial) */}
      <section 
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 1 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 1 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-12 sm:py-16 lg:py-20 h-full flex items-center">
            <div className="grid md:grid-cols-[1fr_1.25fr] gap-8 lg:gap-12 xl:gap-14 items-center w-full max-w-[90rem] mx-auto">
              {/* Left: Overview + B2B + Value Proposition */}
              <div className="order-2 md:order-1">
                <p className="text-[#e63a27] font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-3">
                  Overview
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.25rem] font-bold leading-[1.1] text-[var(--text-primary)] tracking-tight mb-5">
                  Shanky Corporate Training <span className="text-[#e63a27]">Pvt Ltd</span>
                </h2>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg leading-[1.7] max-w-xl mb-6">
                  Shanky Corporate Training Pvt Ltd is the Group&apos;s B2B talent development partner, led by Directors Vipin Kumar and Manoj Kumar Mishra. The company designs and delivers corporate learning programs that strengthen workforce capabilities across sectors.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-3">B2B Services</h4>
                    <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                      {['Leadership development', 'Soft skills and behavioral training', 'Technical upskilling', 'Organizational development consulting', 'Digital learning platforms for enterprises', 'Customized curricula, cohort-based executive programs', 'Blended learning journeys tailored to corporate KPIs'].map((t, i) => (
                        <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-0.5">✓</span>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-3">Value Proposition</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      Measurable learning outcomes, scalable delivery, and alignment with business objectives. Programs are built from needs analysis and competency mapping to ensure training translates into improved performance and retention.
                    </p>
                  </div>
                </div>
                              </div>
              {/* Right: Image block */}
              <div className="relative order-1 md:order-2">
                <div className="aspect-[4/3] md:aspect-[4/3] max-h-[55vh] md:max-h-[68vh] w-full overflow-hidden border-2 border-[var(--text-primary)]/20 shadow-2xl [&>span]:!rounded-[1.5rem] [&_img]:!rounded-[1.5rem]" style={{ borderRadius: '1.5rem' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
                    alt="Shanky Corporate Training - corporate learning"
                    fill
                    className="object-cover !rounded-[1.5rem]"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    unoptimized={UNOPTIMIZED}
                  />
                  <div className="absolute inset-0 rounded-3xl rounded-b-3xl bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden />
                  <div className="absolute bottom-0 left-0 right-0 rounded-b-3xl p-5 sm:p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-white/90 text-xs sm:text-sm font-medium uppercase tracking-wider">Participant satisfaction</p>
                        <p className="text-white text-2xl sm:text-3xl font-bold">98%</p>
                      </div>
                      <div className="h-1.5 flex-1 max-w-[140px] sm:max-w-[180px] rounded-full bg-white/20 overflow-hidden">
                        <div className="h-full w-[98%] bg-[#e63a27] rounded-full" />
                      </div>
                    </div>
                  </div>
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
              <p className="text-[#e63a27] font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-2">What We Offer</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-2">
                B2B <span className="text-[#e63a27]">Services</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#e63a27] mx-auto mb-3" />
              <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-2xl mx-auto">
                Leadership development, soft skills, technical upskilling, and digital learning for enterprises
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 flex-1 min-h-0 overflow-y-auto pb-6 scrollbar-hide items-start">
              {[
                { title: 'Leadership Development', desc: 'Cohort-based executive programs and leadership capability building.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80' },
                { title: 'Soft Skills & Behavioral Training', desc: 'Communication, teamwork, and behavioral training tailored to corporate KPIs.', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80' },
                { title: 'Technical Upskilling', desc: 'Domain and technical upskilling for workforce capability and retention.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80' },
                { title: 'Digital Learning Platforms', desc: 'Enterprise digital learning and blended learning journeys for scale.', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80' },
              ].map((item) => (
                <div key={item.title} className="group bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--card-border)] hover:border-[#e63a27]/40 hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[16/9] w-full max-h-[160px] overflow-hidden bg-[var(--background)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized={UNOPTIMIZED}
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

      {/* Section 4 - Value Proposition */}
      <section 
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 3 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 3 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #e63a27 1px, transparent 1px), radial-gradient(circle at 80% 80%, #e63a27 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12 h-full flex flex-col overflow-y-auto scrollbar-hide max-w-[90rem]">
            <div className="rounded-2xl overflow-hidden mb-8 lg:mb-10 border border-[var(--card-border)] shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[200px] sm:min-h-[240px]">
                <div className="lg:col-span-5 relative aspect-[2/1] lg:aspect-auto lg:min-h-[240px]">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=85"
                    alt="Value proposition - corporate learning outcomes"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    unoptimized={UNOPTIMIZED}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:from-black/50" />
                  <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6">
                    <p className="text-white/90 text-xs font-semibold tracking-widest uppercase">Our Edge</p>
                    <p className="text-white text-2xl sm:text-3xl font-bold mt-1">Measurable outcomes. Scalable delivery.</p>
                  </div>
                </div>
                <div className="lg:col-span-7 bg-gradient-to-br from-[#e63a27] to-[#c93222] p-6 sm:p-8 flex flex-col justify-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                    Value <span className="text-white/90">Proposition</span>
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base max-w-xl mb-6">
                    Shanky Corporate Training provides measurable learning outcomes, scalable delivery, and alignment with business objectives. Programs are built from needs analysis and competency mapping to ensure training translates into improved performance and retention.
                  </p>
                  <div className="flex flex-wrap gap-6 sm:gap-10">
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Measurable</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Learning outcomes</p>
                    </div>
                    <div className="w-px bg-white/30 hidden sm:block" />
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Scalable</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Delivery</p>
                    </div>
                    <div className="w-px bg-white/30 hidden sm:block" />
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Aligned</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">To business goals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-10">
              <div className="group bg-[var(--card-bg)] rounded-2xl p-5 sm:p-6 lg:p-7 border-2 border-[var(--card-border)] hover:border-[#e63a27]/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">How We Build Programs</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)] rounded-xl p-4 sm:p-5 border-l-4 border-[#e63a27] shadow-sm">
                    <h4 className="text-base font-bold text-[var(--text-primary)] mb-2">Needs analysis</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      We align learning objectives to your business goals and audience through structured discovery.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)] rounded-xl p-4 sm:p-5 border-l-4 border-[#e63a27]/70 shadow-sm">
                    <h4 className="text-base font-bold text-[var(--text-primary)] mb-2">Competency mapping</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      Programs are designed so training translates into improved performance and retention.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group bg-[var(--card-bg)] rounded-2xl p-5 sm:p-6 lg:p-7 border-2 border-[var(--card-border)] hover:border-[#e63a27]/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">What You Get</h3>
                </div>
                <div className="space-y-3">
                  {[
                    'Measurable learning outcomes aligned to KPIs.',
                    'Scalable delivery across teams and locations.',
                    'Training that translates into performance and retention.',
                    'Customized curricula and blended learning journeys.',
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
                { title: 'Needs Analysis', desc: 'Aligned to business objectives', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                { title: 'Competency Mapping', desc: 'Clear capability building', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h1m-1 4h1m4-4h1m-1 4h1m-5-10v-2a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h.01' },
                { title: 'Scalable Delivery', desc: 'Enterprise-wide learning', icon: 'M8 7h12m0 0l-4-4m4 4l4-4m0 6H4m0 0l4 4m-4-4l4-4' },
                { title: 'Performance & Retention', desc: 'Measurable impact', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
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
                  { title: 'Measurable Outcomes', desc: 'Learning that links to KPIs' },
                  { title: 'Scalable Delivery', desc: 'Across teams and locations' },
                  { title: 'Performance & Retention', desc: 'Training that drives results' },
                  { title: 'Needs-Led Design', desc: 'From analysis to delivery' },
                  { title: 'Competency Mapping', desc: 'Clear capability building' },
                  { title: 'Blended Journeys', desc: 'Customized to corporate goals' },
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

      <div className="h-screen"></div>

      {/* Section 5 - Clients, Quality Assurance, Growth Focus */}
      <section 
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 4 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 4 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-12 xl:py-16 h-full flex flex-col overflow-y-auto scrollbar-hide">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">Clients, Quality & Growth</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                Clients, Partnerships & <span className="text-[#e63a27]">Impact</span>
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
                  The company serves large corporates, educational institutions, and government agencies, collaborating with HR and L&D teams to embed learning into talent strategies. Strategic partnerships with industry experts and technology providers enhance program depth and delivery reach.
                </p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#e63a27] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27]">Quality Assurance and Impact Measurement</h3>
                </div>
                <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                  Training engagements include pre- and post-assessments, behavioral metrics, and ROI measurement frameworks. Continuous improvement cycles and certified trainers ensure consistent program quality and demonstrable impact.
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
                Shanky Corporate Training is expanding enterprise subscriptions to its digital learning platform, developing sector-specific academies, and offering managed learning services for large-scale workforce transformation initiatives.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Enterprise subscriptions to digital learning platform', 'Sector-specific academies', 'Managed learning services for large-scale workforce transformation'].map((t, i) => (
                  <div key={i} className="bg-[var(--background)] rounded-xl p-4 border border-[var(--card-border)] flex items-start gap-3">
                    <span className="text-[#e63a27] mt-0.5">✓</span>
                    <span className="text-[var(--text-secondary)]">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen"></div>

      {/* Section 6 - Offerings: Customized Curricula, Cohorts, Blended Learning */}
      <section 
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
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
                Customized Curricula & <span className="text-[#e63a27]">Learning Journeys</span>
              </h2>
              <div className="w-[80px] h-[4px] bg-[#e63a27] mx-auto mb-4 rounded-[2px]" />
            </div>

            <div className="space-y-8 lg:space-y-12">
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27] mb-4 lg:mb-6 flex items-center">
                  <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  Customized Curricula & Executive Programs
                </h3>
                <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                  Offerings include customized curricula, cohort-based executive programs, and blended learning journeys tailored to corporate KPIs. We work with HR and L&D teams to embed learning into talent strategies.
                </p>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  {['Customized curricula aligned to your goals', 'Cohort-based executive programs', 'Blended learning journeys', 'Tailored to corporate KPIs'].map((t, i) => (
                    <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-0.5">✓</span>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27] mb-4 lg:mb-6 flex items-center">
                  <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h1m-1 4h1m4-4h1m-1 4h1m-5-10v-2a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h.01" /></svg>
                  </div>
                  Organizational Development Consulting
                </h3>
                <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                  We support organizations with OD consulting and digital learning platforms for enterprises. Strategic partnerships with industry experts and technology providers enhance program depth and delivery reach.
                </p>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  {['Organizational development consulting', 'Digital learning platforms for enterprises', 'Partnerships with industry experts and technology providers', 'Program depth and delivery reach'].map((t, i) => (
                    <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-0.5">✓</span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen"></div>

      {/* Section 7 - Why We Are Best & Contact (home4 style) */}
      <section 
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
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
                { icon: '⚡', title: 'Measurable Outcomes', desc: 'Learning outcomes aligned to business objectives and KPIs' },
                { icon: '📋', title: 'Customized Curricula', desc: 'Programs tailored to corporate goals and competency mapping' },
                { icon: '🔄', title: 'Scalable Delivery', desc: 'Digital learning platforms and blended journeys' },
                { icon: '✨', title: 'Quality Assurance', desc: 'Pre- and post-assessments, behavioral metrics, ROI frameworks' },
                { icon: '📍', title: 'Clients & Partnerships', desc: 'Large corporates, institutions, government; HR & L&D collaboration' },
                { icon: '📊', title: 'Impact Measurement', desc: 'Certified trainers, continuous improvement, demonstrable impact' },
                { icon: '🏢', title: 'Growth Focus', desc: 'Enterprise subscriptions, sector academies, managed learning services' },
                { icon: '🤝', title: 'Strategic Partnerships', desc: 'Industry experts and technology providers' },
                { icon: '💡', title: 'Needs-Led Design', desc: 'Needs analysis and competency mapping for performance and retention' },
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
                {['Measurable learning outcomes aligned to business objectives', 'Pre- and post-assessments, behavioral metrics, ROI frameworks', 'Certified trainers and continuous improvement cycles', 'Collaboration with HR and L&D to embed learning in talent strategies', 'Strategic partnerships with industry experts and technology providers', 'Customized curricula and blended learning journeys for corporate KPIs'].map((t, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <span className="text-[#e63a27] text-xl">✓</span>
                    <span className="text-[var(--text-secondary)]">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-auto">
              <span className="inline-block px-4 lg:px-6 py-2 lg:py-2.5 bg-[#e63a27] text-white text-xs sm:text-sm font-semibold tracking-wider rounded-full uppercase mb-4 sm:mb-6">
                B2B Talent Development Partner
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6 leading-tight">
                Strengthen <span className="text-[#e63a27]">Workforce Capabilities</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 lg:mb-12 max-w-6xl mx-auto text-[var(--text-secondary)] leading-relaxed px-2">
                We design and deliver corporate learning programs for large corporates, educational institutions, and government agencies—with measurable outcomes, scalable delivery, and demonstrable impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center">
                <Link href="/contact" className="inline-flex px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm sm:text-base lg:text-lg shadow-lg">
                  Discuss Your Requirements
                </Link>
                <Link href="/contact" className="inline-flex px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 border-2 border-[var(--card-border)] text-[var(--text-primary)] bg-[var(--card-bg)] hover:bg-[var(--background)] font-semibold rounded-xl transition-all text-sm sm:text-base lg:text-lg">
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