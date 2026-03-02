"use client";
import React from "react";
import "swiper/css/bundle";
import Agro from "./agro.png";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import companyLogo from './new_logo_finalM.png';
import Traning from './traning.png';
import Finance from './traning1.png';
import Solar from './solar.png'
import Constrction from './contruction.png';
import Metal from './metal.png'

// CSS Animations
const slideAnimation = `
  @keyframes slideUp {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.3;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideOutRight {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  @keyframes slideInLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes lineGrowVertical {
    0% {
      height: 0;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      height: 38px;
      opacity: 1;
    }
  }

  @keyframes blink {
    0%, 50% {
      border-color: white;
    }
    51%, 100% {
      border-color: transparent;
    }
  }

  @keyframes smoothTypewriter {
    0% {
      width: 0;
      opacity: 0;
    }
    5% {
      opacity: 1;
    }
    95% {
      opacity: 1;
    }
    100% {
      width: 100%;
      opacity: 1;
    }
  }

  @keyframes hideCursor {
    0% {
      border-color: white;
    }
    100% {
      border-color: transparent;
    }
  }

  @keyframes logoPulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes fadeInFromBottom {
    0% {
      transform: translateY(50px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// CSS Styles
const styles = {
  // Loading Screen Styles
  loadingScreen: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#ffffff',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  
  loadingContainer: {
    textAlign: 'center',
    animation: 'fadeIn 1s ease-out'
  },
  
  logoContainer: {
    marginBottom: '30px',
    opacity: 0,
    animation: 'slideUp 1s ease-out 0.1s forwards, fadeIn 1s ease-out 0.1s forwards'
  },
  
  logoImage: {
    width: 'clamp(80px, 12vw, 160px)',
    height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))'
  },
  
  companyLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#666666',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    marginBottom: '15px',
    opacity: 0,
    animation: 'slideUp 1s ease-out 0.2s forwards, fadeIn 1s ease-out 0.2s forwards'
  },
  
  loadingTitle: {
    fontSize: 'clamp(48px, 6vw, 96px)',
    fontWeight: '200',
    color: '#1a1a1a',
    margin: '0 0 25px 0',
    letterSpacing: '12px',
    lineHeight: '1.1',
    textTransform: 'uppercase',
    fontFamily: '"Playfair Display", "Georgia", serif',
    opacity: 0,
    animation: 'slideUp 1.2s ease-out 0.4s forwards, fadeIn 1.2s ease-out 0.4s forwards'
  },
  
  loadingSubtitle: {
    fontWeight: '400',
    letterSpacing: '8px',
    marginLeft: '8px'
  },
  
  tagline: {
    fontSize: '16px',
    fontWeight: '300',
    color: '#666666',
    letterSpacing: '1px',
    fontStyle: 'italic',
    marginBottom: '40px',
    opacity: 0,
    animation: 'slideUp 1s ease-out 0.6s forwards, fadeIn 1s ease-out 0.6s forwards'
  },
  
  decorativeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    opacity: 0,
    animation: 'fadeIn 1s ease-out 0.8s forwards'
  },
  
  decorativeLine: {
    width: '60px',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #cccccc, transparent)'
  },
  
  diamond: {
    width: '8px',
    height: '8px',
    backgroundColor: '#1a1a1a',
    transform: 'rotate(45deg)',
    margin: '0 20px'
  },
  
  loadingIndicator: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    opacity: 0,
    animation: 'fadeIn 1s ease-out 1s forwards'
  },
  
  initializingText: {
    fontSize: '11px',
    fontWeight: '400',
    color: '#999999',
    letterSpacing: '2px',
    textTransform: 'uppercase'
  },
  
  dotsContainer: {
    display: 'flex',
    gap: '6px'
  },
  
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#1a1a1a',
    animation: 'pulse 1.8s ease-in-out infinite'
  },
  
  // Hero Section Styles
  heroSection: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center'
  },
  
  swiperContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0
  },
  
  slideBackground: {
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1
  },
  
  // Content Container at Bottom Center
  contentContainer: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    bottom: '80px',
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px'
  },
  
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
    flexWrap: 'nowrap',
    maxWidth: '1400px',
    zIndex: 10,
    justifyContent: 'center'
  },
  
  
  // Left Text Styles
  leftTextContainer: {
    color: '#ffffff',
    flexShrink: 0
  },
  
  leftText: {
    fontSize: 'clamp(27px, 2.2vw, 38px)',
    fontWeight: '800',
    lineHeight: '1',
    letterSpacing: '-0.5px',
    color: '#ffffff',
    fontFamily: '"SF Pro Display", "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    opacity: 0.95
  },
  
  // Divider Line
  dividerLine: {
    width: '5px',
    height: '38px',
    background: '#ffffff',
    flexShrink: 0
  },
  
  // Right Text Container - Single Line
  rightTextContainer: {
    position: 'relative',
    height: '38px',
    flexGrow: 1,
    maxWidth: '800px',
    minWidth: '300px',
    overflow: 'visible',
    display: 'flex',
    alignItems: 'center'
  },
  
  // Text Animation Containers
  textAnimationContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center'
  },
  
  // Text Styles - Single Line
  outgoingText: {
    fontSize: 'clamp(16px, 1.8vw, 32px)',
    fontWeight: '300',
    lineHeight: '1',
    letterSpacing: '0.5px',
    color: '#ffffff',
    fontFamily: '"SF Pro Display", "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    overflow: 'visible'
  },
  
  incomingText: {
    fontSize: 'clamp(16px, 1.8vw, 32px)',
    fontWeight: '300',
    lineHeight: '1',
    letterSpacing: '0.5px',
    color: '#ffffff',
    fontFamily: '"SF Pro Display", "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    overflow: 'visible'
  }
};

const HeroHomeFour = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showRightText, setShowRightText] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Inject CSS for slide animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = slideAnimation;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Show right text after Shanky Group typing completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRightText(true);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

  // Simulate loading and then show content
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const heroSlides = [
    {
      backgroundImage: Finance,
      sector: "SHANKY FINANCIAL SERVICES PVT LTD"
    },
    {
      backgroundImage: Agro,
      sector: "VMS HUB PVT LTD"
    },
    {
      backgroundImage: Solar,
      sector: "SHANKY SMART TECH PVT LTD"
    },
    {
      backgroundImage: Traning,
      sector: "SHANKY CORPORATE TRAINING PVT LTD"
    },
    {
      backgroundImage: Constrction,
      sector: "SHANKY BUILDTECH PVT LTD"
    },
    {
      backgroundImage: Metal,
      sector: "SHANKY METALS PVT LTD"
    }
  ];

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setPreviousIndex(activeIndex);
    setActiveIndex(swiper.realIndex);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <>
      {/* Full Screen White Loader */}
      {isLoading && (
        <div style={styles.loadingScreen}>
          {/* Logo/Brand Container */}
          <div style={styles.loadingContainer}>
            {/* Company Logo */}
            <div style={styles.logoContainer}>
              <img 
                src={companyLogo} 
                alt="Shanky Group Logo"
                style={styles.logoImage}
              />
            </div>
            
            {/* Company Label */}
            <div style={styles.companyLabel}>
              Since 2011
            </div>
            
            {/* Shanky Group Text */}
            <h1 style={styles.loadingTitle}>
              Shanky
              <span style={styles.loadingSubtitle}>Group</span>
            </h1>
            
            {/* Tagline */}
            <div style={styles.tagline}>
              Excellence in Every Sector
            </div>
            
            {/* Decorative Elements */}
            <div style={styles.decorativeContainer}>
              {/* Left Line */}
              <div style={styles.decorativeLine}></div>
              
              {/* Diamond */}
              <div style={styles.diamond}></div>
              
              {/* Right Line */}
              <div style={styles.decorativeLine}></div>
            </div>
            
            {/* Loading Indicator */}
            <div style={styles.loadingIndicator}>
              <div style={styles.initializingText}>
                Initializing
              </div>
              <div style={styles.dotsContainer}>
                <div style={{ ...styles.dot, animation: 'pulse 1.8s ease-in-out infinite' }}></div>
                <div style={{ ...styles.dot, animation: 'pulse 1.8s ease-in-out infinite 0.3s' }}></div>
                <div style={{ ...styles.dot, animation: 'pulse 1.8s ease-in-out infinite 0.6s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <section className="hero-section-ab" style={styles.heroSection}>
        {/* Background Image Slider */}
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1500}
          onSlideChange={handleSlideChange}
          style={styles.swiperContainer}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div style={{
                ...styles.slideBackground,
                backgroundImage: `url(${slide.backgroundImage})`
              }}></div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dark Overlay */}
        <div className="hero-overlay" style={styles.overlay}></div>

        {/* Content at Bottom Center */}
        <div style={styles.contentContainer}>
          <div style={styles.contentWrapper}>
            {/* Left Side - Fixed Text */}
            <div className="hero-left" style={styles.leftTextContainer}>
              <h1 style={styles.leftText}>
                Shanky Group
              </h1>
            </div>

            {/* Vertical Divider Line */}
            <div style={{
              ...styles.dividerLine,
              height: showRightText ? '38px' : '0',
              opacity: showRightText ? 1 : 0,
              animation: showRightText ? 'lineGrowVertical 0.5s ease-out forwards' : 'none',
              transition: 'opacity 0.3s ease-in'
            }}></div>

            {/* Right Side - Changing Text - ALWAYS VISIBLE NOW */}
            <div className="hero-right" style={{
              ...styles.rightTextContainer,
              opacity: showRightText ? 1 : 0,
              transition: 'opacity 0.5s ease-in'
            }}>
              {/* Old Text - Sliding Out */}
              {isTransitioning && (
                <div style={styles.textAnimationContainer}>
                  <h2 
                    style={{
                      ...styles.outgoingText,
                      animation: 'slideOutRight 0.8s ease-out forwards'
                    }}
                  >
                    {heroSlides[previousIndex].sector}
                  </h2>
                </div>
              )}
              
              {/* New Text - Sliding In */}
              <div style={styles.textAnimationContainer}>
                <h2 
                  style={{
                    ...styles.incomingText,
                    animation: isTransitioning ? 'slideInLeft 0.8s ease-out forwards' : 'none'
                  }}
                >
                  {heroSlides[activeIndex].sector}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroHomeFour;