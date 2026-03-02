import { useState, useEffect, useRef } from "react";
import WhoWeAreLayout from "./WhoWeAreLayout";
import companyLogo from '../new_logo_finalM.png';
import Solar from '../solar.png';

const Leadership = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  // Styles object
  const styles = {
    heroSection: {
      minHeight: '85vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000'
    },
    
    heroBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${Solar})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.6,
      zIndex: 0
    },
    
    darkOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
      zIndex: 1
    },
    
    heroContent: {
      position: 'relative',
      zIndex: 2,
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 40px',
      color: '#ffffff'
    },
    
    mainHeading: {
      fontSize: 'clamp(48px, 5vw, 72px)',
      fontWeight: '700',
      lineHeight: '1.1',
      letterSpacing: '-1.5px',
      margin: '0 0 20px 0',
      fontFamily: '"Montserrat", "Arial", sans-serif',
      color: '#ffffff'
    },
    
    heroTagline: {
      fontSize: 'clamp(20px, 2vw, 28px)',
      fontWeight: '400',
      lineHeight: '1.4',
      margin: '0 0 40px 0',
      fontFamily: '"Lato", "Arial", sans-serif',
      opacity: 0.9,
      maxWidth: '800px'
    },
    
    teamStats: {
      display: 'flex',
      gap: '40px',
      marginTop: '60px',
      flexWrap: 'wrap'
    },
    
    statItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    
    statNumber: {
      fontSize: 'clamp(36px, 3vw, 48px)',
      fontWeight: '700',
      color: '#ffffff',
      lineHeight: '1'
    },
    
    statLabel: {
      fontSize: '16px',
      color: 'rgba(255,255,255,0.8)',
      marginTop: '8px',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    
    mainSection: {
      padding: '120px 20px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%234a90e2" fill-opacity="0.02"%3E%3Ccircle cx="50" cy="50" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        pointerEvents: 'none'
      }
    },
    
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1
    },
    
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '80px'
    },
    
    sectionTitle: {
      fontSize: 'clamp(36px, 3vw, 48px)',
      fontWeight: '600',
      color: '#1a1a1a',
      margin: '0 0 16px 0',
      lineHeight: '1.2'
    },
    
    sectionSubtitle: {
      fontSize: 'clamp(18px, 1.5vw, 20px)',
      color: '#666666',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.6'
    },
    
    // Filters
    filterContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      marginBottom: '80px',
      flexWrap: 'wrap',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s'
    },
    
    filterButton: {
      padding: '14px 32px',
      backgroundColor: 'transparent',
      border: '2px solid #e9ecef',
      borderRadius: '35px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#6c757d',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      fontFamily: '"Inter", sans-serif',
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    
    filterButtonActive: {
      backgroundColor: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
      borderColor: '#4a90e2',
      color: '#ffffff',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(74, 144, 226, 0.3)'
    },
    
    // Leadership Grid
    leadershipGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
      gap: '50px',
      marginBottom: '100px',
      position: 'relative'
    },
    
    // Responsive Design
    '@media (max-width: 1200px)': {
      leadershipGrid: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '40px'
      }
    },
    
    '@media (max-width: 768px)': {
      leadershipGrid: {
        gridTemplateColumns: '1fr',
        gap: '30px'
      },
      
      leaderCard: {
        borderRadius: '16px'
      },
      
      leaderImageContainer: {
        height: '300px'
      },
      
      leaderInfo: {
        padding: '30px 24px'
      },
      
      leaderName: {
        fontSize: '24px'
      },
      
      leaderPosition: {
        fontSize: '16px'
      },
      
      filterContainer: {
        gap: '12px',
        marginBottom: '60px'
      },
      
      filterButton: {
        padding: '12px 24px',
        fontSize: '14px'
      }
    },
    
    '@media (max-width: 480px)': {
      mainSection: {
        padding: '80px 16px'
      },
      
      leadershipGrid: {
        gap: '24px'
      },
      
      leaderImageContainer: {
        height: '250px'
      },
      
      leaderInfo: {
        padding: '24px 20px'
      },
      
      leaderName: {
        fontSize: '22px'
      },
      
      leaderDescription: {
        fontSize: '15px'
      },
      
      filterButton: {
        padding: '10px 20px',
        fontSize: '13px'
      }
    },
    
    leaderCard: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: 'pointer',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      transform: 'translateY(0)',
      border: '1px solid rgba(0,0,0,0.05)'
    },
    
    leaderCardHover: {
      transform: 'translateY(-15px) scale(1.02)',
      boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
      border: '1px solid rgba(0,0,0,0.1)'
    },
    
    leaderImageContainer: {
      width: '100%',
      height: '420px',
      overflow: 'hidden',
      position: 'relative',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    },
    
    leaderImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      filter: 'grayscale(0)'
    },
    
    leaderImageHover: {
      transform: 'scale(1.1)',
      filter: 'grayscale(20%)'
    },
    
    leaderOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
      opacity: 0,
      transition: 'opacity 0.4s ease',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '30px'
    },
    
    leaderOverlayText: {
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.4s ease 0.1s'
    },
    
    leaderInfo: {
      padding: '40px',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
      position: 'relative'
    },
    
    leaderName: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1a1a1a',
      margin: '0 0 12px 0',
      lineHeight: '1.2',
      fontFamily: '"Montserrat", "Arial", sans-serif',
      transition: 'color 0.3s ease'
    },
    
    leaderPosition: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#4a90e2',
      margin: '0 0 20px 0',
      fontFamily: '"Inter", sans-serif',
      letterSpacing: '0.5px'
    },
    
    leaderDescription: {
      fontSize: '16px',
      color: '#6c757d',
      lineHeight: '1.7',
      margin: '0 0 30px 0',
      flexGrow: 1,
      fontFamily: '"Inter", sans-serif'
    },
    
    leaderDepartment: {
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
      color: '#ffffff',
      fontSize: '13px',
      fontWeight: '600',
      padding: '10px 20px',
      borderRadius: '25px',
      marginTop: 'auto',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      boxShadow: '0 4px 15px rgba(74, 144, 226, 0.3)',
      transition: 'all 0.3s ease'
    },
    
    leaderDepartmentHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(74, 144, 226, 0.4)'
    },
    
    // Board Section
    boardSection: {
      marginBottom: '100px'
    },
    
    boardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px'
    },
    
    boardCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '40px',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    },
    
    boardName: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1a1a1a',
      margin: '20px 0 8px 0'
    },
    
    boardPosition: {
      fontSize: '18px',
      color: '#666666',
      margin: '0 0 16px 0'
    },
    
    // Values Section
    valuesSection: {
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      padding: '120px 20px',
      marginTop: '100px',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%234a90e2" fill-opacity="0.03"%3E%3Crect x="20" y="20" width="40" height="40" rx="8"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        pointerEvents: 'none'
      }
    },
    
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    
    valueCard: {
      backgroundColor: '#ffffff',
      padding: '50px 40px',
      borderRadius: '20px',
      textAlign: 'center',
      boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      border: '1px solid rgba(0,0,0,0.05)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
        transform: 'translateX(-100%)',
        transition: 'transform 0.4s ease'
      },
      '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
        '&::before': {
          transform: 'translateX(0)'
        }
      }
    },
    
    valueIcon: {
      fontSize: '48px',
      marginBottom: '24px'
    },
    
    valueTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1a1a1a',
      margin: '0 0 16px 0'
    },
    
    valueDescription: {
      fontSize: '16px',
      color: '#666666',
      lineHeight: '1.6',
      margin: 0
    }
  };

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

  const handleLeaderClick = (leader) => {
    setSelectedLeader(leader);
  };

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  return (
    <WhoWeAreLayout>
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
          backgroundColor: '#ffffffff'
        }}>
        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1900px',
          padding: '0 40px',
          color: '#ffffff'
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
              <span style={{ color: '#0f0f0fff' }}>Leadership</span>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(48px, 5vw, 72px)',
              fontWeight: '700',
              lineHeight: '1.1',
              letterSpacing: '-1.5px',
              margin: '0 0 20px 0',
              fontFamily: '"Montserrat", "Arial", sans-serif',
              color: '#030303ff'
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
          backgroundColor: '#000000',
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
                backgroundColor: '#ffffff',
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
              color: '#ffffff',
              margin: '0 0 24px 0',
              lineHeight: '1.2',
              fontFamily: '"Montserrat", "Arial", sans-serif'
            }}>
              Vipin Kumar
            </h2>
            
            <p style={{
              fontSize: 'clamp(20px, 2vw, 24px)',
              color: '#cccccc',
              margin: '0 0 32px 0',
              lineHeight: '1.4',
              fontWeight: '500'
            }}>
              Managing Director, Shanky Group
            </p>
            
            <div style={{
              fontSize: '18px',
              color: '#cccccc',
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
              backgroundColor: '#ffffff',
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
          backgroundColor: '#ffffff',
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
              color: '#000000',
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
              color: '#000000',
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.7',
              fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
              fontWeight: '400'
            }}>
              The strength of Shanky Group lies in its accomplished leadership team, whose collective expertise and strategic foresight have been instrumental in shaping the Group's growth trajectory. Our leaders are committed to upholding core values, driving innovation, and ensuring robust governance across all business verticals.
            </p>
          </div>

          {/* Leadership Team Content */}
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto 60px auto',
            padding: '0 20px',
            textAlign: 'left'
          }}>
          </div>

          {/* Filter Buttons */}
          <div style={styles.filterContainer}>
            {filterOptions.map((filter, index) => (
              <button
                key={filter.id}
                style={{
                  ...styles.filterButton,
                  ...(activeFilter === filter.id ? styles.filterButtonActive : {}),
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                  transition: `all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.3 + index * 0.1}s`
                }}
                onClick={() => handleFilterClick(filter.id)}
                onMouseEnter={(e: any) => {
                  if (activeFilter !== filter.id) {
                    e.target.style.transform = 'translateY(-3px) scale(1.05)';
                    e.target.style.borderColor = '#4a90e2';
                    e.target.style.color = '#4a90e2';
                  }
                }}
                onMouseLeave={(e: any) => {
                  if (activeFilter !== filter.id) {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.color = '#6c757d';
                  }
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Leadership Grid */}
          <div style={styles.leadershipGrid}>
            {filteredLeaders.map((leader, index) => (
              <div 
                key={leader.id}
                style={{
                  ...styles.leaderCard,
                  ...(hoveredCard === leader.id ? styles.leaderCardHover : {}),
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`
                }}
                onClick={() => handleLeaderClick(leader)}
                onMouseEnter={() => setHoveredCard(leader.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.leaderImageContainer}>
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    style={{
                      ...styles.leaderImage,
                      ...(hoveredCard === leader.id ? styles.leaderImageHover : {})
                    }}
                  />
                  <div style={{
                    ...styles.leaderOverlay,
                    opacity: hoveredCard === leader.id ? 1 : 0
                  }}>
                    <div style={{
                      ...styles.leaderOverlayText,
                      opacity: hoveredCard === leader.id ? 1 : 0,
                      transform: hoveredCard === leader.id ? 'translateY(0)' : 'translateY(20px)'
                    }}>
                      View Profile
                    </div>
                  </div>
                </div>
                <div style={styles.leaderInfo}>
                  <h3 style={{
                    ...styles.leaderName,
                    color: hoveredCard === leader.id ? '#4a90e2' : '#1a1a1a'
                  }}>{leader.name}</h3>
                  <p style={styles.leaderPosition}>{leader.position}</p>
                  <p style={styles.leaderDescription}>{leader.description}</p>
                  <span style={{
                    ...styles.leaderDepartment,
                    ...(hoveredCard === leader.id ? styles.leaderDepartmentHover : {})
                  }}>{leader.department}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Board of Directors Section */}
          <div style={styles.boardSection}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Board of Directors</h2>
              <p style={styles.sectionSubtitle}>
                Providing strategic guidance and governance to ensure long-term sustainable growth.
              </p>
            </div>
            
            <div style={styles.boardGrid}>
              {leadershipData.boardOfDirectors.map((director) => (
                <div key={director.id} style={styles.boardCard}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 20px auto',
                    border: '4px solid #f0f0f0'
                  }}>
                    <img 
                      src={director.image} 
                      alt={director.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <h3 style={styles.boardName}>{director.name}</h3>
                  <p style={styles.boardPosition}>{director.position}</p>
                  <p style={{
                    fontSize: '16px',
                    color: '#cccccc',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {director.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={styles.valuesSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Our Leadership Values</h2>
            <p style={styles.sectionSubtitle}>
              The principles that guide our leaders in driving excellence and creating value.
            </p>
          </div>
          
          <div style={styles.valuesGrid}>
            {leadershipValues.map((value, index) => (
              <div key={index} style={styles.valueCard}>
                <div style={styles.valueIcon}>{value.icon}</div>
                <h3 style={styles.valueTitle}>{value.title}</h3>
                <p style={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section style={{
        padding: '100px 20px',
        backgroundColor: '#ffffff'
      }}>
        <div style={styles.container}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(32px, 3vw, 40px)',
                fontWeight: '600',
                color: '#1a1a1a',
                margin: '0 0 24px 0',
                lineHeight: '1.3'
              }}>
                Building Future-Ready Leadership
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#cccccc',
                lineHeight: '1.7',
                margin: '0 0 32px 0'
              }}>
                Our leadership development programs focus on nurturing talent, fostering innovation, 
                and building capabilities for the future. We invest in continuous learning and 
                development to ensure our leaders are equipped to navigate complex challenges.
              </p>
              <div style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '12px',
                  flex: '1',
                  minWidth: '200px'
                }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '8px'
                  }}>
                    100%
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#666666'
                  }}>
                    Leadership Development Programs
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '12px',
                  flex: '1',
                  minWidth: '200px'
                }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '8px'
                  }}>
                    30+
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#666666'
                  }}>
                    Nationalities Represented
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                height: '500px'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                  alt="Leadership Development"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Leader Details */}
      {selectedLeader && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
            animation: 'slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <button
              onClick={() => setSelectedLeader(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                border: 'none',
                fontSize: '20px',
                color: '#6c757d',
                cursor: 'pointer',
                zIndex: 1001,
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)';
                e.target.style.color = '#837f7fffff';
                e.target.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
                e.target.style.color = '#6c757d';
                e.target.style.transform = 'rotate(0deg)';
              }}
            >
              ✕
            </button>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth > 768 ? '350px 1fr' : '1fr',
              minHeight: window.innerWidth > 768 ? '600px' : 'auto',
              maxHeight: '90vh'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '50px 30px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  opacity: 0.3
                }} />
                <div style={{
                  width: '220px',
                  height: '220px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: '30px',
                  border: '6px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <img 
                    src={selectedLeader.image} 
                    alt={selectedLeader.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#ffffff',
                  margin: '0 0 12px 0',
                  textAlign: 'center',
                  fontFamily: '"Montserrat", "Arial", sans-serif',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {selectedLeader.name}
                </h3>
                <p style={{
                  fontSize: '18px',
                  color: 'rgba(255,255,255,0.9)',
                  margin: '0 0 20px 0',
                  textAlign: 'center',
                  fontWeight: '500',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {selectedLeader.position}
                </p>
                <span style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '600',
                  padding: '10px 24px',
                  borderRadius: '25px',
                  display: 'inline-block',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {selectedLeader.department}
                </span>
              </div>
              
              <div style={{
                padding: '50px',
                background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)'
              }}>
                <div style={{
                  marginBottom: '40px'
                }}>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    margin: '0 0 20px 0',
                    fontFamily: '"Montserrat", "Arial", sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{
                      width: '4px',
                      height: '24px',
                      background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
                      borderRadius: '2px'
                    }} />
                    Biography
                  </h4>
                  <p style={{
                    fontSize: '16px',
                    color: '#6c757d',
                    lineHeight: '1.8',
                    margin: 0,
                    fontFamily: '"Inter", sans-serif'
                  }}>
                    {selectedLeader.bio}
                  </p>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '30px',
                  marginBottom: '40px'
                }}>
                  <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '25px',
                    borderRadius: '16px',
                    border: '1px solid #e9ecef'
                  }}>
                    <h4 style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#6c757d',
                      margin: '0 0 12px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontFamily: '"Inter", sans-serif'
                    }}>
                      Education
                    </h4>
                    <p style={{
                      fontSize: '16px',
                      color: '#1a1a1a',
                      margin: 0,
                      fontWeight: '600',
                      fontFamily: '"Inter", sans-serif'
                    }}>
                      {selectedLeader.education}
                    </p>
                  </div>
                  <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '25px',
                    borderRadius: '16px',
                    border: '1px solid #e9ecef'
                  }}>
                    <h4 style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#6c757d',
                      margin: '0 0 12px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontFamily: '"Inter", sans-serif'
                    }}>
                      Experience
                    </h4>
                    <p style={{
                      fontSize: '16px',
                      color: '#1a1a1a',
                      margin: 0,
                      fontWeight: '600',
                      fontFamily: '"Inter", sans-serif'
                    }}>
                      {selectedLeader.experience}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    margin: '0 0 20px 0',
                    fontFamily: '"Montserrat", "Arial", sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{
                      width: '4px',
                      height: '24px',
                      background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
                      borderRadius: '2px'
                    }} />
                    Leadership Philosophy
                  </h4>
                  <p style={{
                    fontSize: '16px',
                    color: '#6c757d',
                    lineHeight: '1.8',
                    margin: 0,
                    fontFamily: '"Inter", sans-serif'
                  }}>
                    {selectedLeader.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </WhoWeAreLayout>
  );
};

export default Leadership;  