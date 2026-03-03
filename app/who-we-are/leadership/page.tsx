'use client';

import { useState, useEffect, useRef } from "react";
import WhoWeAreNav from '../WhoWeAreNav';

// Shivani image from app/images/team – bundled so it always loads
import shivani1Img from '../../images/team/shivani1.jpeg';

const LeadershipPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [selectedLeader, setSelectedLeader] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
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
        education: "CA, MBA Finance",
        experience: "20+ years",
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
        education: "CA, Cost Accountant, CPA, MBA",
        experience: "22+ years",
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
        education: "MBA",
        experience: "15+ years",
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
        education: "MBA Operations",
        experience: "12+ years",
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
        education: "CA, MBA Finance",
        experience: "18+ years",
        bio: "Extensive experience in corporate finance, audit, and regulatory compliance ensuring transparency and integrity.",
        social: { linkedin: "https://linkedin.com", email: "mailto:contact@shankygroup.com" }
      },
      {
        id: 6,
        name: "Shivani",
        position: "Legal Advisor",
        description: "I am a legal advisor with experience in contract review, legal documentation, and dispute resolution. I ensure agreements and procedures are legally sound and risk-free. I am committed to delivering business-focused legal solutions while maintaining standards of professional integrity and governance.",
        image: shivani1Img.src,
        department: "Legal",
        category: "senior",
        education: "Graduate",
        experience: "8+ years",
        social: { linkedin: "https://linkedin.com" }
      },
      {
        id: 7,
        name: "Shub",
        position: "Senior Management",
        description: "Key member of the leadership team driving strategy and execution across the Group.",
        image: "/images/team/shubh.png",
        department: "Management",
        category: "senior",
        education: "Graduate",
        experience: "8+ years",
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
  };

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
  };

  return (
    <>
      {/* Hero Section - responsive */}
      <section 
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh]"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="relative z-[2] w-full max-w-[1900px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-[40px] py-8 sm:py-10 md:py-12" style={{ color: 'var(--foreground)' }}>
          <div className="max-w-[800px] lg:max-w-[1100px] xl:max-w-[1200px]">
            {/* Breadcrumb */}
            <div 
              className="mb-6 sm:mb-8 md:mb-10 text-xs sm:text-sm md:text-base"
              style={{ color: 'var(--text-secondary)', fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif' }}
            >
              <span style={{ cursor: 'pointer' }}>About Us</span>
              <span className="mx-1.5 sm:mx-2">/</span>
              <span style={{ color: '#e63a27' }}>Leadership</span>
            </div>
            <h1 
              className="text-3xl min-[400px]:text-4xl sm:text-5xl md:text-[56px] lg:text-[64px] xl:text-[72px] font-bold leading-tight tracking-tight mb-4 sm:mb-5"
              style={{ fontFamily: '"Montserrat", "Arial", sans-serif', color: 'var(--text-primary)' }}
            >
              OUR LEADERSHIP
            </h1>
            <p 
              className="text-sm sm:text-base md:text-lg lg:text-2xl font-normal leading-relaxed lg:leading-[1.6] mb-6 sm:mb-8 md:mb-10 lg:mb-10 max-w-full w-full"
              style={{ fontFamily: '"Lato", "Arial", sans-serif', opacity: 0.9, color: 'var(--text-secondary)' }}
            >
              We are a team of over 48,000 people across the globe, working for a common purpose. We are led by one of India&apos;s most visionary chairmen, supported by a talented and experienced management team.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Leader Section – responsive height & card */}
      <div className="w-full px-3 sm:px-6 md:px-8 py-5 sm:py-8 md:py-10">
        <section 
          ref={featuredRef}
          className="relative mx-auto max-w-[1920px] flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[var(--card-border)] shadow-xl h-[75vh] min-h-[380px] sm:min-h-[420px] sm:h-[80vh] md:h-[85vh] md:min-h-[480px] lg:h-[88vh] lg:max-h-[690px]"
          style={{ backgroundColor: '#000000' }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 z-0" style={{
            backgroundImage: 'url(https://imgs.search.brave.com/1d2AY1Io4nnKg7hZFQfW5K_7eq1IaOaWZvwel_dQIlw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ2/MTU1NjM5Ny9waG90/by9jb2xvcmZ1bC1y/b2FkLWJ5LXRoZS1z/ZWEuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPXozaGJ1WDF1/anE2NGFxR3RLVTI4/Uk5EQjhVZGNVR3NP/d3lrWHJoUEdfNTg9)'
          }} />
          <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)' }} />
          <div className="relative z-[2] w-full max-w-[1400px] mx-auto flex justify-center lg:justify-end items-center box-border px-3 sm:px-4 md:px-6 lg:pl-12 py-4 sm:py-6">
            <div 
              className="w-full max-w-full min-w-0 sm:min-w-[300px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[540px] xl:max-w-[580px] text-center mx-auto lg:mx-0 lg:mr-0 rounded-xl sm:rounded-[18px] p-4 sm:p-5 md:p-6 lg:py-8 lg:px-10"
              style={{
                backgroundColor: 'rgba(20,20,25,0.45)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                backdropFilter: 'blur(9px) saturate(1.2)',
                WebkitBackdropFilter: 'blur(16px) saturate(1.2)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <div className="mb-3 sm:mb-3.5">
                <span className="inline-block bg-[#e63a27] text-white text-[10px] sm:text-xs md:text-sm font-semibold py-2 px-3 sm:py-2.5 sm:px-5 rounded-full uppercase tracking-wide leading-tight">
                  Managing Director
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] lg:text-[44px] font-bold text-white mb-2 sm:mb-3.5 leading-tight" style={{ fontFamily: '"Montserrat", "Arial", sans-serif' }}>
                Vipin Kumar
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#cccccc] mb-3 sm:mb-4 lg:mb-5 leading-snug font-medium">
                Managing Director, Shanky Group
              </p>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg text-[#cccccc] leading-relaxed mb-4 sm:mb-6 lg:mb-7 text-left space-y-2 sm:space-y-3">
                <p className="m-0">
                  To make B2B relationships simpler, smarter, and more successful. We started this because we believed businesses deserve partners who listen, deliver, and grow alongside them.
                </p>
                <p className="m-0">
                  At our core we value trust, transparency, and measurable impact. Every solution we design begins with your goals and ends with clear outcomes.
                </p>
              </div>
              <button 
                className="w-full sm:w-auto bg-[#e63a27] text-white text-xs sm:text-sm font-semibold py-2.5 px-5 sm:py-3 sm:px-8 rounded-full border-0 cursor-pointer transition-all duration-300 uppercase tracking-wide shadow-[0_4px_20px_rgba(230,58,39,0.3)] hover:opacity-95"
              >
                View Profile
              </button>
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
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-bold text-[var(--text-primary)] mb-4 sm:mb-6 leading-tight"
              style={{ fontFamily: '"Montserrat", "Arial", sans-serif' }}
            >
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

          {/* Filter Buttons - responsive */}
          <div 
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 md:mb-16 lg:mb-20"
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
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                    <h3 
                      className="text-base sm:text-lg md:text-xl font-bold text-[var(--text-primary)] m-0 leading-tight tracking-tight truncate min-w-0 flex-1"
                      style={{ fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif' }}
                    >
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
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <span className="text-[10px] sm:text-xs md:text-sm text-[var(--text-primary)] font-normal truncate" style={{ fontFamily: '"Inter", sans-serif' }}>{leader.experience}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        <span className="text-[10px] sm:text-xs md:text-sm text-[var(--text-primary)] font-normal truncate max-w-[80px] sm:max-w-[110px]" style={{ fontFamily: '"Inter", sans-serif' }}>{leader.education}</span>
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
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 md:p-6"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
        >
          <div 
            className="w-full max-w-[560px] max-h-[90vh] overflow-hidden relative rounded-xl sm:rounded-2xl md:rounded-[28px] border overflow-y-auto"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px var(--card-border)'
            }}
          >
            {/* Close Button - responsive */}
            <button
              onClick={() => setSelectedLeader(null)}
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
              <h2 
                className="text-xl sm:text-2xl md:text-[26px] font-bold text-[var(--text-primary)] mb-1.5 sm:mb-2"
                style={{ fontFamily: '"Montserrat", "Arial", sans-serif', letterSpacing: '-0.02em' }}
              >
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
              <h4 
                className="text-xs sm:text-sm font-bold text-[var(--text-primary)] mb-2 sm:mb-2.5"
                style={{ fontFamily: '"Montserrat", "Arial", sans-serif', letterSpacing: '0.02em' }}
              >
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
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl border"
                style={{ backgroundColor: 'var(--card-border)', borderColor: 'var(--card-border)' }}
              >
                <div>
                  <h4 
                    className="text-[9px] sm:text-[10px] font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
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
                  <h4 
                    className="text-[9px] sm:text-[10px] font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    Experience
                  </h4>
                  <p 
                    className="text-xs sm:text-sm text-[var(--text-primary)] m-0 leading-snug font-medium"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {selectedLeader.experience}
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
