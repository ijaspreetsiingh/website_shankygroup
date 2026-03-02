'use client';

import React, { useState, useEffect, useRef } from "react";
import { useI18n } from '../../../i18n/I18nProvider';

const WhatWeDo = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
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
      shortName: "Financial Services through B2B",
      category: "Financial Services",
      categoryColor: "#6B9F3E",
      legalStructure: "Private Limited Company",
      keyPeople: "Proprietor: Vipin Kumar",
      description: "Shanky Financial Services is the Group's flagship entity in the financial services sector. The company offers a comprehensive suite of financial intermediation services, including investment advisory, securities dealing, and fund distribution.",
      image: "https://happay.com/blog/wp-content/uploads/sites/12/2023/07/financial-assets-scaled.webp"
    },
    {
      id: 2,
      name: "SHANKY FINANCIAL SERVICES PVT LTD",
      shortName: "Financial Advisory",
      category: "Financial Services",
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
      category: "Food & Agribusiness",
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
      category: "Solar & Electronics",
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
      category: "Electronics Trading",
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
      category: "Education & Training",
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
          w-full md:flex-1 md:mx-0.5 md:my-0.5
          ${isExpanded ? 'h-[600px] md:h-[550px] md:w-full md:flex-none md:basis-full z-50 scale-[1.03]' : 'h-[320px] md:h-[350px] md:basis-1/3 hover:z-30 hover:scale-[1.02]'}
          ${shouldHide ? 'md:w-0 md:basis-0 md:opacity-0 md:pointer-events-none md:scale-90' : 'opacity-100'}
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[80px] opacity-0'}
        `}
        style={{
          transitionDelay: isVisible && !isExpanded ? `${cardDelay}s` : '0s',
        }}
      >
        {/* Glass Card Body */}
        <div 
          className="relative h-full rounded-[24px] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rounded-[18px]"
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

            {/* Floating Category Badge */}
            <div className="absolute top-6 right-6 z-20">
              <div 
                className="px-4 py-2 rounded-full text-white text-xs font-bold tracking-[1.5px] uppercase shadow-lg backdrop-blur-sm transition-all duration-400 group-hover:scale-105 group-hover:shadow-xl group-hover:rotate-3"
                style={{
                  background: `linear-gradient(135deg, ${company.categoryColor} 0%, ${company.categoryColor}dd 100%)`,
                  boxShadow: `0 8px 32px ${company.categoryColor}40, inset 0 0 20px rgba(255,255,255,0.3)`,
                }}
              >
                {company.category}
              </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              {/* Company Number */}
              <div 
                className="text-6xl md:text-7xl font-black mb-4 opacity-30 transition-all duration-700 group-hover:opacity-40 group-hover:translate-x-2"
                style={{ 
                  color: company.categoryColor,
                  fontFamily: 'serif',
                  lineHeight: 1,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
              
              {/* Company Name */}
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-[1.1] tracking-[1px] uppercase transition-all duration-400 group-hover:translate-y-[-3px] group-hover:scale-102">
                {company.shortName}
              </h3>
              
              {/* Accent Line */}
              <div 
                className="w-16 h-1.5 rounded-full mb-4 transition-all duration-600 group-hover:w-28 group-hover:h-2"
                style={{
                  background: `linear-gradient(90deg, ${company.categoryColor} 0%, ${company.categoryColor}cc 100%)`,
                  boxShadow: `0 0 20px ${company.categoryColor}80`,
                }}
              />

              {/* Legal Structure */}
              <div className="text-white/90 text-sm font-semibold tracking-[0.5px] uppercase opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                {company.legalStructure}
              </div>
            </div>
          </div>

          {/* Expanded State - Premium Layout */}
          {isExpanded && (
            <div className="flex flex-col md:flex-row h-full animate-[fadeIn_0.8s_ease-out_forwards]">
              {/* Left Side - Premium Image */}
              <div className="relative h-[280px] md:h-full md:flex-[0_0_45%] overflow-hidden">
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
                <div className="absolute top-6 left-6">
                  <div 
                    className="text-8xl font-black opacity-10"
                    style={{ 
                      color: company.categoryColor,
                      fontFamily: 'serif',
                      lineHeight: 1,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Floating Category Badge */}
                <div className="absolute top-6 right-6">
                  <div 
                    className="px-5 py-3 rounded-full text-white text-sm font-bold tracking-[1.5px] uppercase shadow-xl backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(135deg, ${company.categoryColor} 0%, ${company.categoryColor}dd 100%)`,
                      boxShadow: `0 12px 40px ${company.categoryColor}50, inset 0 0 30px rgba(255,255,255,0.3)`,
                    }}
                  >
                    {company.category}
                  </div>
                </div>
              </div>

              {/* Right Side - Premium Content */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto scrollbar-hide" style={{ 
                background: `linear-gradient(135deg, var(--card-bg) 0%, var(--card-bg) 95%, ${company.categoryColor}05 100%)`,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}>
                <style jsx>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {/* Company Header */}
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-4 leading-[1.1] tracking-[1px] uppercase">
                    {company.name}
                  </h3>
                  
                  {/* Premium Accent Line */}
                  <div 
                    className="w-32 h-1.5 rounded-full mb-6"
                    style={{
                      background: `linear-gradient(90deg, ${company.categoryColor} 0%, ${company.categoryColor}cc 100%)`,
                      boxShadow: `0 0 30px ${company.categoryColor}60, 0 0 15px ${company.categoryColor}40`,
                    }}
                  />
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div 
                    className="group p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${company.categoryColor}08 0%, ${company.categoryColor}03 100%)`,
                      borderColor: `${company.categoryColor}20`,
                      boxShadow: `0 8px 32px ${company.categoryColor}10`,
                    }}
                  >
                    <div className="flex items-center mb-3">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: company.categoryColor }}
                      />
                      <div className="text-xs font-bold tracking-[2px] uppercase opacity-80" style={{ color: company.categoryColor }}>
                        Legal Structure
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-[var(--text-primary)] leading-[1.3]">
                      {company.legalStructure}
                    </div>
                  </div>

                  <div 
                    className="group p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${company.categoryColor}08 0%, ${company.categoryColor}03 100%)`,
                      borderColor: `${company.categoryColor}20`,
                      boxShadow: `0 8px 32px ${company.categoryColor}10`,
                    }}
                  >
                    <div className="flex items-center mb-3">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: company.categoryColor }}
                      />
                      <div className="text-xs font-bold tracking-[2px] uppercase opacity-80" style={{ color: company.categoryColor }}>
                        Key Leadership
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-[var(--text-primary)] leading-[1.3]">
                      {company.keyPeople.split(':')[1]}
                    </div>
                  </div>
                </div>

                {/* Description Card */}
                <div 
                  className="p-8 rounded-2xl transition-all duration-300 hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, var(--card-bg) 0%, ${company.categoryColor}05 100%)`,
                    border: `1px solid var(--card-border)`,
                    boxShadow: `0 8px 32px rgba(0,0,0,0.08)`,
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: company.categoryColor }}
                    />
                    <div className="text-xs font-bold tracking-[2px] uppercase opacity-80" style={{ color: company.categoryColor }}>
                      Company Overview
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] leading-[1.8] font-normal tracking-[0.2px] text-justify">
                    {company.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-8 text-center">
                  <button
                    className="px-8 py-4 rounded-full text-white font-bold tracking-[1px] uppercase transition-all duration-300 hover:scale-102 hover:shadow-xl"
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
      className="p-0 bg-[var(--background)] font-sans m-0 overflow-visible relative"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(circle_at_50%_50%,var(--text-primary)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      {/* Header Section */}
      <div className="max-w-[1600px] mx-auto p-[50px_20px] md:p-[100px_60px_80px]">
        <div 
          className="text-center mb-[40px] md:mb-[60px] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] delay-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) translateX(0)' : 'translateY(50px) translateX(-30px)',
          }}
        >
          <h2 className="text-[36px] md:text-[56px] font-normal text-[var(--text-primary)] m-0 mb-[30px] tracking-[5px] md:tracking-[10px] leading-[1.1] uppercase">
            {t('group_of_companies')}
          </h2>
          <p className="text-[18px] md:text-[28px] leading-[1.7] text-[var(--text-primary)] max-w-[1500px] mx-auto mb-[40px] font-normal tracking-[0.3px]">
           {renderProgressiveBoldText(t('group_description'))}
          </p>
          
          <div className="text-center mt-[40px]">
            <button
              className="inline-flex items-center gap-[15px] px-[40px] py-[18px] text-[15px] font-semibold tracking-[1.2px] uppercase text-white bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] dark:from-[#2a2a2a] dark:to-[#3a3a3a] border-none rounded-[35px] cursor-pointer transition-all duration-400 shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-[3px] hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)] hover:from-[#2a2a2a] hover:to-[#3a3a3a] dark:hover:from-[#3a3a3a] dark:hover:to-[#4a4a4a]"
            >
              {t('learn_more_capital')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div className="max-w-[1800px] mx-auto p-[0_20px_80px] md:p-[0_60px_120px]">
        {/* Top Row - Mobile: Vertical Flex, Desktop: Horizontal Flex */}
        <div className={`flex flex-col md:flex-row gap-[20px] md:gap-0 mb-[20px] md:mb-0 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] justify-start ${
          selectedCard !== null && selectedCard < 3 ? 'md:mb-[80px]' : ''
        }`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-50px)' }}>
          {topRow.map((company, index) => renderCard(company, index, 0))}
        </div>

        {/* Bottom Row - Mobile: Vertical Flex, Desktop: Horizontal Flex */}
        <div className="flex flex-col md:flex-row gap-[20px] md:gap-0 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] justify-start" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(50px)' }}>
          {bottomRow.map((company, index) => renderCard(company, index + 3, 3))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
