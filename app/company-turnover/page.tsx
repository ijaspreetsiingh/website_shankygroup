'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import turnoverData, { TurnoverData } from '@/app/components/TurnoverData';
import HeaderFour from '@/app/home/home4/HeaderFour';
import FooterFour from '@/app/home/home4/FooterFour';
import { 
  Building2, 
  TrendingUp, 
  Users2, 
  Award, 
  Calendar, 
  IndianRupee, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle2, 
  Globe2, 
  ShieldCheck,
  Factory,
  Wallet,
  GraduationCap,
  HardHat,
  Sprout,
  Cpu,
  ChevronRight,
  Briefcase,
  BarChart3,
  FileText,
  PieChart
} from 'lucide-react';

const ACCENT_COLOR = '#e63a27';
const ACCENT_HOVER = '#c93222';

const companyData = [
  {
    name: 'SHANKY METALS PRIVATE LIMITED',
    establishmentDate: '08/08/2011',
    turnover: turnoverData.find(d => d.companyName.includes('METAL'))?.turnover2025_26 || '14 Cr',
    description: 'Specializing in metal procurement, processing, trading, and export operations with global standards.',
    sector: 'Metals & Trading',
    icon: Factory,
    gradient: 'from-slate-600 to-slate-800',
    status: 'Established'
  },
  {
    name: 'SHANKY FINANCIAL SERVICES PRIVATE LIMITED',
    establishmentDate: '17/10/2018',
    turnover: turnoverData.find(d => d.companyName.includes('FINANCIAL'))?.turnover2025_26 || '26.50 Cr',
    description: 'Comprehensive financial intermediation, investment securities, and advanced proprietary trading.',
    sector: 'Financial Services',
    icon: Wallet,
    gradient: 'from-emerald-600 to-teal-800',
    status: 'High Growth'
  },
  {
    name: 'SHANKY CORPORATE TRAINING PRIVATE LIMITED',
    establishmentDate: '30/01/2019',
    turnover: turnoverData.find(d => d.companyName.includes('CORPORATE'))?.turnover2025_26 || '50 Lakh',
    description: 'Dedicated to corporate & educational training and high-level leadership development programs.',
    sector: 'Education & Training',
    icon: GraduationCap,
    gradient: 'from-indigo-600 to-violet-800',
    status: 'Strategic'
  },
  {
    name: 'Shanky Buildtech',
    establishmentDate: '22/07/2014',
    turnover: turnoverData.find(d => d.companyName.includes('BUILDTECH'))?.turnover2025_26 || '8 Cr',
    description: 'Leading infrastructure and construction projects across residential, commercial, and industrial sectors.',
    sector: 'Construction',
    icon: HardHat,
    gradient: 'from-amber-600 to-orange-800',
    status: 'Reliable'
  },
  {
    name: 'VMS HUB PRIVATE LIMITED',
    establishmentDate: '05/08/2025',
    turnover: turnoverData.find(d => d.companyName.includes('VMS HUB'))?.turnover2025_26 || '245 Cr',
    description: 'Large-scale food & agriculture distribution and integrated supply chain management solutions.',
    sector: 'Food & Agriculture',
    icon: Sprout,
    gradient: 'from-green-600 to-emerald-800',
    status: 'Market Leader'
  },
  {
    name: 'SHANKY SMART TECH PRIVATE LIMITED',
    establishmentDate: '06/08/2025',
    turnover: turnoverData.find(d => d.companyName.includes('SMART TECH'))?.turnover2025_26 || '14 Cr',
    description: 'Innovative Solar EPC solutions, smart electronics, and advanced IoT & AI integration.',
    sector: 'Solar & Technology',
    icon: Cpu,
    gradient: 'from-blue-600 to-cyan-800',
    status: 'Innovative'
  }
];

