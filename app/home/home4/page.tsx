'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Import all the sections from HomeFour
import HeroHomeFour from './HeroHomeFour';
import AboutHomeFour from './AboutHomeFour';
import MediaSection from './who-we-are/aboutus';
import ForceForGood from './ForceForGood';
import LegacyLeadership from './LegacyLeadership';
import { GlobeDemo } from './glob';
import WorkWithUs from './work';
import ContactUs from './ContactUs';
import HeaderFour from './HeaderFour';
import FooterFour from './FooterFour';

const HomeFourPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
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
  );
};

export default HomeFourPage;
