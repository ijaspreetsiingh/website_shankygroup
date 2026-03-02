'use client';
import React, { useState, useEffect } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { useI18n } from '../../i18n/I18nProvider';

const HeroHomeFour = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showRightText, setShowRightText] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const { t } = useI18n();

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

  // Show right text after Shanky Group typing completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRightText(true);
    }, 2000);
    
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
      backgroundImage: "/images/agro.png",
      sector: t('vms_hub')
    },
    {
      backgroundImage: "/images/metal.png",
      sector: t('shanky_metals')
    },
    {
      backgroundImage: "/images/contruction.png",
      sector: t('shanky_buildtech')
    },
    {
      backgroundImage: "/images/solar.png",
      sector: t('shanky_smart_tech')
    },
    {
      backgroundImage: "/images/traning1.png",
      sector: t('shanky_financial_services')
    },
    {
      backgroundImage: "/images/traning.png",
      sector: t('shanky_corporate_training')
    }
  ];

  // Handle slide change
  const handleSlideChange = (swiper: any) => {
    setPreviousIndex(activeIndex);
    setActiveIndex(swiper.realIndex);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <>
      
      
      <section className="mt-0 h-[70vh] md:h-[75vh] lg:h-[80vh] relative overflow-hidden px-4 md:px-8 lg:px-12 bg-[var(--background)]">

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
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat rounded-2xl"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.40), rgba(0,0,0,0.40)), url(${slide.backgroundImage})`
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dark overlay is now applied inside each slide to keep side paddings white in light mode */}

        {/* Content at Bottom Center */}
        <div className="absolute z-[2] w-full bottom-[60px] md:bottom-[80px] left-0 flex items-center justify-center px-5">
          <div className="flex flex-col md:flex-row items-center gap-[8px] md:gap-[25px] flex-nowrap max-w-[1200px] lg:max-w-[1400px] z-[10] justify-center text-center md:text-left">
            {/* Left Side - Fixed Text */}
            <div className="text-white flex-shrink-0">
              <h1 className="text-[clamp(24px,2vw,36px)] md:text-[clamp(27px,2.2vw,38px)] font-[800] leading-none tracking-[-0.5px] text-white font-['SF_Pro_Display','Helvetica_Neue',Arial,sans-serif] m-0 whitespace-nowrap uppercase opacity-95">
                {t('shanky_group')}
              </h1>
            </div>

            {/* Vertical Divider Line */}
            <div 
              className="w-[5px] bg-white flex-shrink-0 hidden md:block"
              style={{
                height: showRightText ? '38px' : '0',
                opacity: showRightText ? 1 : 0,
                animation: showRightText ? 'lineGrowVertical 0.5s ease-out forwards' : 'none',
                transition: 'opacity 0.3s ease-in'
              }}
            ></div>

            {/* Right Side - Changing Text - ALWAYS VISIBLE NOW */}
            <div 
              className="relative h-[32px] md:h-[38px] flex-grow max-w-[600px] lg:max-w-[800px] min-w-[250px] md:min-w-[300px] overflow-visible flex items-center justify-center md:justify-start"
              style={{
                opacity: showRightText ? 1 : 0,
                transition: 'opacity 0.5s ease-in'
              }}
            >
              {/* Old Text - Sliding Out */}
              {isTransitioning && (
                <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center md:justify-start">
                  <h2 
                    className="text-[clamp(14px,1.5vw,28px)] md:text-[clamp(16px,1.8vw,32px)] font-[300] leading-none tracking-[0.5px] text-white font-['SF_Pro_Display','Helvetica_Neue',Arial,sans-serif] m-0 uppercase whitespace-nowrap overflow-visible"
                    style={{
                      animation: 'slideOutRight 0.8s ease-out forwards'
                    }}
                  >
                    {heroSlides[previousIndex].sector}
                  </h2>
                </div>
              )}
              
              {/* New Text - Sliding In */}
              <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center md:justify-start">
                <h2 
                  className="text-[clamp(14px,1.5vw,28px)] md:text-[clamp(16px,1.8vw,32px)] font-[300] leading-none tracking-[0.5px] text-white font-['SF_Pro_Display','Helvetica_Neue',Arial,sans-serif] m-0 uppercase whitespace-nowrap overflow-visible"
                  style={{
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
