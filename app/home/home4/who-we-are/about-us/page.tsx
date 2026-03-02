'use client';

import { useState, useEffect, useRef } from "react";
import WhoWeAreNav from '../WhoWeAreNav';

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

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[80vh] relative overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-xl"
          style={{ backgroundImage: 'url(/images/traning1.png)' }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Main Hero Content */}
        <div className="absolute z-[2] bottom-[60px] left-[40px] right-[40px] flex flex-col items-start justify-end text-left text-white">
          {/* Main Heading */}
          <h1 className="text-[clamp(40px,4vw,56px)] font-[700] leading-[1.1] tracking-[-1px] uppercase text-white opacity-95 mb-4 font-['Montserrat','Arial','sans-serif']">
            Shanky Group
          </h1>

          {/* First Tagline */}
          <h2 className="text-[20px] font-[400] leading-[1.3] mb-2 font-['Lato','Arial','sans-serif'] opacity-90">
            Powering India's ambitions.
          </h2>

          {/* Second Tagline */}
          <h3 className="text-[20px] font-[400] leading-[1.4] mb-8 font-['Lato','Arial','sans-serif'] opacity-85">
            Catering to a billion aspirations.
          </h3>

          {/* Navigation Line */}
          <div className="flex items-center gap-3 mt-2">
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
              className="text-white flex-shrink-0 opacity-90"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            
            {/* Dash */}
            <div className="w-[30px] h-[2px] bg-[var(--card-bg)] opacity-70" />
            
            {/* About Us Text */}
            <div className="text-[clamp(16px,1.6vw,20px)] font-[400] uppercase tracking-[1.5px] font-['Lato','Arial','sans-serif'] opacity-90 cursor-pointer transition-all duration-300 py-1">
              About Us
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section 
        ref={sectionRef}
        className="py-[90px] px-[10px] bg-[var(--card-bg)] font-['Lato','Helvetica_Neue','Arial','sans-serif'] relative overflow-hidden"
      >
        <div>
          {/* Header Section */}
          <div className={`text-center mb-[100px] px-[80px] transition-all duration-800 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
          }`}>
            <h1 className="text-[56px] font-[700] text-[var(--text-primary)] mb-6 tracking-[-1px] leading-[1.1] font-['Montserrat','Arial','sans-serif']">
              Welcome to Shanky Group
            </h1>
            <div className="w-[100px] h-[4px] bg-gradient-to-r from-[#1e293b] to-[#3b82f6] mx-auto mb-10 rounded-[2px]" />
            <p className="text-[20px] text-[var(--text-secondary)] max-w-[800px] mx-auto leading-[1.6] font-[400]">
              Discover our journey of excellence and innovation across multiple industries
            </p>
          </div>

          {/* Second Content Section - Moved to Top */}
          <div className="mt-20 mb-15 px-[80px]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-center mb-20">
              {/* Left Side - Company Overview First */}
              <div className={`transition-all duration-800 ease-out delay-400 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[30px]'
              }`}>
                <h2 className="text-[32px] font-[600] text-[var(--text-primary)] mb-5 font-['Montserrat','Arial','sans-serif']">
                  Our Vision
                </h2>
                
                <div className="flex flex-col gap-5">
                  <p className="text-[22px] text-[var(--text-secondary)] leading-[1.7] font-[400]">
                    At Shanky Group, we envision a future where innovation meets sustainability, creating lasting value for our stakeholders and communities. Our vision drives us to push boundaries and explore new possibilities across all our business sectors.
                  </p>
                  
                  <p className="text-[22px] text-[var(--text-secondary)] leading-[1.7] font-[400]">
                    We are committed to being a leader in every industry we operate, setting benchmarks for quality, integrity, and environmental responsibility. Our forward-thinking approach ensures we remain at the forefront of industry trends and technological advancements.
                  </p>
                </div>
              </div>

              {/* Right Side - Different Image Gallery with Carousel */}
              <div className={`transition-all duration-800 ease-out delay-600 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[30px]'
              }`}>
                {/* Large Background Image Container */}
                <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-4 border-[var(--text-primary)]">
                  {/* Background Image - Different Images */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center brightness-90 transition-transform duration-500"
                    style={{ backgroundImage: `url(${secondImages[secondImageIndex].src})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/30" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 p-10 text-white z-[2] max-w-[80%]">
                    {/* Image Number Indicator */}
                    <div className="text-[14px] font-[600] tracking-[2px] uppercase mb-4 opacity-90">
                      {secondImages[secondImageIndex].number}
                    </div>
                    
                    {/* Image Title */}
                    <h3 className="text-[28px] font-[700] mb-4 font-['Montserrat','Arial','sans-serif'] leading-[1.2] drop-shadow-md">
                      {secondImages[secondImageIndex].title}
                    </h3>
                    
                    {/* Image Description */}
                    <p className="text-[16px] leading-[1.6] opacity-90 mb-6 font-['Lato','Arial','sans-serif']">
                      {secondImages[secondImageIndex].description}
                    </p>
                    
                    {/* Navigation Dots */}
                    <div className="flex gap-2 items-center">
                      {secondImages.map((_, index) => (
                        <div 
                          key={index}
                          className={`w-[10px] h-[10px] rounded-full bg-[var(--card-bg)] cursor-pointer ${
                            index === secondImageIndex ? 'opacity-100' : 'opacity-50'
                          }`}
                          onClick={() => setSecondImageIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Right Side Controls */}
                  <div className="absolute right-10 bottom-10 flex gap-4 z-[2]">
                    {/* Previous Button */}
                    <div 
                      className="w-[44px] h-[44px] rounded-full bg-[var(--card-bg)]/20 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/30 hover:bg-[var(--card-bg)]/30"
                      onClick={prevSecondImage}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </div>
                    
                    {/* Next Button */}
                    <div 
                      className="w-[44px] h-[44px] rounded-full bg-[var(--card-bg)]/20 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/30 hover:bg-[var(--card-bg)]/30"
                      onClick={nextSecondImage}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Image Thumbnails */}
                  <div className="absolute top-10 right-10 flex gap-3 z-[2]">
                    {secondImages.map((img, index) => (
                      <div 
                        key={index}
                        className={`w-[60px] h-[40px] rounded overflow-hidden cursor-pointer transition-all duration-300 border-none ${
                          index === secondImageIndex ? 'opacity-100 border-2 border-white' : 'opacity-60'
                        } hover:opacity-100`}
                        onClick={() => setSecondImageIndex(index)}
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
                
                {/* Image Description Footer */}
                <div className="flex justify-between items-center mt-5 px-[10px]">
                  <div className="text-[14px] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                    Our commitment to excellence and innovation
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="text-[12px] text-[var(--text-secondary)] font-[500]">
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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-center mb-20 px-[80px]">
            {/* Left Side - Image Gallery */}
            <div className={`transition-all duration-800 ease-out delay-600 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[30px]'
            }`}>
              {/* Large Background Image Container */}
              <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-4 border-[var(--text-primary)]">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center brightness-90 transition-transform duration-500"
                  style={{ backgroundImage: `url(${images[currentImageIndex].src})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/30" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 p-10 text-white z-[2] max-w-[80%]">
                  {/* Image Number Indicator */}
                  <div className="text-[14px] font-[600] tracking-[2px] uppercase mb-4 opacity-90">
                    {images[currentImageIndex].number}
                  </div>
                  
                  {/* Image Title */}
                  <h3 className="text-[28px] font-[700] mb-4 font-['Montserrat','Arial','sans-serif'] leading-[1.2] drop-shadow-md">
                    {images[currentImageIndex].title}
                  </h3>
                  
                  {/* Image Description */}
                  <p className="text-[16px] leading-[1.6] opacity-90 mb-6 font-['Lato','Arial','sans-serif']">
                    {images[currentImageIndex].description}
                  </p>
                  
                  {/* Navigation Dots */}
                  <div className="flex gap-2 items-center">
                    {images.map((_, index) => (
                      <div 
                        key={index}
                        className={`w-[10px] h-[10px] rounded-full bg-[var(--card-bg)] cursor-pointer ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-50'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
                
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

            <div className={`transition-all duration-800 ease-out delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[30px]'
            }`}>
              <h2 className="text-[32px] font-[600] text-[var(--text-primary)] mb-5 font-['Montserrat','Arial','sans-serif']">
                Our Journey
              </h2>
              
              <div className="flex flex-col gap-5">
                <p className="text-[22px] text-[var(--text-secondary)] leading-[1.7] font-[400]">
                  Welcome to Shanky Group, a dynamic conglomerate that has been at the forefront of innovation and excellence across multiple industries. Founded with a vision to create sustainable value and drive positive change, we have grown into a trusted name that embodies integrity, quality, and forward-thinking solutions.
                </p>
                
                <p className="text-[22px] text-[var(--text-secondary)] leading-[1.7] font-[400]">
                  Our diverse portfolio spans financial services, renewable energy, corporate training, construction, and metal industries, each contributing to our mission of delivering exceptional products and services that meet the evolving needs of our clients and communities.
                </p>
              </div>
            </div>
          </div>

          {/* Counting Section */}
          <div className="mt-25 mb-20 px-[80px]">
            <div className={`transition-all duration-800 ease-out delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
            }`}>
              <h2 className="text-[36px] font-[700] text-[var(--text-primary)] mb-15 text-center font-['Montserrat','Arial','sans-serif']">
                Our Achievements
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Years of Excellence */}
                <div className="text-center p-10 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-br from-[#3b82f6] to-[#10b981]" />
                  <div className="text-[48px] font-[800] text-[#3b82f6] mb-3 font-['Montserrat','Arial','sans-serif'] leading-none">
                    {yearsCount}+
                  </div>
                  <div className="text-[16px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                    Years of Excellence
                  </div>
                </div>

                {/* Business Sectors */}
                <div className="text-center p-10 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-br from-[#10b981] to-[#06b6d4]" />
                  <div className="text-[48px] font-[800] text-[#10b981] mb-3 font-['Montserrat','Arial','sans-serif'] leading-none">
                    {sectorsCount}+
                  </div>
                  <div className="text-[16px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                    Business Sectors
                  </div>
                </div>

                {/* Employees */}
                <div className="text-center p-10 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-br from-[#06b6d4] to-[#8b5cf6]" />
                  <div className="text-[48px] font-[800] text-[#06b6d4] mb-3 font-['Montserrat','Arial','sans-serif'] leading-none">
                    {employeesCount}+
                  </div>
                  <div className="text-[16px] font-[600] text-[var(--text-secondary)] font-['Lato','Arial','sans-serif']">
                    Employees
                  </div>
                </div>

                {/* Projects Completed */}
                <div className="text-center p-10 bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899]" />
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