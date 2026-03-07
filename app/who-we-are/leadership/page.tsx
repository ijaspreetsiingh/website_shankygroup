'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import WhoWeAreNav from '../WhoWeAreNav';
import shivani1Img from '../../images/team/shivani1.jpeg';

const LeadershipPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [selectedLeader, setSelectedLeader] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Leadership Data
  const leadershipData = {
    boardOfDirectors: [
      {
        id: 1,
        name: "Vipin Kumar",
        position: "Managing Director/Chairmen",
        description: "Mr. Vipin Kumar has been at the helm of Shanky Group since its inception. A Chartered Accountant and MBA (Finance) with over a decade of experience in diversified businesses, he has been instrumental in the Group's expansion and diversification. His strategic vision and commitment to ethical practices have established him as a trusted leader. He holds directorships in Shanky Metals Pvt Ltd, Shanky Buildtech Pvt Ltd, Shanky Financial Services Pvt Ltd, and Shanky Corporate Training Pvt Ltd.",
        image: "/images/team/vipin_sir.jpg",
        department: "Leadership",
        category: "board",
        education: "Master's Degree in Business Administrator",
        tenure: "From 2014-Present",
        social: { linkedin: "https://linkedin.com", twitter: "https://twitter.com", email: "mailto:contact@shankygroup.com" }
      },
      {
        id: 2,
        name: "Manoj Kumar Mishra",
        position: "Executive Director",
        description: "Mr. Mishra brings over 22 years of experience in finance, accounts, and commercial operations across manufacturing and retail sectors. As a Chartered Accountant and Cost Accountant and CPA, MBA as well he has a proven track record in financial management, statutory compliance, and strategic planning. Mr. Mishra's expertise encompasses financial analysis, budgeting, audit, taxation, and regulatory affairs. His leadership ensures robust financial governance and risk management across the Group's companies.",
        image: "/images/team/manoj_sir.jpg",
        department: "Finance",
        category: "board",
        education: "Chartered Accountant / CPA / MBA",
        tenure: "From 2019-Present",
        social: { linkedin: "https://linkedin.com", email: "mailto:contact@shankygroup.com" }
      }
    ],
    seniorManagement: [
      {
        id: 3,
        name: "Poonam Shah",
        position: "Vice President, Operations",
        description: "Ms. Shah oversees operational excellence and process optimization across the Group's diverse businesses. Her expertise in supply chain management, quality assurance, and project execution has contributed to the Group's reputation for reliability and efficiency.",
        image: "/images/team/poonam.jpg",
        department: "Operations",
        category: "senior",
        education: "Master's Degree in Finance",
        tenure: "From 2015-Present",
        social: { linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
      },
      {
        id: 4,
        name: "Priyanka Girdhar",
        position: "Vice President, Admin",
        description: "Ms. Girdhar is an accomplished administrative leader with a strong track record of designs, directs, and optimizes an organisation's administrative backbone so business units can operate reliably, compliantly, and at scale. The role combines strategic planning, policy and budget ownership, facilities and vendor management.",
        image: "/images/team/priyanka.jpg",
        department: "Administration",
        category: "senior",
        education: "Master's Degree in Finance",
        tenure: "From 2015-Present",
        social: { linkedin: "https://linkedin.com" }
      },
      {
        id: 5,
        name: "Rajeev Ranjan Jha",
        position: "Finance Head",
        description: "Financial operations leader responsible for accounting, financial reporting, and compliance functions.",
        image: "/images/team/rajeev1.jpg",
        department: "Finance",
        category: "senior",
        education: "Master's Degree in Finance and Chartered Accountant (Intermediate)",
        tenure: "From 2020-Present",
        bio: "Extensive experience in corporate finance, audit, and regulatory compliance ensuring transparency and integrity.",
        social: { linkedin: "https://linkedin.com", email: "mailto:contact@shankygroup.com" }
      },
      {
        id: 6,
        name: "Shivani Bansal",
        position: "Legal Advisor",
        description: "I am a legal advisor with experience in contract review, legal documentation, and dispute resolution. I ensure agreements and procedures are legally sound and risk-free. I am committed to delivering business-focused legal solutions while maintaining standards of professional integrity and governance.",
        image: shivani1Img.src,
        department: "Legal",
        category: "senior",
        education: "B.A.LL.B",
        tenure: "From 2022-Present",
        social: { linkedin: "https://linkedin.com" }
      },
      {
        id: 7,
        name: "Shubh Gupta",
        position: "Purchase Manager",
        description: "Key member of the leadership team driving procurement, vendor management, and supply chain execution across the Group.",
        image: "/images/team/shubh.png",
        department: "Purchase",
        category: "senior",
        education: "Bachelor Degree in Business Administration",
        tenure: "From 2021-Present",
        social: { linkedin: "https://linkedin.com" }
      }
    ],
  };

  // Social icon links for profile modal (optional per leader)
  const getSocialLinks = (leader: any) => ({
    linkedin: leader?.social?.linkedin || "#",
    twitter: leader?.social?.twitter || "#",
    email: leader?.social?.email || "#",
  });

  // Combine all leaders
  const allLeaders = [
    ...leadershipData.boardOfDirectors,
    ...leadershipData.seniorManagement
  ];

  // Filter leaders based on active filter
  const filteredLeaders = activeFilter === "all" 
    ? allLeaders 
    : allLeaders.filter(leader => leader.category === activeFilter);

  // Filter options
  const filterOptions = [
    { id: "all", label: "All Leaders" },
    { id: "board", label: "Board of Directors" },
    { id: "senior", label: "Senior Management" }
  ];

  // Leadership values
  const leadershipValues = [
    {
      icon: "🎯",
      title: "Visionary Thinking",
      description: "Anticipating future trends and positioning the organization for long-term success."
    },
    {
      icon: "🤝",
      title: "Collaborative Leadership",
      description: "Fostering teamwork and building consensus across diverse stakeholders."
    },
    {
      icon: "⚡",
      title: "Agile Execution",
      description: "Responding quickly to market changes and executing strategies with precision."
    },
    {
      icon: "🌱",
      title: "Sustainable Growth",
      description: "Balancing profitability with environmental and social responsibility."
    }
  ];

  const handleLeaderClick = (leader: any) => {
    setSelectedLeader(leader);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('leadership-modal-open'));
    }
  };

  const closeProfileModal = () => {
    setSelectedLeader(null);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('leadership-modal-close'));
    }
  };

  useEffect(() => {
    if (selectedLeader && typeof window !== 'undefined' && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [selectedLeader]);

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
  };

  // Calculate company experience from tenure (e.g. "From 2014-Present" → "12 years")
  const getExperienceFromTenure = (tenure: string | undefined): string => {
    if (!tenure || typeof tenure !== 'string') return '—';
    const match = tenure.match(/From\s+(\d{4})\s*-/i);
    if (!match) return '—';
    const startYear = parseInt(match[1], 10);
    const currentYear = new Date().getFullYear();
    const years = Math.max(0, currentYear - startYear);
    if (years === 0) return 'Less than 1 year';
    return years === 1 ? '1 year' : `${years} years`;
  };

  return (
    <>
      {/* Hero - same design as about-us */}
      <div
        className="relative w-full bg-[var(--background)] text-[var(--foreground)]"
        style={{ ['--accent' as string]: '#e63a27', ['--accent-hover' as string]: '#c93222' }}
      >
        <section ref={heroRef} className="relative w-full pt-3 sm:pt-4 md:pt-6 lg:pt-8 px-3 sm:px-4 md:px-8 lg:px-12 pb-0 bg-[var(--background)]">
          <div className="relative w-full h-[58vh] min-h-[260px] sm:min-h-[300px] sm:h-[65vh] md:h-[72vh] lg:h-[75vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-[var(--card-border)]">
            <Image
              src="/images/aboutus2.png"
              alt="Leadership - Shanky Group"
              fill
              className="object-cover object-[center_42%] sm:object-right brightness-100"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-0 flex flex-col z-30">
              <div className="flex-1 flex items-center px-3 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-16">
                <div className="w-full max-w-2xl lg:max-w-3xl text-left">
                  <h1 className="section-heading text-[28px] min-[380px]:text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-3 sm:mb-4 lg:mb-5">
                    <span className="text-[#e63a27]">LEADERSHIP</span>
                    <br />
                    <span className="text-neutral-800">Vision. Experience. Impact.</span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl text-neutral-600 leading-relaxed mb-5 sm:mb-6 md:mb-8 lg:mb-10">
                    The strength of Shanky Group lies in its accomplished leadership team, whose collective expertise and strategic foresight shape our growth.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 lg:px-8 lg:py-4 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-lg sm:rounded-xl transition-all text-xs sm:text-sm lg:text-base shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    >
                      Get in Touch
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="shrink-0 px-3 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-3 sm:py-4 lg:py-5">
                <nav className="flex items-center text-[10px] sm:text-xs md:text-sm text-neutral-500 flex-wrap gap-x-1.5 sm:gap-x-2 gap-y-1">
                  <Link href="/" className="hover:text-neutral-800 transition-colors">Home</Link>
                  <span className="text-neutral-400">/</span>
                  <Link href="/who-we-are/about-us" className="hover:text-neutral-800 transition-colors">Who We Are</Link>
                  <span className="text-neutral-400">/</span>
                  <span className="text-neutral-800 font-medium">Leadership</span>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content Section - responsive */}
      <section 
        ref={sectionRef}
        className="relative z-10 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 md:px-8"
        style={{ backgroundColor: 'var(--background)', fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif' }}
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div 
            className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <div className="inline-block mb-4 sm:mb-5">
              <span 
                className="inline-block bg-[#e63a27] text-[var(--card-bg)] text-[10px] sm:text-xs md:text-sm font-semibold py-2 px-3 sm:py-2.5 sm:px-5 md:px-6 rounded-full uppercase tracking-wider shadow-[0_4px_15px_rgba(230,58,39,0.3)]"
              >
                Leadership Excellence
              </span>
            </div>
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-bold text-[var(--text-primary)] mb-4 sm:mb-6 leading-tight">
              Meet Our Leadership Team
            </h2>
            <div 
              className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 mx-auto mb-5 sm:mb-8 rounded-full"
              style={{ background: 'linear-gradient(135deg, #e63a27 0%, #ff6b6b 100%)' }}
            />
            <p 
              className="text-sm sm:text-base md:text-lg lg:text-xl max-w-[900px] mx-auto leading-relaxed font-normal px-1"
              style={{ color: 'var(--text-primary)', fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif' }}
            >
              The strength of Shanky Group lies in its accomplished leadership team, whose collective expertise and strategic foresight have been instrumental in shaping the Group&apos;s growth trajectory. Our leaders are committed to upholding core values, driving innovation, and ensuring robust governance across all business verticals.
            </p>
          </div>

          {/* Filter Buttons - hidden per request */}
          <div 
            className="hidden flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 md:mb-16 lg:mb-20"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s'
            }}
          >
            {filterOptions.map((filter, index) => (
              <button
                key={filter.id}
                className="relative overflow-hidden rounded-lg sm:rounded-xl py-2.5 px-4 sm:py-3 sm:px-5 md:px-7 text-xs sm:text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all duration-300 border"
                style={{
                  backgroundColor: activeFilter === filter.id ? '#e63a27' : 'var(--card-bg)',
                  borderColor: activeFilter === filter.id ? '#e63a27' : 'var(--card-border)',
                  color: activeFilter === filter.id ? 'var(--card-bg)' : 'var(--text-secondary)',
                  fontFamily: '"Inter", sans-serif',
                  boxShadow: activeFilter === filter.id ? '0 8px 25px rgba(230, 58, 39, 0.25)' : '0 2px 8px rgba(0, 0, 0, 0.06)',
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                  transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.3 + index * 0.1}s`
                }}
                onClick={() => handleFilterClick(filter.id)}
                onMouseEnter={(e: any) => {
                  if (activeFilter !== filter.id) {
                    e.target.style.backgroundColor = 'var(--card-bg)';
                    e.target.style.borderColor = '#e63a27';
                    e.target.style.color = '#e63a27';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(230, 58, 39, 0.15)';
                  }
                }}
                onMouseLeave={(e: any) => {
                  if (activeFilter !== filter.id) {
                    e.target.style.backgroundColor = 'var(--card-bg)';
                    e.target.style.borderColor = 'var(--card-border)';
                    e.target.style.color = 'var(--text-secondary)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  }
                }}
              >
                <span className="relative z-[1]">{filter.label}</span>
                {activeFilter === filter.id && (
                  <div 
                    className="absolute inset-0 rounded-lg sm:rounded-xl"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Leadership Grid - responsive */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-9 mb-12 sm:mb-16 md:mb-20 lg:mb-24"
            style={{ position: 'relative' }}
          >
            {filteredLeaders.map((leader, index) => (
              <div 
                key={leader.id}
                className="rounded-xl sm:rounded-2xl md:rounded-[28px] overflow-hidden h-full flex flex-col relative cursor-pointer"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.07), 0 2px 12px rgba(0,0,0,0.04)',
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`
                }}
                onClick={() => handleLeaderClick(leader)}
                onMouseEnter={() => setHoveredCard(leader.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image area - phone: fixed height + full width so face shows perfect; desktop: square */}
                <div className="px-1 sm:px-2 pt-1 sm:pt-2 flex-shrink-0 relative isolate">
                  <div 
                    className="relative w-full h-[280px] sm:h-auto sm:aspect-square sm:max-h-[260px] md:max-h-[300px] lg:max-h-[340px] overflow-hidden rounded-xl sm:rounded-2xl border border-[var(--card-border)] box-border bg-[var(--card-border)]"
                  >
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="absolute inset-0 w-full h-full object-cover object-[center_18%] block size-full"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                {/* Content - responsive */}
                <div 
                  className="p-3 sm:p-4 md:p-4 flex-grow flex flex-col rounded-b-2xl sm:rounded-b-[28px]"
                  style={{ backgroundColor: 'var(--card-bg)' }}
                >
                  <div className="flex items-center justify-start gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                    <h3 className="section-heading text-base sm:text-lg md:text-xl font-bold text-[var(--text-primary)] m-0 leading-tight tracking-tight shrink-0 max-w-[calc(100%-28px)] sm:max-w-[calc(100%-30px)] truncate">
                      {leader.name}
                    </h3>
                    <span 
                      className="w-5 h-5 sm:w-[22px] sm:h-[22px] rounded-full bg-[#22c55e] inline-flex items-center justify-center flex-shrink-0" 
                      title="Verified"
                    >
                      <svg className="w-3 h-3 sm:w-[13px] sm:h-[13px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </span>
                  </div>
                  <p 
                    className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-snug m-0 mb-2 sm:mb-3 line-clamp-2"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {leader.position}. {leader.description}
                  </p>
                  <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-3 mt-auto">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                      {(leader as any).tenure && (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          <span className="text-[10px] sm:text-xs md:text-sm text-[var(--text-primary)] font-normal truncate" style={{ fontFamily: '"Inter", sans-serif' }}>{(leader as any).tenure}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        <span className="text-[10px] sm:text-xs md:text-sm text-[var(--text-primary)] font-normal truncate max-w-[80px] sm:max-w-[140px]" style={{ fontFamily: '"Inter", sans-serif' }}>{leader.education}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleLeaderClick(leader); }}
                      className="inline-flex items-center gap-1 sm:gap-1.5 py-2 px-2.5 sm:py-2.5 sm:px-3.5 rounded-full border-0 cursor-pointer flex-shrink-0 whitespace-nowrap text-[10px] sm:text-xs md:text-[13px] font-medium"
                      style={{ backgroundColor: 'var(--card-border)', color: 'var(--text-primary)', fontFamily: '"Inter", sans-serif' }}
                    >
                      view<span className="text-sm sm:text-base md:text-lg leading-none font-normal ml-0.5" style={{ color: 'var(--text-primary)' }}>+</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leader Detail Popup Modal - Profile-style with social icons */}
      {selectedLeader && (() => {
        const social = getSocialLinks(selectedLeader);
        return (
        <div 
          className="fixed inset-0 z-[1002] flex items-center justify-center p-3 sm:p-4 md:p-6"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
        >
          <div 
            className="w-full max-w-[560px] max-h-[85dvh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden relative rounded-xl sm:rounded-2xl md:rounded-[28px] border overscroll-contain"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px var(--card-border)',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Close Button - responsive */}
            <button
              onClick={() => closeProfileModal()}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl font-medium cursor-pointer transition-all z-10 border"
              style={{
                backgroundColor: 'var(--card-border)',
                borderColor: 'var(--card-border)',
                color: 'var(--text-secondary)'
              }}
              onMouseEnter={(e: any) => {
                const el = e.currentTarget;
                el.style.backgroundColor = 'var(--text-secondary)';
                el.style.color = 'var(--card-bg)';
              }}
              onMouseLeave={(e: any) => {
                const el = e.currentTarget;
                el.style.backgroundColor = 'var(--card-border)';
                el.style.color = 'var(--text-secondary)';
              }}
            >
              ×
            </button>

            {/* Profile header - responsive */}
            <div 
              className="flex flex-col items-center text-center pt-8 pb-6 px-4 sm:pt-10 sm:pb-7 sm:px-6 md:pt-11 md:pb-7 md:px-8 border-b border-[var(--card-border)]"
            >
              <div 
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] rounded-full overflow-hidden flex-shrink-0 mb-4 sm:mb-5 border-4 border-[var(--card-bg)]"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px var(--card-border)' }}
              >
                <img
                  src={selectedLeader.image}
                  alt={selectedLeader.name}
                  className="w-full h-full object-cover object-[center_top]"
                />
              </div>
              <h2 className="section-heading text-xl sm:text-2xl md:text-[26px] font-bold text-[var(--text-primary)] mb-1.5 sm:mb-2">
                {selectedLeader.name}
              </h2>
              <p 
                className="text-sm sm:text-base font-semibold text-[#e63a27] mb-2 sm:mb-3"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {selectedLeader.position}
              </p>
              <span 
                className="inline-block bg-[#e63a27] text-white text-[9px] sm:text-[10px] md:text-[11px] font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded-full mb-4 sm:mb-5 uppercase tracking-wide"
              >
                {selectedLeader.department}
              </span>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-200 no-underline flex-shrink-0"
                  style={{
                    backgroundColor: 'var(--card-border)',
                    borderColor: 'var(--card-border)',
                    color: '#0a66c2'
                  }}
                  onMouseEnter={(e: any) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'rgba(10, 102, 194, 0.2)';
                    el.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e: any) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'var(--card-border)';
                    el.style.transform = 'scale(1)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X (Twitter)"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-200 no-underline flex-shrink-0"
                  style={{
                    backgroundColor: 'var(--card-border)',
                    borderColor: 'var(--card-border)',
                    color: 'var(--text-primary)'
                  }}
                  onMouseEnter={(e: any) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'var(--text-secondary)';
                    el.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e: any) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'var(--card-border)';
                    el.style.transform = 'scale(1)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a
                  href={social.email}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Email"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-200 no-underline flex-shrink-0"
                  style={{
                    backgroundColor: 'var(--card-border)',
                    borderColor: 'var(--card-border)',
                    color: 'var(--text-secondary)'
                  }}
                  onMouseEnter={(e: any) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'var(--text-secondary)';
                    el.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e: any) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'var(--card-border)';
                    el.style.transform = 'scale(1)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </a>
              </div>
            </div>

            {/* About + Education/Experience - responsive */}
            <div className="p-4 sm:p-5 md:p-6 lg:p-7 lg:px-8 text-left">
              <h4 className="section-heading text-xs sm:text-sm font-bold text-[var(--text-primary)] mb-2 sm:mb-2.5">
                About
              </h4>
              <p 
                className="text-xs sm:text-sm md:text-[15px] leading-relaxed text-[var(--text-secondary)] mb-4 sm:mb-5 md:mb-6"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {selectedLeader.description}
                {selectedLeader.bio ? ` ${selectedLeader.bio}` : ''}
              </p>
              <div 
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl border"
                style={{ backgroundColor: 'var(--card-border)', borderColor: 'var(--card-border)' }}
              >
                {(selectedLeader as any).tenure && (
                  <div>
                    <h4 className="section-heading text-[9px] sm:text-[10px] font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
                      Tenure
                    </h4>
                    <p 
                      className="text-xs sm:text-sm text-[var(--text-primary)] m-0 leading-snug font-medium"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      {(selectedLeader as any).tenure}
                    </p>
                  </div>
                )}
                <div>
                  <h4 className="section-heading text-[9px] sm:text-[10px] font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
                    Education
                  </h4>
                  <p 
                    className="text-xs sm:text-sm text-[var(--text-primary)] m-0 leading-snug font-medium"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {selectedLeader.education}
                  </p>
                </div>
                <div>
                  <h4 className="section-heading text-[9px] sm:text-[10px] font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
                    Experience (with company)
                  </h4>
                  <p 
                    className="text-xs sm:text-sm text-[var(--text-primary)] m-0 leading-snug font-medium"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {getExperienceFromTenure((selectedLeader as any).tenure)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      })()}
    </>
  );
};

export default LeadershipPage;
