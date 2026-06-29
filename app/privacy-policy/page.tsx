'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderFour from '../home/home4/HeaderFour';
import FooterFour from '../home/home4/FooterFour';

export default function PrivacyPolicyPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="privacy-policy-root">
      <HeaderFour isScrolled={isScrolled} />
      
      <div
        className="relative w-full bg-[var(--background)] text-[var(--foreground)]"
        style={{ ['--accent' as string]: '#e63a27', ['--accent-hover' as string]: '#c93222' }}
      >
        {/* Hero Section - Same as About Us */}
        <section className="relative w-full pt-3 sm:pt-4 md:pt-6 lg:pt-8 px-3 sm:px-4 md:px-8 lg:px-12 pb-0 bg-[var(--background)]">
          <div className="about-hero-card relative w-full h-[58vh] min-h-[260px] sm:min-h-[300px] sm:h-[65vh] md:h-[72vh] lg:h-[75vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-[var(--card-border)]">
            <Image
              src="/images/aboutus2.png"
              alt="Privacy Policy - Shanky Group"
              fill
              className="object-cover object-[center_42%] brightness-100"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-0 flex flex-col z-30">
              <div className="about-hero-content flex-1 flex items-center px-3 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-16">
                <div className="w-full max-w-2xl lg:max-w-3xl text-left">
                  <h1 className="about-hero-title section-heading text-[28px] min-[380px]:text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-3 sm:mb-4 lg:mb-5">
                    <span className="text-[#e63a27]">PRIVACY POLICY</span>
                    <br />
                    <span className="text-neutral-800">Your Data, Our Responsibility</span>
                  </h1>
                  <p className="about-hero-desc text-sm sm:text-base md:text-lg lg:text-xl max-w-xl text-neutral-600 leading-relaxed mb-5 sm:mb-6 md:mb-8 lg:mb-10">
                    At Shanky Group, we are committed to protecting your personal information with the highest standards of security and transparency. Effective Date: 29 June 2026
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Link
                      href="/contact"
                      className="about-hero-cta inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 lg:px-8 lg:py-4 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-lg sm:rounded-xl transition-all text-xs sm:text-sm lg:text-base shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    >
                      Contact Us
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="shrink-0 px-3 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-3 sm:py-4 lg:py-5">
                <nav className="flex items-center text-[10px] sm:text-xs md:text-sm text-neutral-500 flex-wrap gap-x-1.5 sm:gap-x-2 gap-y-1">
                  <Link href="/" className="hover:text-neutral-800 transition-colors">Home</Link>
                  <span className="text-neutral-400">/</span>
                  <span className="text-neutral-800 font-medium">Privacy Policy</span>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section
          ref={sectionRef}
          className="pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-[90px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 bg-[var(--card-bg)] font-['Lato','Helvetica_Neue','Arial','sans-serif'] relative overflow-hidden"
        >
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-800 ease-out delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
            }`}>
              <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-bold text-[var(--text-primary)] mb-4 sm:mb-6 tracking-[-0.5px] md:tracking-[-1px] leading-[1.15] px-1">
                Your Privacy Matters to Us
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-[20px] text-[var(--text-secondary)] max-w-[800px] mx-auto leading-[1.5] sm:leading-[1.6] font-[400] px-1">
                Learn how we collect, use, and protect your personal information
              </p>
            </div>

            {/* Policy Content */}
            <div className={`transition-all duration-800 ease-out delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
            }`}>
              <p className="text-sm sm:text-base md:text-lg lg:text-[20px] text-[var(--text-secondary)] leading-[1.7] mb-10">
                At Shanky Group, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or submit an enquiry for our financial and investment services.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-[20px] text-[var(--text-secondary)] leading-[1.7] mb-16">
                By using our website, you agree to the practices described in this Privacy Policy.
              </p>

              {/* Information We Collect */}
              <div className="mb-14 sm:mb-20">
                <h3 className="section-heading text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 sm:mb-8">
                  Information We Collect
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-[1.7] mb-6">
                  We may collect the following information when you interact with our website:
                </p>
                <ul className="space-y-3 sm:space-y-4 pl-4">
                  {[
                    'Full Name',
                    'Mobile Number',
                    'Email Address',
                    'City/State',
                    'Investment Interest',
                    'Investment Amount',
                    'Company Name (if applicable)',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base md:text-lg text-[var(--text-secondary)]">
                      <span className="mt-2 w-2 h-2 rounded-full bg-[#e63a27] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-[1.7] mt-8">
                  We may also automatically collect technical information such as your IP address, browser type, device information and website usage data.
                </p>
              </div>

              {/* How We Use Your Information */}
              <div className="mb-14 sm:mb-20">
                <h3 className="section-heading text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 sm:mb-8">
                  How We Use Your Information
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-[1.7] mb-6">
                  Your information may be used to:
                </p>
                <ul className="space-y-3 sm:space-y-4 pl-4">
                  {[
                    'Respond to your enquiries',
                    'Contact you regarding investment opportunities',
                    'Provide information about our financial products and services',
                    'Improve our website and customer experience',
                    'Maintain internal records',
                    'Comply with applicable legal and regulatory requirements',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base md:text-lg text-[var(--text-secondary)]">
                      <span className="mt-2 w-2 h-2 rounded-full bg-[#e63a27] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Information Sharing */}
              <div className="mb-14 sm:mb-20">
                <h3 className="section-heading text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 sm:mb-8">
                  Information Sharing
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-[1.7] mb-4">
                  We do not sell, rent or trade your personal information.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-[1.7]">
                  Your information may only be shared with trusted service providers or regulatory authorities where required by law or for the purpose of providing our services.
                </p>
              </div>

              {/* Data Security */}
              <div className="mb-14 sm:mb-20">
                <h3 className="section-heading text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 sm:mb-8">
                  Data Security
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-[1.7] mb-4">
                  We implement appropriate technical and organizational security measures to safeguard your personal information against unauthorized access, misuse or disclosure.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-[1.7]">
                  However, no method of data transmission over the Internet is completely secure.
                </p>
              </div>

              {/* Cookies */}
              <div className="mb-14 sm:mb-20">
                <h3 className="section-heading text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 sm:mb-8">
                  Cookies
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-[1.7]">
                  Our website may use cookies to improve user experience, analyze website traffic and enhance website functionality.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-[1.7] mt-6">
                  You may choose to disable cookies through your browser settings.
                </p>
              </div>

              {/* Third-Party Links */}
              <div className="mb-14 sm:mb-20">
                <h3 className="section-heading text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 sm:mb-8">
                  Third-Party Links
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-[1.7]">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of such websites.
                </p>
              </div>

              {/* Your Rights */}
              <div className="mb-14 sm:mb-20">
                <h3 className="section-heading text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 sm:mb-8">
                  Your Rights
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-[1.7]">
                  You may request access, correction or deletion of your personal information by contacting us. We will process such requests in accordance with applicable laws.
                </p>
              </div>

              {/* Changes to this Policy */}
              <div className="mb-14 sm:mb-20">
                <h3 className="section-heading text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 sm:mb-8">
                  Changes to this Policy
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-[1.7]">
                  Shanky Group reserves the right to update this Privacy Policy at any time. Any changes will be published on this page with the revised effective date.
                </p>
              </div>

              {/* Contact Us */}
              <div className="pt-8 sm:pt-10 border-t border-[var(--card-border)]">
                <h3 className="section-heading text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 sm:mb-8">
                  Contact Us
                </h3>
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-8">
                  <div className="bg-[var(--background)] rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[var(--card-border)] hover:border-[#e63a27]/40 transition-all">
                    <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3">Shanky Group</h4>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">Website: <a href="https://shankygroup.com" className="text-[#e63a27] hover:underline">https://shankygroup.com</a></p>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[var(--card-border)] hover:border-[#e63a27]/40 transition-all">
                    <h4 className="section-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3">Get in Touch</h4>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-2">Email: info@shankygroup.com</p>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">Phone: +91-11-47586938</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm lg:text-base shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  >
                    Contact Our Team
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <FooterFour />
    </div>
  );
}
