import React, { useState, useEffect, useRef } from "react";

const WhatWeDo = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
      
      // Calculate progress only when scrolling through this section
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

  const services = [
    { 
      title: "SHANKY FINANCIAL SERVICES", 
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
      bgColor: "linear-gradient(135deg, rgba(20,20,20,0.7) 0%, rgba(0,0,0,0.6) 100%)"
    },
    { 
      title: "SHANKY FINANCIAL SERVICES PVT LTD", 
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop",
      bgColor: "linear-gradient(135deg, rgba(139,69,19,0.4) 0%, rgba(101,67,33,0.6) 100%)"
    },
    { 
      title: "VMS HUB PVT LTD", 
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      bgColor: "linear-gradient(135deg, rgba(25,25,112,0.4) 0%, rgba(0,0,139,0.6) 100%)"
    },
    { 
      title: "SHANKY SMART TECH PVT LTD", 
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
      bgColor: "linear-gradient(135deg, rgba(0,51,102,0.5) 0%, rgba(0,0,0,0.7) 100%)"
    },
    { 
      title: "SHANKY ELECTRONICS HUB LLP", 
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
      bgColor: "linear-gradient(135deg, rgba(101,67,33,0.3) 0%, rgba(139,69,19,0.5) 100%)"
    },
    { 
      title: "SHANKY CORPORATE TRAINING PVT LTD", 
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
      bgColor: "linear-gradient(135deg, rgba(0,82,204,0.4) 0%, rgba(0,51,102,0.6) 100%)"
    },
    { 
      title: "SHANKY BUILDTECH PVT LTD", 
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      bgColor: "linear-gradient(135deg, rgba(105,105,105,0.4) 0%, rgba(47,79,79,0.6) 100%)"
    },
    { 
      title: "SHANKY METALS PVT LTD", 
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&h=400&fit=crop",
      bgColor: "linear-gradient(135deg, rgba(70,130,180,0.3) 0%, rgba(100,149,237,0.5) 100%)"
    }
  ];

  const renderProgressiveBoldText = (text) => {
    const words = text.split(' ');
    const totalWords = words.length;
    
    return words.map((word, index) => {
      const wordProgress = Math.max(0, Math.min(1, (scrollProgress * totalWords - index) / 2));
      const fontWeight = 400 + (300 * wordProgress); // Smooth transition from 400 to 700
      const opacity = 0.7 + (0.3 * wordProgress); // Slight opacity change
      
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

  return (
    <section 
      ref={sectionRef}
      style={{
        padding: '80px 0',
        backgroundColor: '#ffffff',
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif'
      }}
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 60px'
      }}>
        {/* Header Section with Animation */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
        }}>
          {/* Section Label */}
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: '30px',
            marginBottom: '30px',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#666'
          }}>
            Our Story
          </div>
          
          <h2 style={{
            fontSize: '48px',
            fontWeight: '400',
            color: '#000000',
            margin: '0 0 20px 0',
            letterSpacing: '8px',
            lineHeight: '1.2',
            textTransform: 'uppercase',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>
            GROUP COMPANIES
          </h2>
          <p style={{
            fontSize: '26px',
            lineHeight: '1.6',
            color: '#333333',
            maxWidth: '2000px',
            margin: '0 auto',
            fontWeight: '400',
            letterSpacing: '0.2px'
          }}>
           {renderProgressiveBoldText("Shanky Group’s diversified portfolio comprises seven core companies, each operating as a distinct legal entity with specialized expertise and market presence. The Group’s structure enables operational autonomy while fostering intercompany synergies and resource optimization.")}
          </p>
        </div>

        {/* Services Grid with Staggered Animation */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '22px',
          marginTop: '10px'
        }}>
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                borderRadius: '6px',
                overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                height: '150px',
                position: 'relative',
                boxShadow: hoveredIndex === index 
                  ? '0 16px 40px rgba(0,0,0,0.18)' 
                  : '0 4px 12px rgba(0,0,0,0.08)',
                transform: hoveredIndex === index 
                  ? 'translateY(-8px)' 
                  : isVisible 
                    ? 'translateY(0)' 
                    : 'translateY(20px)',
                opacity: isVisible ? 1 : 0,
                backgroundColor: '#f5f5f5',
                transitionDelay: isVisible ? `${0.4 + index * 0.1}s` : '0s'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image with Zoom Effect */}
              <div style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img 
                  src={service.image} 
                  alt={service.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoveredIndex === index ? 'scale(1.08)' : 'scale(1)'
                  }}
                />
                
                {/* Gradient Overlay - Darker at bottom for text readability */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: service.bgColor,
                  pointerEvents: 'none'
                }} />
                
                {/* Additional dark overlay for text area */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '45%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)',
                  pointerEvents: 'none'
                }} />
              </div>
              
              {/* Service Title - Bottom Left */}
              <div style={{
                position: 'absolute',
                bottom: '22px',
                left: '24px',
                right: '24px',
                zIndex: 2
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#ffffff',
                  margin: 0,
                  letterSpacing: '0.8px',
                  lineHeight: '1.4',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                }}>
                  <span style={{
                    textDecoration: 'underline',
                    textDecorationThickness: '1px',
                    textUnderlineOffset: '2px'
                  }}>{service.title}</span>
                  <span style={{
                    fontSize: '14px',
                    opacity: 0.9,
                    transition: 'transform 0.3s ease',
                    display: 'inline-block',
                    transform: hoveredIndex === index ? 'translate(3px, -3px)' : 'translate(0, 0)'
                  }}>
                    ↗
                  </span>
                </h3>
              </div>
              
              {/* Hover Arrow Icon - Top Right Corner */}
              <div 
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: hoveredIndex === index ? 'scale(1) rotate(0deg)' : 'scale(0.7) rotate(-45deg)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  zIndex: 3
                }}
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#000000" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline Styles for Responsive Design */}
      <style jsx>{`
        @media (max-width: 1024px) {
          section > div {
            padding: 0 40px !important;
          }
          section > div > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 18px !important;
          }
        }
        
        @media (max-width: 768px) {
          section {
            padding: 60px 0 !important;
          }
          section > div {
            padding: 0 24px !important;
          }
          section > div > div:first-child h2 {
            font-size: 32px !important;
            letter-spacing: 4px !important;
          }
          section > div > div:first-child p {
            font-size: 14px !important;
          }
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhatWeDo;