'use client';

import { useState, useEffect, useRef } from "react";
import WhoWeAreNav from '../WhoWeAreNav';

type Leader = {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string;
  department: string;
  category: string;
  education: string;
  experience: string;
  bio: string;
};

const LeadershipPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
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
        position: "Director",
        description: "Seasoned entrepreneur and business leader with over a decade of experience in managing diversified businesses.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
        department: "Board",
        category: "board",
        education: "CA, MBA Finance",
        experience: "10+ years",
        bio: "Strategic vision, operational acumen, and commitment to ethical business practices have earned him recognition as a trusted leader in the industry."
      },
      {
        id: 2,
        name: "Manoj Kumar Mishra",
        position: "Director",
        description: "Financial expert with 22 years of experience in finance, accounts, and commercial operations across manufacturing and retail sectors.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face",
        department: "Finance",
        category: "board",
        education: "CA, Cost Accountant, CPA, MBA, M.Mom, LLB",
        experience: "22+ years",
        bio: "Proven track record in financial management, statutory compliance, and strategic planning ensuring robust financial governance."
      }
    ],
    seniorManagement: [
      {
        id: 3,
        name: "Poonam Shah",
        position: "Vice President, Admin",
        description: "Accomplished administrative leader optimizing organizational administrative backbone for reliable and compliant operations.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face",
        department: "Administration",
        category: "senior",
        education: "MBA",
        experience: "15+ years",
        bio: "Expertise in strategic planning, policy and budget ownership, facilities and vendor management."
      },
      {
        id: 4,
        name: "Priyanka Girdhar",
        position: "Vice President, Operations",
        description: "Operational excellence leader overseeing process optimization across the Group's diverse businesses.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
        department: "Operations",
        category: "senior",
        education: "MBA Operations",
        experience: "12+ years",
        bio: "Expertise in supply chain management, quality assurance, and project execution contributing to reliability and efficiency."
      },
      {
        id: 5,
        name: "Rajeev Ranjan Jha",
        position: "Finance Head",
        description: "Financial operations leader responsible for accounting, financial reporting, and compliance functions.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
        department: "Finance",
        category: "senior",
        education: "CA, MBA Finance",
        experience: "18+ years",
        bio: "Extensive experience in corporate finance, audit, and regulatory compliance ensuring transparency and integrity."
      }
    ],
  };

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

  const handleLeaderClick = (leader: Leader) => {
    setSelectedLeader(leader);
  };

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
  };

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'var(--background)'
        }}>
        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1900px',
          padding: '0 40px',
          color: 'var(--text-primary)'
        }}>
          <div style={{
            maxWidth: '800px'
          }}>
            {/* Breadcrumb Navigation */}
            <div style={{
              marginBottom: '40px',
              fontSize: '16px',
              color: 'rgba(0, 0, 0, 0.7)',
              fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif'
            }}>
              <span style={{ cursor: 'pointer' }}>About Us</span>
              <span style={{ margin: '0 8px' }}>/</span>
              <span style={{ color: 'var(--accent)' }}>Leadership</span>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(48px, 5vw, 72px)',
              fontWeight: '700',
              lineHeight: '1.1',
              letterSpacing: '-1.5px',
              margin: '0 0 20px 0',
              fontFamily: '"Montserrat", "Arial", sans-serif',
              color: 'var(--text-primary)'
            }}>
              OUR LEADERSHIP
            </h1>
            
            <p style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontWeight: '400',
              width:'200%',
              lineHeight: '1.6',
              margin: '0 0 40px 0',
              fontFamily: '"Lato", "Arial", sans-serif',
              opacity: 0.9,
              color:'gray'
            
            }}>
              We are a team of over 48,000 people across the globe, working for a common purpose. We are led by one of India's most visionary chairmen, supported by a talented and experienced management team.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Leader Section */}
      <section 
        ref={featuredRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          backgroundColor: 'var(--card-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          filter: 'blur(8px)',
          zIndex: 0
        }} />
        
        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
          zIndex: 1
        }} />
        
        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          {/* Text Content - Right Aligned */}
          <div style={{
            backgroundColor: 'rgba(30,30,30,0.85)',
            borderRadius: '20px',
            padding: '60px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center',
            maxWidth: '600px',
            marginRight: '-20px'
          }}>
            <div style={{
              marginBottom: '20px'
            }}>
              <span style={{
                backgroundColor: 'var(--card-bg)',
                color: '#1a1a1a',
                fontSize: '14px',
                fontWeight: '600',
                padding: '8px 20px',
                borderRadius: '25px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Managing Director
              </span>
            </div>
            
            <h2 style={{
              fontSize: 'clamp(42px, 4vw, 56px)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              margin: '0 0 24px 0',
              lineHeight: '1.2',
              fontFamily: '"Montserrat", "Arial", sans-serif'
            }}>
              Vipin Kumar
            </h2>
            
            <p style={{
              fontSize: 'clamp(20px, 2vw, 24px)',
              color: 'var(--text-secondary)',
              margin: '0 0 32px 0',
              lineHeight: '1.4',
              fontWeight: '500'
            }}>
              Managing Director, Shanky Group
            </p>
            
            <div style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              margin: '0 0 40px 0',
              textAlign: 'left'
            }}>
              <p style={{
                margin: '0 0 20px 0'
              }}>
                To make B2B relationships simpler, smarter, and more successful. We started this because we believed businesses deserve partners who listen, deliver, and grow alongside them.
              </p>
              <p style={{
                margin: '0 0 20px 0'
              }}>
                At our core we value trust, transparency, and measurable impact. Every solution we design begins with your goals and ends with clear outcomes.
              </p>
            </div>
            
            <button style={{
              backgroundColor: 'var(--card-bg)',
              color: '#1a1a1a',
              fontSize: '16px',
              fontWeight: '600',
              padding: '16px 40px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
              View Profile
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section 
        ref={sectionRef}
        style={{
          padding: '80px 20px',
          backgroundColor: 'var(--card-bg)',
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '80px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <div style={{
              display: 'inline-block',
              marginBottom: '20px'
            }}>
              <span style={{
                backgroundColor: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
                color: '#5f5353ff',
                fontSize: '14px',
                fontWeight: '600',
                padding: '10px 25px',
                borderRadius: '30px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                boxShadow: '0 4px 15px rgba(74, 144, 226, 0.3)'
              }}>
                Leadership Excellence
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(42px, 4vw, 56px)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              margin: '0 0 24px 0',
              lineHeight: '1.2',
              fontFamily: '"Montserrat", "Arial", sans-serif'
            }}>
              Meet Our Leadership Team
            </h2>
            <div style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
              margin: '0 auto 32px auto',
              borderRadius: '2px'
            }} />
            <p style={{
              fontSize: 'clamp(18px, 1.8vw, 22px)',
              color: 'var(--text-primary)',
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.7',
              fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
              fontWeight: '400'
            }}>
              The strength of Shanky Group lies in its accomplished leadership team, whose collective expertise and strategic foresight have been instrumental in shaping the Group's growth trajectory. Our leaders are committed to upholding core values, driving innovation, and ensuring robust governance across all business verticals.
            </p>
          </div>

          {/* Filter Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '80px',
            flexWrap: 'wrap',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s'
          }}>
            {filterOptions.map((filter, index) => (
              <button
                key={filter.id}
                style={{
                  padding: '14px 32px',
                  backgroundColor: 'transparent',
                  border: '2px solid #e9ecef',
                  borderRadius: '35px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: activeFilter === filter.id ? '#ffffff' : '#6c757d',
                  cursor: 'pointer',
                  fontFamily: '"Inter", sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  position: 'relative',
                  overflow: 'hidden',
                  ...(activeFilter === filter.id && {
                    backgroundColor: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
                    borderColor: '#4a90e2',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(74, 144, 226, 0.3)'
                  }),
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                  transition: `all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.3 + index * 0.1}s`
                }}
                onClick={() => handleFilterClick(filter.id)}
                onMouseEnter={(e) => {
                  if (activeFilter !== filter.id) {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-3px) scale(1.05)';
                    el.style.borderColor = '#4a90e2';
                    el.style.color = '#4a90e2';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== filter.id) {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(0) scale(1)';
                    el.style.borderColor = '#e9ecef';
                    el.style.color = '#6c757d';
                  }
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Leadership Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '50px',
            marginBottom: '100px',
            position: 'relative'
          }}>
            {filteredLeaders.map((leader, index) => (
              <div 
                key={leader.id}
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: hoveredCard === leader.id ? '0 25px 60px rgba(0,0,0,0.15)' : '0 10px 40px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: '1px solid rgba(0,0,0,0.05)',
                  opacity: isLoaded ? 1 : 0,
                  transform: !isLoaded ? 'translateY(30px)' : (hoveredCard === leader.id ? 'translateY(-15px) scale(1.02)' : 'translateY(0)'),
                  transition: `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`
                }}
                onClick={() => handleLeaderClick(leader)}
                onMouseEnter={() => setHoveredCard(leader.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{
                  width: '100%',
                  height: '420px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                }}>
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      filter: hoveredCard === leader.id ? 'grayscale(20%)' : 'grayscale(0)',
                      transform: hoveredCard === leader.id ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
                    opacity: hoveredCard === leader.id ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '30px'
                  }}>
                    <div style={{
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      opacity: hoveredCard === leader.id ? 1 : 0,
                      transform: hoveredCard === leader.id ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 0.4s ease 0.1s'
                    }}>
                      View Profile
                    </div>
                  </div>
                </div>
                <div style={{
                  padding: '40px',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
                  position: 'relative'
                }}>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: hoveredCard === leader.id ? '#4a90e2' : '#1a1a1a',
                    margin: '0 0 12px 0',
                    lineHeight: '1.2',
                    fontFamily: '"Montserrat", "Arial", sans-serif',
                    transition: 'color 0.3s ease'
                  }}>
                    {leader.name}
                  </h3>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#4a90e2',
                    margin: '0 0 20px 0',
                    fontFamily: '"Inter", sans-serif',
                    letterSpacing: '0.5px'
                  }}>
                    {leader.position}
                  </h4>
                  <p style={{
                    fontSize: '16px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.7',
                    margin: '0 0 30px 0',
                    flexGrow: 1,
                    fontFamily: '"Inter", sans-serif'
                  }}>
                    {leader.description}
                  </p>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    fontWeight: '600',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    marginTop: 'auto',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 4px 15px rgba(74, 144, 226, 0.3)',
                    transition: 'all 0.3s ease'
                  }}>
                    {leader.department}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LeadershipPage;
