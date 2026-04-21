'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import WhoWeAreNav from '../WhoWeAreNav';
import mission2Image from '../../images/mission2.png';

// Section images - professional compliance & corporate
const SECTION_IMAGES = {
  commitment: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
  governance: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
  policy: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
  regulatory: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
  financial: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  cta: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80',
};

export default function CompliancePage() {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [isDark, setIsDark] = useState(false);

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
    const keys = ['commitment', 'governance', 'policy', 'regulatory', 'financial', 'cta'];
    const observers = keys.map((key) => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisibleSections((s) => ({ ...s, [key]: true }));
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(el);
      return () => observer.disconnect();
    });
    return () => observers.forEach((cleanup) => cleanup?.());
  }, []);

  const isVisible = (key: string) => visibleSections[key] ?? false;

  return (
    <>
      <Head>
        <title>Compliance & Governance - Shanky Group | Corporate Ethics & Regulatory Standards</title>
        <meta name="description" content="Shanky Group maintains comprehensive compliance and governance frameworks including board oversight, internal controls, ethical conduct, and regulatory compliance across all business operations." />
        <meta name="keywords" content="Shanky Group compliance, corporate governance, regulatory compliance, ethical conduct, board oversight, internal controls, anti-bribery, data protection, AML KYC, whistleblower policy" />
        <meta property="og:title" content="Compliance & Governance - Shanky Group" />
        <meta property="og:description" content="Comprehensive compliance and governance frameworks ensuring ethical business practices, regulatory compliance, and stakeholder trust." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shankygroup.com/who-we-are/compliance" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Compliance & Governance - Shanky Group" />
        <meta name="twitter:description" content="Corporate compliance and governance frameworks ensuring ethical business practices and regulatory standards." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Shanky Group",
              "description": "Shanky Group maintains comprehensive compliance and governance frameworks ensuring ethical business practices and regulatory compliance.",
              "url": "https://shankygroup.com/who-we-are/compliance",
              "mainEntity": {
                "@type": "WebPage",
                "name": "Compliance & Governance",
                "description": "Comprehensive compliance and governance frameworks including board oversight, internal controls, ethical conduct, and regulatory compliance."
              },
              "hasPart": [
                {
                  "@type": "Service",
                  "name": "Board Oversight",
                  "description": "Each company has a board of directors responsible for strategic direction, oversight, and governance."
                },
                {
                  "@type": "Service", 
                  "name": "Internal Controls",
                  "description": "Robust internal controls and audit mechanisms ensure financial integrity, risk management, and regulatory compliance."
                },
                {
                  "@type": "Service",
                  "name": "Ethical Conduct",
                  "description": "The Group's code of conduct outlines expectations for ethical behavior, conflict of interest management, and stakeholder engagement."
                }
              ]
            })
          }}
        />
      </Head>
      <div
        className="relative w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]"
        style={{ ['--accent' as string]: '#e63a27', ['--accent-hover' as string]: '#c93222' }}
      >
      {/* Hero */}
      <section className="relative w-full pt-3 sm:pt-4 md:pt-6 lg:pt-8 px-3 sm:px-4 md:px-8 lg:px-12 pb-0 bg-[var(--background)]">
        <div className="about-hero-card relative min-h-[60vh] sm:h-[68vh] md:h-[72vh] lg:h-[75vh] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-[var(--card-border)]">
          <Image
            src={mission2Image}
            alt="Compliance - Policy, Regulations, Transparency, Standards, Governance - Shanky Group"
            fill
            className="object-cover object-[center_24%] brightness-[0.9] contrast-[1.02]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col z-30">
            <div className="about-hero-content flex-1 flex items-center px-3 sm:px-4 md:px-10 lg:px-14 xl:px-20 py-6 sm:py-10 lg:py-16">
              <div className="w-full max-w-2xl lg:max-w-3xl text-left">
                <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-[10px] sm:text-xs lg:text-sm font-semibold tracking-widest rounded-full uppercase mb-3 sm:mb-5 lg:mb-6">
                  Compliance & Governance
                </span>
                <h1 className="about-hero-title section-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-3 sm:mb-4 lg:mb-5">
                  <span className="text-[#e63a27]">COMPLIANCE</span>
                  <br />
                  <span className="text-white/95">That Builds Trust</span>
                </h1>
                <p className="about-hero-desc text-sm sm:text-base md:text-xl max-w-xl text-white/90 leading-relaxed mb-5 sm:mb-8 lg:mb-10">
                  Upholding the highest standards of regulatory compliance, ethics, and corporate governance across the Shanky Group.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="about-hero-cta inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] px-5 py-3 sm:px-6 sm:py-3.5 lg:px-8 lg:py-4 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm lg:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] touch-manipulation"
                  >
                    Contact Compliance
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-40 px-3 sm:px-4 md:px-10 lg:px-14 xl:px-20 py-3 sm:py-4 lg:py-5">
              {!isDark && (
                <div className="mt-2 sm:mt-3">
                  <WhoWeAreNav />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-14 md:py-20 lg:py-24 max-w-[90rem]">
        {/* Section 1: Our Commitment – bold split with accent strip */}
        <section
          ref={(el) => { sectionRefs.current.commitment = el; }}
          className={`mb-12 sm:mb-16 lg:mb-28 transition-all duration-700 ${isVisible('commitment') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--card-border)] shadow-xl bg-[var(--card-bg)]">
            <div className="grid lg:grid-cols-[1fr_1.1fr] min-h-0">
              {/* Left: Content + inline stats */}
              <div className="relative flex flex-col justify-center p-5 sm:p-8 lg:p-14 xl:p-16 order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 sm:gap-3 text-[#e63a27] font-semibold text-sm sm:text-lg md:text-xl tracking-[0.15em] uppercase mb-3 sm:mb-5">
                  <span className="w-8 sm:w-10 h-0.5 bg-[#e63a27]" />
                  Our Commitment
                </span>
                <h2 className="section-heading text-xl sm:text-2xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold leading-[1.15] text-[var(--text-primary)] tracking-tight mb-3 sm:mb-5">
                  Integrity at <span className="text-[#e63a27]">Every Level</span>
                </h2>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg leading-[1.7] max-w-lg mb-5 sm:mb-8">
                  At Shanky Group, compliance is not just a requirement—it is embedded in our culture. We conduct business with transparency, adhere to all applicable laws, and maintain the trust of our stakeholders.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { value: '100%', label: 'Regulatory adherence' },
                    { value: 'Zero', label: 'Ethical violations' },
                    { value: 'Robust', label: 'Internal controls' },
                    { value: '24/7', label: 'Monitoring' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="group flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e63a27]/40 hover:shadow-md transition-all duration-300"
                    >
                      <span className="text-base sm:text-xl md:text-2xl font-bold text-[#e63a27] tabular-nums">{stat.value}</span>
                      <span className="text-[10px] sm:text-xs md:text-sm text-[var(--text-secondary)] font-medium max-w-[100px] sm:max-w-[120px]">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right: Full-height image with overlay quote */}
              <div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-full order-1 lg:order-2">
                <Image
                  src={SECTION_IMAGES.commitment}
                  alt="Team collaboration and ethical business"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:from-black/60 lg:via-transparent lg:to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-10">
                  <blockquote className="text-white text-sm sm:text-lg md:text-xl font-medium leading-relaxed max-w-md">
                    &ldquo;Trust is built when actions match words—every day, in every decision.&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Corporate Governance – headline + image strip + numbered cards */}
        <section
          ref={(el) => { sectionRefs.current.governance = el; }}
          className={`mb-12 sm:mb-16 lg:mb-28 transition-all duration-700 ${isVisible('governance') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
            <div>
              <span className="inline-flex items-center gap-2 text-[#e63a27] font-semibold text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase mb-2 sm:mb-3">
                <span className="w-6 sm:w-8 h-0.5 bg-[#e63a27]" />
                Corporate Governance
              </span>
              <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] text-[var(--text-primary)] tracking-tight">
                Governance & <span className="text-[#e63a27]">Compliance</span>
              </h2>
            </div>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg leading-[1.7] max-w-xl lg:text-right">
              Shanky Group is committed to the highest standards of corporate governance and transparency. Our companies are registered with the Ministry of Corporate Affairs and adhere to all statutory requirements.
            </p>
          </div>

          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden h-44 sm:h-52 md:h-64 lg:h-72 mb-8 sm:mb-12 border border-[var(--card-border)] shadow-lg">
            <Image
              src={SECTION_IMAGES.governance}
              alt="Corporate governance and board oversight"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-12 lg:px-16">
              <p className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl font-medium max-w-2xl leading-snug">
                Governance practices aligned with global standards—ensuring long-term sustainability and stakeholder confidence.
              </p>
            </div>
          </div>

          <h3 className="section-heading text-base sm:text-lg md:text-xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6">Governance Framework</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {[
              { num: '01', title: 'Board Oversight', desc: 'Each company has a board of directors responsible for strategic direction, oversight, and governance.', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h1m-1 4h1m4-4h1m-1 4h1m-5-10v-2a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h.01' },
              { num: '02', title: 'Internal Controls', desc: 'Robust internal controls and audit mechanisms ensure financial integrity, risk management, and regulatory compliance.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { num: '03', title: 'Ethical Conduct', desc: "The Group's code of conduct outlines expectations for ethical behavior, conflict of interest management, and stakeholder engagement.", icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
              { num: '04', title: 'Stakeholder Engagement', desc: 'Regular communication with shareholders, employees, clients, and partners fosters trust and accountability.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 border border-[var(--card-border)] hover:border-[#e63a27]/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden"
              >
                <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-2xl sm:text-4xl font-black text-[#e63a27]/15 group-hover:text-[#e63a27]/25 transition-colors select-none">{item.num}</span>
                <span className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#e63a27]/15 group-hover:bg-[#e63a27]/25 flex items-center justify-center mb-3 sm:mb-4 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                </span>
                <h4 className="section-heading relative text-[var(--text-primary)] font-bold text-base sm:text-lg mb-1.5 sm:mb-2 group-hover:text-[#e63a27] transition-colors">{item.title}</h4>
                <p className="relative text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Policy Framework - full-width image banner + cards */}
        <section
          ref={(el) => { sectionRefs.current.policy = el; }}
          className={`mb-12 sm:mb-16 lg:mb-28 transition-all duration-700 ${isVisible('policy') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-[#e63a27] font-semibold text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase mb-2">
            Policy Framework
          </p>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-5 sm:mb-8">
            Our Compliance <span className="text-[#e63a27]">Policies</span>
          </h2>
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden h-40 sm:h-48 md:h-56 lg:h-64 mb-8 sm:mb-12 border border-[var(--card-border)] shadow-lg">
            <Image
              src={SECTION_IMAGES.policy}
              alt="Compliance policies and documentation"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
              <div className="px-4 sm:px-6 md:px-12 lg:px-16 text-white max-w-xl">
                <p className="text-white/90 text-xs sm:text-sm md:text-base mb-1 sm:mb-2">Clear. Documented. Enforced.</p>
                <h3 className="section-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-snug">Policies that protect our people and our reputation.</h3>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: 'Code of Conduct', desc: 'Guidelines for ethical behaviour and professional standards for all employees and partners.' },
              { title: 'Anti-Bribery & Corruption', desc: 'Zero tolerance for bribery and corruption; clear procedures for gifts and hospitality.' },
              { title: 'Data Protection & Privacy', desc: 'Safeguarding personal and business data in line with applicable privacy laws.' },
              { title: 'AML & KYC', desc: 'Anti-money laundering and know-your-customer processes across financial services.' },
              { title: 'Whistleblower Policy', desc: 'Safe channels for reporting concerns without fear of retaliation.' },
              { title: 'Conflict of Interest', desc: 'Disclosure and management of conflicts to protect decision-making integrity.' },
            ].map((item) => (
              <div
                key={item.title}
                className="group bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[var(--card-border)] hover:border-[#e63a27]/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#e63a27]/15 group-hover:bg-[#e63a27]/25 flex items-center justify-center mb-3 sm:mb-4 transition-colors">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1.5 sm:mb-2 group-hover:text-[#e63a27] transition-colors">{item.title}</h3>
                <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Areas - Regulatory & Governance */}
        <section
          ref={(el) => { sectionRefs.current.regulatory = el; }}
          className={`mb-12 sm:mb-16 lg:mb-28 transition-all duration-700 ${isVisible('regulatory') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 sm:mb-10">
            <span className="inline-flex items-center gap-2 text-[#e63a27] font-semibold text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase mb-2 sm:mb-3">
              <span className="w-6 sm:w-8 h-0.5 bg-[#e63a27]" />
              Key Areas
            </span>
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
              Regulatory & <span className="text-[#e63a27]">Governance</span>
            </h2>
          </div>

          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--card-border)] shadow-xl bg-[var(--card-bg)]">
            <div className="grid lg:grid-cols-2 min-h-0">
              <div className="relative min-h-[260px] sm:min-h-[300px] lg:min-h-[380px]">
                <Image
                  src={SECTION_IMAGES.regulatory}
                  alt="Regulatory compliance"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 lg:bg-gradient-to-r lg:from-[#e63a27]/95 lg:via-[#e63a27]/90 lg:to-[#c93222]/95" />
                <div className="absolute inset-0 flex flex-col justify-end lg:justify-center p-4 sm:p-6 lg:p-10 xl:p-12 text-white">
                  <h3 className="section-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">Regulatory Compliance</h3>
                  <p className="text-white/95 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 max-w-lg">
                    We comply with RBI, SEBI, and other sector-specific regulations. Timely filings, audits, and corrective actions are ensured by our compliance team.
                  </p>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      'Reserve Bank of India guidelines',
                      'Company law and corporate governance',
                      'Sector-specific norms (NBFC, trading, etc.)',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 sm:gap-3 text-white/95 text-xs sm:text-sm md:text-base">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-4 sm:p-6 lg:p-10 xl:p-12 flex flex-col justify-center">
                <h3 className="section-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4">
                  Governance & Board
                </h3>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed mb-5 sm:mb-8">
                  Our boards and management are committed to strong governance: independent oversight, clear accountability, and regular reviews of compliance and risk.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { label: 'Board oversight', desc: 'Independent direction & strategy' },
                    { label: 'Accountability', desc: 'Clear roles and responsibility' },
                    { label: 'Risk review', desc: 'Ongoing compliance & risk checks' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg sm:rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-3 sm:p-4 hover:border-[#e63a27]/40 hover:shadow-md transition-all duration-300"
                    >
                      <p className="text-[#e63a27] font-semibold text-xs sm:text-sm mb-1">{item.label}</p>
                      <p className="text-[var(--text-secondary)] text-[10px] sm:text-xs leading-snug">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Performance - with image */}
        <section
          ref={(el) => { sectionRefs.current.financial = el; }}
          className={`mb-12 sm:mb-16 lg:mb-28 transition-all duration-700 ${isVisible('financial') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-[#e63a27] font-semibold text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase mb-2">
            Financial Overview
          </p>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] text-[var(--text-primary)] tracking-tight mb-4 sm:mb-6">
            Financial Performance & <span className="text-[#e63a27]">Key Metrics</span>
          </h2>
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 mb-6 sm:mb-10">
            <div className="lg:col-span-4">
              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-[1.7] mb-4 sm:mb-6">
                Shanky Group&apos;s financial performance reflects operational excellence, prudent management, and growth-oriented strategy.
              </p>
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[3/4] border border-[var(--card-border)] shadow-lg">
                <Image
                  src={SECTION_IMAGES.financial}
                  alt="Financial performance and analytics"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <h3 className="section-heading text-base sm:text-lg md:text-xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6">Key Financial Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { name: 'Shanky Metals Pvt Ltd', revenue: '₹7.16 crore', revenueLabel: 'Revenue (FY 2023-24)', auth: '₹75 lakh', paid: '₹70 lakh', note: 'Consistent growth in revenue and assets over the past three years.' },
                  { name: 'VMS Hub Pvt Ltd', revenue: null, revenueLabel: null, auth: '₹16.5 crore', paid: '₹16.47 crore', note: 'Positioned for rapid growth in the food distribution sector.' },
                  { name: 'Shanky Financial Services Pvt Ltd', revenue: null, revenueLabel: null, auth: '₹2 crore', paid: '₹10,000', note: 'Active status with regular compliance and filings.' },
                  { name: 'Shanky Smart Tech Pvt Ltd', revenue: null, revenueLabel: null, auth: '₹5 lakh', paid: '₹5 lakh', note: 'Focused on scaling operations in solar EPC and electronics.' },
                ].map((co) => (
                  <div key={co.name} className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl border border-[var(--card-border)] overflow-hidden hover:border-[#e63a27]/40 hover:shadow-lg transition-all duration-300">
                    <div className="bg-gradient-to-br from-[#e63a27]/10 to-[#e63a27]/5 px-4 sm:px-6 py-3 sm:py-4 border-b border-[var(--card-border)]">
                      <h4 className="section-heading text-[var(--text-primary)] font-bold text-xs sm:text-sm lg:text-base leading-tight">{co.name}</h4>
                    </div>
                    <div className="p-3 sm:p-5 space-y-2 sm:space-y-3">
                      {co.revenue != null && co.revenueLabel != null && (
                        <div>
                          <p className="text-[var(--text-secondary)] text-[10px] sm:text-xs font-medium uppercase tracking-wider">{co.revenueLabel}</p>
                          <p className="text-[#e63a27] font-bold text-base sm:text-lg">{co.revenue}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                        <div>
                          <p className="text-[var(--text-secondary)] text-[10px] sm:text-xs">Authorized Capital</p>
                          <p className="text-[var(--text-primary)] font-semibold">{co.auth}</p>
                        </div>
                        <div>
                          <p className="text-[var(--text-secondary)] text-[10px] sm:text-xs">Paid-up Capital</p>
                          <p className="text-[var(--text-primary)] font-semibold">{co.paid}</p>
                        </div>
                      </div>
                      <p className="text-[var(--text-secondary)] text-[10px] sm:text-xs leading-relaxed pt-1 border-t border-[var(--card-border)]">{co.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm md:text-base leading-[1.7] max-w-4xl">
            The Group&apos;s financial stability is further reinforced by prudent capital allocation, risk management, and reinvestment in growth initiatives.
          </p>
        </section>

        {/* CTA - with background image */}
        <section
          ref={(el) => { sectionRefs.current.cta = el; }}
          className={`transition-all duration-700 ${isVisible('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[320px] flex items-center justify-center text-center border border-[var(--card-border)] shadow-2xl">
            <Image
              src={SECTION_IMAGES.cta}
              alt="Contact compliance team"
              fill
              className="object-cover brightness-[0.5]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#e63a27]/90 via-[#e63a27]/80 to-[#c93222]/90 z-10" />
            <div className="relative z-20 px-4 sm:px-6 py-10 sm:py-14 lg:py-16 max-w-2xl mx-auto">
              <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 text-white text-[10px] sm:text-xs font-semibold tracking-wider rounded-full uppercase mb-3 sm:mb-4 backdrop-blur-sm">
                Questions or Reports
              </span>
              <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Compliance <span className="text-white/95">Contact</span>
              </h2>
              <p className="text-white/90 text-sm sm:text-base mb-6 sm:mb-8">
                For compliance-related queries, policy clarifications, or to report a concern, please reach out to our compliance team.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-[#e63a27] hover:bg-white/95 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] touch-manipulation"
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
      </div>
    </>
  );
}
