import React, { useState, useEffect, useRef } from "react";

const WhatWeDo = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

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
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      const sectionStart = sectionTop - windowHeight;
      const sectionEnd = sectionTop + sectionHeight;
      
      let progress = 0;
      if (scrollY >= sectionStart && scrollY <= sectionEnd) {
        progress = (scrollY - sectionStart) / (sectionEnd - sectionStart);
        progress = Math.max(0, Math.min(1, progress));
      } else if (scrollY > sectionEnd) {
        progress = 1;
      }
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderProgressiveBoldText = (text) => {
    const words = text.split(' ');
    const totalWords = words.length;
    
    return words.map((word, index) => {
      const wordProgress = Math.max(0, Math.min(1, (scrollProgress * totalWords - index) / 2));
      const fontWeight = 400 + (300 * wordProgress);
      const opacity = 0.7 + (0.3 * wordProgress);
      
      return (
        <span
          key={index}
          style={{
            fontWeight: fontWeight,
            opacity: opacity,
            transition: 'font-weight 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'inline-block',
            marginRight: '4px',
            color: `rgba(51, 51, 51, ${opacity})`
          }}
        >
          {word}
        </span>
      );
    });
  };

  const companies = [
    {
      id: 1,
      name: "SHANKY FINANCIAL SERVICES",
      shortName: "Financial Services through B2B",
      category: "SHANKY FINANCIAL SERVICES PVT LTD",
      categoryColor: "#6B9F3E",
      legalStructure: "Private Limited Company",
      keyPeople: "Properitor: Vipin Kumar",
      description: "Shanky Financial Services is the Group's flagship entity in the financial services sector. The company offers a comprehensive suite of financial intermediation services, including investment advisory, securities dealing, and fund distribution.",
      image: "https://happay.com/blog/wp-content/uploads/sites/12/2023/07/financial-assets-scaled.webp"
    },
    {
      id: 2,
      name: "SHANKY FINANCIAL SERVICES PVT LTD",
      shortName: "Financial Advisory",
      category: "SHANKY FINANCIAL SERVICES PVT LTD",
      categoryColor: "#6B9F3E",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "Operating alongside its namesake, Shanky Financial Services Pvt Ltd focuses on specialized financial intermediation activities, including investment in securities and proprietary trading.",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop"
    },
    {
      id: 3,
      name: "VMS HUB PVT LTD",
      shortName: "Food Distribution",
      category: "SHANKY FINANCIAL SERVICES PVT LTD",
      categoryColor: "#9B59B6",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "VMS Hub Pvt Ltd is the Group's newest venture, established to capitalize on the growing demand for food and agricultural products in India.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop"
    },
    {
      id: 4,
      name: "SHANKY SMART TECH PVT LTD",
      shortName: "Solar & Electronics",
      category: "SHANKY FINANCIAL SERVICES PVT LTD",
      categoryColor: "#9B59B6",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "Shanky Smart Tech Pvt Ltd operates at the intersection of renewable energy and electronics.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop"
    },
    {
      id: 5,
      name: "SHANKY ELECTRONICS HUB LLP",
      shortName: "Electronics Trading",
      category: "OTHER BUSINESSES",
      categoryColor: "#E67E22",
      legalStructure: "Limited Liability Partnership",
      keyPeople: "Designated Partners: Manoj Kumar Mishra, Vipin Kumar",
      description: "Shanky Electronics Hub LLP specializes in the trading and distribution of electronic products.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop"
    },
    {
      id: 6,
      name: "SHANKY CORPORATE TRAINING PVT LTD",
      shortName: "Corporate Training",
      category: "OTHER BUSINESSES",
      categoryColor: "#E67E22",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "Shanky Corporate Training Pvt Ltd is the Group's dedicated arm for educational services.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop"
    },
  ];

  const topRow = companies.slice(0, 3);
  const bottomRow = companies.slice(3, 6);

  const handleCardClick = (index: number) => {
    setSelectedCard(selectedCard === index ? null : index);
  };

  const renderCard = (company: any, index: number, rowStartIndex: number) => {
    const isExpanded = selectedCard === index;
    
    // Check if ANY card in THIS row is expanded
    const isTopRow = index < 3;
    const rowEndIndex = isTopRow ? 3 : 6;
    const isAnyCardInRowExpanded = selectedCard !== null && selectedCard >= rowStartIndex && selectedCard < rowEndIndex;
    
    // This specific card should hide if another card in the SAME row is expanded
    const shouldHide = isAnyCardInRowExpanded && !isExpanded;
    
    // Hide text on cards in the SAME ROW when any card in that row is hovered (except the hovered card itself)
    const hoveredCardIsTopRow = hoveredCard !== null && hoveredCard < 3;
    const shouldHideText = hoveredCard !== null && hoveredCard !== index && 
                          ((isTopRow && hoveredCardIsTopRow) || (!isTopRow && !hoveredCardIsTopRow));
    
    const cardDelay = (index % 3) * 0.1; // Reset delay for each row
    
    return (
      <div
        key={company.id}
        onMouseEnter={() => {
          setHoveredCard(index);
          setSelectedCard(index);
        }}
        onMouseLeave={() => {
          setHoveredCard(null);
          setSelectedCard(null);
        }}
        style={{
          position: 'relative',
          width: isExpanded ? '100%' : shouldHide ? '0' : '33.333%',
          height: isExpanded ? '550px' : '580px',
          flex: isExpanded ? '1 1 100%' : shouldHide ? '0 0 0' : '1 1 33.333%',
          cursor: 'pointer',
          transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          zIndex: isExpanded ? 100 : 10 - (index % 3),
          opacity: shouldHide ? 0 : isVisible ? 1 : 0,
          transform: isExpanded 
            ? 'scale(1.02)' 
            : shouldHide
              ? 'translateX(0) scale(0.8)'
              : isVisible 
                ? 'translateY(0) scale(1)' 
                : 'translateY(80px) scale(0.92)',
          overflow: 'hidden',
          pointerEvents: shouldHide ? 'none' : 'auto',
          animation: isVisible && !isExpanded ? `cardEntrance 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${cardDelay}s forwards` : 'none',
        }}
      >
        {/* Category Label */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          zIndex: 3,
          transform: isExpanded ? 'translateY(0)' : 'translateY(0)',
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${company.categoryColor} 0%, ${company.categoryColor}dd 100%)`,
            color: '#ffffff',
            padding: isExpanded ? '30px 32px' : '22px 28px',
            fontSize: isExpanded ? '18px' : '16px',
            fontWeight: '900',
            letterSpacing: '2.8px',
            textTransform: 'uppercase',
            textAlign: 'center',
            boxShadow: `0 6px 25px ${company.categoryColor}50`,
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}>
            {company.category}
          </div>
        </div>

        {/* Card Body */}
        <div style={{
          position: 'relative',
          height: '100%',
          background: '#ffffff',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: isExpanded 
            ? `0 50px 100px rgba(0,0,0,0.25), 0 0 0 2px ${company.categoryColor}30` 
            : '0 20px 60px rgba(0,0,0,0.12)',
          transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          border: isExpanded ? `2px solid ${company.categoryColor}40` : `1px solid ${company.categoryColor}20`,
        }}>
          {/* Default State - Image Background */}
          {!isExpanded && (
            <>
              <div style={{
                position: 'absolute',
                top: '44px',
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${company.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.85) blur(2px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${company.categoryColor}20 0%, transparent 50%)`,
                }} />
              </div>

              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '60%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)',
                zIndex: 1,
              }} />

              <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '20px',
                right: '20px',
                zIndex: 2,
                opacity: shouldHideText ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#ffffff',
                  margin: '0 0 15px 0',
                  lineHeight: '1.1',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  textShadow: '0 4px 20px rgba(0,0,0,0.7)',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word'
                }}>
                  {company.shortName}
                </h3>
                <div style={{
                  width: '70px',
                  height: '4px',
                  background: `linear-gradient(90deg, ${company.categoryColor} 0%, ${company.categoryColor}cc 100%)`,
                  borderRadius: '2px',
                  boxShadow: `0 0 20px ${company.categoryColor}60`,
                }} />
                <div style={{
                  marginTop: '12px',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word'
                }}>
                  {company.legalStructure}
                </div>
              </div>
            </>
          )}

          {/* Expanded State - Professional Layout */}
          {isExpanded && (
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              height: '100%',
              animation: 'expandContent 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
            }}>
              {/* Left Side - Image (45%) */}
              <div style={{
                flex: '0 0 45%',
                position: 'relative',
                overflow: 'hidden',
                animation: 'slideInFromLeft 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards',
                opacity: 0
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${company.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: 'scale(1.1)',
                  animation: 'imageZoom 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(to right, transparent 0%, ${company.categoryColor}15 100%)`,
                  }} />
                </div>
              </div>

              {/* Right Side - Content (55%) */}
              <div style={{
                flex: '0 0 55%',
                padding: '60px 50px',
                overflowY: 'auto',
                animation: 'slideInFromRight 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards',
                opacity: 0,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }}>
                {/* Company Name */}
                <h3 style={{
                  fontSize: '36px',
                  fontWeight: '900',
                  color: '#2c3e50',
                  margin: '40px 0 25px 0',
                  lineHeight: '1.2',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  animation: 'fadeInUp 0.6s ease-out 0.5s forwards',
                  opacity: 0
                }}>
                  {company.name}
                </h3>

                {/* Accent Line */}
                <div style={{
                  width: '100px',
                  height: '5px',
                  background: `linear-gradient(90deg, ${company.categoryColor} 0%, ${company.categoryColor}60 100%)`,
                  borderRadius: '3px',
                  marginBottom: '35px',
                  animation: 'expandLine 0.8s ease-out 0.6s forwards',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left'
                }} />

                {/* Info Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '30px'
                }}>
                  <div style={{
                    background: `linear-gradient(135deg, ${company.categoryColor}08 0%, ${company.categoryColor}03 100%)`,
                    padding: '20px',
                    borderRadius: '16px',
                    border: `1px solid ${company.categoryColor}15`,
                    borderLeft: `4px solid ${company.categoryColor}`,
                    animation: 'fadeInUp 0.6s ease-out 0.7s forwards',
                    opacity: 0,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{
                      fontSize: '11px',
                      color: company.categoryColor,
                      fontWeight: '700',
                      marginBottom: '8px',
                      letterSpacing: '1.8px',
                      textTransform: 'uppercase',
                      opacity: 0.8
                    }}>
                      Legal Structure
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#1a202c',
                      fontWeight: '600',
                      lineHeight: '1.4'
                    }}>
                      {company.legalStructure}
                    </div>
                  </div>

                  <div style={{
                    background: `linear-gradient(135deg, ${company.categoryColor}08 0%, ${company.categoryColor}03 100%)`,
                    padding: '20px',
                    borderRadius: '16px',
                    border: `1px solid ${company.categoryColor}15`,
                    borderLeft: `4px solid ${company.categoryColor}`,
                    animation: 'fadeInUp 0.6s ease-out 0.8s forwards',
                    opacity: 0,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{
                      fontSize: '11px',
                      color: company.categoryColor,
                      fontWeight: '700',
                      marginBottom: '8px',
                      letterSpacing: '1.8px',
                      textTransform: 'uppercase',
                      opacity: 0.8
                    }}>
                      {company.keyPeople.split(':')[0]}
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#1a202c',
                      fontWeight: '600',
                      lineHeight: '1.4'
                    }}>
                      {company.keyPeople.split(':')[1]}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)`,
                  padding: '25px',
                  borderRadius: '16px',
                  border: `1px solid ${company.categoryColor}10`,
                  marginBottom: '35px',
                  animation: 'fadeInUp 0.6s ease-out 0.9s forwards',
                  opacity: 0,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{
                    fontSize: '11px',
                    color: company.categoryColor,
                    fontWeight: '700',
                    marginBottom: '12px',
                    letterSpacing: '1.8px',
                    textTransform: 'uppercase',
                    opacity: 0.8
                  }}>
                    Company Overview
                  </div>
                  <p style={{
                    fontSize: '16px',
                    color: '#2d3748',
                    lineHeight: '1.7',
                    margin: '0',
                    fontWeight: '400',
                    letterSpacing: '0.2px',
                    textAlign: 'justify'
                  }}>
                    {company.description}
                  </p>
                </div>

                </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      style={{
        padding: '0',
        backgroundColor: '#f5f7fa',
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        margin: '0',
        overflow: 'visible'
      }}>
      {/* Header Section */}
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '80px 60px 60px 60px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '400',
            color: '#000000',
            margin: '0 0 20px 0',
            letterSpacing: '8px',
            lineHeight: '1.2',
            textTransform: 'uppercase'
          }}>
            Group of Companies
          </h2>
          <p style={{
            fontSize: '26px',
            lineHeight: '1.6',
            color: '#333333',
            maxWidth: '1500px',
            margin: '0 auto 30px',
            fontWeight: '400',
            letterSpacing: '0.2px'
          }}>
           {renderProgressiveBoldText("Shanky Group is a fast-growing, diversified business conglomerate headquartered in Delhi, India. With operations spanning financial services, food & agribusiness, solar EPC & electronics, education & corporate training, infrastructure & construction, and metals trading, the Group brings together seven core companies under one unified vision.")}
          </p>
          
          <div style={{
            textAlign: 'center',
            marginTop: '40px'
          }}>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#ffffff',
                backgroundColor: '#1a1a1a',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                e.currentTarget.style.backgroundColor = '#333333';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                e.currentTarget.style.backgroundColor = '#1a1a1a';
              }}
            >
              Learn More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div style={{
        maxWidth: '1800px',
        margin: '0 auto',
        padding: '0 60px 100px 60px'
      }}>
        {/* Top Row */}
        <div style={{
          display: 'flex',
          gap: '0',
          marginBottom: '0',
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          flexWrap: 'nowrap',
          justifyContent: 'flex-start'
        }}>
          {topRow.map((company, index) => renderCard(company, index, 0))}
        </div>

        {/* Bottom Row */}
        <div style={{
          display: 'flex',
          gap: '0',
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          flexWrap: 'nowrap',
          justifyContent: 'flex-start'
        }}>
          {bottomRow.map((company, index) => renderCard(company, index + 3, 3))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes expandContent {
          from {
            opacity: 0.8;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes imageZoom {
          from {
            transform: scale(1.1);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes expandLine {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes cardEntrance {
          0% {
            opacity: 0;
            transform: translateY(80px) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 1400px) {
          section > div:first-child {
            padding: 60px 40px 40px 40px !important;
          }
          section > div:last-child {
            padding: 0 40px 80px 40px !important;
          }
        }

        @media (max-width: 1024px) {
          section > div:last-child > div {
            flex-direction: column !important;
            max-width: 100% !important;
            flex-wrap: wrap !important;
          }
          section > div:last-child > div > div {
            margin-left: 0 !important;
            width: 100% !important;
            flex: 1 1 100% !important;
          }
        }

        @media (max-width: 768px) {
          section > div:first-child {
            padding: 40px 24px 30px 24px !important;
          }
          section > div:first-child > div h2 {
            font-size: 32px !important;
            letter-spacing: 4px !important;
          }
          section > div:first-child > div p {
            font-size: 16px !important;
          }
          section > div:last-child {
            padding: 0 20px 60px 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhatWeDo;
