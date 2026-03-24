'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import I18nProvider from './i18n/I18nProvider';
import HeaderFour from './home/home4/HeaderFour';
import HeroHomeFour from './home/home4/HeroHomeFour';
import FooterFour from './home/home4/FooterFour';

const AboutHomeFour = dynamic(() => import('./home/home4/AboutHomeFour'));
const MediaSection = dynamic(() => import('./home/home4/who-we-are/aboutus'));
const ForceForGood = dynamic(() => import('./home/home4/ForceForGood'));
const LegacyLeadership = dynamic(() => import('./home/home4/LegacyLeadership'));
const GlobeDemo = dynamic(() => import('./home/home4/glob').then((mod) => mod.GlobeDemo));
const WorkWithUs = dynamic(() => import('./home/home4/work'));
const ContactUs = dynamic(() => import('./home/home4/ContactUs'));

// Visitor tracking component
const VisitorTracker = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      // Track only once per tab session and only after initial paint.
      if (sessionStorage.getItem('visitor_tracked') === '1') return;

      const visitorData = {
        ip: 'unknown',
        country: 'unknown',
        city: 'unknown',
        region: 'unknown',
        latitude: null,
        longitude: null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
        userAgent: navigator.userAgent,
        browser: getBrowserInfo(),
        os: getOSInfo(),
        screenResolution: `${screen.width}x${screen.height}`,
        language: navigator.language,
        referrer: document.referrer || 'direct',
        visitTime: new Date().toISOString()
      };

      try {
        await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          keepalive: true,
          body: JSON.stringify({
            action: 'track_visitor',
            visitor_data: visitorData
          })
        });
      } catch {
        // Silently ignore tracking failures for faster UX.
      }

      sessionStorage.setItem('visitor_tracked', '1');
    };

    const timer = window.setTimeout(trackVisitor, 2500);
    return () => window.clearTimeout(timer);
  }, []);

  // Helper functions to get browser and OS info
  const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    if (ua.indexOf('Chrome') > -1) return 'Chrome';
    if (ua.indexOf('Safari') > -1) return 'Safari';
    if (ua.indexOf('Firefox') > -1) return 'Firefox';
    if (ua.indexOf('Edge') > -1) return 'Edge';
    return 'Other';
  };

  const getOSInfo = () => {
    const ua = navigator.userAgent;
    if (ua.indexOf('Windows') > -1) return 'Windows';
    if (ua.indexOf('Mac') > -1) return 'macOS';
    if (ua.indexOf('Linux') > -1) return 'Linux';
    if (ua.indexOf('Android') > -1) return 'Android';
    if (ua.indexOf('iOS') > -1) return 'iOS';
    return 'Other';
  };

  return null; // This component doesn't render anything
};

// Original Branded Loader Component
const BarLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[var(--background)] z-[9999] flex flex-col items-center justify-center">
      {/* Logo/Brand Container */}
      <div className="text-center animate-[fadeIn_1s_ease-out]">
        {/* Company Logo */}
        <div className="mb-[30px] opacity-0 animate-[slideUp_1s_ease-out_0.1s_forwards,fadeIn_1s_ease-out_0.1s_forwards] flex items-center justify-center">
          <img 
            src="/images/new_logo_finalM.png" 
            alt="Shanky Group Logo"
            className="w-[clamp(80px,12vw,160px)] h-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-2xl"
          />
        </div>
        
        {/* Company Label - same font style as rest of site */}
        <div className="section-subheading text-[12px] font-medium text-[var(--text-secondary)] tracking-[3px] uppercase mb-[15px] opacity-0 animate-[slideUp_1s_ease-out_0.2s_forwards,fadeIn_1s_ease-out_0.2s_forwards]">
          Since 2011
        </div>
        
        {/* Shanky Group – same font as Legacy & Leadership / Group of Companies (Syne professional) */}
        <h1 className="section-heading hero-legacy-heading text-[clamp(48px,6vw,96px)] font-bold text-[var(--text-primary)] m-0 mb-[25px] tracking-[0.04em] leading-[1.1] uppercase opacity-0 animate-[slideUp_1.2s_ease-out_0.4s_forwards,fadeIn_1.2s_ease-out_0.4s_forwards]">
          <span>Shanky</span>
          <span style={{ color: '#e63a27' }}> Group</span>
        </h1>
        
        {/* Tagline - section subheading font */}
        <div className="section-subheading text-[16px] font-[400] text-[var(--text-secondary)] tracking-[1px] italic mb-[40px] opacity-0 animate-[slideUp_1s_ease-out_0.6s_forwards,fadeIn_1s_ease-out_0.6s_forwards]">
          Excellence in Every Sector
        </div>
        
        {/* Decorative Elements */}
        <div className="flex items-center justify-center gap-[40px] opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
          {/* Left Line */}
          <div className="w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[var(--text-secondary)] to-transparent"></div>
          
          {/* Diamond */}
          <div className="w-[8px] h-[8px] bg-[var(--text-primary)] rotate-45 mx-[20px]"></div>
          
          {/* Right Line */}
          <div className="w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[var(--text-secondary)] to-transparent"></div>
        </div>
        
        {/* Loading Indicator */}
        <div className="mt-[50px] flex flex-col items-center gap-[15px] opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
          <div className="section-subheading loader w-[250px] h-[50px] leading-[50px] text-center text-[#ce4233] text-[14px] font-bold uppercase tracking-[0.2em] relative">
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Show loader only on very first visit and for a short duration.
    const hasSeenLoader = sessionStorage.getItem('home_loader_seen') === '1';
    const loaderDelay = hasSeenLoader ? 0 : 450;
    const loaderTimer = window.setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('home_loader_seen', '1');
    }, loaderDelay);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(loaderTimer);
    };
  }, []);

  return (
    <I18nProvider>
      <VisitorTracker />
      {isLoading && <BarLoader />}
      <div className="home4-root w-full overflow-x-hidden min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <HeaderFour isScrolled={isScrolled} />
        <main className="flex-grow">
          <HeroHomeFour />
          <AboutHomeFour />
          <MediaSection />
          <ForceForGood />
          <LegacyLeadership />
          <GlobeDemo />
          <WorkWithUs />
          <ContactUs />
        </main>
        <FooterFour />
      </div>
    </I18nProvider>
  );
}
