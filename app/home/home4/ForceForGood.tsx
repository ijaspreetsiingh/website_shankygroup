'use client';

import { useState, useEffect, useRef } from "react";

const ForceForGood = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
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
    <section ref={sectionRef} className="w-full h-[50vh] min-h-[320px] md:h-screen md:min-h-[600px] relative overflow-hidden bg-[var(--background)]">
      {/* Background Image - Futuristic City Skyline */}
      <div 
        className={`absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-[3000ms] ease-[cubic-bezier(0.23,1,0.32,1)] brightness-75 contrast-105 scale-100`}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop)',
          transform: isVisible ? 'scale(1)' : 'scale(1.1)',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Subtle Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--background)]/15 to-[var(--background)]/25 pointer-events-none" />

      {/* Content Container */}
      <div 
        className="absolute text-center z-[2] transition-all duration-1200 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          top: '50%',
          left: '50%',
          transform: isVisible ? 'translate(-50%, -50%)' : 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '900px',
          padding: '0 30px',
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Title: Legacy (red) & Leadership (white) */}
        <h1 
          className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold m-0 mb-4 md:mb-5 leading-[1.2] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
          }}
        >
          <span className="text-[#e63a27]">Legacy</span>
          <span className="text-white"> & Leadership</span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-base sm:text-lg md:text-xl text-white/95 max-w-[560px] mx-auto leading-relaxed m-0 transition-all duration-800 delay-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          Building a legacy of excellence and leadership for generations
        </p>
      </div>
    </section>
  );
};

export default ForceForGood;