export default function CompanyDataPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const totalTurnover = companyData.reduce((sum, company) => {
    const turnover = parseFloat(company.turnover.replace(/[^0-9.]/g, ''));
    const multiplier = company.turnover.includes('Lakh') ? 0.01 : 1;
    return sum + (turnover * multiplier);
  }, 0);

  const yearsOfExcellence = new Date().getFullYear() - 2011;

  const faqs = [
    {
      question: "What is Shanky Group's total turnover?",
      answer: `Shanky Group's total turnover for FY 2025-26 is ₹${totalTurnover.toFixed(2)} Cr+, with VMS Hub contributing the highest at ₹245 Cr.`
    },
    {
      question: "When was Shanky Metals Private Limited established?",
      answer: "Shanky Metals Private Limited was established on 08/08/2011, making it the oldest company in the Shanky Group."
    },
    {
      question: "Which company has the highest turnover in FY 2025-26?",
      answer: "VMS Hub Private Limited has the highest turnover at ₹245 Cr in FY 2025-26, followed by Shanky Financial Services at ₹26.50 Cr."
    },
    {
      question: "What sectors does Shanky Group operate in?",
      answer: "Shanky Group operates in 6 major sectors: Financial Services, Food & Agriculture, Solar & Technology, Construction, Metals & Trading, and Education & Training."
    },
    {
      question: "When were the latest companies established?",
      answer: "VMS Hub Private Limited was established on 05/08/2025 and SHANKY SMART TECH PRIVATE LIMITED on 06/08/2025, making them the newest additions to the group."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Shanky Group",
    "url": "https://shankygroup.com",
    "logo": "https://shankygroup.com/logo.png",
    "description": "A premier Indian conglomerate with 6 companies across Finance, Food, Solar, Construction, Metals, and Education sectors",
    "foundingDate": "2011",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "D Mall, NSP, Pitampura",
      "addressLocality": "Delhi",
      "postalCode": "110034",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+011-47586938",
      "contactType": "customer service"
    },
    "subOrganization": companyData.map(company => ({
      "@type": "Organization",
      "name": company.name,
      "foundingDate": company.establishmentDate,
      "description": company.description,
      "industry": company.sector
    }))
  };

  return (
    <>
      <HeaderFour isScrolled={isScrolled} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div
        className="company-turnover-root relative w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]"
        style={{ ['--accent' as string]: ACCENT_COLOR, ['--accent-hover' as string]: ACCENT_HOVER }}
      >
        {/* Hero Section - Compliance Style */}
        <section className="relative w-full pt-3 sm:pt-4 md:pt-6 lg:pt-8 px-3 sm:px-4 md:px-8 lg:px-12 pb-0 bg-[var(--background)]">
          <div className="about-hero-card relative min-h-[60vh] sm:h-[68vh] md:h-[72vh] lg:h-[75vh] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-[var(--card-border)]">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop"
              alt="Shanky Group Turnover - Financial Performance Data"
              fill
              className="object-cover object-[center_30%] brightness-[0.8] contrast-[1.05]"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-0 flex flex-col z-30">
              <div className="about-hero-content flex-1 flex items-center px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-16">
                <div className="w-full max-w-3xl text-left">
                  <span className="inline-block px-4 py-2 bg-[#e63a27] text-white text-[10px] sm:text-xs lg:text-sm font-semibold tracking-widest rounded-full uppercase mb-5 sm:mb-6 syne-font">
                    Corporate Performance
                  </span>
                  <h1 className="about-hero-title section-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-4 sm:mb-6">
                    <span className="text-[#e63a27]">Shanky Group</span>
                    <br />
                    <span className="text-white/95">Turnover</span>
                  </h1>
                  <p className="about-hero-desc text-sm sm:text-lg md:text-xl max-w-2xl text-white/90 leading-relaxed mb-8 sm:mb-10">
                    A comprehensive overview of Shanky Group&apos;s diversified portfolio, featuring audited financial indicators and official establishment records across our strategic business units.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm lg:text-base shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    >
                      Institutional Inquiry
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-20 lg:py-24 max-w-[90rem]">
          
          {/* Section 1: Key Performance Indicators */}
          <section className="mb-20 sm:mb-28">
            <div className="mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-3 text-[#e63a27] font-semibold text-sm sm:text-base tracking-[0.2em] uppercase mb-3 syne-font">
                <span className="w-8 sm:w-10 h-0.5 bg-[#e63a27]" />
                Executive Summary
              </span>
              <h2 className="section-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
                Key Performance <span className="text-[#e63a27]">Indicators</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { value: `₹${totalTurnover.toFixed(2)} Cr`, label: 'Aggregate Turnover', sub: 'Projected FY 2025-26', icon: TrendingUp },
                { value: '06', label: 'Business Units', sub: 'Strategic Verticals', icon: Building2 },
                { value: '500+', label: 'Human Capital', sub: 'Skilled Workforce', icon: Users2 },
                { value: `${yearsOfExcellence}+`, label: 'Years of Excellence', sub: 'Market Leadership', icon: Award },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group bg-[var(--card-bg)] rounded-2xl p-8 border border-[var(--card-border)] hover:border-[#e63a27]/40 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#e63a27]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-[#e63a27]" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[#e63a27] transition-colors stat-value">
                    {stat.value}
                  </h3>
                  <div className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1 syne-font">
                    {stat.label}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] font-medium">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Strategic Business Units - Policy Style Grid */}
          <section className="mb-20 sm:mb-28">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <span className="inline-flex items-center gap-3 text-[#e63a27] font-semibold text-sm sm:text-base tracking-[0.2em] uppercase mb-3 syne-font">
                  <span className="w-8 sm:w-10 h-0.5 bg-[#e63a27]" />
                  Organizational Structure
                </span>
                <h2 className="section-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
                  Strategic Business <span className="text-[#e63a27]">Units</span>
                </h2>
              </div>
              <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-xl lg:text-right">
                Our diversified portfolio consists of six high-performance companies driving innovation and excellence across core sectors of the Indian economy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {companyData.map((company, index) => (
                <div
                  key={index}
                  className="group relative bg-[var(--card-bg)] rounded-2xl p-8 border border-[var(--card-border)] hover:border-[#e63a27]/50 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                >
                  <span className="absolute top-6 right-8 text-4xl font-black text-[#e63a27]/10 group-hover:text-[#e63a27]/20 transition-colors select-none syne-font">
                    0{index + 1}
                  </span>
                  
                  <div className="w-14 h-14 rounded-xl bg-[#e63a27]/10 flex items-center justify-center mb-6 group-hover:bg-[#e63a27] transition-all duration-500">
                    <company.icon className="w-7 h-7 text-[#e63a27] group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[#e63a27] transition-colors leading-tight">
                    {company.name}
                  </h3>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest mb-4 w-fit syne-font">
                    {company.sector}
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 flex-1">
                    {company.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[var(--card-border)]">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-widest mb-1 syne-font">Established</p>
                      <p className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5 syne-font">
                        <Calendar className="w-3.5 h-3.5 text-[#e63a27]" />
                        {company.establishmentDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-widest mb-1 syne-font">Turnover</p>
                      <p className="text-sm font-bold text-[#e63a27] flex items-center gap-1.5 syne-font">
                        <IndianRupee className="w-3.5 h-3.5" />
                        {company.turnover}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Financial Records Table - Formal Style */}
          <section className="mb-20 sm:mb-28">
            <div className="bg-[var(--card-bg)] rounded-3xl border border-[var(--card-border)] overflow-hidden shadow-2xl">
              <div className="p-8 sm:p-10 border-b border-[var(--card-border)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2">Detailed Financial Records</h2>
                  <p className="text-sm text-[var(--text-secondary)] font-medium syne-font">Official data verification for Fiscal Year 2025-26</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--card-bg)] bg-slate-200 dark:bg-slate-800" />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-[var(--card-bg)] bg-[#e63a27] flex items-center justify-center text-[10px] font-bold text-white shadow-lg syne-font">+12</div>
                  </div>
                  <div className="h-10 w-px bg-[var(--card-border)] hidden md:block" />
                  <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#e63a27] rounded-xl hover:bg-[#c93222] transition-all shadow-lg">
                    <Globe2 className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 dark:bg-slate-900/50">
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Business Entity</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] text-center">Incorporation</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] text-right">Market Sector</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] text-right">FY 25-26 Revenue</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] text-center">Compliance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--card-border)]">
                    {companyData.map((company, index) => (
                      <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#e63a27]/5 flex items-center justify-center text-[#e63a27] border border-[#e63a27]/10 group-hover:bg-[#e63a27] group-hover:text-white transition-all">
                              <company.icon className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-[var(--text-primary)] group-hover:text-[#e63a27] transition-colors" style={{fontFamily: 'var(--font-syne), "Syne", "Inter", Arial, sans-serif', fontWeight: '700', letterSpacing: '0.04em'}}>{company.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center text-sm font-bold text-[var(--text-secondary)]" style={{fontFamily: 'var(--font-syne), "Syne", "Inter", Arial, sans-serif', fontWeight: '700', letterSpacing: '0.04em'}}>
                          {company.establishmentDate}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider" style={{fontFamily: 'var(--font-syne), "Syne", "Inter", Arial, sans-serif', fontWeight: '700', letterSpacing: '0.04em'}}>{company.sector}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="inline-block px-4 py-1.5 rounded-lg bg-[#e63a27]/5 text-[#e63a27] font-black text-sm border border-[#e63a27]/10" style={{fontFamily: 'var(--font-syne), "Syne", "Inter", Arial, sans-serif', fontWeight: '700', letterSpacing: '0.04em'}}>
                            ₹{company.turnover}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4: Corporate Philosophy - Split Style */}
          <section className="mb-20 sm:mb-28">
            <div className="relative w-full overflow-hidden rounded-3xl border border-[var(--card-border)] shadow-2xl bg-[var(--card-bg)]">
              <div className="grid lg:grid-cols-2 min-h-0">
                <div className="relative min-h-[300px] lg:min-h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80"
                    alt="Corporate Governance"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:from-[#e63a27]/90 lg:to-[#e63a27]/40" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16 text-white">
                    <h3 className="text-2xl sm:text-4xl font-bold mb-4 leading-tight">Corporate Governance & Ethics</h3>
                    <p className="text-white/90 text-sm sm:text-lg leading-relaxed max-w-lg">
                      Our governance framework is designed to ensure long-term value creation through transparency, accountability, and ethical business conduct.
                    </p>
                  </div>
                </div>
                <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="space-y-10">
                    {[
                      { title: 'Visionary Growth', desc: 'Strategic diversification across core sectors with a focus on sustainable long-term expansion.', icon: TrendingUp },
                      { title: 'Operational Excellence', desc: 'Standardized processes and rigorous internal controls across all business entities.', icon: Briefcase },
                      { title: 'Data Integrity', desc: 'Commitment to transparent financial reporting and audited performance metrics.', icon: BarChart3 },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 group">
                        <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#e63a27]/10 flex items-center justify-center shadow-sm group-hover:bg-[#e63a27] transition-all duration-500">
                          <item.icon className="w-7 h-7 text-[#e63a27] group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[#e63a27] transition-colors">{item.title}</h4>
                          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Common Inquiries - FAQ */}
          <section className="mb-20 sm:mb-28">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <span className="inline-flex items-center gap-3 text-[#e63a27] font-semibold text-sm sm:text-base tracking-[0.2em] uppercase mb-3 syne-font">
                  <span className="w-8 sm:w-10 h-0.5 bg-[#e63a27]" />
                  Information Desk
                </span>
                <h2 className="section-heading text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                  Common <span className="text-[#e63a27]">Inquiries</span>
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-300 ${
                      openFaq === index
                        ? 'border-[#e63a27] bg-white dark:bg-slate-900 shadow-xl shadow-[#e63a27]/5'
                        : 'border-[var(--card-border)] hover:border-[#e63a27]/30'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-8 py-6 flex items-center justify-between gap-4 text-left"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                        {faq.question}
                      </h3>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        openFaq === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-8 pb-8 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed syne-font">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 6: CTA - Large Red Banner */}
          <section>
            <div className="relative rounded-3xl bg-[#e63a27] overflow-hidden p-10 sm:p-20 text-center shadow-2xl">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
              </div>
              
              <div className="relative z-10 max-w-3xl mx-auto cta-section-content">
                <span className="inline-block px-4 py-2 bg-white/20 text-white text-[10px] sm:text-xs font-semibold tracking-wider rounded-full uppercase mb-6 backdrop-blur-sm syne-font">
                  Executive Communications
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                  Connect with the Shanky Group Executive Office
                </h2>
                <p className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed">
                  For institutional inquiries, strategic partnership opportunities, or official requests, our corporate communications team is ready to assist you.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="px-10 py-4 rounded-xl bg-white text-[#e63a27] font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
                  >
                    Contact Corporate Office
                  </Link>
                  <button
                    className="px-10 py-4 rounded-xl bg-white/10 backdrop-blur-md text-white font-bold border border-white/20 hover:bg-white/20 transition-all syne-font"
                  >
                    Download Annual Report
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <FooterFour />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        /* Company Turnover page titles - Same as "Legacy & Leadership" headline */
        .company-turnover-root h1,
        .company-turnover-root h2,
        .company-turnover-root h3,
        .company-turnover-root h4,
        .company-turnover-root h5,
        .company-turnover-root h6,
        .company-turnover-root .section-heading,
        .company-turnover-root .about-hero-title {
          font-family: var(--font-syne), 'Syne', 'Inter', Arial, sans-serif !important;
          font-weight: 700 !important;
          letter-spacing: 0.04em !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .company-turnover-root .section-heading {
          font-family: inherit;
        }
      `}</style>
    </>
  );
}