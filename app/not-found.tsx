'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeaderFour from './home/home4/HeaderFour';
import FooterFour from './home/home4/FooterFour';

export default function NotFound() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkDark = () => {
      const dark = typeof document !== 'undefined' && (document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark');
      setIsDark(!!dark);
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    if (typeof document !== 'undefined') observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="w-full overflow-x-hidden min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]"
      style={{ ['--accent' as string]: '#e63a27', ['--accent-hover' as string]: '#c93222' }}
    >
      <HeaderFour isScrolled={isScrolled} />
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-0 pb-16 md:pb-24">
        <div className="flex justify-center mb-8 md:mb-10 w-full max-w-5xl mx-auto px-2">
          <Image
            src="/images/404.png"
            alt="Page not found - searching"
            width={1000}
            height={563}
            className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl h-auto object-contain"
            style={isDark ? { filter: 'brightness(0.88) contrast(1.08)' } : undefined}
            priority
          />
        </div>
        <div className="text-center max-w-xl mx-auto">
          <p className="text-[#e63a27] font-bold text-6xl md:text-8xl mb-2">404</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
            Page not found
          </h1>
          <p className="text-[var(--text-secondary)] text-base md:text-lg mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            Back to Home
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
        </div>
      </main>
      <FooterFour />
    </div>
  );
}
