'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const UNOPTIMIZED = true;

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

export default function ShankyBuildTechPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (    
    <div
      ref={containerRef}
      className="company-buildtech-root relative w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style={{ ['--accent' as string]: '#e63a27', ['--accent-hover' as string]: '#c93222' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .company-buildtech-root .section-heading,
        .company-buildtech-root h1, .company-buildtech-root h2, .company-buildtech-root h3, .company-buildtech-root h4 {
          font-family: var(--font-syne), 'Syne', 'Inter', Arial, sans-serif !important;
          font-weight: 700 !important;
          letter-spacing: 0.04em !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}} />

      {/* Section 1 - Hero */}
      <section className="relative w-full pt-3 sm:pt-4 md:pt-6 lg:pt-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pb-8 sm:pb-10 bg-[var(--background)]">
        <div className="relative h-[56vh] min-h-[260px] sm:min-h-[320px] sm:h-[60vh] md:h-[65vh] lg:h-[68vh] xl:h-[70vh] max-w-[1600px] mx-auto w-full rounded-xl sm:rounded-2xl overflow-hidden">
            <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Shanky BuildTech - Construction and project delivery"
            fill
            className="object-cover object-center brightness-[0.75]"
            priority
            unoptimized={UNOPTIMIZED}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col z-30">
            <div className="flex-1 flex items-center min-h-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-5 sm:py-8 md:py-10 lg:py-12 overflow-y-auto scrollbar-hide">
              <div
                className={`w-full max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-3xl text-left space-y-4 sm:space-y-5 md:space-y-6 transition-all duration-700 ease-out ${
                  heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div>
                  <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-[10px] min-[375px]:text-[11px] sm:text-xs lg:text-sm font-semibold tracking-[0.12em] sm:tracking-widest rounded-full uppercase">
                    B2B construction services & project delivery
                  </span>
                </div>
                <h1 className="section-heading text-2xl min-[360px]:text-3xl min-[400px]:text-4xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold leading-[1.15] sm:leading-[1.12] text-white drop-shadow-md">
                  <span className="block">SHANKY <span className="text-[#e63a27]">BUILDTECH</span></span>
                  <span className="block mt-0.5 sm:mt-1">PVT LTD</span>
                </h1>
                <p className="text-xs min-[375px]:text-sm sm:text-base md:text-lg lg:text-xl max-w-lg text-white/95 leading-relaxed font-medium">
                  The Group&apos;s B2B construction services and project delivery partner—construction management, finishing works, and facility readiness for developers and institutional clients.
                </p>
              </div>
            </div>
            <div className="shrink-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 sm:py-4 lg:py-5">
              <nav className="flex items-center text-[10px] min-[375px]:text-[11px] sm:text-xs md:text-sm text-white/90 flex-wrap gap-x-1 gap-y-0.5">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="opacity-70">/</span>
                <Link href="/company" className="hover:text-white transition-colors">Our Companies</Link>
                <span className="opacity-70">/</span>
                <span className="text-white font-medium truncate max-w-[120px] min-[380px]:max-w-[160px] sm:max-w-none">Shanky BuildTech Pvt Ltd</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - About Us */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden">
          <AnimateInView>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-12 sm:py-16 lg:py-20 xl:py-24 max-w-[90rem]">
            <div className="grid md:grid-cols-[1fr_1fr] gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start w-full mx-auto">
              <div className="order-2 md:order-1">
                <p className="text-[#e63a27] font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-3">Overview</p>
                <p className="text-[var(--text-secondary)] text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.65] max-w-2xl font-medium mb-6">
                  Shanky BuildTech Pvt Ltd is the Group&apos;s B2B construction services and project delivery partner, managed by Directors Vipin Kumar and Manoj Kumar Mishra. The company provides construction management, finishing works, and facility readiness services for developers and institutional clients.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-[var(--card-border)]">
                    <h4 className="section-heading text-lg font-bold text-[var(--text-primary)] mb-3">B2B Services</h4>
                    <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                      {['Project management', 'Finishing and fit-out services', 'Repairs and refurbishment', 'MEP coordination and vendor management', 'End-to-end delivery, subcontractor management', 'Handover-ready facilities for corporate occupiers'].map((t, i) => (
                        <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-0.5">✓</span>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-[var(--card-border)]">
                    <h4 className="section-heading text-lg font-bold text-[var(--text-primary)] mb-3">Value Proposition</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      Reliable schedule adherence, cost transparency, and integrated vendor ecosystems that reduce execution risk. Digital project controls and modular delivery improve predictability and minimize disruption.
                    </p>
                  </div>
                </div>
              </div>
              {/* Right: Image block */}
              <div className="relative order-1 md:order-2 w-full">
                <div className="aspect-[4/3] w-full max-h-[38vh] sm:max-h-[42vh] md:max-h-[48vh] overflow-hidden rounded-2xl border-2 border-[var(--text-primary)]/20 shadow-2xl [&>span]:!rounded-2xl [&_img]:!rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                    alt="Shanky BuildTech - construction and project delivery"
                    fill
                    className="object-cover object-center !rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    unoptimized={UNOPTIMIZED}
                  />
                  <div className="absolute inset-0 rounded-3xl rounded-b-3xl bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden />
                  <div className="absolute bottom-0 left-0 right-0 rounded-b-3xl p-5 sm:p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-white/90 text-xs sm:text-sm font-medium uppercase tracking-wider">Focus</p>
                        <p className="text-white text-2xl sm:text-3xl font-bold">End-to-end & facility readiness</p>
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
          </AnimateInView>
        </div>
      </section>

      {/* Section 3 - Services */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-xl sm:rounded-t-[2rem] overflow-hidden">
          <AnimateInView>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-12 sm:py-16 lg:py-20 max-w-[90rem]">
            <div className="text-center mt-1 sm:mt-6 lg:mt-8 mb-3 sm:mb-6 flex-shrink-0">
              <p className="text-[#e63a27] font-semibold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1 sm:mb-2">What We Offer</p>
              <h2 className="section-heading text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-1.5 sm:mb-2 leading-tight">
                B2B <span className="text-[#e63a27]">Services</span>
              </h2>
              <div className="w-16 sm:w-24 h-0.5 bg-[#e63a27] mx-auto mb-2 sm:mb-3 rounded-full" />
              <p className="text-[var(--text-secondary)] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
                Construction management, finishing works, and facility readiness for commercial and industrial clients.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 pb-16 sm:pb-8">
              {[
                { title: 'Project Management', desc: 'End-to-end delivery, subcontractor management, and handover-ready facilities for corporate occupiers.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80', bgColor: 'from-blue-900/40' },
                { title: 'Finishing & Fit-out', desc: 'Finishing and fit-out services for commercial and industrial clients.', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', bgColor: 'from-purple-900/40' },
                { title: 'Repairs & Refurbishment', desc: 'Repairs and refurbishment with quality checks and documentation.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80', bgColor: 'from-green-900/40' },
                { title: 'MEP & Vendor Management', desc: 'MEP coordination and vendor management for compliant, high-quality delivery.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', bgColor: 'from-orange-900/40' },
              ].map((item, index) => (
                <AnimateInView key={index} delayMs={index * 80}>
                <div className="group bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--card-border)] hover:border-[#e63a27]/40 hover:shadow-lg transition-all duration-300 flex flex-col min-h-[280px] sm:min-h-[320px]">
                  <div className="relative w-full h-32 sm:h-40 md:h-44 lg:h-48 overflow-hidden bg-[var(--background)]">
                    <Image src={item.image} alt={item.title} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" priority={index < 2} unoptimized={UNOPTIMIZED} />
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

      {/* Section 4 - Value Proposition */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden">
          <AnimateInView>
          <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20 max-w-[90rem]">
            <div className="min-h-[min-content] pb-8">
            <div className="rounded-2xl overflow-hidden mb-8 lg:mb-10 border border-[var(--card-border)] shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[200px] sm:min-h-[240px]">
                <div className="lg:col-span-5 relative aspect-[2/1] lg:aspect-auto lg:min-h-[240px]">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85"
                    alt="Value proposition - construction and project delivery"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    unoptimized={UNOPTIMIZED}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:from-black/50" />
                  <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6">
                    <p className="text-white/90 text-xs font-semibold tracking-widest uppercase">Our Edge</p>
                    <p className="text-white text-2xl sm:text-3xl font-bold mt-1">Schedule. Cost. Predictability.</p>
                  </div>
                </div>
                <div className="lg:col-span-7 bg-gradient-to-br from-[#e63a27] to-[#c93222] p-6 sm:p-8 flex flex-col justify-center">
                  <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                    Value <span className="text-white/90">Proposition</span>
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base max-w-xl mb-6">
                    Shanky BuildTech offers reliable schedule adherence, cost transparency, and integrated vendor ecosystems that reduce execution risk for developers, real estate owners, and corporate occupiers. Digital project controls and modular delivery approaches improve predictability and minimize disruption.
                  </p>
                  <div className="flex flex-wrap gap-6 sm:gap-10">
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Schedule</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Adherence</p>
                    </div>
                    <div className="w-px bg-white/30 hidden sm:block" />
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Cost</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Transparency</p>
                    </div>
                    <div className="w-px bg-white/30 hidden sm:block" />
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Predictability</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Digital controls</p>
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
                  <h3 className="section-heading text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Integrated Vendor Ecosystems</h3>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  We reduce execution risk for developers, real estate owners, and corporate occupiers through integrated vendor ecosystems, MEP coordination, and certified subcontractors—delivering compliant, high-quality finishes.
                </p>
              </div>
              <div className="group bg-[var(--card-bg)] rounded-2xl p-5 sm:p-6 lg:p-7 border-2 border-[var(--card-border)] hover:border-[#e63a27]/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </span>
                  <h3 className="section-heading text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Digital & Modular Delivery</h3>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Digital project controls and modular delivery approaches improve predictability and minimize disruption. We leverage digital project management tools to serve multi-site enterprise clients.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 lg:mb-10">
              {[
                { title: 'Schedule Adherence', desc: 'Reliable delivery', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                { title: 'Cost Transparency', desc: 'Clear pricing', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { title: 'Vendor Ecosystems', desc: 'Integrated partners', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
                { title: 'Modular Delivery', desc: 'Predictability & less disruption', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h1m-1 4h1m4-4h1m-1 4h1m-5-10v-2a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h.01' },
              ].map((item) => (
                <div key={item.title} className="group bg-[var(--card-bg)] rounded-2xl p-5 border-2 border-[var(--card-border)] hover:border-[#e63a27]/40 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27]/15 group-hover:bg-[#e63a27]/25 flex items-center justify-center mb-4 transition-colors">
                    <svg className="w-6 h-6 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  </span>
                  <h4 className="section-heading text-[var(--text-primary)] font-bold text-base mb-1">{item.title}</h4>
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
                  <h3 className="section-heading text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Why It Matters</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'Reduced Execution Risk', desc: 'For developers and occupiers' },
                  { title: 'Predictability', desc: 'Digital controls & modular delivery' },
                  { title: 'Minimal Disruption', desc: 'Efficient project execution' },
                  { title: 'Handover-Ready', desc: 'Facility readiness for corporates' },
                  { title: 'Cost Transparency', desc: 'Clear and reliable pricing' },
                  { title: 'Vendor Integration', desc: 'Single-point accountability' },
                ].map((item, idx) => (
                  <div key={item.title} className={`flex items-start gap-4 p-5 sm:p-6 border-[var(--card-border)] hover:bg-[#e63a27]/5 transition-colors border-b ${idx >= 3 ? 'sm:border-b-0' : ''}`}>
                    <span className="w-10 h-10 rounded-lg bg-[#e63a27] flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <div>
                      <h4 className="section-heading text-[var(--text-primary)] font-bold text-sm sm:text-base mb-0.5">{item.title}</h4>
                      <p className="text-[var(--text-secondary)] text-xs sm:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
          </AnimateInView>
        </div>
      </section>

      {/* Section 5 - Clients, Quality Assurance & Sustainability, Growth Focus */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden">
          <AnimateInView>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20 max-w-[90rem]">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">Clients, Quality & Growth</span>
              <h2 className="section-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                Clients, Partnerships & <span className="text-[#e63a27]">Sustainability</span>
              </h2>
              <div className="w-[80px] h-[4px] bg-[#e63a27] mx-auto mb-4 rounded-[2px]" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#e63a27] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h1m-1 4h1m4-4h1m-1 4h1m-5-10v-2a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h.01" /></svg>
                  </div>
                  <h3 className="section-heading text-2xl lg:text-3xl font-bold text-[#e63a27]">Clients and Partnerships</h3>
                </div>
                <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                  Clients include real estate developers, corporate occupiers, industrial park operators, and institutional investors. The company collaborates with architects, MEP consultants, and certified subcontractors to deliver compliant, high-quality finishes.
                </p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#e63a27] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <h3 className="section-heading text-2xl lg:text-3xl font-bold text-[#e63a27]">Quality Assurance and Sustainability</h3>
                </div>
                <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                  Delivery is governed by standardized quality checks, safety protocols, and documentation practices. Shanky BuildTech supports clients pursuing green building certifications by implementing resource-efficient construction practices and materials selection.
                </p>
              </div>
            </div>
            <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
              <h3 className="section-heading text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
                <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                Growth Focus
              </h3>
              <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                The company is scaling B2B service lines in commercial fit-outs, facility readiness programs, and managed refurbishment contracts, leveraging digital project management tools to serve multi-site enterprise clients.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Commercial fit-outs', 'Facility readiness programs', 'Managed refurbishment contracts'].map((t, i) => (
                  <div key={i} className="bg-[var(--background)] rounded-xl p-4 border border-[var(--card-border)] flex items-start gap-3">
                    <span className="text-[#e63a27] mt-0.5">✓</span>
                    <span className="text-[var(--text-secondary)]">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </AnimateInView>
        </div>
      </section>

      {/* Section 6 - End-to-end Delivery & Facility Readiness */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden">
          <AnimateInView>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20 max-w-[90rem]">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">How We Deliver</span>
              <h2 className="section-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                End-to-end & <span className="text-[#e63a27]">Handover-Ready</span>
              </h2>
              <div className="w-[80px] h-[4px] bg-[#e63a27] mx-auto mb-4 rounded-[2px]" />
            </div>

            <div className="space-y-8 lg:space-y-12">
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <h3 className="section-heading text-2xl lg:text-3xl font-bold text-[#e63a27] mb-4 lg:mb-6 flex items-center">
                  <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h1m-1 4h1m4-4h1m-1 4h1m-5-10v-2a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h.01" /></svg>
                  </div>
                  End-to-end Delivery & Subcontractor Management
                </h3>
                <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                  Services focus on end-to-end delivery, subcontractor management, and handover-ready facilities for corporate occupiers. We provide construction management, finishing works, and facility readiness for developers and institutional clients.
                </p>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  {['End-to-end delivery', 'Subcontractor management', 'Handover-ready facilities', 'Construction management'].map((t, i) => (
                    <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-0.5">✓</span>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <h3 className="section-heading text-2xl lg:text-3xl font-bold text-[#e63a27] mb-4 lg:mb-6 flex items-center">
                  <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  Facility Readiness & Managed Refurbishment
                </h3>
                <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                  We scale B2B service lines in commercial fit-outs, facility readiness programs, and managed refurbishment contracts. Digital project management tools enable us to serve multi-site enterprise clients with consistent quality and documentation.
                </p>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  {['Commercial fit-outs', 'Facility readiness programs', 'Managed refurbishment contracts', 'Multi-site enterprise delivery'].map((t, i) => (
                    <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-0.5">✓</span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          </AnimateInView>
        </div>
      </section>

      {/* Section 7 - Why We Are Best */}
      <section className="relative w-full bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="relative w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden">
          <AnimateInView>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20 max-w-[90rem]">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">Why Choose Us</span>
              <h2 className="section-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                Why <span className="text-[#e63a27]">Shanky BuildTech</span>
              </h2>
              <div className="w-[80px] h-[4px] bg-[#e63a27] mx-auto mb-4 rounded-[2px]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {[
                { icon: '⚡', title: 'Schedule Adherence', desc: 'Reliable delivery and cost transparency' },
                { icon: '🏗️', title: 'End-to-end Delivery', desc: 'Subcontractor management, handover-ready' },
                { icon: '🔧', title: 'MEP & Vendor Management', desc: 'Integrated vendor ecosystems' },
                { icon: '📐', title: 'Finishing & Fit-out', desc: 'Commercial and industrial clients' },
                { icon: '🔄', title: 'Repairs & Refurbishment', desc: 'Managed refurbishment contracts' },
                { icon: '📊', title: 'Digital Project Controls', desc: 'Predictability, minimal disruption' },
                { icon: '🏢', title: 'Facility Readiness', desc: 'Programs for corporate occupiers' },
                { icon: '🌱', title: 'Quality & Sustainability', desc: 'Green building, resource-efficient' },
                { icon: '🤝', title: 'Certified Subcontractors', desc: 'Compliant, high-quality finishes' },
              ].map((item, idx) => (
                <AnimateInView key={item.title} delayMs={idx * 60}>
                <div className="bg-[var(--card-bg)] rounded-2xl p-4 sm:p-6 border border-[var(--card-border)] hover:border-[#e63a27]/50 transition-all">
                  <div className="text-2xl sm:text-3xl mb-2 text-[#e63a27]">{item.icon}</div>
                  <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1 sm:mb-2">{item.title}</h4>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm">{item.desc}</p>
                </div>
                </AnimateInView>
              ))}
            </div>
            <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)] mb-8">
              <h3 className="section-heading text-2xl lg:text-3xl font-bold text-[#e63a27] mb-4">Our Strengths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Standardized quality checks, safety protocols, and documentation', 'Collaboration with architects, MEP consultants, certified subcontractors', 'Resource-efficient construction and materials selection for green certifications', 'Digital project management for multi-site enterprise clients', 'End-to-end delivery and handover-ready facilities', 'Reliable schedule adherence and cost transparency'].map((t, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <span className="text-[#e63a27] text-xl">✓</span>
                    <span className="text-[var(--text-secondary)]">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-auto">
              <span className="inline-block px-4 lg:px-6 py-2 lg:py-2.5 bg-[#e63a27] text-white text-xs sm:text-sm font-semibold tracking-wider rounded-full uppercase mb-4 sm:mb-6">
                B2B Construction & Project Delivery
              </span>
              <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6 leading-tight">
                Partner with <span className="text-[#e63a27]">Shanky BuildTech</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 lg:mb-12 max-w-6xl mx-auto text-[var(--text-secondary)] leading-relaxed px-2">
                Construction management, finishing works, and facility readiness for developers and institutional clients—with reliable schedule adherence, cost transparency, and integrated vendor ecosystems that reduce execution risk.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center">
                <Link href="/contact" className="inline-flex px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm sm:text-base lg:text-lg shadow-lg">
                  Get Started Today
                </Link>
                <Link href="/contact" className="inline-flex px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 border-2 border-[var(--card-border)] text-[var(--text-primary)] bg-[var(--card-bg)] hover:bg-[var(--background)] font-semibold rounded-xl transition-all text-sm sm:text-base lg:text-lg">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          </AnimateInView>
        </div>
      </section>

    </div>
  );
}