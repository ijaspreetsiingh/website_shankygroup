import { useState, useEffect, useRef } from "react";
import WhoWeAreLayout from "./WhoWeAreLayout";
import companyLogo from '../new_logo_finalM.png';
import Constrction from '../contruction.png';

const MissionVision = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  // Styles object - Hero Section Styles from AboutUs
  const styles = {
    heroSection: {
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    heroBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${Constrction})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: 0
    },
    
    darkOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.4)',
      zIndex: 1
    },
    
    heroContent: {
      position: 'absolute',
      zIndex: 2,
      bottom: '60px',
      left: '40px',
      right: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      textAlign: 'left',
      color: '#ffffff'
    },
    
    mainHeading: {
      fontSize: 'clamp(40px, 4vw, 56px)',
      fontWeight: '700',
      lineHeight: '1.1',
      letterSpacing: '-1px',
      margin: '0 0 16px 0',
      textTransform: 'uppercase',
      fontFamily: '"Montserrat", "Arial", sans-serif',
      color: '#ffffff',
      opacity: 0.95
    },
    
    firstTagline: {
      fontSize: '20px',
      fontWeight: '400',
      lineHeight: '1.3',
      margin: '0 0 8px 0',
      fontFamily: '"Lato", "Arial", sans-serif',
      opacity: 0.9,
      letterSpacing: '0.3px'
    },
    
    secondTagline: {
      fontSize: '20px',
      fontWeight: '400',
      lineHeight: '1.4',
      margin: '0 0 32px 0',
      fontFamily: '"Lato", "Arial", sans-serif',
      opacity: 0.85,
      letterSpacing: '0.3px'
    },
    
    navContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginTop: '8px'
    },
    
    navDash: {
      width: '30px',
      height: '2px',
      backgroundColor: '#ffffff',
      opacity: 0.7
    },
    
    aboutUsText: {
      fontSize: 'clamp(16px, 1.6vw, 20px)',
      fontWeight: '400',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      fontFamily: '"Lato", "Arial", sans-serif',
      opacity: 0.9,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      padding: '5px 0'
    },
    
    mainSection: {
      padding: '90px 10px',
      backgroundColor: '#ffffff',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    },
    
    patternBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)',
      pointerEvents: 'none'
    },
    
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1
    }
  };

  return (
    <WhoWeAreLayout>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        {/* Background Image */}
        <div style={styles.heroBackground} />
        
        {/* Dark Overlay */}
        <div style={styles.darkOverlay} />

        {/* Main Hero Content */}
        <div style={styles.heroContent}>
          {/* Main Heading */}
          <h1 style={styles.mainHeading}>
            Shanky Group
          </h1>

          {/* First Tagline */}
          <h2 style={styles.firstTagline}>
            Mission & Vision.
          </h2>

          {/* Second Tagline */}
          <h3 style={styles.secondTagline}>
            Shaping tomorrow with purpose and values.
          </h3>

          {/* Navigation Line */}
          <div style={styles.navContainer}>
            {/* Home Icon */}
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{
                color: '#ffffff',
                flexShrink: 0,
                opacity: 0.9
              }}
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            
            {/* Dash */}
            <div style={styles.navDash} />
            
            {/* About Us Text */}
            <div style={styles.aboutUsText}>
              Mission & Vision
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={sectionRef}
        style={styles.mainSection}
      >
        {/* Background Pattern */}
        <div style={styles.patternBackground} />

        <div style={styles.container}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '700',
            color: '#1e293b',
            margin: '0 0 24px 0',
            letterSpacing: '-1px',
            lineHeight: '1.1'
          }}>
            Mission & Vision
          </h1>
          <div style={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6, #10b981)',
            margin: '0 auto 32px auto',
            borderRadius: '2px'
          }} />
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Our guiding principles that shape our decisions, actions, and aspirations for a better future
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          marginBottom: '80px'
        }}>
          {/* Mission Card */}
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              height: '100%'
            }}>
              {/* Mission Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#dbeafe',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>

              <h2 style={{
                fontSize: '36px',
                fontWeight: '700',
                color: '#1e293b',
                margin: '0 0 24px 0'
              }}>
                Our Mission
              </h2>
              
              <p style={{
                fontSize: '18px',
                color: '#475569',
                lineHeight: '1.7',
                margin: '0 0 32px 0'
              }}>
                To deliver exceptional value to our stakeholders through innovation, operational excellence, and sustainable practices while making a positive impact on society and the environment.
              </p>

              {/* Mission Pillars */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {[
                  'Innovation-driven solutions',
                  'Operational excellence',
                  'Stakeholder value creation',
                  'Environmental stewardship'
                ].map((pillar, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#3b82f6',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {index + 1}
                    </div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: '500',
                      color: '#1e293b'
                    }}>
                      {pillar}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s'
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              height: '100%'
            }}>
              {/* Vision Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#dcfce7',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>

              <h2 style={{
                fontSize: '36px',
                fontWeight: '700',
                color: '#1e293b',
                margin: '0 0 24px 0'
              }}>
                Our Vision
              </h2>
              
              <p style={{
                fontSize: '18px',
                color: '#475569',
                lineHeight: '1.7',
                margin: '0 0 32px 0'
              }}>
                To be a global leader recognized for innovation, sustainability, and excellence, creating lasting value for our stakeholders while contributing to a better world.
              </p>

              {/* Vision Goals */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {[
                  'Global market leadership',
                  'Sustainable business practices',
                  'Technological innovation',
                  'Social responsibility'
                ].map((goal, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#10b981',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {index + 1}
                    </div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: '500',
                      color: '#1e293b'
                    }}>
                      {goal}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s'
        }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '700',
            color: '#1e293b',
            margin: '0 0 48px 0',
            textAlign: 'center'
          }}>
            Our Core Values
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px'
          }}>
            {[
              {
                title: 'Integrity',
                description: 'Upholding ethical standards in all our actions',
                color: '#3b82f6',
                icon: '🛡️'
              },
              {
                title: 'Excellence',
                description: 'Striving for the highest quality in everything',
                color: '#10b981',
                icon: '⭐'
              },
              {
                title: 'Innovation',
                description: 'Embracing creativity and new ideas',
                color: '#f59e0b',
                icon: '💡'
              },
              {
                title: 'Sustainability',
                description: 'Building a better future for generations',
                color: '#ef4444',
                icon: '🌱'
              }
            ].map((value, index) => (
              <div key={index} style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '32px 24px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>
                  {value.icon}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: value.color,
                  margin: '0 0 12px 0'
                }}>
                  {value.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#64748b',
                  margin: '0',
                  lineHeight: '1.5'
                }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Priorities */}
        <div style={{
          marginTop: '80px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1s'
        }}>
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0 0 40px 0',
              textAlign: 'center'
            }}>
              Strategic Priorities
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px'
            }}>
              {[
                {
                  title: 'Digital Transformation',
                  description: 'Leveraging technology to drive efficiency and innovation across all business units.',
                  metrics: ['50% Digital Operations', 'AI Integration', 'Cloud First Strategy']
                },
                {
                  title: 'Sustainable Growth',
                  description: 'Balancing economic success with environmental and social responsibility.',
                  metrics: ['Carbon Neutral by 2030', '100% Renewable Energy', 'Zero Waste Operations']
                },
                {
                  title: 'Market Expansion',
                  description: 'Growing our global footprint while strengthening local market presence.',
                  metrics: ['15 New Markets', 'Strategic Partnerships', 'Local Leadership Development']
                }
              ].map((priority, index) => (
                <div key={index} style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                }}>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 16px 0'
                  }}>
                    {priority.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    margin: '0 0 24px 0'
                  }}>
                    {priority.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {priority.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#10b981',
                          borderRadius: '50%'
                        }} />
                        <div style={{
                          fontSize: '13px',
                          color: '#475569',
                          fontWeight: '500'
                        }}>
                          {metric}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          section > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          section > div > div:nth-child(3) > div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          section > div > div:last-child > div {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          section {
            padding: 60px 20px !important;
          }
          
          section > div > div:first-child h1 {
            font-size: 42px !important;
          }
          
          section > div > div:nth-child(2) > div {
            padding: 32px 24px !important;
          }
          
          section > div > div:nth-child(3) > div {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          
          section > div > div:nth-child(3) > div > div {
            padding: 24px 20px !important;
          }
          
          section > div > div:last-child {
            padding: 32px 24px !important;
          }
          
          section > div > div:last-child > div {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          
          section > div > div:last-child > div > div {
            padding: 24px 20px !important;
          }
        }
      `}</style>
      </section>
    </WhoWeAreLayout>
  );
};

export default MissionVision;
