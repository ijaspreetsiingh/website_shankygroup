import { useState, useEffect, useRef } from "react";
import WhoWeAreLayout from "./WhoWeAreLayout";
import "swiper/css/bundle";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import companyLogo from '../new_logo_finalM.png';
import Finance from '../traning1.png';
import valueImage1 from '/assets/images/jass-logo.png';
import valueImage2 from '/assets/images/logo.png';
import valueImage3 from '/assets/images/logo-2.png';
import MediaSection from "../aboutus";
const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [secondImageIndex, setSecondImageIndex] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [sectorsCount, setSectorsCount] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [countingStarted, setCountingStarted] = useState(false);

  const images = [
    { 
      src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
      number: "01 / 03",
      title: "Innovation & Excellence",
      description: "Driving sustainable growth through innovative solutions and exceptional quality across all our business sectors."
    },
    { 
      src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
      number: "02 / 03",
      title: "Quality & Precision",
      description: "Maintaining the highest standards of quality and precision in all our operations and deliverables."
    },
    { 
      src: 'https://images.unsplash.com/photo-1497366216546-3c92952c6769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
      number: "03 / 03",
      title: "Leadership & Vision",
      description: "Leading with vision and commitment to create lasting impact across industries."
    }
  ];

  const secondImages = [
    { 
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
      number: "01 / 03",
      title: "Global Impact",
      description: "Creating sustainable value and driving positive change across communities worldwide through our diverse business portfolio."
    },
    { 
      src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
      number: "02 / 03",
      title: "Sustainable Future",
      description: "Building a sustainable future through renewable energy and environmentally responsible practices across all sectors."
    },
    { 
      src: 'https://images.unsplash.com/photo-1466692476868-a93f867cb794?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
      number: "03 / 03",
      title: "Community Growth",
      description: "Empowering communities and fostering growth through education, employment, and sustainable development initiatives."
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSecondImage = () => {
    setSecondImageIndex((prev) => (prev + 1) % secondImages.length);
  };

  const prevSecondImage = () => {
    setSecondImageIndex((prev) => (prev - 1 + secondImages.length) % secondImages.length);
  };
  useEffect(() => {
    if (countingStarted && isVisible) {
      const duration = 2000;
      const steps = 60; 
      const interval = duration / steps;

      const counters = [
        { target: 13, setter: setYearsCount, current: 0 },
        { target: 6, setter: setSectorsCount, current: 0 },
        { target: 500, setter: setEmployeesCount, current: 0 },
        { target: 50, setter: setProjectsCount, current: 0 }
      ];

      counters.forEach(counter => {
        let current = 0;
        const increment = counter.target / steps;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= counter.target) {
            counter.setter(counter.target);
            clearInterval(timer);
          } else {
            counter.setter(Math.floor(current));
          }
        }, interval);
      });

      setCountingStarted(false);
    }
  }, [countingStarted, isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countingStarted) {
          setIsVisible(true);
          setCountingStarted(true);
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
  }, [countingStarted]);

  // Business sectors data
  const businessSectors = [
    {
      title: 'Shanky Financial Services',
      description: 'Comprehensive financial solutions and investment services',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'VMS HUB',
      description: 'Agricultural innovation and supply chain management',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Shanky Smart Tech',
      description: 'Renewable energy and sustainable technology solutions',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Shanky Corporate Training',
      description: 'Professional development and skill enhancement programs',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Shanky Buildtech',
      description: 'Construction and infrastructure development services',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb92c3d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Shanky Metals',
      description: 'Metal trading and manufacturing solutions',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Styles object - सभी CSS यहाँ एक साथ
  const styles = {
    // Hero Section Styles
    heroSection: {
      minHeight: '80vh',
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
      backgroundImage: `url(${Finance})`,
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
    
    // Main Content Section
    mainSection: {
      padding: '90px 10px',
      backgroundColor: '#ffffff',
      fontFamily: '"Lato", "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    },
    
    patternBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)',
      pointerEvents: 'none'
    },
    
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1
    },
    
    headerSection: {
      textAlign: 'center',
      marginBottom: '100px',
      opacity: 0,
      transform: 'translateY(30px)'
    },
    
    headerSectionVisible: {
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
    },
    
    welcomeHeading: {
      fontSize: '56px',
      fontWeight: '700',
      color: '#1e293b',
      margin: '0 0 24px 0',
      letterSpacing: '-1px',
      lineHeight: '1.1',
      fontFamily: '"Montserrat", "Arial", sans-serif'
    },
    
    dividerLine: {
      width: '100px',
      height: '4px',
      background: 'linear-gradient(90deg, #1e293b 0%, #3b82f6 100%)',
      margin: '0 auto 40px auto',
      borderRadius: '2px'
    },
    
    welcomeText: {
      fontSize: '20px',
      color: '#64748b',
      margin: '0',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6',
      fontWeight: '400'
    },
    
    // Grid Layout
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.5fr',
      gap: '40px',
      alignItems: 'center',
      marginBottom: '80px'
    },
    
    leftContent: {
      opacity: 0,
      transform: 'translateX(-30px)'
    },
    
    leftContentVisible: {
      opacity: 1,
      transform: 'translateX(0)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
    },
    
    journeyHeading: {
      fontSize: '32px',
      fontWeight: '600',
      color: '#1e293b',
      margin: '0 0 20px 0',
      fontFamily: '"Montserrat", "Arial", sans-serif'
    },
    
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    
    paragraph: {
      fontSize: '22px',
      color: '#475569',
      lineHeight: '1.7',
      margin: '0',
      fontWeight: '400'
    },
    
    // Stats Section
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      marginTop: '40px'
    },
    
    statCard: {
      padding: '20px',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      textAlign: 'center',
      border: '1px solid #e2e8f0'
    },
    
    statNumber: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '8px',
      fontFamily: '"Montserrat", "Arial", sans-serif'
    },
    
    statLabel: {
      fontSize: '13px',
      color: '#64748b',
      fontWeight: '500'
    },
    
    // Image Gallery Section
    rightContent: {
      opacity: 0,
      transform: 'translateX(30px)'
    },
    
    rightContentVisible: {
      opacity: 1,
      transform: 'translateX(0)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s'
    },
    
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: '500px',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
    },
    
    imageBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'brightness(0.9)',
      transition: 'transform 0.5s ease'
    },
    
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(45deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%)'
    },
    
    imageContent: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      padding: '40px',
      color: '#ffffff',
      zIndex: 2,
      maxWidth: '80%'
    },
    
    imageNumber: {
      fontSize: '14px',
      fontWeight: '600',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      marginBottom: '16px',
      opacity: 0.9,
      color: '#ffffff'
    },
    
    imageTitle: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '16px',
      fontFamily: '"Montserrat", "Arial", sans-serif',
      lineHeight: '1.2',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    
    imageDescription: {
      fontSize: '16px',
      lineHeight: '1.6',
      opacity: 0.9,
      marginBottom: '24px',
      fontFamily: '"Lato", "Arial", sans-serif'
    },
    
    // Navigation Dots
    dotsContainer: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    },
    
    dot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#ffffff',
      cursor: 'pointer'
    },
    
    dotActive: {
      opacity: 1
    },
    
    dotInactive: {
      opacity: 0.5
    },
    
    // Navigation Buttons
    navButtonsContainer: {
      position: 'absolute',
      right: '40px',
      bottom: '40px',
      display: 'flex',
      gap: '16px',
      zIndex: 2
    },
    
    navButton: {
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    
    navButtonHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    
    // Thumbnails
    thumbnailsContainer: {
      position: 'absolute',
      top: '40px',
      right: '40px',
      display: 'flex',
      gap: '12px',
      zIndex: 2
    },
    
    thumbnail: {
      width: '60px',
      height: '40px',
      borderRadius: '4px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: 'none'
    },
    
    thumbnailActive: {
      opacity: 1,
      border: '2px solid #ffffff'
    },
    
    thumbnailInactive: {
      opacity: 0.6
    },
    
    thumbnailImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    
    // Image Footer
    imageFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px',
      padding: '0 10px'
    },
    
    footerText: {
      fontSize: '14px',
      color: '#64748b',
      fontFamily: '"Lato", "Arial", sans-serif'
    },
    
    viewAllContainer: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center'
    },
    
    viewAllText: {
      fontSize: '12px',
      color: '#94a3b8',
      fontWeight: '500'
    },
    
    // Business Sectors
    businessSectorsContainer: {
      opacity: 0,
      transform: 'translateY(30px)'
    },
    
    businessSectorsVisible: {
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s'
    },
    
    sectorsHeading: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#1e293b',
      margin: '0 0 32px 0',
      textAlign: 'center',
      fontFamily: '"Montserrat", "Arial", sans-serif'
    },
    
    sectorsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px'
    },
    
    sectorCard: {
      padding: '30px 24px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '280px'
    },
    
    sectorImageContainer: {
      width: '100%',
      height: '160px',
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '20px',
      position: 'relative',
      backgroundColor: '#f8fafc'
    },
    
    sectorImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
    },
    
    sectorOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    sectorIcon: {
      width: '50px',
      height: '50px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: '600',
      color: '#1e293b'
    },
    
    sectorTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1e293b',
      margin: '0 0 12px 0',
      fontFamily: '"Montserrat", "Arial", sans-serif',
      lineHeight: '1.3'
    },
    
    sectorDescription: {
      fontSize: '14px',
      color: '#64748b',
      margin: '0',
      lineHeight: '1.5',
      flexGrow: 1
    },
    
    learnMoreButton: {
      marginTop: '16px',
      padding: '8px 20px',
      backgroundColor: '#f1f5f9',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
      color: '#475569',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }
  };

  return (
    <WhoWeAreLayout>
      {/* Hero Section */}
      <section style={styles.heroSection} >
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
            Powering India's ambitions.
          </h2>

          {/* Second Tagline */}
          <h3 style={styles.secondTagline}>
            Catering to a billion aspirations.
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
              About Us
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section 
        ref={sectionRef}
        style={styles.mainSection}
      >
        {/* Background Pattern */}
        <div />

        <div >
          {/* Header Section */}
          <div style={{
            ...styles.headerSection,
            ...(isVisible && styles.headerSectionVisible),
            paddingLeft: '80px',
            paddingRight: '80px'
          }}>
            <h1 style={styles.welcomeHeading}>
              Welcome to Shanky Group
            </h1>
            <div style={styles.dividerLine} />
            <p style={styles.welcomeText}>
              Discover our journey of excellence and innovation across multiple industries
            </p>
          </div>

          {/* Second Content Section - Moved to Top */}
          <div style={{
            marginTop: '80px',
            marginBottom: '60px',
            paddingLeft: '80px',
            paddingRight: '80px'
          }}>
            <div style={styles.contentGrid}>
              {/* Left Side - Company Overview First */}
              <div style={{
                ...styles.leftContent,
                ...(isVisible && styles.leftContentVisible)
              }}>
                <h2 style={styles.journeyHeading}>
                  Our Vision
                </h2>
                
                <div style={styles.textContainer}>
                  <p style={styles.paragraph}>
                    At Shanky Group, we envision a future where innovation meets sustainability, creating lasting value for our stakeholders and communities. Our vision drives us to push boundaries and explore new possibilities across all our business sectors.
                  </p>
                  
                  <p style={styles.paragraph}>
                    We are committed to being a leader in every industry we operate, setting benchmarks for quality, integrity, and environmental responsibility. Our forward-thinking approach ensures we remain at the forefront of industry trends and technological advancements.
                  </p>
                </div>
              </div>

              {/* Right Side - Different Image Gallery with Carousel */}
              <div style={{
                ...styles.rightContent,
                ...(isVisible && styles.rightContentVisible)
              }}>
                {/* Large Background Image Container */}
                <div style={styles.imageContainer}>
                  {/* Background Image - Different Images */}
                  <div style={{
                    ...styles.imageBackground,
                    backgroundImage: `url(${secondImages[secondImageIndex].src})`
                  }} />
                  
                  {/* Gradient Overlay */}
                  <div style={styles.imageOverlay} />
                  
                  {/* Content Overlay */}
                  <div style={styles.imageContent}>
                    {/* Image Number Indicator */}
                    <div style={styles.imageNumber}>
                      {secondImages[secondImageIndex].number}
                    </div>
                    
                    {/* Image Title */}
                    <h3 style={styles.imageTitle}>
                      {secondImages[secondImageIndex].title}
                    </h3>
                    
                    {/* Image Description */}
                    <p style={styles.imageDescription}>
                      {secondImages[secondImageIndex].description}
                    </p>
                    
                    {/* Navigation Dots */}
                    <div style={styles.dotsContainer}>
                      {secondImages.map((_, index) => (
                        <div 
                          key={index}
                          style={{
                            ...styles.dot,
                            ...(index === secondImageIndex ? styles.dotActive : styles.dotInactive)
                          }}
                          onClick={() => setSecondImageIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Right Side Controls */}
                  <div style={styles.navButtonsContainer}>
                    {/* Previous Button */}
                    <div 
                      style={styles.navButton}
                      onClick={prevSecondImage}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </div>
                    
                    {/* Next Button */}
                    <div 
                      style={styles.navButton}
                      onClick={nextSecondImage}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Image Thumbnails */}
                  <div style={styles.thumbnailsContainer}>
                    {secondImages.map((img, index) => (
                      <div 
                        key={index}
                        style={{
                          ...styles.thumbnail,
                          ...(index === secondImageIndex ? styles.thumbnailActive : styles.thumbnailInactive)
                        }}
                        onClick={() => setSecondImageIndex(index)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                          if (index !== secondImageIndex) {
                            e.currentTarget.style.opacity = '0.6';
                          }
                        }}
                      >
                        <img 
                          src={img.src} 
                          alt={`Thumbnail ${index + 1}`}
                          style={styles.thumbnailImg}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Image Description Footer */}
                <div style={styles.imageFooter}>
                  <div style={styles.footerText}>
                    Our commitment to excellence and innovation
                  </div>
                  <div style={styles.viewAllContainer}>
                    <div style={styles.viewAllText}>
                      LEARN MORE
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div style={{
            ...styles.contentGrid,
            paddingLeft: '80px',
            paddingRight: '80px'
          }}>
            {/* Left Side - Image Gallery */}
            <div style={{
              ...styles.rightContent,
              ...(isVisible && styles.rightContentVisible)
            }}>
              {/* Large Background Image Container */}
              <div style={styles.imageContainer}>
                {/* Background Image */}
                <div style={{
                  ...styles.imageBackground,
                  backgroundImage: `url(${images[currentImageIndex].src})`
                }} />
                
                {/* Gradient Overlay */}
                <div style={styles.imageOverlay} />
                
                {/* Content Overlay */}
                <div style={styles.imageContent}>
                  {/* Image Number Indicator */}
                  <div style={styles.imageNumber}>
                    {images[currentImageIndex].number}
                  </div>
                  
                  {/* Image Title */}
                  <h3 style={styles.imageTitle}>
                    {images[currentImageIndex].title}
                  </h3>
                  
                  {/* Image Description */}
                  <p style={styles.imageDescription}>
                    {images[currentImageIndex].description}
                  </p>
                  
                  {/* Navigation Dots */}
                  <div style={styles.dotsContainer}>
                    {images.map((_, index) => (
                      <div 
                        key={index}
                        style={{
                          ...styles.dot,
                          ...(index === currentImageIndex ? styles.dotActive : styles.dotInactive)
                        }}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Right Side Controls */}
                <div style={styles.navButtonsContainer}>
                  {/* Previous Button */}
                  <div 
                    style={styles.navButton}
                    onClick={prevImage}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </div>
                  

                  <div 
                    style={styles.navButton}
                    onClick={nextImage}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>
                
                <div style={styles.thumbnailsContainer}>
                  {images.map((img, index) => (
                    <div 
                      key={index}
                      style={{
                        ...styles.thumbnail,
                        ...(index === currentImageIndex ? styles.thumbnailActive : styles.thumbnailInactive)
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        if (index !== currentImageIndex) {
                          e.currentTarget.style.opacity = '0.6';
                        }
                      }}
                    >
                      <img 
                        src={img.src} 
                        alt={`Thumbnail ${index + 1}`}
                        style={styles.thumbnailImg}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={styles.imageFooter}>
                <div style={styles.footerText}>
                  Shanky Group showcases excellence across multiple industries
                </div>
                <div style={styles.viewAllContainer}>
                  <div style={styles.viewAllText}>
                    VIEW ALL
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>

            <div style={{
              ...styles.leftContent,
              ...(isVisible && styles.leftContentVisible)
            }}>
              <h2 style={styles.journeyHeading}>
                Our Journey
              </h2>
              
              <div style={styles.textContainer}>
                <p style={styles.paragraph}>
                  Welcome to Shanky Group, a dynamic conglomerate that has been at the forefront of innovation and excellence across multiple industries. Founded with a vision to create sustainable value and drive positive change, we have grown into a trusted name that embodies integrity, quality, and forward-thinking solutions.
                </p>
                
                <p style={styles.paragraph}>
                  Our diverse portfolio spans financial services, renewable energy, corporate training, construction, and metal industries, each contributing to our mission of delivering exceptional products and services that meet the evolving needs of our clients and communities.
                </p>
              </div>
            </div>
          </div>

          <MediaSection />

          {/* Counting Section */}
          <div style={{
            marginTop: '100px',
            marginBottom: '80px',
            paddingLeft: '80px',
            paddingRight: '80px'
          }}>
            <div style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1s'
            }}>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '700',
                color: '#1e293b',
                margin: '0 0 60px 0',
                textAlign: 'center',
                fontFamily: '"Montserrat", "Arial", sans-serif'
              }}>
                Our Achievements
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '40px'
              }}>
                {/* Years of Excellence */}
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)'
                  }} />
                  <div style={{
                    fontSize: '48px',
                    fontWeight: '800',
                    color: '#3b82f6',
                    marginBottom: '12px',
                    fontFamily: '"Montserrat", "Arial", sans-serif',
                    lineHeight: '1'
                  }}>
                    {yearsCount}+
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#64748b',
                    fontFamily: '"Lato", "Arial", sans-serif'
                  }}>
                    Years of Excellence
                  </div>
                </div>

                {/* Business Sectors */}
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)'
                  }} />
                  <div style={{
                    fontSize: '48px',
                    fontWeight: '800',
                    color: '#10b981',
                    marginBottom: '12px',
                    fontFamily: '"Montserrat", "Arial", sans-serif',
                    lineHeight: '1'
                  }}>
                    {sectorsCount}+
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#64748b',
                    fontFamily: '"Lato", "Arial", sans-serif'
                  }}>
                    Business Sectors
                  </div>
                </div>

                {/* Employees */}
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)'
                  }} />
                  <div style={{
                    fontSize: '48px',
                    fontWeight: '800',
                    color: '#06b6d4',
                    marginBottom: '12px',
                    fontFamily: '"Montserrat", "Arial", sans-serif',
                    lineHeight: '1'
                  }}>
                    {employeesCount}+
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#64748b',
                    fontFamily: '"Lato", "Arial", sans-serif'
                  }}>
                    Employees
                  </div>
                </div>

                {/* Projects Completed */}
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
                  }} />
                  <div style={{
                    fontSize: '48px',
                    fontWeight: '800',
                    color: '#8b5cf6',
                    marginBottom: '12px',
                    fontFamily: '"Montserrat", "Arial", sans-serif',
                    lineHeight: '1'
                  }}>
                    {projectsCount}+
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#64748b',
                    fontFamily: '"Lato", "Arial", sans-serif'
                  }}>
                    Projects Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .content-grid {
              grid-template-columns: 1fr !important;
              gap: 60px !important;
            }
            
            .image-container {
              height: 400px !important;
            }
            
            .sectors-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }

          @media (max-width: 768px) {
            .main-section {
              padding: 60px 20px !important;
            }
            
            .welcome-heading {
              font-size: 36px !important;
            }
            
            .content-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
            
            .stats-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 16px !important;
            }
            
            .image-content {
              padding: 30px 20px !important;
            }
            
            .image-title {
              font-size: 24px !important;
            }
            
            .sectors-grid {
              grid-template-columns: 1fr !important;
            }
            
            .sector-card {
              padding: 24px 20px !important;
            }
          }

          @media (max-width: 480px) {
            .image-container {
              height: 350px !important;
            }
            
            .image-content {
              padding: 20px !important;
            }
            
            .image-title {
              font-size: 20px !important;
            }
            
            .nav-buttons-container {
              right: 20px !important;
              bottom: 20px !important;
            }
            
            .thumbnails-container {
              top: 20px !important;
              right: 20px !important;
            }
          }
        `}</style>
      </section>
    </WhoWeAreLayout>
  );
};

export default AboutUs;