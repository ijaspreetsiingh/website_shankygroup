'use client';

import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Link from 'next/link';

const AboutUsPage = () => {
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
      src: 'https://images.unsplash.com/photo-1466692476868-a93f867cb794?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
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
      src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
      number: "03 / 03",
      title: "Leadership & Vision",
      description: "Leading with vision and commitment to create lasting impact across industries."
    }
  ];

  const secondImages = [
    { 
      src: '', 
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
      src: 'https://images.unsplash.com/photo-1497366216546-3c92952c6769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
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
        { target: 13, setter: setYearsCount },
        { target: 6, setter: setSectorsCount },
        { target: 500, setter: setEmployeesCount },
        { target: 50, setter: setProjectsCount }
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

      // Reset countingStarted to prevent re-running
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

    // Auto-slide for first gallery
    const firstSlideInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 1500); // Change slide every 1.5 seconds

    // Auto-slide for second gallery
    const secondSlideInterval = setInterval(() => {
      setSecondImageIndex((prev) => (prev + 1) % secondImages.length);
    }, 1800); // Change slide every 1.8 seconds

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      clearInterval(firstSlideInterval);
      clearInterval(secondSlideInterval);
    };
  }, []);

  return (
    <>
      {/* Hero - same design as compliance page */}
      <div
        className="relative w-full bg-[var(--background)] text-[var(--foreground)]"
        style={{ ['--accent' as string]: '#e63a27', ['--accent-hover' as string]: '#c93222' }}
      >
        <section className="relative w-full pt-3 sm:pt-4 md:pt-6 lg:pt-8 px-3 sm:px-4 md:px-8 lg:px-12 pb-0 bg-[var(--background)]">
          <div className="relative w-full h-[58vh] min-h-[260px] sm:min-h-[300px] sm:h-[65vh] md:h-[72vh] lg:h-[75vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-[var(--card-border)]">
            <Image
              src="/images/aboutus2.png"
              alt="About Us - Shanky Group"
              fill
              className="object-cover object-[center_42%] brightness-100"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-0 flex flex-col z-30">
              <div className="flex-1 flex items-center px-3 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-16">
                <div className="w-full max-w-2xl lg:max-w-3xl text-left">
                  <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-[10px] sm:text-xs lg:text-sm font-semibold tracking-widest rounded-full uppercase mb-3 sm:mb-5 lg:mb-6 shadow-md">
                    Who We Are
                  </span>
                  <h1 className="section-heading text-[28px] min-[380px]:text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-3 sm:mb-4 lg:mb-5">
                    <span className="text-[#e63a27]">ABOUT US</span>
                    <br />
                    <span className="text-neutral-800">Powering India&apos;s Ambitions</span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl text-neutral-600 leading-relaxed mb-5 sm:mb-6 md:mb-8 lg:mb-10">
                    Catering to a billion aspirations. Discover our journey of excellence and innovation across multiple industries.
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
                  <span className="text-neutral-800 font-medium">About Us</span>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content Section */}
      <section
        ref={sectionRef}
        className="pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-[90px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 bg-[var(--card-bg)] font-['Lato','Helvetica_Neue','Arial','sans-serif'] relative overflow-hidden"
      >
        <div>
          {/* Header Section */}
          <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-800 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
          }`}>
            <h1 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-bold text-[var(--text-primary)] mb-4 sm:mb-6 tracking-[-0.5px] md:tracking-[-1px] leading-[1.15] px-1">
              Welcome to Shanky Group
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-[20px] text-[var(--text-secondary)] max-w-[800px] mx-auto leading-[1.5] sm:leading-[1.6] font-[400] px-1">
              Discover our journey of excellence and innovation across multiple industries
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16 md:mb-20">
            {/* Image Gallery */}
            <div className={`transition-all duration-800 ease-out delay-600 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[30px]'
            }`}>
              {/* Large Background Image Container */}
              <div className="relative w-full h-[280px] min-[400px]:h-[340px] sm:h-[420px] md:h-[520px] lg:h-[560px] rounded-lg sm:rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                {/* Background Image – professional dark overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center brightness-[0.75] contrast-[1.05] transition-transform duration-500 ease-in-out"
                  style={{ backgroundImage: `url(${images[currentImageIndex].src})` }}
                />
                <div className="absolute inset-0 bg-black/40 pointer-events-none" aria-hidden />
                
                {/* Right Side Controls - smaller on phone */}
                <div className="absolute right-3 bottom-3 sm:right-6 sm:bottom-6 md:right-10 md:bottom-10 flex gap-2 sm:gap-4 z-[2]">
                  <div 
                    className="w-9 h-9 sm:w-11 sm:h-11 md:w-[44px] md:h-[44px] rounded-full bg-[var(--card-bg)]/20 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/30 hover:bg-[var(--card-bg)]/30 touch-manipulation"
                    onClick={prevImage}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </div>
                  <div 
                    className="w-9 h-9 sm:w-11 sm:h-11 md:w-[44px] md:h-[44px] rounded-full bg-[var(--card-bg)]/20 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/30 hover:bg-[var(--card-bg)]/30 touch-manipulation"
                    onClick={nextImage}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>
                
                {/* Thumbnails - smaller on phone, hide on very small or show compact */}
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6 flex gap-1.5 sm:gap-3 z-[2]">
                  {images.map((img, index) => (
                    <div 
                      key={index}
                      className={`w-10 h-7 sm:w-12 sm:h-8 md:w-[60px] md:h-[40px] rounded overflow-hidden cursor-pointer transition-all duration-300 border-none flex-shrink-0 ${
                        index === currentImageIndex ? 'opacity-100 ring-2 ring-white' : 'opacity-60'
                      } hover:opacity-100`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={img.src} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col min-[400px]:flex-row justify-between items-stretch min-[400px]:items-center gap-2 mt-4 sm:mt-5">
                <div className="text-xs sm:text-sm text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                  Shanky Group showcases excellence across multiple industries
                </div>
                <div className="flex gap-1 items-center flex-shrink-0">
                  <div className="text-[10px] sm:text-[12px] text-[var(--text-secondary)] font-[500]">
                    VIEW ALL
                  </div>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* ABOUT US Content */}
            <div className={`transition-all duration-800 ease-out delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[30px]'
            }`}>
              <h2 className="section-heading text-xl sm:text-2xl md:text-[27px] font-bold text-[var(--text-primary)] mb-4 sm:mb-5 text-center">
                ABOUT US
              </h2>
              
              <div className="flex flex-col gap-4 sm:gap-5">
                <p className="text-sm sm:text-base md:text-lg lg:text-[22px] text-[var(--text-secondary)] leading-[1.6] sm:leading-[1.7] font-[400]">
                  Shanky Group is a distinguished and rapidly growing business conglomerate headquartered in Delhi, India. With a robust presence across diverse sectors, Group has established itself as a dynamic force in financial services, food and agribusiness, solar EPC and electronics, education and corporate training, infrastructure and construction, and metals trading. The Group&apos;s portfolio comprises seven core companies—each a leader in its respective domain—united by a shared commitment to operational excellence, innovation, and sustainable growth.  
                </p>
                
                <p className="text-sm sm:text-base md:text-lg lg:text-[22px] text-[var(--text-secondary)] leading-[1.6] sm:leading-[1.7] font-[400]">
                  Founded and steered by visionary leaders, Shanky Group has evolved into a multi-faceted enterprise that leverages sectoral synergies to deliver superior value to clients, partners, and stakeholders. The Group&apos;s strategic investments and operational rigor have enabled it to build a resilient business model, capable of navigating market volatility and capitalizing on emerging opportunities. With a strong foundation in Delhi and a growing pan-India footprint, Shanky Group is recognized for its integrity, customer-centric approach, and unwavering pursuit of excellence.  
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-[22px] text-[var(--text-secondary)] leading-[1.6] sm:leading-[1.7] font-[400]">
                  The Group&apos;s companies are registered with the Ministry of Corporate Affairs, Government of India, and adhere to the highest standards of corporate governance and compliance. Shanky Group&apos;s leadership team brings together decades of industry expertise, fostering a culture of innovation, accountability, and continuous improvement. The Group&apos;s operational headquarters are located at D-Mall, Netaji Subhash Place, Pitampura, a strategic business hub in North West Delhi, facilitating seamless connectivity and access to key markets.  
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-[22px] text-[var(--text-secondary)] leading-[1.6] sm:leading-[1.7] font-[400]">
                  Shanky Group&apos;s diversified business model not only mitigates sector-specific risks but also enables cross-sectoral innovation and resource optimization. The Group&apos;s companies operate with a shared vision, leveraging collective strengths to drive growth, enhance operational efficiencies, and deliver sustainable value. As the Group continues to expand its portfolio and geographic reach, it remains steadfast in its commitment to ethical business practices, stakeholder engagement, and community development  
                </p>
              </div>
            </div>
          </div>


          {/* CORE VALUES Section - fully responsive */}
          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 mb-10 sm:mb-14 md:mb-16 lg:mb-20">
            <div className={`transition-all duration-800 ease-out delay-1200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
            }`}>
              <h2 className="section-heading text-xl min-[400px]:text-2xl sm:text-3xl md:text-[32px] lg:text-[38px] xl:text-[40px] font-bold text-[var(--text-primary)] mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-center tracking-tight px-2">
                CORE VALUES
              </h2>

              <div className="max-w-[90%] min-[400px]:max-w-2xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-center px-3 sm:px-4 md:px-6 mb-5 sm:mb-6 md:mb-8 lg:mb-10">
                <p className="text-xs min-[380px]:text-sm sm:text-base md:text-[17px] lg:text-[19px] text-[var(--text-secondary)] leading-[1.6] sm:leading-[1.65] md:leading-[1.7] lg:leading-[1.75] font-[400]">
                  Shanky Group&apos;s core values are the foundation of its corporate culture and operational philosophy. These values guide decision-making, stakeholder engagement, and business conduct across all Group companies.
                </p>
              </div>

              <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-4 xl:px-2 mb-8 sm:mb-10 md:mb-12">
                <div className="core-value-card text-center p-3 min-[400px]:p-4 sm:p-5 md:p-5 lg:p-6 bg-[var(--card-bg)] rounded-lg min-[400px]:rounded-xl sm:rounded-2xl border border-[var(--card-border)] shadow-[0_12px_28px_rgba(0,0,0,0.08)] sm:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] active:scale-[0.99] hover:scale-[1.02] sm:hover:scale-[1.02] lg:hover:scale-[1.03] flex flex-col items-center min-h-0 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#e63a27]/10 to-transparent rounded-full -mr-10 -mt-10" aria-hidden />
                  <div className="relative z-10 flex flex-col flex-1 w-full">
                    <div className="w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-2 min-[400px]:mb-3 sm:mb-4 bg-gradient-to-br from-[#e63a27]/20 to-[#e63a27]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 min-[400px]:w-6 min-[400px]:h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="section-heading text-xs min-[380px]:text-sm sm:text-[15px] md:text-[16px] lg:text-[17px] font-bold text-[#e63a27] leading-tight mb-1.5 min-[400px]:mb-2 sm:mb-3">
                      Integrity
                    </h3>
                    <p className="text-[11px] min-[380px]:text-xs sm:text-[13px] md:text-[13px] lg:text-[14px] text-[var(--text-secondary)] font-[400] leading-[1.5] sm:leading-[1.55] lg:leading-[1.6] flex-1">
                      Upholding the highest standards of honesty, transparency, and ethical conduct in all business dealings.
                    </p>
                  </div>
                </div>

                <div className="core-value-card text-center p-3 min-[400px]:p-4 sm:p-5 md:p-5 lg:p-6 bg-[var(--card-bg)] rounded-lg min-[400px]:rounded-xl sm:rounded-2xl border border-[var(--card-border)] shadow-[0_12px_28px_rgba(0,0,0,0.08)] sm:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] active:scale-[0.99] hover:scale-[1.02] sm:hover:scale-[1.02] lg:hover:scale-[1.03] flex flex-col items-center min-h-0 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#e63a27]/10 to-transparent rounded-full -mr-10 -mt-10" aria-hidden />
                  <div className="relative z-10 flex flex-col flex-1 w-full">
                    <div className="w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-2 min-[400px]:mb-3 sm:mb-4 bg-gradient-to-br from-[#e63a27]/20 to-[#e63a27]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 min-[400px]:w-6 min-[400px]:h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="section-heading text-xs min-[380px]:text-sm sm:text-[15px] md:text-[16px] lg:text-[17px] font-bold text-[#e63a27] leading-tight mb-1.5 min-[400px]:mb-2 sm:mb-3">
                      Customer Centricity
                    </h3>
                    <p className="text-[11px] min-[380px]:text-xs sm:text-[13px] md:text-[13px] lg:text-[14px] text-[var(--text-secondary)] font-[400] leading-[1.5] sm:leading-[1.55] lg:leading-[1.6] flex-1">
                      Placing customers at the center of all operations, striving to exceed their expectations through quality, reliability, and service excellence.
                    </p>
                  </div>
                </div>

                <div className="core-value-card text-center p-3 min-[400px]:p-4 sm:p-5 md:p-5 lg:p-6 bg-[var(--card-bg)] rounded-lg min-[400px]:rounded-xl sm:rounded-2xl border border-[var(--card-border)] shadow-[0_12px_28px_rgba(0,0,0,0.08)] sm:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] active:scale-[0.99] hover:scale-[1.02] sm:hover:scale-[1.02] lg:hover:scale-[1.03] flex flex-col items-center min-h-0 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#e63a27]/10 to-transparent rounded-full -mr-10 -mt-10" aria-hidden />
                  <div className="relative z-10 flex flex-col flex-1 w-full">
                    <div className="w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-2 min-[400px]:mb-3 sm:mb-4 bg-gradient-to-br from-[#e63a27]/20 to-[#e63a27]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 min-[400px]:w-6 min-[400px]:h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="section-heading text-xs min-[380px]:text-sm sm:text-[15px] md:text-[16px] lg:text-[17px] font-bold text-[#e63a27] leading-tight mb-1.5 min-[400px]:mb-2 sm:mb-3">
                      Innovation
                    </h3>
                    <p className="text-[11px] min-[380px]:text-xs sm:text-[13px] md:text-[13px] lg:text-[14px] text-[var(--text-secondary)] font-[400] leading-[1.5] sm:leading-[1.55] lg:leading-[1.6] flex-1">
                      Fostering a culture of creativity, continuous improvement, and technological advancement to drive business growth and competitiveness.
                    </p>
                  </div>
                </div>

                <div className="core-value-card text-center p-3 min-[400px]:p-4 sm:p-5 md:p-5 lg:p-6 bg-[var(--card-bg)] rounded-lg min-[400px]:rounded-xl sm:rounded-2xl border border-[var(--card-border)] shadow-[0_12px_28px_rgba(0,0,0,0.08)] sm:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] active:scale-[0.99] hover:scale-[1.02] sm:hover:scale-[1.02] lg:hover:scale-[1.03] flex flex-col items-center min-h-0 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#e63a27]/10 to-transparent rounded-full -mr-10 -mt-10" aria-hidden />
                  <div className="relative z-10 flex flex-col flex-1 w-full">
                    <div className="w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-2 min-[400px]:mb-3 sm:mb-4 bg-gradient-to-br from-[#e63a27]/20 to-[#e63a27]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 min-[400px]:w-6 min-[400px]:h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="section-heading text-xs min-[380px]:text-sm sm:text-[15px] md:text-[16px] lg:text-[17px] font-bold text-[#e63a27] leading-tight mb-1.5 min-[400px]:mb-2 sm:mb-3">
                      Collaboration
                    </h3>
                    <p className="text-[11px] min-[380px]:text-xs sm:text-[13px] md:text-[13px] lg:text-[14px] text-[var(--text-secondary)] font-[400] leading-[1.5] sm:leading-[1.55] lg:leading-[1.6] flex-1">
                      Promoting teamwork, knowledge sharing, and cross-functional collaboration to achieve collective goals.
                    </p>
                  </div>
                </div>

                <div className="core-value-card text-center p-3 min-[400px]:p-4 sm:p-5 md:p-5 lg:p-6 bg-[var(--card-bg)] rounded-lg min-[400px]:rounded-xl sm:rounded-2xl border border-[var(--card-border)] shadow-[0_12px_28px_rgba(0,0,0,0.08)] sm:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] active:scale-[0.99] hover:scale-[1.02] sm:hover:scale-[1.02] lg:hover:scale-[1.03] flex flex-col items-center min-h-0 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#e63a27]/10 to-transparent rounded-full -mr-10 -mt-10" aria-hidden />
                  <div className="relative z-10 flex flex-col flex-1 w-full">
                    <div className="w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-2 min-[400px]:mb-3 sm:mb-4 bg-gradient-to-br from-[#e63a27]/20 to-[#e63a27]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 min-[400px]:w-6 min-[400px]:h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="section-heading text-xs min-[380px]:text-sm sm:text-[15px] md:text-[16px] lg:text-[17px] font-bold text-[#e63a27] leading-tight mb-1.5 min-[400px]:mb-2 sm:mb-3">
                      Accountability
                    </h3>
                    <p className="text-[11px] min-[380px]:text-xs sm:text-[13px] md:text-[13px] lg:text-[14px] text-[var(--text-secondary)] font-[400] leading-[1.5] sm:leading-[1.55] lg:leading-[1.6] flex-1">
                      Taking ownership of decisions and actions, delivering on commitments, and being responsible stewards of resources.
                    </p>
                  </div>
                </div>

                <div className="core-value-card text-center p-3 min-[400px]:p-4 sm:p-5 md:p-5 lg:p-6 bg-[var(--card-bg)] rounded-lg min-[400px]:rounded-xl sm:rounded-2xl border border-[var(--card-border)] shadow-[0_12px_28px_rgba(0,0,0,0.08)] sm:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] active:scale-[0.99] hover:scale-[1.02] sm:hover:scale-[1.02] lg:hover:scale-[1.03] flex flex-col items-center min-h-0 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#e63a27]/10 to-transparent rounded-full -mr-10 -mt-10" aria-hidden />
                  <div className="relative z-10 flex flex-col flex-1 w-full">
                    <div className="w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-2 min-[400px]:mb-3 sm:mb-4 bg-gradient-to-br from-[#e63a27]/20 to-[#e63a27]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 min-[400px]:w-6 min-[400px]:h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="section-heading text-xs min-[380px]:text-sm sm:text-[15px] md:text-[16px] lg:text-[17px] font-bold text-[#e63a27] leading-tight mb-1.5 min-[400px]:mb-2 sm:mb-3">
                      Sustainability
                    </h3>
                    <p className="text-[11px] min-[380px]:text-xs sm:text-[13px] md:text-[13px] lg:text-[14px] text-[var(--text-secondary)] font-[400] leading-[1.5] sm:leading-[1.55] lg:leading-[1.6] flex-1">
                      Integrating environmental, social, and governance (ESG) principles into business operations, contributing to community development and environmental stewardship.
                    </p>
                  </div>
                </div>

                <div className="core-value-card text-center p-3 min-[400px]:p-4 sm:p-5 md:p-5 lg:p-6 bg-[var(--card-bg)] rounded-lg min-[400px]:rounded-xl sm:rounded-2xl border border-[var(--card-border)] shadow-[0_12px_28px_rgba(0,0,0,0.08)] sm:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] active:scale-[0.99] hover:scale-[1.02] sm:hover:scale-[1.02] lg:hover:scale-[1.03] flex flex-col items-center min-h-0 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#e63a27]/10 to-transparent rounded-full -mr-10 -mt-10" aria-hidden />
                  <div className="relative z-10 flex flex-col flex-1 w-full">
                    <div className="w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-2 min-[400px]:mb-3 sm:mb-4 bg-gradient-to-br from-[#e63a27]/20 to-[#e63a27]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 min-[400px]:w-6 min-[400px]:h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#e63a27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h3 className="section-heading text-xs min-[380px]:text-sm sm:text-[15px] md:text-[16px] lg:text-[17px] font-bold text-[#e63a27] leading-tight mb-1.5 min-[400px]:mb-2 sm:mb-3">
                      Excellence
                    </h3>
                    <p className="text-[11px] min-[380px]:text-xs sm:text-[13px] md:text-[13px] lg:text-[14px] text-[var(--text-secondary)] font-[400] leading-[1.5] sm:leading-[1.55] lg:leading-[1.6] flex-1">
                      Pursuing the highest standards of quality, performance, and professionalism in all endeavours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
                    {/* Counting Section - Our Achievements */}
          <div className="mt-8 sm:mt-12 md:mt-16 mb-12 sm:mb-16 md:mb-20">
            <div className={`transition-all duration-800 ease-out delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
            }`}>
              <h1 className="section-heading text-2xl sm:text-3xl md:text-[40px] font-bold text-[var(--text-primary)] mb-6 sm:mb-8 md:mb-10 text-center px-1">
                Our Achievements
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-8 lg:gap-10 w-full">
                {/* Years of Excellence */}
                <div className="text-center p-4 sm:p-6 md:p-8 lg:p-10 bg-[var(--card-bg)] rounded-lg sm:rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-[800] text-[#3b82f6] mb-1 sm:mb-2 md:mb-3 font-['Montserrat','Arial','sans-serif'] leading-none">
                    {yearsCount}+
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm lg:text-[16px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                    Years of Excellence
                  </div>
                </div>

                {/* Business Sectors */}
                <div className="text-center p-4 sm:p-6 md:p-8 lg:p-10 bg-[var(--card-bg)] rounded-lg sm:rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-[800] text-[#10b981] mb-1 sm:mb-2 md:mb-3 font-['Montserrat','Arial','sans-serif'] leading-none">
                    {sectorsCount}+
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm lg:text-[16px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                    Business Sectors
                  </div>
                </div>

                {/* Employees */}
                <div className="text-center p-4 sm:p-6 md:p-8 lg:p-10 bg-[var(--card-bg)] rounded-lg sm:rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-[800] text-[#06b6d4] mb-1 sm:mb-2 md:mb-3 font-['Montserrat','Arial','sans-serif'] leading-none">
                    {employeesCount}+
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm lg:text-[16px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                    Employees
                  </div>
                </div>

                {/* Projects Completed */}
                <div className="text-center p-4 sm:p-6 md:p-8 lg:p-10 bg-[var(--card-bg)] rounded-lg sm:rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-[800] text-[#8b5cf6] mb-1 sm:mb-2 md:mb-3 font-['Montserrat','Arial','sans-serif'] leading-none">
                    {projectsCount}+
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm lg:text-[16px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                    Projects Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;