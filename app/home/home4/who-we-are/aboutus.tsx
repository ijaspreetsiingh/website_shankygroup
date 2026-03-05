'use client';

import React, { useState, useEffect, useRef } from "react";
import { useI18n } from '../../../i18n/I18nProvider';

const WhatWeDo = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showReadMoreContent, setShowReadMoreContent] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

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

  const renderProgressiveBoldText = (text: string) => {
    const words = text.split(' ');
    const totalWords = words.length;
    
    return words.map((word, index) => {
      // Ultra-fast bold effect - covers all words quickly
      const wordProgress = Math.max(0, Math.min(1, (scrollProgress * totalWords * 4 - index) / 1.2));
      const fontWeight = 400 + (400 * wordProgress); // Max weight 800
      const opacity = 0.5 + (0.5 * wordProgress); // More dramatic opacity change
      
      return (
        <span
          key={index}
          style={{
            fontWeight: fontWeight,
            opacity: opacity,
            transition: 'font-weight 0.15s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            color: 'var(--text-primary)'
          }}
          className="inline-block mr-1"
        >
          {word}
        </span>
      );
    });
  };

  const companies = [
    {
      id: 1,
      name: "SHANKY FINANCIAL SERVICES PVT LTD",
      shortName: "SHANKY FINANCIAL SERVICES PVT LTD",
      category: "Financial Services",
      categoryColor: "#6B9F3E",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "Operating alongside its namesake, Shanky Financial Services Pvt Ltd focuses on specialized financial intermediation activities, including investment in securities and proprietary trading. The company's operations are aligned with the Group's broader financial services strategy, enabling cross-selling opportunities and operational efficiencies. Its compliance with the Ministry of Corporate Affairs' regulatory requirements underscores its commitment to governance and transparency.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=500&fit=crop&q=80"
    },
    {
      id: 2,
      name: "VMS HUB PVT LTD",
      shortName: "VMS HUB PVT LTD",
      category: "Agro Products",
      categoryColor: "#9B59B6",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "VMS Hub Pvt Ltd is the Group's newest venture, established to capitalize on the growing demand for food and agricultural products in India. The company is engaged in the wholesale distribution of agricultural raw materials and food products, leveraging advanced supply chain management and quality assurance systems. With an authorized share capital of ₹16.5 crore, VMS Hub is well-positioned to scale its operations and expand its market reach. VMS Hub's strategic focus includes sourcing high-quality products, building robust distribution networks, and fostering partnerships with farmers and suppliers. The company's operations are designed to ensure food safety, traceability, and customer satisfaction, aligning with the Group's commitment to excellence and sustainability.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop&q=80"
    },
    {
      id: 3,
      name: "SHANKY SMART TECH PVT LTD",
      shortName: "SHANKY SMART TECH PVT LTD",
      category: "Solar EPC and Electronics",
      categoryColor: "#9B59B6",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "Shanky Smart Tech Pvt Ltd operates at the intersection of renewable energy and electronics, offering end-to-end solutions in solar engineering, procurement, and construction (EPC), as well as trading and servicing of electronic products. The company's offerings include solar panel installation, energy management systems, and smart technology integration for industrial and commercial clients. With an authorized share capital of ₹5 lakh, the company is poised for rapid growth in the burgeoning solar and electronics markets. Shanky Smart Tech leverages cutting-edge technologies such as IoT, AI, and digital twins to enhance project efficiency, sustainability, and cost-effectiveness. The company's focus on green building certifications, renewable energy integration, and smart construction practices positions it as a leader in sustainable EPC solutions.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop&q=80"
    },
    {
      id: 4,
      name: "SHANKY CORPORATE TRAINING PVT LTD",
      shortName: "SHANKY CORPORATE TRAINING PVT LTD",
      category: "Corporate Trainings",
      categoryColor: "#E67E22",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "Shanky Corporate Training Pvt Ltd is the Group's dedicated arm for educational and corporate training services. The company offers a comprehensive suite of training programs, including leadership development, soft skills, technical training, and organizational development. Its clientele includes corporates, educational institutions, and government agencies seeking to enhance workforce capabilities and drive organizational excellence. The company's training solutions are designed to address evolving industry needs, leveraging experienced trainers, customized curricula, and digital learning platforms. Shanky Corporate Training's commitment to quality and innovation has positioned it as a preferred partner for talent development and capacity building.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop&q=80"
    },
    {
      id: 5,
      name: "SHANKY BUILDTECH PVT LTD",
      shortName: "SHANKY BUILDTECH PVT LTD",
      category: "Infrastructure and Construction",
      categoryColor: "#3498DB",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "Shanky Build Tech Pvt Ltd is the Group's infrastructure and construction arm, specializing in the development and completion of residential, commercial, and industrial projects. The company's expertise spans building completion, repairs, and finishing works, with a focus on quality, safety, and sustainability. Its operations are supported by a team of experienced engineers, project managers, and skilled workers, ensuring timely and cost-effective project delivery. Shanky Build Tech adopts smart construction practices, leveraging digital project management tools, modular construction techniques, and green building certifications to enhance project outcomes. The company's commitment to sustainability and resource optimization aligns with global best practices in the EPC sector.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop&q=80"
    },
    {
      id: 6,
      name: "SHANKY METALS PVT LTD",
      shortName: "SHANKY METALS PVT LTD",
      category: "Metal Trade Services",
      categoryColor: "#7F8C8D",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "Shanky Metals Pvt Ltd is a leading player in the metals trading and manufacturing sector. The company specializes in the procurement, processing, and trading of a wide range of metals, including aluminium, copper, brass, iron, and steel. Its operations encompass sourcing raw materials from domestic and international suppliers, processing them into finished products, and exporting to global markets, particularly Hong Kong and other Asian countries. With an authorized share capital of ₹75 lakh and a paid-up capital of ₹70 lakh, Shanky Metals has demonstrated robust financial performance, generating a revenue of ₹7.16 crore for the financial year ending March 31, 2024. The company's focus on quality, timely delivery, and customer satisfaction has enabled it to build long-term relationships with clients and partners.",
      image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=500&fit=crop&q=80"
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
    
    // This specific card should hide if another card in the SAME row is expanded (Desktop only)
    const shouldHide = isAnyCardInRowExpanded && !isExpanded;
    
    const cardDelay = (index % 3) * 0.15;
    
    return (
      <div
        key={company.id}
        onMouseEnter={() => {
          if (window.innerWidth >= 768) {
            setSelectedCard(index);
          }
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 768) {
            setSelectedCard(null);
          }
        }}
        onTouchStart={() => {
          if (window.innerWidth < 768) {
            setSelectedCard(selectedCard === index ? null : index);
          }
        }}
        className={`relative transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden cursor-pointer group
          w-full min-w-0 max-w-full md:flex-1 md:mx-0.5 md:my-0.5
          ${isExpanded ? 'h-[82vh] min-h-[420px] sm:min-h-[480px] md:min-h-0 md:h-[550px] md:w-full md:flex-none md:basis-full z-50 md:scale-[1.03]' : 'h-[300px] sm:h-[320px] md:h-[350px] md:basis-1/3 hover:z-30 md:hover:scale-[1.02]'}
          ${shouldHide ? 'md:w-0 md:basis-0 md:opacity-0 md:pointer-events-none md:scale-90' : 'opacity-100'}
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[80px] opacity-0'}
        `}
        style={{
          transitionDelay: isVisible && !isExpanded ? `${cardDelay}s` : '0s',
        }}
      >
        {/* Glass Card Body */}
        <div 
          className="relative h-full w-full min-w-0 rounded-2xl sm:rounded-[24px] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rounded-[18px]"
          style={{
            background: `linear-gradient(135deg, ${company.categoryColor}08 0%, ${company.categoryColor}03 100%)`,
            boxShadow: `0 8px 32px ${company.categoryColor}15`,
          }}
        >
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] transition-opacity duration-700"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${company.categoryColor} 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          />

          {/* Default State - Beautiful Card Design */}
          <div className={`absolute inset-0 transition-all duration-700 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Image Background with Gradient */}
            <div 
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
              style={{ 
                backgroundImage: `url(${company.image})`,
                filter: 'brightness(0.6) saturate(1.4)',
              }}
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div 
              className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
              style={{ 
                background: `linear-gradient(135deg, ${company.categoryColor}40 0%, transparent 50%, ${company.categoryColor}30 100%)` 
              }}
            />

            {/* Floating Category Badge - full text visible on mobile */}
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20">
              <div 
                className="inline-block px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-full text-white text-[9px] sm:text-xs font-bold tracking-[0.5px] sm:tracking-[1.5px] uppercase shadow-lg backdrop-blur-sm text-right sm:text-center leading-tight sm:leading-normal whitespace-normal sm:whitespace-nowrap max-w-[120px] sm:max-w-none"
                style={{
                  background: `linear-gradient(135deg, ${company.categoryColor} 0%, ${company.categoryColor}dd 100%)`,
                  boxShadow: `0 8px 32px ${company.categoryColor}40, inset 0 0 20px rgba(255,255,255,0.3)`,
                }}
              >
                {company.category}
              </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10">
              {/* Company Number */}
              <div 
                className="text-4xl sm:text-5xl md:text-7xl font-black mb-2 sm:mb-4 opacity-30 transition-all duration-700 group-hover:opacity-40 md:group-hover:translate-x-2"
                style={{ 
                  color: company.categoryColor,
                  fontFamily: 'serif',
                  lineHeight: 1,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
              
              {/* Company Name – same font as site headings (Syne professional) */}
              <h3 className="section-heading text-lg sm:text-xl md:text-3xl font-bold text-white mb-2 sm:mb-3 leading-[1.15] tracking-[0.5px] sm:tracking-[1px] uppercase transition-all duration-400 group-hover:translate-y-[-3px] md:group-hover:scale-102 line-clamp-2 sm:line-clamp-none">
                {company.shortName}
              </h3>
              
              {/* Accent Line */}
              <div 
                className="w-12 h-1 sm:w-16 sm:h-1.5 rounded-full mb-2 sm:mb-4 transition-all duration-600 group-hover:w-28 group-hover:h-2"
                style={{
                  background: `linear-gradient(90deg, ${company.categoryColor} 0%, ${company.categoryColor}cc 100%)`,
                  boxShadow: `0 0 20px ${company.categoryColor}80`,
                }}
              />

              {/* Legal Structure - desktop hover only */}
              <div className="hidden md:block text-white/90 text-sm font-semibold tracking-[0.5px] uppercase opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                {company.legalStructure}
              </div>
            </div>
          </div>

          {/* Expanded State - Premium Layout */}
          {isExpanded && (
            <div className="flex flex-col md:flex-row h-full w-full min-w-0 overflow-hidden">
              {/* Left Side - Premium Image - slightly shorter on mobile so content + button get more space */}
              <div className="relative h-[160px] sm:h-[200px] md:h-full md:flex-[0_0_45%] overflow-hidden flex-shrink-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ 
                    backgroundImage: `url(${company.image})`,
                    transform: 'scale(1.1)',
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${company.categoryColor}20 0%, transparent 50%)` 
                    }}
                  />
                </div>

                {/* Company Number Overlay */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <div 
                    className="text-5xl sm:text-6xl md:text-8xl font-black opacity-10"
                    style={{ 
                      color: company.categoryColor,
                      fontFamily: 'serif',
                      lineHeight: 1,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Floating Category Badge - full text on mobile */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                  <div 
                    className="inline-block px-3 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-full text-white text-[10px] sm:text-sm font-bold tracking-[0.5px] sm:tracking-[1.5px] uppercase shadow-xl backdrop-blur-sm text-right sm:text-center leading-tight sm:leading-normal whitespace-normal sm:whitespace-nowrap max-w-[140px] sm:max-w-none"
                    style={{
                      background: `linear-gradient(135deg, ${company.categoryColor} 0%, ${company.categoryColor}dd 100%)`,
                      boxShadow: `0 12px 40px ${company.categoryColor}50, inset 0 0 30px rgba(255,255,255,0.3)`,
                    }}
                  >
                    {company.category}
                  </div>
                </div>
              </div>

              {/* Right Side - On mobile: scrollable content + sticky Learn More button at bottom */}
              <div 
                className="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, var(--card-bg) 0%, var(--card-bg) 95%, ${company.categoryColor}05 100%)`,
                }}
              >
                {/* Scrollable content - only this part scrolls on mobile */}
                <div 
                  className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-12 pb-4 sm:pb-6 md:pb-8 scrollbar-hide" 
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style jsx>{`
                    .scrollbar-hide::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                {/* Company Header – same font as site headings (Syne professional) */}
                <div className="mb-4 sm:mb-8">
                  <h3 className="section-heading text-xl sm:text-2xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4 leading-[1.15] tracking-[0.5px] sm:tracking-[1px] uppercase break-words">
                    {company.name}
                  </h3>
                  
                  {/* Premium Accent Line */}
                  <div 
                    className="w-20 h-1 sm:w-32 sm:h-1.5 rounded-full mb-4 sm:mb-6"
                    style={{
                      background: `linear-gradient(90deg, ${company.categoryColor} 0%, ${company.categoryColor}cc 100%)`,
                      boxShadow: `0 0 30px ${company.categoryColor}60, 0 0 15px ${company.categoryColor}40`,
                    }}
                  />
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-8">
                  <div 
                    className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${company.categoryColor}08 0%, ${company.categoryColor}03 100%)`,
                      borderColor: `${company.categoryColor}20`,
                      boxShadow: `0 8px 32px ${company.categoryColor}10`,
                    }}
                  >
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div 
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3 flex-shrink-0"
                        style={{ backgroundColor: company.categoryColor }}
                      />
                      <div className="text-[10px] sm:text-xs font-bold tracking-[1.5px] sm:tracking-[2px] uppercase opacity-80 min-w-0" style={{ color: company.categoryColor }}>
                        Legal Structure
                      </div>
                    </div>
                    <div className="text-sm sm:text-lg font-semibold text-[var(--text-primary)] leading-[1.35] break-words">
                      {company.legalStructure}
                    </div>
                  </div>

                  <div 
                    className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${company.categoryColor}08 0%, ${company.categoryColor}03 100%)`,
                      borderColor: `${company.categoryColor}20`,
                      boxShadow: `0 8px 32px ${company.categoryColor}10`,
                    }}
                  >
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div 
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3 flex-shrink-0"
                        style={{ backgroundColor: company.categoryColor }}
                      />
                      <div className="text-[10px] sm:text-xs font-bold tracking-[1.5px] sm:tracking-[2px] uppercase opacity-80 min-w-0" style={{ color: company.categoryColor }}>
                        Key Leadership
                      </div>
                    </div>
                    <div className="text-sm sm:text-lg font-semibold text-[var(--text-primary)] leading-[1.35] break-words">
                      {company.keyPeople.split(':')[1]}
                    </div>
                  </div>
                </div>

                {/* Description Card */}
                <div 
                  className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, var(--card-bg) 0%, ${company.categoryColor}05 100%)`,
                    border: `1px solid var(--card-border)`,
                    boxShadow: `0 8px 32px rgba(0,0,0,0.08)`,
                  }}
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div 
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3 flex-shrink-0"
                      style={{ backgroundColor: company.categoryColor }}
                    />
                    <div className="text-[10px] sm:text-xs font-bold tracking-[1.5px] sm:tracking-[2px] uppercase opacity-80" style={{ color: company.categoryColor }}>
                      Company Overview
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-[1.7] sm:leading-[1.8] font-normal tracking-[0.2px] text-justify break-words">
                    {company.description}
                  </p>
                </div>

                {/* Desktop only: button at end of scroll */}
                <div className="mt-6 sm:mt-8 text-center hidden md:block">
                  <button
                    className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-white text-sm sm:text-base font-bold tracking-[0.5px] sm:tracking-[1px] uppercase transition-all duration-300 hover:scale-102 hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${company.categoryColor} 0%, ${company.categoryColor}dd 100%)`,
                      boxShadow: `0 8px 32px ${company.categoryColor}40, inset 0 0 20px rgba(255,255,255,0.3)`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`/company/${company.id.toString().toLowerCase().replace(/\s+/g, '-')}`, '_blank');
                    }}
                  >
                    Learn More
                  </button>
                </div>
                </div>

                {/* Mobile/tablet: sticky Learn More button - always visible at bottom */}
                <div className="flex-shrink-0 p-4 pt-3 pb-5 sm:p-6 sm:pt-4 sm:pb-6 text-center border-t border-[var(--card-border)]/30 md:hidden">
                  <button
                    className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-white text-sm sm:text-base font-bold tracking-[0.5px] sm:tracking-[1px] uppercase transition-all duration-300 hover:scale-102 hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${company.categoryColor} 0%, ${company.categoryColor}dd 100%)`,
                      boxShadow: `0 8px 32px ${company.categoryColor}40, inset 0 0 20px rgba(255,255,255,0.3)`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`/company/${company.id.toString().toLowerCase().replace(/\s+/g, '-')}`, '_blank');
                    }}
                  >
                    Learn More
                  </button>
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
      className="p-0 bg-[var(--background)] font-sans m-0 overflow-x-hidden overflow-y-visible relative"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(circle_at_50%_50%,var(--text-primary)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      {/* Header Section */}
      <div className="max-w-[1600px] mx-auto px-4 py-8 sm:px-6 sm:py-12 md:p-[100px_60px_80px]">
        <div 
          className="text-center mb-6 sm:mb-8 md:mb-[60px] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] delay-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) translateX(0)' : 'translateY(50px) translateX(-30px)',
          }}
        >
          <h2 className="section-heading hero-legacy-heading text-[28px] sm:text-[32px] md:text-[56px] font-bold text-[var(--text-primary)] m-0 mb-4 sm:mb-[30px] tracking-[3px] sm:tracking-[5px] md:tracking-[10px] leading-[1.1] uppercase px-1">
            {(() => {
              const full = t('group_of_companies');
              const words = full.split(/\s+/);
              const firstWord = words[0] || '';
              const rest = words.slice(1).join(' ');
              return (
                <>
                  <span style={{ color: '#e63a27' }}>{firstWord}</span>
                  {rest ? ` ${rest}` : ''}
                </>
              );
            })()}
          </h2>
          <p className="section-subheading text-[19px] sm:text-[20px] md:text-[22px] leading-[1.6] sm:leading-[1.7] text-[var(--text-primary)] max-w-[1100px] mx-auto mb-6 sm:mb-[40px] font-normal tracking-[0.3px] px-0 sm:px-2">
           {renderProgressiveBoldText(t('group_description'))}
          </p>
          
          <div className="text-center mt-6 sm:mt-[40px]">
            <button
              type="button"
              onClick={() => setShowReadMoreContent(prev => !prev)}
              className="inline-flex items-center gap-2 sm:gap-[15px] px-6 py-3 sm:px-[40px] sm:py-[18px] text-[13px] sm:text-[15px] font-semibold tracking-[1px] sm:tracking-[1.2px] uppercase text-white bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] dark:from-[#2a2a2a] dark:to-[#3a3a3a] border-none rounded-[28px] sm:rounded-[35px] cursor-pointer transition-all duration-400 shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-[3px] hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)] hover:from-[#2a2a2a] hover:to-[#3a3a3a] dark:hover:from-[#3a3a3a] dark:hover:to-[#4a4a4a]"
            >
              {showReadMoreContent ? t('read_less_capital') : t('read_more_capital')}
              <svg width="14" height="14" className={`sm:w-4 sm:h-4 flex-shrink-0 transition-transform duration-300 ${showReadMoreContent ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Read more expanded content - same card layout as Legacy & Leadership */}
          {showReadMoreContent && (
            <div className="mt-8 sm:mt-10 max-w-[1100px] mx-auto text-left px-2 sm:px-4">
              <h3 className="section-heading text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                Diversified Portfolio – Shanky Group
              </h3>
              <div className="w-12 h-0.5 bg-[#e63a27] rounded-full mb-5" />
              <p className="section-subheading text-[14px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-[1.7] mb-6 sm:mb-8 max-w-[900px]">
                Shanky Group&apos;s diversified portfolio comprises six core companies, each operating as a distinct legal entity with specialized expertise and a strong market presence. This structure reflects the Group&apos;s philosophy of combining operational independence with strategic cohesion.
              </p>
              {/* Row 1: two cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {[
                  { title: 'Operational Autonomy', text: 'Each company within the Group is empowered to pursue its own growth trajectory, guided by sector-specific strategies and leadership. This autonomy ensures agility, innovation, and responsiveness to market dynamics.' },
                  { title: 'Intercompany Synergies', text: 'While independent, the companies are strategically interconnected. Shared resources, cross-sector collaboration, and integrated financial frameworks enable the Group to maximize efficiency and unlock new opportunities.' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl md:rounded-2xl p-6 sm:p-7 md:p-8 h-full flex flex-col"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    }}
                  >
                    <h4 className="section-heading text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-4 m-0">
                      {item.title}
                    </h4>
                    <p className="section-subheading text-sm sm:text-[15px] text-[var(--text-secondary)] leading-[1.7] m-0">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              {/* Row 2: two cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
                {[
                  { title: 'Resource Optimization', text: 'Centralized oversight of capital, talent, and technology allows Shanky Group to allocate resources effectively across its subsidiaries. This ensures risk mitigation, cost efficiency, and sustainable expansion.' },
                  { title: 'Strategic Balance', text: "The Group's structure balances entrepreneurial freedom with corporate governance. This dual approach fosters accountability while encouraging innovation, positioning Shanky Group as a resilient and future-ready conglomerate." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl md:rounded-2xl p-6 sm:p-7 md:p-8 h-full flex flex-col"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    }}
                  >
                    <h4 className="section-heading text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-4 m-0">
                      {item.title}
                    </h4>
                    <p className="section-subheading text-sm sm:text-[15px] text-[var(--text-secondary)] leading-[1.7] m-0">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              {/* Row 3: one full-width card */}
              <div
                className="mt-6 md:mt-8 rounded-xl md:rounded-2xl p-6 sm:p-7 md:p-8"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
              >
                <h4 className="section-heading text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-4 m-0">
                  Market Leadership
                </h4>
                <p className="section-subheading text-sm sm:text-[15px] text-[var(--text-secondary)] leading-[1.7] m-0">
                  By leveraging its diversified presence across electronics, metals, financial services, technology, corporate training, and renewable energy, Shanky Group continues to strengthen its reputation as a trusted partner for clients and investors alike.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cards Container */}
      <div className="max-w-[1800px] mx-auto px-4 pb-8 sm:px-6 sm:pb-16 md:px-[60px] md:pb-[120px]">
        {/* Top Row - Mobile: single column, clear gap so each card fully visible */}
        <div className={`flex flex-col md:flex-row gap-6 sm:gap-6 md:gap-0 mb-6 sm:mb-5 md:mb-0 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] justify-start ${
          selectedCard !== null && selectedCard < 3 ? 'md:mb-[80px]' : ''
        }`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-50px)' }}>
          {topRow.map((company, index) => renderCard(company, index, 0))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-6 md:gap-0 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] justify-start" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(50px)' }}>
          {bottomRow.map((company, index) => renderCard(company, index + 3, 3))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
