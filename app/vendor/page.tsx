'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import I18nProvider from '../i18n/I18nProvider';
import HeaderFour from '../home/home4/HeaderFour';
import FooterFour from '../home/home4/FooterFour';
import ContactUs from '../home/home4/vender';

export default function VendorPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <I18nProvider>
      <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <HeaderFour isScrolled={isScrolled} />
        <main className="flex-grow">
          <div
            className="relative w-full min-h-screen"
            style={{ ['--accent' as string]: '#e63a27', ['--accent-hover' as string]: '#c93222' }}
          >
            {/* Hero - full impact */}
            <section className="relative w-full pt-4 md:pt-6 lg:pt-8 px-4 md:px-8 lg:px-12 pb-0 bg-[var(--background)]">
              <div className="relative h-[65vh] md:h-[70vh] lg:h-[72vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-[var(--card-border)]">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
                  alt="Partner with Shanky Group"
                  fill
                  className="object-cover object-center brightness-[0.65]"
                  priority
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 z-20 pointer-events-none" />
                <div className="absolute inset-0 flex flex-col z-30">
                  <div className="flex-1 flex items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-10 lg:py-16">
                    <div className="w-full max-w-2xl lg:max-w-3xl text-left">
                      <span className="inline-block px-4 py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-xs lg:text-sm font-semibold tracking-widest rounded-full uppercase mb-5 lg:mb-6 shadow-lg shadow-[#e63a27]/30">
                        Partner With Us
                      </span>
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] text-white mb-4 lg:mb-5 drop-shadow-lg">
                        Register as a <span className="text-[#e63a27]">Vendor</span>
                      </h1>
                      <p className="text-base sm:text-lg md:text-xl max-w-xl text-white/95 leading-relaxed mb-6 lg:mb-8">
                        Grow your business with Shanky Group. Join our network of trusted vendors and get access to opportunities across finance, construction, metals, electronics, and more.
                      </p>
                      <a
                        href="#vendor-form"
                        className="inline-flex items-center gap-2 px-6 py-3.5 lg:px-8 lg:py-4 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm lg:text-base shadow-lg hover:shadow-xl hover:scale-[1.02]"
                      >
                        Fill registration form
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                      </a>
                    </div>
                  </div>
                  <div className="shrink-0 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-4 lg:py-5">
                    <nav className="flex items-center text-xs sm:text-sm text-white/90 flex-wrap gap-x-2 gap-y-1">
                      <Link href="/" className="hover:text-white transition-colors">Home</Link>
                      <span className="opacity-70">/</span>
                      <span className="text-white font-medium">Register as a Vendor</span>
                    </nav>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Partner - with benefit cards */}
            <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-14 md:py-20 max-w-[90rem]">
              <div className="text-center mb-10 md:mb-14">
                <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase">Benefits</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mt-2 mb-4">
                  Why <span className="text-[#e63a27]">Partner</span> With Us
                </h2>
                <div className="w-16 h-1 bg-[#e63a27] mx-auto mb-6" />
                <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                  Shanky Group works with vendors across sectors. Register once and get visibility with our procurement and business teams.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                {[
                  { title: 'Multi-sector reach', desc: 'Finance, construction, metals, electronics, training & more', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h1m-1 4h1m4-4h1m-1 4h1m-5-10v-2a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h.01' },
                  { title: 'Visibility', desc: 'Your profile in front of our procurement & business teams', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
                  { title: 'Trusted network', desc: 'Join a growing network of verified vendors', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                  { title: 'Simple process', desc: 'One form, one registration—we take it from there', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group rounded-2xl border-2 border-[var(--card-border)] bg-[var(--card-bg)] p-6 md:p-7 hover:border-[#e63a27]/50 hover:shadow-xl transition-all duration-300"
                  >
                    <span className="inline-flex w-12 h-12 rounded-xl bg-[#e63a27]/15 text-[#e63a27] items-center justify-center mb-4 group-hover:bg-[#e63a27]/25 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                    </span>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Form section label */}
            <div id="vendor-form" className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-4 max-w-[90rem] scroll-mt-24">
              <div className="text-center mb-8 md:mb-10">
                <span className="text-[#e63a27] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase">Get started</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight mt-1">
                  Vendor <span className="text-[#e63a27]">Registration</span> Form
                </h2>
                <p className="text-[var(--text-secondary)] text-sm md:text-base mt-2 max-w-xl mx-auto">
                  Fill in your details below. Our team will review and get in touch.
                </p>
              </div>
            </div>

            {/* Vendor registration form (from vender.tsx) */}
            <ContactUs />
          </div>
        </main>
        <FooterFour />
      </div>
    </I18nProvider>
  );
}
