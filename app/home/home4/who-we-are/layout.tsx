 'use client';
 
 import { useEffect, useState } from 'react';
 import HeaderFour from '../HeaderFour';
 import FooterFour from '../FooterFour';
 
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
     <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-white">
       <HeaderFour isScrolled={isScrolled} />
       <main className="flex-grow">{children}</main>
       <FooterFour />
     </div>
   );
 }
