'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderFour from '../home/home4/HeaderFour';

import I18nProvider from '../i18n/I18nProvider';

// ============ DESIGN TOKENS ============
// Premium Financial Palette: Deep Navy + Gold + Off-white
const COLORS = {
  navy: '#0A2540',       // Primary deep navy
  navyDark: '#061A30',   // Darker navy for depth
  navyLight: '#1A3A5C',  // Lighter navy for cards
  gold: '#C8A55B',       // Premium gold accent
  goldLight: '#E5C97F',  // Lighter gold for hover
  goldDark: '#9E8244',   // Darker gold for borders
  cream: '#FAF7F2',      // Off-white background
  text: '#0A2540',       // Body text
  muted: '#5A6B7F',      // Muted text
};

// ============ ANIMATED COUNTER HOOK ============
function useCounter(end: number, duration = 2000, start = 0, shouldStart = false) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutCubic for premium feel
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start, shouldStart]);

  return count;
}

// ============ INVESTMENT INQUIRY FORM COMPONENT ============
function InvestmentForm() {
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email: string;
    investmentAmount: string;
    city: string;
    source: string;
    campaign: string;
  }>({
    name: "",
    phone: "",
    email: "",
    investmentAmount: "500000",
    city: "",
    source: "Website",
    campaign: "Investment NCD"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-IN').format(Number(amount));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      investmentAmount: formData.investmentAmount,
      city: formData.city,
      source: "Website",
      campaign: "Investment Page"
    };

    console.log("Submitting form with payload:", payload);

    try {
      const response = await fetch("/api/investment-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const result = await response.json();
      console.log("Result:", result);

      setSubmitSuccess(true);
      setFormData({ name: "", phone: "", email: "", investmentAmount: "500000", city: "", source: "Website", campaign: "Investment NCD" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl text-center">
          <div className="font-bold text-lg mb-1">Thank you for your inquiry!</div>
          <div>Our team will contact you shortly.</div>
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl text-center">
          <div className="font-bold text-lg mb-1">Something went wrong!</div>
          <div>Please try again or call us directly.</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#0A2540] mb-2">
            Full Name <span className="text-[#C8A55B]">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-5 py-4 rounded-xl border-2 border-[#0A2540]/10 bg-[#FAF7F2] text-[#0A2540] focus:outline-none focus:border-[#C8A55B] focus:ring-4 focus:ring-[#C8A55B]/10 transition-all text-base"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0A2540] mb-2">
            Phone Number <span className="text-[#C8A55B]">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-5 py-4 rounded-xl border-2 border-[#0A2540]/10 bg-[#FAF7F2] text-[#0A2540] focus:outline-none focus:border-[#C8A55B] focus:ring-4 focus:ring-[#C8A55B]/10 transition-all text-base"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#0A2540] mb-2">
            Email Address <span className="text-[#C8A55B]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-5 py-4 rounded-xl border-2 border-[#0A2540]/10 bg-[#FAF7F2] text-[#0A2540] focus:outline-none focus:border-[#C8A55B] focus:ring-4 focus:ring-[#C8A55B]/10 transition-all text-base"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0A2540] mb-2">
            City <span className="text-[#C8A55B]">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="w-full px-5 py-4 rounded-xl border-2 border-[#0A2540]/10 bg-[#FAF7F2] text-[#0A2540] focus:outline-none focus:border-[#C8A55B] focus:ring-4 focus:ring-[#C8A55B]/10 transition-all text-base"
            placeholder="Enter your city"
          />
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
          <label className="block text-sm font-semibold text-[#0A2540]">
            Investment Amount
          </label>
          <div className="text-xl sm:text-2xl font-bold font-serif text-[#C8A55B]">
            ₹{formatCurrency(formData.investmentAmount)}
          </div>
        </div>
        
        <input
          type="range"
          name="investmentAmount"
          min="500000"
          max="50000000"
          step="100000"
          value={formData.investmentAmount}
          onChange={handleInputChange}
          className="w-full h-3 bg-[#0A2540]/10 rounded-full appearance-none cursor-pointer accent-[#C8A55B]"
          style={{
            background: `linear-gradient(to right, #C8A55B 0%, #C8A55B ${((Number(formData.investmentAmount) - 500000) / (50000000 - 500000)) * 100}%, #E5E7EB ${((Number(formData.investmentAmount) - 500000) / (50000000 - 500000)) * 100}%, #E5E7EB 100%)`
          }}
        />

        <div className="flex justify-between text-xs text-[#5A6B7F] mt-2 font-semibold">
          <span>₹5,00,000 (Min)</span>
          <span>₹5,00,00,000 (Max)</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#C8A55B] to-[#E5C97F] hover:from-[#E5C97F] hover:to-[#C8A55B] text-[#0A2540] font-bold py-5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] text-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Investment Inquiry"}
      </button>
    </form>
  );
}

// ============ STAT COUNTER COMPONENT ============
function StatCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  shouldStart,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  shouldStart: boolean;
}) {
  const count = useCounter(value, 2200, 0, shouldStart);
  return (
    <div className="text-center">
      <div className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#C8A55B] mb-2 tracking-tight">
        {prefix}
        {count.toLocaleString('en-IN')}
        {suffix}
      </div>
      <div className="text-xs sm:text-sm md:text-base text-white/70 uppercase tracking-[0.15em] font-medium">
        {label}
      </div>
    </div>
  );
}

// ============ RETURNS CALCULATOR ============
function ReturnsCalculator({ onCTAClick }: { onCTAClick: () => void }) {
  const [amount, setAmount] = useState(5); // in Crores
  const annualRate = 0.14;
  const annualReturn = amount * annualRate;
  const totalAfterYear = amount + annualReturn;

  const formatINR = (val: number) => {
    if (val >= 1) return `₹${val.toFixed(2)} Cr`;
    return `₹${(val * 100).toFixed(2)} Lakh`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-[#0A2540]/10 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1A3A5C] px-6 sm:px-8 py-5 sm:py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#C8A55B]/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#C8A55B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m-6 4h6m-6 4h6M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16l-3-2-2 2-2-2-2 2-2-2-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg sm:text-xl">Returns Calculator</h3>
            <p className="text-white/60 text-xs sm:text-sm">Estimate your earnings instantly</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-[#0A2540] uppercase tracking-wider">
              Investment Amount
            </label>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0A2540]">
              ₹{amount.toFixed(1)} Cr
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={100}
            step={0.5}
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full h-2 bg-[#0A2540]/10 rounded-full appearance-none cursor-pointer accent-[#C8A55B] slider-premium"
            style={{
              background: `linear-gradient(to right, #C8A55B 0%, #C8A55B ${((amount - 5) / 95) * 100}%, #E5E7EB ${((amount - 5) / 95) * 100}%, #E5E7EB 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-[#5A6B7F] mt-2 font-medium">
            <span>₹5 Cr (Min)</span>
            <span>₹100 Cr</span>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
          <div className="bg-gradient-to-br from-[#FAF7F2] to-white p-4 rounded-xl border border-[#C8A55B]/20">
            <div className="text-[10px] sm:text-xs text-[#5A6B7F] uppercase tracking-wider mb-1.5 font-semibold">
              Annual Returns
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-[#C8A55B]">
              {formatINR(annualReturn)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0A2540] to-[#1A3A5C] p-4 rounded-xl text-white">
            <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider mb-1.5 font-semibold">
              Total After 1 Yr
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-[#E5C97F]">
              {formatINR(totalAfterYear)}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] sm:text-xs text-[#5A6B7F] italic border-t border-[#0A2540]/10 pt-4">
          * Calculations based on 14% fixed annual rate. Actual returns subject to NCD terms and conditions.
        </p>

        {/* CTA */}
        <button
          onClick={onCTAClick}
          className="block w-full text-center bg-gradient-to-r from-[#C8A55B] to-[#E5C97F] hover:from-[#E5C97F] hover:to-[#C8A55B] text-[#0A2540] font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
        >
          Get Investment Proposal →
        </button>
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function InvestmentClient() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStatsVisible(true),
      { threshold: 0.3 }
    );
    const contentObserver = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setContentVisible(true),
      { threshold: 0.1 }
    );
    
    // Video auto-play/pause on scroll with sound
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            console.log('Video section visible, playing with sound');
            videoRef.current.muted = false;
            videoRef.current.play().catch(err => {
              console.warn('Auto-play with sound failed:', err);
              // Fallback: play muted if needed, but user can interact to unmute
              if (videoRef.current) {
                videoRef.current.muted = true;
                videoRef.current.play().catch(console.warn);
              }
            });
          } else {
            console.log('Video section hidden, pausing');
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.3 }
    );
    
    if (statsRef.current) statsObserver.observe(statsRef.current);
    if (contentRef.current) contentObserver.observe(contentRef.current);
    if (videoSectionRef.current) videoObserver.observe(videoSectionRef.current);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    return () => {
      statsObserver.disconnect();
      contentObserver.disconnect();
      videoObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <I18nProvider>
        <HeaderFour isScrolled={isScrolled} />

        <main className="bg-[#FAF7F2] text-[#0A2540] investment-root">

          {/* ═══════════════════════════════════════════════════════════════════
              1. HERO SECTION — Premium banking-grade banner
             ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full overflow-hidden bg-[#0A2540]">
          {/* Background Image with overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/investment/ncd.png"
              alt="Shanky Group NCD Investment - 14% Annual Returns"
              fill
              className="object-cover object-center opacity-30"
              priority
              sizes="100vw"
            />
            {/* Multiple overlay layers for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#0A2540]/95 to-[#0A2540]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061A30] via-transparent to-transparent" />
            {/* Gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C8A55B] to-transparent" />
          </div>

          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 z-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A55B' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 sm:pb-20 md:pb-24">

            {/* Breadcrumb */}
            <nav className="flex items-center text-xs sm:text-sm text-white/60 mb-8 gap-2">
              <Link href="/" className="hover:text-[#C8A55B] transition-colors">Home</Link>
              <span className="text-[#C8A55B]">/</span>
              <span className="text-white font-medium">Investment</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Content */}
              <div className="lg:col-span-7 text-white">
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C8A55B]/10 border border-[#C8A55B]/30 rounded-full mb-6">
                  <svg className="w-4 h-4 text-[#C8A55B]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#E5C97F] text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Asset-Backed Secured NCD
                  </span>
                </div>

                {/* Headline */}
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
                  Earn{' '}
                  <span className="relative inline-block">
                    <span className="text-[#C8A55B]">14% Fixed</span>
                    <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                      <path d="M2 6C50 2 150 2 198 6" stroke="#C8A55B" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                  <br />
                  Annual Returns.
                  <br />
                  <span className="text-white/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                    Zero Compromise on Security.
                  </span>
                </h1>

                {/* Subheading */}
                <p className="text-base sm:text-lg md:text-xl text-white/75 leading-relaxed mb-8 max-w-2xl">
                  India's discerning investors choose Shanky Group's secured NCDs for{' '}
                  <span className="text-[#E5C97F] font-semibold">guaranteed returns</span>,
                  asset-backed safety, and transparent legal documentation. Minimum investment ₹5 Crore.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-10">
                  <button
                    onClick={scrollToForm}
                    className="group inline-flex items-center gap-2 px-7 sm:px-8 py-4 bg-[#C8A55B] hover:bg-[#E5C97F] text-[#0A2540] font-bold rounded-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-sm sm:text-base"
                  >
                    Submit Investment Inquiry
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 sm:px-8 py-4 bg-transparent border-2 border-white/30 hover:border-[#C8A55B] hover:bg-[#C8A55B]/10 text-white font-semibold rounded-lg transition-all text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact Us
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white/60 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#C8A55B]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Legally Documented</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#C8A55B]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Asset-Backed Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#C8A55B]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Fixed Annual Returns</span>
                  </div>
                </div>
              </div>

              {/* Right - Returns Calculator (Hero Side Card) */}
              <div className="lg:col-span-5">
                <ReturnsCalculator onCTAClick={scrollToForm} />
              </div>

            </div>
          </div>

          {/* Bottom gold border */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A55B]/60 to-transparent" />
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            2. STATS COUNTER SECTION
           ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={statsRef}
          className="relative bg-gradient-to-br from-[#0A2540] via-[#1A3A5C] to-[#0A2540] py-16 sm:py-20 md:py-24 overflow-hidden"
        >
          {/* Decorative gold accents */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#C8A55B]/0 via-[#C8A55B]/20 to-[#C8A55B]/0" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-[#C8A55B]/0 via-[#C8A55B]/20 to-[#C8A55B]/0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 bg-[#C8A55B]/10 border border-[#C8A55B]/30 rounded-full mb-4">
                <span className="text-[#C8A55B] text-xs font-semibold uppercase tracking-[0.2em]">
                  Trusted Across India
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
                A Legacy of Trust & Returns
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
                Numbers that speak louder than promises
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
              <StatCounter value={0} suffix="%" label="Risk" shouldStart={statsVisible} />
              <StatCounter value={14} suffix="%" label="Fixed Annual Returns" shouldStart={statsVisible} />
              <StatCounter value={15} suffix="+ Yrs" label="Industry Experience" shouldStart={statsVisible} />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            3. WHY SHANKY GROUP - Feature Pillars
           ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={contentRef}
          className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-[#FAF7F2]"
        >
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-block px-4 py-1.5 bg-[#C8A55B]/15 border border-[#C8A55B]/40 rounded-full mb-4">
                <span className="text-[#9E8244] text-xs font-semibold uppercase tracking-[0.2em]">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A2540] mb-4 tracking-tight">
                Built on Principles of <span className="text-[#C8A55B]">Trust</span>
              </h2>
              <p className="text-base sm:text-lg text-[#5A6B7F] max-w-3xl mx-auto leading-relaxed">
                Every NCD we offer is structured with institutional-grade safeguards, transparent documentation, and a relentless focus on capital protection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  ),
                  title: "Asset-Backed Security",
                  desc: "Every NCD is collateralized with tangible assets, ensuring capital protection at all times.",
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                  ),
                  title: "14% Fixed Returns",
                  desc: "Lock in market-beating yields with predictable, contractual annual returns.",
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  ),
                  title: "Quarterly Payouts",
                  desc: "Consistent returns credited directly to your bank account every quarter.",
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                  ),
                  title: "Legal Documentation",
                  desc: "Full transparency with registered NCD agreements and statutory compliance.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`group bg-white rounded-2xl p-7 border border-[#0A2540]/10 hover:border-[#C8A55B]/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0A2540] to-[#1A3A5C] text-[#C8A55B] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0A2540] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#5A6B7F] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="mt-5 w-12 h-0.5 bg-[#C8A55B] group-hover:w-20 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            4. INVESTMENT DETAILS - Two Column Premium Layout
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left - Image with frame */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#C8A55B]" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#C8A55B]" />
                <div className="relative rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="/investment/ncd.png"
                    alt="Shanky Group NCD Investment Plan Details"
                    width={800}
                    height={1047}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Right - Content */}
              <div>
                <div className="inline-block px-4 py-1.5 bg-[#C8A55B]/15 border border-[#C8A55B]/40 rounded-full mb-4">
                  <span className="text-[#9E8244] text-xs font-semibold uppercase tracking-[0.2em]">
                    Investment Highlights
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A2540] mb-6 leading-tight">
                  The Shanky Group <span className="text-[#C8A55B]">Advantage</span>
                </h2>
                <p className="text-[#5A6B7F] text-base sm:text-lg mb-8 leading-relaxed">
                  Designed for High Net-worth Individuals seeking institutional-grade fixed income exposure with predictable cash flows.
                </p>

                <div className="space-y-4">
                  {[
                    { label: "Minimum Investment", value: "₹5 Crore" },
                    { label: "Annual Returns", value: "14% Fixed" },
                    { label: "Payout Frequency", value: "Quarterly" },
                    { label: "Tenure", value: "1 Year (Renewable)" },
                    { label: "Security", value: "Asset-Backed NCD" },
                    { label: "Documentation", value: "Fully Legal & Registered" },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-4 border-b border-[#0A2540]/10 hover:border-[#C8A55B]/40 transition-colors group"
                    >
                      <span className="text-[#5A6B7F] text-sm sm:text-base font-medium">
                        {row.label}
                      </span>
                      <span className="font-serif text-base sm:text-lg font-bold text-[#0A2540] group-hover:text-[#C8A55B] transition-colors">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-[#0A2540] hover:bg-[#061A30] text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Schedule a Consultation
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            5. VIDEO SECTION - Premium presentation with comprehensive content
           ═══════════════════════════════════════════════════════════════════ */}
        <section ref={videoSectionRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 bg-[#C8A55B]/15 border border-[#C8A55B]/40 rounded-full mb-4">
                <span className="text-[#9E8244] text-xs font-semibold uppercase tracking-[0.2em]">
                  Watch & Learn
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                Understanding the <span className="text-[#C8A55B]">NCD Program</span>
              </h2>
              <p className="text-[#5A6B7F] text-base sm:text-lg mb-10 max-w-2xl mx-auto">
                A detailed walkthrough of how Shanky Group's secured NCD generates consistent returns with institutional-grade security.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Video Container - Reel Style Vertical */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#0A2540]/10 bg-[#0A2540]">
                  {/* Gold border accent */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C8A55B] via-[#E5C97F] to-[#C8A55B] rounded-2xl opacity-30" />
                  <div className="relative aspect-[9/16] w-full max-h-[600px]">
                    <video
                      ref={videoRef}
                      src="/investment/WhatsApp Video 2026-06-26 at 2.36.19 PM.mp4"
                      className="w-full h-full object-cover"
                      playsInline
                      loop
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                
                {/* Video Info Bar */}
                <div className="mt-3 flex items-center justify-between text-sm text-[#5A6B7F]">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#C8A55B]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>Duration: 5 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#C8A55B]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    <span>Reel Format</span>
                  </div>
                </div>
              </div>

              {/* Video Content - Key Points */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-[#0A2540]/10 shadow-lg">
                  <h3 className="text-xl font-bold text-[#0A2540] mb-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#C8A55B]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#C8A55B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    What You'll Learn
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-[#5A6B7F] text-sm">
                      <svg className="w-5 h-5 text-[#C8A55B] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>How secured NCDs work and why they're considered safe investments</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#5A6B7F] text-sm">
                      <svg className="w-5 h-5 text-[#C8A55B] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>The asset-backing process and collateral security details</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#5A6B7F] text-sm">
                      <svg className="w-5 h-5 text-[#C8A55B] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Step-by-step investment process and documentation requirements</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#5A6B7F] text-sm">
                      <svg className="w-5 h-5 text-[#C8A55B] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Risk management framework and legal protections</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-[#0A2540] to-[#1A3A5C] rounded-xl p-5 text-white">
                  <h4 className="text-lg font-bold text-[#E5C97F] mb-2">Need Personal Guidance?</h4>
                  <p className="text-white/80 text-sm mb-3">Our investment advisors are available for one-on-one consultations to explain the NCD program in detail.</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C8A55B] hover:bg-[#E5C97F] text-[#0A2540] font-semibold rounded-lg transition-all text-sm"
                  >
                    Schedule a Call
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════────════
            6. INVESTMENT PROCESS - Step-by-step guide
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block px-4 py-1.5 bg-[#C8A55B]/15 border border-[#C8A55B]/40 rounded-full mb-4">
                <span className="text-[#9E8244] text-xs font-semibold uppercase tracking-[0.2em]">
                  Simple Process
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                Your Investment <span className="text-[#C8A55B]">Journey</span>
              </h2>
              <p className="text-[#5A6B7F] text-base sm:text-lg max-w-2xl mx-auto">
                A streamlined process designed for efficiency and transparency
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Initial Consultation",
                  desc: "Connect with our investment advisors to discuss your requirements and understand the NCD structure.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  ),
                },
                {
                  step: "02",
                  title: "Documentation",
                  desc: "Submit KYC documents and complete the legal agreement with our team's assistance.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                },
                {
                  step: "03",
                  title: "Fund Transfer",
                  desc: "Transfer investment amount to the designated escrow account through secure banking channels.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                },
                {
                  step: "04",
                  title: "Start Earning",
                  desc: "Receive your NCD certificate and begin earning fixed returns as per the agreed schedule.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#0A2540]/10 hover:border-[#C8A55B]/50 transition-all duration-300 hover:shadow-xl">
                    <div className="text-5xl font-serif font-bold text-[#C8A55B]/20 mb-4">{item.step}</div>
                    <div className="w-12 h-12 rounded-xl bg-[#0A2540] text-[#C8A55B] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#0A2540] mb-2">{item.title}</h3>
                    <p className="text-[#5A6B7F] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-[#C8A55B]/30">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            7. TESTIMONIALS SECTION - Investor success stories
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block px-4 py-1.5 bg-[#C8A55B]/15 border border-[#C8A55B]/40 rounded-full mb-4">
                <span className="text-[#9E8244] text-xs font-semibold uppercase tracking-[0.2em]">
                  Testimonials
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                Trusted by <span className="text-[#C8A55B]">Leading Investors</span>
              </h2>
              <p className="text-[#5A6B7F] text-base sm:text-lg max-w-2xl mx-auto">
                Hear from HNIs who have experienced the Shanky Group advantage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Rajesh Kumar",
                  role: "Business Owner, Delhi",
                  content: "I've been investing with Shanky Group for 3 years now. The 14% returns are exactly as promised, and the quarterly payouts are always on time. Their transparency and professionalism are unmatched.",
                  rating: 5,
                },
                {
                  name: "Priya Sharma",
                  role: "Real Estate Developer, Mumbai",
                  content: "The asset-backed security gave me confidence to invest. The documentation was thorough, and the team explained every aspect clearly. A reliable investment option for HNIs seeking predictable returns.",
                  rating: 5,
                },
                {
                  name: "Amit Patel",
                  role: "Industrialist, Gujarat",
                  content: "After evaluating multiple options, Shanky Group's NCD program stood out for its legal structure and returns. The investment process was smooth, and I've recommended it to my business associates.",
                  rating: 5,
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#0A2540]/10 hover:border-[#C8A55B]/50 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[#C8A55B]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#5A6B7F] text-sm leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A2540] to-[#1A3A5C] flex items-center justify-center text-[#C8A55B] font-serif font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#0A2540] text-sm">{testimonial.name}</div>
                      <div className="text-xs text-[#5A6B7F]">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            7.5. CUSTOM INVESTMENT INQUIRY FORM - Google Apps Script Integration
           ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={formSectionRef}
          className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-[#FAF7F2]"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block px-4 py-1.5 bg-[#C8A55B]/10 border border-[#C8A55B]/40 rounded-full mb-4">
                <span className="text-[#9E8244] text-xs font-semibold uppercase tracking-[0.2em]">
                  Get Started Now
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                Investment Inquiry
              </h2>
              <p className="text-[#5A6B7F] text-base sm:text-lg max-w-2xl mx-auto">
                Fill out this form to get started with your investment journey with Shanky Group
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-[#C8A55B]/20 shadow-xl">
              <InvestmentForm />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            8. CTA BANNER - Promotional banner image
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 bg-[#FAF7F2]">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/investment/Untitled design (6).png"
                alt="Shanky Group Investment CTA Banner"
                width={1200}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            9. FAQ SECTION - Common questions answered
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-[#FAF7F2]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 bg-[#C8A55B]/15 border border-[#C8A55B]/40 rounded-full mb-4">
                <span className="text-[#9E8244] text-xs font-semibold uppercase tracking-[0.2em]">
                  FAQ
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                Frequently Asked <span className="text-[#C8A55B]">Questions</span>
              </h2>
              <p className="text-[#5A6B7F] text-base sm:text-lg max-w-2xl mx-auto">
                Everything you need to know about our NCD investment program
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "What is a Secured NCD?",
                  a: "A Secured Non-Convertible Debenture (NCD) is a debt instrument backed by tangible assets of the company. Unlike unsecured investments, your capital is protected through collateral security, making it one of the safest fixed-income investment options available.",
                },
                {
                  q: "How are the returns guaranteed?",
                  a: "Returns are contractually fixed at 14% per annum and backed by asset collateral. The legal agreement specifies the payment schedule, ensuring predictable returns. Our track record of 15+ years demonstrates our commitment to honoring all financial obligations.",
                },
                {
                  q: "What is the minimum investment amount?",
                  a: "The minimum investment for our NCD program is ₹5 Crore. This threshold ensures we can provide personalized service and maintain the institutional-grade structure of our investment offerings.",
                },
                {
                  q: "How and when do I receive returns?",
                  a: "Returns are credited directly to your registered bank account on a quarterly basis. You'll receive a detailed statement before each payment, and our team ensures timely processing of all payouts.",
                },
                {
                  q: "What documents are required for investment?",
                  a: "Standard KYC documents (PAN card, Aadhaar, address proof), passport-size photographs, and bank account details. Our team will guide you through the documentation process and assist with any queries.",
                },
                {
                  q: "Can I withdraw my investment before maturity?",
                  a: "NCDs have a fixed tenure of 1 year, renewable upon mutual agreement. Pre-mature withdrawal options are available subject to terms and may involve nominal charges. We recommend discussing your liquidity needs during the initial consultation.",
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-[#0A2540]/10 overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#FAF7F2]/50 transition-colors">
                      <h3 className="font-serif text-lg font-semibold text-[#0A2540] pr-4">{item.q}</h3>
                      <svg className="w-5 h-5 text-[#C8A55B] shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-[#5A6B7F] text-sm leading-relaxed border-t border-[#0A2540]/10 pt-4">{item.a}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-[#5A6B7F] text-sm mb-4">Still have questions?</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A2540] hover:bg-[#061A30] text-white font-semibold rounded-lg transition-all text-sm"
              >
                Contact Our Advisors
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        {/* ═══════════════════════════════════════════════════════════════════
            10. FINAL CTA - Premium dark section
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-[#0A2540] via-[#061A30] to-[#0A2540] overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#C8A55B]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C8A55B]/5 rounded-full blur-3xl" />

          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 bg-[#C8A55B]/15 border border-[#C8A55B]/40 rounded-full mb-6">
              <span className="text-[#E5C97F] text-xs font-semibold uppercase tracking-[0.2em]">
                Begin Your Wealth Journey
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Earn <span className="text-[#C8A55B]">14% Returns</span>?
            </h2>
            <p className="text-white/70 text-base sm:text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect with our investment advisors for a personalized consultation. Limited slots available for serious investors.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 sm:px-10 py-4 bg-[#C8A55B] hover:bg-[#E5C97F] text-[#0A2540] font-bold rounded-lg text-base transition-all shadow-2xl hover:shadow-[#C8A55B]/30 hover:-translate-y-0.5"
              >
                Get Started Today
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="mailto:info@shankygroup.com"
                className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 bg-transparent border-2 border-white/30 hover:border-[#C8A55B] hover:bg-[#C8A55B]/10 text-white font-semibold rounded-lg text-base transition-all"
              >
                Email Our Advisors
              </a>
            </div>

            {/* Contact info bar */}
            <div className="pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex items-center justify-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-full bg-[#C8A55B]/10 border border-[#C8A55B]/30 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#C8A55B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">Call Us</div>
                  <div className="text-sm font-semibold">011-47586938 / 47586928</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-full bg-[#C8A55B]/10 border border-[#C8A55B]/30 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#C8A55B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">Email</div>
                  <div className="text-sm font-semibold">info@shankygroup.com</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-full bg-[#C8A55B]/10 border border-[#C8A55B]/30 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#C8A55B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">Website</div>
                  <div className="text-sm font-semibold">shankygroup.com</div>
                </div>
              </div>
            </div>

            {/* Compliance disclaimer */}
            <p className="text-white/40 text-xs mt-10 max-w-3xl mx-auto leading-relaxed">
              Investments in NCDs are subject to terms and conditions specified in the offer document. Past performance is not indicative of future returns. Please read all scheme-related documents carefully before investing.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            11. CONTACT FORM SECTION
           ═══════════════════════════════════════════════════════════════════ */}
        

        </main>

     
        {/* Premium slider styles */}
        <style jsx global>{`
          .slider-premium::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #C8A55B;
            border: 3px solid #FAF7F2;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(200, 165, 91, 0.5);
            transition: all 0.2s ease;
          }
          .slider-premium::-webkit-slider-thumb:hover {
            background: #E5C97F;
            transform: scale(1.15);
          }
          .slider-premium::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #C8A55B;
            border: 3px solid #FAF7F2;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(200, 165, 91, 0.5);
          }

          .font-serif {
            font-family: 'Playfair Display', 'Georgia', serif;
          }
        `}</style>
      </I18nProvider>
    </>
  );
}
