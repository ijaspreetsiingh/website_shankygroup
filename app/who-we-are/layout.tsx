 'use client';
 
 import { useEffect, useState } from 'react';
 import HeaderFour from '../home/home4/HeaderFour';
 import FooterFour from '../home/home4/FooterFour';
 
 export default function WhoWeAreLayout({ children }: { children: React.ReactNode }) {
   const [isScrolled, setIsScrolled] = useState(false);
 
   useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 50);
     };
     window.addEventListener('scroll', handleScroll);
     return () => window.removeEventListener('scroll', handleScroll);
   }, []);
 
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
       <HeaderFour isScrolled={isScrolled} />
       <main className="flex-grow">{children}</main>
       <FooterFour />
     </div>
   );
 }
