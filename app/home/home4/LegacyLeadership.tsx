'use client';

import { useState, useEffect, useRef } from "react";

const LegacyLeadership = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Add custom styles for animation delays
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ping-slow {
        0% { transform: scale(1); opacity: 1; }
        75%, 100% { transform: scale(1.5); opacity: 0; }
      }
      .animation-delay-200 { animation-delay: 0.2s; }
      .animation-delay-400 { animation-delay: 0.4s; }
      .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

  return (
    <section 
      ref={sectionRef}
      className="p-0 bg-[var(--background)] font-sans w-full"
    >
      {/* Simple Heading Section */}
      <div 
        className={`text-center px-[20px] py-[40px] md:px-[40px] md:py-[80px_40px_60px] bg-[var(--background)] transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)] delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
      >
        <h2 className="text-[24px] md:text-[42px] font-semibold text-[var(--text-primary)] m-0 mb-[16px] tracking-[1px] leading-[1.2]">
          Legacy & Leadership
        </h2>
        <div className="w-[80px] h-[4px] bg-[#e63a27] mx-auto mb-[24px] rounded-[2px]" />
        <p className="text-[16px] md:text-[18px] text-[var(--text-secondary)] font-normal tracking-[0.5px] max-w-[600px] mx-auto">
          Building a legacy of excellence and leadership for generations
        </p>
      </div>

      
      {/* Full Width Two Video Cards Grid with Staggered Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full m-0">
        {/* Video Card 1 - Historical Journey */}
        <div
          className={`relative h-[350px] md:h-[500px] overflow-hidden cursor-pointer bg-[var(--card-bg)] transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] delay-400
            ${isVisible ? 'opacity-100' : 'opacity-0'}
            ${hoveredIndex === 0 ? 'scale-[1.01]' : isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-[20px]'}
          `}
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => playingVideo === 'dQw4w9WgXcQ' ? setPlayingVideo(null) : null}
        >
          {/* Video Container - Inline YouTube */}
          <div className="relative w-full h-full">
            {playingVideo === 'dQw4w9WgXcQ' ? (
              <iframe
                className="absolute inset-0 w-full h-full border-none"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Historical Journey Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80"
                  alt="Historical Journey Banner"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Ultra Attractive Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="group relative w-24 h-24 bg-transparent rounded-full flex items-center justify-center transition-all duration-700 cursor-pointer transform hover:scale-125 hover:rotate-12"
                    onClick={() => setPlayingVideo('dQw4w9WgXcQ')}
                  >
                    {/* Multiple glow layers - black/white */}
                    <div className="absolute inset-0 bg-black/20 rounded-full blur-2xl opacity-60 group-hover:opacity-80 scale-110 transition-all duration-700"></div>
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-xl opacity-40 group-hover:opacity-60 scale-105 transition-all duration-700"></div>
                    
                    {/* Pulsing rings with custom animation - black/white */}
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping-slow"></div>
                    <div className="absolute inset-2 rounded-full border-2 border-white/25 animate-ping-slow animation-delay-200"></div>
                    <div className="absolute inset-4 rounded-full border border-white/20 animate-ping-slow animation-delay-400"></div>
                    
                    {/* Inner circle - transparent with border */}
                    <div className="absolute inset-2 bg-transparent rounded-full border-2 border-white shadow-inner"></div>
                    
                    {/* Play icon - black/white */}
                    <svg className="w-12 h-12 text-white relative z-10 ml-2 drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    
                    {/* Hover shine effect - white */}
                    <div className="absolute top-2 left-2 w-4 h-4 bg-white/40 rounded-full blur-sm group-hover:bg-white/60 transition-all duration-700"></div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Dark Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/30 to-black/10 pointer-events-none" />

          {/* Text Content */}
          <div className="absolute bottom-[30px] md:bottom-[50px] left-[30px] md:left-[50px] right-[30px] md:right-[50px] text-white z-[2]">
            <h3 className="text-[18px] md:text-[24px] font-normal m-0 mb-[20px] leading-[1.4] tracking-[0.5px]">
              Establishing a foundation of success
            </h3>
            
            <a 
              href="#"
              className="group inline-flex items-center gap-[8px] hover:gap-[12px] text-[14px] text-white no-underline font-normal tracking-[0.3px] transition-all duration-300"
            >
              Watch Full Story
              <span className="text-[16px] inline-block">
                ▶
              </span>
            </a>
          </div>
        </div>

        {/* Video Card 2 - Chairman's Speech */}
        <div
          className={`relative h-[350px] md:h-[500px] overflow-hidden cursor-pointer bg-[var(--card-bg)] transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] delay-600
            ${isVisible ? 'opacity-100' : 'opacity-0'}
            ${hoveredIndex === 1 ? 'scale-[1.01]' : isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-[20px]'}
          `}
          onMouseEnter={() => setHoveredIndex(1)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => playingVideo === '9bZkp7q19f0' ? setPlayingVideo(null) : null}
        >
          {/* Video Container - Inline YouTube */}
          <div className="relative w-full h-full">
            {playingVideo === '9bZkp7q19f0' ? (
              <iframe
                className="absolute inset-0 w-full h-full border-none"
                src="https://www.youtube.com/embed/9bZkp7q19f0?autoplay=1"
                title="Chairman's Speech Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
                  alt="Chairman's Speech Banner"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Ultra Attractive Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="group relative w-24 h-24 bg-transparent rounded-full flex items-center justify-center transition-all duration-700 cursor-pointer transform hover:scale-125 hover:rotate-12"
                    onClick={() => setPlayingVideo('9bZkp7q19f0')}
                  >
                    {/* Multiple glow layers - black/white */}
                    <div className="absolute inset-0 bg-black/20 rounded-full blur-2xl opacity-60 group-hover:opacity-80 scale-110 transition-all duration-700"></div>
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-xl opacity-40 group-hover:opacity-60 scale-105 transition-all duration-700"></div>
                    
                    {/* Pulsing rings with custom animation - black/white */}
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping-slow"></div>
                    <div className="absolute inset-2 rounded-full border-2 border-white/25 animate-ping-slow animation-delay-200"></div>
                    <div className="absolute inset-4 rounded-full border border-white/20 animate-ping-slow animation-delay-400"></div>
                    
                    {/* Inner circle - transparent with border */}
                    <div className="absolute inset-2 bg-transparent rounded-full border-2 border-white shadow-inner"></div>
                    
                    {/* Play icon - black/white */}
                    <svg className="w-12 h-12 text-white relative z-10 ml-2 drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    
                    {/* Hover shine effect - white */}
                    <div className="absolute top-2 left-2 w-4 h-4 bg-white/40 rounded-full blur-sm group-hover:bg-white/60 transition-all duration-700"></div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Dark Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/30 to-black/10 pointer-events-none" />

          {/* Text Content */}
          <div className="absolute bottom-[30px] md:bottom-[50px] left-[30px] md:left-[50px] right-[30px] md:right-[50px] text-white z-[2]">
            <h3 className="text-[18px] md:text-[19px] font-normal m-0 mb-[20px] leading-[1.5] tracking-[0.3px]">
              Chairman, Mr. Kumar Mangalam Birla's speech at 78th AGM of Grasim Industries Limited
            </h3>
            
            <a 
              href="#"
              className="group inline-flex items-center gap-[8px] hover:gap-[12px] text-[14px] text-white no-underline font-normal tracking-[0.3px] transition-all duration-300"
            >
              Watch Full Speech
              <span className="text-[16px] inline-block">
                ▶
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacyLeadership;
