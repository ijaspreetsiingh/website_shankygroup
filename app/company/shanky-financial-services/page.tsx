'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import FooterFour from '../../home/home4/FooterFour';

export default function ShankyFinancialScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

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
          <Image
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&q=80"
            alt="Financial Services Excellence"
            fill
            className="object-cover object-center brightness-[0.75]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          {/* Content: left-aligned, vertical centre in main area */}
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 flex items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-10 lg:py-14">
              <div className="w-full max-w-xl lg:max-w-2xl text-left">
                <div className="mb-5 lg:mb-6">
                  <span className="inline-block px-4 py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-xs lg:text-sm font-semibold tracking-widest rounded-full uppercase">
                    Established excellence since 2014
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15] text-white mb-4 lg:mb-5">
                  SHANKY <span className="text-[#e63a27]">FINANCIAL</span> SERVICES
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-lg text-white/90 leading-relaxed mb-8 lg:mb-10">
                  Best financial service provider company based in Delhi, India
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-6 py-3 lg:px-8 lg:py-3.5 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm lg:text-base shadow-lg">
                    Explore Services
                  </button>
                  <button className="px-6 py-3 lg:px-8 lg:py-3.5 border-2 border-white text-white bg-white/10 hover:bg-white/20 font-semibold rounded-xl transition-all text-sm lg:text-base backdrop-blur-sm">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
            {/* Breadcrumb: bottom left */}
            <div className="shrink-0 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-4 lg:py-5">
              <nav className="flex items-center text-xs sm:text-sm text-white/90">
                <a href="#" className="hover:text-white transition-colors">Home</a>
                <span className="mx-2 sm:mx-2.5 opacity-70">/</span>
                <a href="#" className="hover:text-white transition-colors">Financial Services</a>
                <span className="mx-2 sm:mx-2.5 opacity-70">/</span>
                <span className="text-white font-medium truncate max-w-[160px] sm:max-w-none">Shanky Financial Services</span>
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
              {/* Left: Editorial content */}
              <div className="order-2 md:order-1">
                <p className="text-[#e63a27] font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-3">
                  About Us
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.25rem] font-bold leading-[1.1] text-[var(--text-primary)] tracking-tight mb-5">
                  Best financial{' '}
                  <span className="text-[#e63a27]">service provider</span>
                  <br className="hidden sm:block" />
                  <span className="text-[var(--text-primary)]">in Delhi.</span>
                </h2>
                <div className="w-16 h-0.5 bg-[#e63a27] mb-6" aria-hidden />
                <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg leading-[1.7] max-w-xl mb-5">
                  SHANKY FINANCIAL SERVICES is among the leading financial service providers based in Delhi. Established in <strong className="text-[var(--text-primary)]">2014</strong>, we have tie-ups with all Nationalised, Private & Multinational Banks.
                </p>
                <p className="text-[var(--text-secondary)] text-sm md:text-base leading-[1.7] max-w-xl mb-8">
                  We specialise in working capital solutions through factoring—turning receivables into cash. Our vision is to achieve global standards and become a world-class financial services enterprise.
                </p>
                {/* Stats: bold numbers */}
                <div className="flex gap-8 sm:gap-12">
                  <div>
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e63a27] tracking-tight leading-none">2014</div>
                    <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-medium uppercase tracking-wider">Established</div>
                  </div>
                  <div>
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] tracking-tight leading-none">All</div>
                    <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-medium uppercase tracking-wider">Bank tie-ups</div>
                  </div>
                </div>
              </div>
              {/* Right: Image block */}
              <div className="relative order-1 md:order-2">
                <div className="aspect-[4/3] md:aspect-[4/3] max-h-[55vh] md:max-h-[68vh] w-full overflow-hidden border-2 border-[var(--text-primary)]/20 shadow-2xl [&>span]:!rounded-[1.5rem] [&_img]:!rounded-[1.5rem]" style={{ borderRadius: '1.5rem' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                    alt="Shanky Financial Services"
                    fill
                    className="object-cover !rounded-[1.5rem]"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 rounded-3xl rounded-b-3xl bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden />
                  <div className="absolute bottom-0 left-0 right-0 rounded-b-3xl p-5 sm:p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-white/90 text-xs sm:text-sm font-medium uppercase tracking-wider">Portfolio growth</p>
                        <p className="text-white text-2xl sm:text-3xl font-bold">+24.5%</p>
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
              <p className="text-[#e63a27] font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-2">Our Services</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-2">
                Financial <span className="text-[#e63a27]">Products</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#e63a27] mx-auto mb-3" />
              <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-2xl mx-auto">
                Solutions tailored to your business needs
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 flex-1 min-h-0 overflow-y-auto pb-6 scrollbar-hide items-start">
              {[
                { title: 'Home Loan', desc: 'Housing finance with competitive rates and flexible tenure for your dream home.', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80' },
                { title: 'Business Loan', desc: 'Working capital and growth funding for SMEs and enterprises.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80' },
                { title: 'Bill Discounting', desc: 'Invoice finance to unlock cash flow against your receivables.', image: 'https://images.unsplash.com/photo-1554224311-beee460c201b?w=600&q=80' },
                { title: 'Factoring', desc: 'Receivables finance to turn your invoices into immediate working capital.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
                { title: 'Loan Against Property', desc: 'Property-backed loans for higher limits and better interest rates.', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80' },
                { title: 'Personal Loan', desc: 'Quick unsecured loans for individuals with minimal documentation.', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80' },
                { title: 'MSME Loan', desc: 'Tailored financing for micro, small and medium enterprises.', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80' },
                { title: 'Vendor Finance', desc: 'Short-term funding by selling receivables to improve cash flow.', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80' },
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

      {/* Section 4 - Bill Discounting */}
      <section 
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 3 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 3 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          {/* Subtle bg pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #e63a27 1px, transparent 1px), radial-gradient(circle at 80% 80%, #e63a27 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12 h-full flex flex-col overflow-y-auto scrollbar-hide max-w-[90rem]">
            {/* Hero strip: image + headline + stat */}
            <div className="rounded-2xl overflow-hidden mb-8 lg:mb-10 border border-[var(--card-border)] shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[200px] sm:min-h-[240px]">
                <div className="lg:col-span-5 relative aspect-[2/1] lg:aspect-auto lg:min-h-[240px]">
                  <Image
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=85"
                    alt="Bill discounting and invoice finance"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:from-black/50" />
                  <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6">
                    <p className="text-white/90 text-xs font-semibold tracking-widest uppercase">Invoice Finance</p>
                    <p className="text-white text-2xl sm:text-3xl font-bold mt-1">Turn bills into cash.</p>
                  </div>
                </div>
                <div className="lg:col-span-7 bg-gradient-to-br from-[#e63a27] to-[#c93222] p-6 sm:p-8 flex flex-col justify-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                    Understanding <span className="text-white/90">Bill Discounting</span>
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base max-w-xl mb-6">
                    Get the invoice amount from a partner lender at a discounted value—instant working capital against your receivables.
                  </p>
                  <div className="flex flex-wrap gap-6 sm:gap-10">
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Quick</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Fund disbursal</p>
                    </div>
                    <div className="w-px bg-white/30 hidden sm:block" />
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Flexible</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Lender options</p>
                    </div>
                    <div className="w-px bg-white/30 hidden sm:block" />
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-white">Simple</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Process</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Two main cards: Methods + Procedure */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-10">
              <div className="group bg-[var(--card-bg)] rounded-2xl p-5 sm:p-6 lg:p-7 border-2 border-[var(--card-border)] hover:border-[#e63a27]/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Presenting Methods</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)] rounded-xl p-4 sm:p-5 border-l-4 border-[#e63a27] shadow-sm">
                    <h4 className="text-base font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                      <span className="w-7 h-7 bg-[#e63a27] rounded-full flex items-center justify-center text-xs font-bold text-white">1</span>
                      With Recourse
                    </h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed pl-9">
                      Seller’s bank verifies all documents and discount terms, then presents bills to the buyer’s bank for clearance.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)] rounded-xl p-4 sm:p-5 border-l-4 border-[#e63a27]/70 shadow-sm">
                    <h4 className="text-base font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                      <span className="w-7 h-7 bg-[#e63a27] rounded-full flex items-center justify-center text-xs font-bold text-white">2</span>
                      Without Recourse
                    </h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed pl-9">
                      No document verification by seller’s bank; the bill is presented directly for payment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group bg-[var(--card-bg)] rounded-2xl p-5 sm:p-6 lg:p-7 border-2 border-[var(--card-border)] hover:border-[#e63a27]/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">How It Works</h3>
                </div>
                <div className="space-y-3 overflow-y-auto max-h-[320px] pr-1">
                  {[
                    'Seller and buyer sign a contract for goods or services.',
                    'Seller raises the invoice on the buyer.',
                    'Buyer accepts the invoice and payment terms.',
                    'Seller approaches partner bank or lender for discounting.',
                    'Lender verifies transaction and creditworthiness, then releases funds after deducting fees.',
                    'On maturity, lender presents the bill and collects from the buyer.',
                  ].map((text, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="w-7 h-7 rounded-full bg-[#e63a27] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">{i + 1}</span>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed pt-0.5">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key highlights - 4 cards with more punch */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 lg:mb-10">
              {[
                { title: 'Creditworthiness', desc: 'Buyer & seller evaluation', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                { title: 'Preferred Banking', desc: 'Reputed banking partners', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h1m-1 4h1m4-4h1m-1 4h1m-5-10v-2a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h.01' },
                { title: 'Inter Bank Dealing', desc: 'Direct bank-to-bank', icon: 'M8 7h12m0 0l-4-4m4 4l4-4m0 6H4m0 0l4 4m-4-4l4-4' },
                { title: 'Usance Bill', desc: 'Time-bound validity', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
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

            {/* Benefits - bolder layout */}
            <div className="rounded-2xl overflow-hidden border-2 border-[var(--card-border)] shadow-lg">
              <div className="bg-[var(--card-bg)] px-5 sm:px-6 lg:px-8 py-5 border-b border-[var(--card-border)]">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-xl bg-[#e63a27] flex items-center justify-center shadow-lg shadow-[#e63a27]/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Benefits of Bill Discounting</h3>
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

      {/* Section 5 - Vision, Mission & Vendor Finance (home4 style) */}
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
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">Our Vision & Mission</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                Guided by <span className="text-[#e63a27]">Purpose</span>
              </h2>
              <div className="w-[80px] h-[4px] bg-[#e63a27] mx-auto mb-4 rounded-[2px]" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#e63a27] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27]">Our Vision</h3>
                </div>
                <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                  To be the world's fastest operating system for supply chain finance.
                </p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#e63a27] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27]">Our Mission</h3>
                </div>
                <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                  Making finance quick, reliable and transparent.
                </p>
              </div>
            </div>
            <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
              <h3 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
                <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                Vendor Finance
              </h3>
              <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                Vendor Finance solution allows businesses to access short-term funding by selling their accounts receivable to us. This allows you to free up working capital and improve your cash flow. Our flexible financing options are tailored to meet the unique needs of your business.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Features</h4>
                  <ul className="space-y-3">
                    {['Unsecured Line of Credit Facility offered to Vendors having good track record with well performing Corporates.', 'Loan agreement signed between the Vendor and Financier.', 'Enables qualifying Vendors to discount confirmed invoices.', 'Flexible repayment terms.'].map((text, i) => (
                      <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{text}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Benefits of Vendor Finance</h4>
                  <ul className="space-y-3">
                    {['Access to new and profitable lending opportunities with little or no investment.', 'Funding of a confirmed end-purpose.', 'Digital and standardized underwriting process.', 'Highly automated and hence scalable model.'].map((text, i) => (
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
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
          activeSection === 5 ? 'z-50 translate-y-0 scale-100 opacity-100' : 
          activeSection > 5 ? 'z-50 -translate-y-full scale-95 opacity-0' : 
          'z-30 translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-12 xl:py-16 h-full flex flex-col overflow-y-auto scrollbar-hide">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-wider mb-2 lg:mb-4 block uppercase">Advanced Financing Solutions</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-3 lg:mb-6">
                Comprehensive <span className="text-[#e63a27]">Financial Services</span>
              </h2>
              <div className="w-[80px] h-[4px] bg-[#e63a27] mx-auto mb-4 rounded-[2px]" />
            </div>

            <div className="space-y-8 lg:space-y-12">
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27] mb-4 lg:mb-6 flex items-center">
                  <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </div>
                  Dealer Finance
                </h3>
                <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                  Dealer Finance solution is designed to help businesses access financing options for inventory and equipment purchases. Our partnerships with dealers and manufacturers ensure you have access to the best financing options available.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Features</h4>
                    <ul className="space-y-3">
                      {['Unsecured Line of Credit Facility offered to Vendors having good track record with well performing Corporates.', 'Loan agreement signed between the Vendor and Financier.', 'Enables qualifying Vendors to discount confirmed invoices.', 'Flexible repayment terms.'].map((t, i) => (
                        <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Benefits</h4>
                    <ul className="space-y-3">
                      {['Access to new and profitable lending opportunities with little or no investment.', 'Funding of a confirmed end-purpose.', 'Digital and standardized underwriting process.', 'Highly automated and hence scalable model.'].map((t, i) => (
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
                  Factoring
                </h3>
                <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                  We understand the importance of maintaining a solid cash flow for the growth and success of your business. Our Factoring service offers a solution by providing immediate funding through a financer who provides credit for your accounts receivable.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Features</h4>
                    <ul className="space-y-3">
                      {['Unsecured Line of Credit offered to Sellers for sale to reputed Buyers.', 'Avoids any loan agreement.', 'Flexible repayment terms.'].map((t, i) => (
                        <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Benefits</h4>
                    <ul className="space-y-3">
                      {['Access to new and profitable lending opportunities with little or no investment.', 'Funding of a confirmed end-purpose.', 'Digital and standardized underwriting process.', 'Easy to scale-up.'].map((t, i) => (
                        <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--card-bg)] rounded-2xl p-6 lg:p-8 border border-[var(--card-border)]">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#e63a27] mb-4 lg:mb-6 flex items-center">
                  <div className="w-10 h-10 bg-[#e63a27] rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
                  Sales Invoice Finance
                </h3>
                <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                  Sales Invoice Finance solution allows businesses to access immediate funding through financers who provides credit for confirmed invoices. This allows you to improve your cash flow without needing traditional bank loans.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Features</h4>
                    <ul className="space-y-3">
                      {['Unsecured Line of Credit offered to Vendors having good track record.', 'Enables qualifying Vendors to discount Invoices.', 'Flexible repayment terms.'].map((t, i) => (
                        <li key={i} className="flex items-start"><span className="text-[#e63a27] mr-2 mt-1">✓</span><span className="text-[var(--text-secondary)]">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--card-border)]">
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Benefits</h4>
                    <ul className="space-y-3">
                      {['Access to new and profitable lending opportunities with little or no investment.', 'Digital and standardized underwriting process.', 'Highly automated and hence scalable model.', 'Interest charged only for actual period of credit usage.'].map((t, i) => (
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
                { icon: '⚡', title: 'Quickest Loan Service', desc: 'Fast processing and quick approvals' },
                { icon: '💰', title: 'Low Interest Rate', desc: 'Competitive rates in the market' },
                { icon: '🔓', title: 'No Collateral Needed', desc: 'Unsecured loan options available' },
                { icon: '✨', title: 'Hassle Free Loan', desc: 'Simple and easy documentation' },
                { icon: '🚪', title: 'Door Step Service', desc: 'Service at your convenience' },
                { icon: '💸', title: 'No Processing Fee', desc: 'Zero processing charges' },
                { icon: '🏦', title: 'Access to Multiple Banking Partners', desc: 'Wide network of banks' },
                { icon: '📊', title: 'Free Financial Need Analysis', desc: 'Complimentary financial assessment' },
                { icon: '🤝', title: 'Complete Guidance and Support', desc: 'End-to-end assistance' },
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
                {['Latest updates on Bank guidelines and related circulars', 'Identification of best banking option', 'Unbeatable liasoning across all levels', 'Cost effective and timely delivery', 'Utmost transparency and honesty', 'Processing fee is payable only on success/delivery'].map((t, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <span className="text-[#e63a27] text-xl">✓</span>
                    <span className="text-[var(--text-secondary)]">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-auto">
              <span className="inline-block px-4 lg:px-6 py-2 lg:py-2.5 bg-[#e63a27] text-white text-xs sm:text-sm font-semibold tracking-wider rounded-full uppercase mb-4 sm:mb-6">
                Delhi's Leading Finance Company
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6 leading-tight">
                Partner with <span className="text-[#e63a27]">Excellence</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 lg:mb-12 max-w-6xl mx-auto text-[var(--text-secondary)] leading-relaxed px-2">
                As we all know that Delhi is a home to a large number of businesses, so it's no wonder that many financial institutions are present here. There are many finance companies in Delhi which are providing the best services and high quality work to their clients.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center">
                <button className="px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm sm:text-base lg:text-lg shadow-lg">
                  Get Started Today
                </button>
                <button className="px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 border-2 border-[var(--card-border)] text-[var(--text-primary)] bg-[var(--card-bg)] hover:bg-[var(--background)] font-semibold rounded-xl transition-all text-sm sm:text-base lg:text-lg">
                  Contact Us
                </button>
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