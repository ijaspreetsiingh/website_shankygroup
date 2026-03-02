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
        <section className="relative w-full pt-4 md:pt-6 lg:pt-8 px-4 md:px-8 lg:px-12 pb-0 bg-[var(--background)]">
          <div className="relative w-full h-[68vh] min-h-[320px] md:h-[72vh] lg:h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-[var(--card-border)]">
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
              <div className="flex-1 flex items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-10 lg:py-16">
                <div className="w-full max-w-2xl lg:max-w-3xl text-left">
                  <span className="inline-block px-4 py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-xs lg:text-sm font-semibold tracking-widest rounded-full uppercase mb-5 lg:mb-6 shadow-md">
                    Who We Are
                  </span>
                  <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-4 lg:mb-5">
                    <span className="text-[#e63a27]">ABOUT US</span>
                    <br />
                    <span className="text-neutral-800">Powering India&apos;s Ambitions</span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl max-w-xl text-neutral-600 leading-relaxed mb-8 lg:mb-10">
                    Catering to a billion aspirations. Discover our journey of excellence and innovation across multiple industries.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3.5 lg:px-8 lg:py-4 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm lg:text-base shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    >
                      Get in Touch
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="shrink-0 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-4 lg:py-5">
                <nav className="flex items-center text-xs sm:text-sm text-neutral-500 flex-wrap gap-x-2 gap-y-1">
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
        className="pt-8 sm:pt-10 md:pt-12 pb-[90px] px-[10px] bg-[var(--card-bg)] font-['Lato','Helvetica_Neue','Arial','sans-serif'] relative overflow-hidden"
      >
        <div>
          {/* Header Section */}
          <div className={`text-center mb-12 sm:mb-14 md:mb-16 px-[80px] transition-all duration-800 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
          }`}>
            <h1 className="text-[56px] font-[700] text-[var(--text-primary)] mb-6 tracking-[-1px] leading-[1.1] font-['Montserrat','Arial','sans-serif']">
              Welcome to Shanky Group
            </h1>
            <p className="text-[20px] text-[var(--text-secondary)] max-w-[800px] mx-auto leading-[1.6] font-[400]">
              Discover our journey of excellence and innovation across multiple industries
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-col gap-10 mb-20 px-[80px]">
            {/* Image Gallery */}
            <div className={`transition-all duration-800 ease-out delay-600 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[30px]'
            }`}>
              {/* Large Background Image Container */}
              <div className="relative w-full h-[480px] sm:h-[520px] md:h-[560px] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                {/* Background Image – professional dark overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center brightness-[0.75] contrast-[1.05] transition-transform duration-500 ease-in-out"
                  style={{ backgroundImage: `url(${images[currentImageIndex].src})` }}
                />
                <div className="absolute inset-0 bg-black/40 pointer-events-none" aria-hidden />
                
                {/* Right Side Controls */}
                <div className="absolute right-10 bottom-10 flex gap-4 z-[2]">
                  {/* Previous Button */}
                  <div 
                    className="w-[44px] h-[44px] rounded-full bg-[var(--card-bg)]/20 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/30 hover:bg-[var(--card-bg)]/30"
                    onClick={prevImage}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </div>
                  
                  {/* Next Button */}
                  <div 
                    className="w-[44px] h-[44px] rounded-full bg-[var(--card-bg)]/20 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/30 hover:bg-[var(--card-bg)]/30"
                    onClick={nextImage}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>
                
                <div className="absolute top-10 right-10 flex gap-3 z-[2]">
                  {images.map((img, index) => (
                    <div 
                      key={index}
                      className={`w-[60px] h-[40px] rounded overflow-hidden cursor-pointer transition-all duration-300 border-none ${
                        index === currentImageIndex ? 'opacity-100 border-2 border-white' : 'opacity-60'
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
              
              <div className="flex justify-between items-center mt-5 px-[10px]">
                <div className="text-[14px] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                  Shanky Group showcases excellence across multiple industries
                </div>
                <div className="flex gap-1 items-center">
                  <div className="text-[12px] text-[var(--text-secondary)] font-[500]">
                    VIEW ALL
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* ABOUT US Content */}
            <div className={`transition-all duration-800 ease-out delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[30px]'
            }`}>
              <h2 className="text-[27px] font-[600] text-[var(--text-primary)] mb-5 text-center font-['Montserrat','Arial','sans-serif']">
                ABOUT US
              </h2>
              
              <div className="flex flex-col gap-5">
                <p className="text-[22px] text-[var(--text-secondary)] leading-[1.7] font-[400]">
                  Shanky Group is a distinguished and rapidly growing business conglomerate headquartered in Delhi, India. With a robust presence across diverse sectors, Group has established itself as a dynamic force in financial services, food and agribusiness, solar EPC and electronics, education and corporate training, infrastructure and construction, and metals trading. The Group's portfolio comprises seven core companies—each a leader in its respective domain—united by a shared commitment to operational excellence, innovation, and sustainable growth.  
                </p>
                
                <p className="text-[22px] text-[var(--text-secondary)] leading-[1.7] font-[400]">
                  Founded and steered by visionary leaders, Shanky Group has evolved into a multi-faceted enterprise that leverages sectoral synergies to deliver superior value to clients, partners, and stakeholders. The Group's strategic investments and operational rigor have enabled it to build a resilient business model, capable of navigating market volatility and capitalizing on emerging opportunities. With a strong foundation in Delhi and a growing pan-India footprint, Shanky Group is recognized for its integrity, customer-centric approach, and unwavering pursuit of excellence.  
                </p>
                <p className="text-[22px] text-[var(--text-secondary)] leading-[1.7] font-[400]">
                  The Group's companies are registered with the Ministry of Corporate Affairs, Government of India, and adhere to the highest standards of corporate governance and compliance. Shanky Group's leadership team brings together decades of industry expertise, fostering a culture of innovation, accountability, and continuous improvement. The Group's operational headquarters are located at D-Mall, Netaji Subhash Place, Pitampura, a strategic business hub in North West Delhi, facilitating seamless connectivity and access to key markets.  
                </p>
                <p className="text-[22px] text-[var(--text-secondary)] leading-[1.7] font-[400]">
                  Shanky Group's diversified business model not only mitigates sector-specific risks but also enables cross-sectoral innovation and resource optimization. The Group's companies operate with a shared vision, leveraging collective strengths to drive growth, enhance operational efficiencies, and deliver sustainable value. As the Group continues to expand its portfolio and geographic reach, it remains steadfast in its commitment to ethical business practices, stakeholder engagement, and community development  
                </p>
              </div>
            </div>
          </div>


<br /><br />
          {/* CORE VALUES Section */}
          <div className="mt-10 mb-20 px-[80px]">
            <div className={`transition-all duration-800 ease-out delay-1200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
            }`}>
              <h2 className="text-[36px] font-[700] text-[var(--text-primary)] mb-15 text-center font-['Montserrat','Arial','sans-serif']">
                CORE VALUES
              </h2>
              
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-[18px] text-[var(--text-secondary)] leading-[1.8] font-[400] mb-8">
                  Shanky Group's core values are the foundation of its corporate culture and operational philosophy. These values guide decision-making, stakeholder engagement, and business conduct across all Group companies.
                </p>
                 </div>
                <div className="flex justify-center gap-4 mb-12">
                  <div className="text-center p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:scale-105 min-w-[200px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-[16px] font-[700] text-orange-500 font-['Montserrat','Arial','sans-serif'] leading-relaxed mb-3">
                        Integrity
                      </div>
                      <div className="text-[13px] text-[var(--text-secondary)] font-[400] leading-[1.5]">
                        Upholding the highest standards of honesty, transparency, and ethical conduct in all business dealings.
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:scale-105 min-w-[200px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="text-[16px] font-[700] text-orange-500 font-['Montserrat','Arial','sans-serif'] leading-relaxed mb-3">
                        Customer Centricity
                      </div>
                      <div className="text-[13px] text-[var(--text-secondary)] font-[400] leading-[1.5]">
                        Placing customers at the center of all operations, striving to exceed their expectations through quality, reliability, and service excellence.
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:scale-105 min-w-[200px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="text-[16px] font-[700] text-orange-500 font-['Montserrat','Arial','sans-serif'] leading-relaxed mb-3">
                        Innovation
                      </div>
                      <div className="text-[13px] text-[var(--text-secondary)] font-[400] leading-[1.5]">
                        Fostering a culture of creativity, continuous improvement, and technological advancement to drive business growth and competitiveness.
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:scale-105 min-w-[200px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div className="text-[16px] font-[700] text-orange-500 font-['Montserrat','Arial','sans-serif'] leading-relaxed mb-3">
                        Collaboration
                      </div>
                      <div className="text-[13px] text-[var(--text-secondary)] font-[400] leading-[1.5]">
                        Promoting teamwork, knowledge sharing, and cross-functional collaboration to achieve collective goals.
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:scale-105 min-w-[200px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      </div>
                      <div className="text-[16px] font-[700] text-orange-500 font-['Montserrat','Arial','sans-serif'] leading-relaxed mb-3">
                        Accountability
                      </div>
                      <div className="text-[13px] text-[var(--text-secondary)] font-[400] leading-[1.5]">
                        Taking ownership of decisions and actions, delivering on commitments, and being responsible stewards of resources.
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:scale-105 min-w-[200px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-[16px] font-[700] text-orange-500 font-['Montserrat','Arial','sans-serif'] leading-relaxed mb-3">
                        Sustainability
                      </div>
                      <div className="text-[13px] text-[var(--text-secondary)] font-[400] leading-[1.5]">
                        Integrating environmental, social, and governance (ESG) principles into business operations, contributing to community development and environmental stewardship.
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:scale-105 min-w-[200px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div className="text-[16px] font-[700] text-orange-500 font-['Montserrat','Arial','sans-serif'] leading-relaxed mb-3">
                        Excellence
                      </div>
                      <div className="text-[13px] text-[var(--text-secondary)] font-[400] leading-[1.5]">
                        Pursuing the highest standards of quality, performance, and professionalism in all endeavours.
                      </div>
                    </div>
                  </div>
                </div>
                
             
            </div>
          </div>
          <br />
                    {/* Counting Section */}
          <div className="mt-25 mb-20 px-[80px]">
            <div className={`transition-all duration-800 ease-out delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
            }`}>
              <h1 className="text-[40px] font-[800] text-[var(--text-primary)] mb-10 text-center font-['Montserrat','Arial','sans-serif']">
                Our Achievements
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 w-full">
                {/* Years of Excellence */}
                <div className="text-center p-10 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="text-[48px] font-[800] text-[#3b82f6] mb-3 font-['Montserrat','Arial','sans-serif'] leading-none">
                    {yearsCount}+
                  </div>
                  <div className="text-[16px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                    Years of Excellence
                  </div>
                </div>

                {/* Business Sectors */}
                <div className="text-center p-10 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="text-[48px] font-[800] text-[#10b981] mb-3 font-['Montserrat','Arial','sans-serif'] leading-none">
                    {sectorsCount}+
                  </div>
                  <div className="text-[16px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                    Business Sectors
                  </div>
                </div>

                {/* Employees */}
                <div className="text-center p-10 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="text-[48px] font-[800] text-[#06b6d4] mb-3 font-['Montserrat','Arial','sans-serif'] leading-none">
                    {employeesCount}+
                  </div>
                  <div className="text-[16px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                    Employees
                  </div>
                </div>

                {/* Projects Completed */}
                <div className="text-center p-10 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="text-[48px] font-[800] text-[#8b5cf6] mb-3 font-['Montserrat','Arial','sans-serif'] leading-none">
                    {projectsCount}+
                  </div>
                  <div className="text-[16px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
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