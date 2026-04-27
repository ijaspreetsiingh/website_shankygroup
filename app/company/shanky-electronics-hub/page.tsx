'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import FooterFour from '../../home/home4/FooterFour';
import ContactUs from '../../home/home4/vender';

const TOTAL_SECTIONS = 3; // Hero, Content, Contact+Footer

export default function ShankyElectronicsHubPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const currentSection = Math.round(scrollTop / windowHeight);
      setActiveSection(Math.min(Math.max(currentSection, 0), TOTAL_SECTIONS - 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const sectionVisible = (index: number) =>
    activeSection === index ? 'z-50 translate-y-0 scale-100 opacity-100' :
    activeSection > index ? 'z-50 -translate-y-full scale-95 opacity-0' :
    'z-30 translate-y-full scale-95 opacity-0';

  return (
    <>
      <Head>
        <title>Shanky Electronics Hub LLP - Electronics Trading & Distribution</title>
        <meta name="description" content="Shanky Electronics Hub LLP specializes in trading and distribution of consumer and industrial electronics products across India. The company offers a wide range of electronic components, devices, and accessories sourced from leading manufacturers with advanced inventory management systems." />
        <meta name="keywords" content="Shanky Electronics Hub, electronics trading, electronic components, consumer electronics, industrial electronics, electronic devices, electronic accessories, inventory management, distribution, India electronics market" />
        <meta property="og:title" content="Shanky Electronics Hub LLP - Electronics Trading" />
        <meta property="og:description" content="Specializes in trading and distribution of consumer and industrial electronics products across India with advanced inventory management." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shankygroup.com/company/shanky-electronics-hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shanky Electronics Hub LLP - Electronics Distribution" />
        <meta name="twitter:description" content="Trading and distribution specialist for consumer and industrial electronics with advanced inventory management." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Shanky Electronics Hub LLP",
              "description": "Specializes in trading and distribution of consumer and industrial electronics products across India. The company offers a wide range of electronic components, devices, and accessories sourced from leading manufacturers with advanced inventory management systems.",
              "url": "https://shankygroup.com/company/shanky-electronics-hub",
              "parentOrganization": {
                "@type": "Organization",
                "name": "Shanky Group"
              },
              "services": [
                "Consumer electronics trading",
                "Industrial electronics distribution",
                "Electronic components supply",
                "Inventory management systems",
                "Customer-centric delivery",
                "Quality assurance"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              }
            })
          }}
        />
      </Head>
      <div
        ref={containerRef}
        className="relative w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]"
        style={{ ['--accent' as string]: '#e63a27', ['--accent-hover' as string]: '#c93222' }}
      >
      {/* Section 1/3 - Hero */}
      <section
        className={`fixed top-0 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] pt-32 md:pt-40 lg:pt-44 px-4 md:px-8 lg:px-12 pb-0 bg-[var(--background)] ${
          activeSection === 0 ? 'z-40 translate-y-0 scale-100 opacity-100' : 'z-40 -translate-y-full scale-95 opacity-0'
        }`}
      >
        <div className="relative h-[65vh] md:h-[70vh] lg:h-[72vh] w-full rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt="Shanky Electronics Hub - Electronics Trading"
            fill
            className="object-cover brightness-[0.75]"
            style={{ objectPosition: 'center' }}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col z-30">
            <div className="flex-1 flex items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-10 lg:py-14">
              <div className="w-full max-w-xl lg:max-w-2xl text-left">
                <span className="inline-block px-4 py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-xs lg:text-sm font-semibold tracking-widest rounded-full uppercase mb-5 lg:mb-6">
                  Electronics Products (Trading)
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15] text-white mb-4 lg:mb-5">
                  SHANKY <span className="text-[#e63a27]">ELECTRONICS HUB</span> LLP
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-lg text-white/90 leading-relaxed mb-8 lg:mb-10">
                  Trading and distribution of consumer and industrial electronics
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 lg:px-8 lg:py-3.5 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm lg:text-base shadow-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <nav className="shrink-0 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-4 lg:py-5 text-xs sm:text-sm text-white/90 flex items-center gap-2">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="opacity-70">/</span>
              <Link href="/company" className="hover:text-white transition-colors">Our Companies</Link>
              <span className="opacity-70">/</span>
              <span className="text-white font-medium">Shanky Electronics Hub LLP</span>
            </nav>
          </div>
        </div>
      </section>

      <div className="h-screen" aria-hidden="true" />

      {/* Section 2/3 - Content (About) */}
      <section
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${sectionVisible(1)}`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] overflow-hidden border-t border-[var(--card-border)]">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 lg:py-12 h-full overflow-y-auto scrollbar-hide max-w-[90rem]">
            <div className="max-w-4xl mx-auto">
              <p className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">
                Our Company
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-8">
                Shanky Electronics Hub <span className="text-[#e63a27]">LLP</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] p-4 sm:p-5">
                  <p className="text-[var(--text-secondary)] text-xs font-semibold tracking-wider uppercase mb-1">Sector</p>
                  <p className="text-[var(--text-primary)] font-semibold">Electronics Products (Trading)</p>
                </div>
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] p-4 sm:p-5">
                  <p className="text-[var(--text-secondary)] text-xs font-semibold tracking-wider uppercase mb-1">Legal Structure</p>
                  <p className="text-[var(--text-primary)] font-semibold">Limited Liability Partnership</p>
                </div>
                <div className="sm:col-span-2 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] p-4 sm:p-5">
                  <p className="text-[var(--text-secondary)] text-xs font-semibold tracking-wider uppercase mb-1">Designated Partners</p>
                  <p className="text-[var(--text-primary)] font-semibold">Manoj Kumar Mishra, Vipin Kumar</p>
                </div>
              </div>

              <div className="space-y-6 text-[var(--text-secondary)] text-sm sm:text-base md:text-lg leading-[1.7]">
                <p>
                  Shanky Electronics Hub LLP specializes in the trading and distribution of electronic products, catering to the growing demand for consumer and industrial electronics in India. The company&apos;s portfolio includes a wide range of electronic components, devices, and accessories sourced from leading manufacturers. Its operations are supported by advanced inventory management systems and a customer-centric approach, ensuring timely delivery and product quality.
                </p>
                <p>
                  The LLP structure provides operational flexibility and fosters collaboration with suppliers and partners. Shanky Electronics Hub&apos;s focus on quality, reliability, and customer service has enabled it to build a loyal client base and establish a strong market presence.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-[var(--card-border)]">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm"
                >
                  Get in Touch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen" aria-hidden="true" />

      {/* Section 3/3 - Contact & Footer */}
      <section
        className={`fixed top-20 left-0 w-full h-screen transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${sectionVisible(2)}`}
      >
        <div className="relative h-full w-full bg-[var(--background)] rounded-t-[2rem] border-t border-[var(--card-border)] overflow-y-auto overflow-x-hidden scrollbar-hide">
          <ContactUs />
          <FooterFour />
        </div>
      </section>

      <div className="h-screen" aria-hidden="true" />
    </div>
    </>
  );
}
